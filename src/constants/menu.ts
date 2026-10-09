import type { Dish, MenuCategory, MenuCategoryId, MenuGroup } from "@/types";

/**
 * Menu content.
 *
 * Prices are whole Ghana cedis (the base currency). Update prices here when
 * the board changes — the menu explorer, cart and schema.org markup all read
 * from this file.
 */

export const MENU_GROUPS: readonly MenuGroup[] = [
  {
    id: "service",
    name: "Our menus",
    description: "Weekday plates, weekend soups, and dishes we cook to order.",
  },
];

export const MENU_CATEGORIES: readonly MenuCategory[] = [
  {
    id: "weekdays",
    name: "Weekdays",
    group: "service",
    tagline: "Monday to Friday favourites",
    image: "/images/dish-jollof.webp",
  },
  {
    id: "weekend",
    name: "Weekend",
    group: "service",
    tagline: "Saturday and Sunday soups",
    image: "/images/dish-suya.webp",
  },
  {
    id: "pre-order",
    name: "Pre-Order",
    group: "service",
    tagline: "Call ahead — cooked when you are ready",
    image: "/images/dish-lobster.webp",
  },
];

export const DISHES: readonly Dish[] = [
  /* ------------------------------- WEEKDAYS ------------------------------- */
  {
    id: "yam-chips-pork-chicken",
    name: "Yam Chips with Pork or Chicken",
    category: "weekdays",
    description:
      "Crisp golden yam chips served with your choice of grilled pork or chicken, finished with our house pepper sauce.",
    ingredients: ["Yam", "Pork or chicken", "Pepper sauce", "Onion", "Ginger"],
    price: 65,
    calories: 620,
    prepTime: 20,
    image: "/images/dish-suya.webp",
    spice: 2,
    badges: ["popular"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.8,
    reviewCount: 214,
    serves: "One plate",
  },
  {
    id: "fried-rice-pork-chicken",
    name: "Fried Rice with Pork or Chicken",
    category: "weekdays",
    description:
      "Smoky fried rice wok-tossed with vegetables, served with grilled pork or chicken.",
    ingredients: ["Rice", "Pork or chicken", "Vegetables", "Soy", "Spring onion"],
    price: 60,
    calories: 580,
    prepTime: 18,
    image: "/images/dish-jollof.webp",
    spice: 1,
    badges: ["best-seller"],
    dietary: ["dairy-free"],
    rating: 4.9,
    reviewCount: 368,
    serves: "One plate",
  },
  {
    id: "sweet-potato-chips",
    name: "Sweet Potato Chips",
    category: "weekdays",
    description:
      "Hand-cut sweet potato chips, fried until crisp and lightly seasoned. Perfect on their own or as a side.",
    ingredients: ["Sweet potato", "Salt", "Pepper"],
    price: 35,
    calories: 320,
    prepTime: 15,
    image: "/images/dish-starter.webp",
    spice: 0,
    badges: ["new"],
    dietary: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    rating: 4.7,
    reviewCount: 96,
    serves: "One plate",
  },
  {
    id: "banku-tilapia",
    name: "Banku and Tilapia",
    category: "weekdays",
    description:
      "Soft fermented banku with grilled tilapia and a generous bowl of fresh pepper sauce and shito.",
    ingredients: ["Banku", "Tilapia", "Pepper sauce", "Shito", "Onion"],
    price: 85,
    calories: 710,
    prepTime: 25,
    image: "/images/dish-lobster.webp",
    spice: 2,
    badges: ["signature", "best-seller"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.9,
    reviewCount: 512,
    serves: "One plate",
  },
  {
    id: "banku-pork",
    name: "Banku and Pork",
    category: "weekdays",
    description:
      "Banku paired with slow-cooked pork, served with pepper sauce and fried onions.",
    ingredients: ["Banku", "Pork", "Pepper sauce", "Onion", "Garlic"],
    price: 80,
    calories: 740,
    prepTime: 25,
    image: "/images/dish-steak.webp",
    spice: 2,
    badges: ["popular"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.8,
    reviewCount: 287,
    serves: "One plate",
  },
  {
    id: "kenkey-pork-chops",
    name: "Kenkey with Pork Chops",
    category: "weekdays",
    description:
      "Steamed kenkey with grilled pork chops, fresh pepper, and a side of shito.",
    ingredients: ["Kenkey", "Pork chops", "Pepper", "Shito", "Onion"],
    price: 75,
    calories: 690,
    prepTime: 22,
    image: "/images/dish-suya.webp",
    spice: 2,
    badges: [],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.7,
    reviewCount: 168,
    serves: "One plate",
  },

  /* -------------------------------- WEEKEND ------------------------------- */
  {
    id: "fufu-goat-light",
    name: "Fufu with Goat Light Soup",
    category: "weekend",
    description:
      "Pound fufu with fragrant goat light soup — ginger, garlic and garden eggs in a clear, warming broth.",
    ingredients: ["Fufu", "Goat", "Garden eggs", "Ginger", "Garlic", "Pepper"],
    price: 95,
    calories: 680,
    prepTime: 30,
    image: "/images/dish-suya.webp",
    spice: 2,
    badges: ["signature", "best-seller"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.9,
    reviewCount: 441,
    serves: "One bowl",
  },
  {
    id: "chicken-light",
    name: "Chicken Light Soup",
    category: "weekend",
    description:
      "Clear chicken light soup with garden eggs and fresh herbs. Serve with fufu, banku or rice on request.",
    ingredients: ["Chicken", "Garden eggs", "Ginger", "Garlic", "Pepper", "Herbs"],
    price: 80,
    calories: 420,
    prepTime: 28,
    image: "/images/dish-brunch.webp",
    spice: 1,
    badges: ["popular"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.8,
    reviewCount: 302,
    serves: "One bowl",
  },
  {
    id: "ebunubunu",
    name: "Ebunubunu",
    category: "weekend",
    description:
      "Classic Conti green soup of cocoyam leaves, smoked fish and palm oil — deep, earthy and restorative.",
    ingredients: ["Cocoyam leaves", "Smoked fish", "Palm oil", "Onion", "Pepper"],
    price: 90,
    calories: 560,
    prepTime: 30,
    image: "/images/dish-jollof.webp",
    spice: 1,
    badges: ["chef-recommendation"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.8,
    reviewCount: 189,
    serves: "One bowl",
  },
  {
    id: "omotuo-groundnut",
    name: "Omotuo and Groundnut Soup",
    category: "weekend",
    description:
      "Soft rice balls with rich groundnut soup, finished with your choice of meat or fish from the pot.",
    ingredients: ["Rice balls", "Groundnut paste", "Meat or fish", "Onion", "Pepper"],
    price: 85,
    calories: 720,
    prepTime: 28,
    image: "/images/dish-jollof.webp",
    spice: 1,
    badges: ["popular"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.9,
    reviewCount: 356,
    serves: "One plate",
  },
  {
    id: "palmnut-soup",
    name: "Palmnut Soup",
    category: "weekend",
    description:
      "Slow-simmered palmnut soup with crab, fish or meat — the weekend classic, served with fufu, banku or rice.",
    ingredients: ["Palmnut paste", "Crab or fish or meat", "Onion", "Pepper", "Ginger"],
    price: 95,
    calories: 650,
    prepTime: 30,
    image: "/images/dish-lobster.webp",
    spice: 2,
    badges: ["signature"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.9,
    reviewCount: 398,
    serves: "One bowl",
  },
  {
    id: "konkonte-groundnut",
    name: "Konkonte and Groundnut Soup",
    category: "weekend",
    description:
      "Smooth cassava konkonte with peanut soup — hearty, comforting and cooked the traditional way.",
    ingredients: ["Konkonte", "Groundnut paste", "Meat or fish", "Onion", "Pepper"],
    price: 80,
    calories: 700,
    prepTime: 28,
    image: "/images/dish-pasta.webp",
    spice: 1,
    badges: [],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.7,
    reviewCount: 142,
    serves: "One plate",
  },

  /* ------------------------------- PRE-ORDER ------------------------------ */
  {
    id: "akple-aborbitadzi",
    name: "Akple and Aborbitadzi",
    category: "pre-order",
    description:
      "Firm corn akple with aborbitadzi — okro stew thickened the Conti way. Please order ahead so we can prepare it fresh.",
    ingredients: ["Akple", "Okro", "Palm oil", "Fish or meat", "Pepper"],
    price: 90,
    calories: 640,
    prepTime: 35,
    image: "/images/dish-jollof.webp",
    spice: 2,
    badges: ["limited", "chef-recommendation"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.9,
    reviewCount: 76,
    serves: "One plate",
  },
  {
    id: "apaparansa-crab",
    name: "Apaparansa and Crab",
    category: "pre-order",
    description:
      "Apaparansa stew with fresh crab — rich, peppery and best when cooked to order. Pre-order required.",
    ingredients: ["Apaparansa", "Fresh crab", "Palm oil", "Onion", "Pepper"],
    price: 120,
    calories: 580,
    prepTime: 40,
    image: "/images/dish-lobster.webp",
    spice: 2,
    badges: ["signature", "limited"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.9,
    reviewCount: 54,
    serves: "One plate",
  },
  {
    id: "peppered-rice",
    name: "Peppered Rice",
    category: "pre-order",
    description:
      "Fragrant peppered rice cooked with spice and stock — bold heat, deep flavour. Order ahead for the freshest pot.",
    ingredients: ["Rice", "Scotch bonnet", "Stock", "Onion", "Ginger", "Garlic"],
    price: 70,
    calories: 520,
    prepTime: 30,
    image: "/images/dish-jollof.webp",
    spice: 3,
    badges: ["new", "popular"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.8,
    reviewCount: 91,
    serves: "One plate",
  },
];

/* -------------------------------------------------------------------------- */
/*                             Derived selectors                              */
/* -------------------------------------------------------------------------- */

const DISH_INDEX = new Map(DISHES.map((dish) => [dish.id, dish]));

export function getDish(id: string): Dish | undefined {
  return DISH_INDEX.get(id);
}

export function getDishesByCategory(category: MenuCategoryId): Dish[] {
  return DISHES.filter((dish) => dish.category === category);
}

export function getCategory(id: MenuCategoryId): MenuCategory | undefined {
  return MENU_CATEGORIES.find((category) => category.id === id);
}

export function isMenuCategoryId(value: string | null | undefined): value is MenuCategoryId {
  return !!value && MENU_CATEGORIES.some((category) => category.id === value);
}

/** Hero-worthy dishes for showcases and schema markup. */
export const FEATURED_DISH_IDS = [
  "banku-tilapia",
  "fufu-goat-light",
  "palmnut-soup",
  "apaparansa-crab",
  "fried-rice-pork-chicken",
  "omotuo-groundnut",
] as const;

export const FEATURED_DISHES = FEATURED_DISH_IDS.map((id) => DISH_INDEX.get(id)!).filter(Boolean);

export const SIGNATURE_DISHES = DISHES.filter((dish) => dish.badges.includes("signature"));

export const POPULAR_DISHES = DISHES.filter(
  (dish) => dish.badges.includes("best-seller") || dish.badges.includes("popular"),
);

export const DIETARY_FILTERS = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten free" },
  { id: "dairy-free", label: "Dairy free" },
] as const;
