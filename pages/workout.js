import Navbar from '../components/Navbar';
import { generateWorkouts } from '../lib/data';

export default function Workouts(){
  const data = generateWorkouts({ daysPerWeek: 4, equipment: 'mixed' });
  return (
    <div>
      <Navbar />
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Workout Plan</h1>
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((d,idx)=>(
            <div key={idx} className="border rounded p-4">
              <div className="font-semibold mb-2">{d.title}</div>
              <ul className="list-disc pl-5">
                {d.exercises.map((e,i)=>(<li key={i}>{e}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
