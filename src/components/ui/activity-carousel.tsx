import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

interface Activity {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  schedule?: string;
}

interface ActivityCarouselProps {
  title: string;
  subtitle: string;
  activities: Activity[];
  accentColor?: string;
}

export const ActivityCarousel = ({
  title,
  subtitle,
  activities,
  accentColor = "virtud-orange-500",
}: ActivityCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activities.length]);

  // Responsive visible cards
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % activities.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + activities.length) % activities.length,
    );
  };

  // Calculate which cards to show based on current index and visible cards
  const getVisibleActivities = () => {
    const result = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % activities.length;
      result.push(activities[index]);
    }
    return result;
  };

  const visibleActivities = getVisibleActivities();

  return (
    <div className="w-full py-16">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-virtud-gray-800 dark:text-white mb-3"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-virtud-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Side Navigation Arrows */}
        {activities.length > visibleCards && (
          <>
            <Button
              variant="ghost"
              size="lg"
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6 text-virtud-gray-800" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6 text-virtud-gray-800" />
            </Button>
          </>
        )}

        {/* Cards Container */}
        <div className="overflow-hidden mx-8">
          <motion.div
            key={currentIndex}
            className={`grid gap-6 ${
              visibleCards === 1
                ? "grid-cols-1"
                : visibleCards === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
            }`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {visibleActivities.map((activity, index) => (
              <motion.div
                key={`${activity.id}-${currentIndex}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white dark:bg-gray-800 h-full">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={activity.imageUrl}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Floating Reserve Button */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Button
                        size="lg"
                        className={`w-full bg-${accentColor} hover:bg-virtud-orange-600 text-white font-semibold shadow-xl`}
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        Reservar Clase
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-virtud-gray-800 dark:text-white mb-2 group-hover:text-virtud-orange-500 dark:group-hover:text-virtud-orange-400 transition-colors duration-300">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-virtud-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                      {activity.description}
                    </p>
                    {activity.schedule && (
                      <div className="flex items-center gap-2 text-virtud-orange-600 font-medium">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{activity.schedule}</span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Indicators - Only show if there are more activities than visible cards */}
        {activities.length > visibleCards && (
          <div className="flex justify-center mt-8 gap-3">
            {activities.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? `bg-${accentColor} w-8`
                    : "bg-virtud-gray-300 w-3 hover:bg-virtud-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
