import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log("Newsletter signup:", email);
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-virtud-orange-500 to-virtud-orange-600 dark:from-virtud-orange-600 dark:to-virtud-orange-700">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Mantente Actualizado
              </CardTitle>
              <p className="text-white/90 text-base leading-relaxed">
                Recibe las últimas noticias, ofertas especiales y consejos de
                entrenamiento directamente en tu email
              </p>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-white text-virtud-orange-500 hover:bg-white/90 font-bold px-8"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Suscribirse
                    </Button>
                  </div>
                  <p className="text-xs text-white/70 text-center">
                    Prometemos no enviar spam. Puedes cancelar en cualquier
                    momento.
                  </p>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-lg font-semibold">
                    ¡Gracias por suscribirte!
                  </p>
                  <p className="text-white/90">
                    Pronto recibirás nuestras novedades
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
