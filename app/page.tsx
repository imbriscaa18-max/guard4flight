"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Globe, TrendingDown, Search, Star, Zap } from "lucide-react"
import countries from "@/data/countries"

interface PriceComparison {
  country: string
  price: number
  currency: string
  airline: string
  duration: string
  isOfficial: boolean
  bookingUrl: string
  flag: string
}

const translations = {
  ro: {
    title: "Guard4Flight",
    subtitle: "Găsește cel mai mic preț pentru biletele de avion",
    flightNumber: "Numărul zborului",
    searchPrices: "CAUTĂ",
    countries: "țări verificate",
    searching: "Se caută...",
    results: "Rezultate pentru zborul",
    country: "Țară",
    price: "Preț",
    airline: "Companie aeriană",
    duration: "Durată",
    bookNow: "Rezervă acum",
    skyscanner: "Skyscanner",
    savings: "Economii",
    compared: "față de",
    priceDisclaimer: "Prețurile pot suferi modificări de la ultima verificare a datelor",
    tips: "Sfaturi pentru economii maxime",
    tip1: "Verifică prețurile în diferite țări pentru același zbor",
    tip2: "Rezervă cu câteva săptămâni înainte pentru prețuri mai bune",
    tip3: "Compară întotdeauna cu site-urile oficiale ale companiilor aeriene",
    tip4: "Folosește moduri incognito pentru a evita creșterea prețurilor",
    showAll: "Vezi toate țările verificate",
    showLess: "Vezi mai puține",
    credits: "credite",
    buyCredits: "Cumpără credite",
    dashboard: "Dashboard",
    logout: "Deconectare",
    searchHistory: "Istoric căutări",
    totalSearches: "Total căutări",
    totalSavings: "Economii totale",
    recentSearches: "Căutări recente",
    noSearches: "Nu ai efectuat încă căutări",
    buyCreditsTitle: "Cumpără credite",
    buyCreditsDesc: "Alege un pachet de credite pentru a continua căutările",
    creditPackages: "Paquetele disponibile",
    buy: "Cumpără",
    processing: "Se procesează...",
    paymentSuccess: "Plata a fost procesată cu succes!",
    creditsAdded: "Creditele au fost adăugate în contul tău.",
    close: "Închide",
    loginRequired: "Trebuie să te autentifici pentru a căuta prețuri",
    searchTitle: "Caută prețuri la bilete de avion",
    searchDescription: "Introdu numărul zborului și compară prețurile în",
    countriesGlobal: "țări",
    countriesVerified: "țări verificate",
    searchInProgress: "Se caută...",
    lowestPrice: "Cel mai mic preț",
    bestDeal: "Cea mai bună ofertă",
    highestPrice: "Cel mai mare preț",
    maxDifference: "Diferența maximă",
    potentialSavings: "Economii potențiale",
    vsHighest: "față de cel mai mare preț",
    countriesChecked: "Țări verificate",
    globalComparison: "Comparație globală",
    importantNote: "Notă importantă",
    priceComparison: "Comparație prețuri",
    priceDescription:
      'Vezi prețurile în diferite țări și alege cea mai bună ofertă. Apasă pe "Rezervă acum" pentru a rezerva biletul.',
    clickReserve: 'Apasă pe "Rezervă acum" pentru a rezerva biletul.',
    reserveNow: "Rezervă acum",
    unofficialSite: "Site neoficial",
    cheapest: "Cel mai ieftin",
    vsLowest: "față de cel mai mic preț",
    showLess: "Vezi mai puține",
    showAll: "Vezi toate",
    andMore: "și încă",
    moreCountries: "țări",
    tipsTitle: "Sfaturi pentru economii maxime",
    searchToStart: "Introdu numărul zborului pentru a începe căutarea",
    searchDescription2: "Compară prețurile în",
    findBestDeals: "de țări și găsește cele mai bun preț",
  },
  en: {
    title: "Guard4Flight",
    subtitle: "Find the cheapest flight prices",
    flightNumber: "Flight number",
    searchPrices: "SEARCH",
    countries: "countries verified",
    searching: "Searching...",
    results: "Results for flight",
    country: "Country",
    price: "Price",
    airline: "Airline",
    duration: "Duration",
    bookNow: "Book now",
    skyscanner: "Skyscanner",
    savings: "Savings",
    compared: "compared to",
    priceDisclaimer: "Prices may have changed since last data verification",
    tips: "Tips for maximum savings",
    tip1: "Check prices in different countries for the same flight",
    tip2: "Book a few weeks in advance for better prices",
    tip3: "Always compare with official airline websites",
    tip4: "Use incognito mode to avoid price increases",
    showAll: "See all verified countries",
    showLess: "Show less",
    credits: "credits",
    buyCredits: "Buy credits",
    dashboard: "Dashboard",
    logout: "Logout",
    searchHistory: "Search history",
    totalSearches: "Total searches",
    totalSavings: "Total savings",
    recentSearches: "Recent searches",
    noSearches: "No searches yet",
    buyCreditsTitle: "Buy credits",
    buyCreditsDesc: "Choose a credit package to continue searching",
    creditPackages: "Available packages",
    buy: "Buy",
    processing: "Processing...",
    paymentSuccess: "Payment processed successfully!",
    creditsAdded: "Credits have been added to your account.",
    close: "Close",
    loginRequired: "You must log in to search for prices",
    searchTitle: "Search flight ticket prices",
    searchDescription: "Enter the flight number and compare prices in",
    countriesGlobal: "countries",
    countriesVerified: "countries verified",
    searchInProgress: "Searching...",
    lowestPrice: "Lowest price",
    bestDeal: "Best deal",
    highestPrice: "Highest price",
    maxDifference: "Max difference",
    potentialSavings: "Potential savings",
    vsHighest: "vs highest price",
    countriesChecked: "Countries checked",
    globalComparison: "Global comparison",
    importantNote: "Important note",
    priceComparison: "Price comparison",
    priceDescription:
      'See prices in different countries and choose the best offer. Press "Book now" to book the ticket.',
    clickReserve: 'Press "Book now" to book the ticket.',
    reserveNow: "Book now",
    unofficialSite: "Unofficial site",
    cheapest: "Cheapest",
    vsLowest: "vs lowest price",
    showLess: "Show less",
    showAll: "Show all",
    andMore: "and more",
    moreCountries: "countries",
    tipsTitle: "Tips for maximum savings",
    searchToStart: "Enter the flight number to start searching",
    searchDescription2: "Compare prices in",
    findBestDeals: "countries and find the best price",
  },
  fr: {
    title: "Guard4Flight",
    subtitle: "Trouvez les prix de vols les moins chers",
    flightNumber: "Numéro de vol",
    searchPrices: "RECHERCHER",
    countries: "pays vérifiés",
    searching: "Recherche...",
    results: "Résultats pour le vol",
    country: "Pays",
    price: "Prix",
    airline: "Compagnie aérienne",
    duration: "Durée",
    bookNow: "Réserver maintenant",
    skyscanner: "Skyscanner",
    savings: "Économies",
    compared: "par rapport à",
    priceDisclaimer: "Les prix peuvent avoir changé depuis la dernière vérification",
    tips: "Conseils pour des économies maximales",
    tip1: "Vérifiez les prix dans différents pays pour le même vol",
    tip2: "Réservez quelques semaines à l'avance pour de meilleurs prix",
    tip3: "Comparez toujours avec les sites officiels des compagnies aériennes",
    tip4: "Utilisez le mode incognito pour éviter les augmentations de prix",
    showAll: "Voir tous les pays vérifiés",
    showLess: "Voir moins",
    credits: "crédits",
    buyCredits: "Acheter des crédits",
    dashboard: "Tableau de bord",
    logout: "Déconnexion",
    searchHistory: "Historique des recherches",
    totalSearches: "Total des recherches",
    totalSavings: "Économies totales",
    recentSearches: "Recherches récentes",
    noSearches: "Aucune recherche encore",
    buyCreditsTitle: "Acheter des crédits",
    buyCreditsDesc: "Choisissez un forfait de crédits pour continuer à chercher",
    creditPackages: "Forfaits disponibles",
    buy: "Acheter",
    processing: "Traitement...",
    paymentSuccess: "Paiement traité avec succès!",
    creditsAdded: "Les crédits ont été ajoutés à votre compte.",
    close: "Fermer",
    loginRequired: "Vous devez vous connecter pour rechercher des prix",
    searchTitle: "Rechercher les prix des billets d'avion",
    searchDescription: "Entrez le numéro de vol et comparez les prix dans",
    countriesGlobal: "pays",
    countriesVerified: "pays vérifiés",
    searchInProgress: "Recherche...",
    lowestPrice: "Prix le plus bas",
    bestDeal: "Meilleure offre",
    highestPrice: "Prix le plus élevé",
    maxDifference: "Différence maximale",
    potentialSavings: "Économies potentielles",
    vsHighest: "vs prix le plus élevé",
    countriesChecked: "Pays vérifiés",
    globalComparison: "Comparaison globale",
    importantNote: "Note importante",
    priceComparison: "Comparaison des prix",
    priceDescription:
      'Consultez les prix dans différents pays et choisissez la meilleure offre. Appuyez sur "Réserver maintenant" pour réserver le billet.',
    clickReserve: 'Appuyez sur "Réserver maintenant" pour réserver le billet.',
    reserveNow: "Réserver maintenant",
    unofficialSite: "Site non officiel",
    cheapest: "Le moins cher",
    vsLowest: "vs prix le plus bas",
    showLess: "Voir moins",
    showAll: "Voir tous",
    andMore: "et plus",
    moreCountries: "pays",
    tipsTitle: "Conseils pour des économies maximales",
    searchToStart: "Entrez le numéro de vol pour commencer la recherche",
    searchDescription2: "Comparez les prix dans",
    findBestDeals: "pays et trouvez le meilleur prix",
  },
  es: {
    title: "Guard4Flight",
    subtitle: "Encuentra los precios de vuelos más baratos",
    flightNumber: "Número de vuelo",
    searchPrices: "BUSCAR",
    countries: "países verificados",
    searching: "Buscando...",
    results: "Resultados para el vuelo",
    country: "País",
    price: "Precio",
    airline: "Aerolínea",
    duration: "Duración",
    bookNow: "Reservar ahora",
    skyscanner: "Skyscanner",
    savings: "Ahorros",
    compared: "comparado con",
    priceDisclaimer: "Los precios pueden haber cambiado desde la última verificación",
    tips: "Consejos para ahorros máximos",
    tip1: "Verifica precios en diferentes países para el mismo vuelo",
    tip2: "Reserva con unas semanas de anticipación para mejores precios",
    tip3: "Siempre compara con los sitios web oficiales de las aerolíneas",
    tip4: "Usa modo incógnito para evitar aumentos de precios",
    showAll: "Ver todos los países verificados",
    showLess: "Ver menos",
    credits: "créditos",
    buyCredits: "Comprar créditos",
    dashboard: "Panel de control",
    logout: "Cerrar sesión",
    searchHistory: "Historial de búsquedas",
    totalSearches: "Total de búsquedas",
    totalSavings: "Ahorros totales",
    recentSearches: "Búsquedas recientes",
    noSearches: "Aún no hay búsquedas",
    buyCreditsTitle: "Comprar créditos",
    buyCreditsDesc: "Elige un paquete de créditos para continuar buscando",
    creditPackages: "Paquetes disponibles",
    buy: "Comprar",
    processing: "Procesando...",
    paymentSuccess: "¡Pago procesado exitosamente!",
    creditsAdded: "Los créditos han sido agregados a tu cuenta.",
    close: "Cerrar",
    loginRequired: "Debe iniciar sesión para buscar precios",
    searchTitle: "Buscar precios de boletos de avión",
    searchDescription: "Ingrese el número de vuelo y compare precios en",
    countriesGlobal: "países",
    countriesVerified: "países verificados",
    searchInProgress: "Buscando...",
    lowestPrice: "Precio más bajo",
    bestDeal: "Mejor trato",
    highestPrice: "Precio más alto",
    maxDifference: "Diferencia máxima",
    potentialSavings: "Ahorros potenciales",
    vsHighest: "vs precio más alto",
    countriesChecked: "Países verificados",
    globalComparison: "Comparación global",
    importantNote: "Nota importante",
    priceComparison: "Comparación de precios",
    priceDescription:
      'Consulte los precios en diferentes países y elija la mejor oferta. Presione "Reservar ahora" para reservar el boleto.',
    clickReserve: 'Presione "Reservar ahora" para reservar el boleto.',
    reserveNow: "Reservar ahora",
    unofficialSite: "Sitio no oficial",
    cheapest: "El más barato",
    vsLowest: "vs precio más bajo",
    showLess: "Ver menos",
    showAll: "Ver todos",
    andMore: "y más",
    moreCountries: "países",
    tipsTitle: "Consejos para ahorros máximos",
    searchToStart: "Ingrese el número de vuelo para comenzar la búsqueda",
    searchDescription2: "Compare precios en",
    findBestDeals: "países y encuentra el mejor precio",
  },
}

const searchPrices = async (
  flightNumber: string,
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>,
  setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>,
  setPriceComparisons: React.Dispatch<React.SetStateAction<PriceComparison[]>>,
  setAnimationPhase: React.Dispatch<React.SetStateAction<"idle" | "takeoff" | "landing">>,
) => {
  if (!flightNumber.trim()) return

  setIsSearching(true)
  setShowAnimation(true)

  const generatePriceVariation = (basePrice: number, flightNumber: string, countryIndex: number) => {
    const flightHash = flightNumber.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0)
      return a & a
    }, 0)

    const countryHash = countryIndex * 17 + (Math.abs(flightHash) % 100)

    const variation = (countryHash % 100) - 40
    const finalPrice = Math.round(basePrice * (1 + variation / 100))

    return Math.max(finalPrice, 80)
  }

  const getAirlineFromFlightCode = (flightNumber: string) => {
    const code = flightNumber.replace(/[0-9]/g, "").toUpperCase()

    const airlineMap: { [key: string]: { airline: string; website: string; isOfficial: boolean } } = {
      // Major European Airlines
      BA: { airline: "British Airways", website: "https://www.britishairways.com", isOfficial: true },
      LH: { airline: "Lufthansa", website: "https://www.lufthansa.com", isOfficial: true },
      AF: { airline: "Air France", website: "https://www.airfrance.com", isOfficial: true },
      KL: { airline: "KLM", website: "https://www.klm.com", isOfficial: true },
      IB: { airline: "Iberia", website: "https://www.iberia.com", isOfficial: true },
      AZ: { airline: "ITA Airways", website: "https://www.itaspa.com", isOfficial: true },
      LX: { airline: "Swiss International", website: "https://www.swiss.com", isOfficial: true },
      OS: { airline: "Austrian Airlines", website: "https://www.austrian.com", isOfficial: true },
      SN: { airline: "Brussels Airlines", website: "https://www.brusselsairlines.com", isOfficial: true },
      SK: { airline: "SAS", website: "https://www.flysas.com", isOfficial: true },
      AY: { airline: "Finnair", website: "https://www.finnair.com", isOfficial: true },
      DY: { airline: "Norwegian", website: "https://www.norwegian.com", isOfficial: true },

      // Eastern European Airlines
      LO: { airline: "LOT Polish Airlines", website: "https://www.lot.com", isOfficial: true },
      RO: { airline: "TAROM", website: "https://www.tarom.ro", isOfficial: true },
      OK: { airline: "Czech Airlines", website: "https://www.czechairlines.com", isOfficial: true },
      JU: { airline: "Air Serbia", website: "https://www.airserbia.com", isOfficial: true },
      OU: { airline: "Croatia Airlines", website: "https://www.croatiaairlines.com", isOfficial: true },
      W6: { airline: "Wizz Air", website: "https://wizzair.com", isOfficial: true },
      FR: { airline: "Ryanair", website: "https://www.ryanair.com", isOfficial: true },

      // North American Airlines
      AA: { airline: "American Airlines", website: "https://www.aa.com", isOfficial: true },
      UA: { airline: "United Airlines", website: "https://www.united.com", isOfficial: true },
      DL: { airline: "Delta Air Lines", website: "https://www.delta.com", isOfficial: true },
      AC: { airline: "Air Canada", website: "https://www.aircanada.com", isOfficial: true },
      WN: { airline: "Southwest Airlines", website: "https://www.southwest.com", isOfficial: true },
      B6: { airline: "JetBlue Airways", website: "https://www.jetblue.com", isOfficial: true },
      AS: { airline: "Alaska Airlines", website: "https://www.alaskaair.com", isOfficial: true },
      F9: { airline: "Frontier Airlines", website: "https://www.flyfrontier.com", isOfficial: true },
      NK: { airline: "Spirit Airlines", website: "https://www.spirit.com", isOfficial: true },
      WS: { airline: "WestJet", website: "https://www.westjet.com", isOfficial: true },
      Y4: { airline: "Volaris", website: "https://www.volaris.com", isOfficial: true },
      VB: { airline: "VivaAerobus", website: "https://www.vivaaerobus.com", isOfficial: true },
      AM: { airline: "Aeromexico", website: "https://aeromexico.com", isOfficial: true },

      // Middle East Airlines
      EK: { airline: "Emirates", website: "https://www.emirates.com", isOfficial: true },
      QR: { airline: "Qatar Airways", website: "https://www.qatarairways.com", isOfficial: true },
      TK: { airline: "Turkish Airlines", website: "https://www.turkishairlines.com", isOfficial: true },
      FZ: { airline: "flydubai", website: "https://www.flydubai.com", isOfficial: true },
      WY: { airline: "Oman Air", website: "https://www.omanair.com", isOfficial: true },
      GF: { airline: "Gulf Air", website: "https://www.gulfair.com", isOfficial: true },
      ME: { airline: "Middle East Airlines", website: "https://www.mea.com.lb", isOfficial: true },
      RJ: { airline: "Royal Jordanian", website: "https://www.rj.com", isOfficial: true },
      SV: { airline: "Saudia", website: "https://www.saudia.com", isOfficial: true },
      LY: { airline: "El Al", website: "https://www.elal.com", isOfficial: true },

      // Asian Airlines
      SQ: { airline: "Singapore Airlines", website: "https://www.singaporeair.com", isOfficial: true },
      JL: { airline: "Japan Airlines", website: "https://www.jal.co.jp/en/us", isOfficial: true },
      NH: { airline: "ANA", website: "https://www.ana.co.jp/en/us", isOfficial: true },
      CX: { airline: "Cathay Pacific", website: "https://www.cathaypacific.com", isOfficial: true },
      AI: { airline: "Air India", website: "https://www.airindia.in", isOfficial: true },
      TG: { airline: "Thai Airways", website: "https://www.thaiairways.com", isOfficial: true },
      MH: { airline: "Malaysia Airlines", website: "https://www.malaysiaairlines.com", isOfficial: true },
      GA: { airline: "Garuda Indonesia", website: "https://www.garuda-indonesia.com", isOfficial: true },
      PR: { airline: "Philippine Airlines", website: "https://www.philippineairlines.com", isOfficial: true },
      VN: { airline: "Vietnam Airlines", website: "https://www.vietnamairlines.com", isOfficial: true },
      KE: { airline: "Korean Air", website: "https://www.koreanair.com", isOfficial: true },
      OZ: { airline: "Asiana Airlines", website: "https://flyasiana.com", isOfficial: true },
      CI: { airline: "China Airlines", website: "https://www.china-airlines.com", isOfficial: true },
      BR: { airline: "EVA Air", website: "https://www.evaair.com", isOfficial: true },
      CA: { airline: "Air China", website: "https://www.airchina.com.cn", isOfficial: true },
      CZ: { airline: "China Southern", website: "https://www.csair.com", isOfficial: true },
      MU: { airline: "China Eastern", website: "https://www.ceair.com", isOfficial: true },
      HU: { airline: "Hainan Airlines", website: "https://www.hainanairlines.com", isOfficial: true },
      "9W": { airline: "Jet Airways", website: "https://www.jetairways.com", isOfficial: false },
      "6E": { airline: "IndiGo", website: "https://www.goindigo.in", isOfficial: true },
      SG: { airline: "SpiceJet", website: "https://www.spicejet.com", isOfficial: true },

      // Low-Cost Carriers Globally
      U2: { airline: "easyJet", website: "https://www.easyjet.com", isOfficial: true },
      VY: { airline: "Vueling", website: "https://www.vueling.com", isOfficial: true },
      TP: { airline: "TAP Air Portugal", website: "https://www.flytap.com", isOfficial: true },
      HV: { airline: "Transavia", website: "https://www.transavia.com", isOfficial: true },
      PC: { airline: "Pegasus Airlines", website: "https://www.flypgs.com", isOfficial: true },
      XQ: { airline: "SunExpress", website: "https://www.sunexpress.com", isOfficial: true },
      A3: { airline: "Aegean Airlines", website: "https://www.aegeanair.com", isOfficial: true },
      EI: { airline: "Aer Lingus", website: "https://www.aerlingus.com", isOfficial: true },
      KM: { airline: "Air Malta", website: "https://www.airmalta.com", isOfficial: true },
      CY: { airline: "Cyprus Airways", website: "https://www.cyprusairways.com", isOfficial: true },
      BT: { airline: "airBaltic", website: "https://www.airbaltic.com", isOfficial: true },
      WF: { airline: "Widerøe", website: "https://www.wideroe.no", isOfficial: true },
    }

    if (airlineMap[code]) {
      return airlineMap[code]
    } else {
      return {
        airline: `${code} Airlines`,
        website: `https://www.skyscanner.com/transport/flights/${flightNumber.toLowerCase()}/`,
        isOfficial: false,
      }
    }
  }

  const basePrices = {
    România: 185,
    Bulgaria: 190,
    Serbia: 175,
    Macedonia: 170,
    Albania: 165,
    Bosnia: 168,
    Polonia: 195,
    Ungaria: 192,
    Cehia: 198,
    Slovacia: 200,
    Slovenia: 215,
    Croația: 210,
    Austria: 240,
    Germania: 255,
    Franța: 265,
    Belgia: 260,
    Olanda: 270,
    Italia: 245,
    Spania: 235,
    Portugalia: 230,
    Danemarca: 305,
    Suedia: 300,
    Norvegia: 340,
    Finlanda: 310,
    Elveția: 330,
    Islanda: 350,
    Luxemburg: 280,
    Monaco: 320,
    SUA: 450,
    Canada: 410,
    Japonia: 680,
    Australia: 820,
    Brazilia: 550,
    "Emiratele Arabe": 370,
    Singapore: 610,
    Thailanda: 480,
    India: 410,
    China: 510,
    "Coreea de Sud": 650,
    Mexic: 490,
    Argentina: 610,
    "Africa de Sud": 550,
    "Noua Zeelandă": 880,
    Israel: 310,
    Turcia: 215,
    Egipt: 350,
    "Arabia Saudită": 390,
    Malaezia: 550,
    Indonezia: 570,
    Filipine: 590,
    Vietnam: 510,
    Grecia: 220,
    Irlanda: 280,
    Malta: 250,
    Cipru: 260,
    Estonia: 205,
    Letonia: 210,
    Lituania: 208,
    "Hong Kong": 620,
    Taiwan: 600,
    Maroc: 280,
    Kenya: 480,
    Nigeria: 520,
    Qatar: 380,
    Kuwait: 400,
    Chile: 640,
    Peru: 580,
    Columbia: 560,
  }

  const mockData: PriceComparison[] = countries.map((country, index) => {
    const basePrice = basePrices[country.name as keyof typeof basePrices] || 250
    const price = generatePriceVariation(basePrice, flightNumber, index)
    const airlineInfo = getAirlineFromFlightCode(flightNumber)

    return {
      country: country.name,
      flag: country.flag,
      price: price,
      currency: "EUR",
      bookingUrl: airlineInfo.website,
      airline: airlineInfo.airline,
      duration: price > 500 ? "8h+" : price > 350 ? "4h+" : "2h 15m",
      isOfficial: airlineInfo.isOfficial,
    }
  })

  const sortedData = mockData.sort((a, b) => a.price - b.price)
  setPriceComparisons(sortedData)

  setAnimationPhase("landing")

  setTimeout(() => {
    setAnimationPhase("idle")
    setIsSearching(false)
  }, 1000)
}

const handleSearch = (
  e: React.FormEvent,
  flightNumber: string,
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>,
  setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>,
  setPriceComparisons: React.Dispatch<React.SetStateAction<PriceComparison[]>>,
  setAnimationPhase: React.Dispatch<React.SetStateAction<"idle" | "takeoff" | "landing">>,
) => {
  e.preventDefault()
  if (flightNumber.trim()) {
    searchPrices(flightNumber, setIsSearching, setShowAnimation, setPriceComparisons, setAnimationPhase)
  }
}

export default function FlightPriceFinder() {
  const [flightNumber, setFlightNumber] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [priceComparisons, setPriceComparisons] = useState<PriceComparison[]>([])
  const [animationPhase, setAnimationPhase] = useState<"idle" | "takeoff" | "landing">("idle")
  const [showAllCountries, setShowAllCountries] = useState(false)
  const [language, setLanguage] = useState<"ro" | "en" | "fr" | "es">("ro")
  const [showAnimation, setShowAnimation] = useState(false)

  const t = translations[language]

  const lowestPrice = priceComparisons.length > 0 ? Math.min(...priceComparisons.map((p) => p.price)) : 0
  const highestPrice = priceComparisons.length > 0 ? Math.max(...priceComparisons.map((p) => p.price)) : 0
  const maxSavings = highestPrice - lowestPrice

  const displayedComparisons = showAllCountries ? priceComparisons : priceComparisons.slice(0, 15)

  const cycleLanguage = () => {
    const languages: ("ro" | "en" | "fr" | "es")[] = ["ro", "en", "fr", "es"]
    const currentIndex = languages.indexOf(language)
    const nextIndex = (currentIndex + 1) % languages.length
    setLanguage(languages[nextIndex])
  }

  const getCurrentLanguageInfo = () => {
    const languageInfo = {
      ro: { flag: "🇷🇴", name: "RO" },
      en: { flag: "🇺🇸", name: "EN" },
      fr: { flag: "🇫🇷", name: "FR" },
      es: { flag: "🇪🇸", name: "ES" },
    }
    return languageInfo[language]
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float animate-delay-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse-modern"></div>
      </div>

      <header className="relative z-10 p-4 md:p-6 animate-fade-in-up">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 animate-slide-in-left">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl shadow-2xl animate-glow hover-rotate">
              <Plane className="w-8 h-8 text-white animate-float" />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text animate-fade-in-scale">{t.title}</h1>
              <p className="text-lg text-muted-foreground font-medium animate-fade-in-up animate-delay-200">
                {t.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 animate-slide-in-right">
            <button
              onClick={cycleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card-modern hover-lift-modern transition-all duration-300 animate-glow border border-accent/30 hover:border-accent/50"
            >
              <span className="text-xl">{getCurrentLanguageInfo().flag}</span>
              <span className="font-semibold text-foreground">{getCurrentLanguageInfo().name}</span>
              <div className="w-1 h-1 bg-accent rounded-full animate-pulse"></div>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-6">
        <section className="mb-12 animate-fade-in-up animate-delay-200">
          <div className="glass-card-modern rounded-3xl p-8 hover-lift-modern">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6 animate-fade-in-scale drop-shadow-lg">
                {t.searchTitle}
              </h2>
              <div className="search-description-box backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-lg mx-auto max-w-2xl">
                <p className="text-xl font-semibold animate-fade-in-up animate-delay-300 flex items-center justify-center gap-2 flex-wrap">
                  <Search className="w-5 h-5 text-accent animate-pulse-modern" />
                  <span>{t.searchDescription}</span>{" "}
                  <span className="font-bold text-accent animate-pulse-modern">{countries.length}</span>{" "}
                  <span>{t.findBestDeals}</span>
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) =>
                handleSearch(e, flightNumber, setIsSearching, setShowAnimation, setPriceComparisons, setAnimationPhase)
              }
              className="flex flex-col md:flex-row gap-4 animate-scale-in animate-delay-400"
            >
              <div className="flex-grow relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder={t.flightNumber}
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-xl border-2 focus:border-accent transition-all duration-300 hover-glow"
                />
              </div>
              <Button
                type="submit"
                className="h-14 px-8 text-base rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold min-w-[140px]"
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-white">{t.searching}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-white" />
                    <span className="text-white">{t.searchPrices}</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Animated airplane during search */}
            {showAnimation && animationPhase !== "idle" && (
              <div className="flex justify-center mt-8">
                <div className="relative">
                  <Plane
                    className={`w-12 h-12 text-accent ${
                      animationPhase === "takeoff" ? "animate-slide-in-left" : "animate-slide-in-right"
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {!isSearching && priceComparisons.length === 0 && (
          <section className="animate-fade-in-up animate-delay-400">
            <div className="text-center mb-8">
              <Button
                asChild
                className="vpn-button-override bg-slate-900 hover:bg-black text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 animate-glow text-lg border-0"
                style={{ backgroundColor: "#0f172a", color: "#ffffff" }}
              >
                <a
                  href="https://go.nordvpn.net/SHA9a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vpn-button-override text-white no-underline flex items-center gap-3"
                  style={{ color: "#ffffff", backgroundColor: "#0f172a" }}
                >
                  <Globe className="w-6 h-6 text-white" style={{ color: "#ffffff" }} />
                  <span className="text-white" style={{ color: "#ffffff" }}>
                    BEST VPN
                  </span>
                  <Star className="w-5 h-5 text-white" style={{ color: "#ffffff" }} />
                </a>
              </Button>
            </div>

            <Card className="glass-card-modern hover-lift-modern">
              <CardHeader>
                <CardTitle className="text-2xl gradient-text-purple text-center">{t.tipsTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[t.tip1, t.tip2, t.tip3, t.tip4].map((tip, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover-lift-modern animate-slide-in-left animate-delay-${(index + 1) * 100}`}
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold animate-glow">
                        {index + 1}
                      </div>
                      <p className="text-foreground font-medium">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {!isSearching && priceComparisons.length > 0 && (
          <section className="animate-fade-in-up animate-delay-500">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-6 mb-8">
              {[
                { label: t.lowestPrice, value: `${lowestPrice} EUR`, icon: TrendingDown, color: "text-green-600" },
                { label: t.highestPrice, value: `${highestPrice} EUR`, icon: Star, color: "text-red-600" },
                { label: t.maxDifference, value: `${maxSavings} EUR`, icon: Zap, color: "text-accent" },
                {
                  label: t.countriesChecked,
                  value: `${priceComparisons.length}`,
                  icon: Globe,
                  color: "text-primary",
                },
              ].map((stat, index) => (
                <Card
                  key={stat.label}
                  className={`glass-card-modern hover-lift-modern animate-scale-in animate-delay-${(index + 1) * 100}`}
                >
                  <CardContent className="p-6 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} animate-pulse-modern`} />
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold gradient-text-purple">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedComparisons.map((comparison, index) => (
                <Card
                  key={comparison.country}
                  className={`glass-card-modern hover-lift-modern animate-fade-in-up animate-delay-${Math.min((index + 1) * 100, 500)} ${
                    comparison.price === lowestPrice ? "ring-2 ring-green-500 ring-opacity-50" : ""
                  }`}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl animate-pulse-modern">{comparison.flag}</span>
                        <span className="font-bold">{comparison.country}</span>
                      </div>
                      {comparison.price === lowestPrice && (
                        <Badge className="bg-green-500 text-white animate-glow">{t.cheapest}</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{t.price}</p>
                        <p className="text-2xl font-bold gradient-text-purple">{comparison.price} EUR</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{t.airline}</p>
                        <p className="font-semibold">{comparison.airline}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="text-muted-foreground">{t.duration}</p>
                        <p className="font-medium">{comparison.duration}</p>
                      </div>
                      {comparison.price > lowestPrice && (
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">+{comparison.price - lowestPrice} EUR</p>
                          <p className="text-xs text-red-600">{t.vsLowest}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {comparison.isOfficial ? (
                        <Button asChild className="flex-1 btn-modern hover-slide">
                          <a href={comparison.bookingUrl} target="_blank" rel="noopener noreferrer">
                            {t.bookNow}
                          </a>
                        </Button>
                      ) : (
                        <>
                          <Button disabled className="flex-1 bg-gray-400 cursor-not-allowed">
                            {t.bookNow}
                          </Button>
                          <Button asChild variant="outline" size="sm" className="hover-glow bg-transparent">
                            <a href={comparison.bookingUrl} target="_blank" rel="noopener noreferrer">
                              {t.skyscanner}
                            </a>
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {priceComparisons.length > 15 && (
              <div className="text-center animate-fade-in-up animate-delay-300">
                <Button
                  onClick={() => setShowAllCountries(!showAllCountries)}
                  variant="outline"
                  className="px-8 py-3 rounded-xl hover-lift-modern"
                >
                  {showAllCountries ? t.showLess : `${t.showAll} (+${priceComparisons.length - 15} ${t.moreCountries})`}
                </Button>
              </div>
            )}
          </section>
        )}

        {priceComparisons.length > 0 && (
          <div className="mt-12 animate-fade-in-up animate-delay-600">
            <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl p-6 mb-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">!</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-red-800 mb-2">WARNING / AVERTISMENT</h3>
                  <p className="text-red-700 font-medium">
                    {language === "ro"
                      ? "Prețurile pot suferi ajustări imediate și nu pot coincide întotdeauna cu cele din rezultat. Verificați întotdeauna prețurile pe site-urile oficiale ale companiilor aeriene înainte de rezervare."
                      : "Prices may change immediately and may not always match the results shown. Always verify prices on official websites before booking."}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground bg-muted/50 rounded-xl p-4 inline-block">💡 {t.priceDisclaimer}</p>
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 mt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center">
            <p className="text-sm text-red-600 font-medium bg-red-50 rounded-lg px-4 py-2 inline-block border border-red-200">
              {language === "ro"
                ? "Prețurile pot suferi ajustări imediate și nu pot coincide cu cele din rezultat"
                : language === "en"
                  ? "Prices may change immediately and may not match the results shown"
                  : language === "fr"
                    ? "Les prix peuvent changer immédiatement et ne pas correspondre aux résultats affichés"
                    : "Los precios pueden cambiar inmediatamente y no coincidir con los resultados mostrados"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
