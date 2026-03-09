'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export type Locale = 'fr' | 'en'

const translations = {
  // ── Navigation ────────────────────────────────────────
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.services': { fr: 'Services', en: 'Services' },
  'nav.pricing': { fr: 'Tarifs', en: 'Pricing' },
  'nav.becomeProvider': { fr: 'Devenir Prestataire', en: 'Become Provider' },
  'nav.signIn': { fr: 'Connexion', en: 'Sign In' },
  'nav.getStarted': { fr: 'Commencer', en: 'Get Started' },
  'nav.signOut': { fr: 'Deconnexion', en: 'Sign Out' },
  'nav.settings': { fr: 'Parametres', en: 'Settings' },
  'nav.dashboard': { fr: 'Tableau de bord', en: 'Dashboard' },
  'nav.myServices': { fr: 'Mes Services', en: 'My Services' },
  'nav.browseServices': { fr: 'Parcourir les Services', en: 'Browse Services' },
  'nav.providerRequests': { fr: 'Demandes Prestataires', en: 'Provider Requests' },
  'nav.customer': { fr: 'CLIENT', en: 'CUSTOMER' },
  'nav.provider': { fr: 'PRESTATAIRE', en: 'PROVIDER' },
  'nav.admin': { fr: 'ADMIN', en: 'ADMIN' },
  'nav.realisations': { fr: 'Réalisations', en: 'Portfolio' },

  // ── Hero Section ──────────────────────────────────────
  'hero.badge': { fr: "Bienvenue sur la Plateforme Evenementielle d'Afrique", en: "Welcome to Africa's Event Platform" },
  'hero.titleStart': { fr: 'Votre Evenement Parfait,', en: 'Your Perfect Event,' },
  'hero.titleHighlight': { fr: ' En Un Clic', en: ' One Click Away' },
  'hero.subtitle': { fr: "Connectez-vous avec les meilleurs prestataires evenementiels d'Afrique. DJs, decorateurs, traiteurs, salles de reception - trouvez tout pour votre celebration parfaite.", en: "Connect with Africa's top event providers. From DJs to decorators, caterers to venues - find everything you need for your perfect celebration." },
  'hero.cta': { fr: 'Planifier votre Evenement', en: 'Plan Your Event' },
  'hero.ctaSecondary': { fr: 'Devenir Prestataire', en: 'Become a Provider' },
  'hero.stat.providers': { fr: 'Prestataires', en: 'Event Providers' },
  'hero.stat.events': { fr: 'Evenements Organises', en: 'Events Planned' },
  'hero.stat.users': { fr: 'Utilisateurs Satisfaits', en: 'Happy Users' },

  // ── Features Section ──────────────────────────────────
  'features.title': { fr: 'Pourquoi Choisir EvenIA ?', en: 'Why Choose EvenIA?' },
  'features.subtitle': { fr: "Tout ce dont vous avez besoin pour planifier, gerer et realiser l'evenement parfait", en: 'Everything you need to plan, manage, and execute the perfect event' },
  'features.smartMatching.title': { fr: 'Matching Intelligent', en: 'Smart Provider Matching' },
  'features.smartMatching.desc': { fr: "Notre IA vous connecte avec les prestataires parfaits pour votre evenement, budget et style", en: 'Our AI matches you with providers perfect for your event, budget, and style' },
  'features.verified.title': { fr: 'Prestataires Verifies', en: 'Verified Providers' },
  'features.verified.desc': { fr: 'Tous les prestataires sont verifies avec des avis et evaluations de vrais clients', en: 'All providers are verified with reviews and ratings from real customers' },
  'features.budget.title': { fr: 'Planification Budget', en: 'Budget Planning' },
  'features.budget.desc': { fr: "Obtenez des recommandations budgetaires alimentees par l'IA selon vos besoins", en: 'Get AI-powered budget recommendations based on your event requirements' },
  'features.payments.title': { fr: 'Paiements Securises', en: 'Secure Payments' },
  'features.payments.desc': { fr: 'Plusieurs methodes de paiement : Mobile Money, cartes et especes', en: 'Multiple payment methods including Mobile Money, cards and cash options' },
  'features.contracts.title': { fr: 'Contrats Numeriques', en: 'Digital Contracts' },
  'features.contracts.desc': { fr: 'Signez electroniquement et gerez vos contrats directement sur la plateforme', en: 'E-sign contracts and manage agreements directly in the platform' },
  'features.ar.title': { fr: 'Visualisation RA', en: 'AR Visualization' },
  'features.ar.desc': { fr: "Previsualisation des amenagements et decorations en realite augmentee avant de s'engager", en: 'Preview venue setups and decorations in AR before committing' },

  // ── Service Portfolio (Home) ──────────────────────────
  'portfolio.featured': { fr: 'Services en Vedette', en: 'Featured Services' },
  'portfolio.featuredSubtitle': { fr: "Explorez notre collection de services evenementiels premium. Chaque portfolio presente le travail reel de prestataires de premier ordre a travers l'Afrique.", en: 'Explore our curated collection of premium event services. Each portfolio showcases real work from top-rated providers across Africa.' },
  'portfolio.moreServices': { fr: 'Plus de Services', en: 'More Services' },
  'portfolio.viewDetails': { fr: 'Voir les Details', en: 'View Details' },
  'portfolio.reviews': { fr: 'avis', en: 'reviews' },
  'portfolio.previous': { fr: 'Precedent', en: 'Previous' },
  'portfolio.next': { fr: 'Suivant', en: 'Next' },
  'portfolio.browseAll': { fr: 'Parcourir Tous les Services', en: 'Browse All Services' },
  'portfolio.browseAllSubtitle': { fr: 'Decouvrez des milliers de portfolios de prestataires verifies', en: 'Discover thousands of service portfolios from verified providers' },
  'portfolio.exploreMarketplace': { fr: 'Explorer le Marketplace', en: 'Explore Marketplace' },

  // ── Auth Modal ────────────────────────────────────────
  'auth.createAccount': { fr: 'Creer un Compte', en: 'Create Account' },
  'auth.signIn': { fr: 'Connexion', en: 'Sign In' },
  'auth.fullName': { fr: 'Nom Complet', en: 'Full Name' },
  'auth.email': { fr: 'Email', en: 'Email' },
  'auth.password': { fr: 'Mot de passe', en: 'Password' },
  'auth.loading': { fr: 'Chargement...', en: 'Loading...' },
  'auth.alreadyHaveAccount': { fr: 'Vous avez deja un compte ?', en: 'Already have an account?' },
  'auth.noAccount': { fr: "Vous n'avez pas de compte ?", en: "Don't have an account?" },
  'auth.switchSignIn': { fr: 'Se connecter', en: 'Sign in' },
  'auth.switchSignUp': { fr: "S'inscrire", en: 'Sign up' },

  // ── Marketplace ───────────────────────────────────────
  'marketplace.title': { fr: 'Marketplace', en: 'Marketplace' },
  'marketplace.backHome': { fr: 'Accueil', en: 'Home' },
  'marketplace.search': { fr: 'Rechercher un prestataire, service, ville...', en: 'Search for a provider, service, city...' },
  'marketplace.sort': { fr: 'Trier', en: 'Sort' },
  'marketplace.sortRating': { fr: 'Meilleure note', en: 'Highest rated' },
  'marketplace.sortPopular': { fr: 'Plus populaire', en: 'Most popular' },
  'marketplace.sortName': { fr: 'Nom A-Z', en: 'Name A-Z' },
  'marketplace.providersAvailable': { fr: 'prestataire(s) disponible(s)', en: 'provider(s) available' },
  'marketplace.viewDetails': { fr: 'Voir details', en: 'View details' },
  'marketplace.reviews': { fr: 'avis', en: 'reviews' },
  'marketplace.noResults': { fr: 'Aucun prestataire trouve', en: 'No providers found' },
  'marketplace.noResultsHint': { fr: 'Essayez de modifier vos criteres de recherche ou de changer de categorie.', en: 'Try adjusting your search criteria or changing category.' },
  'marketplace.resetFilters': { fr: 'Reinitialiser les filtres', en: 'Reset filters' },
  'marketplace.showing': { fr: 'Affichage de', en: 'Showing' },
  'marketplace.to': { fr: 'a', en: 'to' },
  'marketplace.of': { fr: 'sur', en: 'of' },
  'marketplace.results': { fr: 'resultats', en: 'results' },

  // ── Categories ────────────────────────────────────────
  'cat.all': { fr: 'Tout', en: 'All' },
  'cat.venue': { fr: 'Salles', en: 'Venues' },
  'cat.dj': { fr: 'DJ & Musique', en: 'DJ & Music' },
  'cat.catering': { fr: 'Traiteur', en: 'Catering' },
  'cat.decoration': { fr: 'Decoration', en: 'Decoration' },
  'cat.photography': { fr: 'Photographie', en: 'Photography' },
  'cat.planning': { fr: 'Organisation', en: 'Planning' },

  // ── Provider Detail ───────────────────────────────────
  'provider.backToMarketplace': { fr: 'Retour au Marketplace', en: 'Back to Marketplace' },
  'provider.details': { fr: 'Details', en: 'Details' },
  'provider.book': { fr: 'Reserver', en: 'Book' },

  // ── Footer ────────────────────────────────────────────
  'footer.tagline': { fr: "La plateforme evenementielle leader en Afrique", en: "Africa's leading event provider marketplace" },
  'footer.platform': { fr: 'Plateforme', en: 'Platform' },
  'footer.browseEvents': { fr: 'Parcourir les Evenements', en: 'Browse Events' },
  'footer.pricing': { fr: 'Tarifs', en: 'Pricing' },
  'footer.blog': { fr: 'Blog', en: 'Blog' },
  'footer.providers': { fr: 'Prestataires', en: 'Providers' },
  'footer.becomeProvider': { fr: 'Devenir Prestataire', en: 'Become a Provider' },
  'footer.resources': { fr: 'Ressources', en: 'Resources' },
  'footer.support': { fr: 'Support', en: 'Support' },
  'footer.helpCenter': { fr: "Centre d'aide", en: 'Help Center' },
  'footer.contact': { fr: 'Contact', en: 'Contact' },
  'footer.rights': { fr: 'Tous droits reserves.', en: 'All rights reserved.' },
  'footer.privacy': { fr: 'Confidentialite', en: 'Privacy' },
  'footer.terms': { fr: 'Conditions', en: 'Terms' },

  // ── Pagination (shared) ───────────────────────────────
  'pagination.first': { fr: 'Premiere page', en: 'First page' },
  'pagination.previous': { fr: 'Page precedente', en: 'Previous page' },
  'pagination.next': { fr: 'Page suivante', en: 'Next page' },
  'pagination.last': { fr: 'Derniere page', en: 'Last page' },

  // ── Provider Dashboard ────────────────────────────────
  'dash.title': { fr: 'Tableau de Bord Prestataire', en: 'Provider Dashboard' },
  'dash.subtitle': { fr: 'Gerez vos services, reservations et revenus', en: 'Manage your listings, bookings, and earnings' },
  'dash.overview': { fr: 'Apercu', en: 'Overview' },
  'dash.bookings': { fr: 'Reservations', en: 'Bookings' },
  'dash.services': { fr: 'Services', en: 'Services' },
  'dash.payments': { fr: 'Paiements', en: 'Payments' },
  'dash.reviews': { fr: 'Avis', en: 'Reviews' },
  'dash.settings': { fr: 'Parametres', en: 'Settings' },

  // ── Create Service Modal ──────────────────────────────
  'create.title': { fr: 'Creer un Nouveau Service', en: 'Create New Service' },
  'create.step': { fr: 'Etape', en: 'Step' },
  'create.of': { fr: 'sur', en: 'of' },
  'create.stepBasic': { fr: 'Informations de Base', en: 'Basic Information' },
  'create.stepCategory': { fr: 'Details par Categorie', en: 'Category Details' },
  'create.stepPricing': { fr: 'Tarification', en: 'Pricing' },
  'create.stepPhotos': { fr: 'Portfolio & Photos', en: 'Portfolio & Photos' },
  'create.serviceTitle': { fr: 'Titre du Service', en: 'Service Title' },
  'create.serviceTitlePlaceholder': { fr: 'ex: Decoration Mariage Elegant Or', en: 'e.g., Elegant Golden Wedding Decoration' },
  'create.category': { fr: 'Categorie', en: 'Category' },
  'create.selectCategory': { fr: 'Choisir une categorie', en: 'Select a category' },
  'create.location': { fr: 'Localisation', en: 'Location' },
  'create.locationPlaceholder': { fr: 'ex: Lagos, Nigeria', en: 'e.g., Lagos, Nigeria' },
  'create.description': { fr: 'Description', en: 'Description' },
  'create.descriptionPlaceholder': { fr: 'Decrivez votre service en detail...', en: 'Describe your service in detail...' },
  'create.phone': { fr: 'Telephone', en: 'Phone Number' },
  'create.travelAvailable': { fr: 'Deplacement disponible', en: 'Travel availability' },
  'create.travelYes': { fr: 'Oui, je me deplace', en: 'Yes, I travel' },
  'create.travelNo': { fr: 'Non, sur place uniquement', en: 'No, on-site only' },
  'create.travelRadius': { fr: 'Rayon de deplacement (km)', en: 'Travel radius (km)' },
  'create.tags': { fr: 'Mots-cles / Tags', en: 'Keywords / Tags' },
  'create.tagsPlaceholder': { fr: 'ex: mariage, luxe, africain', en: 'e.g., wedding, luxury, african' },
  'create.maxCapacity': { fr: 'Capacite maximale', en: 'Maximum capacity' },
  'create.yearsExperience': { fr: "Annees d'experience", en: 'Years of experience' },
  'create.eventTypes': { fr: "Types d'evenements couverts", en: 'Event types covered' },

  // ── Create Service: Pricing Step ──────────────────────
  'create.basePrice': { fr: 'Prix de Base', en: 'Base Price' },
  'create.pricingModel': { fr: 'Modele tarifaire', en: 'Pricing model' },
  'create.pricingFixed': { fr: 'Forfait fixe', en: 'Fixed rate' },
  'create.pricingHourly': { fr: 'Tarif horaire', en: 'Hourly rate' },
  'create.pricingPerGuest': { fr: 'Par invite', en: 'Per guest' },
  'create.pricingPackage': { fr: 'Packages', en: 'Package-based' },

  // ── Create Service: DJ Fields ─────────────────────────
  'create.dj.genres': { fr: 'Genres musicaux proposes', en: 'Music genres offered' },
  'create.dj.equipment': { fr: 'Equipement inclus', en: 'Equipment included' },
  'create.dj.mc': { fr: 'Services MC disponibles ?', en: 'MC services available?' },
  'create.dj.duration': { fr: 'Options de duree de prestation', en: 'Performance duration options' },
  'create.dj.setupTime': { fr: "Temps d'installation requis", en: 'Setup time required' },
  'create.dj.techRequirements': { fr: 'Exigences techniques (espace, alimentation)', en: 'Technical requirements (space, power supply)' },
  'create.dj.sampleMixes': { fr: 'Liens vers mix demos', en: 'Sample mix links' },
  'create.dj.customPlaylist': { fr: 'Playlist personnalisee possible ?', en: 'Custom playlist support?' },

  // ── Create Service: Catering Fields ───────────────────
  'create.catering.cuisineTypes': { fr: 'Types de cuisine', en: 'Cuisine types' },
  'create.catering.menuPackages': { fr: 'Packages menu (detail)', en: 'Menu packages (breakdown)' },
  'create.catering.pricePerGuest': { fr: 'Prix par invite', en: 'Price per guest' },
  'create.catering.minGuests': { fr: "Nombre minimum d'invites", en: 'Minimum guest requirement' },
  'create.catering.dietary': { fr: 'Options alimentaires', en: 'Dietary options' },
  'create.catering.staffIncluded': { fr: 'Personnel inclus ?', en: 'Staff included?' },
  'create.catering.equipmentProvided': { fr: 'Equipement fourni ?', en: 'Equipment provided?' },
  'create.catering.onSite': { fr: 'Preparation sur place ou a emporter ?', en: 'On-site or off-site preparation?' },
  'create.catering.tasting': { fr: 'Degustation disponible ?', en: 'Tasting session available?' },
  'create.catering.certifications': { fr: "Certifications d'hygiene", en: 'Hygiene certifications' },

  // ── Create Service: Venue Fields ──────────────────────
  'create.venue.totalCapacity': { fr: 'Capacite totale', en: 'Total capacity' },
  'create.venue.type': { fr: 'Type de lieu', en: 'Venue type' },
  'create.venue.indoor': { fr: 'Interieur', en: 'Indoor' },
  'create.venue.outdoor': { fr: 'Exterieur', en: 'Outdoor' },
  'create.venue.both': { fr: 'Les deux', en: 'Both' },
  'create.venue.seating': { fr: 'Dispositions de places', en: 'Seating arrangements' },
  'create.venue.parking': { fr: 'Capacite de parking', en: 'Parking capacity' },
  'create.venue.amenities': { fr: 'Equipements inclus', en: 'Included amenities' },
  'create.venue.decorFlexibility': { fr: 'Flexibilite decoration', en: 'Decoration flexibility' },
  'create.venue.rentalDuration': { fr: 'Options de duree de location', en: 'Rental duration options' },
  'create.venue.security': { fr: 'Securite incluse ?', en: 'Security included?' },
  'create.venue.insurance': { fr: 'Assurance', en: 'Insurance information' },
  'create.venue.virtualTour': { fr: 'Lien visite virtuelle', en: 'Virtual tour link' },

  // ── Create Service: Photography Fields ────────────────
  'create.photo.styles': { fr: 'Styles de photographie', en: 'Photography styles' },
  'create.photo.video': { fr: 'Services video proposes ?', en: 'Video services offered?' },
  'create.photo.packages': { fr: 'Niveaux de packages', en: 'Package tiers' },
  'create.photo.editing': { fr: 'Retouche incluse ?', en: 'Editing included?' },
  'create.photo.deliveryTime': { fr: 'Delai de livraison', en: 'Delivery time' },
  'create.photo.drone': { fr: 'Drone disponible ?', en: 'Drone available?' },
  'create.photo.equipmentList': { fr: 'Liste equipement', en: 'Equipment list' },
  'create.photo.travelFees': { fr: 'Frais de deplacement', en: 'Travel fees' },

  // ── Create Service: Event Planner Fields ──────────────
  'create.planner.level': { fr: 'Niveau de planification', en: 'Planning level' },
  'create.planner.full': { fr: 'Planification complete', en: 'Full planning' },
  'create.planner.partial': { fr: 'Planification partielle', en: 'Partial planning' },
  'create.planner.dayOf': { fr: 'Coordination jour J', en: 'Day-of coordination' },
  'create.planner.specialtyEvents': { fr: 'Specialite evenements', en: 'Specialty event types' },
  'create.planner.vendorNetwork': { fr: 'Partenariats prestataires', en: 'Vendor network partnerships' },
  'create.planner.budgetManagement': { fr: 'Experience gestion budget', en: 'Budget management experience' },
  'create.planner.teamSize': { fr: "Taille de l'equipe de coordination", en: 'Coordination team size' },
  'create.planner.caseStudies': { fr: "Etudes de cas d'evenements precedents", en: 'Previous event case studies' },

  // ── Create Service: Common Actions ────────────────────
  'create.cancel': { fr: 'Annuler', en: 'Cancel' },
  'create.back': { fr: 'Retour', en: 'Back' },
  'create.next': { fr: 'Suivant', en: 'Next' },
  'create.publish': { fr: 'Publier le Service', en: 'Publish Service' },
  'create.saveDraft': { fr: 'Sauvegarder brouillon', en: 'Save Draft' },
  'create.preview': { fr: 'Apercu', en: 'Preview' },
  'create.profileCompletion': { fr: 'Profil service', en: 'Service profile' },
  'create.uploadPhotos': { fr: 'Telecharger des photos', en: 'Upload photos' },
  'create.uploadHint': { fr: 'PNG, JPG jusqu\'a 10MB', en: 'PNG, JPG up to 10MB' },
  'create.photoTips': { fr: 'Conseils pour de superbes photos :', en: 'Tips for great photos:' },
  'create.tip1': { fr: 'Utilisez des photos bien eclairees et de haute qualite', en: 'Use well-lit, high-quality photos' },
  'create.tip2': { fr: 'Montrez plusieurs angles et details', en: 'Show multiple angles and details' },
  'create.tip3': { fr: 'Incluez des avant/apres pour les decorations', en: 'Include before/after for decorations' },
  'create.tip4': { fr: 'Telechargez au moins 5 photos pour plus de visibilite', en: 'Upload at least 5 photos for best visibility' },
  'create.yes': { fr: 'Oui', en: 'Yes' },
  'create.no': { fr: 'Non', en: 'No' },
  'create.add': { fr: 'Ajouter', en: 'Add' },
  'create.autoSaved': { fr: 'Brouillon sauvegarde automatiquement', en: 'Draft auto-saved' },

  // ── Booking Form ──────────────────────────────────────
  'booking.title': { fr: 'Reserver un Service', en: 'Book a Service' },
  'booking.subtitle': { fr: 'Fournissez les details pour recevoir les meilleures offres', en: 'Provide details to receive the best offers' },
  'booking.stepGeneral': { fr: 'Informations Generales', en: 'General Information' },
  'booking.stepSpecific': { fr: 'Details Specifiques', en: 'Specific Details' },
  'booking.stepReview': { fr: 'Resume et Envoi', en: 'Review & Submit' },
  'booking.eventType': { fr: "Type d'evenement", en: 'Event type' },
  'booking.wedding': { fr: 'Mariage', en: 'Wedding' },
  'booking.birthday': { fr: 'Anniversaire', en: 'Birthday' },
  'booking.conference': { fr: 'Conference', en: 'Conference' },
  'booking.corporate': { fr: 'Evenement Corporate', en: 'Corporate Event' },
  'booking.privateParty': { fr: 'Fete Privee', en: 'Private Party' },
  'booking.other': { fr: 'Autre', en: 'Other' },
  'booking.eventDate': { fr: "Date de l'evenement", en: 'Event date' },
  'booking.startTime': { fr: 'Heure de debut', en: 'Start time' },
  'booking.endTime': { fr: 'Heure de fin', en: 'End time' },
  'booking.guests': { fr: "Nombre d'invites", en: 'Number of guests' },
  'booking.location': { fr: 'Lieu (Ville + Adresse)', en: 'Location (City + Address)' },
  'booking.budget': { fr: 'Budget estime', en: 'Estimated budget' },
  'booking.eventDescription': { fr: "Description de l'evenement", en: 'Event description' },
  'booking.eventDescriptionPlaceholder': { fr: 'Parlez-nous de votre vision pour cet evenement...', en: 'Tell us about your vision for this event...' },

  // ── Booking: DJ Fields ────────────────────────────────
  'booking.dj.genres': { fr: 'Genres musicaux preferes', en: 'Preferred music genres' },
  'booking.dj.mc': { fr: 'MC requis ?', en: 'MC required?' },
  'booking.dj.equipment': { fr: 'Equipement son requis ?', en: 'Sound equipment needed?' },
  'booking.dj.entertainment': { fr: 'Animation speciale', en: 'Special entertainment' },
  'booking.dj.customPlaylist': { fr: 'Playlist personnalisee ?', en: 'Custom playlist?' },
  'booking.dj.atmosphere': { fr: 'Ambiance souhaitee', en: 'Desired atmosphere' },
  'booking.dj.chill': { fr: 'Chill', en: 'Chill' },
  'booking.dj.energetic': { fr: 'Energique', en: 'Energetic' },
  'booking.dj.premium': { fr: 'Premium', en: 'Premium' },
  'booking.dj.mixed': { fr: 'Mixte', en: 'Mixed' },

  // ── Booking: Catering Fields ──────────────────────────
  'booking.catering.cuisineType': { fr: 'Type de cuisine', en: 'Cuisine type' },
  'booking.catering.serviceType': { fr: 'Type de service', en: 'Service type' },
  'booking.catering.buffet': { fr: 'Buffet', en: 'Buffet' },
  'booking.catering.plated': { fr: 'Service a table', en: 'Plated service' },
  'booking.catering.courses': { fr: 'Nombre de plats', en: 'Number of courses' },
  'booking.catering.allergies': { fr: 'Allergies / Restrictions', en: 'Allergies / Restrictions' },
  'booking.catering.drinks': { fr: 'Boissons incluses ?', en: 'Drinks included?' },
  'booking.catering.staff': { fr: 'Personnel de service necessaire ?', en: 'Service staff needed?' },
  'booking.catering.tableware': { fr: 'Vaisselle incluse ?', en: 'Tableware included?' },

  // ── Booking: Venue Fields ─────────────────────────────
  'booking.venue.minCapacity': { fr: 'Capacite minimum requise', en: 'Minimum capacity required' },
  'booking.venue.indoorOutdoor': { fr: 'Interieur ou exterieur ?', en: 'Indoor or outdoor?' },
  'booking.venue.parking': { fr: 'Parking necessaire ?', en: 'Parking needed?' },
  'booking.venue.ac': { fr: 'Climatisation ?', en: 'Air conditioning?' },
  'booking.venue.soundSystem': { fr: 'Systeme son inclus ?', en: 'Sound system included?' },
  'booking.venue.decoration': { fr: 'Decoration incluse ?', en: 'Decoration included?' },
  'booking.venue.accessibility': { fr: 'Accessibilite requise ?', en: 'Accessibility required?' },

  // ── Booking: Photography Fields ───────────────────────
  'booking.photo.duration': { fr: 'Duree de couverture', en: 'Coverage duration' },
  'booking.photo.type': { fr: 'Photo uniquement ou Photo + Video ?', en: 'Photo only or Photo + Video?' },
  'booking.photo.photoOnly': { fr: 'Photo uniquement', en: 'Photo only' },
  'booking.photo.photoVideo': { fr: 'Photo + Video', en: 'Photo + Video' },
  'booking.photo.album': { fr: 'Album imprime inclus ?', en: 'Printed album included?' },
  'booking.photo.drone': { fr: 'Couverture drone ?', en: 'Drone coverage?' },
  'booking.photo.style': { fr: 'Style souhaite', en: 'Desired style' },
  'booking.photo.artistic': { fr: 'Artistique', en: 'Artistic' },
  'booking.photo.documentary': { fr: 'Documentaire', en: 'Documentary' },
  'booking.photo.classic': { fr: 'Classique', en: 'Classic' },

  // ── Booking: Event Planner Fields ─────────────────────
  'booking.planner.level': { fr: 'Niveau de support', en: 'Level of support' },
  'booking.planner.full': { fr: 'Planification complete', en: 'Full planning' },
  'booking.planner.partial': { fr: 'Planification partielle', en: 'Partial planning' },
  'booking.planner.dayOf': { fr: 'Coordination jour J', en: 'Day-of coordination' },
  'booking.planner.theme': { fr: "Theme de l'evenement", en: 'Event theme' },
  'booking.planner.totalBudget': { fr: 'Budget total estime', en: 'Total estimated budget' },
  'booking.planner.needVendors': { fr: 'Besoin de trouver tous les prestataires ?', en: 'Need help finding all vendors?' },
  'booking.planner.inspiration': { fr: 'Image(s) d\'inspiration', en: 'Inspiration image(s)' },

  // ── Booking: Smart Suggestions ────────────────────────
  'booking.suggest': { fr: 'Services complementaires suggeres', en: 'Suggested complementary services' },
  'booking.addService': { fr: 'Ajouter', en: 'Add' },
  'booking.reviewTitle': { fr: 'Resume de votre demande', en: 'Request Summary' },
  'booking.submit': { fr: 'Envoyer la Demande', en: 'Submit Request' },
  'booking.sent': { fr: 'Demande envoyee ! Le prestataire vous contactera bientot.', en: 'Request sent! The provider will contact you soon.' },
  'booking.estimatedCost': { fr: 'Cout estime', en: 'Estimated Cost' },
  'booking.termsNotice': { fr: "En soumettant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialite", en: 'By submitting, you agree to our Terms of Service and Privacy Policy' },

  // ── Listings Tab ──────────────────────────────────────
  'listings.createNew': { fr: 'Creer un Nouveau Service', en: 'Create New Service' },
  'listings.noServices': { fr: 'Aucun service cree pour le moment', en: 'No services created yet' },
  'listings.createFirst': { fr: 'Creez votre premier service', en: 'Create Your First Service' },
  'listings.view': { fr: 'Voir', en: 'View' },
  'listings.startingAt': { fr: 'A partir de', en: 'Starting at' },
  'listings.rating': { fr: 'Note', en: 'Rating' },
} as const

export type TranslationKey = keyof typeof translations

// ── Context ─────────────────────────────────────────────
interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr')

  const t = useCallback(
    (key: TranslationKey): string => {
      const entry = translations[key]
      if (!entry) return key
      return entry[locale] ?? key
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>')
  return ctx
}

// ── Language Switcher Component ─────────────────────────
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useI18n()

  return (
    <button
      onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors ${className}`}
      aria-label={locale === 'fr' ? 'Switch to English' : 'Passer en Francais'}
    >
      <span className="text-base leading-none">{locale === 'fr' ? 'FR' : 'EN'}</span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-muted-foreground">
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
