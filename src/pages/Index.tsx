import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Dumbbell,
  Heart,
  Users,
  Calendar,
  Award,
  MapPin,
  Clock,
  Star,
  Shield,
  Leaf,
  Target,
  ExternalLink,
  Zap,
  Activity,
  UserCheck,
  Phone,
  Mail,
  TrendingUp,
  Flame,
  MessageCircle,
  Instagram,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { PlatformButton } from "@/components/ui/platform-button";
import { InstagramCarousel } from "@/components/ui/instagram-carousel";
import { ActivityCarousel } from "@/components/ui/activity-carousel";
import { ContactForm } from "@/components/ui/contact-form";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { NewsletterSignup } from "@/components/ui/newsletter-signup";

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Using real activity flyers from Virtud
  const heroImages = [
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F4c88d4649474428eab8b62af83c0293e?format=webp&width=800",
      title: "Boxeo de Alto Rendimiento",
      description: "Lunes a Viernes 06:00 a 22:00 - Por día 6.90€, por mes 30€",
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F7768ffd104f94624901792fd1d80b7e5?format=webp&width=800",
      title: "Entrenamiento Funcional",
      description: "Martes, Jueves y Viernes 19hs - Alta intensidad",
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F85e22b6619204c9dafcac4a49c650a47?format=webp&width=800",
      title: "Arquería Tradicional Coreana",
      description: "Sábados 10hs - Precisión y concentración",
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F9d547f310ce540cfbe17a0863abf7478?format=webp&width=800",
      title: "Defensa Personal",
      description: "Martes y Jueves 19hs - Técnicas efectivas",
    },
    {
      url: "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2Faee913c4127b4be6a7e6e1fdf7238176?format=webp&width=800",
      title: "Kung Fu Shaolin",
      description:
        "Lunes 19hs, Miércoles 18hs, Sábados - Artes marciales tradicionales",
    },
  ];

  // Activities for carousels
  const fitnessActivities = [
    {
      id: "funcional",
      title: "Funcional",
      description:
        "Ejercicios que mejoran tu rendimiento en actividades cotidianas y deportivas",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F33847b76e1344f04af80b472cc52e0cb?format=webp&width=800",
      schedule: "Mar, Jue, Vie 19hs",
    },
    {
      id: "zumba",
      title: "Zumba",
      description:
        "Fitness divertido que combina baile latino con ejercicio cardiovascular",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2Fb7b2bd1f1fd04daf86f823941324afb7?format=webp&width=800",
      schedule: "Lun 16hs, Vie 18hs",
    },
    {
      id: "yoga",
      title: "Yoga",
      description:
        "Práctica milenaria que une cuerpo, mente y espíritu para el bienestar integral",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2Fc533d64443524e619443c41114668abe?format=webp&width=800",
      schedule: "Mar y Jue 9hs",
    },
    {
      id: "musculacion",
      title: "Musculación",
      description:
        "Entrenamiento con pesas para desarrollar fuerza, masa muscular y definición",
      imageUrl:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      schedule: "Lun a Vie 6hs-22hs",
    },
  ];

  const martialArtsActivities = [
    {
      id: "kickboxing",
      title: "Kickboxing",
      description:
        "Arte marcial que combina técnicas de boxeo con patadas de artes marciales",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F2c443bb692b84dc895c19f7d14662b8c?format=webp&width=800",
      schedule: "Mar y Jue 18hs",
    },
    {
      id: "taichi",
      title: "Tai Chi",
      description:
        "Arte marcial suave que mejora el equilibrio, flexibilidad y paz mental",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F3f15266095aa4688b3f3bc9bafc03582?format=webp&width=800",
      schedule: "Mar y Jue 17hs",
    },
    {
      id: "kungfu",
      title: "Kung Fu Shaolin",
      description:
        "Arte marcial tradicional chino que desarrolla fuerza, agilidad y disciplina",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F086757d8c61d448ea83c18545c75e989?format=webp&width=800",
      schedule: "Lun 19hs, Mié 18hs, Sáb",
    },
    {
      id: "defensa",
      title: "Defensa Personal",
      description:
        "Técnicas prácticas y efectivas para protegerte en situaciones de riesgo",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F23bb1645bee64e5f8c8b29e3c7b17f0c?format=webp&width=800",
      schedule: "Mar y Jue 19hs",
    },
    {
      id: "boxeo",
      title: "Boxeo",
      description:
        "Deporte de combate que desarrolla fuerza, resistencia y técnica de golpeo",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F21eace903f46480cb3bb4857d6e337b6?format=webp&width=800",
      schedule: "Lun a Vie 6hs-22hs",
    },
  ];

  const tcmActivities = [
    {
      id: "acupuntura",
      title: "Acupuntura",
      description:
        "Técnica milenaria que equilibra la energía corporal y optimiza el rendimiento",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F12607f635be54ff8b04a8f1b2144d3db?format=webp&width=800",
    },
    {
      id: "ventosas",
      title: "Ventosas",
      description:
        "Terapia de succión que mejora la circulación y libera tensiones musculares",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F5dc88ac51c25481e99e9ebcc95dea81b?format=webp&width=800",
    },
    {
      id: "moxa",
      title: "Moxibustión",
      description:
        "Terapia de calor con artemisa que fortalece el sistema inmune y la vitalidad",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F7a222f8dbeae4c17a8ebd85017b3378e?format=webp&width=800",
    },
    {
      id: "masoterapia",
      title: "Masoterapia China (Tui-Na)",
      description:
        "Masajes terapéuticos con técnicas tradicionales para el equilibrio energético",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F6c7abde8fddf4730b3c4296e21270bb1?format=webp&width=800",
    },
    {
      id: "auriculoterapia",
      title: "Auriculoterapia",
      description:
        "Estimulación de puntos específicos en la oreja para tratamiento de diversas afecciones",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F27c112fffa6c44569e814a3ee218d9e2?format=webp&width=800",
    },
    {
      id: "electroacupuntura",
      title: "Electro-Acupuntura",
      description:
        "Combinación de acupuntura tradicional con estimulación eléctrica suave para mayor efectividad",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F1553456676a0425fa84bace8aa8ec496?format=webp&width=800",
    },
  ];

  const services = [
    {
      icon: TrendingUp,
      title: "Entrenamiento de Alto Rendimiento",
      description:
        "Programas especializados para atletas y deportistas de élite",
      features: [
        "Evaluación biomecánica completa",
        "Plan de periodización deportiva",
        "Análisis de rendimiento 24/7",
      ],
    },
    {
      icon: Users,
      title: "Clases Grupales Especializadas",
      description: "Amplia variedad de disciplinas para todos los niveles",
      features: [
        "Actividades fitness modernas",
        "Artes marciales tradicionales",
        "Programas adaptados por edad",
      ],
    },
    {
      icon: Heart,
      title: "Medicina Tradicional China",
      description:
        "Terapias holísticas milenarias para optimizar tu rendimiento",
      features: [
        "Acupuntura y electro-acupuntura",
        "Ventosas y moxibustión",
        "Masoterapia especializada",
      ],
    },
    {
      icon: Activity,
      title: "Rehabilitación Deportiva Integral",
      description: "Especialistas en recuperación y prevención de lesiones",
      features: [
        "Rehabilitación deportiva",
        "Rehabilitación pre quirúrgica",
        "Rehabilitación post quirúrgica",
      ],
    },
  ];

  const testimonials = [
    {
      name: "María González",
      text: "Virtud cambió mi vida. La combinación de entrenamiento de alto rendimiento y medicina china es única. Mi rendimiento deportivo mejoró increíblemente.",
      rating: 5,
      therapy: "Entrenamiento Funcional + Acupuntura",
    },
    {
      name: "Carlos Martínez",
      text: "Los profesionales son excepcionales. Me recuperé de mi lesión deportiva más rápido de lo esperado gracias a la rehabilitación integral.",
      rating: 5,
      therapy: "Rehabilitación Deportiva + Electro-Acupuntura",
    },
    {
      name: "Ana Silva",
      text: "El ambiente es increíble y las instalaciones de primera. Las clases de Kung Fu y Yoga son mi pasión. ¡Totalmente recomendado!",
      rating: 5,
      therapy: "Kung Fu + Yoga + Auriculoterapia",
    },
  ];

  const weeklySchedule = [
    { time: "9 HS", tue: "YOGA", thu: "YOGA" },
    { time: "10 HS", sat: "ARQUERIA" },
    { time: "16 HS", mon: "ZUMBA" },
    { time: "17 HS", tue: "TAICHI", thu: "TAICHI", sat: "KUNG FU INFANTILES" },
    {
      time: "18 HS",
      mon: "KUNG FU",
      tue: "KICK BOXING",
      wed: "KUNG FU",
      thu: "KICK BOXING",
      fri: "ZUMBA",
      sat: "KUNG FU JUVEN Y ADULT",
    },
    {
      time: "19 HS",
      mon: "KUNG FU",
      tue: "FUNCIONAL + DEFENSA PERSONAL",
      wed: "KUNG FU",
      thu: "FUNCIONAL + DEFENSA PERSONAL",
      fri: "FUNCIONAL",
    },
    { time: "20 HS", mon: "BOXEO", wed: "BOXEO", fri: "BOXEO" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-40 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2Fcc91e713a9554b0eaaf8920fb387b8f4?format=webp&width=800"
                alt="Virtud Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#inicio"
                className="text-virtud-gray-600 dark:text-gray-300 hover:text-virtud-orange-500 dark:hover:text-virtud-orange-400 transition-colors text-base font-semibold"
              >
                Inicio
              </a>
              <a
                href="#actividades"
                className="text-virtud-gray-600 dark:text-gray-300 hover:text-virtud-orange-500 dark:hover:text-virtud-orange-400 transition-colors text-base font-semibold"
              >
                Actividades
              </a>
              <a
                href="#medicina-china"
                className="text-virtud-gray-600 dark:text-gray-300 hover:text-virtud-orange-500 dark:hover:text-virtud-orange-400 transition-colors text-base font-semibold"
              >
                Medicina China
              </a>
              <a
                href="#horarios"
                className="text-virtud-gray-600 dark:text-gray-300 hover:text-virtud-orange-500 dark:hover:text-virtud-orange-400 transition-colors text-base font-semibold"
              >
                Horarios
              </a>
              <a
                href="#contacto"
                className="text-virtud-gray-600 dark:text-gray-300 hover:text-virtud-orange-500 dark:hover:text-virtud-orange-400 transition-colors text-base font-semibold"
              >
                Contacto
              </a>
              <ThemeToggle />
              <Button className="bg-virtud-orange-500 hover:bg-virtud-orange-600 text-white text-sm font-bold px-6">
                Ingresar
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-virtud-gray-50 to-white dark:from-gray-900 dark:to-black transition-colors duration-300"
      >
        {/* Background Logo - Light Mode */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 dark:opacity-0 transition-opacity duration-300">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2Fd247524e765e492092575ff600ab795c?format=webp&width=800"
            alt="Virtud Logo"
            className="w-2/3 max-w-2xl h-auto object-contain"
          />
        </div>

        {/* Background Logo - Dark Mode */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 dark:opacity-30 transition-opacity duration-300">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F90a937ba2b384be4b8c0d01f0b133493?format=webp&width=800"
            alt="Virtud Logo Dark"
            className="w-2/3 max-w-2xl h-auto object-contain"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-virtud-gray-800 dark:text-white"
          >
            Tu objetivo,{" "}
            <span className="text-virtud-orange-500">Es nuestro objetivo</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 text-virtud-gray-600 dark:text-gray-300 leading-relaxed font-medium"
          >
            Centro de entrenamiento especializado en alto rendimiento físico y
            medicina tradicional china
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-virtud-orange-500 hover:bg-virtud-orange-600 text-white text-lg font-bold px-8 py-3"
            >
              <Flame className="mr-2 h-5 w-5" />
              Comenzar Entrenamiento
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-virtud-orange-500 text-virtud-orange-500 hover:bg-virtud-orange-500 hover:text-white text-lg font-bold px-8 py-3 border-2"
            >
              Conocer Actividades
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border-2 border-virtud-gray-400 dark:border-gray-500 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-virtud-gray-400 dark:bg-gray-500 rounded-full mt-1 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="servicios"
        className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-virtud-gray-800 dark:text-white mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-virtud-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experiencia integral en entrenamiento de alto nivel,
              rehabilitación deportiva especializada y terapias de medicina
              tradicional china
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 border-0 shadow-sm bg-white dark:bg-gray-800">
                  <CardHeader className="text-center pb-3">
                    <div className="w-16 h-16 bg-virtud-orange-100 dark:bg-virtud-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-8 w-8 text-virtud-orange-500 dark:text-virtud-orange-400" />
                    </div>
                    <CardTitle className="text-lg font-bold text-virtud-gray-800 dark:text-white mb-2">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-virtud-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-virtud-gray-600 dark:text-gray-300"
                        >
                          <div className="w-1.5 h-1.5 bg-virtud-orange-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fitness Activities Carousel */}
      <section
        id="actividades"
        className="py-12 bg-gradient-to-br from-virtud-orange-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <ActivityCarousel
            title="Fitness & Acondicionamiento"
            subtitle="Actividades diseñadas para mejorar tu condición física y bienestar general"
            activities={fitnessActivities}
            accentColor="virtud-orange-500"
          />
        </div>
      </section>

      {/* Martial Arts Activities Carousel */}
      <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <ActivityCarousel
            title="Artes Marciales & Combate"
            subtitle="Disciplinas tradicionales que desarrollan fuerza, técnica y carácter"
            activities={martialArtsActivities}
            accentColor="virtud-orange-600"
          />
        </div>
      </section>

      {/* Traditional Chinese Medicine Carousel */}
      <section
        id="medicina-china"
        className="py-12 bg-gradient-to-br from-virtud-orange-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <ActivityCarousel
            title="Medicina Tradicional China"
            subtitle="Terapias milenarias para optimizar tu rendimiento y bienestar integral"
            activities={tcmActivities}
            accentColor="green-600"
          />
        </div>
      </section>

      {/* Weekly Schedule Section */}
      <section
        id="horarios"
        className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-virtud-orange-100 dark:bg-virtud-orange-900/30 text-virtud-orange-700 dark:text-virtud-orange-400 hover:bg-virtud-orange-200 dark:hover:bg-virtud-orange-900/50 text-sm px-4 py-2 font-semibold">
              <Calendar className="w-4 h-4 mr-2" />
              Grilla Semanal
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-virtud-gray-800 dark:text-white mb-4">
              Horarios de Actividades
            </h2>
            <p className="text-lg text-virtud-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Consulta nuestros horarios semanales y reserva tu lugar en las
              actividades que más te interesen
            </p>
          </div>

          <div className="w-full mx-auto">
            <Card className="overflow-hidden shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="bg-virtud-orange-500 dark:bg-virtud-orange-600 text-white py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                  <CardTitle className="text-lg font-bold">
                    Grilla Semanal
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span className="font-semibold text-sm">
                      Contacto: 1151365032
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead className="bg-virtud-orange-100 dark:bg-virtud-orange-900/30">
                      <tr>
                        <th className="px-3 py-3 text-left font-bold text-sm text-virtud-gray-800 dark:text-white min-w-[80px]">
                          HORARIO
                        </th>
                        <th className="px-3 py-3 text-center font-bold text-sm text-virtud-gray-800 dark:text-white min-w-[100px]">
                          LUNES
                        </th>
                        <th className="px-3 py-3 text-center font-bold text-sm text-virtud-gray-800 dark:text-white min-w-[100px]">
                          MARTES
                        </th>
                        <th className="px-3 py-3 text-center font-bold text-sm text-virtud-gray-800 dark:text-white min-w-[100px]">
                          MIÉRCOLES
                        </th>
                        <th className="px-3 py-3 text-center font-bold text-sm text-virtud-gray-800 dark:text-white min-w-[100px]">
                          JUEVES
                        </th>
                        <th className="px-3 py-3 text-center font-bold text-sm text-virtud-gray-800 dark:text-white min-w-[100px]">
                          VIERNES
                        </th>
                        <th className="px-3 py-3 text-center font-bold text-sm text-virtud-gray-800 dark:text-white min-w-[100px]">
                          SÁBADO
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                      {weeklySchedule.map((slot, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0
                              ? "bg-gray-50 dark:bg-gray-700/50"
                              : "bg-white dark:bg-gray-800"
                          }
                        >
                          <td className="px-3 py-3 font-bold text-sm text-virtud-orange-600 dark:text-virtud-orange-400">
                            {slot.time}
                          </td>
                          <td className="px-3 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                            {(slot as any).mon || ""}
                          </td>
                          <td className="px-3 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                            {(slot as any).tue || ""}
                          </td>
                          <td className="px-3 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                            {(slot as any).wed || ""}
                          </td>
                          <td className="px-3 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                            {(slot as any).thu || ""}
                          </td>
                          <td className="px-3 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                            {(slot as any).fri || ""}
                          </td>
                          <td className="px-3 py-3 text-center text-xs font-medium text-gray-700 dark:text-gray-300">
                            {(slot as any).sat || ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              className="bg-virtud-orange-500 hover:bg-virtud-orange-600 text-white text-lg font-bold px-8 py-3"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Reservar Clase
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-virtud-gray-900 dark:bg-gray-800 text-white transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Testimonios de Nuestros Atletas
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Historias reales de transformación, recuperación y alto
              rendimiento
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-virtud-orange-400 fill-current"
                    />
                  ),
                )}
              </div>
              <blockquote className="text-xl md:text-2xl font-light mb-6 italic leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="font-bold text-lg">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-virtud-orange-400 mt-2 text-base">
                {testimonials[currentTestimonial].therapy}
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-virtud-orange-500"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section
        id="instagram"
        className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <InstagramCarousel />
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Contact Form Section */}
      <section id="contacto">
        <ContactForm />
      </section>

      {/* Platform Access Section */}
      <section className="py-16 bg-gradient-to-br from-virtud-gray-900 to-virtud-gray-800 dark:from-gray-900 dark:to-black text-white transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-virtud-orange-100 text-virtud-orange-700 text-sm px-4 py-2 font-semibold">
              <Shield className="w-4 h-4 mr-2" />
              Acceso Exclusivo para Miembros
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Plataforma Digital Virtud
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Gestiona tu membresía, reserva turnos, realiza pagos y accede a
              contenido exclusivo desde nuestra plataforma digital integral
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-virtud-gray-800 dark:bg-gray-800/50 border-virtud-gray-700 dark:border-gray-600 text-white">
              <CardHeader className="text-center py-8">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F02466d0b6120481495d60d5dca8a5ca9?format=webp&width=800"
                  alt="Virtud Logo"
                  className="h-16 w-auto mx-auto mb-4"
                />
                <CardTitle className="text-2xl font-bold">
                  Acceder a la Plataforma
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-center pb-8">
                <p className="text-gray-300 text-base leading-relaxed">
                  Inicia sesión en nuestra plataforma integral para gestionar tu
                  experiencia en Virtud de manera completamente digital.
                </p>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-virtud-orange-500 hover:bg-virtud-orange-600 text-white text-lg font-bold py-3"
                    size="lg"
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Iniciar Sesión
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-virtud-gray-600 text-white hover:bg-virtud-gray-700 text-lg font-bold py-3 border-2"
                    size="lg"
                  >
                    Registrarse
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-virtud-orange-500 to-virtud-orange-600 dark:from-virtud-orange-600 dark:to-virtud-orange-700 text-white transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para comenzar tu transformación?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Únete a la familia Virtud y descubre el equilibrio perfecto entre
            fitness moderno y bienestar tradicional
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-virtud-orange-500 hover:bg-gray-100 text-lg font-bold px-8 py-3"
            >
              <Target className="mr-2 h-5 w-5" />
              Comenzar Ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-virtud-orange-500 text-lg font-bold px-8 py-3 border-2"
            >
              Agendar Visita
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-virtud-gray-900 dark:bg-black text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F2e33339d59b6461ba11b406cfcff6319%2F02466d0b6120481495d60d5dca8a5ca9?format=webp&width=800"
                alt="Virtud Logo"
                className="h-16 w-auto mb-4"
              />
              <p className="text-gray-300 mb-6 text-base leading-relaxed">
                Tu objetivo, es nuestro objetivo. Centro de entrenamiento
                especializado en alto rendimiento y bienestar integral.
              </p>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <div className="text-sm">
                    <p>Pellegrini 557, Burzaco</p>
                    <p className="text-xs opacity-80">
                      Club Independiente de Burzaco
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Servicios</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Entrenamiento Personal</li>
                <li>Clases Grupales</li>
                <li>Medicina Tradicional China</li>
                <li>Rehabilitación Deportiva</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Horarios</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Lun - Vie: 9:00 - 22:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Sáb: 9:00 - 20:00</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Contacto</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">virtudgym@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+54 11 1365032</span>
                </div>

                {/* Redes Sociales Mejoradas */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 text-base">Síguenos</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium text-sm justify-start h-10 rounded-lg transition-all duration-300 hover:scale-105"
                      onClick={() =>
                        window.open("https://instagram.com/virtudgym", "_blank")
                      }
                    >
                      <Instagram className="mr-2 h-4 w-4" />
                      Instagram
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm justify-start h-10 rounded-lg transition-all duration-300 hover:scale-105"
                      onClick={() =>
                        window.open("https://facebook.com/virtudgym", "_blank")
                      }
                    >
                      <Facebook className="mr-2 h-4 w-4" />
                      Facebook
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-white font-medium text-sm justify-start h-10 rounded-lg transition-all duration-300 hover:scale-105"
                      onClick={() =>
                        window.open(
                          "https://wa.me/5491151365032?text=¡Hola! Me interesa conocer más sobre el gimnasio Virtud.",
                          "_blank",
                        )
                      }
                    >
                      {/* WhatsApp Official Icon SVG */}
                      <svg
                        viewBox="0 0 24 24"
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
                      </svg>
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-virtud-gray-800 dark:border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Virtud Gym. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="5491151365032" />

      {/* Platform Access Button */}
      <PlatformButton />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
