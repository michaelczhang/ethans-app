const BACKGROUNDS = [
  { src: "/backgrounds/pokemon-bg.png", alt: "Pokémon themed background" },
  { src: "/backgrounds/fortnite-bg.png", alt: "Fortnite themed background" },
  { src: "/backgrounds/starcraft-bg.png", alt: "StarCraft themed background" },
  { src: "/backgrounds/minecraft-bg.png", alt: "Minecraft themed background" },
] as const;

export default function QuizBackground() {
  return (
    <div className="quiz-background fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="grid h-full w-full grid-cols-2 grid-rows-2">
        {BACKGROUNDS.map((bg) => (
          <div
            key={bg.src}
            className="quiz-bg-tile bg-cover bg-center"
            style={{ backgroundImage: `url(${bg.src})` }}
          />
        ))}
      </div>
      <div className="quiz-bg-overlay absolute inset-0" />
    </div>
  );
}
