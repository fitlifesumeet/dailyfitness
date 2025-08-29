import Link from 'next/link';

export default function Navbar(){ 
  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-xl font-bold">OneStopFitness</div>
          <div className="flex gap-4">
            <Link href="/"><a className="py-2 px-3 rounded hover:bg-slate-100">Plan</a></Link>
            <Link href="/workout"><a className="py-2 px-3 rounded hover:bg-slate-100">Workouts</a></Link>
            <a className="py-2 px-3 rounded hover:bg-slate-100" href="#" onClick={e=>{e.preventDefault(); alert('Share feature coming soon')}}>Share</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
