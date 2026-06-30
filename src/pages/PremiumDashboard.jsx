import React, { useState, useMemo } from 'react';
import { Plus, Settings } from 'lucide-react';
import { HeroHeader } from '../components/HeroHeader';
import { PassportWidget } from '../components/PassportWidget';
import { LivingMapWidget } from '../components/LivingMapWidget';
import { CoTravelersPulse } from '../components/CoTravelersPulse';
import { PremiumActivityCard } from '../components/PremiumActivityCard';

const CATS = {
  stay: { emoji: "🏨", label: "Stay" },
  dining: { emoji: "🍕", label: "Dining" },
  sightseeing: { emoji: "🏛️", label: "Sightseeing" },
  transport: { emoji: "✈️", label: "Transport" }
};

export function PremiumDashboard({
  destination,
  setDestination,
  numDays,
  changeDays,
  budget,
  setBudget,
  currency,
  setCurrency,
  activities,
  stats,
  handleAddActivity,
  handleDeleteActivity,
  newTitle,
  setNewTitle,
  newCost,
  setNewCost,
  newDay,
  setNewDay,
  selCat,
  setSelCat,
}) {
  const [showAddForm, setShowAddForm] = useState(false);

  const daysArray = useMemo(() => Array.from({ length: numDays }, (_, i) => `Day ${i + 1}`), [numDays]);
  const unassignedActivities = activities.filter(a => a.day === 'unassigned');

  const CURRENCIES = [
    { code: "USD", sym: "$" }, { code: "EUR", sym: "€" }, { code: "GBP", sym: "£" },
    { code: "INR", sym: "₹" }, { code: "JPY", sym: "¥" }, { code: "AUD", sym: "A$" }
  ];

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
        <div className="px-6 md:px-8 pt-8">
          <HeroHeader destination={destination} onDestinationChange={setDestination} />
        </div>

        {/* Split Cinematic View */}
        <div className="px-6 md:px-8 pb-32 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Timeline Asymmetric View */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plan Adjustments Card */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-teal/30 via-neon-coral/20 to-transparent rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              
              <div className="relative glass-card-premium p-8 space-y-6 glass-hover">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-display font-bold text-white">Plan Adjustments</h2>
                  <Settings className="w-6 h-6 text-neon-teal" />
                </div>

                {/* Trip Duration */}
                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-widest text-white/60 font-semibold">Trip Duration</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => changeDays(-1)}
                      className="px-4 py-2 bg-neon-coral/20 hover:bg-neon-coral/40 border border-neon-coral/50 rounded-lg text-neon-coral font-bold transition-all duration-200"
                    >
                      ←
                    </button>
                    <div className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-center font-mono text-2xl font-bold text-neon-teal">
                      {numDays} Days
                    </div>
                    <button
                      onClick={() => changeDays(1)}
                      className="px-4 py-2 bg-neon-teal/20 hover:bg-neon-teal/40 border border-neon-teal/50 rounded-lg text-neon-teal font-bold transition-all duration-200"
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Budget Setting */}
                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-widest text-white/60 font-semibold">Budget Cap</label>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-mono font-bold text-neon-indigo">{currency.sym}</span>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-lg focus:border-neon-teal/50 focus:bg-white/10 transition-all focus:outline-none"
                    />
                  </div>
                </div>

                {/* Currency Selector */}
                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-widest text-white/60 font-semibold">Currency</label>
                  <div className="grid grid-cols-3 gap-2">
                    {CURRENCIES.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => setCurrency(curr)}
                        className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-200 border ${
                          currency.code === curr.code
                            ? 'bg-neon-teal/30 border-neon-teal/50 text-neon-teal'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        {curr.sym} {curr.code}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Add Activity Form */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-coral/30 via-neon-teal/20 to-transparent rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              
              <div className="relative glass-card-premium p-8 space-y-6 glass-hover">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-display font-bold text-white">Activity Desk</h3>
                  <Plus className="w-6 h-6 text-neon-coral" />
                </div>

                <form onSubmit={handleAddActivity} className="space-y-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/60 font-semibold">Activity Title</label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Enter activity name..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-neon-teal/50 focus:bg-white/10 transition-all focus:outline-none"
                    />
                  </div>

                  {/* Cost */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/60 font-semibold">Estimated Cost</label>
                    <input
                      type="number"
                      value={newCost}
                      onChange={(e) => setNewCost(e.target.value)}
                      placeholder="0"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-neon-teal/50 focus:bg-white/10 transition-all focus:outline-none"
                    />
                  </div>

                  {/* Day Selection */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/60 font-semibold">Schedule</label>
                    <select
                      value={newDay}
                      onChange={(e) => setNewDay(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-neon-teal/50 focus:bg-white/10 transition-all focus:outline-none appearance-none cursor-pointer"
                    >
                      <option value="unassigned" className="bg-luxury-dark">Unassigned Pool</option>
                      {daysArray.map((day) => (
                        <option key={day} value={day} className="bg-luxury-dark">{day}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Selector */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/60 font-semibold">Category</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(CATS).map(([key, cat]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelCat(key)}
                          className={`py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 border flex items-center gap-2 ${
                            selCat === key
                              ? 'bg-neon-indigo/30 border-neon-indigo/50 text-neon-indigo'
                              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                          }`}
                        >
                          <span>{cat.emoji}</span>
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full mt-6 py-3 bg-gradient-to-r from-neon-teal to-neon-teal/50 hover:from-neon-teal/90 hover:to-neon-teal/40 text-luxury-dark font-display font-bold rounded-lg transition-all duration-300 shadow-neon-teal hover:shadow-[0_0_30px_rgba(0,242,254,0.5)]"
                  >
                    Append to Track
                  </button>
                </form>
              </div>
            </div>

            {/* Unassigned Activities Pool */}
            {unassignedActivities.length > 0 && (
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-indigo/30 via-neon-coral/20 to-transparent rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                
                <div className="relative glass-card-premium p-8 glass-hover">
                  <h3 className="text-2xl font-display font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-2xl">📋</span>
                    Unassigned Pool
                    <span className="ml-auto px-3 py-1 bg-neon-coral/20 border border-neon-coral/50 rounded-full text-sm text-neon-coral font-mono">
                      {unassignedActivities.length}
                    </span>
                  </h3>

                  <div className="space-y-3">
                    {unassignedActivities.map((activity) => (
                      <div key={activity.id} className="animate-slide-up">
                        <PremiumActivityCard
                          activity={activity}
                          onDelete={handleDeleteActivity}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Immersive Context Widgets */}
          <div className="lg:col-span-1 space-y-6 h-fit">
            {/* Passport Widget */}
            <PassportWidget
              destination={destination}
              numDays={numDays}
              budget={budget}
              spent={stats.spent}
              currency={currency}
            />

            {/* Living Map Widget */}
            <LivingMapWidget destination={destination} />

            {/* Co-Travelers Pulse */}
            <CoTravelersPulse />
          </div>
        </div>
      </div>
    </div>
  );
}
