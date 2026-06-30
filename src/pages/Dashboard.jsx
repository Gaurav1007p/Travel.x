import React from 'react';
import { Sliders, DollarSign, Wallet, Plus } from 'lucide-react';
import { ActivityCard } from '../components/ActivityCard';
import { DroppableContainer } from '../components/DroppableContainer';

const CATS = {
  stay: { emoji: "🏨", label: "Stay", bg: "bg-blue-50 border-blue-200 text-blue-700", badge: "bg-blue-100 text-blue-800" },
  dining: { emoji: "🍕", label: "Dining", bg: "bg-amber-50 border-amber-200 text-amber-700", badge: "bg-amber-100 text-amber-800" },
  sightseeing: { emoji: "🏛️", label: "Sightseeing", bg: "bg-emerald-50 border-emerald-200 text-emerald-700", badge: "bg-emerald-100 text-emerald-800" },
  transport: { emoji: "✈️", label: "Transport", bg: "bg-purple-50 border-purple-200 text-purple-700", badge: "bg-purple-100 text-purple-800" }
};

const CURRENCIES = [
  { code: "USD", sym: "$" }, { code: "EUR", sym: "€" }, { code: "GBP", sym: "£" },
  { code: "INR", sym: "₹" }, { code: "JPY", sym: "¥" }, { code: "AUD", sym: "A$" }
];

export function Dashboard({ 
  destination, setDestination, 
  numDays, changeDays, 
  budget, setBudget, 
  currency, setCurrency,
  newTitle, setNewTitle,
  newCost, setNewCost,
  newDay, setNewDay,
  selCat, setSelCat,
  activities, daysArray,
  stats, fmt,
  handleAddActivity,
  handleDeleteActivity
}) {
  return (
    <div className="max-w-3xl">
      {/* Trip Config Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-blue-500" /> Plan Adjustments
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Destination Spot</label>
            <input 
              type="text" value={destination} onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-3 py-2 text-sm outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Itinerary Horizon</label>
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-1">
              <button onClick={() => changeDays(-1)} className="w-9 h-9 flex items-center justify-center font-bold rounded-lg text-slate-500 hover:bg-white hover:text-blue-600 transition-all">-</button>
              <span className="font-bold text-sm text-slate-800">{numDays} Days</span>
              <button onClick={() => changeDays(1)} className="w-9 h-9 flex items-center justify-center font-bold rounded-lg text-slate-500 hover:bg-white hover:text-blue-600 transition-all">+</button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Cap Budget Target</label>
            <input 
              type="number" value={budget} onChange={(e) => setBudget(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-3 py-2 text-sm outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Currencies Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5 text-blue-500" /> Active Currency
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {CURRENCIES.map(cur => (
            <button
              key={cur.code}
              onClick={() => setCurrency(cur)}
              className={`p-2 rounded-xl text-xs font-bold transition-all border text-center ${
                currency.code === cur.code ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-sm' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cur.code} ({cur.sym})
            </button>
          ))}
        </div>
      </div>

      {/* Financial Progress Module */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Wallet className="w-3.5 h-3.5 text-blue-500" /> Financial Monitoring
        </h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cap</span>
            <span className="font-bold text-sm text-slate-700">{fmt(budget)}</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Outlay</span>
            <span className={`font-bold text-sm ${stats.overBudget ? 'text-rose-600' : 'text-blue-600'}`}>{fmt(stats.spent)}</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Residual</span>
            <span className="font-bold text-sm text-emerald-600">{fmt(Math.max(0, budget - stats.spent))}</span>
          </div>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 border overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${stats.overBudget ? 'bg-rose-500' : stats.pct >= 75 ? 'bg-amber-500' : 'bg-emerald-500'}`}
            style={{ width: `${stats.pct}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-[11px] font-medium text-slate-400">{stats.pct.toFixed(0)}% Utilized</span>
        </div>
        {stats.overBudget && (
          <div className="mt-3 flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs font-semibold text-rose-700 animate-pulse">
            ⚠️ Limit Breached by {fmt(stats.spent - budget)}!
          </div>
        )}
      </div>

      {/* Creation Terminal */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">+ Activity Desk</h3>
        <form onSubmit={handleAddActivity} className="space-y-3">
          <input 
            type="text" placeholder="Activity Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required
            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-3 py-2 text-sm outline-none transition-all"
          />
          <input 
            type="number" placeholder="Cost Asset Value" value={newCost} onChange={(e) => setNewCost(e.target.value)} required min="0"
            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-3 py-2 text-sm outline-none transition-all"
          />
          <select 
            value={newDay} onChange={(e) => setNewDay(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-3 py-2 text-sm outline-none transition-all cursor-pointer"
          >
            <option value="unassigned">Unassigned Pool</option>
            {daysArray.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <div className="grid grid-cols-2 gap-1.5">
            {Object.entries(CATS).map(([key, item]) => (
              <button
                type="button" key={key} onClick={() => setSelCat(key)}
                className={`p-2 rounded-xl text-xs font-medium text-left transition-all border flex items-center gap-2 ${
                  selCat === key ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{item.emoji}</span> {item.label}
              </button>
            ))}
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm py-2.5 shadow-sm shadow-blue-100 transition-all flex items-center justify-center gap-1.5">
            <Plus className="w-4 h-4" /> Append to Track
          </button>
        </form>
      </div>

      {/* Unassigned Pool */}
      <DroppableContainer id="unassigned" title="Pool Unassigned" badge={stats.unassignedCount}>
        {activities.filter(a => a.day === 'unassigned').length === 0 ? (
          <div className="text-center py-6 px-4 text-xs font-medium text-slate-400 flex flex-col items-center gap-2 border-2 border-dashed border-slate-200 rounded-xl">
            <span>✨</span> Allocations complete!
          </div>
        ) : (
          activities.filter(a => a.day === 'unassigned').map(act => (
            <ActivityCard key={act.id} act={act} meta={CATS[act.cat]} formatter={fmt} onDelete={handleDeleteActivity} />
          ))
        )}
      </DroppableContainer>
    </div>
  );
}
