export default function Stepper({ value, min=0, max=999, step=1, onChange }){
  const dec = ()=> onChange(Math.max(min, value - step));
  const inc = ()=> onChange(Math.min(max, value + step));
  return (
    <div className="inline-flex items-center border rounded-md overflow-hidden">
      <button onClick={dec} className="px-3 py-1 bg-slate-50 hover:bg-slate-100">-</button>
      <input type="number" className="w-20 text-center px-2" value={value} onChange={(e)=> onChange(Number(e.target.value || 0))} />
      <button onClick={inc} className="px-3 py-1 bg-slate-50 hover:bg-slate-100">+</button>
    </div>
  );
}
