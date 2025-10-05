import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Productos = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "Todos",
    "Piezas de Motor",
    "Sistema de Frenos",
    "Filtros y Aceites",
    "Accesorios de Seguridad",
    "Iluminación",
    "Cadenas y Piñones",
  ];

  const products = [
    {
      id: 1,
      name: "Kit de Embrague Pulsar 180",
      category: "Piezas de Motor",
      brand: "Bajaj Original",
      price: 145000,
      stock: 15,
      image: "🔧",
    },
    {
      id: 2,
      name: "Pastillas de Freno Delanteras",
      category: "Sistema de Frenos",
      brand: "Vesrah",
      price: 48000,
      stock: 25,
      image: "🛑",
    },
    {
      id: 3,
      name: "Aceite Motul 5100 10W40",
      category: "Filtros y Aceites",
      brand: "Motul",
      price: 52000,
      stock: 40,
      image: "🛢️",
    },
    {
      id: 4,
      name: "Casco Certificado LS2",
      category: "Accesorios de Seguridad",
      brand: "LS2",
      price: 280000,
      stock: 8,
      image: "🪖",
    },
    {
      id: 5,
      name: "Bombillo LED H4",
      category: "Iluminación",
      brand: "Philips",
      price: 35000,
      stock: 20,
      image: "💡",
    },
    {
      id: 6,
      name: "Kit Cadena y Piñones",
      category: "Cadenas y Piñones",
      brand: "DID",
      price: 185000,
      stock: 12,
      image: "⛓️",
    },
    {
      id: 7,
      name: "Filtro de Aceite HF138",
      category: "Filtros y Aceites",
      brand: "Hiflofiltro",
      price: 18000,
      stock: 50,
      image: "🔩",
    },
    {
      id: 8,
      name: "Guantes de Cuero",
      category: "Accesorios de Seguridad",
      brand: "Alpinestars",
      price: 95000,
      stock: 15,
      image: "🧤",
    },
  ];

  const addToCart = (productName: string) => {
    toast.success(`${productName} agregado al carrito`, {
      description: "Continúa comprando o ve al carrito para finalizar tu compra",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-hero text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Repuestos y Accesorios
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-95">
              Repuestos originales y accesorios de las mejores marcas para tu motocicleta
            </p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 items-center">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filtrar por categoría</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="gradient-card shadow-primary hover:shadow-accent transition-smooth">
                  <CardHeader>
                    <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-6xl">{product.image}</span>
                    </div>
                    <CardTitle className="text-lg font-heading">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {product.stock > 10 ? (
                        <span className="text-green-600">En stock ({product.stock})</span>
                      ) : (
                        <span className="text-amber-600">Pocas unidades ({product.stock})</span>
                      )}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full gap-2"
                      onClick={() => addToCart(product.name)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Agregar al Carrito
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-heading font-bold mb-6 text-center">
                Información de Compra
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-3">🚚</div>
                  <h3 className="font-semibold mb-2">Envíos a Domicilio</h3>
                  <p className="text-sm text-muted-foreground">
                    Envíos a toda Bogotá con Servientrega
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💳</div>
                  <h3 className="font-semibold mb-2">Métodos de Pago</h3>
                  <p className="text-sm text-muted-foreground">
                    PSE, tarjetas o efectivo en el taller
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-semibold mb-2">Garantía</h3>
                  <p className="text-sm text-muted-foreground">
                    Repuestos originales con garantía
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Productos;
