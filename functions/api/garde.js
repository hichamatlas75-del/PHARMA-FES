export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const debug = url.searchParams.get('debug') === '1';

  // Vérification du cache Edge (uniquement hors mode debug)
  const cache = caches.default;
  if (!debug) {
    try {
      const cachedResponse = await cache.match(context.request.url);
      if (cachedResponse) {
        return cachedResponse;
      }
    } catch (e) {
      console.warn("Échec de la lecture du cache :", e.message);
    }
  }
  const zones = ['agdal', 'ain-chkef', 'les-merinides', 'medina-jnanat', 'saiss', 'zouagha'];
  const jours = [1, 2];

  const baseHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest'
  };

  /**
   * Fetch une combinaison zone/jour et retourne un diagnostic complet
   * (statut, type de contenu, aperçu du corps, erreur de parsing éventuelle)
   * au lieu d'avaler silencieusement les échecs.
   */
  async function fetchZoneJour(zone, jour) {
    const apiUrl = `https://www.telecontact.ma/trouver/pharmacie-guarde-zone-jour-fonctionalite.php?ville=fes&zone=${zone}&jour=${jour}&act=pharmacie-ville-zone`;
    const pageUrl = `https://www.telecontact.ma/pharmacie-de-garde-zone/fes/${zone}.html`;

    try {
      const res = await fetch(apiUrl, {
        headers: {
          ...baseHeaders,
          /* Beaucoup d'endpoints AJAX vérifient que la requête vient bien
             de leur propre page — sans ça, certains renvoient un corps
             vide ou une erreur silencieuse plutôt qu'un vrai 4xx/5xx. */
          'Referer': pageUrl,
          'Origin': 'https://www.telecontact.ma'
        }
      });

      const rawText = await res.text();
      let parsed = null;
      let parseError = null;
      try {
        parsed = JSON.parse(rawText);
      } catch (e) {
        parseError = e.message;
      }

      const items = (parsed && Array.isArray(parsed.data))
        ? parsed.data.map(p => ({ ...p, requestedJour: jour }))
        : [];

      return {
        zone,
        jour,
        apiUrl,
        status: res.status,
        ok: res.ok,
        contentType: res.headers.get('content-type'),
        bodyPreview: rawText.slice(0, 500),
        parseError,
        dataCount: parsed && Array.isArray(parsed.data) ? parsed.data.length : null,
        items
      };
    } catch (err) {
      return { zone, jour, apiUrl, fetchError: err.message, items: [] };
    }
  }

  try {
    const tasks = [];
    for (const zone of zones) {
      for (const jour of jours) {
        tasks.push(fetchZoneJour(zone, jour));
      }
    }
    const results = await Promise.all(tasks);

    /* ---- Mode diagnostic ----
       Visite /api/garde?debug=1 dans ton navigateur (qui, lui, a bien
       accès à telecontact.ma) pour voir exactement ce que chaque
       requête a reçu : statut HTTP, type de contenu, aperçu du corps,
       erreur de parsing JSON le cas échéant. */
    if (debug) {
      return new Response(JSON.stringify(results, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const allFetched = results.flatMap(r => r.items);

    // Deduplicate by code_firme
    const uniquePharmacies = new Map();
    allFetched.forEach(item => {
      const idKey = item.code_firme || `${item.rs_comp}_${item.tel}`;
      if (!uniquePharmacies.has(idKey)) {
        uniquePharmacies.set(idKey, item);
      } else {
        // Merge guard types: if a pharmacy appears as both jour and nuit, combine them
        const existing = uniquePharmacies.get(idKey);
        if (existing.requestedJour !== item.requestedJour) {
          existing.JOUR = '3'; // jour-nuit combined
        }
      }
    });

    const parsedRealGuards = [];
    uniquePharmacies.forEach(item => {
      if (!item.rs_comp) return;

      let guardType = 'jour-nuit';
      const jourVal = parseInt(item.JOUR);
      if (jourVal === 1) {
        guardType = 'jour';
      } else if (jourVal === 2) {
        guardType = 'nuit';
      } else if (jourVal === 3) {
        guardType = 'jour-nuit';
      } else {
        guardType = item.requestedJour === 2 ? 'nuit' : 'jour';
      }

      // Clean name
      let cleanName = item.rs_comp;
      cleanName = cleanName.replace(/&#x27;/g, "'")
                           .replace(/&amp;/g, "&")
                           .replace(/&quot;/g, '"')
                           .replace(/&#39;/g, "'")
                           .replace(/\s+/g, ' ')
                           .trim();

      // Normalize phone number
      const phone = item.tel ? item.tel.replace(/\s+/g, '') : '';

      parsedRealGuards.push({
        name: cleanName,
        phone: phone,
        lat: item.latitude ? parseFloat(item.latitude) : 0,
        lng: item.longitude ? parseFloat(item.longitude) : 0,
        guardType: guardType
      });
    });

    const response = new Response(JSON.stringify(parsedRealGuards), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, s-maxage=600'
      }
    });

    if (!debug) {
      try {
        context.waitUntil(cache.put(context.request.url, response.clone()));
      } catch (e) {
        console.warn("Échec de l'écriture dans le cache :", e.message);
      }
    }

    return response;

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
}