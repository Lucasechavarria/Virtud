import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import emailjs from "@emailjs/browser";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // EmailJS configuration - using public service
      await emailjs.send(
        "service_virtud", // You'll need to set this up in EmailJS
        "template_virtud", // You'll need to set this up in EmailJS
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          to_email: "virtudgym@gmail.com",
        },
        "YOUR_PUBLIC_KEY", // You'll need to replace this with actual EmailJS public key
      );

      setSubmitted(true);
      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "", service: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error al enviar el mensaje. Por favor, intenta nuevamente.");
    }

    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-virtud-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-virtud-gray-800 dark:text-white mb-4"
          >
            Contáctanos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-virtud-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            ¿Listo para comenzar tu transformación? Contáctanos y te ayudaremos
            a encontrar el programa perfecto para ti
          </motion.p>
        </div>

        {/* Contact Info Section with Map - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-6xl mx-auto"
        >
          <h3 className="text-xl font-bold text-virtud-gray-800 dark:text-white mb-6">
            Información de Contacto
          </h3>

          {/* Two column layout: contact details on left, map on right */}
          <div className="flex flex-row gap-6 min-h-[300px]">
            {/* Contact Details */}
            <div className="w-[30%] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-virtud-orange-100 dark:bg-virtud-orange-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-virtud-orange-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-virtud-gray-800 dark:text-white">
                    Ubicación
                  </h4>
                  <div className="text-sm text-virtud-gray-600 dark:text-gray-300">
                    <p>Pellegrini 557, Burzaco</p>
                    <p className="text-xs opacity-80">
                      Club Independiente de Burzaco
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-virtud-orange-100 dark:bg-virtud-orange-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-virtud-orange-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-virtud-gray-800 dark:text-white">
                    Teléfono
                  </h4>
                  <p className="text-sm text-virtud-gray-600 dark:text-gray-300">
                    +54 11 1365032
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-virtud-orange-100 dark:bg-virtud-orange-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-virtud-orange-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-virtud-gray-800 dark:text-white">
                    Email
                  </h4>
                  <p className="text-sm text-virtud-gray-600 dark:text-gray-300">
                    virtudgym@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-virtud-orange-100 dark:bg-virtud-orange-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-virtud-orange-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-virtud-gray-800 dark:text-white">
                    Horarios
                  </h4>
                  <div className="text-sm text-virtud-gray-600 dark:text-gray-300">
                    <p>Lun - Vie: 9:00 - 22:00</p>
                    <p>Sáb: 9:00 - 20:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps - Right Column */}
            <div className="w-[70%]">
              <div className="rounded-lg overflow-hidden shadow-lg h-full min-h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.123!2d-58.378!3d-34.824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd6f6b6b6b6b6%3A0x1234567890abcdef!2sPellegrini%20557%2C%20Burzaco%2C%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1640000000000!5m2!1ses!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "300px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form - Centered Below */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-xl border-0 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-virtud-gray-800 dark:text-white">
                  Envíanos un Mensaje
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Gracias por contactarnos. Te responderemos pronto.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-virtud-gray-700 dark:text-gray-300 mb-2">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border-2 border-virtud-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-virtud-orange-500 focus:ring-0 text-sm"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-virtud-gray-700 dark:text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border-2 border-virtud-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-virtud-orange-500 focus:ring-0 text-sm"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-virtud-gray-700 dark:text-gray-300 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border-2 border-virtud-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-virtud-orange-500 focus:ring-0 text-sm"
                        placeholder="+54 11 1234-5678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-virtud-gray-700 dark:text-gray-300 mb-2">
                        Servicio de Interés
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border-2 border-virtud-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-virtud-orange-500 focus:ring-0 text-sm"
                      >
                        <option value="">Selecciona un servicio</option>
                        <option value="entrenamiento-personal">
                          Entrenamiento Personal
                        </option>
                        <option value="clases-grupales">Clases Grupales</option>
                        <option value="medicina-china">
                          Medicina Tradicional China
                        </option>
                        <option value="rehabilitacion">
                          Rehabilitación Deportiva
                        </option>
                        <option value="consulta-general">
                          Consulta General
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-virtud-gray-700 dark:text-gray-300 mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border-2 border-virtud-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-virtud-orange-500 focus:ring-0 text-sm resize-none"
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isLoading}
                      className="w-full bg-virtud-orange-500 hover:bg-virtud-orange-600 text-white text-lg font-bold py-3 h-auto disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Enviando...
                        </div>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Enviar Mensaje
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
