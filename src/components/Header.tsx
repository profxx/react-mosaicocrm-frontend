import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/comprar', label: 'Comprar' },
  { href: '/alugar', label: 'Alugar' },
  { href: '/lancamentos', label: 'Lançamentos' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
];

interface HeaderProps {
  variant?: 'transparent' | 'solid';
}

export function Header({ variant = 'transparent' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      variant === 'transparent' 
        ? "bg-transparent" 
        : "bg-card/95 backdrop-blur-md shadow-soft"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gold flex items-center justify-center">
              <Building2 className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <span className={cn(
                "font-serif text-xl font-bold",
                variant === 'transparent' ? "text-primary-foreground" : "text-foreground"
              )}>
                Mosaico CRM
              </span>
              <span className={cn(
                "block text-xs",
                variant === 'transparent' ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                Sua Imobiliária Digital
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                  variant === 'transparent'
                    ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    : "text-foreground/80 hover:text-foreground hover:bg-muted",
                  location.pathname === link.href && (
                    variant === 'transparent' 
                      ? "text-primary-foreground bg-primary-foreground/10" 
                      : "text-foreground bg-muted"
                  )
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/admin">
              <Button variant={variant === 'transparent' ? 'heroOutline' : 'outline'} size="sm">
                <User className="w-4 h-4 mr-2" />
                Área do Corretor
              </Button>
            </Link>
            <Link to="/saas-admin">
              <Button variant={variant === 'transparent' ? 'hero' : 'gold'} size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Admin SaaS
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              variant === 'transparent'
                ? "text-primary-foreground hover:bg-primary-foreground/10"
                : "text-foreground hover:bg-muted"
            )}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-md shadow-strong transition-all duration-300",
        isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      )}>
        <nav className="container mx-auto px-6 py-6 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg font-medium transition-colors",
                "text-foreground/80 hover:text-foreground hover:bg-muted",
                location.pathname === link.href && "text-foreground bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                <User className="w-4 h-4 mr-2" />
                Área do Corretor
              </Button>
            </Link>
            <Link to="/saas-admin" onClick={() => setIsMenuOpen(false)}>
              <Button variant="gold" className="w-full">
                <LogIn className="w-4 h-4 mr-2" />
                Admin SaaS
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
