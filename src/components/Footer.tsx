import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-dark text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-gold flex items-center justify-center">
                <Building2 className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold">ImobSaaS</span>
                <span className="block text-xs text-primary-foreground/70">Imobiliária Digital</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Há mais de 15 anos realizando sonhos e conectando pessoas aos melhores imóveis do mercado.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {['Comprar', 'Alugar', 'Lançamentos', 'Sobre Nós', 'Blog', 'Carreiras'].map((link) => (
                <li key={link}>
                  <Link 
                    to="#" 
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Serviços</h4>
            <ul className="space-y-3">
              {['Avaliação de Imóveis', 'Financiamento', 'Documentação', 'Consultoria', 'Administração', 'Vistoria'].map((service) => (
                <li key={service}>
                  <Link 
                    to="#" 
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/70">
                  Av. Paulista, 1000 - Bela Vista<br />São Paulo - SP, 01310-100
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-primary-foreground/70">(11) 3333-4444</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-primary-foreground/70">contato@imobsaas.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © 2024 ImobSaaS. Todos os direitos reservados. CRECI-SP 123456-J
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="#" className="text-primary-foreground/50 hover:text-gold transition-colors">
              Política de Privacidade
            </Link>
            <Link to="#" className="text-primary-foreground/50 hover:text-gold transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
