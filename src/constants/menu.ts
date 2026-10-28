import type { Dish, MenuCategory, MenuCategoryId, MenuGroup } from "@/types";

/**
 * Menu content.
 *
 * Prices are whole Ghana cedis (the base currency). Update prices here when
 * the board changes — the menu explorer, cart and schema.org markup all read
 * from this file.
 */

/** Printable menu. Replace the file in `public/menu/` when prices change. */
export const MENU_PDF = "/menu/dzifoods-menu.pdf";

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
    id: "palava-sauce",
    name: "Palava Sauce with Rice or Yam",
    category: "weekdays",
    description:
      "Kontomire palava sauce with egg and fish in palm oil, served with your choice of rice or boiled yam.",
    ingredients: ["Kontomire", "Egg", "Fish", "Palm oil", "Rice or yam"],
    price: 40,
    calories: 560,
    prepTime: 20,
    image: "/images/dish-pasta.webp",
    spice: 1,
    badges: ["new"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.7,
    reviewCount: 64,
    serves: "One plate",
  },
  {
    id: "yam-chips-pork",
    name: "Yam Chips with Pork",
    category: "weekdays",
    description:
      "Crisp golden yam chips with grilled pork, finished with our house pepper sauce.",
    ingredients: ["Yam", "Pork", "Pepper sauce", "Onion", "Ginger"],
    price: 60,
    calories: 680,
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
    id: "yam-chips-chicken",
    name: "Yam Chips with Chicken",
    category: "weekdays",
    description:
      "Crisp golden yam chips with grilled chicken, finished with our house pepper sauce.",
    ingredients: ["Yam", "Chicken", "Pepper sauce", "Onion", "Ginger"],
    price: 50,
    calories: 620,
    prepTime: 20,
    image: "/images/dish-suya.webp",
    spice: 2,
    badges: ["popular"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.8,
    reviewCount: 187,
    serves: "One plate",
  },
  {
    id: "fried-rice-pork",
    name: "Fried Rice with Pork",
    category: "weekdays",
    description:
      "Smoky fried rice wok-tossed with vegetables, served with grilled pork.",
    ingredients: ["Rice", "Pork", "Vegetables", "Spring onion"],
    price: 80,
    calories: 640,
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
    id: "fried-rice-chicken",
    name: "Fried Rice with Chicken",
    category: "weekdays",
    description:
      "Smoky fried rice wok-tossed with vegetables, served with grilled chicken.",
    ingredients: ["Rice", "Chicken", "Vegetables", "Spring onion"],
    price: 70,
    calories: 580,
    prepTime: 18,
    image: "/images/dish-jollof.webp",
    spice: 1,
    badges: ["best-seller"],
    dietary: ["dairy-free"],
    rating: 4.9,
    reviewCount: 341,
    serves: "One plate",
  },
  {
    id: "jollof-chicken",
    name: "Jollof with Chicken",
    category: "weekdays",
    description:
      "Smoky party-style jollof rice cooked in a rich tomato and pepper base, served with grilled chicken.",
    ingredients: ["Rice", "Chicken", "Tomato", "Pepper", "Onion"],
    price: 60,
    calories: 620,
    prepTime: 18,
    image: "/images/dish-jollof.webp",
    spice: 2,
    badges: ["popular"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.9,
    reviewCount: 402,
    serves: "One plate",
  },
  {
    id: "goat-jollof",
    name: "Goat Jollof",
    category: "weekdays",
    description:
      "Our jollof rice cooked with tender, spiced goat meat — deep, smoky and generous.",
    ingredients: ["Rice", "Goat", "Tomato", "Pepper", "Onion"],
    price: 100,
    calories: 720,
    prepTime: 25,
    image: "/images/dish-steak.webp",
    spice: 2,
    badges: ["signature"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.9,
    reviewCount: 156,
    serves: "One plate",
  },
  {
    id: "sweet-potato-chips-pork",
    name: "Sweet Potato Chips with Pork",
    category: "weekdays",
    description:
      "Hand-cut sweet potato chips fried until crisp, served with grilled pork and pepper sauce.",
    ingredients: ["Sweet potato", "Pork", "Pepper sauce", "Onion"],
    price: 60,
    calories: 650,
    prepTime: 18,
    image: "/images/dish-suya.webp",
    spice: 1,
    badges: [],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.7,
    reviewCount: 96,
    serves: "One plate",
  },
  {
    id: "sweet-potato-chips-chicken",
    name: "Sweet Potato Chips with Chicken",
    category: "weekdays",
    description:
      "Hand-cut sweet potato chips fried until crisp, served with grilled chicken and pepper sauce.",
    ingredients: ["Sweet potato", "Chicken", "Pepper sauce", "Onion"],
    price: 50,
    calories: 590,
    prepTime: 18,
    image: "/images/dish-suya.webp",
    spice: 1,
    badges: [],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.7,
    reviewCount: 88,
    serves: "One plate",
  },
  {
    id: "ball-of-banku",
    name: "Ball of Banku",
    category: "weekdays",
    description:
      "One ball of soft, fermented corn and cassava banku — add it to any soup or stew.",
    ingredients: ["Corn dough", "Cassava dough"],
    price: 5,
    calories: 280,
    prepTime: 5,
    image: "/images/dish-brunch.webp",
    spice: 0,
    badges: [],
    dietary: ["vegan", "gluten-free", "dairy-free"],
    rating: 4.8,
    reviewCount: 120,
    serves: "One ball",
  },
  {
    id: "banku-pork",
    name: "Banku and Pork",
    category: "weekdays",
    description:
      "Banku paired with slow-cooked pork, served with pepper sauce and fried onions.",
    ingredients: ["Banku", "Pork", "Pepper sauce", "Onion", "Garlic"],
    price: 70,
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
    id: "banku-tilapia",
    name: "Banku and Tilapia",
    category: "weekdays",
    description:
      "Soft banku with grilled tilapia and fresh pepper sauce. Price depends on the size of the fish.",
    ingredients: ["Banku", "Tilapia", "Pepper sauce", "Shito", "Onion"],
    price: 80,
    priceMax: 120,
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

  /* -------------------------------- WEEKEND ------------------------------- */
  {
    id: "fufu",
    name: "Fufu",
    category: "weekend",
    description:
      "Freshly pounded fufu — pair it with one of our light soups below.",
    ingredients: ["Cassava", "Plantain"],
    price: 20,
    priceFrom: true,
    calories: 350,
    prepTime: 15,
    image: "/images/dish-brunch.webp",
    spice: 0,
    badges: [],
    dietary: ["vegan", "gluten-free", "dairy-free"],
    rating: 4.8,
    reviewCount: 140,
    serves: "One bowl",
  },
  {
    id: "fufu-chicken-light-soup",
    name: "Fufu with Chicken Light Soup",
    category: "weekend",
    description:
      "Pounded fufu with clear chicken light soup — ginger, garlic and garden eggs in a warming broth.",
    ingredients: ["Fufu", "Chicken", "Garden eggs", "Ginger", "Garlic", "Pepper"],
    price: 30,
    priceFrom: true,
    calories: 560,
    prepTime: 25,
    image: "/images/dish-brunch.webp",
    spice: 2,
    badges: ["popular"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.8,
    reviewCount: 302,
    serves: "One bowl",
  },
  {
    id: "fufu-goat-light-soup",
    name: "Fufu with Goat Light Soup",
    category: "weekend",
    description:
      "Pounded fufu with fragrant goat light soup — ginger, garlic and garden eggs in a clear, warming broth.",
    ingredients: ["Fufu", "Goat", "Garden eggs", "Ginger", "Garlic", "Pepper"],
    price: 40,
    priceFrom: true,
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
    id: "fufu-ebunubunu",
    name: "Fufu with Ebunubunu",
    category: "weekend",
    description:
      "Pounded fufu with ebunubunu — the Ewe green soup of cocoyam leaves and smoked fish, deep and earthy.",
    ingredients: ["Fufu", "Cocoyam leaves", "Smoked fish", "Palm oil", "Pepper"],
    price: 80,
    calories: 620,
    prepTime: 30,
    image: "/images/dish-pasta.webp",
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
      "Soft rice balls with rich groundnut soup, cooked slowly the traditional way.",
    ingredients: ["Rice balls", "Groundnut paste", "Meat or fish", "Onion", "Pepper"],
    price: 40,
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
    id: "omotuo-palmnut",
    name: "Omotuo and Palmnut Soup",
    category: "weekend",
    description:
      "Soft rice balls with slow-simmered palmnut soup — the weekend classic.",
    ingredients: ["Rice balls", "Palmnut paste", "Meat or fish", "Onion", "Pepper"],
    price: 40,
    calories: 690,
    prepTime: 28,
    image: "/images/dish-lobster.webp",
    spice: 2,
    badges: ["signature"],
    dietary: ["gluten-free", "dairy-free"],
    rating: 4.9,
    reviewCount: 298,
    serves: "One plate",
  },

  /* ------------------------------- PRE-ORDER ------------------------------ */
  {
    id: "akple-aborbitadzi",
    name: "Akple and Aborbitadzi",
    category: "pre-order",
    description:
      "Firm corn akple with aborbitadzi, cooked fresh to order. Please order ahead.",
    ingredients: ["Akple", "Aborbitadzi", "Palm oil", "Fish or meat", "Pepper"],
    price: 50,
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
    id: "apaparansa",
    name: "Apaparansa",
    category: "pre-order",
    description:
      "Apaparansa — a rich, peppery palm-nut dish, best when cooked to order. Pre-order required.",
    ingredients: ["Apaparansa", "Crab", "Palm oil", "Onion", "Pepper"],
    price: 80,
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
    price: 100,
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
  {
    id: "salad-regular",
    name: "Salad (Regular)",
    category: "pre-order",
    description:
      "A fresh house salad of crisp greens and garden vegetables. Order ahead.",
    ingredients: ["Lettuce", "Tomato", "Cucumber", "Carrot", "Dressing"],
    price: 50,
    calories: 260,
    prepTime: 15,
    image: "/images/dish-starter.webp",
    spice: 0,
    badges: [],
    dietary: ["vegetarian", "gluten-free"],
    rating: 4.7,
    reviewCount: 48,
    serves: "One bowl",
  },
  {
    id: "special-salad",
    name: "Special Salad (Chicken or Fruit)",
    category: "pre-order",
    description:
      "Our loaded salad, made with grilled chicken or fresh fruit — your choice. Order ahead.",
    ingredients: ["Lettuce", "Grilled chicken or fruit", "Vegetables", "Dressing"],
    price: 100,
    calories: 420,
    prepTime: 20,
    image: "/images/dish-starter.webp",
    spice: 0,
    badges: ["new"],
    dietary: ["gluten-free"],
    rating: 4.8,
    reviewCount: 37,
    serves: "One bowl",
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
  "fufu-goat-light-soup",
  "goat-jollof",
  "apaparansa",
  "fried-rice-chicken",
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
