import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Wrench, Settings, Zap, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Servicios = () => {
  const services = [
    {
      icon: CheckCircle,
      title: "Revisión Técnico-Mecánica",
      description: "Inspección completa de todos los sistemas de la motocicleta para certificación obligatoria",
      duration: "45 minutos",
      price: "Desde $45.000",
      features: [
        "Sistema de frenos",
        "Sistema eléctrico",
        "Suspensión y dirección",
        "Motor y transmisión",
        "Emisiones contaminantes",
        "Certificado digital",
      ],
    },
    {
      icon: Wrench,
      title: "Mantenimiento Preventivo",
      description: "Servicio completo para mantener tu moto en óptimas condiciones",
      duration: "2 horas",
      price: "Desde $80.000",
      features: [
        "Cambio de aceite y filtro",
        "Limpieza de carburador",
        "Ajuste de cadena",
        "Revisión de frenos",
        "Sincronización",
        "Lavado incluido",
      ],
    },
    {
      icon: Settings,
      title: "Mantenimiento Correctivo",
      description: "Reparación y solución de fallas mecánicas y eléctricas",
      duration: "Variable",
      price: "Según diagnóstico",
      features: [
        "Diagnóstico computarizado",
        "Reparación de motor",
        "Sistema eléctrico",
        "Cambio de embrague",
        "Reparación de frenos",
        "Garantía del servicio",
      ],
    },
    {
      icon: Zap,
      title: "Sincronización y Carburación",
      description: "Optimización del rendimiento del motor",
      duration: "1.5 horas",
      price: "Desde $60.000",
      features: [
        "Ajuste de válvulas",
        "Limpieza profunda",
        "Calibración carburador",
        "Punto de encendido",
        "Prueba de compresión",
        "Prueba de ruta",
      ],
    },
    {
      icon: Shield,
      title: "Cambio de Aceite Express",
      description: "Servicio rápido de cambio de aceite y filtro",
      duration: "30 minutos",
      price: "Desde $35.000",
      features: [
        "Aceite sintético o mineral",
        "Filtro de aceite nuevo",
        "Revisión de niveles",
        "Inspección visual",
        "Lavado básico",
        "Sin cita previa",
      ],
    },
    {
      icon: Clock,
      title: "Servicio a Domicilio",
      description: "Recogemos y entregamos tu moto en tu ubicación",
      duration: "Según servicio",
      price: "+$15.000",
      features: [
        "Recogida en domicilio",
        "Transporte seguro",
        "Servicio completo",
        "Entrega a domicilio",
        "Pago contra entrega",
        "Zona norte Bogotá",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-hero text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Nuestros Servicios
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-95">
              Servicios profesionales de mantenimiento y reparación para todo tipo de motocicletas
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="gradient-card shadow-primary hover:shadow-accent transition-smooth">
                    <CardHeader>
                      <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary/10 mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-heading">{service.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 pb-4 border-b">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Duración:</span>
                          <span className="font-medium">{service.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Precio:</span>
                          <span className="font-bold text-primary text-lg">{service.price}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button asChild className="w-full mt-6">
                        <Link to="/citas">Agendar Servicio</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-bold mb-6">
                Garantía y Calidad
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Todos nuestros servicios incluyen garantía de 30 días y utilizamos únicamente 
                repuestos originales o de primera calidad. Nuestros mecánicos están certificados 
                y cuentan con amplia experiencia.
              </p>
              <Button asChild size="lg">
                <Link to="/citas">Agendar Cita Ahora</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Servicios;
