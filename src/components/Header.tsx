import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, Phone, ShoppingCart, User, LogOut, LogIn } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { user, signOut, loading } = useAuth();

  const navItems = [
    { path: "/", label: "Inicio" },
    { path: "/servicios", label: "Servicios" },
    { path: "/productos", label: "Repuestos" },
    { path: "/citas", label: "Agendar Cita" },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <span className="text-2xl font-bold text-primary-foreground">MT</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-heading font-bold text-foreground">Motos Tecni YA</h1>
                <p className="text-xs text-muted-foreground">Taller Especializado</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-smooth hover:text-primary ${
                    location.pathname === item.path ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              
              {!loading && (
                user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Cerrar Sesión
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => openAuthModal('signin')}
                      className="hidden md:flex gap-2"
                    >
                      <LogIn className="h-4 w-4" />
                      Iniciar Sesión
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={() => openAuthModal('signup')}
                      className="hidden md:flex"
                    >
                      Registrarse
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => openAuthModal('signin')}
                      className="md:hidden"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </div>
                )
              )}
              
              <Button variant="default" size="sm" className="hidden md:flex gap-2">
                <Phone className="h-4 w-4" />
                <span>311 267 3255</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 space-y-2 border-t pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md transition-smooth ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              {!loading && !user && (
                <div className="px-4 pt-2 space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      openAuthModal('signin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Iniciar Sesión
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={() => {
                      openAuthModal('signup');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Registrarse
                  </Button>
                </div>
              )}
              
              {!loading && user && (
                <div className="px-4 pt-2 space-y-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-md hover:bg-muted"
                  >
                    Dashboard
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Cerrar Sesión
                  </Button>
                </div>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;
