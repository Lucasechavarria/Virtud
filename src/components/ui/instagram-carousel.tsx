import { useState, useEffect } from "react";
import {
  Instagram,
  Play,
  Heart,
  MessageCircle as Comment,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card } from "./card";
import { Button } from "./button";

interface InstagramPost {
  id: string;
  type: "image" | "video" | "reel" | "story";
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

// Simulated real posts from Virtud Instagram
const mockPosts: InstagramPost[] = [
  {
    id: "1",
    type: "image",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F4c88d4649474428eab8b62af83c0293e?format=webp&width=800",
    caption: "🥊 Clase de boxeo en acción! Mejora tu técnica y resistencia",
    likes: 156,
    comments: 23,
    timestamp: "2h",
  },
  {
    id: "2",
    type: "reel",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F85e22b6619204c9dafcac4a49c650a47?format=webp&width=800",
    caption: "🏹 Arquería Tradicional Coreana - Precisión y concentración",
    likes: 98,
    comments: 12,
    timestamp: "4h",
  },
  {
    id: "3",
    type: "image",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F174679ee85ea498184b7028ee6bb80d2?format=webp&width=800",
    caption: "🧘‍♂️ Tai Chi - Equilibrio entre mente y cuerpo",
    likes: 89,
    comments: 8,
    timestamp: "6h",
  },
  {
    id: "4",
    type: "image",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2Faee913c4127b4be6a7e6e1fdf7238176?format=webp&width=800",
    caption: "🥋 Kung Fu Shaolin - Tradición milenaria en acción",
    likes: 142,
    comments: 18,
    timestamp: "8h",
  },
  {
    id: "5",
    type: "reel",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F7768ffd104f94624901792fd1d80b7e5?format=webp&width=800",
    caption: "🤸‍♀️ Entrenamiento funcional de alta intensidad",
    likes: 187,
    comments: 31,
    timestamp: "12h",
  },
  {
    id: "6",
    type: "image",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F8cc7dbfc5cf6429fa50e652bc6e5fdd1?format=webp&width=800",
    caption: "🧘‍♀️ Yoga matutino - Inicia tu día con energía positiva",
    likes: 134,
    comments: 16,
    timestamp: "1d",
  },
  {
    id: "7",
    type: "image",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F1c5e01c0292448c68bf6b3467646d26a?format=webp&width=800",
    caption: "💃 Zumba - Diversión y cardio en una sola actividad",
    likes: 203,
    comments: 42,
    timestamp: "1d",
  },
  {
    id: "8",
    type: "reel",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F9d547f310ce540cfbe17a0863abf7478?format=webp&width=800",
    caption: "🛡️ Defensa Personal - Técnicas efectivas para todos",
    likes: 176,
    comments: 28,
    timestamp: "2d",
  },
];

export const InstagramCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visiblePosts, setVisiblePosts] = useState(4);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prev) => (prev + 1) % Math.max(1, mockPosts.length - visiblePosts + 1),
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [visiblePosts]);

  // Responsive visible posts
  useEffect(() => {
    const updateVisiblePosts = () => {
      if (window.innerWidth < 640) setVisiblePosts(1);
      else if (window.innerWidth < 768) setVisiblePosts(2);
      else if (window.innerWidth < 1024) setVisiblePosts(3);
      else setVisiblePosts(4);
    };

    updateVisiblePosts();
    window.addEventListener("resize", updateVisiblePosts);
    return () => window.removeEventListener("resize", updateVisiblePosts);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % Math.max(1, mockPosts.length - visiblePosts + 1),
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.max(1, mockPosts.length - visiblePosts + 1)) %
        Math.max(1, mockPosts.length - visiblePosts + 1),
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Instagram className="h-8 w-8 text-virtud-orange-500" />
          <h3 className="text-2xl font-bold text-virtud-gray-800">
            Síguenos en Instagram
          </h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="h-10 w-10 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="h-10 w-10 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / visiblePosts)}%)`,
            width: `${(mockPosts.length / visiblePosts) * 100}%`,
          }}
        >
          {mockPosts.map((post) => (
            <Card
              key={post.id}
              className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 flex-shrink-0"
              style={{ width: `${100 / mockPosts.length}%` }}
            >
              <div className="relative aspect-square">
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    {post.type === "reel" && (
                      <Play className="h-8 w-8 mx-auto mb-2" />
                    )}
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <Comment className="h-4 w-4" />
                        {post.comments}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Type indicator */}
                <div className="absolute top-2 right-2">
                  {post.type === "reel" && (
                    <div className="bg-black/70 rounded-full p-1">
                      <Play className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Timestamp */}
                <div className="absolute top-2 left-2">
                  <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {post.timestamp}
                  </div>
                </div>
              </div>

              <div className="p-3">
                <p className="text-sm text-virtud-gray-600 line-clamp-2">
                  {post.caption}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({
          length: Math.max(1, mockPosts.length - visiblePosts + 1),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-virtud-orange-500 w-6"
                : "bg-virtud-gray-300 hover:bg-virtud-gray-400"
            }`}
          />
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href="https://www.instagram.com/virtud.gym?igsh=dnZpc2c4djdqeDRm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold"
        >
          <Instagram className="h-5 w-5" />
          Seguir @virtudgym
        </a>
      </div>
    </div>
  );
};
