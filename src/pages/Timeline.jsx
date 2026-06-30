import React, { useMemo } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { PremiumDayCard } from '../components/PremiumDayCard';

export function Timeline({ 
  destination, 
  numDays, 
  daysArray,
  activities,
  stats,
  fmt,
  handleDeleteActivity
}) {
  // Group activities by day
  const activitiesByDay = useMemo(() => {
    return daysArray.map(day => ({
      day,
      activities: activities.filter(a => a.day === day)
    }));
  }, [daysArray, activities]);

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
              Your Itinerary
            </h1>
            <p className="text-lg text-white/60 font-light">
              {destination} • {numDays}-Day Timeline
            </p>
          </div>

          {/* Stats Overview Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-teal/30 via-neon-coral/20 to-transparent rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            
            <div className="relative glass-card-premium p-6 glass-hover">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Total Activities</p>
                  <p className="text-3xl font-display font-bold text-white">{activities.length}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Scheduled</p>
                  <p className="text-3xl font-display font-bold text-neon-teal">{stats.assignedCount}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Unassigned</p>
                  <p className="text-3xl font-display font-bold text-neon-coral">{stats.unassignedCount}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Total Spent</p>
                  <p className="text-3xl font-display font-bold text-neon-indigo">{fmt(stats.spent)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Days Grid - Asymmetric Staggered */}
        <div className="px-6 md:px-8 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activitiesByDay.map((item, idx) => (
              <div key={item.day} className={`${idx % 2 === 1 ? 'md:mt-12' : ''}`}>
                <PremiumDayCard
                  day={item.day}
                  activities={item.activities}
                  onDeleteActivity={handleDeleteActivity}
                  staggerIndex={idx}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
