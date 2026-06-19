/* ============================================================
   PHARMA FÈS — Leaflet Map Management
   ============================================================ */

const PharmacyMap = {
  map: null,
  markers: [],
  markerLookup: {},     // id → { marker, pharmacy }
  userMarker: null,
  userLat: null,
  userLng: null,
  selectedMarker: null,
  selectedId: null,
  routingControl: null,

  /* ---------- Initialization ---------- */

  /**
   * Initialize the Leaflet map centered on Fès
   */
  init() {
    this.map = L.map('map', {
      center: [34.0331, -4.9998],
      zoom: 13,
      zoomControl: false,
      attributionControl: true
    });

    /* Zoom control — bottom-left to avoid FAB overlap */
    L.control.zoom({ position: 'bottomleft' }).addTo(this.map);

    /* Tile layer — OpenStreetMap */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(this.map);
  },

  /* ---------- Markers ---------- */

  /**
   * Add pharmacy markers to the map
   * @param {Array} pharmacies - Array of pharmacy objects
   */
  addMarkers(pharmacies) {
    this.clearMarkers();

    pharmacies.forEach(pharmacy => {
      const status = Utils.getStatus(pharmacy);
      const icon = this.createMarkerIcon(status, Utils.hasApproximateLocation(pharmacy));

      const marker = L.marker([pharmacy.lat, pharmacy.lng], { icon })
        .addTo(this.map);

      /* Bind popup */
      marker.bindPopup(this.createPopupContent(pharmacy), {
        maxWidth: 280,
        minWidth: 220,
        closeButton: true,
        className: 'pharmacy-popup'
      });

      /* Click handler */
      marker.on('click', () => {
        this.selectPharmacy(pharmacy);
      });

      const entry = { marker, pharmacy, visible: true };
      this.markers.push(entry);
      this.markerLookup[pharmacy.id] = entry;
    });
  },

  /**
   * Clear all markers from map
   */
  clearMarkers() {
    this.markers.forEach(({ marker }) => marker.remove());
    this.markers = [];
    this.markerLookup = {};
    this.selectedMarker = null;
    this.selectedId = null;
  },

  /**
   * Create custom marker DivIcon based on status
   * @param {string} status - Pharmacy status
   * @param {boolean} isApproximate - Whether the coordinates are a known placeholder
   * @returns {L.DivIcon}
   */
  createMarkerIcon(status, isApproximate = false) {
    const colors = {
      'open':       { bg: '#16a34a', border: '#15803d' },
      'garde-jour': { bg: '#3b82f6', border: '#2563eb' },
      'garde-nuit': { bg: '#3b82f6', border: '#2563eb' },
      'closed':     { bg: '#94a3b8', border: '#64748b' }
    };
    const c = colors[status] || colors['closed'];
    const borderStyle = isApproximate ? 'dashed' : 'solid';

    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background:${c.bg};
        border:2px ${borderStyle} ${c.border};
        width:32px;height:32px;
        border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        box-shadow:0 2px 8px rgba(0,0,0,0.2);
        transition:transform 0.3s ease;
      "><span style="color:white;font-size:16px;" class="material-icons-round">local_pharmacy</span></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -20]
    });
  },

  /* ---------- User Position ---------- */

  /**
   * Show user position with pulsing blue dot
   * @param {number} lat - User latitude
   * @param {number} lng - User longitude
   */
  showUserPosition(lat, lng) {
    this.userLat = lat;
    this.userLng = lng;

    if (this.userMarker) {
      this.userMarker.setLatLng([lat, lng]);
    } else {
      const userIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="user-marker"></div>',
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });
      this.userMarker = L.marker([lat, lng], {
        icon: userIcon,
        zIndexOffset: 1000,
        interactive: false
      }).addTo(this.map);
    }
  },

  /**
   * Update user position by requesting geolocation
   */
  async updateUserPosition() {
    try {
      const pos = await Utils.getUserLocation();
      this.showUserPosition(pos.lat, pos.lng);
      return pos;
    } catch (err) {
      throw err;
    }
  },

  /* ---------- Navigation ---------- */

  /**
   * Center map on coordinates
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {number} zoom - Zoom level (default 16)
   */
  centerOn(lat, lng, zoom = 16) {
    this.map.flyTo([lat, lng], zoom, {
      duration: 0.8,
      easeLinearity: 0.25
    });
  },

  /**
   * Center on user position
   */
  centerOnUser() {
    if (this.userLat !== null && this.userLng !== null) {
      this.centerOn(this.userLat, this.userLng, 15);
    }
  },

  /**
   * Draw the route from user position to destination
   * @param {number} destLat - Destination Latitude
   * @param {number} destLng - Destination Longitude
   */
  async drawRoute(destLat, destLng) {
    if (this.map) {
      this.map.invalidateSize();
    }
    // Check if user location is available
    if (this.userLat === null || this.userLng === null) {
      try {
        await this.updateUserPosition();
      } catch (err) {
        console.error("Unable to get user location for routing:", err);
        throw new Error("Veuillez autoriser l'accès à la position GPS pour tracer l'itinéraire.");
      }
    }

    // Clear any existing route
    this.clearRoute();

    // Create Leaflet Routing Machine control
    try {
      this.routingControl = L.Routing.control({
        waypoints: [
          L.latLng(this.userLat, this.userLng),
          L.latLng(destLat, destLng)
        ],
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1'
        }),
        lineOptions: {
          styles: [
            { color: '#3b82f6', opacity: 0.85, weight: 6 }
          ],
          addWaypoints: false
        },
        createMarker: function() { return null; }, // Hide default markers
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: false
      }).addTo(this.map);

      // Show clear button
      const clearBtn = document.getElementById('clearRouteBtn');
      if (clearBtn) {
        clearBtn.classList.remove('hidden');
      }

      // Close open popups
      this.map.closePopup();
      return true;
    } catch (err) {
      console.error("Routing error:", err);
      throw new Error("Erreur lors du calcul de l'itinéraire. Vérifiez votre connexion internet.");
    }
  },

  /**
   * Clear active routing path
   */
  clearRoute() {
    if (this.routingControl) {
      try {
        this.map.removeControl(this.routingControl);
      } catch (e) {
        console.warn("Error removing routing control:", e);
      }
      this.routingControl = null;
    }
    const clearBtn = document.getElementById('clearRouteBtn');
    if (clearBtn) {
      clearBtn.classList.add('hidden');
    }
  },

  /* ---------- Selection ---------- */

  /**
   * Highlight / select a pharmacy on the map
   * @param {Object} pharmacy - Pharmacy object
   */
  selectPharmacy(pharmacy) {
    if (this.map) {
      this.map.invalidateSize();
    }
    this.clearSelection();

    const entry = this.markerLookup[pharmacy.id];
    if (!entry) return;

    this.selectedId = pharmacy.id;
    this.selectedMarker = entry.marker;

    /* Bounce animation */
    const el = entry.marker.getElement();
    if (el) {
      el.classList.add('marker-bounce');
      setTimeout(() => el.classList.remove('marker-bounce'), 600);
    }

    /* Open popup */
    entry.marker.openPopup();

    /* Center map */
    this.centerOn(pharmacy.lat, pharmacy.lng, 16);
  },

  /**
   * Clear current selection
   */
  clearSelection() {
    if (this.selectedMarker) {
      this.selectedMarker.closePopup();
    }
    this.selectedMarker = null;
    this.selectedId = null;
  },

  /* ---------- Filtering ---------- */

  /**
   * Filter visible markers by predicate
   * @param {Function} filterFn - Returns true for markers to show
   */
  filterMarkers(filterFn) {
    this.markers.forEach(entry => {
      if (filterFn(entry.pharmacy)) {
        if (!entry.visible) {
          entry.marker.addTo(this.map);
          entry.visible = true;
        }
      } else {
        if (entry.visible) {
          entry.marker.remove();
          entry.visible = false;
        }
      }
    });
  },

  /**
   * Show all markers
   */
  showAllMarkers() {
    this.markers.forEach(entry => {
      if (!entry.visible) {
        entry.marker.addTo(this.map);
        entry.visible = true;
      }
    });
  },

  /**
   * Update marker icons (e.g., after status change)
   */
  refreshMarkerIcons() {
    this.markers.forEach(entry => {
      const status = Utils.getStatus(entry.pharmacy);
      const icon = this.createMarkerIcon(status, Utils.hasApproximateLocation(entry.pharmacy));
      entry.marker.setIcon(icon);
      /* Update popup content */
      entry.marker.setPopupContent(this.createPopupContent(entry.pharmacy));
    });
  },

  /* ---------- Popup ---------- */

  /**
   * Create popup HTML content for a pharmacy
   * @param {Object} pharmacy - Pharmacy object
   * @returns {string} HTML string
   */
  createPopupContent(pharmacy) {
    const status = Utils.getStatus(pharmacy);
    const statusLabel = Utils.getStatusLabel(status);
    const statusClass = Utils.getStatusClass(status);

    let distanceHtml = '';
    if (this.userLat !== null) {
      const dist = Utils.haversineDistance(this.userLat, this.userLng, pharmacy.lat, pharmacy.lng);
      distanceHtml = `<span class="popup-distance">📍 ${Utils.formatDistance(dist)}</span>`;
    }

    const approxWarning = Utils.hasApproximateLocation(pharmacy)
      ? `<p style="font-size:0.7rem;color:#92400e;background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:6px 8px;margin:6px 0;">⚠️ Position approximative — à vérifier</p>`
      : '';

    return `
      <div class="popup-content">
        <div class="popup-name">${pharmacy.name}</div>
        <span class="popup-status pharmacy-status ${statusClass}">${statusLabel}</span>
        ${approxWarning}
        <div class="popup-address">
          <span class="material-icons-round">location_on</span>
          ${pharmacy.address}
        </div>
        <div class="popup-footer">
          ${distanceHtml}
          <button class="popup-btn" onclick="App.showDetail(${pharmacy.id})">Détails</button>
        </div>
      </div>
    `;
  },

  /* ---------- Bounds ---------- */

  /**
   * Fit map bounds to show all visible markers
   */
  fitToMarkers() {
    const visibleMarkers = this.markers.filter(e => e.visible);
    if (visibleMarkers.length === 0) return;

    const group = L.featureGroup(visibleMarkers.map(e => e.marker));
    this.map.fitBounds(group.getBounds(), {
      padding: [50, 50],
      maxZoom: 15,
      duration: 0.8
    });
  }
};