import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, DollarSign, TrendingUp, BarChart3, 
  Plus, Search, MoreVertical, Eye, Edit, Trash2,
  ArrowUpRight, ArrowDownRight, Settings, Bell, LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockAgencies, mockDashboardMetrics } from '@/data/mockData';
import { cn } from '@/lib/utils';

const SaaSAdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('month');

  const metrics = [
    {
      label: 'Total de Imobiliárias',
      value: mockDashboardMetrics.totalAgencies,
      change: '+12%',
      isPositive: true,
      icon: Building2,
      color: 'bg-navy',
    },
    {
      label: 'Imobiliárias Ativas',
      value: mockDashboardMetrics.activeAgencies,
      change: '+8%',
      isPositive: true,
      icon: Users,
      color: 'bg-success',
    },
    {
      label: 'Receita Total',
      value: `R$ ${(mockDashboardMetrics.totalRevenue / 1000).toFixed(0)}k`,
      change: '+23%',
      isPositive: true,
      icon: DollarSign,
      color: 'bg-gold',
    },
    {
      label: 'Receita Mensal',
      value: `R$ ${(mockDashboardMetrics.monthlyRevenue / 1000).toFixed(0)}k`,
      change: '+15%',
      isPositive: true,
      icon: TrendingUp,
      color: 'bg-navy-light',
    },
  ];

  const getPlanBadge = (plan: string) => {
    const styles = {
      basic: 'bg-muted text-muted-foreground',
      professional: 'bg-navy/10 text-navy',
      enterprise: 'bg-gold/20 text-gold-dark',
    };
    return styles[plan as keyof typeof styles] || styles.basic;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-success/20 text-success',
      inactive: 'bg-muted text-muted-foreground',
      suspended: 'bg-destructive/20 text-destructive',
    };
    return styles[status as keyof typeof styles] || styles.inactive;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r border-border p-6 hidden lg:block">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-11 h-11 rounded-xl bg-gold flex items-center justify-center">
            <Building2 className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold text-foreground">ImobSaaS</span>
            <span className="block text-xs text-muted-foreground">Admin Dashboard</span>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { icon: BarChart3, label: 'Dashboard', active: true },
            { icon: Building2, label: 'Imobiliárias' },
            { icon: Users, label: 'Usuários' },
            { icon: DollarSign, label: 'Faturamento' },
            { icon: Settings, label: 'Configurações' },
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                item.active 
                  ? "bg-gold text-foreground shadow-gold" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
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
            <h1 className="font-serif text-3xl font-bold text-foreground mb-1">
              Dashboard SaaS
            </h1>
            <p className="text-muted-foreground">
              Bem-vindo de volta! Aqui está o resumo da plataforma.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="gold">
              <Plus className="w-4 h-4 mr-2" />
              Nova Imobiliária
            </Button>
          </div>
        </header>

        {/* Period Filter */}
        <div className="flex gap-2 mb-8">
          {[
            { value: 'day', label: 'Hoje' },
            { value: 'week', label: 'Semana' },
            { value: 'month', label: 'Mês' },
          ].map((period) => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value as typeof selectedPeriod)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                selectedPeriod === period.value
                  ? "bg-navy text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  metric.color
                )}>
                  <metric.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  metric.isPositive ? "text-success" : "text-destructive"
                )}>
                  {metric.isPositive ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {metric.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Agencies Table */}
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          <div className="p-6 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Imobiliárias Cadastradas
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar imobiliária..."
                  className="h-10 pl-10 pr-4 rounded-lg bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Imobiliária</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">CRECI</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Plano</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Imóveis</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Receita/mês</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockAgencies.map((agency) => (
                  <tr key={agency.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">{agency.name}</p>
                        <p className="text-sm text-muted-foreground">{agency.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{agency.creci}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold capitalize",
                        getPlanBadge(agency.plan)
                      )}>
                        {agency.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{agency.propertiesCount}</td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      R$ {agency.monthlyRevenue.toLocaleString('pt-BR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold capitalize",
                        getStatusBadge(agency.status)
                      )}>
                        {agency.status === 'active' ? 'Ativo' : agency.status === 'inactive' ? 'Inativo' : 'Suspenso'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                          <Eye className="w-4 h-4" />
                        </button>
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
      </main>
    </div>
  );
};

export default SaaSAdminDashboard;
