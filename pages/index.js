import { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Stepper from '../components/Stepper';
import SelectStyled from '../components/SelectStyled';
import { CHART_COLORS } from '../lib/chartColors';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { mifflin, activityFactors, adjustCalories, buildWeeklyMeals } from '../lib/data';

export default function Home(){
  const [age, setAge] = useState(30);
  const [sex, setSex] = useState('male');
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(75);
  const [activity, setActivity] = useState('moderate');
  const [goal, setGoal] = useState('muscle_gain');
  const [diet, setDiet] = useState('indian_vegetarian');
  const [mealsPerDay, setMealsPerDay] = useState(4);

  const bmr = useMemo(()=> mifflin({ sex, weightKg: weight, heightCm: height, age }), [sex,weight,height,age]);
  const tdee = useMemo(()=> Math.round(bmr * (activityFactors[activity]||1.55)), [bmr,activity]);
  const calories = useMemo(()=> Math.round(adjustCalories(tdee, goal)), [tdee,goal]);
  const macros = useMemo(()=> ({ protein: Math.round(weight*1.6), carbs: Math.round(calories*0.5/4), fat: Math.round((calories*0.25)/9) }), [weight,calories]);

  const macroData = [
    { name: 'Protein', value: macros.protein },
    { name: 'Carbs', value: macros.carbs },
    { name: 'Fat', value: macros.fat },
  ];

  const weeklyMeals = useMemo(()=> buildWeeklyMeals({ diet, mealsPerDay }), [diet, mealsPerDay]);

  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <div className="grid md:grid-cols-3 gap-6">
          <section className="md:col-span-1 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Profile</h2>
            <div className="space-y-2">
              <div><label className="text-sm">Sex</label><SelectStyled value={sex} onChange={setSex} options={[{value:'male',label:'Male'},{value:'female',label:'Female'}]} /></div>
              <div><label className="text-sm">Age</label><Stepper value={age} onChange={setAge} min={10} max={100} /></div>
              <div><label className="text-sm">Height (cm)</label><Stepper value={height} onChange={setHeight} min={100} max={250} /></div>
              <div><label className="text-sm">Weight (kg)</label><Stepper value={weight} onChange={setWeight} min={30} max={200} /></div>
              <div><label className="text-sm">Activity</label><SelectStyled value={activity} onChange={setActivity} options={[{value:'sedentary',label:'Sedentary'},{value:'light',label:'Light'},{value:'moderate',label:'Moderate'},{value:'active',label:'Active'},{value:'very',label:'Very Active'}]} /></div>
              <div><label className="text-sm">Goal</label><SelectStyled value={goal} onChange={setGoal} options={[{value:'fat_loss',label:'Fat loss'},{value:'muscle_gain',label:'Muscle gain'},{value:'general_fitness',label:'General fitness'},{value:'endurance',label:'Endurance'}]} /></div>
              <div><label className="text-sm">Diet</label><SelectStyled value={diet} onChange={setDiet} options={[{value:'balanced',label:'Balanced'},{value:'vegetarian',label:'Vegetarian'},{value:'indian_vegetarian',label:'Indian Vegetarian'},{value:'vegan',label:'Vegan'}]} /></div>
              <div><label className="text-sm">Meals/Day</label><Stepper value={mealsPerDay} onChange={setMealsPerDay} min={3} max={6} /></div>
            </div>
          </section>

          <section className="md:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Targets</h2>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="p-3 border rounded"><div className="text-sm">BMR</div><div className="text-xl font-bold">{bmr} kcal</div></div>
                <div className="p-3 border rounded"><div className="text-sm">TDEE</div><div className="text-xl font-bold">{tdee} kcal</div></div>
                <div className="p-3 border rounded"><div className="text-sm">Calories</div><div className="text-xl font-bold">{calories} kcal</div></div>
              </div>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={macroData} dataKey="value" nameKey="name" outerRadius={80} label>
                      {macroData.map((_,i)=>(<Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">7-Day Meal Plan</h2>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {weeklyMeals.map((day,idx)=>(
                  <div key={idx} className="border rounded p-3">
                    <div className="font-semibold mb-2">Day {idx+1}</div>
                    <ul className="list-disc pl-5">
                      {day.map((m,i)=>(<li key={i}>{m.meal} — {m.name} ({m.kcal} kcal)</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
