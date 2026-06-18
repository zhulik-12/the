const image = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=78`;

const supabaseConfig = window.THE_SUPABASE_CONFIG || {};
const supabaseEndpoint = (table, query = "") =>
  `${supabaseConfig.url}/rest/v1/${table}${query ? `?${query}` : ""}`;
const supabaseHeaders = {
  apikey: supabaseConfig.anonKey || "",
  Authorization: `Bearer ${supabaseConfig.anonKey || ""}`,
  "Content-Type": "application/json",
};
const isSupabaseReady = Boolean(supabaseConfig.url && supabaseConfig.anonKey);

const money = (value) =>
  new Intl.NumberFormat("ru-KZ", {
    style: "currency",
    currency: "KZT",
    maximumFractionDigits: 0,
  }).format(value);

const products = [
  {
    id: "wool-coat",
    name: { ru: "Пальто из мягкой шерсти", en: "Soft wool coat", kk: "Жұмсақ жүн пальто" },
    category: "outerwear",
    brand: "THE Studio",
    price: 159000,
    oldPrice: 189000,
    colors: ["black", "beige"],
    sizes: ["XS", "S", "M", "L"],
    stock: 8,
    popularity: 98,
    isNew: true,
    isSale: true,
    image: image("photo-1529139574466-a303027c1d8b"),
    gallery: [
      image("photo-1529139574466-a303027c1d8b", 1200),
      image("photo-1515886657613-9f3515b0c78f", 1200),
      image("photo-1496747611176-843222e1e57c", 1200),
    ],
    desc: {
      ru: "Длинное пальто прямого кроя с мягкой линией плеча, подкладкой и натуральной фактурой шерсти.",
      en: "A long straight-cut coat with a soft shoulder line, full lining and natural wool texture.",
      kk: "Түз пішілген ұзын пальто: жұмсақ иық сызығы, астары және табиғи жүн фактурасы.",
    },
  },
  {
    id: "silk-shirt",
    name: { ru: "Шелковая рубашка ivory", en: "Ivory silk shirt", kk: "Ivory жібек жейде" },
    category: "shirts",
    brand: "THE Atelier",
    price: 64900,
    colors: ["white", "grey"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 12,
    popularity: 91,
    isNew: true,
    image: image("photo-1496747611176-843222e1e57c"),
    gallery: [
      image("photo-1496747611176-843222e1e57c", 1200),
      image("photo-1516762689617-e1cffcef479d", 1200),
      image("photo-1503342217505-b0a15ec3261c", 1200),
    ],
    desc: {
      ru: "Легкая рубашка из шелковистой ткани с удлиненной манжетой и скрытой планкой.",
      en: "A lightweight shirt in a silky fabric with elongated cuffs and a concealed placket.",
      kk: "Жібектей жеңіл матадан тігілген, ұзын манжетті және жасырын түймелі жейде.",
    },
  },
  {
    id: "tailored-trousers",
    name: { ru: "Брюки с высокой посадкой", en: "High-rise tailored trousers", kk: "Жоғары белді шалбар" },
    category: "trousers",
    brand: "THE Studio",
    price: 72900,
    colors: ["beige", "black", "grey"],
    sizes: ["XS", "S", "M", "L"],
    stock: 15,
    popularity: 88,
    isNew: true,
    image: image("photo-1487222477894-8943e31ef7b2"),
    gallery: [
      image("photo-1487222477894-8943e31ef7b2", 1200),
      image("photo-1515886657613-9f3515b0c78f", 1200),
      image("photo-1506629905607-d405d7d3b0d2", 1200),
    ],
    desc: {
      ru: "Структурные брюки с высокой посадкой, мягкими защипами и чистой линией стрелки.",
      en: "Structured high-rise trousers with soft pleats and a crisp pressed line.",
      kk: "Жоғары белді, жұмсақ бүкпелі және анық қыры бар құрылымды шалбар.",
    },
  },
  {
    id: "cashmere-knit",
    name: { ru: "Кашемировый джемпер", en: "Cashmere jumper", kk: "Кашемир джемпер" },
    category: "knitwear",
    brand: "THE Atelier",
    price: 89900,
    oldPrice: 109000,
    colors: ["beige", "white", "grey"],
    sizes: ["S", "M", "L"],
    stock: 6,
    popularity: 96,
    isSale: true,
    image: image("photo-1525507119028-ed4c629a60a3"),
    gallery: [
      image("photo-1525507119028-ed4c629a60a3", 1200),
      image("photo-1551232864-3f0890e580d9", 1200),
      image("photo-1483985988355-763728e1935b", 1200),
    ],
    desc: {
      ru: "Мягкий джемпер из кашемировой смеси с круглым вырезом и плотной резинкой по краям.",
      en: "A soft cashmere-blend jumper with a round neckline and compact ribbed trims.",
      kk: "Дөңгелек мойынды, жиектері тығыз резеңкелі жұмсақ кашемир қоспалы джемпер.",
    },
  },
  {
    id: "linen-blazer",
    name: { ru: "Льняной жакет", en: "Linen blazer", kk: "Зығыр жакет" },
    category: "jackets",
    brand: "THE Line",
    price: 124000,
    colors: ["grey", "beige"],
    sizes: ["XS", "S", "M", "L"],
    stock: 10,
    popularity: 84,
    isNew: true,
    image: image("photo-1552374196-1ab2a1c593e8"),
    gallery: [
      image("photo-1552374196-1ab2a1c593e8", 1200),
      image("photo-1523398002811-999ca8dec234", 1200),
      image("photo-1483985988355-763728e1935b", 1200),
    ],
    desc: {
      ru: "Однобортный жакет из смесового льна с тонкой подкладкой и естественной посадкой.",
      en: "A single-breasted blended-linen blazer with light lining and a natural fit.",
      kk: "Жеңіл астарлы, табиғи қонатын зығыр қоспасынан тігілген бір қаусырмалы жакет.",
    },
  },
  {
    id: "ribbed-dress",
    name: { ru: "Платье из рельефного трикотажа", en: "Ribbed knit dress", kk: "Рельефті трикотаж көйлек" },
    category: "dresses",
    brand: "THE Studio",
    price: 76900,
    colors: ["black", "beige"],
    sizes: ["XS", "S", "M"],
    stock: 5,
    popularity: 89,
    isSale: true,
    image: image("photo-1503342217505-b0a15ec3261c"),
    gallery: [
      image("photo-1503342217505-b0a15ec3261c", 1200),
      image("photo-1529139574466-a303027c1d8b", 1200),
      image("photo-1515886657613-9f3515b0c78f", 1200),
    ],
    desc: {
      ru: "Платье миди из плотного рельефного трикотажа, которое сохраняет форму и мягко повторяет силуэт.",
      en: "A midi dress in dense ribbed knit that holds its shape and softly follows the silhouette.",
      kk: "Пішінін сақтайтын, силуэтті жұмсақ қайталайтын тығыз рельефті миди көйлек.",
    },
  },
  {
    id: "leather-bag",
    name: { ru: "Кожаная сумка tote", en: "Leather tote bag", kk: "Былғары tote сөмке" },
    category: "accessories",
    brand: "THE Objects",
    price: 112000,
    colors: ["black", "beige"],
    sizes: ["OS"],
    stock: 9,
    popularity: 93,
    image: image("photo-1543076447-215ad9ba6923"),
    gallery: [
      image("photo-1543076447-215ad9ba6923", 1200),
      image("photo-1525507119028-ed4c629a60a3", 1200),
      image("photo-1483985988355-763728e1935b", 1200),
    ],
    desc: {
      ru: "Структурная сумка из гладкой кожи с короткими ручками и внутренним отделением.",
      en: "A structured smooth-leather tote with short handles and an inner compartment.",
      kk: "Қысқа тұтқалы және ішкі бөлімі бар тегіс былғарыдан жасалған құрылымды сөмке.",
    },
  },
  {
    id: "chelsea-boots",
    name: { ru: "Кожаные ботинки Chelsea", en: "Leather Chelsea boots", kk: "Былғары Chelsea етік" },
    category: "shoes",
    brand: "THE Objects",
    price: 139000,
    oldPrice: 164000,
    colors: ["black"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    stock: 11,
    popularity: 87,
    isSale: true,
    image: image("photo-1542291026-7eec264c27ff"),
    gallery: [
      image("photo-1542291026-7eec264c27ff", 1200),
      image("photo-1543163521-1bf539c55dd2", 1200),
      image("photo-1496747611176-843222e1e57c", 1200),
    ],
    desc: {
      ru: "Гладкие ботинки Chelsea на устойчивой подошве с эластичными вставками и кожаной стелькой.",
      en: "Smooth Chelsea boots on a stable sole with elastic inserts and a leather insole.",
      kk: "Серпімді қондырмалары мен былғары ұлтарағы бар тұрақты табанды Chelsea етік.",
    },
  },
];

const i18n = {
  ru: {
    navHome: "Главная",
    navCatalog: "Каталог",
    navNew: "Новинки",
    navSale: "Акции",
    navAccount: "Кабинет",
    searchPlaceholder: "Поиск",
    heroEyebrow: "New season edit",
    heroText: "Точная база для выразительного гардероба.",
    heroCta: "Перейти в каталог",
    newEyebrow: "Fresh drop",
    newTitle: "Новые поступления",
    showAll: "Смотреть все",
    promoEyebrow: "Private sale",
    promoTitle: "До -30% на шерсть и трикотаж",
    promoCta: "Выбрать",
    editEyebrow: "Wardrobe note",
    editTitle: "Спокойные силуэты, которые работают каждый день.",
    editText: "Соберите капсулу из пальто, рубашек, трикотажа и точных аксессуаров.",
    popularEyebrow: "Most wanted",
    popularTitle: "Популярные товары",
    shopPopular: "К популярным",
    reviewsEyebrow: "Client notes",
    reviewsTitle: "Отзывы покупателей",
    subscribeEyebrow: "THE letter",
    subscribeTitle: "Ранний доступ к новым коллекциям.",
    emailPlaceholder: "Email",
    subscribeCta: "Подписаться",
    catalogEyebrow: "Collection",
    catalogTitle: "Каталог THE",
    catalogLead: "Премиальные базовые вещи, верхняя одежда и аксессуары в спокойной палитре.",
    filtersTitle: "Фильтры",
    resetFilters: "Сбросить",
    filterCategory: "Категория",
    filterSize: "Размер",
    filterColor: "Цвет",
    filterBrand: "Бренд",
    filterPrice: "Цена до",
    sortBy: "Сортировка",
    sortPopular: "Популярность",
    sortPriceAsc: "Цена: ниже",
    sortPriceDesc: "Цена: выше",
    sortNew: "Новизна",
    addToCart: "В корзину",
    buyNow: "Купить сейчас",
    sizeChart: "Таблица размеров",
    color: "Цвет",
    size: "Размер",
    stock: "В наличии",
    recommended: "Рекомендованные товары",
    cartEyebrow: "Shopping bag",
    cartTitle: "Корзина",
    summaryTitle: "Итого",
    promoPlaceholder: "Промокод",
    applyPromo: "Применить",
    checkoutCta: "Оформить заказ",
    checkoutEyebrow: "Checkout",
    checkoutTitle: "Оформление заказа",
    deliveryTitle: "Доставка",
    nameLabel: "Имя",
    phoneLabel: "Телефон",
    addressLabel: "Адрес",
    cityLabel: "Город",
    paymentTitle: "Оплата",
    confirmOrder: "Подтвердить заказ",
    saveProfile: "Сохранить профиль",
    profileSaved: "Профиль сохранен",
    accountEyebrow: "Private room",
    accountTitle: "Личный кабинет",
    ordersTab: "История заказов",
    favoritesTab: "Избранное",
    profileTab: "Профиль",
    footerText: "Premium everyday wardrobe.",
    footerCatalog: "Каталог",
    footerDelivery: "Доставка",
    chatTitle: "THE support",
    chatGreeting: "Здравствуйте. Подскажем размер, наличие и доставку.",
    chatPlaceholder: "Ваш вопрос",
    emptyCart: "Корзина пока пуста. Добавьте вещи из каталога.",
    emptyFavorites: "В избранном пока пусто.",
    emptyResults: "По этим фильтрам ничего не найдено.",
    subtotal: "Товары",
    discount: "Скидка",
    delivery: "Доставка",
    total: "К оплате",
    free: "Бесплатно",
    promoApplied: "Промокод THE10 применен",
    promoInvalid: "Попробуйте THE10",
    added: "Добавлено в корзину",
    favAdded: "Добавлено в избранное",
    favRemoved: "Удалено из избранного",
    subscribed: "Подписка оформлена",
    orderDone: "Заказ подтвержден",
    chatReply: "Спасибо. Стилист THE ответит в течение минуты.",
    results: "товаров",
    all: "Все",
    category_outerwear: "Верхняя одежда",
    category_shirts: "Рубашки",
    category_trousers: "Брюки",
    category_knitwear: "Трикотаж",
    category_jackets: "Жакеты",
    category_dresses: "Платья",
    category_accessories: "Аксессуары",
    category_shoes: "Обувь",
    color_black: "Черный",
    color_white: "Белый",
    color_beige: "Бежевый",
    color_grey: "Серый",
  },
  en: {
    navHome: "Home",
    navCatalog: "Catalog",
    navNew: "New",
    navSale: "Sale",
    navAccount: "Account",
    searchPlaceholder: "Search",
    heroEyebrow: "New season edit",
    heroText: "Precise essentials for an expressive wardrobe.",
    heroCta: "Shop catalog",
    newEyebrow: "Fresh drop",
    newTitle: "New arrivals",
    showAll: "View all",
    promoEyebrow: "Private sale",
    promoTitle: "Up to 30% off wool and knitwear",
    promoCta: "Shop now",
    editEyebrow: "Wardrobe note",
    editTitle: "Quiet silhouettes that work every day.",
    editText: "Build a capsule from coats, shirts, knitwear and precise accessories.",
    popularEyebrow: "Most wanted",
    popularTitle: "Popular pieces",
    shopPopular: "Shop popular",
    reviewsEyebrow: "Client notes",
    reviewsTitle: "Reviews",
    subscribeEyebrow: "THE letter",
    subscribeTitle: "Early access to new collections.",
    emailPlaceholder: "Email",
    subscribeCta: "Subscribe",
    catalogEyebrow: "Collection",
    catalogTitle: "THE catalog",
    catalogLead: "Premium essentials, outerwear and accessories in a calm palette.",
    filtersTitle: "Filters",
    resetFilters: "Reset",
    filterCategory: "Category",
    filterSize: "Size",
    filterColor: "Color",
    filterBrand: "Brand",
    filterPrice: "Price up to",
    sortBy: "Sort",
    sortPopular: "Popularity",
    sortPriceAsc: "Price: low",
    sortPriceDesc: "Price: high",
    sortNew: "Newest",
    addToCart: "Add to bag",
    buyNow: "Buy now",
    sizeChart: "Size chart",
    color: "Color",
    size: "Size",
    stock: "In stock",
    recommended: "Recommended",
    cartEyebrow: "Shopping bag",
    cartTitle: "Bag",
    summaryTitle: "Summary",
    promoPlaceholder: "Promo code",
    applyPromo: "Apply",
    checkoutCta: "Checkout",
    checkoutEyebrow: "Checkout",
    checkoutTitle: "Checkout",
    deliveryTitle: "Delivery",
    nameLabel: "Name",
    phoneLabel: "Phone",
    addressLabel: "Address",
    cityLabel: "City",
    paymentTitle: "Payment",
    confirmOrder: "Confirm order",
    saveProfile: "Save profile",
    profileSaved: "Profile saved",
    accountEyebrow: "Private room",
    accountTitle: "Account",
    ordersTab: "Orders",
    favoritesTab: "Favorites",
    profileTab: "Profile",
    footerText: "Premium everyday wardrobe.",
    footerCatalog: "Catalog",
    footerDelivery: "Delivery",
    chatTitle: "THE support",
    chatGreeting: "Hello. We can help with size, stock and delivery.",
    chatPlaceholder: "Your question",
    emptyCart: "Your bag is empty. Add items from the catalog.",
    emptyFavorites: "No favorites yet.",
    emptyResults: "No products match these filters.",
    subtotal: "Items",
    discount: "Discount",
    delivery: "Delivery",
    total: "Total",
    free: "Free",
    promoApplied: "Promo code THE10 applied",
    promoInvalid: "Try THE10",
    added: "Added to bag",
    favAdded: "Added to favorites",
    favRemoved: "Removed from favorites",
    subscribed: "Subscribed",
    orderDone: "Order confirmed",
    chatReply: "Thank you. A THE stylist will reply within a minute.",
    results: "items",
    all: "All",
    category_outerwear: "Outerwear",
    category_shirts: "Shirts",
    category_trousers: "Trousers",
    category_knitwear: "Knitwear",
    category_jackets: "Blazers",
    category_dresses: "Dresses",
    category_accessories: "Accessories",
    category_shoes: "Shoes",
    color_black: "Black",
    color_white: "White",
    color_beige: "Beige",
    color_grey: "Grey",
  },
  kk: {
    navHome: "Басты",
    navCatalog: "Каталог",
    navNew: "Жаңа",
    navSale: "Жеңілдік",
    navAccount: "Кабинет",
    searchPlaceholder: "Іздеу",
    heroEyebrow: "New season edit",
    heroText: "Айқын гардеробқа арналған дәл база.",
    heroCta: "Каталогқа өту",
    newEyebrow: "Fresh drop",
    newTitle: "Жаңа түскендер",
    showAll: "Барлығын көру",
    promoEyebrow: "Private sale",
    promoTitle: "Жүн мен трикотажға -30% дейін",
    promoCta: "Таңдау",
    editEyebrow: "Wardrobe note",
    editTitle: "Күн сайын жарасатын сабырлы силуэттер.",
    editText: "Пальто, жейде, трикотаж және нақты аксессуарлардан капсула жинаңыз.",
    popularEyebrow: "Most wanted",
    popularTitle: "Танымал тауарлар",
    shopPopular: "Танымалға өту",
    reviewsEyebrow: "Client notes",
    reviewsTitle: "Пікірлер",
    subscribeEyebrow: "THE letter",
    subscribeTitle: "Жаңа коллекцияларға ерте қолжетімділік.",
    emailPlaceholder: "Email",
    subscribeCta: "Жазылу",
    catalogEyebrow: "Collection",
    catalogTitle: "THE каталогы",
    catalogLead: "Сабырлы палитрадағы премиум базалық киім, сырт киім және аксессуарлар.",
    filtersTitle: "Сүзгілер",
    resetFilters: "Тазалау",
    filterCategory: "Санат",
    filterSize: "Өлшем",
    filterColor: "Түс",
    filterBrand: "Бренд",
    filterPrice: "Баға дейін",
    sortBy: "Сұрыптау",
    sortPopular: "Танымалдық",
    sortPriceAsc: "Баға: төмен",
    sortPriceDesc: "Баға: жоғары",
    sortNew: "Жаңалығы",
    addToCart: "Себетке",
    buyNow: "Қазір сатып алу",
    sizeChart: "Өлшем кестесі",
    color: "Түс",
    size: "Өлшем",
    stock: "Қоймада бар",
    recommended: "Ұсынылғандар",
    cartEyebrow: "Shopping bag",
    cartTitle: "Себет",
    summaryTitle: "Барлығы",
    promoPlaceholder: "Промокод",
    applyPromo: "Қолдану",
    checkoutCta: "Тапсырыс беру",
    checkoutEyebrow: "Checkout",
    checkoutTitle: "Тапсырысты рәсімдеу",
    deliveryTitle: "Жеткізу",
    nameLabel: "Аты",
    phoneLabel: "Телефон",
    addressLabel: "Мекенжай",
    cityLabel: "Қала",
    paymentTitle: "Төлем",
    confirmOrder: "Тапсырысты растау",
    saveProfile: "Профильді сақтау",
    profileSaved: "Профиль сақталды",
    accountEyebrow: "Private room",
    accountTitle: "Жеке кабинет",
    ordersTab: "Тапсырыстар",
    favoritesTab: "Таңдаулылар",
    profileTab: "Профиль",
    footerText: "Premium everyday wardrobe.",
    footerCatalog: "Каталог",
    footerDelivery: "Жеткізу",
    chatTitle: "THE support",
    chatGreeting: "Сәлеметсіз бе. Өлшем, қойма және жеткізу бойынша көмектесеміз.",
    chatPlaceholder: "Сұрағыңыз",
    emptyCart: "Себет әзірге бос. Каталогтан тауар қосыңыз.",
    emptyFavorites: "Таңдаулылар әзірге бос.",
    emptyResults: "Бұл сүзгілер бойынша тауар табылмады.",
    subtotal: "Тауарлар",
    discount: "Жеңілдік",
    delivery: "Жеткізу",
    total: "Төлеуге",
    free: "Тегін",
    promoApplied: "THE10 промокоды қолданылды",
    promoInvalid: "THE10 қолданып көріңіз",
    added: "Себетке қосылды",
    favAdded: "Таңдаулыларға қосылды",
    favRemoved: "Таңдаулылардан өшірілді",
    subscribed: "Жазылым рәсімделді",
    orderDone: "Тапсырыс расталды",
    chatReply: "Рақмет. THE стилисті бір минут ішінде жауап береді.",
    results: "тауар",
    all: "Барлығы",
    category_outerwear: "Сырт киім",
    category_shirts: "Жейделер",
    category_trousers: "Шалбар",
    category_knitwear: "Трикотаж",
    category_jackets: "Жакеттер",
    category_dresses: "Көйлектер",
    category_accessories: "Аксессуарлар",
    category_shoes: "Аяқ киім",
    color_black: "Қара",
    color_white: "Ақ",
    color_beige: "Беж",
    color_grey: "Сұр",
  },
};

const reviews = [
  {
    name: "Amina",
    city: "Almaty",
    text: {
      ru: "Пальто выглядит дороже своей цены. Посадка спокойная, ткань плотная, доставка заняла один день.",
      en: "The coat looks more expensive than its price. Calm fit, dense fabric, one-day delivery.",
      kk: "Пальто бағасынан қымбат көрінеді. Қонуы сабырлы, матасы тығыз, жеткізу бір күн болды.",
    },
  },
  {
    name: "Dina",
    city: "Astana",
    text: {
      ru: "Очень понятная размерная сетка. Заказала брюки и шелковую рубашку, все село без обмена.",
      en: "The size grid is very clear. I ordered trousers and a silk shirt, both fit without exchange.",
      kk: "Өлшем кестесі өте түсінікті. Шалбар мен жібек жейде алдым, екеуі де дәл келді.",
    },
  },
  {
    name: "Sofia",
    city: "Dubai",
    text: {
      ru: "Люблю, когда вещи не спорят между собой. Здесь легко собрать капсулу на неделю.",
      en: "I love when pieces do not compete with each other. It is easy to build a weekly capsule here.",
      kk: "Киімдер бір-бірімен таласпайтынын ұнатамын. Мұнда апталық капсула жинау оңай.",
    },
  },
];

const colorHex = {
  black: "#111111",
  white: "#f4f1ea",
  beige: "#bda88f",
  grey: "#8a8984",
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));

function getCustomerId() {
  const existing = localStorage.getItem("the_customer_id");
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem("the_customer_id", id);
  return id;
}

const state = {
  lang: localStorage.getItem("the_lang") || "ru",
  customerId: getCustomerId(),
  route: "home",
  selectedProductId: products[0].id,
  selectedGalleryIndex: 0,
  selectedColor: "",
  selectedSize: "",
  query: "",
  filters: {
    category: "all",
    size: "all",
    color: "all",
    brand: "all",
    maxPrice: 180000,
  },
  tag: "",
  sort: "popular",
  cart: JSON.parse(localStorage.getItem("the_cart") || "[]"),
  favorites: JSON.parse(localStorage.getItem("the_favorites") || "[]"),
  promo: "",
  accountTab: "orders",
  orders: JSON.parse(localStorage.getItem("the_orders") || "[]"),
  profile: JSON.parse(localStorage.getItem("the_profile") || '{"name":"Zhazira","email":"client@the.store","city":"Almaty"}'),
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const t = (key) => i18n[state.lang][key] || i18n.ru[key] || key;

function productName(product) {
  return product.name[state.lang] || product.name.ru;
}

function productDesc(product) {
  return product.desc[state.lang] || product.desc.ru;
}

function persist() {
  localStorage.setItem("the_cart", JSON.stringify(state.cart));
  localStorage.setItem("the_favorites", JSON.stringify(state.favorites));
  localStorage.setItem("the_lang", state.lang);
  localStorage.setItem("the_orders", JSON.stringify(state.orders));
  localStorage.setItem("the_profile", JSON.stringify(state.profile));
}

async function supabaseRequest(table, { body, method = "POST", query = "", prefer = "return=minimal" } = {}) {
  if (!isSupabaseReady) return false;
  try {
    const response = await fetch(supabaseEndpoint(table, query), {
      method,
      headers: {
        ...supabaseHeaders,
        ...(prefer ? { Prefer: prefer } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return response.ok;
  } catch {
    return false;
  }
}

const eqFilter = (field, value) => `${field}=eq.${encodeURIComponent(value)}`;

function saveNewsletter(email) {
  return supabaseRequest("newsletter_subscribers", {
    body: { email, language: state.lang, source: "THE storefront" },
    prefer: "resolution=merge-duplicates,return=minimal",
  });
}

function saveFavoriteRemote(productId, active) {
  if (active) {
    return supabaseRequest("favorites", {
      body: { customer_id: state.customerId, product_id: productId },
      query: "on_conflict=customer_id,product_id",
      prefer: "resolution=merge-duplicates,return=minimal",
    });
  }
  return supabaseRequest("favorites", {
    method: "DELETE",
    query: `${eqFilter("customer_id", state.customerId)}&${eqFilter("product_id", productId)}`,
    prefer: "",
  });
}

function saveProfileRemote() {
  return supabaseRequest("profiles", {
    body: {
      customer_id: state.customerId,
      name: state.profile.name,
      email: state.profile.email,
      city: state.profile.city,
      updated_at: new Date().toISOString(),
    },
    query: "on_conflict=customer_id",
    prefer: "resolution=merge-duplicates,return=minimal",
  });
}

function saveOrderRemote(order, customer, totals, items) {
  return supabaseRequest("orders", {
    body: {
      public_id: order.id,
      customer_id: state.customerId,
      customer_name: customer.name,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      payment_method: customer.payment,
      items,
      subtotal: totals.subtotal,
      discount: totals.discount,
      delivery: totals.delivery,
      total: totals.total,
      status: order.status,
    },
  });
}

function saveChatMessage(message, direction) {
  return supabaseRequest("chat_messages", {
    body: { customer_id: state.customerId, message, direction },
  });
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  $("[data-i18n-placeholder='searchPlaceholder']").placeholder = t("searchPlaceholder");
  $$("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  $$("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });
  $$("option[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  $("#languageSelect").value = lang;
  document.title = lang === "en" ? "THE - premium fashion store" : "THE - премиальный интернет-магазин одежды";
  persist();
  render();
}

function buildSelect(select, values, labelFactory) {
  const current = select.value;
  select.innerHTML = values
    .map((value) => `<option value="${value}">${labelFactory(value)}</option>`)
    .join("");
  if (values.includes(current)) select.value = current;
}

function renderFilters() {
  const categories = ["all", ...new Set(products.map((product) => product.category))];
  const sizes = ["all", ...new Set(products.flatMap((product) => product.sizes))];
  const colors = ["all", ...new Set(products.flatMap((product) => product.colors))];
  const brands = ["all", ...new Set(products.map((product) => product.brand))];

  buildSelect($("#categoryFilter"), categories, (value) => (value === "all" ? t("all") : t(`category_${value}`)));
  buildSelect($("#sizeFilter"), sizes, (value) => (value === "all" ? t("all") : value));
  buildSelect($("#colorFilter"), colors, (value) => (value === "all" ? t("all") : t(`color_${value}`)));
  buildSelect($("#brandFilter"), brands, (value) => (value === "all" ? t("all") : value));

  $("#categoryFilter").value = state.filters.category;
  $("#sizeFilter").value = state.filters.size;
  $("#colorFilter").value = state.filters.color;
  $("#brandFilter").value = state.filters.brand;
  $("#priceFilter").value = state.filters.maxPrice;
  $("#priceValue").textContent = money(Number(state.filters.maxPrice));
  $("#sortSelect").value = state.sort;
}

function currentProducts() {
  const query = state.query.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const byQuery =
      !query ||
      productName(product).toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      t(`category_${product.category}`).toLowerCase().includes(query);
    const byCategory = state.filters.category === "all" || product.category === state.filters.category;
    const bySize = state.filters.size === "all" || product.sizes.includes(state.filters.size);
    const byColor = state.filters.color === "all" || product.colors.includes(state.filters.color);
    const byBrand = state.filters.brand === "all" || product.brand === state.filters.brand;
    const byPrice = product.price <= Number(state.filters.maxPrice);
    const byTag = !state.tag || (state.tag === "new" && product.isNew) || (state.tag === "sale" && product.isSale);
    return byQuery && byCategory && bySize && byColor && byBrand && byPrice && byTag;
  });

  return filtered.sort((a, b) => {
    if (state.sort === "priceAsc") return a.price - b.price;
    if (state.sort === "priceDesc") return b.price - a.price;
    if (state.sort === "new") return Number(b.isNew) - Number(a.isNew) || b.popularity - a.popularity;
    return b.popularity - a.popularity;
  });
}

function productCard(product) {
  const favored = state.favorites.includes(product.id);
  const sale = product.oldPrice ? `<span class="meta"><s>${money(product.oldPrice)}</s></span>` : "";
  return `
    <article class="product-card">
      <button class="favorite-button ${favored ? "is-active" : ""}" type="button" aria-label="Favorite" data-favorite="${product.id}">♡</button>
      <a class="product-media" href="#product=${product.id}" aria-label="${productName(product)}">
        <img src="${product.image}" alt="${productName(product)}" loading="lazy" width="900" height="1200">
      </a>
      <div class="product-info">
        <div>
          <h3><a href="#product=${product.id}">${productName(product)}</a></h3>
          <span class="meta">${product.brand}</span>
        </div>
        <div>
          <span class="price">${money(product.price)}</span>
          ${sale}
        </div>
        <button class="quick-add" type="button" data-add="${product.id}">${t("addToCart")}</button>
      </div>
    </article>
  `;
}

function wireProductCardActions(container) {
  container.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      addToCart(button.dataset.add);
    });
  });
  container.querySelectorAll("[data-favorite]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleFavorite(button.dataset.favorite);
    });
  });
}

function renderProducts(container, list, emptyText = t("emptyResults")) {
  if (!list.length) {
    container.innerHTML = `<div class="empty-state">${emptyText}</div>`;
    return;
  }
  container.innerHTML = list.map(productCard).join("");
  wireProductCardActions(container);
}

function addToCart(id, options = {}) {
  const product = products.find((item) => item.id === id);
  const selectedSize = options.size || product.sizes[0];
  const selectedColor = options.color || product.colors[0];
  const key = `${id}-${selectedSize}-${selectedColor}`;
  const existing = state.cart.find((item) => item.key === key);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ key, id, size: selectedSize, color: selectedColor, qty: 1 });
  }
  persist();
  updateBadges();
  renderCart();
  showToast(t("added"));
}

function toggleFavorite(id) {
  const active = !state.favorites.includes(id);
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((item) => item !== id);
    showToast(t("favRemoved"));
  } else {
    state.favorites.push(id);
    showToast(t("favAdded"));
  }
  persist();
  saveFavoriteRemote(id, active);
  updateBadges();
  render();
}

function updateBadges() {
  $("#cartCount").textContent = state.cart.reduce((sum, item) => sum + item.qty, 0);
  $("#favoriteCount").textContent = state.favorites.length;
}

function cartTotals() {
  const subtotal = state.cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + product.price * item.qty;
  }, 0);
  const discount = state.promo === "THE10" ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 0 && subtotal < 70000 ? 2500 : 0;
  return { subtotal, discount, delivery, total: Math.max(subtotal - discount + delivery, 0) };
}

function renderSummary(target = $("#summaryLines")) {
  const totals = cartTotals();
  target.innerHTML = `
    <div><span>${t("subtotal")}</span><strong>${money(totals.subtotal)}</strong></div>
    <div><span>${t("discount")}</span><strong>${totals.discount ? `-${money(totals.discount)}` : money(0)}</strong></div>
    <div><span>${t("delivery")}</span><strong>${totals.delivery ? money(totals.delivery) : t("free")}</strong></div>
    <div><span>${t("total")}</span><strong>${money(totals.total)}</strong></div>
  `;
}

function renderCart() {
  const list = $("#cartList");
  if (!list) return;
  if (!state.cart.length) {
    list.innerHTML = `<div class="empty-state">${t("emptyCart")}</div>`;
  } else {
    list.innerHTML = state.cart
      .map((item) => {
        const product = products.find((entry) => entry.id === item.id);
        return `
          <article class="cart-item">
            <div class="cart-product">
              <img src="${product.image}" alt="${productName(product)}" loading="lazy">
              <div>
                <h3>${productName(product)}</h3>
                <p class="meta">${t(`color_${item.color}`)} / ${item.size}</p>
                <p class="price">${money(product.price)}</p>
              </div>
            </div>
            <div class="quantity" aria-label="Quantity">
              <button type="button" data-qty="${item.key}" data-delta="-1">−</button>
              <span>${item.qty}</span>
              <button type="button" data-qty="${item.key}" data-delta="1">+</button>
            </div>
          </article>
        `;
      })
      .join("");
  }
  renderSummary();
  const checkoutSummary = $("#checkoutSummary");
  if (checkoutSummary) renderSummary(checkoutSummary);
}

function renderProductPage() {
  const product = products.find((item) => item.id === state.selectedProductId) || products[0];
  state.selectedColor ||= product.colors[0];
  state.selectedSize ||= product.sizes[0];
  const galleryImage = product.gallery[state.selectedGalleryIndex] || product.image;
  const related = products
    .filter((item) => item.id !== product.id && (item.category === product.category || item.brand === product.brand))
    .slice(0, 4);

  $("#productPage").innerHTML = `
    <div class="gallery">
      <div class="thumbs">
        ${product.gallery
          .map(
            (src, index) => `
              <button class="${index === state.selectedGalleryIndex ? "is-active" : ""}" type="button" data-gallery="${index}">
                <img src="${src}" alt="${productName(product)} ${index + 1}" loading="lazy">
              </button>
            `
          )
          .join("")}
      </div>
      <div class="main-image">
        <img src="${galleryImage}" alt="${productName(product)}" width="1200" height="1600">
      </div>
    </div>
    <div class="detail-panel">
      <div>
        <p class="eyebrow">${product.brand}</p>
        <h1>${productName(product)}</h1>
      </div>
      <div class="detail-price">${money(product.price)}</div>
      <p class="detail-desc">${productDesc(product)}</p>
      <div>
        <p class="eyebrow">${t("color")}</p>
        <div class="swatches">
          ${product.colors
            .map(
              (color) => `
                <button class="swatch ${color === state.selectedColor ? "is-active" : ""}" type="button" aria-label="${t(`color_${color}`)}" data-color="${color}">
                  <span style="background:${colorHex[color]}"></span>
                </button>
              `
            )
            .join("")}
        </div>
      </div>
      <div>
        <p class="eyebrow">${t("size")}</p>
        <div class="sizes">
          ${product.sizes
            .map(
              (size) => `
                <button class="size-button ${size === state.selectedSize ? "is-active" : ""}" type="button" data-size="${size}">${size}</button>
              `
            )
            .join("")}
        </div>
      </div>
      <p class="stock">${t("stock")}: ${product.stock}</p>
      <button class="primary-button full" type="button" data-buy-now="${product.id}">${t("buyNow")}</button>
      <button class="quick-add" type="button" data-add-detail="${product.id}">${t("addToCart")}</button>
      <div>
        <p class="eyebrow">${t("sizeChart")}</p>
        <table class="size-table">
          <thead><tr><th>Size</th><th>Chest</th><th>Waist</th><th>Hip</th></tr></thead>
          <tbody>
            <tr><td>XS</td><td>82</td><td>64</td><td>90</td></tr>
            <tr><td>S</td><td>88</td><td>70</td><td>96</td></tr>
            <tr><td>M</td><td>94</td><td>76</td><td>102</td></tr>
            <tr><td>L</td><td>100</td><td>82</td><td>108</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <section class="recommendations">
      <h2>${t("recommended")}</h2>
      <div class="product-grid compact">${related.map(productCard).join("")}</div>
    </section>
  `;
  const page = $("#productPage");
  wireProductCardActions(page);
  page.querySelector("[data-add-detail]")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product.id, {
      size: state.selectedSize,
      color: state.selectedColor,
    });
  });
  page.querySelector("[data-buy-now]")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product.id, {
      size: state.selectedSize,
      color: state.selectedColor,
    });
    window.location.hash = "checkout";
  });
}

function renderHome() {
  renderProducts($("#newArrivals"), products.filter((product) => product.isNew).slice(0, 5));
  renderProducts(
    $("#popularProducts"),
    [...products].sort((a, b) => b.popularity - a.popularity).slice(0, 4)
  );
  $("#reviewsGrid").innerHTML = reviews
    .map(
      (review) => `
        <article class="review">
          <blockquote>${review.text[state.lang]}</blockquote>
          <strong>${review.name}</strong>
          <span class="meta">${review.city}</span>
        </article>
      `
    )
    .join("");
}

function renderCatalog() {
  renderFilters();
  const list = currentProducts();
  $("#resultCount").textContent = `${list.length} ${t("results")}`;
  renderProducts($("#catalogGrid"), list);
}

function renderAccount() {
  $$(".tab").forEach((tab) => tab.classList.toggle("is-active", tab.dataset.accountTab === state.accountTab));
  const panel = $("#accountPanel");
  if (state.accountTab === "favorites") {
    const list = products.filter((product) => state.favorites.includes(product.id));
    panel.innerHTML = list.length
      ? `<div class="product-grid compact">${list.map(productCard).join("")}</div>`
      : `<div class="empty-state">${t("emptyFavorites")}</div>`;
    wireProductCardActions(panel);
    return;
  }
  if (state.accountTab === "profile") {
    panel.innerHTML = `
      <form class="profile-form" id="profileForm">
        <label>${t("nameLabel")}<input name="name" value="${escapeHtml(state.profile.name || "")}"></label>
        <label>Email<input name="email" value="${escapeHtml(state.profile.email || "")}"></label>
        <label>${t("cityLabel")}<input name="city" value="${escapeHtml(state.profile.city || "")}"></label>
        <button class="primary-button" type="submit">${t("saveProfile")}</button>
      </form>
    `;
    return;
  }
  const orders = state.orders.length
    ? state.orders
    : [
        { id: "THE-2409", date: "14.06.2026", total: 223900, status: "Delivered" },
        { id: "THE-2318", date: "02.05.2026", total: 89900, status: "Completed" },
      ];
  panel.innerHTML = `
    <div class="orders-list">
      ${orders
        .map(
          (order) => `
            <article class="order-card">
              <div>
                <strong>${order.id}</strong>
                <p class="meta">${order.date} · ${order.status}</p>
              </div>
              <strong>${money(order.total)}</strong>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function render() {
  renderHome();
  renderCatalog();
  renderCart();
  renderAccount();
  renderProductPage();
  updateBadges();
  activateReveals();
}

function navigateFromHash() {
  const hash = window.location.hash.replace("#", "") || "home";
  const [routePart, queryString] = hash.split("?");
  state.tag = "";
  if (routePart.startsWith("product=")) {
    state.route = "product";
    state.selectedProductId = routePart.split("=")[1];
    state.selectedGalleryIndex = 0;
    const product = products.find((item) => item.id === state.selectedProductId) || products[0];
    state.selectedColor = product.colors[0];
    state.selectedSize = product.sizes[0];
  } else {
    state.route = routePart || "home";
  }
  const params = new URLSearchParams(queryString || "");
  if (params.get("tag") === "new") {
    state.tag = "new";
    state.sort = "new";
  }
  if (params.get("tag") === "sale") {
    state.tag = "sale";
    state.filters.maxPrice = 180000;
    state.query = "";
  }
  if (params.get("sort")) state.sort = params.get("sort");
  showRoute();
}

function showRoute() {
  $$(".view").forEach((view) => view.classList.toggle("is-active", view.dataset.view === state.route));
  $$("[data-route-link]").forEach((link) => link.classList.toggle("is-active", link.dataset.routeLink === state.route));
  document.body.classList.remove("menu-open", "filters-open");
  $("[data-nav]").classList.remove("is-open");
  $("#filtersPanel").classList.remove("is-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function activateReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.1 }
  );
  $$(".reveal").forEach((node) => observer.observe(node));
}

function attachEvents() {
  window.addEventListener("hashchange", navigateFromHash);

  $("#languageSelect").addEventListener("change", (event) => setLanguage(event.target.value));

  $("#globalSearch").addEventListener("input", (event) => {
    state.query = event.target.value;
    if (state.route !== "catalog") window.location.hash = "catalog";
    renderCatalog();
  });

  $("[data-menu-toggle]").addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
    $("[data-nav]").classList.toggle("is-open");
  });

  $("[data-filter-toggle]").addEventListener("click", () => {
    document.body.classList.add("filters-open");
    $("#filtersPanel").classList.add("is-open");
  });

  document.addEventListener("click", (event) => {
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) {
      if (routeButton.dataset.tab) state.accountTab = routeButton.dataset.tab;
      window.location.hash = routeButton.dataset.route;
    }

    const addButton = event.target.closest("[data-add]");
    if (addButton) addToCart(addButton.dataset.add);

    const detailAddButton = event.target.closest("[data-add-detail]");
    if (detailAddButton) {
      addToCart(detailAddButton.dataset.addDetail, {
        size: state.selectedSize,
        color: state.selectedColor,
      });
    }

    const buyNow = event.target.closest("[data-buy-now]");
    if (buyNow) {
      addToCart(buyNow.dataset.buyNow, {
        size: state.selectedSize,
        color: state.selectedColor,
      });
      window.location.hash = "checkout";
    }

    const favoriteButton = event.target.closest("[data-favorite]");
    if (favoriteButton) toggleFavorite(favoriteButton.dataset.favorite);

    const galleryButton = event.target.closest("[data-gallery]");
    if (galleryButton) {
      state.selectedGalleryIndex = Number(galleryButton.dataset.gallery);
      renderProductPage();
    }

    const colorButton = event.target.closest("[data-color]");
    if (colorButton) {
      state.selectedColor = colorButton.dataset.color;
      renderProductPage();
    }

    const sizeButton = event.target.closest("[data-size]");
    if (sizeButton) {
      state.selectedSize = sizeButton.dataset.size;
      renderProductPage();
    }

    const qtyButton = event.target.closest("[data-qty]");
    if (qtyButton) {
      const item = state.cart.find((entry) => entry.key === qtyButton.dataset.qty);
      if (item) item.qty += Number(qtyButton.dataset.delta);
      state.cart = state.cart.filter((entry) => entry.qty > 0);
      persist();
      renderCart();
      updateBadges();
    }

    const tab = event.target.closest("[data-account-tab]");
    if (tab) {
      state.accountTab = tab.dataset.accountTab;
      renderAccount();
    }

    const chatToggle = event.target.closest("[data-chat-toggle]");
    if (chatToggle) $("#chatWidget").classList.toggle("is-open");

    if (document.body.classList.contains("filters-open") && event.target === document.body) {
      document.body.classList.remove("filters-open");
      $("#filtersPanel").classList.remove("is-open");
    }
  });

  ["categoryFilter", "sizeFilter", "colorFilter", "brandFilter"].forEach((id) => {
    $(`#${id}`).addEventListener("change", (event) => {
      const key = id.replace("Filter", "");
      state.filters[key] = event.target.value;
      renderCatalog();
    });
  });

  $("#priceFilter").addEventListener("input", (event) => {
    state.filters.maxPrice = Number(event.target.value);
    $("#priceValue").textContent = money(Number(event.target.value));
    renderCatalog();
  });

  $("#sortSelect").addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderCatalog();
  });

  $("#resetFilters").addEventListener("click", () => {
    state.query = "";
    $("#globalSearch").value = "";
    state.filters = { category: "all", size: "all", color: "all", brand: "all", maxPrice: 180000 };
    state.tag = "";
    state.sort = "popular";
    renderCatalog();
  });

  $("#promoForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const code = $("#promoInput").value.trim().toUpperCase();
    if (code === "THE10") {
      state.promo = code;
      showToast(t("promoApplied"));
      renderCart();
    } else {
      showToast(t("promoInvalid"));
    }
  });

  $("#subscribeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = event.target.querySelector("input").value.trim();
    saveNewsletter(email);
    event.target.reset();
    showToast(t("subscribed"));
  });

  $("#checkoutForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.cart.length) {
      showToast(t("emptyCart"));
      window.location.hash = "catalog";
      return;
    }
    const formData = new FormData(event.target);
    const totals = cartTotals();
    const customer = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      payment: formData.get("payment"),
    };
    const items = state.cart.map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      return {
        product_id: item.id,
        name: productName(product),
        price: product.price,
        qty: item.qty,
        size: item.size,
        color: item.color,
      };
    });
    const order = {
      id: `THE-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("ru-RU"),
      total: totals.total,
      status: "Confirmed",
    };
    await saveOrderRemote(order, customer, totals, items);
    state.orders.unshift(order);
    state.cart = [];
    state.promo = "";
    persist();
    render();
    showToast(`${t("orderDone")}: ${order.id}`);
    window.location.hash = "account";
  });

  $("#chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = event.target.querySelector("input");
    const body = $("#chatBody");
    const message = input.value;
    body.insertAdjacentHTML("beforeend", `<p class="user">${escapeHtml(message)}</p>`);
    saveChatMessage(message, "customer");
    input.value = "";
    window.setTimeout(() => {
      const reply = t("chatReply");
      body.insertAdjacentHTML("beforeend", `<p>${reply}</p>`);
      saveChatMessage(reply, "support");
      body.scrollTop = body.scrollHeight;
    }, 520);
  });

  document.addEventListener("submit", (event) => {
    if (!event.target.matches("#profileForm")) return;
    event.preventDefault();
    const formData = new FormData(event.target);
    state.profile = {
      name: formData.get("name"),
      email: formData.get("email"),
      city: formData.get("city"),
    };
    persist();
    saveProfileRemote();
    showToast(t("profileSaved"));
  });
}

setLanguage(state.lang);
attachEvents();
navigateFromHash();
