import { useState } from 'react';
import { ChevronLeft, ChevronRight, Bed, Bath, Car, Maximize, Heart, MapPin } from 'lucide-react';
import { Property } from '@/types/property';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export function PropertyCard({ property, onFavorite, isFavorite = false }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

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
      className="group relative bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Carousel */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {/* Navigation Arrows */}
        {property.images.length > 1 && isHovered && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-card transition-all duration-200 shadow-medium animate-fade-in"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-card transition-all duration-200 shadow-medium animate-fade-in"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentImageIndex 
                    ? "bg-gold w-6" 
                    : "bg-primary-foreground/60 hover:bg-primary-foreground/80"
                )}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-semibold",
            property.isForRent 
              ? "bg-navy text-primary-foreground" 
              : "bg-gold text-foreground"
          )}>
            {property.isForRent ? 'Aluguel' : 'Venda'}
          </span>
          {property.views > 500 && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-destructive text-destructive-foreground">
              Popular
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(property.id);
          }}
          className={cn(
            "absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
            isFavorite 
              ? "bg-destructive text-destructive-foreground" 
              : "bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-destructive hover:bg-card"
          )}
        >
          <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3">
          <p className="text-2xl font-bold text-primary-foreground drop-shadow-lg font-serif">
            {formatPrice(property.price, property.isForRent)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-1 mb-2 group-hover:text-gold transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.neighborhood}, {property.city}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
          )}
          {property.parkingSpots > 0 && (
            <div className="flex items-center gap-1.5">
              <Car className="w-4 h-4" />
              <span>{property.parkingSpots}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4" />
            <span>{property.area}m²</span>
          </div>
        </div>
      </div>
    </div>
  );
}
