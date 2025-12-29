import { Building2, Users, Shield, Award, Clock, HeartHandshake } from 'lucide-react';

const advantages = [
  {
    icon: Building2,
    title: 'Maior Variedade',
    description: 'Mais de 3.000 imóveis disponíveis para você escolher o lar perfeito.',
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Todos os imóveis são verificados e documentação 100% regularizada.',
  },
  {
    icon: Users,
    title: 'Corretores Especializados',
    description: 'Equipe treinada para encontrar exatamente o que você procura.',
  },
  {
    icon: Award,
    title: 'Qualidade Premium',
    description: 'Seleção criteriosa dos melhores imóveis do mercado.',
  },
  {
    icon: Clock,
    title: 'Atendimento Ágil',
    description: 'Resposta em até 2 horas e agendamento rápido de visitas.',
  },
  {
    icon: HeartHandshake,
    title: 'Negociação Facilitada',
    description: 'Ajudamos você em todo o processo, do interesse à assinatura.',
  },
];

export function AdvantagesSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold-dark text-sm font-semibold rounded-full mb-4">
            Por que nos escolher
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vantagens de usar nossa{' '}
            <span className="text-gradient">Imobiliária</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Há mais de 15 anos conectando pessoas aos seus sonhos, com excelência e dedicação em cada atendimento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={advantage.title}
              className="group bg-card p-8 rounded-2xl shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                <advantage.icon className="w-7 h-7 text-gold group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {advantage.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
