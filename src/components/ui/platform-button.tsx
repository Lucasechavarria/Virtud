import { Button } from "./button";

interface PlatformButtonProps {
  platformUrl?: string;
}

export const PlatformButton = ({
  platformUrl = "https://github.com/Lucasechavarria/plataforma-virtud",
}: PlatformButtonProps) => {
  const handlePlatformClick = () => {
    window.open(platformUrl, "_blank");
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <Button
        onClick={handlePlatformClick}
        size="lg"
        className="rounded-full h-16 w-16 p-0 bg-white hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 animate-bounce-soft border-2 border-virtud-orange-500 animate-pulse-glow"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F1fba1c7b9a614406a03397c54983bd78?format=webp&width=800"
          alt="Virtud Platform"
          className="w-10 h-10 object-contain"
        />
        <span className="sr-only">Acceder a Plataforma Virtud</span>
      </Button>
    </div>
  );
};
