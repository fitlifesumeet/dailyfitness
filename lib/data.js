export const activityFactors = { sedentary:1.2, light:1.375, moderate:1.55, active:1.725, very:1.9 };
export const mifflin = ({ sex, weightKg, heightCm, age })=>{
  const base = 10*weightKg + 6.25*heightCm - 5*age;
  return sex==='male'? base+5 : base-161;
};
export const adjustCalories = (tdee, goal)=> goal==='fat_loss'? tdee*0.8 : goal==='muscle_gain'? tdee*1.15 : tdee;

export const RECIPES = [
  { id:'r-poha', name:'Poha', diet:['indian_vegetarian','vegetarian','vegan'], kcal:360, protein:10, carbs:60, fat:8, ingredients:['Poha','Peanuts','Onion'] , meal:'breakfast' },
  { id:'r-dal', name:'Dal + Roti', diet:['indian_vegetarian','vegetarian'], kcal:520, protein:24, carbs:80, fat:8, ingredients:['Dal','Roti'] , meal:'lunch' },
  { id:'r-paneer', name:'Paneer Tikka Bowl', diet:['indian_vegetarian','vegetarian'], kcal:560, protein:38, carbs:55, fat:18, ingredients:['Paneer','Rice','Peppers'], meal:'dinner' },
  { id:'r-smoothie', name:'Protein Smoothie', diet:['balanced','high_protein','vegetarian','vegan'], kcal:300, protein:30, carbs:35, fat:5, ingredients:['Protein powder','Banana'], meal:'snack' },
];

export function buildWeeklyMeals({ diet, mealsPerDay }){
  const pool = RECIPES.filter(r=> r.diet.includes(diet) || r.diet.includes('balanced') );
  const slots = mealsPerDay===3? ['breakfast','lunch','dinner'] : ['breakfast','lunch','dinner','snack'];
  const week = [];
  for(let d=0; d<7; d++){
    const day = slots.map((slot,i)=> {
      const arr = pool.filter(p=> p.meal===slot);
      return arr.length? arr[(d+i)%arr.length] : pool[(d+i)%pool.length];
    });
    week.push(day);
  }
  return week;
}

/* Simple workout generator for demo */
export function generateWorkouts({ daysPerWeek, equipment }){
  const days = [];
  const base = [
    ['Squats','Push-ups','Plank 45s'],
    ['Deadlifts','Rows','Hanging knee raises'],
    ['Lunges','Overhead press','Farmer carry'],
    ['Rest/Active recovery','Light cardio','Mobility'],
  ];
  for(let i=0;i<daysPerWeek;i++){
    days.push({ title: `Day ${i+1}`, exercises: base[i % base.length] });
  }
  return days;
}
// lib/data.js

// Diet Plans with Indian focus
// lib/data.js

// Diet Plans with Indian focus
export const dietPlans = {
  "Indian Vegetarian": [
    { meal: "Breakfast", items: ["2 Vegetable Parathas with Curd", "1 Glass Milk", "1 Apple"] },
    { meal: "Mid-Morning", items: ["Handful of Almonds", "1 Banana"] },
    { meal: "Lunch", items: ["2 Chapatis", "1 Cup Dal", "Mixed Veg Curry", "Salad", "Buttermilk"] },
    { meal: "Evening Snack", items: ["Sprouts Chaat", "Green Tea"] },
    { meal: "Dinner", items: ["2 Chapatis", "Paneer Curry", "Sauteed Veggies"] },
    { meal: "Supplements", items: ["Whey Protein (optional)", "Vitamin D3", "Iron (if needed)"] }
  ],
  "Indian Non-Vegetarian": [
    { meal: "Breakfast", items: ["2 Eggs Omelette with Veggies", "Brown Bread Toast", "Black Coffee"] },
    { meal: "Mid-Morning", items: ["Greek Yogurt", "Handful of Walnuts"] },
    { meal: "Lunch", items: ["1 Cup Brown Rice", "Chicken Curry", "Dal", "Salad"] },
    { meal: "Evening Snack", items: ["Boiled Eggs", "Green Tea"] },
    { meal: "Dinner", items: ["Grilled Fish/Chicken", "Steamed Veggies", "Chapati"] },
    { meal: "Supplements", items: ["Omega-3", "Multivitamins", "Whey Protein"] }
  ],
  "Vegan": [
    { meal: "Breakfast", items: ["Oats with Almond Milk", "Chia Seeds", "Berries"] },
    { meal: "Mid-Morning", items: ["Smoothie with Plant Protein", "Banana"] },
    { meal: "Lunch", items: ["Quinoa", "Rajma Curry", "Stir-Fried Veggies", "Salad"] },
    { meal: "Evening Snack", items: ["Roasted Chickpeas", "Herbal Tea"] },
    { meal: "Dinner", items: ["Tofu Curry", "2 Whole Wheat Chapatis", "Vegetable Soup"] },
    { meal: "Supplements", items: ["Vitamin B12", "Iron", "Vitamin D"] }
  ],
  "Balanced": [
    { meal: "Breakfast", items: ["Vegetable Upma", "1 Glass Buttermilk"] },
    { meal: "Mid-Morning", items: ["Fruits Bowl", "Handful of Seeds"] },
    { meal: "Lunch", items: ["Chapati", "Dal", "Paneer/Chicken", "Veggies", "Salad"] },
    { meal: "Evening Snack", items: ["Protein Shake", "Nuts"] },
    { meal: "Dinner", items: ["Chapati", "Light Curry (Dal/Chicken/Fish/Tofu)", "Steamed Vegetables"] },
    { meal: "Supplements", items: ["Multivitamins", "Vitamin D3", "Collagen Peptides"] }
  ]
};

// Workout Plans (Sets & Reps included)
export const workouts = {
  "Strength Training": [
    { day: "Monday", focus: "Chest & Triceps", exercises: [
      { name: "Bench Press", sets: 4, reps: "8-10" },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-12" },
      { name: "Tricep Dips", sets: 3, reps: "12-15" }
    ]},
    { day: "Tuesday", focus: "Back & Biceps", exercises: [
      { name: "Pull-Ups", sets: 4, reps: "8-12" },
      { name: "Barbell Row", sets: 4, reps: "8-10" },
      { name: "Bicep Curls", sets: 3, reps: "12-15" }
    ]},
    { day: "Wednesday", focus: "Legs", exercises: [
      { name: "Squats", sets: 4, reps: "8-10" },
      { name: "Lunges", sets: 3, reps: "12-14" },
      { name: "Leg Press", sets: 3, reps: "10-12" }
    ]},
    { day: "Friday", focus: "Shoulders & Core", exercises: [
      { name: "Overhead Press", sets: 4, reps: "8-10" },
      { name: "Lateral Raises", sets: 3, reps: "12-15" },
      { name: "Plank", sets: 3, reps: "60s hold" }
    ]}
  ],
  "Fat Loss / Conditioning": [
    { day: "Monday", focus: "HIIT", exercises: [
      { name: "Burpees", sets: 4, reps: "20" },
      { name: "Jump Squats", sets: 4, reps: "15" },
      { name: "Mountain Climbers", sets: 4, reps: "30s" }
    ]},
    { day: "Wednesday", focus: "Circuit Training", exercises: [
      { name: "Push-ups", sets: 3, reps: "15" },
      { name: "Bodyweight Squats", sets: 3, reps: "20" },
      { name: "Jump Rope", sets: 5, reps: "1 min" }
    ]}
  ],
  "General Fitness": [
    { day: "3x per week", focus: "Full Body", exercises: [
      { name: "Push-ups", sets: 3, reps: "12-15" },
      { name: "Pull-ups", sets: 3, reps: "8-10" },
      { name: "Bodyweight Squats", sets: 3, reps: "15" },
      { name: "Plank", sets: 3, reps: "45s hold" }
    ]}
  ]
};
