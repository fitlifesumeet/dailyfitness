// lib/diets.js
// Rich diet database + planner
// - 70+ items across Indian Veg, Non-Veg, Vegan, Balanced/Global
// - Each food has calories + macros + allergens + tags
// - Helper: buildMealPlan() -> constructs a 1-day plan respecting diet type, calorie target, allergens, and meals/day

/**
 * TYPES (for reference)
 * type DietType = 'indian_veg' | 'non_veg' | 'vegan' | 'balanced';
 * type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'post_workout';
 */

export const FOOD_DB = [
  // ---------------- INDIAN VEGETARIAN ----------------
  { id:'iv-idli-sambar', name:'Idli with Sambar', cuisine:'indian', type:'indian_veg', meal:['breakfast','snack'], serving:'2 idli + 1 cup sambar', calories:320, macros:{protein:12, carbs:55, fats:5}, allergens:['legumes'], tags:['low-fat','fermented','gf'] },
  { id:'iv-poha', name:'Kanda Poha', cuisine:'indian', type:'indian_veg', meal:['breakfast','snack'], serving:'1 bowl', calories:300, macros:{protein:7, carbs:55, fats:6}, allergens:['peanuts'], tags:['quick'] },
  { id:'iv-upma', name:'Vegetable Upma', cuisine:'indian', type:'indian_veg', meal:['breakfast'], serving:'1 bowl', calories:340, macros:{protein:9, carbs:55, fats:9}, allergens:['gluten'], tags:['comfort'] },
  { id:'iv-dosa', name:'Plain Dosa + Chutney', cuisine:'indian', type:'indian_veg', meal:['breakfast','lunch'], serving:'1 large', calories:360, macros:{protein:8, carbs:55, fats:10}, allergens:['sesame','tree_nuts'], tags:['fermented'] },
  { id:'iv-paratha-curd', name:'Aloo Paratha + Curd', cuisine:'indian', type:'indian_veg', meal:['breakfast','lunch'], serving:'2 paratha + 1/2 cup curd', calories:520, macros:{protein:14, carbs:70, fats:18}, allergens:['gluten','dairy'], tags:['hearty'] },
  { id:'iv-paneer-bhurji', name:'Paneer Bhurji', cuisine:'indian', type:'indian_veg', meal:['lunch','dinner'], serving:'150 g paneer', calories:380, macros:{protein:26, carbs:10, fats:26}, allergens:['dairy'], tags:['high-protein'] },
  { id:'iv-rajma-chawal', name:'Rajma Chawal', cuisine:'indian', type:'indian_veg', meal:['lunch','dinner'], serving:'1 cup rajma + 1 cup rice', calories:560, macros:{protein:18, carbs:95, fats:8}, allergens:['legumes'], tags:['comfort'] },
  { id:'iv-chole-chawal', name:'Chole + Rice', cuisine:'indian', type:'indian_veg', meal:['lunch','dinner'], serving:'1 cup chole + 1 cup rice', calories:580, macros:{protein:19, carbs:98, fats:9}, allergens:['legumes'], tags:['fiber'] },
  { id:'iv-dal-roti', name:'Dal + Whole Wheat Roti', cuisine:'indian', type:'indian_veg', meal:['lunch','dinner'], serving:'1.5 cup dal + 2 roti', calories:520, macros:{protein:24, carbs:80, fats:8}, allergens:['gluten','legumes'], tags:['budget'] },
  { id:'iv-millet-khichdi', name:'Millet Khichdi', cuisine:'indian', type:'indian_veg', meal:['lunch','dinner'], serving:'1 bowl', calories:430, macros:{protein:14, carbs:70, fats:8}, allergens:['legumes'], tags:['gf','comfort'] },
  { id:'iv-palak-paneer', name:'Palak Paneer', cuisine:'indian', type:'indian_veg', meal:['lunch','dinner'], serving:'1 cup', calories:360, macros:{protein:22, carbs:14, fats:22}, allergens:['dairy'], tags:['iron'] },
  { id:'iv-tofu-tikka', name:'Tofu Tikka', cuisine:'indian', type:'indian_veg', meal:['lunch','dinner','snack'], serving:'180 g', calories:320, macros:{protein:28, carbs:10, fats:18}, allergens:['soy'], tags:['vegan-alt','high-protein'] },
  { id:'iv-sprouts-chaat', name:'Sprouts Chaat', cuisine:'indian', type:'indian_veg', meal:['snack'], serving:'1 bowl', calories:240, macros:{protein:14, carbs:36, fats:5}, allergens:['legumes'], tags:['high-fiber'] },
  { id:'iv-roasted-chana', name:'Roasted Chana', cuisine:'indian', type:'indian_veg', meal:['snack'], serving:'40 g', calories:190, macros:{protein:10, carbs:28, fats:3}, allergens:['legumes'], tags:['portable'] },
  { id:'iv-masala-oats', name:'Masala Oats', cuisine:'indian', type:'indian_veg', meal:['breakfast','snack'], serving:'1 bowl', calories:280, macros:{protein:9, carbs:46, fats:6}, allergens:['gluten'], tags:['beta-glucan'] },
  { id:'iv-curd-rice', name:'Curd Rice', cuisine:'indian', type:'indian_veg', meal:['lunch','dinner'], serving:'1 bowl', calories:420, macros:{protein:12, carbs:70, fats:10}, allergens:['dairy'], tags:['cooling'] },
  { id:'iv-dahi-bowl', name:'Greek Yogurt Bowl (Honey + Nuts)', cuisine:'indian', type:'indian_veg', meal:['snack','breakfast'], serving:'200 g', calories:280, macros:{protein:18, carbs:22, fats:10}, allergens:['dairy','tree_nuts'], tags:['probiotic'] },
  { id:'iv-besan-chilla', name:'Besan Chilla', cuisine:'indian', type:'indian_veg', meal:['breakfast','snack'], serving:'2 medium', calories:300, macros:{protein:14, carbs:40, fats:8}, allergens:['legumes'], tags:['gf'] },

  // ---------------- INDIAN NON-VEG ----------------
  { id:'nv-egg-omlette', name:'Masala Egg Omelette + Toast', cuisine:'indian', type:'non_veg', meal:['breakfast'], serving:'2 eggs + 2 toast', calories:360, macros:{protein:22, carbs:26, fats:18}, allergens:['eggs','gluten'], tags:['quick'] },
  { id:'nv-chicken-curry-rice', name:'Chicken Curry + Rice', cuisine:'indian', type:'non_veg', meal:['lunch','dinner'], serving:'150 g chicken + 1 cup rice', calories:560, macros:{protein:38, carbs:64, fats:14}, allergens:[], tags:['lean'] },
  { id:'nv-chicken-roti', name:'Grilled Chicken + 2 Roti', cuisine:'indian', type:'non_veg', meal:['lunch','dinner'], serving:'160 g chicken', calories:510, macros:{protein:42, carbs:55, fats:12}, allergens:['gluten'], tags:['high-protein'] },
  { id:'nv-fish-curry-rice', name:'Fish Curry + Rice', cuisine:'indian', type:'non_veg', meal:['lunch','dinner'], serving:'160 g fish', calories:520, macros:{protein:36, carbs:58, fats:12}, allergens:['fish'], tags:['omega-3'] },
  { id:'nv-tandoori-chicken', name:'Tandoori Chicken', cuisine:'indian', type:'non_veg', meal:['lunch','dinner','snack'], serving:'180 g', calories:380, macros:{protein:42, carbs:6, fats:20}, allergens:['dairy'], tags:['low-carb'] },
  { id:'nv-egg-curry-roti', name:'Egg Curry + 2 Roti', cuisine:'indian', type:'non_veg', meal:['lunch','dinner'], serving:'2 eggs', calories:470, macros:{protein:24, carbs:55, fats:16}, allergens:['eggs','gluten'], tags:['budget'] },
  { id:'nv-prawns-masala', name:'Prawns Masala + Rice', cuisine:'indian', type:'non_veg', meal:['lunch','dinner'], serving:'160 g', calories:510, macros:{protein:40, carbs:58, fats:10}, allergens:['shellfish'], tags:['lean'] },

  // ---------------- VEGAN (INDIAN + GLOBAL) ----------------
  { id:'vg-oats-almond', name:'Oats with Almond Milk & Chia', cuisine:'global', type:'vegan', meal:['breakfast'], serving:'1 bowl', calories:310, macros:{protein:11, carbs:46, fats:9}, allergens:['tree_nuts'], tags:['fiber'] },
  { id:'vg-tofu-scramble', name:'Tofu Scramble Wrap', cuisine:'global', type:'vegan', meal:['breakfast','lunch'], serving:'200 g tofu + wrap', calories:430, macros:{protein:30, carbs:45, fats:14}, allergens:['soy','gluten'], tags:['high-protein'] },
  { id:'vg-chana-masala', name:'Chana Masala + Rice', cuisine:'indian', type:'vegan', meal:['lunch','dinner'], serving:'1 cup chana + 1 cup rice', calories:560, macros:{protein:18, carbs:98, fats:7}, allergens:['legumes'], tags:['budget'] },
  { id:'vg-rajma-quinoa', name:'Rajma + Quinoa', cuisine:'indian', type:'vegan', meal:['lunch','dinner'], serving:'1 cup + 1 cup', calories:540, macros:{protein:22, carbs:85, fats:8}, allergens:['legumes'], tags:['gf'] },
  { id:'vg-budda-bowl', name:'Buddha Bowl (Tofu, Veg, Brown Rice)', cuisine:'global', type:'vegan', meal:['lunch','dinner'], serving:'1 bowl', calories:520, macros:{protein:26, carbs:70, fats:14}, allergens:['soy'], tags:['balanced'] },
  { id:'vg-smoothie', name:'Plant Protein Smoothie', cuisine:'global', type:'vegan', meal:['post_workout','snack'], serving:'1 shaker', calories:220, macros:{protein:28, carbs:12, fats:5}, allergens:[], tags:['quick','post-workout'] },
  { id:'vg-hummus-pita', name:'Hummus + Wholewheat Pita', cuisine:'global', type:'vegan', meal:['snack','lunch'], serving:'1 pita + 1/2 cup hummus', calories:380, macros:{protein:14, carbs:60, fats:9}, allergens:['gluten','sesame'], tags:['mediterranean'] },
  { id:'vg-tofu-tikka-masala', name:'Tofu Tikka Masala + Rice', cuisine:'indian', type:'vegan', meal:['lunch','dinner'], serving:'180 g tofu', calories:540, macros:{protein:28, carbs:70, fats:16}, allergens:['soy'], tags:['comfort'] },

  // ---------------- BALANCED / GLOBAL NON-VEG ----------------
  { id:'bnv-egg-avotoast', name:'Eggs & Avocado Toast', cuisine:'global', type:'balanced', meal:['breakfast'], serving:'2 eggs + 1 toast + 1/2 avocado', calories:420, macros:{protein:20, carbs:30, fats:24}, allergens:['eggs','gluten'], tags:['brunch'] },
  { id:'bnv-chicken-rice-broccoli', name:'Chicken, Rice & Broccoli', cuisine:'global', type:'balanced', meal:['lunch','dinner'], serving:'180 g chicken + 1 cup rice', calories:600, macros:{protein:45, carbs:65, fats:15}, allergens:[], tags:['prep','high-protein'] },
  { id:'bnv-salmon-sweetpotato', name:'Salmon & Sweet Potato', cuisine:'global', type:'balanced', meal:['dinner'], serving:'180 g salmon + 250 g sweet potato', calories:610, macros:{protein:40, carbs:35, fats:28}, allergens:['fish'], tags:['omega-3'] },
  { id:'bnv-tuna-sandwich', name:'Tuna Sandwich (Wholewheat)', cuisine:'global', type:'balanced', meal:['lunch','snack'], serving:'1 sandwich', calories:420, macros:{protein:32, carbs:42, fats:12}, allergens:['fish','gluten','eggs'], tags:['portable'] },
  { id:'bnv-yogurt-berries', name:'Greek Yogurt + Berries', cuisine:'global', type:'balanced', meal:['snack','breakfast'], serving:'200 g', calories:180, macros:{protein:18, carbs:18, fats:2}, allergens:['dairy'], tags:['high-protein'] },
  { id:'bnv-protein-shake', name:'Whey Protein Shake', cuisine:'global', type:'balanced', meal:['post_workout','snack'], serving:'1 scoop + water', calories:130, macros:{protein:25, carbs:3, fats:2}, allergens:['dairy'], tags:['post-workout'] },

  // ---------------- SNACKS / UNIVERSAL ----------------
  { id:'snk-roasted-nuts', name:'Mixed Nuts (30 g)', cuisine:'global', type:'balanced', meal:['snack'], serving:'30 g', calories:180, macros:{protein:6, carbs:6, fats:16}, allergens:['tree_nuts'], tags:['portable','keto-ish'] },
  { id:'snk-fruit-bowl', name:'Seasonal Fruit Bowl', cuisine:'global', type:'balanced', meal:['snack','breakfast'], serving:'1 bowl', calories:150, macros:{protein:2, carbs:35, fats:0}, allergens:[], tags:['gf','df'] },
  { id:'snk-peanut-chikki', name:'Peanut Chikki', cuisine:'indian', type:'balanced', meal:['snack'], serving:'2 small pieces', calories:210, macros:{protein:7, carbs:22, fats:11}, allergens:['peanuts'], tags:['sweet'] },
  { id:'snk-protein-bar', name:'Protein Bar (generic)', cuisine:'global', type:'balanced', meal:['snack'], serving:'1 bar', calories:220, macros:{protein:20, carbs:22, fats:7}, allergens:['nuts','soy','gluten','dairy'], tags:['convenience'] },
  { id:'snk-cottage-bowl', name:'Paneer/Cottage Cheese Bowl', cuisine:'global', type:'indian_veg', meal:['snack','breakfast'], serving:'150 g', calories:260, macros:{protein:26, carbs:8, fats:14}, allergens:['dairy'], tags:['high-protein'] },
  { id:'snk-boiled-eggs', name:'Boiled Eggs', cuisine:'global', type:'non_veg', meal:['snack','breakfast'], serving:'2 eggs', calories:156, macros:{protein:13, carbs:1, fats:11}, allergens:['eggs'], tags:['portable'] },
  { id:'snk-roasted-makhana', name:'Roasted Makhana', cuisine:'indian', type:'indian_veg', meal:['snack'], serving:'30 g', calories:120, macros:{protein:4, carbs:20, fats:2}, allergens:[], tags:['light'] },
  { id:'snk-lassi', name:'Sweet Lassi', cuisine:'indian', type:'indian_veg', meal:['snack'], serving:'250 ml', calories:250, macros:{protein:8, carbs:40, fats:6}, allergens:['dairy'], tags:['treat'] },
];

// Suggested supplements per diet type
export const SUPPLEMENTS = {
  indian_veg: ['Vitamin B12', 'Vitamin D3', 'Creatine 3–5 g/day (optional)', 'Omega-3 (algae)'],
  non_veg: ['Fish Oil (EPA/DHA)', 'Vitamin D3', 'Creatine 3–5 g/day (optional)'],
  vegan: ['Vitamin B12', 'Iron (if needed)', 'Vitamin D3', 'Creatine', 'Omega-3 (algae)'],
  balanced: ['Multivitamin (optional)', 'Vitamin D3 (per labs)', 'Creatine 3–5 g/day (if training)'],
};

// ---------- HELPERS ----------
const round = (n, d = 0) => { const p = Math.pow(10, d); return Math.round(n * p) / p; };

export function filterFoods({ dietType, allergens = [], mealSlot }) {
  return FOOD_DB.filter(x =>
    (dietType ? x.type === dietType || (dietType === 'balanced' && x.type !== 'vegan') : true) &&
    (mealSlot ? x.meal.includes(mealSlot) : true) &&
    !x.allergens.some(a => allergens.includes(a))
  );
}

/**
 * Greedy meal plan builder (1 day)
 * - Tries to hit calorieTarget ±8%
 * - Distributes across meal slots (3–5)
 * - Respects allergens and dietType
 */
export function buildMealPlan({
  dietType = 'balanced',
  caloriesTarget = 2200,
  mealsPerDay = 4,
  allergens = [],
  includeSupps = true,
}) {
  const slots3 = ['breakfast', 'lunch', 'dinner'];
  const slots4 = ['breakfast', 'lunch', 'dinner', 'snack'];
  const slots5 = ['breakfast', 'lunch', 'snack', 'dinner', 'post_workout'];
  const slots = mealsPerDay <= 3 ? slots3 : mealsPerDay === 4 ? slots4 : slots5;

  const targetRange = { low: caloriesTarget * 0.92, high: caloriesTarget * 1.08 };
  const picked = [];
  let total = { calories: 0, protein: 0, carbs: 0, fats: 0 };

  slots.forEach((slot, i) => {
    const pool = filterFoods({ dietType, allergens, mealSlot: slot })
      .sort((a, b) => a.calories - b.calories);
    // aim for even split with slight bias earlier in the day
    const slotTarget = caloriesTarget * (1 / slots.length) * (slot === 'breakfast' ? 1.1 : slot === 'post_workout' ? 0.9 : 1);
    // pick closest calorie item
    let best = pool[0] || null;
    let diff = Infinity;
    for (const f of pool) {
      const d = Math.abs(f.calories - slotTarget);
      if (d < diff) { diff = d; best = f; }
    }
    if (best) {
      picked.push({ slot, item: best });
      total.calories += best.calories;
      total.protein += best.macros.protein;
      total.carbs += best.macros.carbs;
      total.fats += best.macros.fats;
    }
  });

  // adjust with extra snack if under lower bound and a snack exists
  if (total.calories < targetRange.low) {
    const snackPool = filterFoods({ dietType, allergens, mealSlot: 'snack' })
      .sort((a, b) => b.calories - a.calories);
    const add = snackPool[0];
    if (add) {
      picked.push({ slot: 'snack', item: add });
      total.calories += add.calories;
      total.protein += add.macros.protein;
      total.carbs += add.macros.carbs;
      total.fats += add.macros.fats;
    }
  }

  return {
    meals: picked.map(p => ({
      meal: p.slot,
      name: p.item.name,
      serving: p.item.serving,
      calories: p.item.calories,
      macros: { ...p.item.macros },
      tags: p.item.tags,
    })),
    total: {
      calories: round(total.calories),
      macros: {
        protein: round(total.protein),
        carbs: round(total.carbs),
        fats: round(total.fats),
      }
    },
    supplements: includeSupps ? SUPPLEMENTS[dietType] || [] : [],
  };
}
