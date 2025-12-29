import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroCarousel } from '@/components/HeroCarousel';
import { PropertyCard } from '@/components/PropertyCard';
import { AdvantagesSection } from '@/components/AdvantagesSection';
import { mockProperties } from '@/data/mockData';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ClientPage = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filter, setFilter] = useState<'all' | 'sale' | 'rent'>('all');

  const topProperties = [...mockProperties]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const filteredProperties = mockProperties.filter(property => {
    if (filter === 'sale') return !property.isForRent;
    if (filter === 'rent') return property.isForRent;
    return true;
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header variant="transparent" />
      
      {/* Hero Carousel */}
      <HeroCarousel properties={topProperties} />

      {/* Search Bar */}
      <section className="relative -mt-12 z-20">
        <div className="container mx-auto px-6">
          <div className="bg-card rounded-2xl shadow-strong p-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Busque por cidade, bairro ou tipo de imóvel..."
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <Button variant="gold" size="xl" className="h-14">
              <Search className="w-5 h-5 mr-2" />
              Buscar
            </Button>
            <Button variant="outline" size="xl" className="h-14">
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filtros
            </Button>
          </div>
        </div>
      </section>

      
      {/* Properties Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                Imóveis <span className="text-gradient">Disponíveis</span>
              </h2>
              <p className="text-muted-foreground">
                Encontre o imóvel ideal para você e sua família
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-secondary rounded-xl p-1">
              {[
                { value: 'all', label: 'Todos' },
                { value: 'sale', label: 'Comprar' },
                { value: 'rent', label: 'Alugar' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value as typeof filter)}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                    filter === tab.value
                      ? 'bg-card text-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <div
                key={property.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PropertyCard
                  property={property}
                  onFavorite={toggleFavorite}
                  isFavorite={favorites.includes(property.id)}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="xl">
              Ver Mais Imóveis
            </Button>
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <AdvantagesSection />
      
      
      {/* Contato Section */}
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Pronto para encontrar seu novo lar?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Entre em contato conosco e deixe nossos especialistas ajudá-lo a encontrar o imóvel perfeito.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gold" size="xl">
              Falar com Corretor
            </Button>
            <Button variant="heroOutline" size="xl">
              Agendar Visita
            </Button>
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  );
};

export default ClientPage;
