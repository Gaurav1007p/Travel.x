import React, { useState, useMemo } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Compass } from 'lucide-react';
import { PremiumDashboard } from './pages/PremiumDashboard';
import { Timeline } from './pages/Timeline';
import { Budget } from './pages/Budget';
import { FloatingDock } from './components/FloatingDock';
import { PremiumActivityCard } from './components/PremiumActivityCard';

const CATS = {
  stay: { emoji: "🏨", label: "Stay" },
  dining: { emoji: "🍕", label: "Dining" },
  sightseeing: { emoji: "🏛️", label: "Sightseeing" },
  transport: { emoji: "✈️", label: "Transport" }
};

const CURRENCIES = [
  { code: "USD", sym: "$" }, { code: "EUR", sym: "€" }, { code: "GBP", sym: "£" },
  { code: "INR", sym: "₹" }, { code: "JPY", sym: "¥" }, { code: "AUD", sym: "A$" }
];

function AppContent() {
  // Application Data States
  const [destination, setDestination] = useState('Paris Getaway');
  const [numDays, setNumDays] = useState(4);
  const [budget, setBudget] = useState(2000);
  const [currency, setCurrency] = useState({ code: "USD", sym: "$" });
  
  // Form input sub-states
  const [newTitle, setNewTitle] = useState('');
  const [newCost, setNewCost] = useState('');
  const [newDay, setNewDay] = useState('unassigned');
  const [selCat, setSelCat] = useState('dining');

  const [activities, setActivities] = useState([
    { id: "a1", title: "Flight BOM → CDG", cost: 480, cat: "transport", day: "Day 1" },
    { id: "a2", title: "Check-in Hôtel Le Marais", cost: 220, cat: "stay", day: "Day 1" },
    { id: "a3", title: "Seine River Walk", cost: 0, cat: "sightseeing", day: "Day 1" },
    { id: "a4", title: "Louvre Museum", cost: 20, cat: "sightseeing", day: "Day 2" },
    { id: "a5", title: "Café de Flore Brunch", cost: 35, cat: "dining", day: "Day 2" },
    { id: "a6", title: "Eiffel Tower Visit", cost: 28, cat: "sightseeing", day: "Day 2" },
    { id: "a7", title: "Shopping – Galeries Lafayette", cost: 120, cat: "sightseeing", day: "unassigned" },
    { id: "a8", title: "Seine Cruise", cost: 15, cat: "transport", day: "unassigned" }
  ]);

  const [activeDragId, setActiveDragId] = useState(null);

  // Computed Arrays & Statistics
  const daysArray = useMemo(() => Array.from({ length: numDays }, (_, i) => `Day ${i + 1}`), [numDays]);

  const stats = useMemo(() => {
    const spent = activities.reduce((acc, curr) => acc + Number(curr.cost || 0), 0);
    const assignedCount = activities.filter(a => a.day !== 'unassigned' && daysArray.includes(a.day)).length;
    const unassignedCount = activities.length - assignedCount;
    const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
    const overBudget = spent > budget;

    return { spent, assignedCount, unassignedCount, pct, overBudget };
  }, [activities, budget, daysArray]);

  const fmt = (val) => `${currency.sym}${Math.round(val).toLocaleString()}`;

  // State Adjustment Logic
  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || newCost === '' || Number(newCost) < 0) return;
    
    const newAct = {
      id: `act-${Date.now()}`,
      title: newTitle.trim(),
      cost: parseFloat(newCost),
      cat: selCat,
      day: newDay
    };

    setActivities(prev => [...prev, newAct]);
    setNewTitle('');
    setNewCost('');
  };

  const handleDeleteActivity = (id) => {
    setActivities(prev => prev.filter(act => act.id !== id));
  };

  const changeDays = (delta) => {
    setNumDays(prev => {
      const next = Math.min(14, Math.max(1, prev + delta));
      const nextDays = Array.from({ length: next }, (_, i) => `Day ${i + 1}`);
      setActivities(curr => curr.map(a => (!nextDays.includes(a.day) && a.day !== 'unassigned' ? { ...a, day: 'unassigned' } : a)));
      return next;
    });
  };

  // Drag and Drop Core Logic
  const handleDragStart = ({ active }) => setActiveDragId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveDragId(null);
    if (!over) return;

    const activityId = active.id;
    const targetContainer = over.id; // Either 'unassigned' or 'Day X'

    setActivities(prev => prev.map(act => act.id === activityId ? { ...act, day: targetContainer } : act));
  };

  const activeDragItem = useMemo(() => activities.find(a => a.id === activeDragId), [activities, activeDragId]);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="min-h-screen w-full bg-luxury-dark">
        {/* Routes */}
        <Routes>
          <Route 
            path="/" 
            element={
              <PremiumDashboard
                destination={destination} setDestination={setDestination}
                numDays={numDays} changeDays={changeDays}
                budget={budget} setBudget={setBudget}
                currency={currency} setCurrency={setCurrency}
                newTitle={newTitle} setNewTitle={setNewTitle}
                newCost={newCost} setNewCost={setNewCost}
                newDay={newDay} setNewDay={setNewDay}
                selCat={selCat} setSelCat={setSelCat}
                activities={activities} daysArray={daysArray}
                stats={stats} fmt={fmt}
                handleAddActivity={handleAddActivity}
                handleDeleteActivity={handleDeleteActivity}
              />
            }
          />
          <Route 
            path="/timeline" 
            element={
              <Timeline
                destination={destination}
                numDays={numDays}
                daysArray={daysArray}
                activities={activities}
                stats={stats}
                fmt={fmt}
                handleDeleteActivity={handleDeleteActivity}
              />
            }
          />
          <Route 
            path="/budget" 
            element={
              <Budget
                budget={budget}
                activities={activities}
                stats={stats}
                fmt={fmt}
              />
            }
          />
        </Routes>

        {/* Floating Dock Navigation */}
        <FloatingDock />

        {/* Global DnD Portal Rendering Overlay */}
        <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
          {activeDragId && activeDragItem ? (
            <div className="shadow-neon-teal opacity-90 scale-105 pointer-events-none">
              <PremiumActivityCard
                activity={activeDragItem}
                onDelete={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}