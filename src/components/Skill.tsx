export default (props:{name: string, points: number}) => {
  const pointsArray = Array.from({ length: props.points }, (_, i) => i + 1);
  return (
    <div className="skill">
      <h3 className="text-xl font-bold">{props.name}</h3>
      <div className="flex gap-2 bg-zinc-800 border border-zinc-700 p-2 rounded-lg w-fit">
        {pointsArray.map((point) => (
          <div
            key={point}
            className="rounded min-w-5 min-h-5 bg-blue-600"
          >
          </div>
        ))}
      </div>
    </div>
  );
};
