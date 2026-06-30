import React from 'react';
import { Wallet, TrendingUp, AlertCircle, CheckCircle, PieChart } from 'lucide-react';

const CATS = {
  stay: { emoji: "🏨", label: "Stay", color: 'from-blue-500/30 to-blue-600/30', accent: 'text-blue-300', progress: 'bg-blue-500' },
  dining: { emoji: "🍕", label: "Dining", color: 'from-amber-500/30 to-amber-600/30', accent: 'text-amber-300', progress: 'bg-amber-500' },
  sightseeing: { emoji: "🏛️", label: "Sightseeing", color: 'from-emerald-500/30 to-emerald-600/30', accent: 'text-emerald-300', progress: 'bg-emerald-500' },
  transport: { emoji: "✈️", label: "Transport", color: 'from-purple-500/30 to-purple-600/30', accent: 'text-purple-300', progress: 'bg-purple-500' }
};

export function Budget({ 
  budget, 
  activities,
  stats,
  fmt
}) {
  // Calculate spending by category
  const spendingByCategory = Object.keys(CATS).map(cat => {
    const catActivities = activities.filter(a => a.cat === cat);
    const total = catActivities.reduce((sum, act) => sum + act.cost, 0);
    return {
      cat,
      ...CATS[cat],
      total,
      count: catActivities.length,
      percentage: stats.spent > 0 ? (total / stats.spent) * 100 : 0
    };
  });

  // Calculate spending by day
  const spendingByDay = Array.from({ length: 10 }, (_, i) => `Day ${i + 1}`)
    .map(day => {
      const dayActivities = activities.filter(a => a.day === day);
      const total = dayActivities.reduce((sum, act) => sum + act.cost, 0);
      return { day, total, count: dayActivities.length };
    })
    .filter(d => d.count > 0);

  const avgPerDay = stats.spent / spendingByDay.length || 0;

  return (
    <div className="min-h-screen relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-neon-coral/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-indigo/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-neon-teal/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Header */}
        <div className="px-6 md:px-8 pt-8 mb-12">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
              Financial Hub
            </h1>
            <p className="text-lg text-white/60 font-light">Real-time budget analytics and spending insights</p>
          </div>
        </div>

        {/* Overview Cards Grid */}
        <div className="px-6 md:px-8 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Budget */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-teal/30 to-neon-teal/10 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="relative glass-card-premium p-8 glass-hover flex flex-col justify-between h-full">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Total Budget</p>
                  <h3 className="text-4xl font-display font-bold text-neon-teal">{fmt(budget)}</h3>
                </div>
                <Wallet className="w-10 h-10 text-neon-teal opacity-20" />
              </div>
              <p className="text-xs text-white/50">Your spending limit</p>
            </div>
          </div>

          {/* Total Spent */}
          <div className="group relative">
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${stats.overBudget ? 'from-neon-coral/30 to-neon-coral/10' : 'from-neon-teal/30 to-neon-teal/10'} rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
            <div className="relative glass-card-premium p-8 glass-hover flex flex-col justify-between h-full">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Total Spent</p>
                  <h3 className={`text-4xl font-display font-bold ${stats.overBudget ? 'text-neon-coral' : 'text-neon-teal'}`}>
                    {fmt(stats.spent)}
                  </h3>
                </div>
                <TrendingUp className={`w-10 h-10 opacity-20 ${stats.overBudget ? 'text-neon-coral' : 'text-neon-teal'}`} />
              </div>
              <p className="text-xs text-white/50">{stats.pct.toFixed(1)}% of total budget</p>
            </div>
          </div>

          {/* Remaining */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-indigo/30 to-neon-indigo/10 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="relative glass-card-premium p-8 glass-hover flex flex-col justify-between h-full">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Remaining</p>
                  <h3 className="text-4xl font-display font-bold text-neon-indigo">
                    {fmt(Math.max(0, budget - stats.spent))}
                  </h3>
                </div>
                <CheckCircle className={`w-10 h-10 opacity-20 ${stats.overBudget ? 'text-neon-coral' : 'text-neon-indigo'}`} />
              </div>
              <p className="text-xs text-white/50">{stats.overBudget ? 'Over budget!' : 'Available funds'}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="px-6 md:px-8 pb-32 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Budget Progress & By Category */}
          <div className="lg:col-span-2 space-y-8">
            {/* Budget Utilization */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-coral/30 via-neon-teal/20 to-transparent rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              
              <div className="relative glass-card-premium p-8 glass-hover">
                <div className="flex items-center gap-3 mb-6">
                  <PieChart className="w-6 h-6 text-neon-coral" />
                  <h3 className="text-2xl font-display font-bold text-white">Budget Utilization</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-white/70">Progress</span>
                      <span className="text-2xl font-mono font-bold text-neon-coral">{stats.pct.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-3 bg-white/5 border border-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          stats.overBudget ? 'bg-gradient-to-r from-neon-coral to-neon-coral/50' :
                          stats.pct >= 75 ? 'bg-gradient-to-r from-neon-peach to-neon-peach/50' :
                          'bg-gradient-to-r from-neon-teal to-neon-teal/50'
                        }`}
                        style={{ width: `${Math.min(stats.pct, 100)}%` }}
                      />
                    </div>
                  </div>

                  {stats.overBudget && (
                    <div className="p-4 bg-neon-coral/10 border border-neon-coral/30 rounded-lg flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-neon-coral flex-shrink-0" />
                      <p className="text-sm text-neon-coral font-semibold">
                        Over budget by {fmt(stats.spent - budget)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Spending by Category */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-indigo/30 via-neon-coral/20 to-transparent rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              
              <div className="relative glass-card-premium p-8 glass-hover">
                <h3 className="text-2xl font-display font-bold text-white mb-6">Spending by Category</h3>

                <div className="space-y-5">
                  {spendingByCategory.map(cat => (
                    <div key={cat.cat} className="group/cat">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{cat.emoji}</span>
                          <div>
                            <p className="font-semibold text-white">{cat.label}</p>
                            <p className="text-xs text-white/50">{cat.count} activities</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-white">{fmt(cat.total)}</p>
                          <p className="text-xs text-white/50">{cat.percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                      
                      <div className="w-full h-2 bg-white/5 border border-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${cat.progress}`}
                          style={{ width: `${cat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Daily Breakdown */}
          <div className="lg:col-span-1">
            <div className="group relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-teal/30 via-neon-indigo/20 to-transparent rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              
              <div className="relative glass-card-premium p-8 glass-hover h-full">
                <h3 className="text-2xl font-display font-bold text-white mb-6">Daily Breakdown</h3>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {spendingByDay.length > 0 ? (
                    <>
                      {spendingByDay.map(day => (
                        <div key={day.day} className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-white text-sm">{day.day}</p>
                            <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">{day.count} activities</span>
                          </div>
                          <div className="flex items-baseline justify-between">
                            <p className="text-lg font-mono font-bold text-neon-teal">{fmt(day.total)}</p>
                            <p className="text-xs text-white/50">{((day.total / stats.spent) * 100).toFixed(1)}%</p>
                          </div>
                        </div>
                      ))}
                      
                      {/* Average Per Day */}
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="p-4 bg-gradient-to-r from-neon-teal/20 to-neon-teal/10 border border-neon-teal/30 rounded-lg">
                          <p className="text-xs uppercase tracking-widest text-white/60 mb-1">Average per day</p>
                          <p className="text-2xl font-mono font-bold text-neon-teal">{fmt(avgPerDay)}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-white/50 text-sm">No scheduled activities yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
