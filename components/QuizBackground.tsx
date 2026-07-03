interface QuizBackgroundProps {
  images: readonly string[];
}

const DEFAULT_TILE_COUNT = 4;

function padTiles(images: readonly string[]): string[] {
  if (images.length === 0) return [];
  const tiles: string[] = [];
  for (let i = 0; i < DEFAULT_TILE_COUNT; i++) {
    tiles.push(images[i % images.length]);
  }
  return tiles;
}

export default function QuizBackground({ images }: QuizBackgroundProps) {
  const tiles = padTiles(images);

  return (
    <div
      className="quiz-background fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="grid h-full w-full grid-cols-2 grid-rows-2">
        {tiles.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="quiz-bg-tile bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
      <div className="quiz-bg-overlay absolute inset-0" />
    </div>
  );
}
