type Props = {
  current: number;
  total: number;
};

const HeroProgress = ({ current, total }: Props) => {
  return (
    <div className="flex items-center gap-3 text-sm text-white" dir="ltr">
      <span>{String(current).padStart(2, "0")}</span>

      <div className="h-px w-32 bg-white/40">
        <div
          className="h-full bg-white"
          style={{
            width: `${(current / total) * 100}%`,
          }}
        />
      </div>

      <span className="text-white/50">{String(total).padStart(2, "0")}</span>
    </div>
  );
};

export default HeroProgress;
