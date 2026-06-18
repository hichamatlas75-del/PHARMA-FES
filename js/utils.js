/* ============================================================
   PHARMA FÈS — Utility Functions
   ============================================================ */

const Utils = {

  /**
   * Haversine formula — returns distance in meters
   * @param {number} lat1 - Point 1 latitude
   * @param {number} lng1 - Point 1 longitude
   * @param {number} lat2 - Point 2 latitude
   * @param {number} lng2 - Point 2 longitude
   * @returns {number} Distance in meters
   */
  haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const toRad = deg => deg * (Math.PI / 180);
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  },

  /**
   * Format distance for display
   * @param {number} meters - Distance in meters
   * @returns {string} Formatted distance string
   */
  formatDistance(meters) {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
  },

  /**
   * Get user geolocation as Promise
   * @returns {Promise<{lat: number, lng: number}>}
   */
  getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Géolocalisation non supportée par votre navigateur'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('Accès à la position refusé. Veuillez autoriser la géolocalisation.'));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('Position non disponible.'));
              break;
            case error.TIMEOUT:
              reject(new Error('Délai de localisation dépassé.'));
              break;
            default:
              reject(new Error('Erreur de géolocalisation.'));
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  },

  /**
   * Check if pharmacy is currently open based on hours
   * @param {Object} pharmacy - Pharmacy object
   * @returns {boolean} Whether pharmacy is currently open
   */
  isOpen(pharmacy) {
    if (pharmacy.isH24) return true;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [openH, openM] = pharmacy.hours.open.split(':').map(Number);
    const [closeH, closeM] = pharmacy.hours.close.split(':').map(Number);

    const openMinutes = openH * 60 + openM;
    const closeMinutes = closeH * 60 + closeM;

    return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
  },

  /**
   * Get pharmacy status: 'open', 'closed', 'garde-jour', 'garde-nuit'
   * @param {Object} pharmacy - Pharmacy object
   * @returns {string} Status string
   */
  getStatus(pharmacy) {
    const now = new Date();
    const gardeInfo = PharmacyData.isDeGarde(pharmacy.id, now);

    if (gardeInfo.isGarde) {
      const hours = now.getHours();
      const isNight = hours >= 20 || hours < 8; // Night guard hours: 20:00 to 08:00
      
      if (gardeInfo.type === 'nuit') {
        return isNight ? 'garde-nuit' : 'closed';
      } else if (gardeInfo.type === 'jour') {
        return isNight ? 'closed' : 'garde-jour';
      } else { // 'jour-nuit' or default
        return isNight ? 'garde-nuit' : 'garde-jour';
      }
    }

    return this.isOpen(pharmacy) ? 'open' : 'closed';
  },

  /**
   * Get status label in French
   * @param {string} status - Status string
   * @returns {string} French label
   */
  getStatusLabel(status) {
    const labels = {
      'open': 'Ouvert',
      'closed': 'Fermé',
      'garde-jour': 'De garde (jour)',
      'garde-nuit': 'De garde (nuit)'
    };
    return labels[status] || 'Inconnu';
  },

  /**
   * Get status CSS class
   * @param {string} status - Status string
   * @returns {string} CSS class name
   */
  getStatusClass(status) {
    const classes = {
      'open': 'open',
      'closed': 'closed',
      'garde-jour': 'garde',
      'garde-nuit': 'garde'
    };
    return classes[status] || 'closed';
  },

  /**
   * Debounce function
   * @param {Function} fn - Function to debounce
   * @param {number} delay - Delay in ms
   * @returns {Function} Debounced function
   */
  debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  /**
   * Remove accents for search (normalize NFD)
   * @param {string} str - Input string
   * @returns {string} String without accents
   */
  removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  },

  /**
   * Open Google Maps directions to target
   * @param {number} lat - Target latitude
   * @param {number} lng - Target longitude
   */
  openDirections(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, '_blank');
  },

  /**
   * Open Google Maps at location
   * @param {number} lat - Latitude
   * @param {number} lng - Longitude
   * @param {string} name - Location name
   */
  openInMaps(lat, lng, name) {
    const q = encodeURIComponent(name || '');
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${q}`;
    window.open(url, '_blank');
  },

  /**
   * Call phone number
   * @param {string} phone - Phone number
   */
  callPhone(phone) {
    if (!phone) {
      App.showToast('Numéro de téléphone non disponible', 'error');
      return;
    }
    window.location.href = `tel:${phone}`;
  },

  /**
   * Share pharmacy info (Web Share API or fallback to clipboard)
   * @param {Object} pharmacy - Pharmacy object
   */
  async sharePharmacy(pharmacy) {
    const status = this.getStatus(pharmacy);
    const statusLabel = this.getStatusLabel(status);
    const text = `${pharmacy.name}\n📍 ${pharmacy.address}, ${pharmacy.quartier}\n🕐 ${statusLabel}\n${pharmacy.phone ? '📞 ' + pharmacy.phone : ''}\n📌 https://www.google.com/maps?q=${pharmacy.lat},${pharmacy.lng}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: pharmacy.name,
          text: text,
          url: `https://www.google.com/maps?q=${pharmacy.lat},${pharmacy.lng}`
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          this._copyToClipboard(text);
        }
      }
    } else {
      this._copyToClipboard(text);
    }
  },

  /**
   * Copy text to clipboard with toast feedback
   * @param {string} text - Text to copy
   */
  async _copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      App.showToast('Informations copiées !', 'success');
    } catch (err) {
      /* Fallback for older browsers */
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      App.showToast('Informations copiées !', 'success');
    }
  },

  /**
   * Get current time formatted HH:MM
   * @returns {string} Formatted time
   */
  getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  },

  /**
   * Day of year helper
   * @param {Date} date - Date object
   * @returns {number} Day of year (1-366)
   */
  getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    return Math.floor(diff / 86400000);
  }
};
