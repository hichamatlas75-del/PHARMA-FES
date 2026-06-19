/* ============================================================
   PHARMA FÈS — Main Application Controller
   ============================================================ */

const App = {
  currentFilter: 'all',       // 'all' | 'nearby' | 'garde'
  currentPharmacy: null,       // Currently viewed pharmacy
  bottomSheetState: 'peek',    // 'peek' | 'half' | 'full'
  touchStartY: 0,
  touchCurrentY: 0,
  isDragging: false,
  toastTimer: null,
  statusInterval: null,

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

    /* 3. Request user location (non-blocking) */
    this.requestUserLocation();

    /* 4. Setup event listeners */
    this.setupEventListeners();

    /* 5. Populate bottom sheet with pharmacy list */
    this.populatePharmacyList(pharmacies);

    /* 6. Fetch real-time on-duty pharmacies (non-blocking) */
    this.fetchRealDeGarde();

    /* 7. Start periodic status updates */
    this.statusInterval = setInterval(() => {
      this.updateStatuses();
      this.fetchRealDeGarde();
    }, 60000);

    /* 8. Set bottom sheet to half on load after a brief delay */
    setTimeout(() => this.setBottomSheetState('half'), 800);
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
      /* Refresh list to calculate distances, sort and group */
      this.applyFilter(this.currentFilter);
    } catch (err) {
      console.warn('Geolocation unavailable:', err.message);
    }
  },

  /* ========================================================
     EVENT LISTENERS
     ======================================================== */

  setupEventListeners() {
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

    /* --- FAB Buttons --- */
    document.getElementById('fabNearby').addEventListener('click', () => this.handleNearby());
    document.getElementById('fabGarde').addEventListener('click', () => this.handleGarde());
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
    document.querySelector('.bottom-sheet-header').addEventListener('click', () => {
      if (this.bottomSheetState === 'peek') {
        this.setBottomSheetState('half');
      } else if (this.bottomSheetState === 'half') {
        this.setBottomSheetState('full');
      } else {
        this.setBottomSheetState('half');
      }
    });

    /* --- Detail Modal --- */
    document.getElementById('detailClose').addEventListener('click', () => this.closeDetail());
    document.getElementById('detailModal').addEventListener('click', e => {
      if (e.target === document.getElementById('detailModal')) {
        this.closeDetail();
      }
    });

    /* Detail action buttons */
    document.getElementById('detailCallBtn').addEventListener('click', () => {
      if (this.currentPharmacy) Utils.callPhone(this.currentPharmacy.phone);
    });
    document.getElementById('detailDirectionsBtn').addEventListener('click', async () => {
      if (this.currentPharmacy) {
        try {
          this.showToast("Calcul de l'itinéraire...", "info");
          await PharmacyMap.drawRoute(this.currentPharmacy.lat, this.currentPharmacy.lng);
          this.closeDetail();
          this.setBottomSheetState('peek');
          this.showToast("Itinéraire tracé sur la carte", "success");
        } catch (err) {
          this.showToast(err.message, "error");
        }
      }
    });
    document.getElementById('detailMapsBtn').addEventListener('click', () => {
      if (this.currentPharmacy) Utils.openInMaps(this.currentPharmacy.lat, this.currentPharmacy.lng, this.currentPharmacy.name);
    });
    document.getElementById('detailShareBtn').addEventListener('click', () => {
      if (this.currentPharmacy) Utils.sharePharmacy(this.currentPharmacy);
    });

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
      html += `
        <div class="search-result-item" data-id="${pharmacy.id}">
          <div class="search-result-icon">
            <span class="material-icons-round">local_pharmacy</span>
          </div>
          <div class="search-result-text">
            <div class="search-result-name">${pharmacy.name}</div>
            <div class="search-result-address">${pharmacy.address} — ${pharmacy.quartier}</div>
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
   * Apply a filter to pharmacies
   * @param {string} filter - 'all' | 'nearby' | 'garde'
   */
  applyFilter(filter) {
    this.currentFilter = filter;

    /* Update FAB active states */
    document.getElementById('fabNearby').classList.toggle('active', filter === 'nearby');
    document.getElementById('fabGarde').classList.toggle('active', filter === 'garde');

    let pharmacies;
    let title;

    switch (filter) {
      case 'nearby':
        if (PharmacyMap.userLat === null) {
          this.showToast('Position non disponible', 'error');
          this.applyFilter('all');
          return;
        }
        pharmacies = PharmacyData.getNearby(PharmacyMap.userLat, PharmacyMap.userLng, 10);
        title = 'Proches de vous';
        PharmacyMap.filterMarkers(p => pharmacies.some(np => np.id === p.id));
        PharmacyMap.fitToMarkers();
        break;

      case 'garde': {
        const garde = PharmacyData.getDeGarde(new Date());
        const allGardeMap = new Map();
        [...garde.jour, ...garde.nuit].forEach(p => allGardeMap.set(p.id, p));
        const allGarde = [...allGardeMap.values()];
        pharmacies = allGarde.map(p => {
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
        title = 'De garde aujourd\'hui';
        const gardeIds = new Set(allGarde.map(p => p.id));
        PharmacyMap.filterMarkers(p => gardeIds.has(p.id));
        PharmacyMap.fitToMarkers();
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
        PharmacyMap.showAllMarkers();
        break;
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
   * Populate pharmacy cards in bottom sheet
   * @param {Array} pharmacies - Array of pharmacies to display
   * @param {string} title - Optional header title
   */
  populatePharmacyList(pharmacies, title) {
    const content = document.getElementById('bottomSheetContent');
    const count = document.getElementById('bottomSheetCount');
    const titleEl = document.getElementById('bottomSheetTitle');

    if (title) titleEl.textContent = title;
    count.textContent = pharmacies.length;

    if (pharmacies.length === 0) {
      content.innerHTML = `
        <div class="no-results">
          <span class="material-icons-round">local_pharmacy</span>
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

    if (gardePharmacies.length > 0) {
      html += `
        <div class="list-group-header de-garde-header">
          <span class="material-icons-round">shield</span>
          <span>Pharmacies de garde (${gardePharmacies.length})</span>
        </div>
      `;
      gardePharmacies.forEach((pharmacy, i) => {
        html += this.createPharmacyCard(pharmacy, i);
      });
    }

    if (otherPharmacies.length > 0) {
      if (gardePharmacies.length > 0) {
        html += `
          <div class="list-group-header other-header">
            <span class="material-icons-round">local_pharmacy</span>
            <span>Autres pharmacies (${otherPharmacies.length})</span>
          </div>
        `;
      }
      otherPharmacies.forEach((pharmacy, i) => {
        html += this.createPharmacyCard(pharmacy, gardePharmacies.length + i);
      });
    }

    content.innerHTML = html;

    /* Add click handlers to cards */
    content.querySelectorAll('.pharmacy-card').forEach(card => {
      card.addEventListener('click', e => {
        /* Prevent card click when action button is clicked */
        if (e.target.closest('.pharmacy-card-action')) return;
        const id = parseInt(card.dataset.id);
        this.showDetail(id);
      });
    });

    /* Add click handlers to action buttons */
    content.querySelectorAll('.pharmacy-card-action').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        const action = btn.dataset.action;
        const pharmacy = PharmacyData.getById(id);
        if (!pharmacy) return;

        switch (action) {
          case 'call':
            Utils.callPhone(pharmacy.phone);
            break;
          case 'directions':
            this.showToast("Calcul de l'itinéraire...", "info");
            PharmacyMap.drawRoute(pharmacy.lat, pharmacy.lng)
              .then(() => {
                this.setBottomSheetState('peek');
                this.showToast("Itinéraire tracé sur la carte", "success");
              })
              .catch(err => {
                this.showToast(err.message, "error");
              });
            break;
          case 'locate':
            PharmacyMap.selectPharmacy(pharmacy);
            this.setBottomSheetState('peek');
            break;
        }
      });
    });
  },

  /**
   * Create a single pharmacy card HTML
   * @param {Object} pharmacy - Pharmacy object
   * @param {number} index - Animation delay index
   * @returns {string} HTML string
   */
  createPharmacyCard(pharmacy, index) {
    const status = Utils.getStatus(pharmacy);
    const statusLabel = Utils.getStatusLabel(status);
    const statusClass = Utils.getStatusClass(status);

    let distanceHtml = '';
    if (pharmacy.distance !== undefined) {
      distanceHtml = `
        <span class="pharmacy-card-distance">
          <span class="material-icons-round">straighten</span>
          ${Utils.formatDistance(pharmacy.distance)}
        </span>
      `;
    } else if (PharmacyMap.userLat !== null) {
      const dist = Utils.haversineDistance(PharmacyMap.userLat, PharmacyMap.userLng, pharmacy.lat, pharmacy.lng);
      distanceHtml = `
        <span class="pharmacy-card-distance">
          <span class="material-icons-round">straighten</span>
          ${Utils.formatDistance(dist)}
        </span>
      `;
    }

    const phoneAction = pharmacy.phone
      ? `<button class="pharmacy-card-action" data-id="${pharmacy.id}" data-action="call" aria-label="Appeler" title="Appeler">
           <span class="material-icons-round">phone</span>
         </button>`
      : '';

    const delay = Math.min(index * 0.05, 0.5);

    return `
      <div class="pharmacy-card" data-id="${pharmacy.id}" style="animation-delay:${delay}s;">
        <div class="pharmacy-card-header">
          <span class="pharmacy-card-name">${pharmacy.name}</span>
          <span class="pharmacy-status ${statusClass}">${statusLabel}</span>
        </div>
        <div class="pharmacy-card-address">
          <span class="material-icons-round">location_on</span>
          ${pharmacy.address}
        </div>
        <div class="pharmacy-card-quartier">${pharmacy.quartier}</div>
        <div class="pharmacy-card-footer">
          ${distanceHtml}
          <div class="pharmacy-card-actions">
            ${phoneAction}
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
      phoneValue.innerHTML = `<a href="tel:${pharmacy.phone}" style="color:var(--accent);font-weight:600;">${this.formatPhoneNumber(pharmacy.phone)}</a>`;
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
      document.getElementById('detailDistanceValue').textContent = Utils.formatDistance(dist);
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
    document.getElementById('detailModal').classList.add('active');
    document.body.style.overflow = 'hidden';

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
    document.getElementById('detailModal').classList.remove('active');
    document.body.style.overflow = '';
    this.currentPharmacy = null;
    PharmacyMap.clearSelection();
  },

  /* ========================================================
     ABOUT VIEW
     ======================================================== */

  showAbout() {
    document.getElementById('aboutView').classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeAbout() {
    document.getElementById('aboutView').classList.remove('active');
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
        this.setBottomSheetState('peek');
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
      /* Refresh marker popups to include distance */
      PharmacyMap.refreshMarkerIcons();
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
    /* Refresh the list if visible */
    if (this.bottomSheetState !== 'peek') {
      this.applyFilter(this.currentFilter);
    }
  },

  /**
   * Fetch real-time on-duty pharmacies from the web
   */
  async fetchRealDeGarde() {
    try {
      console.log("Fetching real-time on-duty pharmacies...");
      const response = await fetch('https://fes.pharmacieenpermanence.ma', {
        headers: { 'Accept': 'text/html' }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();

      // Regex-based robust parser tested and validated
      const h3Regex = /<h3[^>]*>([^<]+)<\/h3>/g;
      let match;
      const h3Matches = [];
      while ((match = h3Regex.exec(html)) !== null) {
        h3Matches.push({
          name: match[1].trim(),
          index: match.index
        });
      }

      const parsedRealGuards = [];
      for (let i = 0; i < h3Matches.length; i++) {
        const current = h3Matches[i];
        if (!current.name.toLowerCase().includes("pharmacie")) continue;

        const nextIndex = (i < h3Matches.length - 1) ? h3Matches[i+1].index : html.length;
        const context = html.slice(current.index, Math.min(nextIndex, current.index + 3000));

        const telMatch = context.match(/href="tel:([^"]+)"/);
        const phone = telMatch ? telMatch[1].trim() : "";
        if (!phone) continue; // Filter out headers/footers with no tel link

        const mapsMatch = context.match(/destination=([0-9.-]+),([0-9.-]+)/);
        const lat = mapsMatch ? parseFloat(mapsMatch[1]) : 0;
        const lng = mapsMatch ? parseFloat(mapsMatch[2]) : 0;

        const guardMatch = context.match(/Garde\s+([^<]+)/i);
        const guardType = guardMatch ? guardMatch[1].trim() : "Jour et Nuit";

        // Clean name
        let cleanName = current.name;
        cleanName = cleanName.replace(/&#x27;/g, "'")
                             .replace(/&amp;/g, "&")
                             .replace(/&quot;/g, '"')
                             .replace(/&#39;/g, "'");

        parsedRealGuards.push({
          name: cleanName,
          phone: phone,
          lat: lat,
          lng: lng,
          guardType: guardType
        });
      }

      if (parsedRealGuards.length > 0) {
        console.log(`Successfully parsed ${parsedRealGuards.length} real-time on-duty pharmacies:`, parsedRealGuards);
        // Set the on-duty pharmacies in our data object
        PharmacyData.setRealDeGarde(parsedRealGuards);
        
        // Re-add markers with updated statuses on the map
        const allPharmacies = PharmacyData.getAll();
        PharmacyMap.addMarkers(allPharmacies);
        
        // addMarkers() shows every marker again, which silently overrides
        // any active 'nearby'/'garde' filter. Always reapply the current
        // filter (map + list) so the view stays consistent regardless of
        // bottom sheet state.
        this.applyFilter(this.currentFilter);
        
        this.showToast(`${parsedRealGuards.length} pharmacies de garde réelles chargées`, 'success');
      } else {
        throw new Error("Aucune pharmacie de garde trouvée dans le HTML");
      }
    } catch (err) {
      console.warn("Failed to fetch real-time on-duty pharmacies, falling back to rotation logic:", err);
      this.showToast("Mode hors-ligne : garde simulée", "info");
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