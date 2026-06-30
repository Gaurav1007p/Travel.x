import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function DroppableContainer({ id, title, badge, subValue, variant = 'pool', children }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef}
      className={`rounded-2xl border transition-all duration-200 flex flex-col p-4 ${
        variant === 'column' ? 'bg-white h-full min-h-[180px]' : 'bg-slate-50 border-dashed'
      } ${isOver ? 'border-blue-500 bg-blue-50/50 shadow-md scale-[1.01]' : 'border-slate-200 bg-white'}`}
    >
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 flex-shrink-0">
        <span className="text-xs font-bold text-slate-700 tracking-wide flex items-center gap-1.5">
          {variant === 'column' ? '📅' : '📋'} {title}
        </span>
        {badge !== undefined && (
          <span className="text-xs font-bold bg-slate-200/80 text-slate-600 px-2.5 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        {subValue && (
          <span className="text-xs font-bold bg-slate-900 text-white px-2.5 py-0.5 rounded-full shadow-sm">
            {subValue}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}