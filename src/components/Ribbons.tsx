const RibbonTrack = ({ words }: { words: string[] }) => (
  <div className="ribbon-track">
    {/* Rendered twice so the -50% translate loops seamlessly */}
    {[0, 1].map((copy) => (
      <span key={copy}>
        {words.map((w) => (
          <span key={w}>
            {w} <i>✱</i>
          </span>
        ))}
      </span>
    ))}
  </div>
);

export const Ribbons = ({
  green,
  pink,
}: {
  green: string[];
  pink: string[];
}) => (
  <div className="ribbons" aria-hidden="true">
    <div className="ribbon ribbon-pink">
      <RibbonTrack words={pink} />
    </div>
    <div className="ribbon ribbon-green">
      <RibbonTrack words={green} />
    </div>
  </div>
);
