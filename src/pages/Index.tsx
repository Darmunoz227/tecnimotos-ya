import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Wrench, ShoppingBag, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SupabaseTest from "@/components/SupabaseTest";

const Index = () => {
  const services = [
    {
      icon: CheckCircle,
      title: "Revisión Técnico-Mecánica",
      description: "Inspección completa para certificación obligatoria",
      price: "Desde $45.000",
    },
    {
      icon: Wrench,
      title: "Mantenimiento Preventivo",
      description: "Cambio de aceite, filtros y sincronización",
      price: "Desde $80.000",
    },
    {
      icon: ShoppingBag,
      title: "Repuestos Originales",
      description: "Venta de repuestos y accesorios de calidad",
      price: "Precios competitivos",
    },
  ];

  const testimonials = [
    {
      name: "Carlos Rodríguez",
      text: "Excelente servicio, rápido y profesional. Mi moto quedó como nueva.",
      rating: 5,
    },
    {
      name: "Andrea Gómez",
      text: "Muy confiables, siempre traigo mi moto aquí. Precios justos.",
      rating: 5,
    },
    {
      name: "Juan Martínez",
      text: "La atención es increíble y los mecánicos muy capacitados.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative gradient-hero text-primary-foreground">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 animate-fade-in">
                Tu Taller de Confianza en Bogotá
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-95">
                Revisión técnico-mecánica, mantenimiento preventivo y correctivo. 
                Más de 15 años de experiencia cuidando tu motocicleta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" asChild className="shadow-accent">
                  <Link to="/citas" className="gap-2">
                    <Calendar className="h-5 w-5" />
                    Agendar Cita
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/30 hover:bg-white/20">
                  <Link to="/servicios">
                    Ver Servicios
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="hsl(var(--background))"
              />
            </svg>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Nuestros Servicios
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ofrecemos servicios especializados para mantener tu moto en perfecto estado
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="gradient-card shadow-primary hover:shadow-accent transition-smooth border-border">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary/10 mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-heading font-semibold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <p className="text-lg font-semibold text-primary">{service.price}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Button asChild size="lg" className="gap-2">
                <Link to="/servicios">
                  Ver Todos los Servicios
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                  ¿Por Qué Elegirnos?
                </h2>
                <div className="space-y-4">
                  {[
                    "Más de 15 años de experiencia",
                    "Mecánicos certificados y capacitados",
                    "Repuestos originales garantizados",
                    "Precios justos y transparentes",
                    "Agenda tu cita en línea fácilmente",
                    "Atención personalizada",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-lg">{item}</p>
                    </div>
                  ))}
                </div>
                <Button asChild size="lg" className="mt-8 gap-2">
                  <Link to="/citas">
                    Agendar Cita Ahora
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent opacity-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 bg-card rounded-2xl shadow-primary max-w-sm">
                    <div className="text-5xl font-heading font-bold text-primary mb-2">15+</div>
                    <p className="text-xl font-medium mb-4">Años de Experiencia</p>
                    <div className="text-4xl font-heading font-bold text-accent mb-2">5000+</div>
                    <p className="text-xl font-medium">Clientes Satisfechos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Lo Que Dicen Nuestros Clientes
              </h2>
              <p className="text-muted-foreground">
                La satisfacción de nuestros clientes es nuestra mejor recompensa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="gradient-card shadow-primary">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="gradient-hero text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              ¿Listo para Cuidar Tu Moto?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto">
              Agenda tu cita en línea y evita las filas. Te esperamos en nuestro taller.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="shadow-accent">
                <Link to="/citas" className="gap-2">
                  <Calendar className="h-5 w-5" />
                  Agendar Cita
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/30 hover:bg-white/20">
                <Link to="/productos" className="gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Ver Repuestos
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Test de Supabase - Solo en desarrollo */}
      {import.meta.env.DEV && (
        <section className="py-8 bg-muted/50">
          <div className="container mx-auto px-4">
            <SupabaseTest />
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Index;
