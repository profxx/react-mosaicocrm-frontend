import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, Home, Calendar, DollarSign,
  Plus, Search, MoreVertical, Eye, Edit, Trash2,
  BarChart3, Settings, Bell, LogOut, UserCircle,
  Phone, Mail, MapPin, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';
import { mockProperties, mockUsers } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { User } from '@/types/property';

type UserRole = 'agency_manager' | 'secretary' | 'agent';

const AgencyAdminDashboard = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('agency_manager');
  const [activeTab, setActiveTab] = useState('dashboard');

  const currentUser = mockUsers.find(u => u.role === currentRole) || mockUsers[1];

  const roleLabels = {
    agency_manager: 'Gestor da Imobiliária',
    secretary: 'Secretária',
    agent: 'Corretor',
  };

  const roleTabs = {
    agency_manager: [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'properties', label: 'Imóveis', icon: Home },
      { id: 'team', label: 'Equipe', icon: Users },
      { id: 'schedule', label: 'Agenda', icon: Calendar },
      { id: 'finances', label: 'Financeiro', icon: DollarSign },
      { id: 'settings', label: 'Configurações', icon: Settings },
    ],
    secretary: [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'properties', label: 'Imóveis', icon: Home },
      { id: 'schedule', label: 'Agenda', icon: Calendar },
      { id: 'clients', label: 'Clientes', icon: Users },
    ],
    agent: [
      { id: 'properties', label: 'Meus Imóveis', icon: Home },
      { id: 'schedule', label: 'Minha Agenda', icon: Calendar },
      { id: 'clients', label: 'Meus Clientes', icon: Users },
    ],
  };

  const agentProperties = mockProperties.filter(p => p.agentName === currentUser.name);
  const displayProperties = currentRole === 'agent' ? agentProperties : mockProperties;

  const teamMembers = mockUsers.filter(u => u.agencyId === '1' && u.role !== 'saas_admin');

  const upcomingVisits = [
    { id: 1, property: 'Apartamento Copacabana', client: 'João Carlos', time: '14:00', date: 'Hoje' },
    { id: 2, property: 'Casa Alphaville', client: 'Maria Silva', time: '16:30', date: 'Hoje' },
    { id: 3, property: 'Cobertura Jardins', client: 'Pedro Santos', time: '10:00', date: 'Amanhã' },
    { id: 4, property: 'Sala Comercial Faria Lima', client: 'Ana Souza', time: '15:00', date: 'Amanhã' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r border-border p-6 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gold flex items-center justify-center">
            <Building2 className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold text-foreground">Premium</span>
            <span className="block text-xs text-muted-foreground">Imóveis</span>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="mb-6 p-4 bg-secondary rounded-xl">
          <p className="text-xs text-muted-foreground mb-2">Simulando papel:</p>
          <select
            value={currentRole}
            onChange={(e) => {
              setCurrentRole(e.target.value as UserRole);
              setActiveTab(roleTabs[e.target.value as UserRole][0].id);
            }}
            className="w-full h-10 px-3 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="agency_manager">Gestor</option>
            <option value="secretary">Secretária</option>
            <option value="agent">Corretor</option>
          </select>
        </div>

        <nav className="space-y-2 flex-1">
          {roleTabs[currentRole].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                activeTab === item.id 
                  ? "bg-gold text-foreground shadow-gold" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-border space-y-2">
          <Link to="/">
            <Button variant="outline" className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Voltar ao Site
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 p-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 bg-gold/20 text-gold-dark text-xs font-semibold rounded-full">
                {roleLabels[currentRole]}
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-1">
              Olá, {currentUser.name.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground">
              {currentRole === 'agency_manager' && 'Gerencie sua imobiliária de forma eficiente.'}
              {currentRole === 'secretary' && 'Organize as agendas e atendimentos do dia.'}
              {currentRole === 'agent' && 'Acompanhe seus imóveis e visitas agendadas.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            {(currentRole === 'agency_manager' || currentRole === 'secretary') && (
              <Button variant="gold">
                <Plus className="w-4 h-4 mr-2" />
                Novo Imóvel
              </Button>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <>
            {/* Quick Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total de Imóveis', value: displayProperties.length, icon: Home, color: 'bg-navy' },
                { label: 'Visitas Hoje', value: 8, icon: Calendar, color: 'bg-gold' },
                { label: 'Clientes Ativos', value: 45, icon: Users, color: 'bg-success' },
                { label: currentRole === 'agent' ? 'Comissões Mês' : 'Receita Mês', value: 'R$ 28.500', icon: DollarSign, color: 'bg-navy-light' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    stat.color
                  )}>
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Upcoming Visits */}
              <div className="lg:col-span-2 bg-card rounded-2xl shadow-soft">
                <div className="p-6 border-b border-border">
                  <h2 className="font-serif text-xl font-semibold text-foreground">
                    Próximas Visitas
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  {upcomingVisits.map((visit) => (
                    <div
                      key={visit.id}
                      className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-gold-dark" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{visit.property}</p>
                        <p className="text-sm text-muted-foreground">Cliente: {visit.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{visit.time}</p>
                        <p className="text-sm text-muted-foreground">{visit.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Members (only for manager) */}
              {currentRole === 'agency_manager' && (
                <div className="bg-card rounded-2xl shadow-soft">
                  <div className="p-6 border-b border-border">
                    <h2 className="font-serif text-xl font-semibold text-foreground">
                      Equipe
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <UserCircle className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {member.role === 'agency_manager' ? 'Gestor' : member.role === 'secretary' ? 'Secretária' : 'Corretor'}
                          </p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-success" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {currentRole === 'agent' ? 'Meus Imóveis' : 'Todos os Imóveis'}
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar imóvel..."
                    className="h-10 pl-10 pr-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                {(currentRole === 'agency_manager' || currentRole === 'secretary') && (
                  <Button variant="gold">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}

        {/* Team Tab (Manager Only) */}
        {activeTab === 'team' && currentRole === 'agency_manager' && (
          <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="font-serif text-xl font-semibold text-foreground">
                Gerenciar Equipe
              </h2>
              <Button variant="gold">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Membro
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Nome</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Email</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Cargo</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Status</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <UserCircle className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <span className="font-medium text-foreground">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{member.email}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold",
                          member.role === 'agency_manager' 
                            ? "bg-gold/20 text-gold-dark" 
                            : member.role === 'secretary'
                            ? "bg-navy/10 text-navy"
                            : "bg-muted text-muted-foreground"
                        )}>
                          {member.role === 'agency_manager' ? 'Gestor' : member.role === 'secretary' ? 'Secretária' : 'Corretor'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success/20 text-success">
                          Ativo
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="bg-card rounded-2xl shadow-soft p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
              {currentRole === 'agent' ? 'Minha Agenda' : 'Agenda de Visitas'}
            </h2>
            <div className="space-y-4">
              {upcomingVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-gold flex items-center justify-center text-foreground">
                    <div className="text-center">
                      <p className="text-lg font-bold">{visit.time.split(':')[0]}</p>
                      <p className="text-xs">:{visit.time.split(':')[1]}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{visit.property}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {visit.client}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {visit.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="gold" size="sm">
                      Detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="font-serif text-xl font-semibold text-foreground">
                {currentRole === 'agent' ? 'Meus Clientes' : 'Clientes'}
              </h2>
              <Button variant="gold">
                <Plus className="w-4 h-4 mr-2" />
                Novo Cliente
              </Button>
            </div>

            <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['João Carlos', 'Maria Silva', 'Pedro Santos', 'Ana Souza', 'Carlos Lima', 'Fernanda Costa'].map((name, i) => (
                <div key={i} className="p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <UserCircle className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{name}</p>
                      <p className="text-sm text-muted-foreground">Interessado em compra</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="w-4 h-4 mr-1" />
                      Ligar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Finances Tab (Manager Only) */}
        {activeTab === 'finances' && currentRole === 'agency_manager' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: 'Receita Total', value: 'R$ 285.000', change: '+18%' },
                { label: 'Comissões Pagas', value: 'R$ 42.500', change: '+12%' },
                { label: 'Lucro Líquido', value: 'R$ 142.500', change: '+22%' },
              ].map((item) => (
                <div key={item.label} className="bg-card rounded-2xl p-6 shadow-soft">
                  <p className="text-muted-foreground text-sm mb-2">{item.label}</p>
                  <p className="text-3xl font-bold text-foreground mb-2">{item.value}</p>
                  <span className="text-sm text-success font-medium">{item.change} vs mês anterior</span>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl shadow-soft p-6">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Últimas Transações
              </h3>
              <div className="space-y-3">
                {[
                  { desc: 'Venda - Apartamento Copacabana', value: 'R$ 45.000', date: '28/12/2024' },
                  { desc: 'Comissão - Marina Santos', value: '-R$ 6.750', date: '28/12/2024' },
                  { desc: 'Aluguel - Sala Comercial', value: 'R$ 2.800', date: '27/12/2024' },
                  { desc: 'Venda - Casa Alphaville', value: 'R$ 62.500', date: '25/12/2024' },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                    <div>
                      <p className="font-medium text-foreground">{tx.desc}</p>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                    <p className={cn(
                      "font-semibold",
                      tx.value.startsWith('-') ? "text-destructive" : "text-success"
                    )}>
                      {tx.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab (Manager Only) */}
        {activeTab === 'settings' && currentRole === 'agency_manager' && (
          <div className="bg-card rounded-2xl shadow-soft p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
              Configurações da Imobiliária
            </h2>
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome da Imobiliária
                </label>
                <input
                  type="text"
                  defaultValue="Premium Imóveis"
                  className="w-full h-12 px-4 rounded-xl bg-secondary border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  CRECI
                </label>
                <input
                  type="text"
                  defaultValue="CRECI-SP 123456"
                  className="w-full h-12 px-4 rounded-xl bg-secondary border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  defaultValue="Av. Paulista, 1000 - São Paulo, SP"
                  className="w-full h-12 px-4 rounded-xl bg-secondary border-0 text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
              <Button variant="gold" size="lg">
                Salvar Alterações
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AgencyAdminDashboard;
