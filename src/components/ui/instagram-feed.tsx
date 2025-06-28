import { Instagram, Play, Heart, MessageCircle as Comment } from "lucide-react";
import { Card } from "./card";

interface InstagramPost {
  id: string;
  type: "image" | "video" | "reel" | "story";
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

const mockPosts: InstagramPost[] = [
  {
    id: "1",
    type: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    caption: "💪 Sesión de entrenamiento funcional en Virtud",
    likes: 124,
    comments: 15,
    timestamp: "2h",
  },
  {
    id: "2",
    type: "reel",
    imageUrl:
      "https://images.unsplash.com/photo-1544216717-3bbf52512659?w=400&h=400&fit=crop",
    caption: "🧘‍♀️ Medicina Tradicional China - Acupuntura",
    likes: 89,
    comments: 8,
    timestamp: "5h",
  },
  {
    id: "3",
    type: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=400&fit=crop",
    caption: "🏋️‍♂️ Nuevas instalaciones de pesas",
    likes: 156,
    comments: 22,
    timestamp: "1d",
  },
  {
    id: "4",
    type: "story",
    imageUrl:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=400&fit=crop",
    caption: "📅 Reserva tu turno online",
    likes: 67,
    comments: 5,
    timestamp: "1d",
  },
];

export const InstagramFeed = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <Instagram className="h-8 w-8 text-virtud-orange-500" />
        <h3 className="text-2xl font-bold text-virtud-gray-800">
          Síguenos en Instagram
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockPosts.map((post) => (
          <Card
            key={post.id}
            className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="relative aspect-square">
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  {post.type === "reel" && (
                    <Play className="h-8 w-8 mx-auto mb-2" />
                  )}
                  {post.type === "story" && (
                    <div className="w-8 h-8 rounded-full border-2 border-white mx-auto mb-2" />
                  )}
                  <div className="flex items-center gap-4 text-sm">
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
                {post.type === "story" && (
                  <div className="w-3 h-3 rounded-full bg-virtud-orange-500" />
                )}
              </div>
            </div>

            <div className="p-3">
              <p className="text-sm text-virtud-gray-600 line-clamp-2">
                {post.caption}
              </p>
              <span className="text-xs text-virtud-gray-400 mt-1">
                {post.timestamp}
              </span>
            </div>
          </Card>
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
          Ver más en Instagram
        </a>
      </div>
    </div>
  );
};
