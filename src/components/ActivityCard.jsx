import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Trash2 } from 'lucide-react';

export function ActivityCard({ act, meta, formatter, onDelete, isDragging = false }) {
  const { attributes, listeners, setNodeRef, transform, isDragging: currentIsDragging } = useDraggable({
    id: act.id,
  });

  // Prevent element jumping style glitches during active drag states
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  if (currentIsDragging && !isDragging) {
    return <div ref={setNodeRef} className="h-16 bg-slate-100 border border-dashed border-slate-300 rounded-xl opacity-40" />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group border rounded-xl p-3 bg-white flex items-start gap-3 select-none transition-shadow duration-150 hover:shadow-md cursor-grab active:cursor-grabbing relative ${meta?.bg || 'border-slate-200'}`}
    >
      <span className="text-lg leading-none mt-0.5 flex-shrink-0">{meta?.emoji || '📍'}</span>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-800 truncate pr-4">{act.title}</h4>
        <div className="text-[11px] font-semibold text-slate-500 mt-0.5">{formatter(act.cost)}</div>
        <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1.5 shadow-sm ${meta?.badge || 'bg-slate-100 text-slate-700'}`}>
          {meta?.label || 'General'}
        </span>
      </div>

      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(act.id);
          }}
          className="absolute right-2.5 bottom-2.5 text-slate-400 hover:text-rose-500 transition-colors p-1 rounded-md hover:bg-rose-50 opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Delete Node"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}