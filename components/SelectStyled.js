export default function SelectStyled({ value, onChange, options=[] }){
  return (
    <div className="relative inline-block w-full">
      <select className="select-custom block w-full border rounded px-3 py-2" value={value} onChange={(e)=>onChange(e.target.value)}>
        {options.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
