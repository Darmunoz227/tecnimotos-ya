import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Wrench, FileText, User, Mail, Phone, MapPin, AlertCircle, Bike } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [customer, setCustomer] = useState<any>(null);
  const [userAppointments, setUserAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadCustomerData = async () => {
      try {
        // Cargar datos del cliente
        const { data: customerData } = await supabase
          .from('customers')
          .select('*')
          .eq('user_id', user.id)
          .single();

        setCustomer(customerData);

        // Cargar citas si existe el cliente
        if (customerData) {
          const { data: appointmentsData } = await supabase
            .from('appointments')
            .select(`
              *,
              services (name, description, base_price),
              motorcycles (brand, model, plate)
            `)
            .eq('customer_id', customerData.id)
            .order('scheduled_date', { ascending: false })
            .limit(5);

          setUserAppointments(appointmentsData || []);
        }
      } catch (error) {
        console.error('Error loading customer data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCustomerData();
  }, [user]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      pending: "outline",
      confirmed: "default",
      in_progress: "secondary",
      completed: "secondary",
      cancelled: "destructive",
    };
    
    const labels: Record<string, string> = {
      pending: "Pendiente",
      confirmed: "Confirmada",
      in_progress: "En Progreso",
      completed: "Completada",
      cancelled: "Cancelada",
    };

    return (
      <Badge variant={variants[status] || "outline"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Mostrar loading mientras carga
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Cargando tu dashboard...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Redirigir si no hay usuario autenticado
  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Acceso Requerido</h2>
              <p className="text-muted-foreground mb-4">
                Necesitas iniciar sesión para ver tu dashboard
              </p>
              <Button asChild>
                <Link to="/">Ir al inicio</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

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
              Bienvenido de nuevo, {profile.full_name}
            </p>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Upcoming Appointments */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-heading font-bold">Mis Citas</h2>
                    <Button asChild>
                      <Link to="/citas">Nueva Cita</Link>
                    </Button>
                  </div>
                  
                  {userAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {userAppointments.map((appointment) => (
                        <Card key={appointment.id} className="shadow-primary">
                          <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-5 w-5 text-primary" />
                                  <span className="font-semibold">
                                    {formatDate(appointment.scheduled_date)}
                                  </span>
                                </div>
                                <p className="text-lg font-medium">
                                  {appointment.services?.name || "Servicio"}
                                </p>
                                <div className="flex items-center gap-2">
                                  <Bike className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {appointment.motorcycles?.brand} {appointment.motorcycles?.model} - {appointment.motorcycles?.plate}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col justify-between items-start md:items-end">
                                {getStatusBadge(appointment.status)}
                                {appointment.total_cost && (
                                  <p className="text-lg font-bold text-primary mt-2">
                                    {formatPrice(appointment.total_cost)}
                                  </p>
                                )}
                              </div>
                            </div>
                            {appointment.notes && (
                              <div className="mt-4 p-3 bg-muted/50 rounded-md">
                                <p className="text-sm">{appointment.notes}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No tienes citas programadas</h3>
                        <p className="text-muted-foreground mb-4">
                          ¡Agenda tu primera cita para el mantenimiento de tu motocicleta!
                        </p>
                        <Button asChild>
                          <Link to="/citas">Agendar Cita</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Quick Actions */}
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-6">Acciones Rápidas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Agendar Cita</h3>
                        <p className="text-sm text-muted-foreground">
                          Programa tu próximo servicio
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Wrench className="h-8 w-8 text-primary mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">Ver Servicios</h3>
                        <p className="text-sm text-muted-foreground">
                          Conoce nuestros servicios
                        </p>
                      </CardContent>
                    </Card>
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
                      <User className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Nombre</p>
                        <p className="font-medium">{profile.full_name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{profile.email}</p>
                      </div>
                    </div>
                    {profile.phone && (
                      <div className="flex items-start gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">Teléfono</p>
                          <p className="font-medium">{profile.phone}</p>
                        </div>
                      </div>
                    )}
                    {customer?.address && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">Dirección</p>
                          <p className="font-medium">{customer.address}</p>
                        </div>
                      </div>
                    )}
                    <Button variant="outline" className="w-full mt-4">
                      Editar Perfil
                    </Button>
                  </CardContent>
                </Card>

                {/* Stats Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Estadísticas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total de Citas</span>
                      <span className="font-semibold">{userAppointments.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Completadas</span>
                      <span className="font-semibold">
                        {userAppointments.filter(apt => apt.status === 'completed').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pendientes</span>
                      <span className="font-semibold">
                        {userAppointments.filter(apt => apt.status === 'pending' || apt.status === 'confirmed').length}
                      </span>
                    </div>
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