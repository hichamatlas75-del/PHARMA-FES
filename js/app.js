/* ============================================================
   PHARMA FÈS — Main Application Controller
   ============================================================ */

const App = {
  currentFilter: 'all',       // 'all' | 'nearby' | 'garde'
  selectedQuartier: '',       // '' | quartier name
  onlyOpenNow: false,         // true | false
  currentPharmacy: null,       // Currently viewed pharmacy
  bottomSheetState: 'peek',    // 'peek' | 'half' | 'full'
  touchStartY: 0,
  touchCurrentY: 0,
  isDragging: false,
  toastTimer: null,
  statusInterval: null,
  lastGardeSignature: null,  // signature de la dernière liste de garde reçue (évite rebuild/toast inutiles)
  gardeFetchFailed: false,   // évite de spammer le toast d'erreur à chaque poll
  deferredPrompt: null,      // Événement d'installation PWA capturé

  /* ========================================================
     INITIALIZATION
     ======================================================== */

  /**
   * Initialize the application
   */
  init() {
    /* 1. Initialize map */
    PharmacyMap.init();

    /* 2. Load pharmacies into map */
    const pharmacies = PharmacyData.getAll();
    PharmacyMap.addMarkers(pharmacies);

    /* 3. Populate quartier dropdown */
    this.populateQuartierDropdown();

    /* 4. Request user location (non-blocking) */
    this.requestUserLocation();

    /* 5. Setup event listeners */
    this.setupEventListeners();

    /* 6. Update tab counts */
    this.updateTabCounts();

    /* 7. Populate bottom sheet with pharmacy list */
    this.populatePharmacyList(pharmacies);

    /* 8. Fetch real-time on-duty pharmacies (non-blocking) */
    this.fetchRealDeGarde();

    /* 7. Start periodic status updates */
    this.statusInterval = setInterval(() => {
      this.updateStatuses();
      this.fetchRealDeGarde();
    }, 60000);

    /* 8. Set bottom sheet to half on load after a brief delay */
    setTimeout(() => this.setBottomSheetState('half'), 800);

    /* 9. Register Service Worker for PWA (if supported and not running locally via file://) */
    if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
      const registerSW = () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('Service Worker registered successfully:', reg.scope))
          .catch(err => console.warn('Service Worker registration failed:', err));
      };

      if (document.readyState === 'complete') {
        registerSW();
      } else {
        window.addEventListener('load', registerSW);
      }
    }
  },

  /**
   * Request user location and update UI
   */
  async requestUserLocation() {
    try {
      const pos = await Utils.getUserLocation();
      PharmacyMap.showUserPosition(pos.lat, pos.lng);
      /* Refresh popups with distance info */
      PharmacyMap.refreshMarkerIcons();
      /* Refresh tab counts and list to calculate distances, sort and group */
      this.updateTabCounts();
      this.applyFilter(this.currentFilter);
    } catch (err) {
      console.warn('Geolocation unavailable:', err.message);
    }
  },

  /* ========================================================
     EVENT LISTENERS
     ======================================================== */

  setupEventListeners() {
    /* --- PWA Install handling --- */
    const installBtn = document.getElementById('installBtn');

    window.addEventListener('beforeinstallprompt', e => {
      /* Empêcher l'affichage automatique de l'invite Chrome */
      e.preventDefault();
      /* Capturer l'événement pour un déclenchement manuel via le bouton */
      this.deferredPrompt = e;
      /* Afficher la petite icône d'installation dans le header */
      if (installBtn) {
        installBtn.classList.remove('hidden');
      }
    });

    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (!this.deferredPrompt) return;
        /* Afficher la boîte de dialogue d'installation */
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`PWA install choice: ${outcome}`);
        /* Réinitialiser l'événement et masquer le bouton */
        this.deferredPrompt = null;
        installBtn.classList.add('hidden');
      });
    }

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      if (installBtn) {
        installBtn.classList.add('hidden');
      }
      this.showToast('Application installée avec succès !', 'success');
    });

    /* --- Search --- */
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');

    searchInput.addEventListener('input', Utils.debounce(e => {
      this.handleSearch(e.target.value);
    }, 250));

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.length > 0) {
        this.handleSearch(searchInput.value);
      }
    });

    searchClear.addEventListener('click', () => this.clearSearch());

    /* Close search results on outside click */
    document.addEventListener('click', e => {
      const container = document.getElementById('searchContainer');
      if (!container.contains(e.target)) {
        document.getElementById('searchResults').classList.add('hidden');
      }
    });

    /* --- Tab Buttons --- */
    document.getElementById('tabAll').addEventListener('click', () => {
      if (this.currentFilter !== 'all') this.applyFilter('all');
    });
    document.getElementById('tabGarde').addEventListener('click', () => {
      if (this.currentFilter !== 'garde') this.applyFilter('garde');
    });
    document.getElementById('tabNearby').addEventListener('click', () => {
      if (this.currentFilter !== 'nearby') this.handleNearby();
    });

    /* --- Advanced Filter Bar (Quartier & Status) --- */
    const quartierSelect = document.getElementById('quartierSelect');
    if (quartierSelect) {
      quartierSelect.addEventListener('change', e => {
        this.selectedQuartier = e.target.value;
        this.applyFilter(this.currentFilter);
      });
    }

    const btnOpenNow = document.getElementById('btnOpenNow');
    if (btnOpenNow) {
      btnOpenNow.addEventListener('click', () => {
        this.onlyOpenNow = !this.onlyOpenNow;
        btnOpenNow.setAttribute('aria-pressed', this.onlyOpenNow ? 'true' : 'false');
        btnOpenNow.classList.toggle('active', this.onlyOpenNow);
        this.applyFilter(this.currentFilter);
      });
    }

    const btnResetFilters = document.getElementById('btnResetFilters');
    if (btnResetFilters) {
      btnResetFilters.addEventListener('click', () => this.resetFilters());
    }

    /* --- FAB Buttons --- */
    document.getElementById('fabMaps').addEventListener('click', () => this.handleOpenMaps());
    document.getElementById('fabDirections').addEventListener('click', () => this.handleDirections());
    document.getElementById('fabMyLocation').addEventListener('click', () => this.handleMyLocation());

    /* --- Bottom Sheet Drag --- */
    const handle = document.getElementById('bottomSheetHandle');
    const header = document.getElementById('bottomSheet');

    handle.addEventListener('touchstart', e => this.onDragStart(e), { passive: true });
    handle.addEventListener('mousedown', e => this.onDragStart(e));

    document.addEventListener('touchmove', e => this.onDragMove(e), { passive: false });
    document.addEventListener('mousemove', e => this.onDragMove(e));

    document.addEventListener('touchend', () => this.onDragEnd());
    document.addEventListener('mouseup', () => this.onDragEnd());

    /* Bottom sheet header click toggles between states */
    const sheetHeader = document.querySelector('.bottom-sheet-header');
    if (sheetHeader) {
      sheetHeader.addEventListener('click', () => {
        if (this.bottomSheetState === 'peek') {
          this.setBottomSheetState('half');
        } else if (this.bottomSheetState === 'half') {
          this.setBottomSheetState('full');
        } else {
          this.setBottomSheetState('half');
        }
      });
    }

    /* --- Detail Modal --- */
    document.getElementById('detailClose').addEventListener('click', () => this.closeDetail());
    document.getElementById('backToListBtn').addEventListener('click', () => this.closeDetail());
    document.getElementById('detailModal').addEventListener('click', e => {
      if (e.target === document.getElementById('detailModal')) {
        this.closeDetail();
      }
    });

    /* Detail action buttons */
    document.getElementById('detailCallBtn').addEventListener('click', () => {
      if (this.currentPharmacy) Utils.callPhone(this.currentPharmacy.phone);
    });
    document.getElementById('detailNavBtn').addEventListener('click', () => {
      if (this.currentPharmacy) Utils.openDirections(this.currentPharmacy.lat, this.currentPharmacy.lng);
    });
    document.getElementById('detailDirectionsBtn').addEventListener('click', async () => {
      if (this.currentPharmacy) {
        try {
          this.showToast("Calcul de l'itinéraire...", "info");
          await PharmacyMap.drawRoute(this.currentPharmacy.lat, this.currentPharmacy.lng);
          document.getElementById('detailModal').classList.remove('active');
          document.body.style.overflow = '';
          this.showToast("Itinéraire tracé sur la carte", "success");
        } catch (err) {
          this.showToast(err.message, "error");
        }
      }
    });
    document.getElementById('detailMapsBtn').addEventListener('click', () => {
      if (this.currentPharmacy) Utils.openInMaps(this.currentPharmacy.lat, this.currentPharmacy.lng, this.currentPharmacy.name);
    });
    document.getElementById('detailWhatsappBtn').addEventListener('click', () => {
      if (this.currentPharmacy) Utils.shareWhatsApp(this.currentPharmacy);
    });
    document.getElementById('detailShareBtn').addEventListener('click', () => {
      if (this.currentPharmacy) Utils.sharePharmacy(this.currentPharmacy);
    });

    /* --- Offline Banner Listeners --- */
    const offlineBanner = document.getElementById('offlineBanner');
    const updateOfflineStatus = () => {
      if (offlineBanner) {
        if (navigator.onLine) {
          offlineBanner.classList.add('hidden');
        } else {
          offlineBanner.classList.remove('hidden');
          this.showToast('Mode hors-ligne activé', 'warning');
        }
      }
    };
    window.addEventListener('online', () => {
      if (offlineBanner) offlineBanner.classList.add('hidden');
      this.showToast('Connexion rétablie', 'success');
    });
    window.addEventListener('offline', updateOfflineStatus);
    if (!navigator.onLine) updateOfflineStatus();

    /* --- Navigation Panel Steps --- */
    const prevBtn = document.getElementById('navPrevBtn');
    const nextBtn = document.getElementById('navNextBtn');
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        if (PharmacyMap.currentRouteStep > 0) {
          PharmacyMap.currentRouteStep--;
          PharmacyMap.updateNavigationUI();
        }
      });
      nextBtn.addEventListener('click', () => {
        if (PharmacyMap.currentRouteStep < PharmacyMap.currentRouteInstructions.length - 1) {
          PharmacyMap.currentRouteStep++;
          PharmacyMap.updateNavigationUI();
        }
      });
    }

    /* --- Clear Route --- */
    document.getElementById('clearRouteBtn').addEventListener('click', () => {
      PharmacyMap.clearRoute();
      this.showToast("Itinéraire effacé", "info");
    });

    /* --- About View --- */
    document.getElementById('aboutBtn').addEventListener('click', () => this.showAbout());
    document.getElementById('aboutBack').addEventListener('click', () => this.closeAbout());

    /* --- Keyboard: Escape closes modals --- */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        if (document.getElementById('detailModal').classList.contains('active')) {
          this.closeDetail();
        } else if (document.getElementById('aboutView').classList.contains('active')) {
          this.closeAbout();
        }
      }
    });

    /* --- Bottom Sheet Content Delegation --- */
    const content = document.getElementById('bottomSheetContent');
    content.addEventListener('click', e => {
      /* Prevent card click when action button is clicked */
      const btn = e.target.closest('.pharmacy-card-action');
      if (btn) {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        const action = btn.dataset.action;
        const pharmacy = PharmacyData.getById(id);
        if (!pharmacy) return;

        switch (action) {
          case 'call':
            Utils.callPhone(pharmacy.phone);
            break;
          case 'whatsapp':
            Utils.shareWhatsApp(pharmacy);
            break;
          case 'directions':
            this.showToast("Calcul de l'itinéraire...", "info");
            PharmacyMap.drawRoute(pharmacy.lat, pharmacy.lng)
              .then(() => {
                document.body.classList.add('map-view-active');
                this.showToast("Itinéraire tracé sur la carte", "success");
              })
              .catch(err => {
                this.showToast(err.message, "error");
              });
            break;
          case 'locate':
            this.showDetail(pharmacy.id);
            break;
        }
        return;
      }

      const card = e.target.closest('.pharmacy-card');
      if (card) {
        const id = parseInt(card.dataset.id);
        this.showDetail(id);
      }
    });
  },

  /* ========================================================
     SEARCH
     ======================================================== */

  /**
   * Handle search input
   * @param {string} query - Search query
   */
  handleSearch(query) {
    const searchClear = document.getElementById('searchClear');
    const searchResults = document.getElementById('searchResults');

    if (!query || query.trim().length === 0) {
      searchClear.classList.add('hidden');
      searchResults.classList.add('hidden');
      /* Reset to current filter view */
      this.applyFilter(this.currentFilter);
      return;
    }

    searchClear.classList.remove('hidden');

    let results = PharmacyData.search(query);
    if (PharmacyMap.userLat !== null) {
      results = results.map(p => ({
        ...p,
        distance: Utils.haversineDistance(PharmacyMap.userLat, PharmacyMap.userLng, p.lat, p.lng)
      }));
      results.sort((a, b) => a.distance - b.distance);
    }

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="no-results" style="padding:24px;">
          <span class="material-icons-round">search_off</span>
          <p>Aucune pharmacie trouvée</p>
        </div>
      `;
      searchResults.classList.remove('hidden');
      return;
    }

    let html = '';
    results.forEach(pharmacy => {
      const status = Utils.getStatus(pharmacy);
      const statusClass = Utils.getStatusClass(status);
      const highlightedName = Utils.highlightMatch(pharmacy.name, query);
      const highlightedAddress = Utils.highlightMatch(pharmacy.address, query);
      const highlightedQuartier = Utils.highlightMatch(pharmacy.quartier, query);

      let travelTimeHtml = '';
      if (pharmacy.distance !== undefined) {
        const travel = Utils.calculateTravelTime(pharmacy.distance);
        travelTimeHtml = `<span class="pharmacy-travel-time" style="font-size:0.65rem;margin-top:2px;">${travel.formatted}</span>`;
      }

      html += `
        <div class="search-result-item" data-id="${pharmacy.id}">
          <div class="search-result-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </div>
          <div class="search-result-text">
            <div class="search-result-name">${highlightedName}</div>
            <div class="search-result-address">${highlightedAddress} — ${highlightedQuartier}</div>
            ${travelTimeHtml}
          </div>
          <span class="pharmacy-status ${statusClass}" style="font-size:0.65rem;padding:2px 8px;">${Utils.getStatusLabel(status)}</span>
        </div>
      `;
    });

    searchResults.innerHTML = html;
    searchResults.classList.remove('hidden');

    /* Add click handlers to results */
    searchResults.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = parseInt(item.dataset.id);
        this.showDetail(id);
        searchResults.classList.add('hidden');
      });
    });

    /* Also filter map markers */
    const resultIds = new Set(results.map(p => p.id));
    PharmacyMap.filterMarkers(p => resultIds.has(p.id));
  },

  /**
   * Clear search input and results
   */
  clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const searchResults = document.getElementById('searchResults');

    searchInput.value = '';
    searchClear.classList.add('hidden');
    searchResults.classList.add('hidden');

    /* Reset to current filter view */
    this.applyFilter(this.currentFilter);
    searchInput.blur();
  },

  /* ========================================================
     FILTERS
     ======================================================== */

  /**
   * Populate Quartiers dropdown selector dynamically from database
   */
  populateQuartierDropdown() {
    const select = document.getElementById('quartierSelect');
    if (!select) return;
    const quartiers = PharmacyData.getQuartiers();
    let html = '<option value="">Tous les quartiers</option>';
    quartiers.forEach(q => {
      html += `<option value="${Utils.escapeHtml(q)}">${Utils.escapeHtml(q)}</option>`;
    });
    select.innerHTML = html;
  },

  /**
   * Reset active quartier and status filters
   */
  resetFilters() {
    this.selectedQuartier = '';
    this.onlyOpenNow = false;

    const quartierSelect = document.getElementById('quartierSelect');
    if (quartierSelect) quartierSelect.value = '';

    const btnOpenNow = document.getElementById('btnOpenNow');
    if (btnOpenNow) {
      btnOpenNow.classList.remove('active');
      btnOpenNow.setAttribute('aria-pressed', 'false');
    }

    const quartierWrapper = document.getElementById('quartierChipWrapper');
    if (quartierWrapper) quartierWrapper.classList.remove('active');

    const btnReset = document.getElementById('btnResetFilters');
    if (btnReset) btnReset.classList.add('hidden');

    this.applyFilter(this.currentFilter);
  },

  /**
   * Apply a filter to pharmacies (Tab + Quartier + OpenNow)
   * @param {string} filter - 'all' | 'nearby' | 'garde'
   */
  applyFilter(filter) {
    this.currentFilter = filter;

    /* Update Tab active states */
    document.getElementById('tabAll').classList.toggle('active', filter === 'all');
    document.getElementById('tabGarde').classList.toggle('active', filter === 'garde');
    document.getElementById('tabNearby').classList.toggle('active', filter === 'nearby');
    document.getElementById('tabAll').setAttribute('aria-selected', filter === 'all' ? 'true' : 'false');
    document.getElementById('tabGarde').setAttribute('aria-selected', filter === 'garde' ? 'true' : 'false');
    document.getElementById('tabNearby').setAttribute('aria-selected', filter === 'nearby' ? 'true' : 'false');

    let pharmacies;
    let title;

    switch (filter) {
      case 'nearby':
        if (PharmacyMap.userLat === null) {
          this.showToast('Position non disponible', 'error');
          this.applyFilter('all');
          return;
        }
        pharmacies = PharmacyData.getNearby(PharmacyMap.userLat, PharmacyMap.userLng, 50);
        title = 'Proches de vous';
        break;

      case 'garde': {
        const allPharmacies = PharmacyData.getAll();
        const activeGarde = allPharmacies.filter(p => {
          const status = Utils.getStatus(p);
          return status === 'garde-jour' || status === 'garde-nuit';
        });
        pharmacies = activeGarde.map(p => {
          if (PharmacyMap.userLat !== null) {
            return {
              ...p,
              distance: Utils.haversineDistance(PharmacyMap.userLat, PharmacyMap.userLng, p.lat, p.lng)
            };
          }
          return p;
        });
        if (PharmacyMap.userLat !== null) {
          pharmacies.sort((a, b) => a.distance - b.distance);
        }
        title = 'De garde actuellement';
        break;
      }

      default: /* 'all' */
        pharmacies = PharmacyData.getAll();
        if (PharmacyMap.userLat !== null) {
          pharmacies = pharmacies.map(p => ({
            ...p,
            distance: Utils.haversineDistance(PharmacyMap.userLat, PharmacyMap.userLng, p.lat, p.lng)
          }));
          pharmacies.sort((a, b) => a.distance - b.distance);
        }
        title = 'Pharmacies';
        break;
    }

    /* Apply Quartier filter if selected */
    if (this.selectedQuartier && this.selectedQuartier.trim() !== '') {
      pharmacies = pharmacies.filter(p => p.quartier === this.selectedQuartier);
    }

    /* Apply "Ouvertes maintenant" filter if active */
    if (this.onlyOpenNow) {
      pharmacies = pharmacies.filter(p => {
        const status = Utils.getStatus(p);
        return status === 'open' || status === 'garde-jour' || status === 'garde-nuit' || p.isH24;
      });
    }

    /* Update reset button & filter styles */
    const isFiltered = (this.selectedQuartier && this.selectedQuartier !== '') || this.onlyOpenNow;
    const btnReset = document.getElementById('btnResetFilters');
    if (btnReset) {
      btnReset.classList.toggle('hidden', !isFiltered);
    }
    const quartierWrapper = document.getElementById('quartierChipWrapper');
    if (quartierWrapper) {
      quartierWrapper.classList.toggle('active', !!(this.selectedQuartier && this.selectedQuartier !== ''));
    }

    /* Filter markers on map */
    const filteredIds = new Set(pharmacies.map(p => p.id));
    PharmacyMap.filterMarkers(p => filteredIds.has(p.id));

    if (isFiltered || filter === 'nearby' || filter === 'garde') {
      PharmacyMap.fitToMarkers();
    } else {
      PharmacyMap.showAllMarkers();
    }

    this.populatePharmacyList(pharmacies, title);
  },

  /* ========================================================
     BOTTOM SHEET
     ======================================================== */

  /**
   * Set bottom sheet state
   * @param {string} state - 'peek' | 'half' | 'full'
   */
  setBottomSheetState(state) {
    const sheet = document.getElementById('bottomSheet');
    this.bottomSheetState = state;

    sheet.classList.remove('half', 'full');
    sheet.style.transform = '';

    switch (state) {
      case 'half':
        sheet.classList.add('half');
        break;
      case 'full':
        sheet.classList.add('full');
        break;
      default: /* peek — default transform in CSS */
        break;
    }
  },

  /**
   * Drag start handler
   */
  onDragStart(e) {
    this.isDragging = true;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    this.touchStartY = clientY;

    const sheet = document.getElementById('bottomSheet');
    sheet.style.transition = 'none';
  },

  /**
   * Drag move handler
   */
  onDragMove(e) {
    if (!this.isDragging) return;
    if (e.cancelable) e.preventDefault();

    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - this.touchStartY;

    /* CSS translateY percentages (.half = 50%, default = calc(100% - 80px))
       are resolved against the sheet's OWN rendered height, not the
       viewport height — so the drag math must match that basis. */
    const sheet = document.getElementById('bottomSheet');
    const sheetHeight = sheet.offsetHeight;

    /* Calculate new translateY based on current position */
    let targetTranslateY;
    switch (this.bottomSheetState) {
      case 'full':
        targetTranslateY = Math.max(0, deltaY);
        break;
      case 'half':
        targetTranslateY = (sheetHeight * 0.5) + deltaY;
        targetTranslateY = Math.max(0, targetTranslateY);
        break;
      default:
        targetTranslateY = (sheetHeight - 80) + deltaY;
        targetTranslateY = Math.max(0, targetTranslateY);
        break;
    }

    sheet.style.transform = `translateY(${targetTranslateY}px)`;
  },

  /**
   * Drag end handler
   */
  onDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;

    const sheet = document.getElementById('bottomSheet');
    sheet.style.transition = '';

    const rect = sheet.getBoundingClientRect();
    const viewHeight = window.innerHeight;
    const sheetTop = rect.top;
    const ratio = sheetTop / viewHeight;

    /* Snap to nearest state based on position */
    if (ratio < 0.2) {
      this.setBottomSheetState('full');
    } else if (ratio < 0.65) {
      this.setBottomSheetState('half');
    } else {
      this.setBottomSheetState('peek');
    }
  },

  /* ========================================================
     PHARMACY LIST
     ======================================================== */

  /**
   * Update and cache counts shown on tab buttons
   */
  updateTabCounts() {
    const allPharmacies = PharmacyData.getAll();
    const allCount = allPharmacies.length;
    const gardeCount = allPharmacies.filter(p => {
      const status = Utils.getStatus(p);
      return status === 'garde-jour' || status === 'garde-nuit';
    }).length;
    
    document.getElementById('countAll').textContent = allCount;
    document.getElementById('countGarde').textContent = gardeCount;
    
    if (PharmacyMap.userLat !== null) {
      const nearbyCount = PharmacyData.getNearby(PharmacyMap.userLat, PharmacyMap.userLng, 10).length;
      document.getElementById('countNearby').textContent = nearbyCount;
    } else {
      document.getElementById('countNearby').textContent = '-';
    }
  },

  /**
   * Show skeleton loading placeholder cards while fetching data
   */
  showLoadingSkeleton() {
    const content = document.getElementById('bottomSheetContent');
    if (!content) return;
    let html = '';
    // Generate 3 skeleton cards
    for (let i = 0; i < 3; i++) {
      html += `
        <div class="pharmacy-card skeleton">
          <div class="pharmacy-card-header">
            <div class="skeleton-text skeleton-title"></div>
            <div class="skeleton-text skeleton-badge"></div>
          </div>
          <div class="pharmacy-card-address" style="display:flex; align-items:center; gap:8px;">
            <span class="material-icons-round" style="color:var(--border);">location_on</span>
            <div class="skeleton-text skeleton-line" style="flex:1; margin-bottom:0;"></div>
          </div>
          <div class="pharmacy-card-quartier" style="margin-left:28px;">
            <div class="skeleton-text skeleton-subline" style="margin-bottom:0;"></div>
          </div>
          <div class="pharmacy-card-footer">
            <div class="skeleton-text skeleton-distance" style="margin-bottom:0;"></div>
            <div class="pharmacy-card-actions">
              <div class="skeleton-button"></div>
              <div class="skeleton-button"></div>
            </div>
          </div>
        </div>
      `;
    }
    content.innerHTML = html;
  },

  /**
   * Populate pharmacy cards in bottom sheet
   * @param {Array} pharmacies - Array of pharmacies to display
   * @param {string} title - Optional header title
   */
  populatePharmacyList(pharmacies, title) {
    const content = document.getElementById('bottomSheetContent');

    if (pharmacies.length === 0) {
      content.innerHTML = `
        <div class="no-results">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          <p>Aucune pharmacie trouvée</p>
        </div>
      `;
      return;
    }

    // Group into de garde vs others
    const gardePharmacies = [];
    const otherPharmacies = [];

    pharmacies.forEach(p => {
      const status = Utils.getStatus(p);
      if (status === 'garde-jour' || status === 'garde-nuit') {
        gardePharmacies.push(p);
      } else {
        otherPharmacies.push(p);
      }
    });

    let html = '';
    const hasUserPos = PharmacyMap.userLat !== null;

    if (gardePharmacies.length > 0) {
      html += `
        <div class="list-group-header de-garde-header" style="display:flex;align-items:center;justify-content:space-between;width:100%;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span class="material-icons-round">shield</span>
            <span>Pharmacies de garde (${gardePharmacies.length})</span>
          </div>
          ${hasUserPos 
            ? `<span style="font-size:0.7rem;color:var(--accent);font-weight:600;">📍 Triées par proximité</span>`
            : `<button class="btn-locate-sort" onclick="App.handleGarde()"><span class="material-icons-round" style="font-size:14px;">near_me</span> Trier par proximité</button>`
          }
        </div>
      `;
      gardePharmacies.forEach((pharmacy, i) => {
        const isClosest = hasUserPos && i === 0;
        html += this.createPharmacyCard(pharmacy, i, isClosest);
      });
    }

    if (otherPharmacies.length > 0) {
      if (gardePharmacies.length > 0) {
        html += `
          <div class="list-group-header other-header">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            <span>Autres pharmacies (${otherPharmacies.length})</span>
          </div>
        `;
      }
      otherPharmacies.forEach((pharmacy, i) => {
        html += this.createPharmacyCard(pharmacy, gardePharmacies.length + i, false);
      });
    }

    content.innerHTML = html;
  },

  /**
   * Create a single pharmacy card HTML
   * @param {Object} pharmacy - Pharmacy object
   * @param {number} index - Animation delay index
   * @param {boolean} isClosest - Whether this is the closest pharmacy
   * @returns {string} HTML string
   */
  createPharmacyCard(pharmacy, index, isClosest = false) {
    const status = Utils.getStatus(pharmacy);
    const statusLabel = Utils.getStatusLabel(status);
    const statusClass = Utils.getStatusClass(status);

    let distanceHtml = '';
    let meters = pharmacy.distance;
    if (meters === undefined && PharmacyMap.userLat !== null) {
      meters = Utils.haversineDistance(PharmacyMap.userLat, PharmacyMap.userLng, pharmacy.lat, pharmacy.lng);
    }

    if (meters !== undefined) {
      const travel = Utils.calculateTravelTime(meters);
      distanceHtml = `
        <div style="display:flex;flex-direction:column;gap:2px;">
          <span class="pharmacy-card-distance">
            <span class="material-icons-round">straighten</span>
            ${Utils.formatDistance(meters)}
          </span>
          <span class="pharmacy-travel-time">${travel.formatted}</span>
        </div>
      `;
    }

    const phoneAction = pharmacy.phone
      ? `<button class="pharmacy-card-action" data-id="${pharmacy.id}" data-action="call" aria-label="Appeler" title="Appeler">
           <span class="material-icons-round">phone</span>
         </button>`
      : '';

    const whatsappAction = `<button class="pharmacy-card-action whatsapp" data-id="${pharmacy.id}" data-action="whatsapp" aria-label="Partager sur WhatsApp" title="Partager sur WhatsApp">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.2 1.24-1.95 1.3-.51.04-1.18.06-3.41-.85-2.85-1.17-4.69-4.08-4.83-4.27-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.27-.28.59-.35.79-.35.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.58.83 2.03.9 2.18.07.15.12.33.02.53-.1.19-.15.31-.3.49-.15.17-.31.39-.45.52-.15.14-.3.3-.13.6.17.3.76 1.25 1.64 2.03 1.12.99 2.07 1.3 2.37 1.45.3.15.48.13.65-.07.18-.2.76-.88.96-1.18.2-.3.4-.25.68-.15.28.1.1.77.52 3.86 1.95.09.28.09.53 0 .78-.24.68z"/></svg>
    </button>`;

    const delay = Math.min(index * 0.05, 0.5);

    const closestBadgeHtml = isClosest
      ? `<span class="badge-closest"><span class="material-icons-round" style="font-size:12px;margin-right:2px;">near_me</span>La plus proche</span>`
      : '';

    return `
      <div class="pharmacy-card ${isClosest ? 'closest-card' : ''}" data-id="${pharmacy.id}" style="animation-delay:${delay}s;">
        <div class="pharmacy-card-header">
          <span class="pharmacy-card-name">${Utils.escapeHtml(pharmacy.name)}${closestBadgeHtml}</span>
          <span class="pharmacy-status ${statusClass}">${statusLabel}</span>
        </div>
        <div class="pharmacy-card-address">
          <span class="material-icons-round">location_on</span>
          ${Utils.escapeHtml(pharmacy.address)}
        </div>
        <div class="pharmacy-card-quartier">${Utils.escapeHtml(pharmacy.quartier)}</div>
        <div class="pharmacy-card-footer">
          ${distanceHtml}
          <div class="pharmacy-card-actions">
            ${phoneAction}
            ${whatsappAction}
            <button class="pharmacy-card-action" data-id="${pharmacy.id}" data-action="directions" aria-label="Itinéraire" title="Itinéraire">
              <span class="material-icons-round">directions</span>
            </button>
            <button class="pharmacy-card-action" data-id="${pharmacy.id}" data-action="locate" aria-label="Localiser" title="Localiser sur la carte">
              <span class="material-icons-round">my_location</span>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  /* ========================================================
     DETAIL MODAL
     ======================================================== */

  /**
   * Show pharmacy detail modal
   * @param {number} pharmacyId - Pharmacy ID
   */
  showDetail(pharmacyId) {
    const pharmacy = PharmacyData.getById(pharmacyId);
    if (!pharmacy) return;

    this.currentPharmacy = pharmacy;

    const status = Utils.getStatus(pharmacy);
    const statusLabel = Utils.getStatusLabel(status);
    const statusClass = Utils.getStatusClass(status);

    /* Populate detail fields */
    document.getElementById('detailName').textContent = pharmacy.name;

    const statusEl = document.getElementById('detailStatus');
    statusEl.textContent = statusLabel;
    statusEl.className = `detail-status pharmacy-status ${statusClass}`;

    document.getElementById('detailAddressValue').textContent = `${pharmacy.address}, ${pharmacy.quartier}`;
    document.getElementById('detailQuartierValue').textContent = pharmacy.quartier;

    /* Warn when this pharmacy's coordinates are a known placeholder
       rather than a real geocoded position */
    const addressLabel = document.querySelector('#detailAddress .detail-info-label');
    if (addressLabel) {
      addressLabel.innerHTML = Utils.hasApproximateLocation(pharmacy)
        ? 'Adresse <span style="color:#92400e;">⚠️ position approximative</span>'
        : 'Adresse';
    }

    /* Phone */
    const phoneValue = document.getElementById('detailPhoneValue');
    const phoneRow = document.getElementById('detailPhone');
    if (pharmacy.phone) {
      const safePhone = pharmacy.phone.replace(/[^0-9+\-\s]/g, '');
      phoneValue.innerHTML = `<a href="tel:${safePhone}" style="color:var(--accent);font-weight:600;">${this.formatPhoneNumber(safePhone)}</a>`;
      phoneRow.classList.remove('hidden');
    } else {
      phoneValue.textContent = 'Non disponible';
      phoneRow.classList.remove('hidden');
    }

    /* Hours */
    if (pharmacy.isH24) {
      document.getElementById('detailHoursValue').textContent = 'Ouvert 24h/24';
    } else {
      document.getElementById('detailHoursValue').textContent = `${pharmacy.hours.open} — ${pharmacy.hours.close}`;
    }

    /* Distance */
    const distRow = document.getElementById('detailDistance');
    if (PharmacyMap.userLat !== null) {
      const dist = Utils.haversineDistance(PharmacyMap.userLat, PharmacyMap.userLng, pharmacy.lat, pharmacy.lng);
      const travel = Utils.calculateTravelTime(dist);
      document.getElementById('detailDistanceValue').innerHTML = `${Utils.formatDistance(dist)} <span class="pharmacy-travel-time" style="margin-left:6px;">${travel.formatted}</span>`;
      distRow.classList.remove('hidden');
    } else {
      distRow.classList.add('hidden');
    }

    /* Call button state */
    const callBtn = document.getElementById('detailCallBtn');
    if (!pharmacy.phone) {
      callBtn.style.opacity = '0.5';
      callBtn.style.pointerEvents = 'none';
    } else {
      callBtn.style.opacity = '1';
      callBtn.style.pointerEvents = 'auto';
    }

    /* Show modal */
    const detailModal = document.getElementById('detailModal');
    detailModal.classList.add('active');
    detailModal.setAttribute('aria-hidden', 'false');
    const closeBtn = document.getElementById('detailClose');
    if (closeBtn) closeBtn.focus();
    document.body.style.overflow = 'hidden';
    document.body.classList.add('map-view-active');

    /* Center map on pharmacy */
    PharmacyMap.selectPharmacy(pharmacy);
  },

  /**
   * Format phone number for display
   * @param {string} phone - Raw phone number
   * @returns {string} Formatted phone
   */
  formatPhoneNumber(phone) {
    if (!phone || phone.length !== 10) return phone;
    return `${phone.slice(0, 4)} ${phone.slice(4, 6)} ${phone.slice(6, 8)} ${phone.slice(8, 10)}`;
  },

  /**
   * Close detail modal
   */
  closeDetail() {
    const detailModal = document.getElementById('detailModal');
    detailModal.classList.remove('active');
    detailModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.body.classList.remove('map-view-active');
    this.currentPharmacy = null;
    PharmacyMap.clearSelection();
  },

  /* ========================================================
     ABOUT VIEW
     ======================================================== */

  showAbout() {
    const aboutView = document.getElementById('aboutView');
    aboutView.classList.add('active');
    aboutView.setAttribute('aria-hidden', 'false');
    const aboutBack = document.getElementById('aboutBack');
    if (aboutBack) aboutBack.focus();
    document.body.style.overflow = 'hidden';
  },

  closeAbout() {
    const aboutView = document.getElementById('aboutView');
    aboutView.classList.remove('active');
    aboutView.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  },

  /* ========================================================
     FAB ACTIONS
     ======================================================== */

  /**
   * Handle "Nearby" FAB
   */
  async handleNearby() {
    if (this.currentFilter === 'nearby') {
      this.applyFilter('all');
      return;
    }

    if (PharmacyMap.userLat === null) {
      this.showToast('Localisation en cours...', 'info');
      try {
        const pos = await PharmacyMap.updateUserPosition();
        PharmacyMap.showUserPosition(pos.lat, pos.lng);
        this.applyFilter('nearby');
        this.setBottomSheetState('half');
      } catch (err) {
        this.showToast(err.message, 'error');
      }
    } else {
      this.applyFilter('nearby');
      this.setBottomSheetState('half');
    }
  },

  /**
   * Handle "De garde" FAB
   */
  handleGarde() {
    if (this.currentFilter === 'garde') {
      this.applyFilter('all');
    } else {
      this.applyFilter('garde');
      this.setBottomSheetState('half');
    }
  },

  /**
   * Handle "Open Maps" FAB
   */
  handleOpenMaps() {
    if (this.currentPharmacy) {
      Utils.openInMaps(this.currentPharmacy.lat, this.currentPharmacy.lng, this.currentPharmacy.name);
    } else {
      Utils.openInMaps(34.0331, -4.9998, 'Fès, Maroc');
    }
  },

  /**
   * Handle "Directions" FAB
   */
  async handleDirections() {
    let target = this.currentPharmacy;
    if (!target && PharmacyMap.selectedId) {
      target = PharmacyData.getById(PharmacyMap.selectedId);
    }

    if (target) {
      try {
        this.showToast("Calcul de l'itinéraire...", "info");
        await PharmacyMap.drawRoute(target.lat, target.lng);
        document.body.classList.add('map-view-active');
        this.showToast("Itinéraire tracé sur la carte", "success");
      } catch (err) {
        this.showToast(err.message, "error");
      }
    } else {
      this.showToast("Sélectionnez d'abord une pharmacie", "info");
    }
  },

  /**
   * Handle "My Location" FAB
   */
  async handleMyLocation() {
    try {
      this.showToast('Localisation en cours...', 'info');
      const pos = await PharmacyMap.updateUserPosition();
      PharmacyMap.centerOnUser();
      this.showToast('Position trouvée !', 'success');
      /* Refresh marker popups and tab counts to include distance */
      PharmacyMap.refreshMarkerIcons();
      this.updateTabCounts();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  },

  /* ========================================================
     STATUS UPDATES
     ======================================================== */

  /**
   * Update all pharmacy statuses (called periodically)
   */
  updateStatuses() {
    PharmacyMap.refreshMarkerIcons();
    this.updateTabCounts();
    /* Refresh the list if visible */
    if (this.bottomSheetState !== 'peek') {
      this.applyFilter(this.currentFilter);
    }
  },

  /**
   * Fetch real-time on-duty pharmacies from the web
   */
  async fetchRealDeGarde() {
    let apiUrl = '';
    try {
      console.log("Fetching real-time on-duty pharmacies from proxy API...");
      
      const isFirstLoad = this.lastGardeSignature === null;
      if (isFirstLoad) {
        this.showLoadingSkeleton();
      }

      const useRemoteApi = window.location.protocol === 'file:' || 
                           window.location.hostname === 'appassets.androidplatform.net' ||
                           window.location.hostname === 'localhost' ||
                           window.location.hostname === '127.0.0.1';
      apiUrl = useRemoteApi 
        ? 'https://pharma-fes.pages.dev/api/garde' 
        : '/api/garde';

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      const response = await fetch(apiUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const parsedRealGuards = await response.json();

      if (!parsedRealGuards || parsedRealGuards.length === 0) {
        throw new Error("Aucune pharmacie de garde trouvée");
      }

      /* Une requête a réussi : on peut ré-autoriser un futur toast d'erreur */
      this.gardeFetchFailed = false;

      /* Ne reconstruire les marqueurs et ne notifier que si la liste de
         garde a réellement changé depuis le dernier poll — sinon ce bloc
         tournerait toutes les 60s pour rien (flicker + toast en boucle). */
      const signature = JSON.stringify(parsedRealGuards);
      if (signature === this.lastGardeSignature) {
        return;
      }
      this.lastGardeSignature = signature;

      console.log(`Successfully loaded ${parsedRealGuards.length} real-time on-duty pharmacies:`, parsedRealGuards);
      PharmacyData.setRealDeGarde(parsedRealGuards);
      this.updateTabCounts();

      const allPharmacies = PharmacyData.getAll();
      // Use incremental marker update instead of recreating all 433+ markers
      PharmacyMap.refreshMarkerIcons();
      this.applyFilter(this.currentFilter);

      if (isFirstLoad) {
        this.showToast(`${parsedRealGuards.length} pharmacies de garde réelles chargées`, 'success');
      }
    } catch (err) {
      console.warn("Failed to fetch real-time on-duty pharmacies:", err);
      /* N'afficher le toast d'erreur qu'une seule fois par série d'échecs,
         pas à chaque poll de 60s */
      if (!this.gardeFetchFailed) {
        this.gardeFetchFailed = true;
        this.showToast(`Erreur de chargement des pharmacies de garde`, "error");
      }
      // If first load failed, we should still refresh the list to remove the skeleton loading screen
      if (this.lastGardeSignature === null) {
        this.applyFilter(this.currentFilter);
      }
    }
  },

  /* ========================================================
     TOAST NOTIFICATIONS
     ======================================================== */

  /**
   * Show a toast notification
   * @param {string} message - Toast message
   * @param {string} type - 'success' | 'error' | 'info'
   */
  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const icon = document.getElementById('toastIcon');
    const msg = document.getElementById('toastMessage');

    /* Clear existing timeout */
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    /* Set icon based on type */
    const icons = {
      'success': 'check_circle',
      'error': 'error',
      'info': 'info'
    };
    icon.textContent = icons[type] || 'info';

    /* Set message */
    msg.textContent = message;

    /* Set type class */
    toast.className = `toast visible ${type}`;

    /* Auto-hide after 3 seconds */
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('visible');
    }, 3000);
  }
};

/* ========================================================
   DOM READY — Initialize the application
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => App.init());
