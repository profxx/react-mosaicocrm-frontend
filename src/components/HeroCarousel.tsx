import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath, Car, Maximize, MapPin } from 'lucide-react';
import { Property } from '@/types/property';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroCarouselProps {
  properties: Property[];
}

export function HeroCarousel({ properties }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % properties.length);
  }, [properties.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentProperty = properties[currentIndex];

  const formatPrice = (price: number, isForRent: boolean) => {
    const formatted = price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    });
    return isForRent ? `${formatted}/mês` : formatted;
  };

  return (
    <div 
      className="relative h-[85vh] min-h-[600px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Images */}
      {properties.map((property, index) => (
        <div
          key={property.id}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-out",
            index === currentIndex 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          )}
        >
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-navy-dark/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-6 flex items-center">
        <div className="max-w-2xl animate-slide-up" key={currentIndex}>
          <span className="inline-block px-4 py-1.5 bg-gold text-foreground text-sm font-semibold rounded-full mb-6">
            {currentProperty.isForRent ? '📍 Para Alugar' : '🏠 À Venda'}
          </span>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
            {currentProperty.title}
          </h1>
          
          <div className="flex items-center gap-2 text-primary-foreground/80 mb-6">
            <MapPin className="w-5 h-5" />
            <span className="text-lg">{currentProperty.neighborhood}, {currentProperty.city}</span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center gap-6 text-primary-foreground/90 mb-8">
            {currentProperty.bedrooms > 0 && (
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Bed className="w-5 h-5" />
                <span>{currentProperty.bedrooms} Quartos</span>
              </div>
            )}
            {currentProperty.bathrooms > 0 && (
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Bath className="w-5 h-5" />
                <span>{currentProperty.bathrooms} Banheiros</span>
              </div>
            )}
            {currentProperty.parkingSpots > 0 && (
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Car className="w-5 h-5" />
                <span>{currentProperty.parkingSpots} Vagas</span>
              </div>
            )}
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Maximize className="w-5 h-5" />
              <span>{currentProperty.area}m²</span>
            </div>
          </div>

          {/* Price */}
          <p className="text-4xl md:text-5xl font-bold text-gold mb-8 font-serif">
            {formatPrice(currentProperty.price, currentProperty.isForRent)}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="xl">
              Ver Detalhes
            </Button>
            <Button variant="heroOutline" size="xl">
              Agendar Visita
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-card/20 backdrop-blur-md flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-all duration-300 border border-primary-foreground/20"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-card/20 backdrop-blur-md flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-all duration-300 border border-primary-foreground/20"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-500",
              index === currentIndex 
                ? "w-12 bg-gold" 
                : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground/80"
            )}
          />
        ))}
      </div>

      {/* Property Counter */}
      <div className="absolute bottom-8 right-6 bg-card/20 backdrop-blur-md px-4 py-2 rounded-lg border border-primary-foreground/20">
        <span className="text-primary-foreground font-semibold">
          {currentIndex + 1} / {properties.length}
        </span>
      </div>
    </div>
  );
}
