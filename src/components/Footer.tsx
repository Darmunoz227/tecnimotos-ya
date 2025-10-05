import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Motos Tecni YA</h3>
            <p className="text-sm opacity-90 mb-4">
              Taller especializado en revisión técnico-mecánica y mantenimiento de motocicletas en Bogotá.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition-smooth"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition-smooth"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/servicios" className="hover:opacity-75 transition-smooth">
                  Nuestros Servicios
                </Link>
              </li>
              <li>
                <Link to="/productos" className="hover:opacity-75 transition-smooth">
                  Repuestos y Accesorios
                </Link>
              </li>
              <li>
                <Link to="/citas" className="hover:opacity-75 transition-smooth">
                  Agendar Cita
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:opacity-75 transition-smooth">
                  Portal de Clientes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Av. Carrera 86 #87-61<br />Bogotá, Colombia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:3112673255" className="hover:opacity-75 transition-smooth">
                  311 267 3255
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:miguel@motostecniya.com.co" className="hover:opacity-75 transition-smooth">
                  miguel@motostecniya.com.co
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Horario</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Lunes a Viernes</p>
                  <p className="opacity-90">8:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Sábados</p>
                  <p className="opacity-90">8:00 AM - 2:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Domingos</p>
                  <p className="opacity-90">Cerrado</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-90">
          <p>&copy; {new Date().getFullYear()} Motos Tecni YA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
