"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, TrendingDown, Wallet, Plus, X, Settings, User, BarChart3 } from "lucide-react"
import countries from "@/data/countries" // Importing countries data

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

interface SearchHistoryItem {
  id: string
  flightNumber: string
  searchDate: Date
  lowestPrice: number
  highestPrice: number
  savings: number
  countriesChecked: number
}

interface UserCredits {
  credits: number
  searchHistory: SearchHistoryItem[]
  totalSearches: number
}

const translations = {
  ro: {
    title: "Guard4Flight",
    subtitle: "Găsește cel mai mic preț pentru biletele de avion",
    flightNumber: "Numărul zborului",
    searchPrices: "Caută prețuri în",
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
    creditPackages: "Pachete disponibile",
    buy: "Cumpără",
    processing: "Se procesează...",
    paymentSuccess: "Plata a fost procesată cu succes!",
    creditsAdded: "Creditele au fost adăugate în contul tău.",
    close: "Închide",
    loginRequired: "Trebuie să te autentifici pentru a căuta prețuri",
    searchTitle: "Caută prețuri bilete de avion",
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
    priceDisclaimer: "Prețurile pot suferi modificări de la ultima verificare a datelor",
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
    findBestDeals: "și găsește cele mai bune oferte",
  },
  en: {
    title: "Guard4Flight",
    subtitle: "Find the cheapest flight prices",
    flightNumber: "Flight number",
    searchPrices: "Search prices in",
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
    priceDisclaimer: "Prices may have changed since last data verification",
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
    findBestDeals: "and find the best deals",
  },
  fr: {
    title: "Guard4Flight",
    subtitle: "Trouvez les prix de vols les moins chers",
    flightNumber: "Numéro de vol",
    searchPrices: "Rechercher les prix dans",
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
    priceDisclaimer: "Les prix peuvent avoir changé depuis la dernière vérification",
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
    findBestDeals: "et trouvez les meilleures offres",
  },
  es: {
    title: "Guard4Flight",
    subtitle: "Encuentra los precios de vuelos más baratos",
    flightNumber: "Número de vuelo",
    searchPrices: "Buscar precios en",
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
    priceDisclaimer: "Los precios pueden haber cambiado desde la última verificación",
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
    findBestDeals: "y encuentra las mejores ofertas",
  },
}

const handleBuyCredits = (credits: number, cost: number) => {
  // Placeholder function for handling credit purchase logic
  console.log(`Purchased ${credits} credits for ${cost} EUR`)
}

export default function FlightPriceFinder() {
  const [userCredits, setUserCredits] = useState<UserCredits>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("userCredits")
      return saved ? JSON.parse(saved) : { credits: 0, searchHistory: [], totalSearches: 0 }
    }
    return { credits: 0, searchHistory: [], totalSearches: 0 }
  })
  const [showCreditsModal, setShowCreditsModal] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [flightNumber, setFlightNumber] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [priceComparisons, setPriceComparisons] = useState<PriceComparison[]>([])
  const [animationPhase, setAnimationPhase] = useState<"idle" | "takeoff" | "landing">("idle")
  const [showAllCountries, setShowAllCountries] = useState(false)
  const [language, setLanguage] = useState<"ro" | "en" | "fr" | "es">("ro")
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    localStorage.setItem("userCredits", JSON.stringify(userCredits))
  }, [userCredits])

  const updateUserCredits = (newCredits: Partial<UserCredits>) => {
    setUserCredits((prev) => ({ ...prev, ...newCredits }))
  }

  const t = translations[language]

  const searchPrices = async () => {
    if (userCredits.credits < 3) {
      setShowCreditsModal(true)
      return
    }

    setIsSearching(true)
    setShowAnimation(true)

    updateUserCredits({ credits: userCredits.credits - 3 })

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

    const lowestPrice = Math.min(...sortedData.map((p) => p.price))
    const highestPrice = Math.max(...sortedData.map((p) => p.price))
    const newSearchHistory: SearchHistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      flightNumber: flightNumber,
      searchDate: new Date(),
      lowestPrice: lowestPrice,
      highestPrice: highestPrice,
      savings: highestPrice - lowestPrice,
      countriesChecked: sortedData.length,
    }

    await updateUserCredits({
      searchHistory: [newSearchHistory, ...userCredits.searchHistory].slice(0, 10),
      totalSearches: userCredits.totalSearches + 1,
    })

    setAnimationPhase("landing")

    setTimeout(() => {
      setAnimationPhase("idle")
      setIsSearching(false)
    }, 1000)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (flightNumber.trim()) {
      searchPrices()
    }
  }

  const lowestPrice = priceComparisons.length > 0 ? Math.min(...priceComparisons.map((p) => p.price)) : 0
  const highestPrice = priceComparisons.length > 0 ? Math.max(...priceComparisons.map((p) => p.price)) : 0
  const maxSavings = highestPrice - lowestPrice

  const displayedComparisons = showAllCountries ? priceComparisons : priceComparisons.slice(0, 15)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary via-accent to-primary rounded-2xl shadow-xl animate-pulse-glow">
              <Plane className="w-6 h-6 text-white animate-float" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                {t.subtitle} {countries.length} {t.countries}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "ro" | "en" | "fr" | "es")}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
              >
                <option value="ro">🇷🇴 RO</option>
                <option value="en">🇬🇧 EN</option>
                <option value="fr">🇫🇷 FR</option>
                <option value="es">🇪🇸 ES</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="flex items-center gap-2 bg-gradient-to-r from-muted to-card px-4 py-2 rounded-xl cursor-pointer hover:from-card hover:to-muted transition-all duration-200 border border-border"
                onClick={() => setShowCreditsModal(true)}
              >
                <Wallet className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-primary">{userCredits.credits} credite</span>
              </div>

              <Button
                onClick={() => setShowDashboard(true)}
                size="sm"
                variant="ghost"
                className="flex items-center gap-2 px-3 py-2 h-auto hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">Dashboard</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-6">
        {/* Search Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t.searchTitle}</h2>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder={t.flightNumber}
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" className="w-full md:w-auto">
              {t.searchPrices} {countries.length} {t.countriesGlobal}
            </Button>
          </form>
        </section>

        {/* Results Section */}
        <section>
          {isSearching && (
            <div className="flex items-center justify-center">
              <p className="text-lg font-medium">{t.searching}</p>
            </div>
          )}

          {!isSearching && priceComparisons.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {displayedComparisons.map((comparison) => (
                  <Card key={comparison.country}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <img src={comparison.flag || "/placeholder.svg"} alt={comparison.country} className="w-6 h-6" />
                        {comparison.country}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{t.price}:</p>
                          <p className="font-medium">{comparison.price} EUR</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t.airline}:</p>
                          <p className="font-medium">{comparison.airline}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{t.duration}:</p>
                          <p className="font-medium">{comparison.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{t.currency}:</p>
                          <p className="font-medium">EUR</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button asChild className="w-full">
                          <a href={comparison.bookingUrl} target="_blank" rel="noopener noreferrer">
                            {t.bookNow}
                          </a>
                        </Button>
                        {!comparison.isOfficial && (
                          <Badge variant="secondary" className="ml-auto">
                            {t.unofficialSite}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-8">
                <p className="text-lg font-medium mb-4">{t.priceDisclaimer}</p>
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.lowestPrice}:</p>
                    <p className="font-medium">{lowestPrice} EUR</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.highestPrice}:</p>
                    <p className="font-medium">{highestPrice} EUR</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.maxDifference}:</p>
                    <p className="font-medium">{maxSavings} EUR</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.potentialSavings}:</p>
                    <p className="font-medium">{t.vsLowest}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.countriesChecked}:</p>
                    <p className="font-medium">
                      {priceComparisons.length} {t.countries}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.globalComparison}:</p>
                    <p className="font-medium">{t.vsHighest}</p>
                  </div>
                </div>
                <Button onClick={() => setShowAllCountries(!showAllCountries)} size="sm">
                  {showAllCountries ? t.showLess : t.showAll}
                </Button>
              </div>
            </>
          )}

          {!isSearching && priceComparisons.length === 0 && (
            <div className="flex items-center justify-center">
              <p className="text-lg font-medium">{t.searchToStart}</p>
            </div>
          )}

          {!isSearching && priceComparisons.length === 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">{t.tipsTitle}</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>{t.tip1}</li>
                <li>{t.tip2}</li>
                <li>{t.tip3}</li>
                <li>{t.tip4}</li>
              </ul>
            </div>
          )}
        </section>
      </main>

      {/* Dashboard Modal */}
      {showDashboard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Dashboard utilizator
                </CardTitle>
                <Button onClick={() => setShowDashboard(false)} size="sm" variant="ghost">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>Gestionează contul și vezi statisticile căutărilor tale</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setShowCreditsModal(true)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Credite disponibile</p>
                        <p className="text-2xl font-bold text-primary">{userCredits.credits}</p>
                      </div>
                      <div className="ml-auto">
                        <Button size="sm" variant="outline">
                          <Plus className="w-3 h-3 mr-1" />
                          Cumpără
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-secondary/5 border-secondary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total căutări</p>
                        <p className="text-2xl font-bold text-secondary">{userCredits.totalSearches}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingDown className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Economii totale</p>
                        <p className="text-2xl font-bold text-green-600">
                          {userCredits.searchHistory.reduce((total, search) => total + search.savings, 0)} EUR
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informații cont
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Credite:</span>
                    <span className="font-medium">{userCredits.credits}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Căutări efectuate:</span>
                    <span className="font-medium">{userCredits.totalSearches}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Search History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">{t.searchHistory}</CardTitle>
                </CardHeader>
                <CardContent>
                  {userCredits.searchHistory.length > 0 ? (
                    <div className="space-y-4">
                      {userCredits.searchHistory.map((search) => (
                        <div key={search.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{t.flightNumber}:</p>
                            <p className="font-medium">{search.flightNumber}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t.searchDate}:</p>
                            <p className="font-medium">{search.searchDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t.lowestPrice}:</p>
                            <p className="font-medium">{search.lowestPrice} EUR</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t.highestPrice}:</p>
                            <p className="font-medium">{search.highestPrice} EUR</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t.savings}:</p>
                            <p className="font-medium">{search.savings} EUR</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{t.noSearches}</p>
                  )}
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Buy Credits Modal */}
      {showCreditsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t.buyCreditsTitle}</CardTitle>
                <Button onClick={() => setShowCreditsModal(false)} size="sm" variant="ghost">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>{t.buyCreditsDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">{t.creditPackages}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Example Credit Packages */}
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <p className="text-xl font-bold">10 Credits</p>
                    <p className="text-sm text-muted-foreground">5 EUR</p>
                    <Button
                      onClick={() => handleBuyCredits(10, 5)}
                      className="w-full mt-4"
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? t.processing : t.buy}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <p className="text-xl font-bold">25 Credits</p>
                    <p className="text-sm text-muted-foreground">12 EUR</p>
                    <Button
                      onClick={() => handleBuyCredits(25, 12)}
                      className="w-full mt-4"
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? t.processing : t.buy}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <p className="text-xl font-bold">50 Credits</p>
                    <p className="text-sm text-muted-foreground">23 EUR</p>
                    <Button
                      onClick={() => handleBuyCredits(50, 23)}
                      className="w-full mt-4"
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? t.processing : t.buy}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <p className="text-xl font-bold">100 Credits</p>
                    <p className="text-sm text-muted-foreground">45 EUR</p>
                    <Button
                      onClick={() => handleBuyCredits(100, 45)}
                      className="w-full mt-4"
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? t.processing : t.buy}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payment Success Modal */}
      {paymentSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>{t.paymentSuccess}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{t.creditsAdded}</p>
              <Button onClick={() => setPaymentSuccess(false)} className="w-full mt-4">
                {t.close}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
