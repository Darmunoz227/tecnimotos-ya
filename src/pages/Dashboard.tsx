import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Wrench, FileText, User, Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    // Mostrar modal solo si no hay usuario después de cargar
    if (!loading && !user) {
      setAuthModalOpen(true);
    }
  }, [user, loading]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Cargando dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show auth prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-muted/30">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="bg-card p-8 rounded-lg shadow-lg border">
              <User className="h-16 w-16 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-2">Accede a tu Dashboard</h2>
              <p className="text-muted-foreground mb-6">
                Inicia sesión para ver tu historial de servicios, citas programadas y gestionar tu cuenta.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={() => setAuthModalOpen(true)} 
                  className="w-full"
                  size="lg"
                >
                  Iniciar Sesión
                </Button>
                <p className="text-sm text-muted-foreground">
                  ¿No tienes cuenta?{" "}
                  <button 
                    onClick={() => setAuthModalOpen(true)}
                    className="text-primary hover:underline font-medium"
                  >
                    Regístrate aquí
                  </button>
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode="signin"
        />
      </div>
    );
  }

  // Mock data - would come from backend
  const customer = {
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || "Usuario",
    email: user.email || "",
    phone: user.user_metadata?.phone || "No especificado",
    address: "Calle 86 #15-30, Bogotá",
    isDemo: user.email === 'demo@tecnimotos.com'
  };

  const appointments = [
    {
      id: 1,
      date: "2025-10-15",
      time: "10:00 AM",
      service: "Revisión Técnico-Mecánica",
      status: "confirmada",
      motorcycle: "Bajaj Pulsar 180 - ABC123",
    },
    {
      id: 2,
      date: "2025-09-10",
      time: "2:00 PM",
      service: "Mantenimiento Preventivo",
      status: "completada",
      motorcycle: "Bajaj Pulsar 180 - ABC123",
    },
  ];

  const serviceHistory = [
    {
      id: 1,
      date: "2025-09-10",
      service: "Mantenimiento Preventivo",
      cost: 85000,
      mechanic: "Miguel Carreño",
      notes: "Cambio de aceite, filtros y sincronización. Todo en orden.",
    },
    {
      id: 2,
      date: "2025-06-20",
      service: "Revisión Técnico-Mecánica",
      cost: 45000,
      mechanic: "Luis Martínez",
      notes: "Certificado aprobado. Vence en 6 meses.",
    },
  ];

  const motorcycles = [
    {
      id: 1,
      brand: "Bajaj",
      model: "Pulsar 180",
      year: 2020,
      plate: "ABC123",
      lastService: "2025-09-10",
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      confirmada: "default",
      completada: "secondary",
      cancelada: "outline",
    };
    return (
      <Badge variant={variants[status] || "outline"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-hero text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
              Portal del Cliente
            </h1>
            <p className="text-lg opacity-95">
              Bienvenido de nuevo, {customer.name}
            </p>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Demo User Notice */}
            {customer.isDemo && (
              <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2 text-primary">
                  <User className="h-5 w-5" />
                  <span className="font-semibold">Cuenta Demo Activa</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Estás usando una cuenta de demostración. Los datos mostrados son ejemplos para mostrar las funcionalidades del sistema.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Upcoming Appointments */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-heading font-bold">Próximas Citas</h2>
                    <Button asChild>
                      <Link to="/citas">Nueva Cita</Link>
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {appointments
                      .filter(apt => apt.status === "confirmada")
                      .map((appointment) => (
                        <Card key={appointment.id} className="shadow-primary">
                          <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-5 w-5 text-primary" />
                                  <span className="font-semibold">{appointment.date}</span>
                                  <Clock className="h-5 w-5 text-primary ml-2" />
                                  <span className="font-semibold">{appointment.time}</span>
                                </div>
                                <p className="text-lg font-medium">{appointment.service}</p>
                                <p className="text-sm text-muted-foreground">{appointment.motorcycle}</p>
                              </div>
                              <div className="flex flex-col justify-between items-start md:items-end">
                                {getStatusBadge(appointment.status)}
                                <Button variant="outline" size="sm" className="mt-2">
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>

                {/* Service History */}
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-6">Historial de Servicios</h2>
                  <div className="space-y-4">
                    {serviceHistory.map((service) => (
                      <Card key={service.id} className="shadow-primary">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="font-semibold text-lg">{service.service}</p>
                              <p className="text-sm text-muted-foreground">
                                {service.date} · Por {service.mechanic}
                              </p>
                            </div>
                            <p className="text-xl font-bold text-primary">
                              {formatPrice(service.cost)}
                            </p>
                          </div>
                          <p className="text-sm bg-muted/50 p-3 rounded-md">
                            {service.notes}
                          </p>
                          <Button variant="outline" size="sm" className="mt-4">
                            <FileText className="h-4 w-4 mr-2" />
                            Ver Factura
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Profile Card */}
                <Card className="gradient-card shadow-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Mi Perfil
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="text-sm font-medium">{customer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Teléfono</p>
                        <p className="text-sm font-medium">{customer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Dirección</p>
                        <p className="text-sm font-medium">{customer.address}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Editar Perfil
                    </Button>
                  </CardContent>
                </Card>

                {/* Motorcycles */}
                <Card className="gradient-card shadow-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="h-5 w-5 text-primary" />
                      Mis Motos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {motorcycles.map((moto) => (
                      <div key={moto.id} className="p-4 bg-muted/50 rounded-lg">
                        <p className="font-semibold">{moto.brand} {moto.model}</p>
                        <p className="text-sm text-muted-foreground">Placa: {moto.plate}</p>
                        <p className="text-sm text-muted-foreground">Año: {moto.year}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Último servicio: {moto.lastService}
                        </p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      Agregar Moto
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="gradient-card shadow-primary">
                  <CardHeader>
                    <CardTitle>Acciones Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link to="/citas">
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar Cita
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link to="/productos">
                        <Wrench className="h-4 w-4 mr-2" />
                        Comprar Repuestos
                      </Link>
                    </Button>
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

export default Dashboard;
