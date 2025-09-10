"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Plane,
  Search,
  Globe,
  Clock,
  TrendingDown,
  Star,
  CreditCard,
  LucideUser,
  Settings,
  History,
  ChevronDown,
  X,
  Wallet,
  LogIn,
  UserPlus,
  BarChart3,
  Plus,
  MapPin,
  ExternalLink,
  ChevronUp,
} from "lucide-react"
import { useUser, useClerk } from "@clerk/nextjs"

interface PriceComparison {
  country: string
  flag: string
  price: number
  currency: string
  savings?: number
  bookingUrl?: string
  airline?: string
  duration?: string
  isOfficial?: boolean
}

const translations = {
  ro: {
    title: "Guard4Flight",
    subtitle: "Găsește cel mai mic preț pentru biletele de avion din",
    countries: "țări",
    searchTitle: "Caută după numărul zborului",
    searchDescription: "Introdu numărul zborului pentru a compara prețurile din",
    countriesGlobal: "țări de pe tot globul",
    flightNumber: "Numărul zborului",
    searchInProgress: "Căutare în progres...",
    searchPrices: "Caută prețuri în",
    countriesVerified: "țări verificate",
    lowestPrice: "Cel mai mic preț",
    highestPrice: "Cel mai scump preț",
    potentialSavings: "Economie potențială",
    countriesChecked: "Țări verificate",
    globalComparison: "Comparație globală",
    bestDeal: "Cel mai bun",
    maxDifference: "Diferența maximă",
    vsHighest: "Față de cel mai scump",
    importantNote: "Notă importantă",
    priceDisclaimer:
      "Prețurile afișate sunt orientative și pot suferi modificări de la ultima verificare a datelor. Vă recomandăm să verificați prețurile finale pe site-urile oficiale ale companiilor aeriene.",
    priceComparison: "Comparație prețuri pentru zborul",
    priceDescription: "Prețurile sunt afișate în ordine crescătoare din",
    clickReserve: 'țări verificate. Click pe "Rezervă acum" pentru a accesa site-ul oficial.',
    cheapest: "Cel mai ieftin",
    reserveNow: "Rezervă acum",
    unofficialSite: "Site neoficial",
    showLess: "Arată mai puține țări",
    showAll: "Vezi toate cele",
    andMore: "Și încă",
    moreCountries: "țări verificate...",
    tipsTitle: "Sfaturi pentru economii maxime",
    tip1: "Folosește un VPN pentru a accesa site-urile din țara cu cel mai mic preț",
    tip2: "Verifică dacă există taxe suplimentare pentru plăți din alte țări",
    tip3: "Compară prețurile pe mai multe site-uri de booking din țara selectată",
    tip4: "Ia în considerare costurile suplimentare (bagaje, locuri, etc.)",
    searchToStart: "Caută un zbor pentru a începe",
    searchDescription2: "Introdu numărul zborului pentru a compara prețurile din",
    findBestDeals: "țări de pe tot globul și să găsești cele mai bune oferte disponibile.",
    vsLowest: "față de cel mai ieftin",
    loginRequired: "Trebuie să te autentifici pentru a căuta zboruri",
  },
  en: {
    title: "Guard4Flight",
    subtitle: "Find the lowest price for flight tickets from",
    countries: "countries",
    searchTitle: "Search by flight number",
    searchDescription: "Enter the flight number to compare prices from",
    countriesGlobal: "countries worldwide",
    flightNumber: "Flight number",
    searchInProgress: "Search in progress...",
    searchPrices: "Search prices in",
    countriesVerified: "countries verified",
    lowestPrice: "Lowest price",
    highestPrice: "Highest price",
    potentialSavings: "Potential savings",
    countriesChecked: "Countries checked",
    globalComparison: "Global comparison",
    bestDeal: "Best deal",
    maxDifference: "Maximum difference",
    vsHighest: "Compared to highest",
    importantNote: "Important note",
    priceDisclaimer:
      "Displayed prices are indicative and may change since the last data verification. We recommend checking final prices on official airline websites.",
    priceComparison: "Price comparison for flight",
    priceDescription: "Prices are displayed in ascending order from",
    clickReserve: 'verified countries. Click "Reserve now" to access the official website.',
    cheapest: "Cheapest",
    reserveNow: "Reserve now",
    unofficialSite: "Unofficial site",
    showLess: "Show fewer countries",
    showAll: "See all",
    andMore: "And",
    moreCountries: "more verified countries...",
    tipsTitle: "Tips for maximum savings",
    tip1: "Use a VPN to access websites from the country with the lowest price",
    tip2: "Check if there are additional fees for payments from other countries",
    tip3: "Compare prices on multiple booking sites from the selected country",
    tip4: "Consider additional costs (baggage, seats, etc.)",
    searchToStart: "Search for a flight to begin",
    searchDescription2: "Enter the flight number to compare prices from",
    findBestDeals: "countries worldwide and find the best available deals.",
    vsLowest: "compared to cheapest",
    loginRequired: "You must log in to search for flights",
  },
  fr: {
    title: "Guard4Flight",
    subtitle: "Trouvez le prix le plus bas pour les billets d'avion de",
    countries: "pays",
    searchTitle: "Rechercher par numéro de vol",
    searchDescription: "Entrez le numéro de vol pour comparer les prix de",
    countriesGlobal: "pays du monde entier",
    flightNumber: "Numéro de vol",
    searchInProgress: "Recherche en cours...",
    searchPrices: "Rechercher les prix dans",
    countriesVerified: "pays vérifiés",
    lowestPrice: "Prix le plus bas",
    highestPrice: "Prix le plus élevé",
    potentialSavings: "Économies potentielles",
    countriesChecked: "Pays vérifiés",
    globalComparison: "Comparaison mondiale",
    bestDeal: "Meilleure offre",
    maxDifference: "Différence maximale",
    vsHighest: "Par rapport au plus élevé",
    importantNote: "Note importante",
    priceDisclaimer:
      "Les prix affichés sont indicatifs et peuvent changer depuis la dernière vérification des données. Nous recommandons de vérifier les prix finaux sur les sites officiels des compagnies aériennes.",
    priceComparison: "Comparaison des prix pour le vol",
    priceDescription: "Les prix sont affichés par ordre croissant de",
    clickReserve: 'pays vérifiés. Cliquez sur "Réserver maintenant" pour accéder au site officiel.',
    cheapest: "Le moins cher",
    reserveNow: "Réserver maintenant",
    unofficialSite: "Site non officiel",
    showLess: "Afficher moins de pays",
    showAll: "Voir tous les",
    andMore: "Et",
    moreCountries: "pays vérifiés de plus...",
    tipsTitle: "Conseils pour des économies maximales",
    tip1: "Utilisez un VPN pour accéder aux sites du pays avec le prix le plus bas",
    tip2: "Vérifiez s'il y a des frais supplémentaires pour les paiements d'autres pays",
    tip3: "Comparez les prix sur plusieurs sites de réservation du pays sélectionné",
    tip4: "Considérez les coûts supplémentaires (bagages, sièges, etc.)",
    searchToStart: "Recherchez un vol pour commencer",
    searchDescription2: "Entrez le numéro de vol pour comparer les prix de",
    findBestDeals: "pays du monde entier et trouvez les meilleures offres disponibles.",
    vsLowest: "par rapport au moins cher",
    loginRequired: "Vous devez vous connecter pour rechercher des vols",
  },
  es: {
    title: "Guard4Flight",
    subtitle: "Encuentra el precio más bajo para billetes de avión de",
    countries: "países",
    searchTitle: "Buscar por número de vuelo",
    searchDescription: "Ingresa el número de vuelo para comparar precios de",
    countriesGlobal: "países de todo el mundo",
    flightNumber: "Número de vuelo",
    searchInProgress: "Búsqueda en progreso...",
    searchPrices: "Buscar precios en",
    countriesVerified: "países verificados",
    lowestPrice: "Precio más bajo",
    highestPrice: "Precio más alto",
    potentialSavings: "Ahorros potenciales",
    countriesChecked: "Países verificados",
    globalComparison: "Comparación global",
    bestDeal: "Mejor oferta",
    maxDifference: "Diferencia máxima",
    vsHighest: "Comparado con el más alto",
    importantNote: "Nota importante",
    priceDisclaimer:
      "Los precios mostrados son indicativos y pueden cambiar desde la última verificación de datos. Recomendamos verificar los precios finales en los sitios web oficiales de las aerolíneas.",
    priceComparison: "Comparación de precios para el vuelo",
    priceDescription: "Los precios se muestran en orden ascendente de",
    clickReserve: 'países verificados. Haz clic en "Reservar ahora" para acceder al sitio oficial.',
    cheapest: "Más barato",
    reserveNow: "Reservar ahora",
    unofficialSite: "Sitio no oficial",
    showLess: "Mostrar menos países",
    showAll: "Ver todos los",
    andMore: "Y",
    moreCountries: "países verificados más...",
    tipsTitle: "Consejos para ahorros máximos",
    tip1: "Usa una VPN para acceder a sitios web del país con el precio más bajo",
    tip2: "Verifica si hay tarifas adicionales para pagos de otros países",
    tip3: "Compara precios en múltiples sitios de reserva del país seleccionado",
    tip4: "Considera costos adicionales (equipaje, asientos, etc.)",
    searchToStart: "Busca un vuelo para comenzar",
    searchDescription2: "Ingresa el número de vuelo para comparar precios de",
    findBestDeals: "países de todo el mundo y encuentra las mejores ofertas disponibles.",
    vsLowest: "comparado con el más barato",
    loginRequired: "Debes iniciar sesión para buscar vuelos",
  },
}

const languageFlags = {
  ro: "🇷🇴",
  en: "🇬🇧",
  fr: "🇫🇷",
  es: "🇪🇸",
}

const countries = [
  // Europe
  { code: "DK", name: "Danemarca", flag: "🇩🇰" },
  { code: "DE", name: "Germania", flag: "🇩🇪" },
  { code: "FR", name: "Franța", flag: "🇫🇷" },
  { code: "IT", name: "Italia", flag: "🇮🇹" },
  { code: "ES", name: "Spania", flag: "🇪🇸" },
  { code: "NL", name: "Olanda", flag: "🇳🇱" },
  { code: "BE", name: "Belgia", flag: "🇧🇪" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "CH", name: "Elveția", flag: "🇨🇭" },
  { code: "SE", name: "Suedia", flag: "🇸🇪" },
  { code: "NO", name: "Norvegia", flag: "🇳🇴" },
  { code: "FI", name: "Finlanda", flag: "🇫🇮" },
  { code: "PL", name: "Polonia", flag: "🇵🇱" },
  { code: "CZ", name: "Cehia", flag: "🇨🇿" },
  { code: "HU", name: "Ungaria", flag: "🇭🇺" },
  { code: "RO", name: "România", flag: "🇷🇴" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
  { code: "GR", name: "Grecia", flag: "🇬🇷" },
  { code: "PT", name: "Portugalia", flag: "🇵🇹" },
  { code: "IE", name: "Irlanda", flag: "🇮🇪" },
  { code: "SK", name: "Slovacia", flag: "🇸🇰" },
  { code: "SI", name: "Slovenia", flag: "🇸🇮" },
  { code: "HR", name: "Croația", flag: "🇭🇷" },
  { code: "RS", name: "Serbia", flag: "🇷🇸" },
  { code: "BA", name: "Bosnia", flag: "🇧🇦" },
  { code: "MK", name: "Macedonia", flag: "🇲🇰" },
  { code: "AL", name: "Albania", flag: "🇦🇱" },
  { code: "TR", name: "Turcia", flag: "🇹🇷" },
  { code: "EE", name: "Estonia", flag: "🇪🇪" },
  { code: "LV", name: "Letonia", flag: "🇱🇻" },
  { code: "LT", name: "Lituania", flag: "🇱🇹" },
  { code: "MT", name: "Malta", flag: "🇲🇹" },
  { code: "CY", name: "Cipru", flag: "🇨🇾" },
  { code: "IS", name: "Islanda", flag: "🇮🇸" },
  { code: "LU", name: "Luxemburg", flag: "🇱🇺" },
  { code: "MC", name: "Monaco", flag: "🇲🇨" },
  // North America
  { code: "US", name: "SUA", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "MX", name: "Mexic", flag: "🇲🇽" },
  // Asia
  { code: "JP", name: "Japonia", flag: "🇯🇵" },
  { code: "KR", name: "Coreea de Sud", flag: "🇰🇷" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "TH", name: "Thailanda", flag: "🇹🇭" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "MY", name: "Malaezia", flag: "🇲🇾" },
  { code: "ID", name: "Indonezia", flag: "🇮🇩" },
  { code: "PH", name: "Filipine", flag: "🇵🇭" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰" },
  { code: "TW", name: "Taiwan", flag: "🇹🇼" },
  // Middle East & Africa
  { code: "AE", name: "Emiratele Arabe", flag: "🇦🇪" },
  { code: "SA", name: "Arabia Saudită", flag: "🇸🇦" },
  { code: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "ZA", name: "Africa de Sud", flag: "🇿🇦" },
  { code: "EG", name: "Egipt", flag: "🇪🇬" },
  { code: "MA", name: "Maroc", flag: "🇲🇦" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼" },
  // Oceania & South America
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "NZ", name: "Noua Zeelandă", flag: "🇳🇿" },
  { code: "BR", name: "Brazilia", flag: "🇧🇷" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "PE", name: "Peru", flag: "🇵🇪" },
  { code: "CO", name: "Columbia", flag: "🇨🇴" },
]

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

export default function FlightPriceFinder() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const [userCredits, setUserCredits] = useState<UserCredits>({ credits: 0, searchHistory: [], totalSearches: 0 })
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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (user) {
      const credits = (user.publicMetadata.credits as number) || 0
      const searchHistory = (user.publicMetadata.searchHistory as SearchHistoryItem[]) || []
      const totalSearches = (user.publicMetadata.totalSearches as number) || 0
      setUserCredits({ credits, searchHistory, totalSearches })
    }
  }, [user])

  const updateUserCredits = async (newCredits: Partial<UserCredits>) => {
    if (!user) return

    const updatedCredits = { ...userCredits, ...newCredits }
    setUserCredits(updatedCredits)

    await user.update({
      publicMetadata: {
        ...user.publicMetadata,
        ...updatedCredits,
      },
    })
  }

  const t = translations[language]

  const handleLogout = () => {
    signOut()
    setPriceComparisons([])
    setShowDashboard(false)
  }

  const handleBuyCredits = async (credits: number, price: number) => {
    setIsProcessingPayment(true)

    setTimeout(async () => {
      await updateUserCredits({ credits: userCredits.credits + credits })
      setIsProcessingPayment(false)
      setPaymentSuccess(true)

      setTimeout(() => {
        setPaymentSuccess(false)
        setShowCreditsModal(false)
      }, 2000)
    }, 2000)
  }

  const searchPrices = async () => {
    if (!flightNumber.trim()) return

    if (!user) {
      alert(t.loginRequired)
      return
    }

    if (userCredits.credits < 3) {
      setShowCreditsModal(true)
      return
    }

    setIsSearching(true)
    setShowAnimation(true)

    await updateUserCredits({ credits: userCredits.credits - 3 })

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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for authentication logic
    setIsLoggedIn(true)
    setShowAuthModal(false)
  }

  const lowestPrice = priceComparisons.length > 0 ? Math.min(...priceComparisons.map((p) => p.price)) : 0
  const highestPrice = priceComparisons.length > 0 ? Math.max(...priceComparisons.map((p) => p.price)) : 0
  const maxSavings = highestPrice - lowestPrice

  const displayedComparisons = showAllCountries ? priceComparisons : priceComparisons.slice(0, 15)

  return (
    <div className="min-h-screen gradient-bg">
      <header className="glass-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg animate-pulse-glow">
                <Plane className="w-5 h-5 text-primary-foreground animate-float" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {t.subtitle} {countries.length} {t.countries}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <>
                  {/* Credits and user info in compact layout */}
                  <div className="flex items-center gap-3">
                    {/* Make wallet clickable to open credits modal */}
                    <div
                      className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1.5 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors"
                      onClick={() => setShowCreditsModal(true)}
                    >
                      <Wallet className="w-3.5 h-3.5 text-primary" />
                      <span className="text-sm font-medium text-primary">{user.credits}</span>
                    </div>

                    {/* Dropdown menu for user actions */}
                    <div className="relative">
                      <Button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        size="sm"
                        variant="ghost"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 h-auto"
                      >
                        <LucideUser className="w-3.5 h-3.5" />
                        <span className="text-xs max-w-20 truncate">{user.email}</span>
                        <ChevronDown className="w-3 h-3" />
                      </Button>

                      {showUserMenu && (
                        <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-lg shadow-lg py-1 min-w-40 z-50">
                          <button
                            onClick={() => {
                              setShowCreditsModal(true)
                              setShowUserMenu(false)
                            }}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            Cumpără credite
                          </button>
                          <button
                            onClick={() => {
                              setShowDashboard(true)
                              setShowUserMenu(false)
                            }}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                          >
                            <Settings className="w-3.5 h-3.5" />
                            Dashboard
                          </button>
                          <hr className="my-1 border-border" />
                          <button
                            onClick={handleLogout}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-muted text-destructive"
                          >
                            Ieșire
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  size="sm"
                  className="flex items-center gap-1.5 px-3 py-1.5 h-auto"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="text-xs">Conectează-te</span>
                </Button>
              )}

              {/* Language selector with cleaner design */}
              <div className="flex items-center">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as "ro" | "en" | "fr" | "es")}
                  className="bg-transparent border border-border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary/20 cursor-pointer"
                >
                  <option value="ro">🇷🇴</option>
                  <option value="en">🇬🇧</option>
                  <option value="fr">🇫🇷</option>
                  <option value="es">🇪🇸</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {showDashboard && user && (
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
                {/* Make dashboard wallet section clickable to buy credits */}
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
                        <p className="text-2xl font-bold text-primary">{user.credits}</p>
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
                        <p className="text-2xl font-bold text-secondary">{user.totalSearches}</p>
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
                          {user.searchHistory.reduce((total, search) => total + search.savings, 0)} EUR
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LucideUser className="w-5 h-5" />
                    Informații cont
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Email:</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Membru din:</span>
                    <span className="font-medium">{user.createdAt.toLocaleDateString("ro-RO")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">ID utilizator:</span>
                    <span className="font-mono text-sm">{user.id}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Search History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Istoric căutări ({user.searchHistory.length})
                  </CardTitle>
                  <CardDescription>Ultimele 10 căutări efectuate</CardDescription>
                </CardHeader>
                <CardContent>
                  {user.searchHistory.length > 0 ? (
                    <div className="space-y-3">
                      {user.searchHistory.map((search) => (
                        <div
                          key={search.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Plane className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{search.flightNumber}</p>
                              <p className="text-sm text-muted-foreground">
                                {search.searchDate.toLocaleDateString("ro-RO")} la{" "}
                                {search.searchDate.toLocaleTimeString("ro-RO", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">Economii: {search.savings} EUR</p>
                            <p className="text-sm text-muted-foreground">
                              {search.lowestPrice} - {search.highestPrice} EUR
                            </p>
                            <p className="text-xs text-muted-foreground">{search.countriesChecked} țări</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <History className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">Nu ai efectuat încă nicio căutare</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Caută primul tău zbor pentru a vedea istoricul aici
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => {
                    setShowDashboard(false)
                    setShowCreditsModal(true)
                  }}
                  className="flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Cumpără credite
                </Button>
                <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
                  <LogIn className="w-4 h-4" />
                  Deconectează-te
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {authMode === "login" ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                  {authMode === "login" ? "Conectează-te" : "Creează cont"}
                </CardTitle>
                <Button onClick={() => setShowAuthModal(false)} size="sm" variant="ghost">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription className="text-gray-600">
                {isLoggedIn ? "Conectează-te pentru a căuta zboruri" : "Creează un cont nou pentru a începe"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Parolă</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {authMode === "login" ? "Conectează-te" : "Creează cont"}
                </Button>
                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
                  >
                    {authMode === "login" ? "Nu ai cont? Creează unul aici" : "Ai deja cont? Conectează-te"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {showCreditsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Cumpără credite
                </CardTitle>
                <Button
                  onClick={() => setShowCreditsModal(false)}
                  size="sm"
                  variant="ghost"
                  disabled={isProcessingPayment}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>
                {paymentSuccess
                  ? "Plata a fost procesată cu succes!"
                  : "Ai nevoie de 3 credite pentru fiecare căutare de zbor"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-2xl">✅</div>
                  </div>
                  <h3 className="text-lg font-semibold text-green-700 mb-2">Plata reușită!</h3>
                  <p className="text-sm text-muted-foreground">Creditele au fost adăugate în contul tău.</p>
                </div>
              ) : isProcessingPayment ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                    <CreditCard className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Procesăm plata...</h3>
                  <p className="text-sm text-muted-foreground">Vă rugăm să așteptați.</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  <Button
                    onClick={() => handleBuyCredits(3, 4.5)}
                    className="flex items-center justify-between p-4 h-auto hover:bg-primary/5 transition-colors"
                    variant="outline"
                    disabled={isProcessingPayment}
                  >
                    <div className="text-left">
                      <div className="font-medium">3 credite</div>
                      <div className="text-sm text-muted-foreground">1 căutare</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">4.5 EUR</div>
                      <div className="text-sm text-muted-foreground">1.5 EUR/credit</div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => handleBuyCredits(6, 6.5)}
                    className="flex items-center justify-between p-4 h-auto bg-primary/5 border-primary hover:bg-primary/10 transition-colors"
                    variant="outline"
                    disabled={isProcessingPayment}
                  >
                    <div className="text-left">
                      <div className="font-medium">6 credite</div>
                      <div className="text-sm text-muted-foreground">2 căutări</div>
                      <Badge className="mt-1 bg-orange-100 text-orange-700 text-xs">Popular</Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">6.5 EUR</div>
                      <div className="text-sm text-green-600">Economisești 2.5 EUR</div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => handleBuyCredits(9, 8)}
                    className="flex items-center justify-between p-4 h-auto bg-green-50 border-green-200 hover:bg-green-100 transition-colors relative overflow-hidden"
                    variant="outline"
                    disabled={isProcessingPayment}
                  >
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                      BEST VALUE
                    </div>
                    <div className="text-left">
                      <div className="font-medium">9 credite</div>
                      <div className="text-sm text-muted-foreground">3 căutări</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">8.0 EUR</div>
                      <div className="text-sm text-green-600">Economisești 5.5 EUR</div>
                    </div>
                  </Button>

                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <div className="w-4 h-4">🔒</div>
                      <span className="font-medium">Plată securizată</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      Toate tranzacțiile sunt procesate în siguranță prin SSL encryption.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8 glass-card shadow-2xl hover-lift border-2 border-primary/10">
          <CardHeader className="pb-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-primary">{t.searchTitle}</CardTitle>
                <CardDescription className="text-base text-muted-foreground mt-1">
                  {t.searchDescription} {countries.length} {t.countriesGlobal}
                  {user && <div className="mt-2 text-sm text-primary font-medium">💳 Costă 3 credite per căutare</div>}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSearch} className="space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-primary mb-3 block uppercase tracking-wide">
                  {t.flightNumber}
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="ex: LO123, FR456, LH789"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="h-14 text-lg pl-12 pr-4 border-2 border-border focus:border-primary transition-all duration-300 rounded-xl shadow-sm bg-white"
                  />
                  <Plane className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={isSearching || !flightNumber.trim()}
                  className="flex-1 sm:flex-none px-8 h-14 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl hover-lift transition-all duration-300 rounded-xl"
                >
                  {isSearching ? (
                    <>
                      <Search className="w-6 h-6 mr-3 animate-spin" />
                      {t.searchInProgress}
                    </>
                  ) : (
                    <>
                      <Search className="w-6 h-6 mr-3" />
                      {user ? `Caută (3 credite)` : `${t.searchPrices} ${countries.length} ${t.countries}`}
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-xl relative">
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">
                    {countries.length} {t.countriesVerified}
                  </span>
                  {isSearching && (
                    <div className="absolute -right-28 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Plane
                        className={`w-12 h-12 text-primary drop-shadow-lg ${
                          animationPhase === "takeoff"
                            ? "animate-airplane-takeoff"
                            : animationPhase === "landing"
                              ? "animate-airplane-landing"
                              : ""
                        }`}
                      />
                    </div>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {priceComparisons.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="glass-card shadow-lg hover-lift card-hover border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{t.lowestPrice}</p>
                      <p className="text-2xl font-bold text-primary">
                        {Math.min(...priceComparisons.map((p) => p.price))} EUR
                      </p>
                      <Badge variant="default" className="mt-1 bg-primary/10 text-primary border-primary/20">
                        <Star className="w-3 h-3 mr-1" />
                        {t.bestDeal}
                      </Badge>
                    </div>
                    <TrendingDown className="w-8 h-8 text-primary animate-float" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card shadow-lg hover-lift card-hover border-secondary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{t.highestPrice}</p>
                      <p className="text-2xl font-bold text-secondary">
                        {Math.max(...priceComparisons.map((p) => p.price))} EUR
                      </p>
                      <p className="text-xs text-secondary mt-1">{t.maxDifference}</p>
                    </div>
                    <Globe className="w-8 h-8 text-secondary animate-float" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card shadow-lg hover-lift card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{t.potentialSavings}</p>
                      <p className="text-2xl font-bold text-foreground">
                        {Math.max(...priceComparisons.map((p) => p.price)) -
                          Math.min(...priceComparisons.map((p) => p.price))}{" "}
                        EUR
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{t.vsHighest}</p>
                    </div>
                    <MapPin className="w-8 h-8 text-muted-foreground animate-float" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card shadow-lg hover-lift card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{t.countriesChecked}</p>
                      <p className="text-2xl font-bold text-foreground">{priceComparisons.length}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t.globalComparison}</p>
                    </div>
                    <Globe className="w-8 h-8 text-muted-foreground animate-float" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5">⚠️</div>
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">{t.importantNote}</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">{t.priceDisclaimer}</p>
                </div>
              </div>
            </div>

            <Card className="glass-card shadow-xl hover-lift">
              <CardHeader>
                <CardTitle className="text-xl">
                  {t.priceComparison} {flightNumber}
                </CardTitle>
                <CardDescription className="text-base">
                  {t.priceDescription} {countries.length} {t.clickReserve}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {displayedComparisons.map((comparison, index) => (
                    <div
                      key={comparison.country}
                      className={`flex items-center justify-between p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover-lift ${
                        index === 0
                          ? "bg-gradient-to-r from-primary/5 to-primary/10 border-primary shadow-lg animate-pulse-glow"
                          : "bg-card/50 border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <span className="text-3xl block">{comparison.flag}</span>
                          {index === 0 && (
                            <Badge variant="default" className="mt-1 text-xs">
                              TOP
                            </Badge>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-foreground">{comparison.country}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {comparison.duration}
                            </p>
                            <p className="text-sm text-muted-foreground">{comparison.airline}</p>
                          </div>
                          {index === 0 && (
                            <Badge variant="default" className="mt-2 bg-primary/10 text-primary border-primary/20">
                              <Star className="w-3 h-3 mr-1" />
                              {t.cheapest}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="text-right flex items-center gap-4">
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {comparison.price} {comparison.currency}
                          </p>
                          {index > 0 && (
                            <p className="text-sm text-muted-foreground">
                              +{comparison.price - lowestPrice} EUR {t.vsLowest}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          {comparison.isOfficial ? (
                            <Button
                              asChild
                              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover-lift transition-all duration-200"
                            >
                              <a
                                href={comparison.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                {t.reserveNow}
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          ) : (
                            <>
                              <Button disabled className="bg-gray-400 text-gray-600 cursor-not-allowed opacity-50">
                                {t.unofficialSite}
                              </Button>
                              <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="text-xs border-primary/30 hover:border-primary hover:bg-primary/5 bg-transparent"
                              >
                                <a
                                  href={comparison.bookingUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1"
                                >
                                  Skyscanner
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {priceComparisons.length > 15 && (
                    <div className="text-center pt-6">
                      <Button
                        onClick={() => setShowAllCountries(!showAllCountries)}
                        variant="outline"
                        className="flex items-center gap-2 mx-auto"
                      >
                        {showAllCountries ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            {t.showLess}
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            {t.showAll} {priceComparisons.length} {t.countriesVerified}
                          </>
                        )}
                      </Button>
                      {!showAllCountries && (
                        <p className="text-muted-foreground mt-2">
                          {t.andMore} {priceComparisons.length - 15} {t.moreCountries}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8 glass-card shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-lg">💡</span>
                  </div>
                  {t.tipsTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-sm font-bold">1</span>
                      </div>
                      <p className="text-sm text-black dark:text-white group-hover:text-primary transition-colors duration-200">
                        {t.tip1}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-sm font-bold">2</span>
                      </div>
                      <p className="text-sm text-black dark:text-white group-hover:text-primary transition-colors duration-200">
                        {t.tip2}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-sm font-bold">3</span>
                      </div>
                      <p className="text-sm text-black dark:text-white group-hover:text-primary transition-colors duration-200">
                        {t.tip3}
                      </p>
                    </div>
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-sm font-bold">4</span>
                      </div>
                      <p className="text-sm text-black dark:text-white group-hover:text-primary transition-colors duration-200">
                        {t.tip4}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {priceComparisons.length === 0 && !isSearching && (
          <Card className="text-center py-16 glass-card shadow-xl hover-lift">
            <CardContent>
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <Plane className="w-10 h-10 text-primary-foreground animate-float" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{t.searchToStart}</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {t.searchDescription2} {countries.length} {t.findBestDeals}
              </p>
              {!user && (
                <div className="mt-6">
                  <Button onClick={() => setShowAuthModal(true)} className="flex items-center gap-2 mx-auto">
                    <UserPlus className="w-4 h-4" />
                    Creează cont
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
