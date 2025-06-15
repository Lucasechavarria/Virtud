import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./button";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        onClick={scrollToTop}
        size="lg"
        className="rounded-full h-12 w-12 p-0 bg-virtud-orange-500 hover:bg-virtud-orange-600 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <ArrowUp className="h-5 w-5 text-white" />
        <span className="sr-only">Volver arriba</span>
      </Button>
    </div>
  );
};
