export default (props:{name: string, points: number, years?:number}) => {
  const pointsArray = Array.from({ length: 10}, (_, i) => i + 1);

  const colors =[
    'bg-red-500',
    'bg-orange-500',
    'bg-orange-400',
    'bg-yellow-500',
    'bg-yellow-400',
    'bg-yellow-300',
    'bg-green-200',
    'bg-green-300',
    'bg-green-400',
    'bg-green-500',


  ]

  return (
    <div className="skill">
      <h4 className="text-xl font-bold">{props.name} {props.years && <span className="text-lg">({props.years} yrs)</span>}</h4>
      <div className=" bg-zinc-800 border border-zinc-700 p-2 rounded-lg w-fit">
        <div className="flex gap-2">
        {pointsArray.map((point) => (
          <div
            key={point}
            className={`rounded min-w-5 min-h-5 ${ point > props.points ? 'bg-transparent' : colors[point - 1]}`}
          >
          </div>
        ))}
      </div>
        </div>

    </div>
  );
};
