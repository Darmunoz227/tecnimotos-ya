import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Citas = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    placa: "",
    marca: "",
    modelo: "",
    servicio: "",
    fecha: "",
    hora: "",
    notas: "",
  });

  const services = [
    "Revisión Técnico-Mecánica",
    "Mantenimiento Preventivo",
    "Mantenimiento Correctivo",
    "Sincronización y Carburación",
    "Cambio de Aceite Express",
    "Diagnóstico Computarizado",
  ];

  const timeSlots = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.nombre || !formData.telefono || !formData.servicio || !formData.fecha || !formData.hora) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    toast.success("¡Cita agendada exitosamente!", {
      description: `Te esperamos el ${formData.fecha} a las ${formData.hora}. Recibirás un SMS de confirmación.`,
    });

    // Reset form
    setFormData({
      nombre: "",
      telefono: "",
      email: "",
      placa: "",
      marca: "",
      modelo: "",
      servicio: "",
      fecha: "",
      hora: "",
      notas: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-hero text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Agendar Cita
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-95">
              Evita las filas y agenda tu cita en línea. Es rápido, fácil y sin compromiso.
            </p>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-primary">
                  <CardHeader>
                    <CardTitle className="text-2xl font-heading">Información de la Cita</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Datos Personales</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre Completo *</Label>
                            <Input
                              id="nombre"
                              value={formData.nombre}
                              onChange={(e) => handleChange("nombre", e.target.value)}
                              placeholder="Juan Pérez"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="telefono">Teléfono *</Label>
                            <Input
                              id="telefono"
                              type="tel"
                              value={formData.telefono}
                              onChange={(e) => handleChange("telefono", e.target.value)}
                              placeholder="311 267 3255"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Correo Electrónico</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="correo@ejemplo.com"
                          />
                        </div>
                      </div>

                      {/* Motorcycle Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Datos de la Motocicleta</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="placa">Placa</Label>
                            <Input
                              id="placa"
                              value={formData.placa}
                              onChange={(e) => handleChange("placa", e.target.value)}
                              placeholder="ABC123"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="marca">Marca</Label>
                            <Input
                              id="marca"
                              value={formData.marca}
                              onChange={(e) => handleChange("marca", e.target.value)}
                              placeholder="Bajaj, Yamaha, etc."
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="modelo">Modelo</Label>
                            <Input
                              id="modelo"
                              value={formData.modelo}
                              onChange={(e) => handleChange("modelo", e.target.value)}
                              placeholder="Pulsar 180"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Service Selection */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Servicio y Fecha</h3>
                        <div className="space-y-2">
                          <Label htmlFor="servicio">Servicio *</Label>
                          <Select value={formData.servicio} onValueChange={(value) => handleChange("servicio", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un servicio" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fecha">Fecha *</Label>
                            <Input
                              id="fecha"
                              type="date"
                              value={formData.fecha}
                              onChange={(e) => handleChange("fecha", e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hora">Hora *</Label>
                            <Select value={formData.hora} onValueChange={(value) => handleChange("hora", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona hora" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div className="space-y-2">
                        <Label htmlFor="notas">Notas Adicionales</Label>
                        <Textarea
                          id="notas"
                          value={formData.notas}
                          onChange={(e) => handleChange("notas", e.target.value)}
                          placeholder="¿Algún detalle específico que debamos saber?"
                          rows={4}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Agendar Cita
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Info Sidebar */}
              <div className="space-y-6">
                <Card className="gradient-card shadow-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Horario de Atención
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lunes - Viernes</span>
                      <span className="font-medium">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sábados</span>
                      <span className="font-medium">8:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domingos</span>
                      <span className="font-medium text-destructive">Cerrado</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-card shadow-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Proceso de Cita
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      "Completa el formulario",
                      "Recibe confirmación por SMS",
                      "Te recordamos 24h antes",
                      "Llega a tu cita",
                    ].map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="mt-1">{step}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="gradient-card shadow-primary bg-accent/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-accent">
                      <CheckCircle className="h-5 w-5" />
                      ¿Por Qué Agendar?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>✓ Evita las filas y esperas</p>
                    <p>✓ Servicio garantizado</p>
                    <p>✓ Atención personalizada</p>
                    <p>✓ Mecánicos disponibles</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Citas;
