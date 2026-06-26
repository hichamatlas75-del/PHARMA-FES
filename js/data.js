/* ============================================================
   PHARMA FÈS — Pharmacy Data & Database Logic (433 Real Pharmacies)
   ============================================================ */

const PharmacyData = {

  // List of real-time on-duty pharmacies fetched from the web
  realDeGardeList: null,

  /**
   * Complete database of Fès pharmacies
   */
  pharmacies: [
    {
      "id": 1,
      "name": "Pharmacie Acima",
      "address": "supermarché acima, bd allal ibn abdellah",
      "quartier": "Agdal",
      "phone": "0535944310",
      "lat": 34.0296079,
      "lng": -5.0105717,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 2,
      "name": "Pharmacie Addoha",
      "address": "lotiss. el fath bloc 73 bis",
      "quartier": "Zouagha",
      "phone": "0535606613",
      "lat": 34.023797,
      "lng": -5.0344722,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 3,
      "name": "Pharmacie Afifa",
      "address": "hay saada, résidence nour, rte ain chkef. face college al qods",
      "quartier": "Agdal",
      "phone": "0535608007",
      "lat": 34.0236472,
      "lng": -5.0100349,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 4,
      "name": "Pharmacie Agadir",
      "address": "hay essalam, près du direction provinciale de l'éducation nationale , zouagha, moulay yaakoub",
      "quartier": "Les Merinides",
      "phone": "0535646070",
      "lat": 34.0657394,
      "lng": -5.0128761,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 5,
      "name": "Pharmacie Agdal",
      "address": "hay badr, route vers l'autoroute. près de l'école arrokiy",
      "quartier": "Agdal",
      "phone": "0535612523",
      "lat": 34.0235374,
      "lng": -5.0235965,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 6,
      "name": "Pharmacie Ahayan",
      "address": "b27. jardins oued fès",
      "quartier": "Les Merinides",
      "phone": "0535700013",
      "lat": 34.052195,
      "lng": -5.0252563,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 7,
      "name": "Pharmacie Ahl Fes",
      "address": "264, lotissement aarsat zaytoun, ddoha, près du quartier industriel, ain chqef, fès",
      "quartier": "Zouagha",
      "phone": "0535966400",
      "lat": 33.9877104,
      "lng": -5.0408914,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 8,
      "name": "Pharmacie Aicha",
      "address": "lot al mostakbal, n° 204 route ras el ma bensouda",
      "quartier": "Zouagha",
      "phone": "0535681650",
      "lat": 34.0111367,
      "lng": -5.0650531,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 9,
      "name": "Pharmacie Aida",
      "address": "pharmacie aida, entre hay al mouadafine et hay al amal champs de course",
      "quartier": "Agdal",
      "phone": "0535941662",
      "lat": 34.0390484,
      "lng": -5.0183225,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 10,
      "name": "Pharmacie Ain Aamir",
      "address": "hay anas 3 proche de la clinique errazi route ain chkef",
      "quartier": "Agdal",
      "phone": "0535968845",
      "lat": 34.0030679,
      "lng": -5.0051374,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 11,
      "name": "Pharmacie Ain Chkef",
      "address": "commune ain chkef",
      "quartier": "Ain Chkef",
      "phone": "0535962645",
      "lat": 33.9976267,
      "lng": -5.011974,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 12,
      "name": "Pharmacie Ain Haroun",
      "address": "hay ain haroun rue 202 n°287",
      "quartier": "Les Merinides",
      "phone": "0535646444",
      "lat": 34.0665858,
      "lng": -5.009537,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 13,
      "name": "Pharmacie Ain Kadouss",
      "address": "av. youssef ben tachfine, ain kadous proche du cinéma mauritanie",
      "quartier": "Les Merinides",
      "phone": "0535646094",
      "lat": 34.0336561,
      "lng": -5.0485043,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 14,
      "name": "Pharmacie Ain Nokbi",
      "address": "hay ain nokbi jnane el morj",
      "quartier": "Medina Jnanat",
      "phone": "0535762266",
      "lat": 34.0617846,
      "lng": -4.9526825,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 15,
      "name": "Pharmacie Aïn Smen",
      "address": "bloc b 172 hay al wifaq route ain smen",
      "quartier": "Zouagha",
      "phone": "0535602419",
      "lat": 34.01202,
      "lng": -5.02622,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 16,
      "name": "Pharmacie Ait Skatto",
      "address": "29, rue soulaimane el mouahidi , hay ait skatto. près du café bronto",
      "quartier": "Agdal",
      "phone": "0535748673",
      "lat": 34.0260824,
      "lng": -5.0012035,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 17,
      "name": "Pharmacie Al Abawayne",
      "address": "lot 9 bloc 3 nassim ben souda",
      "quartier": "Zouagha",
      "phone": "0535726364",
      "lat": 33.9944371,
      "lng": -5.0625071,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 18,
      "name": "Pharmacie Al Akhawayn",
      "address": "bd ismailia. pres de l'arrondissement saiss",
      "quartier": "Saiss",
      "phone": "05356445950660420527",
      "lat": 34.0074565,
      "lng": -4.9804051,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 19,
      "name": "Pharmacie Al Alia",
      "address": "25 lot annasim route ain chkef, bd mohamed el fassi (en face de micro choix)",
      "quartier": "Agdal",
      "phone": "0535605388",
      "lat": 34.0139018,
      "lng": -5.0059757,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 20,
      "name": "Pharmacie Al Amane Fes",
      "address": "n° 2 résidence al amane, route la feray a cote banque populaire hay al massira",
      "quartier": "Zouagha",
      "phone": "0535655149",
      "lat": 33.9968375,
      "lng": -5.0531165,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 21,
      "name": "Pharmacie Al Ambra",
      "address": "38 bd ibn el khatib, derb el ward, route d'immouzer a coté station gaz smili",
      "quartier": "Agdal",
      "phone": "0535605614",
      "lat": 34.0234033,
      "lng": -5.0008999,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 22,
      "name": "Pharmacie Al Anouar",
      "address": "place lahbabi, bab el khokha lfakharine",
      "quartier": "Medina Jnanat",
      "phone": "0535649077",
      "lat": 34.0636001,
      "lng": -4.9639501,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 23,
      "name": "Pharmacie Al Azhar",
      "address": "résidence adarissa 2 en face de terrain et poste al adarissa",
      "quartier": "Agdal",
      "phone": "0535609065",
      "lat": 34.0191709,
      "lng": -5.0129119,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 24,
      "name": "Pharmacie Al Aziza",
      "address": "numéro 1 lotissement al aziza",
      "quartier": "Zouagha",
      "phone": "0535605075",
      "lat": 33.9937601,
      "lng": -5.0335716,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 25,
      "name": "Pharmacie Al Bouchra",
      "address": "64 hay jdid bensouda",
      "quartier": "Zouagha",
      "phone": "0535655983",
      "lat": 34.018337,
      "lng": -5.066892,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 26,
      "name": "Pharmacie Al Boukhari",
      "address": "n 27 rue youssef ibn tachfine. oued fès",
      "quartier": "Les Merinides",
      "phone": "0535754923",
      "lat": 34.0568427,
      "lng": -5.0357091,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 27,
      "name": "Pharmacie Al Fadila",
      "address": "n° 317 bd al karama mont fleuri 1 a cote arrondissement zohour",
      "quartier": "Saiss",
      "phone": "0535644231",
      "lat": 34.0117953,
      "lng": -4.9902127,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 28,
      "name": "Pharmacie Al Fajr",
      "address": "143 lot. riad narjiss",
      "quartier": "Saiss",
      "phone": "0535942303",
      "lat": 34.0155213,
      "lng": -4.9653097,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 29,
      "name": "Pharmacie Al Falah",
      "address": "lotissement 3 n°129. al hadika1. route de meknès, a coté r.a.d.e.e.f. oued",
      "quartier": "Les Merinides",
      "phone": "0535631412",
      "lat": 34.0554273,
      "lng": -5.0299973,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 30,
      "name": "Pharmacie Al Farabi",
      "address": "lotissement al hajoui. quartier fonctionnaire dokkarat. a cote du lycée isl",
      "quartier": "Agdal",
      "phone": "0535624147",
      "lat": 34.0369228,
      "lng": -5.0206543,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 31,
      "name": "Pharmacie Al Farouk",
      "address": "pharmacie al farouk, n° 9 bis hay sidi el hadi zouagha haute a cote mosquée sidi el hadi",
      "quartier": "Zouagha",
      "phone": "0535604772",
      "lat": 34.0204793,
      "lng": -5.0406298,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 32,
      "name": "Pharmacie Al Fath",
      "address": "",
      "quartier": "Fes",
      "phone": "0535623089",
      "lat": 34.037476,
      "lng": -5.000066,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 33,
      "name": "Pharmacie Al Firdaous - Ch",
      "address": "n°4, lotiss. jawahir bensouda",
      "quartier": "Zouagha",
      "phone": "0693877676",
      "lat": 34.030968,
      "lng": -5.064736,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 34,
      "name": "Pharmacie Al Hadika",
      "address": "pharmacie alhadika, lot. alhadika route meknes",
      "quartier": "Les Merinides",
      "phone": "0535703199",
      "lat": 34.0555058,
      "lng": -5.0232767,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 35,
      "name": "Pharmacie Al Hamd",
      "address": "hay almouja route zouagha. face centre sanitaire et la préfecture",
      "quartier": "Zouagha",
      "phone": "0653180996",
      "lat": 34.0280441,
      "lng": -5.0420655,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 36,
      "name": "Pharmacie Al Hanae",
      "address": "jnane tbib hay el m'cela, dehors bab lftouh. en face lot. tajmouati",
      "quartier": "Medina Jnanat",
      "phone": "0535763516",
      "lat": 34.0488573,
      "lng": -4.9629943,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 37,
      "name": "Pharmacie Al Hilal Green",
      "address": "n°63 rue27, oued fès, 100 mètre du marché oued fès",
      "quartier": "Les Merinides",
      "phone": "0535750922",
      "lat": 34.0612866,
      "lng": -5.033471,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 38,
      "name": "Pharmacie Al Ichrak",
      "address": "367 bd ahmed balafrej al adarissa",
      "quartier": "Agdal",
      "phone": "0535607787",
      "lat": 34.0167606,
      "lng": -5.0109578,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 39,
      "name": "Pharmacie Al Ihssane",
      "address": "route sefrou principale, en face acima, environ 70m",
      "quartier": "Saiss",
      "phone": "0535619400",
      "lat": 34.0101598,
      "lng": -4.9792405,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 40,
      "name": "Pharmacie Al Ikhlass",
      "address": "boulevard koufa n°25. route séfrou. pres municipal saiss",
      "quartier": "Saiss",
      "phone": "0535617056",
      "lat": 34.0071786,
      "lng": -4.9867867,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 41,
      "name": "Pharmacie Al Ikhwa",
      "address": "1 lotiss. marbella rte ain chkef",
      "quartier": "Agdal",
      "phone": "0535962095",
      "lat": 34.0068236,
      "lng": -5.0087905,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 42,
      "name": "Pharmacie Al Ilaj",
      "address": "736 hay el massira, ben souda",
      "quartier": "Zouagha",
      "phone": "0535728112",
      "lat": 33.9913412,
      "lng": -5.0620727,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 43,
      "name": "Pharmacie Al Imane",
      "address": "13, rue billal ben rabbah, rue 2 hay oued fés, en face de marjane",
      "quartier": "Les Merinides",
      "phone": "0535631793",
      "lat": 34.0522616,
      "lng": -5.0366504,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 44,
      "name": "Pharmacie Al Inaya",
      "address": "310 bd karaouiyine, narjis b",
      "quartier": "Saiss",
      "phone": "0535644273",
      "lat": 34.0166064,
      "lng": -4.9775556,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 45,
      "name": "Pharmacie Al Jamila",
      "address": "lot ghali, magasin n°38, 1 rte de sefrou",
      "quartier": "Saiss",
      "phone": "0535767758",
      "lat": 33.9900997,
      "lng": -4.9704553,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 46,
      "name": "Pharmacie Al Jawahir",
      "address": "82 lot al jawahir bensouda en face de lot chaimae ( mobile: 06 64 57 93 99 )",
      "quartier": "Zouagha",
      "phone": "0535974545",
      "lat": 34.0342938,
      "lng": -5.0613538,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 47,
      "name": "Pharmacie Al Kaoutar",
      "address": "n°210 bloc a, hay al wifaq soufla, route ain smen",
      "quartier": "Zouagha",
      "phone": "0535612499",
      "lat": 34.0136031,
      "lng": -5.0293645,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 48,
      "name": "Pharmacie Al Karam",
      "address": "37 bis, rue 6. lot. najah. dher rricha. hay bensliman",
      "quartier": "Les Merinides",
      "phone": "0535703368",
      "lat": 34.0699092,
      "lng": -4.9891904,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 49,
      "name": "Pharmacie Al Khattabi",
      "address": "groupe addoha zouagha",
      "quartier": "Zouagha",
      "phone": "0535729919",
      "lat": 34.0139363,
      "lng": -5.0434335,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 50,
      "name": "Pharmacie Al Khawarizmi",
      "address": "410, hay jdid bensouda, a coté école ex-boughaba",
      "quartier": "Zouagha",
      "phone": "0535655773",
      "lat": 34.0183369,
      "lng": -5.0668915,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 51,
      "name": "Pharmacie Al Kobba",
      "address": "",
      "quartier": "Fes",
      "phone": "0535669159",
      "lat": 34.0644072,
      "lng": -4.9549902,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 52,
      "name": "Pharmacie Al Majd",
      "address": "pharmacie almajd, bd al karaouine, b, narjis",
      "quartier": "Saiss",
      "phone": "0535616447",
      "lat": 34.0158944,
      "lng": -4.9766044,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 53,
      "name": "Pharmacie Al Makkia",
      "address": "pharmacie almakkia, n°24, bd benmakhlouf, sehrij guenaoua",
      "quartier": "Medina Jnanat",
      "phone": "0535764246",
      "lat": 34.0507379,
      "lng": -4.9572886,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 54,
      "name": "Pharmacie Al Marwa",
      "address": "",
      "quartier": "Fes",
      "phone": "0535646499",
      "lat": 34.0607959,
      "lng": -5.0286279,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 55,
      "name": "Pharmacie Al Mawada",
      "address": "lot. al qaraouiyine route ain chkef. en face de l'université privé de fès upf",
      "quartier": "Agdal",
      "phone": "0535963488",
      "lat": 34.0069853,
      "lng": -5.0179737,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 56,
      "name": "Pharmacie Al Mouahidine",
      "address": "bd mouahidine dekkarat, hay az allah",
      "quartier": "Agdal",
      "phone": "0535621919",
      "lat": 34.0389082,
      "lng": -5.0329072,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 57,
      "name": "Pharmacie Al Moussaoui",
      "address": "32 rue 8 proche du club de tennis oued fes (mobie: 0550023966)",
      "quartier": "Zouagha",
      "phone": "0535729218",
      "lat": 34.0328922,
      "lng": -5.047751,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 58,
      "name": "Pharmacie Al Najoua",
      "address": "n°1. rue 9. hay mikou. al marja",
      "quartier": "Zouagha",
      "phone": "0535655648",
      "lat": 34.0361859,
      "lng": -5.03772,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 59,
      "name": "Pharmacie Al Omniya",
      "address": "n°85, lotissement om al qora, (entre mosquée att'akhi et atacadao)",
      "quartier": "Zouagha",
      "phone": "0532019514",
      "lat": 34.0276003,
      "lng": -5.0525939,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 60,
      "name": "Pharmacie Al Omrane",
      "address": "bloc a5 numéro 2, 3 nassim bensouda. près du mosquée bensouda",
      "quartier": "Zouagha",
      "phone": "0535655571",
      "lat": 34.0125609,
      "lng": -5.059247,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 61,
      "name": "Pharmacie Al Ouafae",
      "address": "pharmacie alouafae, boulevard al ouiafae 2 narjis, route de sefrou",
      "quartier": "Saiss",
      "phone": "0535619201",
      "lat": 34.0112189,
      "lng": -4.9763526,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 62,
      "name": "Pharmacie Al Oum",
      "address": "pharmacie aloum, bloc 3 numéro 12 hay sidi boudher el merja",
      "quartier": "Zouagha",
      "phone": "0535726270",
      "lat": 34.0251931,
      "lng": -5.0449531,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 63,
      "name": "Pharmacie Al Oumma",
      "address": "zouagha proche du passage de chemin de fer",
      "quartier": "Zouagha",
      "phone": "0535600426",
      "lat": 34.0232185,
      "lng": -5.0383942,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 64,
      "name": "Pharmacie Al Qods",
      "address": "pharmacie al qods, bd principale n° 1 ben souda",
      "quartier": "Zouagha",
      "phone": "0535655068",
      "lat": 34.0156405,
      "lng": -5.0512004,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 65,
      "name": "Pharmacie Al Wahda",
      "address": "hay al wahda n° 1 bensouda à cote du mosquée al mohsinine",
      "quartier": "Zouagha",
      "phone": "0535726773",
      "lat": 34.0132168,
      "lng": -5.0514716,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 66,
      "name": "Pharmacie Al Wassila",
      "address": "lotissement al wafaa 4. route séfrou",
      "quartier": "Saiss",
      "phone": "0535619616",
      "lat": 34.0068663,
      "lng": -4.9747973,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 67,
      "name": "Pharmacie Al Wissal",
      "address": "résidence zahra projet wiam n°1 bensouda lyrak proche de hay al massira",
      "quartier": "Zouagha",
      "phone": "0664140599",
      "lat": 33.9952412,
      "lng": -5.0560575,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 68,
      "name": "Pharmacie Al Youmne",
      "address": "lotissement dalila. résidence dalia. près de addoha",
      "quartier": "Zouagha",
      "phone": "0535726564",
      "lat": 34.0092557,
      "lng": -5.0413397,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 69,
      "name": "Pharmacie Al Yousr",
      "address": "rte d'imouzzer, lot 15 cplxe essalam, derb chraibi, 400 m du clinique al kaoutar",
      "quartier": "Agdal",
      "phone": "0535609293",
      "lat": 34.012366,
      "lng": -5.0027424,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 70,
      "name": "Pharmacie Alae Arrahmane",
      "address": "pharmacie alae arrahmane, riad narjis, près du souk aouinat hojaj",
      "quartier": "Saiss",
      "phone": "0535616169",
      "lat": 34.0516802,
      "lng": -5.0433317,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 71,
      "name": "Pharmacie Almaz",
      "address": "lot. almaz, immeuble 57, magasin 45, rte sefrou, zouhour 2",
      "quartier": "Saiss",
      "phone": "0611351410",
      "lat": 33.9904688,
      "lng": -4.9797591,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 72,
      "name": "Pharmacie Amal Chifae",
      "address": "n°113, lotissement. chams 2 bensouda fès",
      "quartier": "Zouagha",
      "phone": "0601919462",
      "lat": 34.0404482,
      "lng": -5.0087851,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 73,
      "name": "Pharmacie Amine",
      "address": "n°32 double route jadida rassif proche de l'hopital route el jadida",
      "quartier": "Medina Jnanat",
      "phone": "0535760770",
      "lat": 34.0585191,
      "lng": -4.9735643,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 74,
      "name": "Pharmacie Amrani",
      "address": "bd lalla meryem place florence. entre mosquée ttajmouâti et banc du maroc",
      "quartier": "Agdal",
      "phone": "0535624238",
      "lat": 34.0419913,
      "lng": -5.0034098,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 75,
      "name": "Pharmacie Annamae",
      "address": "pharmacie annamae, hay annamae lot 354 bensouda, route hay al massira",
      "quartier": "Zouagha",
      "phone": "0608186722",
      "lat": 33.9986675,
      "lng": -5.0577644,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 76,
      "name": "Pharmacie Annasim",
      "address": "n°3. bloc r6. annasim ben souda. a coté de hay al massira",
      "quartier": "Zouagha",
      "phone": "0635655428",
      "lat": 33.9944247,
      "lng": -5.0595832,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 77,
      "name": "Pharmacie Anoual",
      "address": "bloc f n°1 hay ain qadouss, près du mosquée hay m'cella. face du préfecture ain qadous",
      "quartier": "Les Merinides",
      "phone": "0535701302",
      "lat": 34.0619755,
      "lng": -5.009365,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 78,
      "name": "Pharmacie Aouinat Elhajjaj",
      "address": "pharmacie aouinat elhajjaj, bloc a n°434 aouinate el hajaj",
      "quartier": "Saiss",
      "phone": "0538387141",
      "lat": 34.02008,
      "lng": -4.96728,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 79,
      "name": "Pharmacie Arrabie",
      "address": "lot 4-6 lot farah, résidence arrabie bensouda",
      "quartier": "Zouagha",
      "phone": "0535681068",
      "lat": 34.0010182,
      "lng": -5.0501089,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 80,
      "name": "Pharmacie Arrachad",
      "address": "hay griou, bloc c n°42. face collège al wifaq",
      "quartier": "Zouagha",
      "phone": "0535748055",
      "lat": 34.01552582,
      "lng": -5.0268507,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 81,
      "name": "Pharmacie Arrahma",
      "address": "labita dher lkhmiss",
      "quartier": "Les Merinides",
      "phone": "0535645391",
      "lat": 34.0683403,
      "lng": -4.9952276,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 82,
      "name": "Pharmacie Arrajae",
      "address": "pharmacie errajae, a 100m du station taxi et le marché hay al merja",
      "quartier": "Zouagha",
      "phone": "0535726162",
      "lat": 34.03271,
      "lng": -5.047852,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 83,
      "name": "Pharmacie Arrayhane",
      "address": "rte de sefrou lot. arrayhane 2 imm. 7 n°16",
      "quartier": "Saiss",
      "phone": "0535765506",
      "lat": 33.9945202,
      "lng": -4.9794905,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 84,
      "name": "Pharmacie Arrazi",
      "address": "route d'immouzer a coté du super marché ahlan",
      "quartier": "Agdal",
      "phone": "0535640784",
      "lat": 34.0260606,
      "lng": -4.9976251,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 85,
      "name": "Pharmacie Arreda",
      "address": "numero 1 bloc a. marja wosta proche du hamam riyad",
      "quartier": "Zouagha",
      "phone": "0535729299",
      "lat": 34.036424,
      "lng": -5.0515804,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 86,
      "name": "Pharmacie Asmae",
      "address": "122 s narjis , 42 bd rachad , 200 metres du hamam narjis",
      "quartier": "Saiss",
      "phone": "0535732193",
      "lat": 34.0136448,
      "lng": -4.9752165,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 87,
      "name": "Pharmacie Assafae",
      "address": "91 hay massira ii benssouda",
      "quartier": "Zouagha",
      "phone": "0535729135",
      "lat": 33.9919599,
      "lng": -5.0678801,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 88,
      "name": "Pharmacie Assafwa",
      "address": "numero 24 lot. alalej bensouda. face charité tajmouaati et l'usine sayss du lait",
      "quartier": "Zouagha",
      "phone": "0535729153",
      "lat": 34.0215063,
      "lng": -5.0490094,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 89,
      "name": "Pharmacie Assalama",
      "address": "n°7. rue jordanie, ex-damas. hay la gare- a coté de l'institut quortoba et la salle du sport zgoud",
      "quartier": "Agdal",
      "phone": "0535621300",
      "lat": 34.0451989,
      "lng": -5.0029903,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 90,
      "name": "Pharmacie Assanabil",
      "address": "pharmacie asanabil, immeuble bennani, bd sanabil. pres du dernier arrêt du bus n°14",
      "quartier": "Zouagha",
      "phone": "0535606379",
      "lat": 34.021274,
      "lng": -5.0354208,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 91,
      "name": "Pharmacie Attaakhi",
      "address": "362 hay bensouda star assakan al marja",
      "quartier": "Zouagha",
      "phone": "0532111599",
      "lat": 34.0323997,
      "lng": -5.051506,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 92,
      "name": "Pharmacie Attadamoun",
      "address": "bloc 30 b el menzah sahrij gnawa. face école imam chafii",
      "quartier": "Medina Jnanat",
      "phone": "0535649215",
      "lat": 33.9420388,
      "lng": -5.0567979,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 93,
      "name": "Pharmacie Attouraya",
      "address": "pharmacie attouraya, bled hajoui ben dbab, rue 12 n° 27",
      "quartier": "Les Merinides",
      "phone": "0535700939",
      "lat": 34.0697595,
      "lng": -4.9957298,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 94,
      "name": "Pharmacie Averroès",
      "address": "n°9, rue ibn hajar, labita. la gare derrière collège imame ali, à 200m du consulat de france en face de bain sekkat",
      "quartier": "Agdal",
      "phone": "0535622890",
      "lat": 34.0434049,
      "lng": -5.0099964,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 95,
      "name": "Pharmacie Avicenne De Fes",
      "address": "",
      "quartier": "Fes",
      "phone": "0532086957",
      "lat": 34.0108462,
      "lng": -4.950113,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 96,
      "name": "Pharmacie Aya Fes",
      "address": "32 b lot zahrat madain 1, route ain chkef, en face de l'école mohamed zafzaf",
      "quartier": "Agdal",
      "phone": "0535693660",
      "lat": 34.0024776,
      "lng": -5.0203976,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 97,
      "name": "Pharmacie Aya Sofia",
      "address": "",
      "quartier": "Fes",
      "phone": "0535603314",
      "lat": 34.0186675,
      "lng": -5.0408091,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 98,
      "name": "Pharmacie Ayoub",
      "address": "n° 189 bis. bloc a hay krio zouagha olya proche du hamam soussi",
      "quartier": "Zouagha",
      "phone": "0532054933",
      "lat": 34.0156961,
      "lng": -5.0325711,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 99,
      "name": "Pharmacie Azzahrae",
      "address": "bd mohamed 6 route ain smen a cote hay lalla soukaina hay badr",
      "quartier": "Agdal",
      "phone": "0535600486",
      "lat": 34.0201177,
      "lng": -5.0235217,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 100,
      "name": "Pharmacie Azzahraouayne",
      "address": "1, bab atlas, lot n° 41",
      "quartier": "Zouagha",
      "phone": "0535655250",
      "lat": 34.0247339,
      "lng": -5.0429771,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 101,
      "name": "Pharmacie Azzaytoune",
      "address": "pharmacie azzaytoune, lot. azzaytoune km 7 n 8 ras el ma bensouda",
      "quartier": "Zouagha",
      "phone": "0535726898",
      "lat": 34.008,
      "lng": -5.066,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 102,
      "name": "Pharmacie Azzouzi",
      "address": "n° 47 boulevard el wahda narjis b proche de la mosquée chraibi et banque bmce",
      "quartier": "Saiss",
      "phone": "0535960428",
      "lat": 34.0155824,
      "lng": -4.9802895,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 103,
      "name": "Pharmacie Bab Boujloud",
      "address": "place bab boujloud fès médina",
      "quartier": "Medina Jnanat",
      "phone": "0535633222",
      "lat": 34.0619756,
      "lng": -4.9857939,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 104,
      "name": "Pharmacie Bab El Ghoul",
      "address": "n° 85, bab el ghoul, dher el mehrez. a coté de l'hôpital al ghassani",
      "quartier": "Agdal",
      "phone": "0535626927",
      "lat": 34.042955,
      "lng": -4.9894215,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 105,
      "name": "Pharmacie Bab El Khokha",
      "address": "lotissement najah, bab el khokha",
      "quartier": "Medina Jnanat",
      "phone": "0535649610",
      "lat": 34.0638323,
      "lng": -4.961036,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 106,
      "name": "Pharmacie Bab Guissa",
      "address": "numéro 25 bab guissa a cote du palais jamaai",
      "quartier": "Medina Jnanat",
      "phone": "0535635584",
      "lat": 34.068623,
      "lng": -4.9757032,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 107,
      "name": "Pharmacie Badr",
      "address": "hay anas, hay adarissa, route ain smen",
      "quartier": "Agdal",
      "phone": "0535609062",
      "lat": 34.0215987,
      "lng": -5.0167602,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 108,
      "name": "Pharmacie Bahia",
      "address": "bd midelt, hay najah sidi brahim",
      "quartier": "Saiss",
      "phone": "0535732870",
      "lat": 34.0248246,
      "lng": -4.9854877,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 109,
      "name": "Pharmacie Bahja",
      "address": "boulevard mohamed 5",
      "quartier": "Agdal",
      "phone": "0535622441",
      "lat": 34.0388824,
      "lng": -5.0008439,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 110,
      "name": "Pharmacie Basma",
      "address": "pharmacie basma, n°1227 hay jdid zouagha",
      "quartier": "Zouagha",
      "phone": "0535603313",
      "lat": 34.0173431,
      "lng": -5.0331285,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 111,
      "name": "Pharmacie Bayrout",
      "address": "139 bd bayrout, route sefrou a coté farina (tel2: 0535619660)",
      "quartier": "Saiss",
      "phone": "0532111537",
      "lat": 34.0078871,
      "lng": -4.984039,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 112,
      "name": "Pharmacie Bd Du Golan",
      "address": "poste atlas vers lido, a cote ancienne lacigogne, bd du golan",
      "quartier": "Fes",
      "phone": "0535733109",
      "lat": 34.03219,
      "lng": -4.99417,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 113,
      "name": "Pharmacie Bekkali",
      "address": "206 bd rabia hay hassani 3 route ain chkef",
      "quartier": "Agdal",
      "phone": "0535612184",
      "lat": 34.0172451,
      "lng": -5.0147536,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 114,
      "name": "Pharmacie Bel Air",
      "address": "lot. bel air hay riad narjis",
      "quartier": "Saiss",
      "phone": "0649895356",
      "lat": 34.0126914,
      "lng": -4.9620063,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 115,
      "name": "Pharmacie Bel Bacha",
      "address": "pharmacie bel bacha, bd allal ben abdellah, rue mohamed ba hnini, a coté res mimoza",
      "quartier": "Agdal",
      "phone": "0535654870",
      "lat": 34.0126429,
      "lng": -4.9607711,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 116,
      "name": "Pharmacie Bencheikh",
      "address": "170 bd riad hay el wafae ii narjiss",
      "quartier": "Saiss",
      "phone": "0535614806",
      "lat": 34.0129436,
      "lng": -4.9703774,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 117,
      "name": "Pharmacie Benjelloun",
      "address": "lotiss krikach, n°24 hay tarik a coté de l'école malaika en face du palais",
      "quartier": "Agdal",
      "phone": "0535610967",
      "lat": 34.0268021,
      "lng": -5.0219356,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 118,
      "name": "Pharmacie Benkirane",
      "address": "numéro 83, lot. daiaa 2, ain kadous",
      "quartier": "Les Merinides",
      "phone": "05357010970532018516",
      "lat": 34.0258981,
      "lng": -4.9952304,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 119,
      "name": "Pharmacie Benmimoun",
      "address": "pharmacie benmimoun, 60, rue annasr hay riad, route ain smen",
      "quartier": "Agdal",
      "phone": "0535610848",
      "lat": 34.0403324,
      "lng": -4.982987,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 120,
      "name": "Pharmacie Bennani",
      "address": "hay tarik 1 a cote de palais sanabile",
      "quartier": "Agdal",
      "phone": "0535608788",
      "lat": 34.0326048,
      "lng": -5.0234229,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 121,
      "name": "Pharmacie Bennouna",
      "address": "n° 273 hay badr a coté de l'école 11 janvier",
      "quartier": "Agdal",
      "phone": "0535604774",
      "lat": 34.0230715,
      "lng": -5.0237588,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 122,
      "name": "Pharmacie Bensouda",
      "address": "hay m'cella bensouda",
      "quartier": "Zouagha",
      "phone": "0535726563",
      "lat": 34.0171679,
      "lng": -5.0554329,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 123,
      "name": "Pharmacie Berrada",
      "address": "n 212 hay mohammadi ain kadous. pres du clinique tajmouaati",
      "quartier": "Les Merinides",
      "phone": "0535631068",
      "lat": 34.059113,
      "lng": -5.0159567,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 124,
      "name": "Pharmacie Bismillah",
      "address": "lotissement al wahda1037, bensouda (nouvelle mosquée)",
      "quartier": "Zouagha",
      "phone": "0535655665",
      "lat": 34.0427119,
      "lng": -5.0100875,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 125,
      "name": "Pharmacie Blanco",
      "address": "35 rte ain chkef al yassmine riad",
      "quartier": "Agdal",
      "phone": "0535967093",
      "lat": 33.9996764,
      "lng": -5.0092107,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 126,
      "name": "Pharmacie Bled Tahiriyine",
      "address": "bled belmakhlouf n°46 rue1. tahiriyine",
      "quartier": "Medina Jnanat",
      "phone": "0535630682",
      "lat": 34.0474147,
      "lng": -4.9585355,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 127,
      "name": "Pharmacie Blida",
      "address": "n°30 chouwara. hay blida fès medina, entre sidi ahmed tijani et dar dbagh",
      "quartier": "Medina Jnanat",
      "phone": "0632775720",
      "lat": 34.0663839,
      "lng": -5.0083444,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 128,
      "name": "Pharmacie Bouchra",
      "address": "",
      "quartier": "Fes",
      "phone": "0535962961",
      "lat": 33.966552,
      "lng": -5.027265,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 129,
      "name": "Pharmacie Boughafer",
      "address": "29 rue boughafer narjiss a",
      "quartier": "Saiss",
      "phone": "0535732336",
      "lat": 34.0228584,
      "lng": -4.9864814,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 130,
      "name": "Pharmacie Bouramana",
      "address": "29 avenue khalid ibn walid. derb cristiani, a cote de l'école mekouar, bouramana",
      "quartier": "Saiss",
      "phone": "0535733320",
      "lat": 34.0255559,
      "lng": -4.9972012,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 131,
      "name": "Pharmacie Bouslama",
      "address": "",
      "quartier": "Fes",
      "phone": "0535608106",
      "lat": 34.0002587,
      "lng": -4.99493,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 132,
      "name": "Pharmacie Bouslikhane",
      "address": "",
      "quartier": "Fes",
      "phone": "0535604525",
      "lat": 34.0093104,
      "lng": -5.0284016,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 133,
      "name": "Pharmacie Boutouil",
      "address": "46 boutouil, derb btatha, fes jdid a cote ecole bab ryafa",
      "quartier": "Medina Jnanat",
      "phone": "0535652845",
      "lat": 34.0560401,
      "lng": -4.9870892,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 134,
      "name": "Pharmacie Bouziane",
      "address": "n°40. jnane benkirane, rue 1. sidi boujida, près du collège abbas bennani",
      "quartier": "Medina Jnanat",
      "phone": "0535764887",
      "lat": 34.067104,
      "lng": -4.960253,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 135,
      "name": "Pharmacie Bvd Du Golan",
      "address": "poste atlas vers lido, a cote ancienne lacigogne, bd du golan",
      "quartier": "Agdal",
      "phone": "0535733109",
      "lat": 34.03219,
      "lng": -4.99417,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 136,
      "name": "Pharmacie Bvd Mohamed Vi",
      "address": "pharmacie bvd mohamed vi, 70 lotissement. mohammedia",
      "quartier": "Zouagha",
      "phone": "0535604135",
      "lat": 34.0263639,
      "lng": -5.028244,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 137,
      "name": "Pharmacie Centrale",
      "address": "pharmacie centrale, boulevard mohamed 5",
      "quartier": "Agdal",
      "phone": "0535622504",
      "lat": 34.036761,
      "lng": -4.9978456,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 138,
      "name": "Pharmacie Centrale Ain Chkef",
      "address": "arrondissement ain chkef, lotissement jnane1",
      "quartier": "Ain Chkef",
      "phone": "0653828311",
      "lat": 33.966428,
      "lng": -5.027384,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 139,
      "name": "Pharmacie Champs De Course",
      "address": "n° 7 hay al amal champs de course a coté école des champs",
      "quartier": "Agdal",
      "phone": "0535652338",
      "lat": 34.0365542,
      "lng": -5.0084996,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 140,
      "name": "Pharmacie Chaymae",
      "address": "lotissement al madina n°28 lotissement chaymae. bensouda",
      "quartier": "Zouagha",
      "phone": "0535721354",
      "lat": 34.0324029,
      "lng": -5.0585278,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 141,
      "name": "Pharmacie Chifa",
      "address": "arrondissement ain chkef, douar lbsays",
      "quartier": "Ain Chkef",
      "phone": "0673718378",
      "lat": 33.9982,
      "lng": -5.0203,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 142,
      "name": "Pharmacie Chifae",
      "address": "bd des far, route de meknès a coté café al alam",
      "quartier": "Agdal",
      "phone": "0535650544",
      "lat": 34.0407799,
      "lng": -5.0141234,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 143,
      "name": "Pharmacie Chifae Arrahmane",
      "address": "165 lot. riad allaymoune route meknes",
      "quartier": "Les Merinides",
      "phone": "0535647718",
      "lat": 34.0516355,
      "lng": -5.0456938,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 144,
      "name": "Pharmacie Chifae Oulad Maala",
      "address": "hay ain chkef douar oulad maala",
      "quartier": "Ain Chkef",
      "phone": "0666271416",
      "lat": 34.0405315,
      "lng": -5.0087831,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 145,
      "name": "Pharmacie Chraibi",
      "address": "28 rue 5 hay hassani ben dbab",
      "quartier": "Les Merinides",
      "phone": "0655489570",
      "lat": 34.0703392,
      "lng": -4.9970752,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 146,
      "name": "Pharmacie Chu Hassan 2",
      "address": "route de séfrou, 400 m de acima, direction du complexe sportif à coté du café challenger",
      "quartier": "Saiss",
      "phone": "0535615899",
      "lat": 34.0346207,
      "lng": -4.9810798,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 147,
      "name": "Pharmacie City Golf",
      "address": "n°203. lotissement jardins oued fès",
      "quartier": "Les Merinides",
      "phone": "0665450467",
      "lat": 34.0492982,
      "lng": -5.0310775,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 148,
      "name": "Pharmacie Complexe Sportif",
      "address": "28, bd arrahma narjis d. hay al qods. près de l'école al bakri et mosquée arrahma",
      "quartier": "Saiss",
      "phone": "0535732873",
      "lat": 34.0171017,
      "lng": -4.9699202,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 149,
      "name": "Pharmacie Conseil",
      "address": "lot. al wafae route sefrou en face de l'hotel narjis",
      "quartier": "Saiss",
      "phone": "0535619162",
      "lat": 34.0131971,
      "lng": -4.9842288,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 150,
      "name": "Pharmacie Corniche Oued Fès",
      "address": "",
      "quartier": "Fes",
      "phone": "0607088943",
      "lat": 34.0509841,
      "lng": -5.0283353,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 151,
      "name": "Pharmacie Cotef",
      "address": "lotissement. el fath n° 12 lyrak. sidi brahim. près du banque populaire",
      "quartier": "Saiss",
      "phone": "0535730473",
      "lat": 34.0227157,
      "lng": -4.9780636,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 152,
      "name": "Pharmacie Daif",
      "address": "n°586. lotissement aziza. route ain ckef",
      "quartier": "Agdal",
      "phone": "0535607397",
      "lat": 33.9975918,
      "lng": -5.0371967,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 153,
      "name": "Pharmacie Dalia",
      "address": "569 lotiss. al moustakbal hay almassira",
      "quartier": "Zouagha",
      "phone": "0535726925",
      "lat": 33.9935443,
      "lng": -5.0521737,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 154,
      "name": "Pharmacie Dar Es-salam",
      "address": "3, résid. el mahmi, bd mohamed 6. zougha haute",
      "quartier": "Zouagha",
      "phone": "0535600860",
      "lat": 34.0232632,
      "lng": -5.0287799,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 155,
      "name": "Pharmacie Dayaa",
      "address": "numéro 11 ain kadous a cote mosquée dayaa",
      "quartier": "Les Merinides",
      "phone": "0535755039",
      "lat": 34.0338126,
      "lng": -5.0349768,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 156,
      "name": "Pharmacie De France",
      "address": "n° 46 bd hassan 2 en face immeuble al watanya, et a coté porte quissariat el alej",
      "quartier": "Agdal",
      "phone": "0535622309",
      "lat": 34.0428408,
      "lng": -5.0010216,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 157,
      "name": "Pharmacie De L'atlas",
      "address": "place atlas",
      "quartier": "Agdal",
      "phone": "0535641828",
      "lat": 34.0316397,
      "lng": -4.9946871,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 158,
      "name": "Pharmacie De L'hôpital",
      "address": "boulevard mohamed slaoui. a coté du clinique slayki",
      "quartier": "Agdal",
      "phone": "0535626468",
      "lat": 34.0392486,
      "lng": -4.9936096,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 159,
      "name": "Pharmacie De L'hôpital Universitaire",
      "address": "hay al amal bd madina monaouara",
      "quartier": "Saiss",
      "phone": "0532110816",
      "lat": 34.0266888,
      "lng": -5.0308009,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 160,
      "name": "Pharmacie De La Gare",
      "address": "rue imam chafii hay la gare, derrière mosquée imam ali",
      "quartier": "Agdal",
      "phone": "0535652475",
      "lat": 34.0448431,
      "lng": -5.0066483,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 161,
      "name": "Pharmacie De La Santé",
      "address": "n° 58 bd ismailia mont fleuri 1, près du hammam boumehdi",
      "quartier": "Saiss",
      "phone": "0535656723",
      "lat": 34.0128456,
      "lng": -4.9854532,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 162,
      "name": "Pharmacie De Paris",
      "address": "n°156, avenue wahran. rue de paris montfleuri1. a coté mosquée al fath et marché monfleuri",
      "quartier": "Saiss",
      "phone": "0535960941",
      "lat": 34.0103805,
      "lng": -4.9858207,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 163,
      "name": "Pharmacie Debbagh",
      "address": "bd abou obeida ibnou al jarrah",
      "quartier": "Agdal",
      "phone": "0535622381",
      "lat": 34.0428163,
      "lng": -5.0038728,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 164,
      "name": "Pharmacie Demnati",
      "address": "hay gryou bloc b,n° 9. près l'école jamal eddine al afghani",
      "quartier": "Zouagha",
      "phone": "0535600784",
      "lat": 34.0207449,
      "lng": -5.0326197,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 165,
      "name": "Pharmacie Derb El Ward",
      "address": "route imouzer bd ibn el khatib direction route ain chqef a coté hammam elbacha",
      "quartier": "Agdal",
      "phone": "0535606767",
      "lat": 34.0100955,
      "lng": -5.0352723,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 166,
      "name": "Pharmacie Derb Lamty",
      "address": "n°1, derb lamty, rue fouah, r'cif",
      "quartier": "Medina Jnanat",
      "phone": "0535761583",
      "lat": 34.0306458,
      "lng": -5.0087577,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 167,
      "name": "Pharmacie Des Far",
      "address": "début dokkarat, route meknès",
      "quartier": "Agdal",
      "phone": "0535942250",
      "lat": 34.0409616,
      "lng": -5.016986,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 168,
      "name": "Pharmacie Des Platanes",
      "address": "6 bd al wahda hay hassani route ain chkef",
      "quartier": "Agdal",
      "phone": "0535962928",
      "lat": 34.0049202,
      "lng": -5.0074723,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 169,
      "name": "Pharmacie Des Roches",
      "address": "69, lot. riad al yassamine, rte ain chkef",
      "quartier": "Agdal",
      "phone": "0535966061",
      "lat": 33.9945938,
      "lng": -5.0097656,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 170,
      "name": "Pharmacie Des Sciences",
      "address": "12 bis lotissement al quaraouine. route de l'autoroute. près de l'école de technologie",
      "quartier": "Agdal",
      "phone": "0535966637",
      "lat": 34.0104753,
      "lng": -5.0176469,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 171,
      "name": "Pharmacie Diamant De Fes",
      "address": "ferme ibn abdellah. km 5. route séfrou (mobile2: 0654420072 )",
      "quartier": "Saiss",
      "phone": "0664079593",
      "lat": 33.9997749,
      "lng": -5.0122414,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 172,
      "name": "Pharmacie Diamant Vert",
      "address": "route ain chkef, entre café blanco et café l'unika",
      "quartier": "Agdal",
      "phone": "0535962273",
      "lat": 34.0008909,
      "lng": -5.0126217,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 173,
      "name": "Pharmacie Diar Ofok",
      "address": "n°20 imm g, route bensouda fes, lot. diar ofok",
      "quartier": "Zouagha",
      "phone": "0535685901",
      "lat": 34.000899,
      "lng": -5.0101303,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 174,
      "name": "Pharmacie Docteur Mounir",
      "address": "bd anawal narjiss d en face centre de santé aouinat el hajjaj",
      "quartier": "Saiss",
      "phone": "0535619377",
      "lat": 34.0190089,
      "lng": -4.9694843,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 175,
      "name": "Pharmacie Dokkarat",
      "address": "a coté mosquée al azhar. route meknès, vers le pont dokkarat",
      "quartier": "Agdal",
      "phone": "0535620921",
      "lat": 34.0392401,
      "lng": -5.0129692,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 176,
      "name": "Pharmacie Driss",
      "address": "2 lot. almssala, hay al mssala bab ftouh",
      "quartier": "Medina Jnanat",
      "phone": "0532002800",
      "lat": 34.0500859,
      "lng": -4.9689278,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 177,
      "name": "Pharmacie Du Boulevard",
      "address": "pharmacie du bouelvard, bd chefchaouni",
      "quartier": "Agdal",
      "phone": "0535624888",
      "lat": 34.0412473,
      "lng": -4.99652,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 178,
      "name": "Pharmacie Du Ravin",
      "address": "n°26 rue omar elidrissi. direction llidou. passant à côté du l ecole de commerce et l institut de la musique",
      "quartier": "Agdal",
      "phone": "0535624785",
      "lat": 34.0345554,
      "lng": -4.9938759,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 179,
      "name": "Pharmacie Echadli",
      "address": "pharmacie echadli, rue 45 s lotissement al anbra, rte ain smen",
      "quartier": "Zouagha",
      "phone": "05359648990660871646",
      "lat": 34.0076728,
      "lng": -5.0309511,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 180,
      "name": "Pharmacie El Attar",
      "address": "hay jini, rue 8 doukkarat, proche de dispensaire doukkarat",
      "quartier": "Agdal",
      "phone": "0535943030",
      "lat": 34.0424904,
      "lng": -5.0167407,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 181,
      "name": "Pharmacie El Awab",
      "address": "douar ouled maalla. andalous. commune ain chkef",
      "quartier": "Ain Chkef",
      "phone": "0709052737",
      "lat": 33.9846534,
      "lng": -5.0361926,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 182,
      "name": "Pharmacie El Borj",
      "address": "n° 25, hay dhar lakhmis. lotissement ddawla. près de la tour nord. face du café mirador",
      "quartier": "Les Merinides",
      "phone": "0535645342",
      "lat": 34.0686757,
      "lng": -4.985935,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 183,
      "name": "Pharmacie El Boutahri",
      "address": "lotiss. bel air masjid 1 rte ras lma",
      "quartier": "Zouagha",
      "phone": "0535729847",
      "lat": 34.0182077,
      "lng": -5.0574499,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 184,
      "name": "Pharmacie El Ghazi",
      "address": "263 lot. jad ain qadous",
      "quartier": "Les Merinides",
      "phone": "0535623456",
      "lat": 34.056755,
      "lng": -5.0175517,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 185,
      "name": "Pharmacie El Hijazi",
      "address": "n°17, lotissement. hatim, bensouda, face complexe tajmouati",
      "quartier": "Zouagha",
      "phone": "0535729764",
      "lat": 34.0202864,
      "lng": -5.0462911,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 186,
      "name": "Pharmacie El Iraqui",
      "address": "rue 3 n°26 bensouda en face de jazzarine",
      "quartier": "Zouagha",
      "phone": "0535729647",
      "lat": 34.0722751,
      "lng": -4.9949675,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 187,
      "name": "Pharmacie El Kadiri",
      "address": "soluna 2. route immouzer près du faculté de lettres et sciences humaines",
      "quartier": "Saiss",
      "phone": "0535767628",
      "lat": 33.99230576,
      "lng": -4.99009132,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 188,
      "name": "Pharmacie El Korachi",
      "address": "bd ibn elkhatib, hay azhar",
      "quartier": "Agdal",
      "phone": "0535748497",
      "lat": 34.0191247,
      "lng": -5.0016602,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 189,
      "name": "Pharmacie El Malhi",
      "address": "rue 3 n° 2 hay tarik 1. près des écoles amin. face fin du bus n°40",
      "quartier": "Agdal",
      "phone": "0535611029",
      "lat": 34.0356746,
      "lng": -5.0245247,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 190,
      "name": "Pharmacie El Menzeh",
      "address": "n° 46. lotissement el mekzari. face café hamidi, sehrij guenaoua, bab ftouh",
      "quartier": "Medina Jnanat",
      "phone": "0535711096",
      "lat": 34.054641,
      "lng": -4.9534357,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 191,
      "name": "Pharmacie El Mernissi",
      "address": "lotiss. bel air champs de course rte de meknès",
      "quartier": "Agdal",
      "phone": "0535626767",
      "lat": 34.0392414,
      "lng": -5.0131063,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 192,
      "name": "Pharmacie El Mostapha",
      "address": "n°80 bd nour. aouinat el hajjaj. au direction de el hdoura",
      "quartier": "Saiss",
      "phone": "0535731232",
      "lat": 34.0221,
      "lng": -4.9663,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 193,
      "name": "Pharmacie El Mountazah",
      "address": "n°137. lotissement el mountazah 1. route meknès",
      "quartier": "Les Merinides",
      "phone": "0535755102",
      "lat": 34.0561945,
      "lng": -5.046598,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 194,
      "name": "Pharmacie El Msaadi",
      "address": "hay alwifaq rue ain smen. pres de la mosquée",
      "quartier": "Zouagha",
      "phone": "0535601836",
      "lat": 34.0297999,
      "lng": -4.9948642,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 195,
      "name": "Pharmacie El Otmani",
      "address": "52 bd boufekran aouinate el hajaj",
      "quartier": "Saiss",
      "phone": "0535960144",
      "lat": 34.0236089,
      "lng": -4.965694,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 196,
      "name": "Pharmacie Errabie",
      "address": "lot 6-4 lotissement farah, bensouda",
      "quartier": "Zouagha",
      "phone": "0535681068",
      "lat": 34.0145105,
      "lng": -4.9804461,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 197,
      "name": "Pharmacie Errachid",
      "address": "pharmacie errachid, hay al wifaq, rue 9 n°36, 38 ain haroun",
      "quartier": "Les Merinides",
      "phone": "0535646400",
      "lat": 34.0153952,
      "lng": -5.0137595,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 198,
      "name": "Pharmacie Errachidia",
      "address": "quartier errachidia. avenue mohammed el fassi. près du lycée adarissa",
      "quartier": "Agdal",
      "phone": "0535602239",
      "lat": 34.015282,
      "lng": -5.0136845,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 199,
      "name": "Pharmacie Erriad",
      "address": "pharmacie erriad, a cote de la radeef hay el farah",
      "quartier": "Agdal",
      "phone": "0535607337",
      "lat": 34.0244919,
      "lng": -5.0126568,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 200,
      "name": "Pharmacie Es-salam",
      "address": "4, hay ain kadouss, proche de la mosquée tajmouati",
      "quartier": "Les Merinides",
      "phone": "0535645101",
      "lat": 34.0605869,
      "lng": -5.0140825,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 201,
      "name": "Pharmacie Espace Santé",
      "address": "235 lot. riad zohour, quartier merja",
      "quartier": "Zouagha",
      "phone": "0535728313",
      "lat": 34.0343239,
      "lng": -5.0438217,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 202,
      "name": "Pharmacie Espace Vert",
      "address": "lotissement jnane c3. ain chkef",
      "quartier": "Ain Chkef",
      "phone": "0602908696",
      "lat": 33.9493334,
      "lng": -5.0316895,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 203,
      "name": "Pharmacie Faculté De Médecine",
      "address": "narjis d, hay al amal, route sidi harazem. face faculté de medecine",
      "quartier": "Saiss",
      "phone": "0535619508",
      "lat": 34.0076423,
      "lng": -4.9652236,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 204,
      "name": "Pharmacie Faculté Echariaa",
      "address": "résidence twins, route de sefrou",
      "quartier": "Saiss",
      "phone": "0535766762",
      "lat": 33.9985514,
      "lng": -4.9749954,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 205,
      "name": "Pharmacie Fahmi",
      "address": "178, hay griou, hay lalla soukaina",
      "quartier": "Zouagha",
      "phone": "0535612087",
      "lat": 34.0170581,
      "lng": -5.0296466,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 206,
      "name": "Pharmacie Faiza",
      "address": "lot 99. oued fès. près du hammam oued fès et café ahel fès",
      "quartier": "Les Merinides",
      "phone": "0535753171",
      "lat": 34.0565655,
      "lng": -5.0327391,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 207,
      "name": "Pharmacie Farah",
      "address": "hay farah 2 hay saada, entre collège al qods, et l'agence farah",
      "quartier": "Agdal",
      "phone": "0535600514",
      "lat": 34.0221682,
      "lng": -5.0144997,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 208,
      "name": "Pharmacie Fares",
      "address": "dhar lkhmis 4. hafrat ben slimane. a coté collège abd el ali benchakroun",
      "quartier": "Les Merinides",
      "phone": "0535751912",
      "lat": 34.071732,
      "lng": -4.9894408,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 209,
      "name": "Pharmacie Fatima Fihriya",
      "address": "pharmacie fihria, n°167, derb bouajjara, bab jdid",
      "quartier": "Medina Jnanat",
      "phone": "0535741353",
      "lat": 34.0560754,
      "lng": -4.9741905,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 210,
      "name": "Pharmacie Fatima Zahra",
      "address": "pharmacie fatima zahra, 2 lot. tourya anas 3 a coté clinique arrazi",
      "quartier": "Agdal",
      "phone": "0535604521",
      "lat": 34.0326552,
      "lng": -5.0088613,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 211,
      "name": "Pharmacie Fés Saiss",
      "address": "lot. yassamine, route d'imouzer, 300 mètres du feu rouge après la piscine lmsefer",
      "quartier": "Saiss",
      "phone": "0535611033",
      "lat": 34.0127576,
      "lng": -4.9700355,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 212,
      "name": "Pharmacie Fes Shore",
      "address": "n° 212 lot alhawaa el jamil. 200m de la faculté du médecine, route sidi hrazem",
      "quartier": "Saiss",
      "phone": "0535619528",
      "lat": 34.0093643,
      "lng": -4.9616705,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 213,
      "name": "Pharmacie Florida",
      "address": "rue 52 inass 3. route ain chqef (crédit agricole)",
      "quartier": "Agdal",
      "phone": "0535604313",
      "lat": 34.0081554,
      "lng": -5.0035681,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 214,
      "name": "Pharmacie Foret Ain Chkef",
      "address": "commune ain chkef, à coté du piscine diamant vert",
      "quartier": "Ain Chkef",
      "phone": "0535610586",
      "lat": 33.99045894,
      "lng": -5.01712222,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 215,
      "name": "Pharmacie Gharnata",
      "address": "n°67 lot zineb dokkarat, route de meknès",
      "quartier": "Agdal",
      "phone": "0535622006",
      "lat": 34.0357569,
      "lng": -5.0287686,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 216,
      "name": "Pharmacie Ghita",
      "address": "pharmacie ghita, n°118 lot. ghita bensouda. près du stade",
      "quartier": "Zouagha",
      "phone": "0535729235",
      "lat": 34.0120727,
      "lng": -5.0617496,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 217,
      "name": "Pharmacie Ghizlane",
      "address": "rte de sefrou lotiss. ouafae lot. n°342",
      "quartier": "Saiss",
      "phone": "0535619354",
      "lat": 34.005787,
      "lng": -4.9687258,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 218,
      "name": "Pharmacie Ghrissi",
      "address": "lotissement al izdihar, route rass elma",
      "quartier": "Zouagha",
      "phone": "0535721921",
      "lat": 34.0164186,
      "lng": -5.0719264,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 219,
      "name": "Pharmacie Haj Bensalem",
      "address": "n° 6. rue3. hay miko. al merja",
      "quartier": "Zouagha",
      "phone": "0535655187",
      "lat": 34.0351489,
      "lng": -5.038962,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 220,
      "name": "Pharmacie Hamdoun",
      "address": "pharmacie hamdoun, hay essalam rue 17 n°8 ain kadous",
      "quartier": "Les Merinides",
      "phone": "0535703323",
      "lat": 34.0631545,
      "lng": -5.0167676,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 221,
      "name": "Pharmacie Hameda Benchekroun",
      "address": "numéro 29 bab mansour bd nouakchott",
      "quartier": "Saiss",
      "phone": "0535612050",
      "lat": 34.0088887,
      "lng": -4.993519,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 222,
      "name": "Pharmacie Hamraouy",
      "address": "lotissement bradii. bloc 240. en face de l'école asoumoua. bensouda",
      "quartier": "Zouagha",
      "phone": "0535655755",
      "lat": 34.0349133,
      "lng": -5.0527122,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 223,
      "name": "Pharmacie Hanane",
      "address": "54a bis, jnane bennis, route bab khokha. (face du mosquée tajmouaati)",
      "quartier": "Medina Jnanat",
      "phone": "0535649181",
      "lat": 34.0667798,
      "lng": -4.9656252,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 224,
      "name": "Pharmacie Hay Al Anbra",
      "address": "rue 44 lot. ambra 2 route ain smen",
      "quartier": "Zouagha",
      "phone": "0535608508",
      "lat": 34.0111194,
      "lng": -5.0589681,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 225,
      "name": "Pharmacie Hay Al Mostakbal",
      "address": "n° 139 lotissement al mostakbal hay al massira",
      "quartier": "Zouagha",
      "phone": "0535729187",
      "lat": 34.011137,
      "lng": -5.065053,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 226,
      "name": "Pharmacie Hay Belkhayat",
      "address": "n° 1 rue 21 hay belkhayat",
      "quartier": "Fes",
      "phone": "0535645847",
      "lat": 34.0686025,
      "lng": -5.001806,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 227,
      "name": "Pharmacie Hay El Yakout",
      "address": "n°6 rue 6 hay lalla el yakout, ain nokbi",
      "quartier": "Medina Jnanat",
      "phone": "0620002545",
      "lat": 34.062063,
      "lng": -4.9497003,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 228,
      "name": "Pharmacie Hay Laalou",
      "address": "n°30. hay laalou. hay ain haroun agadir, proche du terminus des bus 7-8-49",
      "quartier": "Les Merinides",
      "phone": "0535751978",
      "lat": 34.0651138,
      "lng": -5.0121204,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 229,
      "name": "Pharmacie Hay Riyad",
      "address": "n°754 lotissement riad 4 .route sefrou",
      "quartier": "Saiss",
      "phone": "0535742287",
      "lat": 34.0192846,
      "lng": -4.9605092,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 230,
      "name": "Pharmacie Hopital Bensouda",
      "address": "82 hay chemin de fer près de l'hopital bensouda",
      "quartier": "Zouagha",
      "phone": "0535639292",
      "lat": 34.0165397,
      "lng": -5.0451188,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 231,
      "name": "Pharmacie Ibn Al Baytar",
      "address": "pharmacie ibn al baytar, rue 4 jnane souissisidi boujida",
      "quartier": "Medina Jnanat",
      "phone": "0535763170",
      "lat": 34.0694733,
      "lng": -4.9624125,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 232,
      "name": "Pharmacie Ibn Al Hassan",
      "address": "avenue abi amran el fassi. ain qadouss. près de l'hôpital ibn al hassan",
      "quartier": "Les Merinides",
      "phone": "0535756917",
      "lat": 34.0604548,
      "lng": -5.0071609,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 233,
      "name": "Pharmacie Ibn Al Haytam",
      "address": "n°104, bd al kayraouane. narjis, près de koteef",
      "quartier": "Saiss",
      "phone": "0535960412",
      "lat": 34.0293711,
      "lng": -4.9818124,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 234,
      "name": "Pharmacie Ibn Batouta",
      "address": "bis 33. jnane ben chrif bab el khoukha, entre café papillon et café tanger",
      "quartier": "Medina Jnanat",
      "phone": "0535649458",
      "lat": 34.065622,
      "lng": -4.962482,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 235,
      "name": "Pharmacie Ibn Hazm",
      "address": "n°290 rue al amal, hay al wafaa 2.face du complexe sportive par route sidi hrazem",
      "quartier": "Saiss",
      "phone": "0535616235",
      "lat": 34.0091231,
      "lng": -4.9695833,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 236,
      "name": "Pharmacie Ibn Khaldoun",
      "address": "pharmacie ibn khaldoun, narjis s lot. 155 bd al karaouiyine",
      "quartier": "Saiss",
      "phone": "0535730123",
      "lat": 34.014789,
      "lng": -4.9725124,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 237,
      "name": "Pharmacie Ibn Nafis",
      "address": "hay ain chkef dommaine ain chkef douar tlalsa",
      "quartier": "Ain Chkef",
      "phone": "0614414474",
      "lat": 33.9608488,
      "lng": -5.0222982,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 238,
      "name": "Pharmacie Ibn Sina",
      "address": "hay mssala ain kadous",
      "quartier": "Les Merinides",
      "phone": "0535645054",
      "lat": 34.0635207,
      "lng": -5.0054475,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 239,
      "name": "Pharmacie Ibn Tachfine",
      "address": "narjis. hay al wafaa 2. proche de la charité accueil des enfants",
      "quartier": "Saiss",
      "phone": "0535614597",
      "lat": 34.021171,
      "lng": -4.983051,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 240,
      "name": "Pharmacie Ifrane",
      "address": "route imouzer, bd mohamed el fasi, près de la clinique kaoutar",
      "quartier": "Agdal",
      "phone": "0535604712",
      "lat": 34.0144858,
      "lng": -5.0015964,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 241,
      "name": "Pharmacie Ilham",
      "address": "56 hay el qods. bensouda. près de l'hôpital pédiatrie tajmouaati",
      "quartier": "Zouagha",
      "phone": "0535726690",
      "lat": 34.0184313,
      "lng": -5.0494379,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 242,
      "name": "Pharmacie Ilya",
      "address": "lot. bab elghoul a5 dher elmahraz, proche de l'hopital el ghassani",
      "quartier": "Agdal",
      "phone": "0613917179",
      "lat": 34.02745,
      "lng": -5.024345,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 243,
      "name": "Pharmacie Imam Ali",
      "address": "numero 23 bd imam malik a cote du consulat de france",
      "quartier": "Agdal",
      "phone": "0535931264",
      "lat": 34.0425621,
      "lng": -5.0074657,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 244,
      "name": "Pharmacie Imam Malik",
      "address": "tranche n°184. magasin 3. jbel thghat2. début de la route entre day'aa et oued fès",
      "quartier": "Les Merinides",
      "phone": "0535645815",
      "lat": 34.062398,
      "lng": -5.0227023,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 245,
      "name": "Pharmacie Imam Mouslim",
      "address": "n° 61 hay mabrouka, pres hammam salima. 600 mètre de hammam chaab, ain haroune",
      "quartier": "Les Merinides",
      "phone": "0535754159",
      "lat": 34.0445523,
      "lng": -5.0072406,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 246,
      "name": "Pharmacie Iraqui Karima Derb Lwerd",
      "address": "route imouzzar, bd ibn al khatib. direction route ain chkef. a coté de bain de bain el bacha",
      "quartier": "Agdal",
      "phone": "0535606767",
      "lat": 34.0204594,
      "lng": -5.002781,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 247,
      "name": "Pharmacie Ismailia",
      "address": "boulevard ismailia, lotissement lahlou mont fleuri 1. face du 19e département de police. derrière acima route séfrou",
      "quartier": "Saiss",
      "phone": "0535731441",
      "lat": 34.0077274,
      "lng": -4.9823744,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 248,
      "name": "Pharmacie Italia",
      "address": "rue n°4, hay tazi, l'entrée du route merja",
      "quartier": "Zouagha",
      "phone": "0533308715",
      "lat": 34.0401158,
      "lng": -5.0349723,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 249,
      "name": "Pharmacie Jabri",
      "address": "n°33 boulevard ibnou al khatib. rue lmachmach lier à la banque populaire. hay al azhar 2",
      "quartier": "Agdal",
      "phone": "0535749358",
      "lat": 34.0158774,
      "lng": -5.0043792,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 250,
      "name": "Pharmacie Jamai",
      "address": "300m du café la suite, lot bab atlas 3 route imouzer",
      "quartier": "Saiss",
      "phone": "05357494650631078370",
      "lat": 33.9956903,
      "lng": -5.0057295,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 251,
      "name": "Pharmacie Jardin Oued Fès",
      "address": "n° 83 - lotissement ddayâa 2- ain qadous",
      "quartier": "Les Merinides",
      "phone": "0535756274",
      "lat": 34.0582371,
      "lng": -5.0355038,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 252,
      "name": "Pharmacie Jardin Tghat",
      "address": "lotiss. tghat 2, complexe al andalous, n°18",
      "quartier": "Les Merinides",
      "phone": "0535700060",
      "lat": 34.0595306,
      "lng": -5.0238346,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 253,
      "name": "Pharmacie Jardins El Badie",
      "address": "356, lotissement les jardins el badie, route ain chkef",
      "quartier": "Agdal",
      "phone": "06640991980535608010",
      "lat": 33.9861055,
      "lng": -5.0122274,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 254,
      "name": "Pharmacie Jawhara",
      "address": "rte ain chkef. a cote du boucherie al mansouri",
      "quartier": "Ain Chkef",
      "phone": "05359668160532313990",
      "lat": 33.9645959,
      "lng": -5.0300039,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 255,
      "name": "Pharmacie Jbel Tghat",
      "address": "hay tghat a cote de préfecture zouagha moulay yacoub route marjane",
      "quartier": "Les Merinides",
      "phone": "0535750788",
      "lat": 34.047125,
      "lng": -5.0263661,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 256,
      "name": "Pharmacie Jeroundi",
      "address": "jnane fes1. ain chkef",
      "quartier": "Ain Chkef",
      "phone": "0535691638",
      "lat": 34.02619515,
      "lng": -5.02318487,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 257,
      "name": "Pharmacie Jnane Ain Chkef",
      "address": "",
      "quartier": "Fes",
      "phone": "0535967050",
      "lat": 33.953036,
      "lng": -5.0279555,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 258,
      "name": "Pharmacie Jnane Al Bardai",
      "address": "lot bardai numéro 103, magasin 1 et 2, zouagha bas",
      "quartier": "Zouagha",
      "phone": "0535721147",
      "lat": 34.0350311,
      "lng": -5.0559337,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 259,
      "name": "Pharmacie Jnane Drader",
      "address": "pharmacie jnane drader, 34 rue 3 jnane drader sidi boujida",
      "quartier": "Medina Jnanat",
      "phone": "0535763849",
      "lat": 34.0675998,
      "lng": -4.9704557,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 260,
      "name": "Pharmacie Jnane El Kadri",
      "address": "bab al khoukha jnane kadiri rue 45 n°25",
      "quartier": "Medina Jnanat",
      "phone": "0535763664",
      "lat": 34.067096,
      "lng": -4.955399,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 261,
      "name": "Pharmacie Jnane Fes",
      "address": "15, rue el akhtal (ex. ibn batouta) près de l'hotel jnane palace (40 mètres)",
      "quartier": "Agdal",
      "phone": "0535653950",
      "lat": 34.0303905,
      "lng": -5.0074612,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 262,
      "name": "Pharmacie Jnane Mekouar",
      "address": "93, rue massamida, jnane mekouar, sidi boujida",
      "quartier": "Medina Jnanat",
      "phone": "0535711450",
      "lat": 34.07185,
      "lng": -4.96295,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 263,
      "name": "Pharmacie Kacimi",
      "address": "118 lot. el mehdi, route imouzer",
      "quartier": "Saiss",
      "phone": "0535640025",
      "lat": 33.9944553,
      "lng": -5.0007679,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 264,
      "name": "Pharmacie Kamal",
      "address": "",
      "quartier": "Fes",
      "phone": "0535762065",
      "lat": 34.0570314,
      "lng": -4.9567256,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 265,
      "name": "Pharmacie Kandoussi",
      "address": "n°132 lotissement farah. 800m du l'usine butagaz. bensouda .el massira",
      "quartier": "Zouagha",
      "phone": "0535727195",
      "lat": 34.0037878,
      "lng": -5.0446424,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 266,
      "name": "Pharmacie Khayra",
      "address": "lotissement el menzeh. n°8. arrondissement saiss. route sidi hrazem",
      "quartier": "Saiss",
      "phone": "0535768965",
      "lat": 34.0107068,
      "lng": -4.9463797,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 267,
      "name": "Pharmacie L'avenir",
      "address": "n°122 lot. taoufik lmerja",
      "quartier": "Zouagha",
      "phone": "0535728299",
      "lat": 34.0303318,
      "lng": -5.0435377,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 268,
      "name": "Pharmacie L'entente",
      "address": "n°42, bd moulay rachid, route séfrou. de 200m du clinique atlas. proche du café titanic",
      "quartier": "Saiss",
      "phone": "0535658131",
      "lat": 34.0242974,
      "lng": -4.9897763,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 269,
      "name": "Pharmacie L'humanité",
      "address": "n°1 mosquée attadamoun, a coté piscine diamant vert, california, 30100 (tél fixe: 0538805111, mobile: 0679475071)",
      "quartier": "Ain Chkef",
      "phone": "0707553130",
      "lat": 33.9782206,
      "lng": -5.0266215,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 270,
      "name": "Pharmacie L'iris",
      "address": "19, bd bizerte menflouri 2 route imouzer",
      "quartier": "Saiss",
      "phone": "0535748019",
      "lat": 34.0026743,
      "lng": -4.9900017,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 271,
      "name": "Pharmacie L'oliveraie",
      "address": "pharmacie l'oliveraie, lot. l'oliveraie groupe adoha route menant a l'autoroute",
      "quartier": "Zouagha",
      "phone": "0535691807",
      "lat": 34.0106557,
      "lng": -4.9657329,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 272,
      "name": "Pharmacie L'opera",
      "address": "bd el hocima rue taounat. entre banque populaire atlas et préfecture al atlas",
      "quartier": "Agdal",
      "phone": "0535960503",
      "lat": 34.0288781,
      "lng": -4.9951509,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 273,
      "name": "Pharmacie L'université",
      "address": "79 bis, hay chouhada, sidi brahim",
      "quartier": "Agdal",
      "phone": "0535732559",
      "lat": 34.033483,
      "lng": -4.9859151,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 274,
      "name": "Pharmacie La Baraka",
      "address": "numéro 15 lot firdaws hay adarissa a cote de mosquée al baraka a cote de ista",
      "quartier": "Agdal",
      "phone": "0535748766",
      "lat": 34.0183147,
      "lng": -5.0141634,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 275,
      "name": "Pharmacie La Bonté",
      "address": "hay tarik 1, lot 20 n° 2 et 3, en face de collège l'hippodrome",
      "quartier": "Agdal",
      "phone": "0535610622",
      "lat": 34.033531,
      "lng": -5.0291446,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 276,
      "name": "Pharmacie La Corniche",
      "address": "lotissement al jawahir arrondissement zouagha rte bensouda, rdc lot 3e 1-98",
      "quartier": "Zouagha",
      "phone": "0538119728",
      "lat": 34.0337452,
      "lng": -5.0649591,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 277,
      "name": "Pharmacie La Criée",
      "address": "n°11 hay al amane, bensouda",
      "quartier": "Zouagha",
      "phone": "0535655327",
      "lat": 34.0005071,
      "lng": -5.0434417,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 278,
      "name": "Pharmacie La Croix Verte",
      "address": "bd mohammed 5",
      "quartier": "Agdal",
      "phone": "0535622523",
      "lat": 34.0384801,
      "lng": -5.0004637,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 279,
      "name": "Pharmacie La Famille",
      "address": "n° 71 boulevard chankit menflouri 2. (a coté de la salle kamal le policier et la fin du bus 23)",
      "quartier": "Saiss",
      "phone": "0535610133",
      "lat": 34.0046736,
      "lng": -4.9891528,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 280,
      "name": "Pharmacie La Lavande",
      "address": "pharmacie la lavande, terrain lkhayl hay rajaa n°13",
      "quartier": "Agdal",
      "phone": "0535607879",
      "lat": 34.0335369,
      "lng": -5.022362,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 281,
      "name": "Pharmacie La Ménara",
      "address": "635 bd al karaouiyine narjiss c . route de séfrou, près du collège ben lhassan ouezzani",
      "quartier": "Saisse",
      "phone": "0535615672",
      "lat": 34.0525611,
      "lng": -4.9936035,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 282,
      "name": "Pharmacie La Providence",
      "address": "n° 260 d, lot al bardai al marja ould fès",
      "quartier": "Zouagha",
      "phone": "0532160001",
      "lat": 34.0381223,
      "lng": -5.0556097,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 283,
      "name": "Pharmacie La Santé",
      "address": "n° 58 bd ismailia mont fleuri 1, près du hammam boumehdi",
      "quartier": "Saiss",
      "phone": "0535656723",
      "lat": 34.0129024,
      "lng": -4.9857662,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 284,
      "name": "Pharmacie La Suite",
      "address": "lotissement. riad annakhil .route imouzzar proche du café la suite",
      "quartier": "Saiss",
      "phone": "0535603649",
      "lat": 33.9940176,
      "lng": -4.9923405,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 285,
      "name": "Pharmacie La Tulipe",
      "address": "route ain smen. près du hay annakhil. près de la pivot de l'autoroute",
      "quartier": "Zouagha",
      "phone": "0535602060",
      "lat": 34.0127043,
      "lng": -5.0110449,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 286,
      "name": "Pharmacie La Victoire",
      "address": "route sefrou proche du cafe al khima, manflouri 1",
      "quartier": "Saiss",
      "phone": "0535732380",
      "lat": 34.0180043,
      "lng": -4.9865591,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 287,
      "name": "Pharmacie Laguzira",
      "address": "n° 13 fran chrarda laguzira a coté de la mosquée al makhfiya et cinéma al amal",
      "quartier": "Agdal",
      "phone": "0535763900",
      "lat": 34.0620445,
      "lng": -4.9716214,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 288,
      "name": "Pharmacie Lahbabi",
      "address": "route imouzer, bd beyrouth, résid. rawd azhar2 montfleuri 2",
      "quartier": "Saiss",
      "phone": "0535608407",
      "lat": 34.0044736,
      "lng": -4.9892319,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 289,
      "name": "Pharmacie Le Coin",
      "address": "n°46. hay jdid. en face du centre de santé .zouagha haute",
      "quartier": "Zouagha",
      "phone": "0535609854",
      "lat": 34.012893,
      "lng": -5.0331652,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 290,
      "name": "Pharmacie Le Grand Stade",
      "address": "30. lotissement arrayhane. route de séfrou. prés de la fac de charia'a",
      "quartier": "Saiss",
      "phone": "0535736689",
      "lat": 33.9931341,
      "lng": -4.9745152,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 291,
      "name": "Pharmacie Le Remède",
      "address": "3 bd hassan ibn noaman, hay taj. ain kadous",
      "quartier": "Les Merinides",
      "phone": "0535755830",
      "lat": 34.0588845,
      "lng": -5.0111457,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 292,
      "name": "Pharmacie Les Champs",
      "address": "n° 7 hay tazi. el merja",
      "quartier": "Zouagha",
      "phone": "0535726968",
      "lat": 34.0360811,
      "lng": -5.0347039,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 293,
      "name": "Pharmacie Les Palmiers",
      "address": "bd hassan 2 en face du tribunal cour d'appel",
      "quartier": "Agdal",
      "phone": "0535621284",
      "lat": 34.0394593,
      "lng": -5.0015078,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 294,
      "name": "Pharmacie Les Trois Sources",
      "address": "rte d'imouzzer lotiss. labar n°61",
      "quartier": "Saiss",
      "phone": "0535963300",
      "lat": 34.012366,
      "lng": -5.002742,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 295,
      "name": "Pharmacie Lhoumadi",
      "address": "numéro 320 lot. mountazeh 3, route meknes",
      "quartier": "Les Merinides",
      "phone": "0611248625",
      "lat": 34.0511521,
      "lng": -5.0414955,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 296,
      "name": "Pharmacie Lido",
      "address": "lido dhar mehrez a cote kantrat lido",
      "quartier": "Agdal",
      "phone": "0535641097",
      "lat": 34.033419,
      "lng": -4.991599,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 297,
      "name": "Pharmacie Lilas",
      "address": "num 1, imm 51, lot. moulay idriss 1, oued",
      "quartier": "Les Merinides",
      "phone": "0535702509",
      "lat": 34.0591054,
      "lng": -5.0451038,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 298,
      "name": "Pharmacie Lina",
      "address": "route séfrou narjis, bd el majd. près de la préfecture et le grand rond-point",
      "quartier": "Saiss",
      "phone": "0535733721",
      "lat": 34.0166154,
      "lng": -4.9767745,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 299,
      "name": "Pharmacie Louajryene",
      "address": "n°33 derb jamae nouawel el melah, a coté de l'hôpital american",
      "quartier": "Medina Jnanat",
      "phone": "0655322676",
      "lat": 34.0522071,
      "lng": -4.9901683,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 300,
      "name": "Pharmacie Loubna Fes",
      "address": "zouagha 1 lotiss reda merja",
      "quartier": "Zouagha",
      "phone": "0532138482",
      "lat": 34.0291484,
      "lng": -5.0378054,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 301,
      "name": "Pharmacie Louizate",
      "address": "pharmacie louizate, bled diouri n°44, douar riafa, bab ftouh. ancien rute sidi hrazem",
      "quartier": "Medina Jnanat",
      "phone": "0535629882",
      "lat": 34.0594572,
      "lng": -4.9565656,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 302,
      "name": "Pharmacie Lycee Technique",
      "address": "zohour 2 proche du terminus du bus 23 jaune en direction du lycée technique",
      "quartier": "Saiss",
      "phone": "0535616146",
      "lat": 34.00356,
      "lng": -4.9815265,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 303,
      "name": "Pharmacie M'cella",
      "address": "n° 36 bis. rue1. blad benzakri, hay m'cella bab ftouh",
      "quartier": "Medina Jnanat",
      "phone": "0535762471",
      "lat": 34.0584305,
      "lng": -4.9795562,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 304,
      "name": "Pharmacie Maalal",
      "address": "n° 64 lot. hiba n°1 oued fes derriere marjane",
      "quartier": "Les Merinides",
      "phone": "0535639294",
      "lat": 34.0534761,
      "lng": -5.0387925,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 305,
      "name": "Pharmacie Mabrouka",
      "address": "27, lotiss. mabrouka 2, belkhayat, terminus 37",
      "quartier": "Les Merinides",
      "phone": "0535700377",
      "lat": 34.071724,
      "lng": -5.00249,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 306,
      "name": "Pharmacie Makro",
      "address": "n°3 lotissement nada, tranche1, bensouda, proche de atacadao",
      "quartier": "Zouagha",
      "phone": "0535729413",
      "lat": 34.0204884,
      "lng": -5.0550279,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 307,
      "name": "Pharmacie Malaika",
      "address": "hay badr 1 lot. mehdi n°50 pres ecole malaika",
      "quartier": "Zouagha",
      "phone": "0535962247",
      "lat": 34.0344245,
      "lng": -5.0092941,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 308,
      "name": "Pharmacie Mamalik",
      "address": "n°113 boulevard mamalik ben debab, ex-quasba. face de l'ecole chara",
      "quartier": "Les Merinides",
      "phone": "0535703699",
      "lat": 34.0661132,
      "lng": -4.9974794,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 309,
      "name": "Pharmacie Manabie Ain Chkef",
      "address": "commune ain chkef - 6.lotissement jnane 2",
      "quartier": "Ain Chkef",
      "phone": "0676761179",
      "lat": 33.9500165,
      "lng": -5.0355334,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 310,
      "name": "Pharmacie Masjid Arreda",
      "address": "route imouzzar. lotissement arrida. derriere mosquée arrida",
      "quartier": "Agdal",
      "phone": "0532034526",
      "lat": 34.0030978,
      "lng": -4.9983859,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 311,
      "name": "Pharmacie Masjid Attaqwa",
      "address": "hay saada. route ain chqef. près du mosquée attaqwa",
      "quartier": "Agdal",
      "phone": "0535748140",
      "lat": 34.0194622,
      "lng": -5.0056751,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 312,
      "name": "Pharmacie Mekouar",
      "address": "",
      "quartier": "Fes",
      "phone": "0535640172",
      "lat": 34.0309569,
      "lng": -4.9981453,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 313,
      "name": "Pharmacie Menzeh Saiss",
      "address": "lotissement menzeh saiss. près du fès chour. route sidi hrazem",
      "quartier": "Saiss",
      "phone": "0535766040",
      "lat": 34.0080231,
      "lng": -4.9539687,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 314,
      "name": "Pharmacie Merja",
      "address": "numéro 43 rue 1 hay el merja zouagha",
      "quartier": "Zouagha",
      "phone": "0535726999",
      "lat": 34.01755,
      "lng": -5.0491607,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 315,
      "name": "Pharmacie Meryama",
      "address": "530 lot al mostaqbal hay al massira",
      "quartier": "Zouagha",
      "phone": "0535681508",
      "lat": 33.9940929,
      "lng": -5.0476129,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 316,
      "name": "Pharmacie Meryem",
      "address": "n°5 lot badr, route ain smen residence badr, bd abderrahim sekkat hay badr",
      "quartier": "Agdal",
      "phone": "0535962931",
      "lat": 34.0421156,
      "lng": -5.001262,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 317,
      "name": "Pharmacie Mil Roses",
      "address": "k020 bd prince moulay abdallah km 2 route d'imouzzer",
      "quartier": "Agdal",
      "phone": "0535604308",
      "lat": 34.0673755,
      "lng": -4.9698138,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 318,
      "name": "Pharmacie Mont Fleuri",
      "address": "pharmacie mont fleuri, bd karama mont fleuri 1 route sefrou",
      "quartier": "Saiss",
      "phone": "0535644006",
      "lat": 34.0157316,
      "lng": -4.9863701,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 319,
      "name": "Pharmacie Mont Fleuri 2",
      "address": "avenue iskandaria. rue managua. n°21 mont fleuri 2. a coté de la mosquée abi wakkas et terminus du bus23 jaune",
      "quartier": "Saiss",
      "phone": "0535615492",
      "lat": 34.0164884,
      "lng": -4.9900381,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 320,
      "name": "Pharmacie Morchid",
      "address": "pharmacie morchid, 2 rue tadhia, narjiss c, route de sefrou",
      "quartier": "Saiss",
      "phone": "0535614828",
      "lat": 34.0137435,
      "lng": -4.9779439,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 321,
      "name": "Pharmacie Mouene",
      "address": "hay msallah lotiss. andalous",
      "quartier": "Medina Jnanat",
      "phone": "0535711748",
      "lat": 34.0541634,
      "lng": -4.9609005,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 322,
      "name": "Pharmacie Moulay Driss",
      "address": "champs de cour, a coté café sanabil",
      "quartier": "Agdal",
      "phone": "0535651050",
      "lat": 34.0336413,
      "lng": -5.0189835,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 323,
      "name": "Pharmacie Moulay Mbarek",
      "address": "bled sfira ain nokbi, a coté arrondissement al kobba",
      "quartier": "Medina Jnanat",
      "phone": "0535630787",
      "lat": 33.9982615,
      "lng": -5.0211972,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 324,
      "name": "Pharmacie Moulay Slimane",
      "address": "pharmacie mly slimane, en face du lycée moulay slimane, route hay saada",
      "quartier": "Agdal",
      "phone": "0535576008",
      "lat": 34.029394,
      "lng": -5.0005704,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 325,
      "name": "Pharmacie Mouldwa",
      "address": "n°131. mont fleuri 2. rue ezzohour. lotissement sabaté. route de sefrou",
      "quartier": "Saiss",
      "phone": "0688918201",
      "lat": 33.9841088,
      "lng": -4.9862703,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 326,
      "name": "Pharmacie Mounad",
      "address": "bled raiss. sahb el ouard. fin de l'ancienne route de sidi hrazem",
      "quartier": "Medina Jnanat",
      "phone": "0535763503",
      "lat": 34.0572,
      "lng": -4.9514,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 327,
      "name": "Pharmacie Mounia",
      "address": "100 lotiss. moulay driss 2 oued",
      "quartier": "Les Merinides",
      "phone": "0535703078",
      "lat": 34.0585439,
      "lng": -5.0419533,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 328,
      "name": "Pharmacie Moussaoui",
      "address": "32 rue 8 proche du club de tennis oued",
      "quartier": "Zouagha",
      "phone": "0535729218",
      "lat": 34.0328922,
      "lng": -5.047751,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 329,
      "name": "Pharmacie Myel",
      "address": "172 lot. lilas, magasin n° 1 route ain chkef",
      "quartier": "Agdal",
      "phone": "0532057132",
      "lat": 34.0064297,
      "lng": -5.0199414,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 330,
      "name": "Pharmacie Najmat Saiss",
      "address": "190 lotissement najmat saiss, magasin n°1 bensouda",
      "quartier": "Zouagha",
      "phone": "0535974012",
      "lat": 34.0065093,
      "lng": -5.0473981,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 331,
      "name": "Pharmacie Najmi",
      "address": "n° 60, rue assiham, hay hassani route ain chkef",
      "quartier": "Agdal",
      "phone": "0535612241",
      "lat": 34.0068638,
      "lng": -5.0095733,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 332,
      "name": "Pharmacie Narjiss",
      "address": "bloc34. b1. lot, lerac sidi brahim, a coté kotef",
      "quartier": "Saiss",
      "phone": "0535643734",
      "lat": 34.0206094,
      "lng": -4.9788651,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 333,
      "name": "Pharmacie Nasma",
      "address": "n°211. lotissement nasma 1. hay tahryeine. sehb al ward",
      "quartier": "Medina Jnanat",
      "phone": "0653607202",
      "lat": 34.0241878,
      "lng": -5.0717807,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 334,
      "name": "Pharmacie Nationale",
      "address": "n°42. rue talaa sghira",
      "quartier": "Medina Jnanat",
      "phone": "05356343130532120895",
      "lat": 34.0626035,
      "lng": -4.9795049,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 335,
      "name": "Pharmacie Nellia",
      "address": "numéro 2, 3 rue 01 route ain smen lotissement anbara",
      "quartier": "Zouagha",
      "phone": "0535605327",
      "lat": 34.0144488,
      "lng": -5.0362829,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 336,
      "name": "Pharmacie Niama",
      "address": "pharmacie niama, hay l'amane bensouda. prés du souk jjemla lakriy",
      "quartier": "Al Massira Bensouda",
      "phone": "0535729132",
      "lat": 33.9977066,
      "lng": -5.0480324,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 337,
      "name": "Pharmacie Nour",
      "address": "n° 85. bd les marinides. mellah",
      "quartier": "Medina Jnanat",
      "phone": "0532367793",
      "lat": 34.0529333,
      "lng": -4.9921724,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 338,
      "name": "Pharmacie Nour El Houda",
      "address": "pharmacie nour elhouda, rue al amal, bd israa. 100 m de l l'ecole privé zerhoun",
      "quartier": "Saiss",
      "phone": "0535617152",
      "lat": 34.0129244,
      "lng": -4.965755,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 339,
      "name": "Pharmacie Noureddine",
      "address": "707, bloc a4, douar el hendia, hay aouinat al hajjaj",
      "quartier": "Saiss",
      "phone": "0535960444",
      "lat": 34.0204868,
      "lng": -4.9660356,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 340,
      "name": "Pharmacie Nouzha",
      "address": "route ain chqef. mosquée mouad ibn jabel. lotissement nouzha. face écoles al falah",
      "quartier": "Agdal",
      "phone": "0535610374",
      "lat": 34.01172,
      "lng": -5.01088,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 341,
      "name": "Pharmacie Obtel",
      "address": "n°623a, lotiss. bab el andalous , n°2 rte de meknes",
      "quartier": "Les Merinides",
      "phone": "0535647304",
      "lat": 34.0536753,
      "lng": -5.0495458,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 342,
      "name": "Pharmacie Ofok Sais",
      "address": "n°51. lotissement al ofok. route de sefrou",
      "quartier": "Saiss",
      "phone": "0535615781",
      "lat": 33.9868872,
      "lng": -4.9701711,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 343,
      "name": "Pharmacie Olha",
      "address": "n°1 lot bab el ghol 2eme tranche dher mahraz. prés de l'hôtel sehray",
      "quartier": "Agdal",
      "phone": "0677208990",
      "lat": 34.0432172,
      "lng": -4.9918788,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 344,
      "name": "Pharmacie Omari",
      "address": "pharmacie omari, n° 4 hay assaada route ain chkef",
      "quartier": "Agdal",
      "phone": "0535610329",
      "lat": 34.0269518,
      "lng": -5.00855,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 345,
      "name": "Pharmacie Ouandou",
      "address": "106 bd youssef ibn tachfine. bab el khoukha, en face du collège al amal",
      "quartier": "Medina Jnanat",
      "phone": "0535648086",
      "lat": 34.0572905,
      "lng": -5.0314442,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 346,
      "name": "Pharmacie Oued Al Jawahir",
      "address": "n°4. rue15. bloc d. hay oued fès. al marja. a coté du complexe sportif",
      "quartier": "Zouagha",
      "phone": "05357280760601052230",
      "lat": 34.0388197,
      "lng": -5.0507853,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 347,
      "name": "Pharmacie Oued Fes",
      "address": "pharmacie oued fes, 48 rue 24, lot. oued",
      "quartier": "Les Merinides",
      "phone": "0535631211",
      "lat": 34.0567425,
      "lng": -5.0352601,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 348,
      "name": "Pharmacie Oued Zhoun",
      "address": "numéro 47 , arssat betioui oued zhoun",
      "quartier": "Medina Jnanat",
      "phone": "0535635969",
      "lat": 34.0685381,
      "lng": -4.9706313,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 349,
      "name": "Pharmacie Oulad Maaref",
      "address": "commune ain chkef. lqiyada",
      "quartier": "Ain Chkef",
      "phone": "0535603262",
      "lat": 33.9638465,
      "lng": -5.0282873,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 350,
      "name": "Pharmacie Oum Al Kora",
      "address": "n°41 rue 6 hay nouveau secteur z. haute zouagha, près du mosquée douar sidi lhadi",
      "quartier": "Zouagha",
      "phone": "0535605685",
      "lat": 34.0586789,
      "lng": -4.9795617,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 351,
      "name": "Pharmacie Oum Al Mouminine",
      "address": "commune ain chkef. lotissement jnane 1",
      "quartier": "Ain Chkef",
      "phone": "05356412770666241213",
      "lat": 33.9665523,
      "lng": -5.0272649,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 352,
      "name": "Pharmacie Oum El Banine",
      "address": "n°10, boulevard ahmed mekouar, bathaa, près du lycée oum el banine",
      "quartier": "Medina Jnanat",
      "phone": "0535635562",
      "lat": 34.060802,
      "lng": -4.9800465,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 353,
      "name": "Pharmacie Oxygène",
      "address": "cité 2 rue tariq al moqadassa dher lmahraz",
      "quartier": "Agdal",
      "phone": "06117062720535657902",
      "lat": 34.036966,
      "lng": -4.989631,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 354,
      "name": "Pharmacie Pasteur",
      "address": "lot c 1 hay bourkaiz, rue d'algésiras. derrière cinéma saada et près du acima al madar al kabir",
      "quartier": "Agdal",
      "phone": "0535611814",
      "lat": 34.0270628,
      "lng": -5.0098511,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 355,
      "name": "Pharmacie Pavlov",
      "address": "lot. dalila doha immeuble 84 magasin 3",
      "quartier": "Zouagha",
      "phone": "0535726216",
      "lat": 34.0134183,
      "lng": -5.0404179,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 356,
      "name": "Pharmacie Populaire",
      "address": "92, bab jyaf en face de bab samarine boulkhsisat, fes jdid",
      "quartier": "Medina Jnanat",
      "phone": "0535621929",
      "lat": 34.0539632,
      "lng": -4.9893255,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 357,
      "name": "Pharmacie Quartier Industriel",
      "address": "quartier industriel, quartier industriel lirak, route aouinat lhajaj. fin rencontre sidi brahim",
      "quartier": "Saiss",
      "phone": "0535733194",
      "lat": 34.0224599,
      "lng": -4.971759,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 358,
      "name": "Pharmacie R'cif",
      "address": "rahbat tben, bab jdid .r'cif",
      "quartier": "Medina Jnanat",
      "phone": "0535633323",
      "lat": 34.0608132,
      "lng": -4.9730952,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 359,
      "name": "Pharmacie Rachidia 3",
      "address": "n°33 hay errachidia 3 rte ain chkef",
      "quartier": "Agdal",
      "phone": "0535644918",
      "lat": 34.0046839,
      "lng": -5.0088946,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 360,
      "name": "Pharmacie Riad",
      "address": "av. ibn khatib, accès bouremana a coté arrondissement atlas, en face crédit agricole",
      "quartier": "Agdal",
      "phone": "0535640554",
      "lat": 34.02220154,
      "lng": -5.01773977,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 361,
      "name": "Pharmacie Riad Chafi",
      "address": "narjiss 41, lotiss. riad , résid. ikram rte de sefrou. près du centre du santé riad saiss et collège fakik tawdi",
      "quartier": "Saiss",
      "phone": "0535618493",
      "lat": 34.0164626,
      "lng": -4.9599062,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 362,
      "name": "Pharmacie Riad El Yassamine",
      "address": "tranche 582, s, n° 2 lot. riad saiss, route ain chkef",
      "quartier": "Agdal",
      "phone": "0535695490",
      "lat": 33.9947273,
      "lng": -5.0128445,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 363,
      "name": "Pharmacie Rihab",
      "address": "n° a 17 , avenue allal ben abdellah, espace rihab fes. pres café aswan",
      "quartier": "Agdal",
      "phone": "0535940303",
      "lat": 34.0356062,
      "lng": -5.0065614,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 364,
      "name": "Pharmacie Rond Point",
      "address": "n°14 lotissement jihane",
      "quartier": "Zouagha",
      "phone": "0535721626",
      "lat": 34.0095016,
      "lng": -5.0456524,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 365,
      "name": "Pharmacie Route D'imouzzer",
      "address": "route d'imouzzer, a coté restaurant al ambra et al andalous",
      "quartier": "Agdal",
      "phone": "0535657059",
      "lat": 34.033298,
      "lng": -5.0,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 366,
      "name": "Pharmacie Route De Sefrou",
      "address": "bd lot mamounia route sefrou a 600m du clinique atlas. entre café aroma et café agora",
      "quartier": "Saiss",
      "phone": "0535733306",
      "lat": 34.0363539,
      "lng": -5.0072127,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 367,
      "name": "Pharmacie Route Meknès",
      "address": "hay dokkarat lotiss. karim amrani rue 1 n°13",
      "quartier": "Agdal",
      "phone": "0535944857",
      "lat": 34.0395245,
      "lng": -5.0272749,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 368,
      "name": "Pharmacie Route Sidi Harazem",
      "address": "8, hay sania, route sidi harazem",
      "quartier": "Saiss",
      "phone": "0535616140",
      "lat": 34.0107414,
      "lng": -4.9559142,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 369,
      "name": "Pharmacie Rte Ain Chkef",
      "address": "n° 333, lotissement riad el yasamine, route ain chkef",
      "quartier": "Agdal",
      "phone": "0535967459",
      "lat": 33.9980803,
      "lng": -5.0171269,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 370,
      "name": "Pharmacie Rte Sidi Harazem",
      "address": "8, hay sania, rte sidi harazem",
      "quartier": "Saiss",
      "phone": "0535616140",
      "lat": 34.0149657,
      "lng": -4.95956,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 371,
      "name": "Pharmacie Saada",
      "address": "boulevard saint louis. hay saada. face de petit prix",
      "quartier": "Agdal",
      "phone": "0535604052",
      "lat": 34.0245983,
      "lng": -5.0055395,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 372,
      "name": "Pharmacie Saadi",
      "address": "n°715, lotiss. al karaouiyine, route ain chkef",
      "quartier": "Agdal",
      "phone": "0535749824",
      "lat": 34.004635,
      "lng": -5.0159877,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 373,
      "name": "Pharmacie Sagha",
      "address": "hay sagha",
      "quartier": "Medina Jnanat",
      "phone": "0535634042",
      "lat": 34.0663159,
      "lng": -4.9747876,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 374,
      "name": "Pharmacie Saida",
      "address": "hay saida résid. saida n°96",
      "quartier": "Les Merinides",
      "phone": "0535645807",
      "lat": 34.0651564,
      "lng": -5.0162463,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 375,
      "name": "Pharmacie Saidi",
      "address": "lot. zaytoune, secteur 24 zouagha al olya",
      "quartier": "Zouagha",
      "phone": "0535691784",
      "lat": 33.9947176,
      "lng": -5.0406393,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 376,
      "name": "Pharmacie Saiss",
      "address": "rue l'hopital n°13. bloc pam. 1545 hay al wahda. ben souda",
      "quartier": "Saiss",
      "phone": "0610242608",
      "lat": 34.006501,
      "lng": -5.047265,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 377,
      "name": "Pharmacie Salah",
      "address": "116 lotiss. al hadika , blok 4 oued fès. en face de l'école verte",
      "quartier": "Les Merinides",
      "phone": "0535756703",
      "lat": 34.0554449,
      "lng": -5.0256744,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 378,
      "name": "Pharmacie Salsabil",
      "address": "montfleuri 1 bd al manama a cote d'école al kadi eyade et école oum el korra",
      "quartier": "Saiss",
      "phone": "0535962616",
      "lat": 34.0183919,
      "lng": -4.9867795,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 379,
      "name": "Pharmacie Sandra",
      "address": "lotissement lmseffer 2. lotissement 2 boudhar. bensouda",
      "quartier": "Zouagha",
      "phone": "0535726003",
      "lat": 34.0240645,
      "lng": -5.0527069,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 380,
      "name": "Pharmacie Saquia Al Hamra",
      "address": "hay al qods 2 lirak. sidi brahim",
      "quartier": "Saiss",
      "phone": "0535644293",
      "lat": 34.0185946,
      "lng": -4.9688505,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 381,
      "name": "Pharmacie Sebti",
      "address": "n°1, bloc c, rue benzakour. en face du lycée ben tachfine - clinique riyad atlas",
      "quartier": "Agdal",
      "phone": "0535640666",
      "lat": 34.0323654,
      "lng": -5.0003964,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 382,
      "name": "Pharmacie Sefrioui",
      "address": "pharmacie sefrioui, km 2 rte ain chkef, coopérative al amal. avant terminus du bus n°15",
      "quartier": "Agdal",
      "phone": "0535612639",
      "lat": 34.0088152,
      "lng": -5.0097849,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 383,
      "name": "Pharmacie Sehb Elward",
      "address": "5, sehb elward, rue 3 en d'hors du bab ftouh",
      "quartier": "Medina Jnanat",
      "phone": "0535761484",
      "lat": 34.0543389,
      "lng": -4.9554787,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 384,
      "name": "Pharmacie Sehrij Gnaoua",
      "address": "n°201 blad tahri, sahrij gnaoua",
      "quartier": "Medina Jnanat",
      "phone": "0535630816",
      "lat": 34.050738,
      "lng": -4.957289,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 385,
      "name": "Pharmacie Sekkat",
      "address": "22, hay annakhil, résidence tajmouati, route ain smen",
      "quartier": "Zouagha",
      "phone": "0535608112",
      "lat": 34.0125631,
      "lng": -5.0227221,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 386,
      "name": "Pharmacie Siberia",
      "address": "commune ain chkef, douar khrabcha",
      "quartier": "Ain Chkef",
      "phone": "0655173677",
      "lat": 33.944167,
      "lng": -5.008056,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 387,
      "name": "Pharmacie Sid El Hadi",
      "address": "n 135 rue 13 hay sidi el hadi zouagha fès",
      "quartier": "Zouagha",
      "phone": "0532198080",
      "lat": 34.0158926,
      "lng": -5.0394779,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 388,
      "name": "Pharmacie Sidi Ahmed Chaoui",
      "address": "n°28. angle sidi ahmed chaoui. a coté maison des jeunes. fès medina",
      "quartier": "Medina Jnanat",
      "phone": "0535638542",
      "lat": 34.0620882,
      "lng": -4.9796572,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 389,
      "name": "Pharmacie Sidi Ali Boughaleb",
      "address": "drouj malakia bab ftouh",
      "quartier": "Medina Jnanat",
      "phone": "0535649500",
      "lat": 34.0547321,
      "lng": -4.9522984,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 390,
      "name": "Pharmacie Sidi Boujida",
      "address": "sidi boujida",
      "quartier": "Medina Jnanat",
      "phone": "0535648703",
      "lat": 34.0668624,
      "lng": -4.9691476,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 391,
      "name": "Pharmacie Skalli",
      "address": "zouhour 2. hay essalam. en face de ifriquia, pres du complexe sportif. route sefrou.",
      "quartier": "Saiss",
      "phone": "0535768884",
      "lat": 34.0017355,
      "lng": -4.9764118,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 392,
      "name": "Pharmacie Slaoui",
      "address": "rue sinae, bled ghiati, mont fleuri 2",
      "quartier": "Saiss",
      "phone": "0535614204",
      "lat": 33.9979249,
      "lng": -4.9852244,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 393,
      "name": "Pharmacie Slaoui Kenz",
      "address": "112, lot bab fes, zouagha route bensouda",
      "quartier": "Zouagha",
      "phone": "0535605359",
      "lat": 34.0243181,
      "lng": -5.0593864,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 394,
      "name": "Pharmacie Socrate Al Hakim",
      "address": "95. lotissement al baraka. résidence adir. route ain chkef",
      "quartier": "Agdal",
      "phone": "0634386005",
      "lat": 34.0039824,
      "lng": -5.0173506,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 395,
      "name": "Pharmacie Souissi",
      "address": "dayaa ben abdellah route sefrou km 5 en face du club des pharmaciens, derriere chu",
      "quartier": "Saiss",
      "phone": "0535617771",
      "lat": 34.0000578,
      "lng": -4.9635716,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 396,
      "name": "Pharmacie Soulaimani",
      "address": "pharmacie soulaimani, n° 46 lot charii bensouda",
      "quartier": "Zouagha",
      "phone": "0535726660",
      "lat": 34.0183919,
      "lng": -5.0267795,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 397,
      "name": "Pharmacie Soundous",
      "address": "n°11. rue 23. lotissement oued fès. a cote de la mosquée saoudi. avant terminus du bus 22 et 30",
      "quartier": "Les Merinides",
      "phone": "0535752400",
      "lat": 34.0668111,
      "lng": -4.9580898,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 398,
      "name": "Pharmacie Sounni",
      "address": "pharmacie sounni, hay adarissa route ain chkef",
      "quartier": "Agdal",
      "phone": "0535603774",
      "lat": 34.0214879,
      "lng": -5.015916,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 399,
      "name": "Pharmacie Tadlaoui",
      "address": "n°85 lotissement oued fès",
      "quartier": "Les Merinides",
      "phone": "0532909966",
      "lat": 34.052237,
      "lng": -5.0218526,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 400,
      "name": "Pharmacie Taha",
      "address": "pharmacie taha, lot. alhadika proche de salle jawhara",
      "quartier": "Les Merinides",
      "phone": "0535701869",
      "lat": 34.0572238,
      "lng": -5.0287456,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 401,
      "name": "Pharmacie Taiba",
      "address": "pharmacie taiba, lotissement el fadila n° 20, ain amer, route ain chkef",
      "quartier": "Agdal",
      "phone": "0535607777",
      "lat": 34.001416,
      "lng": -5.0066556,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 402,
      "name": "Pharmacie Tajmouati",
      "address": "route ain chkef, en face de lotissement nezha",
      "quartier": "Agdal",
      "phone": "0535600048",
      "lat": 34.0117048,
      "lng": -5.0070681,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 403,
      "name": "Pharmacie Talbi",
      "address": "n°10 bd arrahma, narjis \"d\"",
      "quartier": "Saiss",
      "phone": "0535733309",
      "lat": 34.0192962,
      "lng": -4.9788189,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 404,
      "name": "Pharmacie Tanara",
      "address": "commune ain chkef, lotissement jnane",
      "quartier": "Ain Chkef",
      "phone": "0535979120",
      "lat": 33.9467762,
      "lng": -5.0340719,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 405,
      "name": "Pharmacie Tarik",
      "address": "hay tarik 2, la rue principale en face de la banque populaire",
      "quartier": "Agdal",
      "phone": "0535602149",
      "lat": 34.0279834,
      "lng": -5.0324483,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 406,
      "name": "Pharmacie Tazi",
      "address": "pharmacie tazi, n 11 lot. lahbabi, dokkarat, dicsilone",
      "quartier": "Agdal",
      "phone": "0535931682",
      "lat": 34.0400729,
      "lng": -5.0312612,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 407,
      "name": "Pharmacie Technologie",
      "address": "lot karaouine route ain chkef, a coté école technologie",
      "quartier": "Agdal",
      "phone": "0535727399",
      "lat": 34.0077585,
      "lng": -5.0138875,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 408,
      "name": "Pharmacie Touzani",
      "address": "hay tarik1. près palais royale. a coté de bmce",
      "quartier": "Agdal",
      "phone": "0535612221",
      "lat": 34.029135,
      "lng": -5.0265075,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 409,
      "name": "Pharmacie Ville Nouvelle",
      "address": "29, bd des far (ex. miko)",
      "quartier": "Agdal",
      "phone": "0535641966",
      "lat": 34.0343137,
      "lng": -4.9980042,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 410,
      "name": "Pharmacie Volubilis",
      "address": "70, rue el moutanabi, a cote de service de permis de conduire, derriere la wilaya de fes boulmane, a",
      "quartier": "Agdal",
      "phone": "0535643175",
      "lat": 34.0347847,
      "lng": -5.0003661,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 411,
      "name": "Pharmacie Wafi",
      "address": "hay zouagha soufla, lotiss. riad zohour, résid. jawahir n°8, el merja",
      "quartier": "Zouagha",
      "phone": "0535655324",
      "lat": 34.0372254,
      "lng": -5.0447025,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 412,
      "name": "Pharmacie Wijhat Al Ihssane",
      "address": "113 route sefrou, lot. el ghali 2, près de lot. chaimaa, derrière faculté de chariaa",
      "quartier": "Saiss",
      "phone": "0606670421",
      "lat": 33.9956787,
      "lng": -4.9779353,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 413,
      "name": "Pharmacie Wislane",
      "address": "sehb lward douar riafa, route sidi hrazem",
      "quartier": "Saiss",
      "phone": "05356485910653257224",
      "lat": 34.0581225,
      "lng": -4.9520117,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 414,
      "name": "Pharmacie Yakout",
      "address": "384 lot aziza, magasin 1, route ain chkef",
      "quartier": "Zouagha",
      "phone": "0532075708",
      "lat": 34.0097586,
      "lng": -5.0278287,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 415,
      "name": "Pharmacie Yasmine",
      "address": "pharmacie yasmine, n°346 bd d'oran montfleuri 1 pres arrondissement zohour",
      "quartier": "Saiss",
      "phone": "0535619643",
      "lat": 34.0102284,
      "lng": -4.9880887,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 416,
      "name": "Pharmacie Yassine",
      "address": "n°5-6 douar idrissi, association makassid al khayriya, en face du marcher aouinat al hajjaj",
      "quartier": "Saiss",
      "phone": "0535730322",
      "lat": 34.0158487,
      "lng": -5.0070187,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 417,
      "name": "Pharmacie Yousra",
      "address": "pharmacie yousra, 801 quartier industriel sidi brahim",
      "quartier": "Saiss",
      "phone": "0535640583",
      "lat": 34.0294166,
      "lng": -4.9818244,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 418,
      "name": "Pharmacie Youssef Ibn Tachfine",
      "address": "lot riad limoune s14 n°3 route meknes",
      "quartier": "Les Merinides",
      "phone": "0535753702",
      "lat": 34.0548911,
      "lng": -5.0438438,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 419,
      "name": "Pharmacie Youssfi",
      "address": "n) 41, lotiss. lazrak, mont fleuri 2. près du mosquée saad abi waqqass et terminus du bus 23 jaune",
      "quartier": "Saiss",
      "phone": "0535618619",
      "lat": 34.0165,
      "lng": -4.9902,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 420,
      "name": "Pharmacie Zahir",
      "address": "n° 01 lpt. janat zaitoun bensouda fes (tel2: 0535681174)",
      "quartier": "Zouagha",
      "phone": "0532012078",
      "lat": 34.022004,
      "lng": -5.0584763,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 421,
      "name": "Pharmacie Zahra",
      "address": "route sefrou, premier feu rouge après l'atlas",
      "quartier": "Saiss",
      "phone": "0535642924",
      "lat": 34.0294,
      "lng": -4.9915,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 422,
      "name": "Pharmacie Zahraoui",
      "address": "lot bab salam a91 n°2,route ain chkef",
      "quartier": "Agdal",
      "phone": "0535691680",
      "lat": 34.0015409,
      "lng": -5.015683,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 423,
      "name": "Pharmacie Zahrat Al Jabal",
      "address": "commune ain chkef - douar tlalsa sejaa",
      "quartier": "Ain Chkef",
      "phone": "0535963492",
      "lat": 33.9579698,
      "lng": -5.0207299,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 424,
      "name": "Pharmacie Zakaria",
      "address": "hay anas 1, a coté hammam lkhlifi - nauzika",
      "quartier": "Agdal",
      "phone": "0535608262",
      "lat": 34.0248226,
      "lng": -5.0180415,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 425,
      "name": "Pharmacie Zalagh",
      "address": "lot hadika tranche 2. route entre dauaa et oued fès",
      "quartier": "Les Merinides",
      "phone": "0535701025",
      "lat": 34.0554,
      "lng": -5.028,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 426,
      "name": "Pharmacie Zarrouk",
      "address": "hay sidi boujida jnane el ouad n°76",
      "quartier": "Medina Jnanat",
      "phone": "0535762470",
      "lat": 34.0707225,
      "lng": -4.9689367,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 427,
      "name": "Pharmacie Zemmouri",
      "address": "pharmacie zemmouri, route ain smen a cote istea",
      "quartier": "Agdal",
      "phone": "0535601446",
      "lat": 34.0185021,
      "lng": -5.0190467,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 428,
      "name": "Pharmacie Ziat",
      "address": "12 hay ziat bathaa. derrière hôpital bab lhdid",
      "quartier": "Medina Jnanat",
      "phone": "0535634446",
      "lat": 34.0589693,
      "lng": -4.9798779,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 429,
      "name": "Pharmacie Zineb",
      "address": "imm 2 lot. zohour 3, route ain chkef",
      "quartier": "Agdal",
      "phone": "0535644836",
      "lat": 33.9948475,
      "lng": -5.0175189,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 430,
      "name": "Pharmacie Zkak Lahjar",
      "address": "n°107.zkak lahjar",
      "quartier": "Medina Jnanat",
      "phone": "0535633674",
      "lat": 34.0635419,
      "lng": -4.9779571,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 431,
      "name": "Pharmacie Zohour",
      "address": "mont fleuri 2 entre lycée technique et terminus 23 jaune",
      "quartier": "Saiss",
      "phone": "0535618477",
      "lat": 34.0044491,
      "lng": -4.9828381,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 432,
      "name": "Pharmacie Zouagha",
      "address": "route ras lma. km3. zouagha",
      "quartier": "Zouagha",
      "phone": "0535601475",
      "lat": 34.0277814,
      "lng": -5.0462297,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    },
    {
      "id": 433,
      "name": "Pharmacie Zouagha Essoufla",
      "address": "n°7 lotissement moulay idriss, zouagha essoufla. terminus de bus n°5",
      "quartier": "Zouagha",
      "phone": "0535726632",
      "lat": 34.0247648,
      "lng": -5.0351104,
      "hours": {
        "open": "08:30",
        "close": "20:30"
      },
      "isH24": false
    }
  ],

  /**
   * Set the real-time list of on-duty pharmacies scraped from the web
   * @param {Array} listOfReal - Array of { name, phone, address, lat, lng }
   */
  setRealDeGarde(listOfReal) {
    this.realDeGardeList = listOfReal;
    
    const isPlaceholder = (lat, lng) => {
      if (!lat || !lng) return true;
      return (Math.abs(lat - 34.033) < 0.005 && Math.abs(lng - (-5)) < 0.005) ||
             (Math.abs(lat - 34.0346) < 0.005 && Math.abs(lng - (-5.016)) < 0.005) ||
             (Math.abs(lat - 34.0181) < 0.005 && Math.abs(lng - (-5.007)) < 0.005);
    };

    // Remember original pharmacy count to trim dynamic entries on re-call
    if (this._originalPharmacyCount == null) {
      this._originalPharmacyCount = this.pharmacies.length;
    }
    // Remove any previously added dynamic pharmacies
    this.pharmacies.length = this._originalPharmacyCount;

    // Reset guard status on all original pharmacies
    this.pharmacies.forEach(p => {
      p.realGardeType = null;
      const match = this._findMatchingReal(p, listOfReal);
      if (match) {
        const gType = match.guardType ? match.guardType.toLowerCase() : '';
        if (gType.includes('nuit') && gType.includes('jour')) {
          p.realGardeType = 'jour-nuit';
        } else if (gType.includes('nuit')) {
          p.realGardeType = 'nuit';
        } else {
          p.realGardeType = 'jour';
        }

        if (match.lat && match.lng && !isPlaceholder(match.lat, match.lng)) {
          // Save original coordinates before overwriting
          if (!p._originalLat) p._originalLat = p.lat;
          if (!p._originalLng) p._originalLng = p.lng;
          p.lat = match.lat;
          p.lng = match.lng;
        }
      }
    });

    // Add unmatched real guards to the database dynamically
    let nextId = Math.max(...this.pharmacies.map(p => p.id)) + 1;
    listOfReal.forEach(real => {
      const alreadyMatched = this.pharmacies.some(p => p.realGardeType && this._findMatchingReal(p, [real]));
      if (!alreadyMatched) {
        const gType = real.guardType ? real.guardType.toLowerCase() : '';
        let realGardeType = 'jour';
        if (gType.includes('nuit') && gType.includes('jour')) {
          realGardeType = 'jour-nuit';
        } else if (gType.includes('nuit')) {
          realGardeType = 'nuit';
        }

        this.pharmacies.push({
          id: nextId++,
          name: real.name,
          address: real.address || "Fès",
          quartier: real.quartier || "Fès",
          phone: real.phone ? real.phone.replace(/\s+/g, '') : "",
          lat: real.lat || 34.0333,
          lng: real.lng || -4.9998,
          hours: { open: "08:30", close: "20:30" },
          isH24: realGardeType === 'jour-nuit',
          realGardeType: realGardeType
        });
      }
    });
  },

  _findMatchingReal(localPharmacy, realList) {
    const normLocal = this._normalizeName(localPharmacy.name);
    const localPhone = (localPharmacy.phone || '').replace(/\s+/g, '');
    const localWords = normLocal.split(/\s+/).filter(w => w.length > 2);

    let bestMatch = null;
    let bestScore = 0;

    for (const real of realList) {
      const normReal = this._normalizeName(real.name);
      const realPhone = (real.phone || '').replace(/\s+/g, '');
      const realWords = normReal.split(/\s+/).filter(w => w.length > 2);

      let score = 0;

      // Phone match (compare last 8 digits for reliability)
      if (localPhone.length >= 8 && realPhone.length >= 8) {
        const localSuffix = localPhone.slice(-8);
        const realSuffix = realPhone.slice(-8);
        if (localSuffix === realSuffix) {
          score += 50;
        }
      }

      // Name word matching
      const matchingWords = localWords.filter(w => realWords.includes(w));
      if (matchingWords.length >= 2) {
        score += matchingWords.length * 10;
      }

      // Exact name match bonus
      if (normLocal === normReal) {
        score += 100;
      }

      if (score > bestScore && score >= 20) {
        bestScore = score;
        bestMatch = real;
      }
    }

    return bestMatch;
  },

  _normalizeName(name) {
    if (!name) return "";
    let s = this._removeAccents(name.toLowerCase());
    s = s.replace(/\bpharmacie\b/gi, "")
         .replace(/\bpharma\b/gi, "")
         .replace(/[^a-z0-9\s]/g, "")
         .replace(/\s+/g, ' ')
         .trim();
    return s;
  },

  /**
   * Get all pharmacies
   * @returns {Array} Complete pharmacy list
   */
  getAll() {
    return [...this.pharmacies];
  },

  /**
   * Get pharmacy by ID
   * @param {number} id - Pharmacy ID
   * @returns {Object|undefined} Pharmacy object
   */
  getById(id) {
    return this.pharmacies.find(p => p.id === id);
  },

  /**
   * Search pharmacies by query (name, address, or quartier)
   * @param {string} query - Search query
   * @returns {Array} Matching pharmacies
   */
  search(query) {
    if (!query || query.trim().length === 0) return [];
    const normalizedQuery = this._removeAccents(query.toLowerCase().trim());
    return this.pharmacies.filter(p => {
      const name = this._removeAccents(p.name.toLowerCase());
      const address = this._removeAccents(p.address.toLowerCase());
      const quartier = this._removeAccents(p.quartier.toLowerCase());
      return name.includes(normalizedQuery) ||
             address.includes(normalizedQuery) ||
             quartier.includes(normalizedQuery);
    });
  },

  /**
   * Get pharmacies "de garde" for a given date
   * @param {Date} date - Target date (currently unused — guard list is set via setRealDeGarde)
   * @returns {{ jour: Array, nuit: Array }} Day and night guard pharmacies
   */
  getDeGarde(date) {
    if (!this.realDeGardeList) {
      return { jour: [], nuit: [] };
    }
    const active = this.pharmacies.filter(p => p.realGardeType);
    const jour = active.filter(p => p.realGardeType === 'jour' || p.realGardeType === 'jour-nuit');
    const nuit = active.filter(p => p.realGardeType === 'nuit' || p.realGardeType === 'jour-nuit');
    return { jour, nuit };
  },

  /**
   * Check if a specific pharmacy is de garde
   * @param {number} pharmacyId - Pharmacy ID
   * @param {Date} date - Target date
   * @returns {{ isGarde: boolean, type: string|null }}
   */
  isDeGarde(pharmacyId, date) {
    const p = this.getById(pharmacyId);
    if (!p) return { isGarde: false, type: null };

    if (!this.realDeGardeList) {
      return { isGarde: false, type: null };
    }

    return {
      isGarde: !!p.realGardeType,
      type: p.realGardeType
    };
  },

  /**
   * Get nearby pharmacies sorted by distance
   * @param {number} lat - User latitude
   * @param {number} lng - User longitude
   * @param {number} limit - Max results (default 10)
   * @returns {Array} Pharmacies sorted by distance with distance property added
   */
  getNearby(lat, lng, limit = 10) {
    const withDistance = this.pharmacies.map(p => ({
      ...p,
      distance: this._haversine(lat, lng, p.lat, p.lng)
    }));
    withDistance.sort((a, b) => a.distance - b.distance);
    return withDistance.slice(0, limit);
  },

  /**
   * Haversine formula — returns distance in meters
   */
  _haversine(lat1, lng1, lat2, lng2) {
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
   * Remove accents for search normalization
   */
  _removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  },

  /**
   * Get day of year from date
   */
  _getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    return Math.floor(diff / 86400000);
  }
};