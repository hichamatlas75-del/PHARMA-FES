export async function onRequestGet(context) {
  try {
    const zones = ['agdal', 'ain-chkef', 'les-merinides', 'medina-jnanat', 'saiss', 'zouagha'];
    const jours = [1, 2];
    const fetchPromises = [];

    for (const zone of zones) {
      for (const jour of jours) {
        const url = `https://www.telecontact.ma/trouver/pharmacie-guarde-zone-jour-fonctionalite.php?ville=fes&zone=${zone}&jour=${jour}&act=pharmacie-ville-zone`;
        fetchPromises.push(
          fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'application/json, text/javascript, */*; q=0.01',
              'X-Requested-With': 'XMLHttpRequest'
            }
          })
          .then(async (res) => {
            if (!res.ok) return [];
            const json = await res.json();
            return (json.data || []).map(p => ({ ...p, requestedJour: jour }));
          })
          .catch(() => [])
        );
      }
    }

    const results = await Promise.all(fetchPromises);
    const allFetched = results.flat();

    // Deduplicate by code_firme
    const uniquePharmacies = new Map();
    allFetched.forEach(item => {
      const idKey = item.code_firme || `${item.rs_comp}_${item.tel}`;
      if (!uniquePharmacies.has(idKey)) {
        uniquePharmacies.set(idKey, item);
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

    return new Response(JSON.stringify(parsedRealGuards), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=120'
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
