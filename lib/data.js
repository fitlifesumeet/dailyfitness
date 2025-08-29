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
