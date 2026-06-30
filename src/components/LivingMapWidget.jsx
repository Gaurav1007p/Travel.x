import React, { useEffect, useState } from 'react';

export function LivingMapWidget({ destination }) {
  const [coordinates, setCoordinates] = useState([
    { x: 20, y: 30, label: 'Start', color: 'from-neon-teal to-neon-teal' },
    { x: 50, y: 50, label: 'Checkpoint', color: 'from-neon-coral to-neon-coral' },
    { x: 80, y: 25, label: 'Destination', color: 'from-neon-indigo to-neon-indigo' },
  ]);

  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <div className="relative group h-full overflow-hidden rounded-xl">
      {/* Glow Background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-teal/30 via-neon-coral/30 to-neon-indigo/30 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
      
      {/* Card */}
      <div className="relative bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl border border-white/10 rounded-xl p-6 h-full flex flex-col justify-between hover:bg-white/[0.06] transition-all duration-300">
        {/* Header */}
        <div className="mb-4 pb-4 border-b border-white/10">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Live Navigation</p>
          <h3 className="text-xl font-display font-bold text-white">The Living Map</h3>
        </div>

        {/* Map Canvas */}
        <div className="flex-1 relative bg-luxury-dark/50 border border-white/5 rounded-lg overflow-hidden mb-4">
          {/* Grid Background */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Animated Paths */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Connection Lines */}
            {coordinates.map((coord, idx) => {
              if (idx === coordinates.length - 1) return null;
              const nextCoord = coordinates[idx + 1];
              return (
                <g key={`line-${idx}`}>
                  {/* Dashed Path */}
                  <line
                    x1={coord.x}
                    y1={coord.y}
                    x2={nextCoord.x}
                    y2={nextCoord.y}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    opacity="0.4"
                  />
                  {/* Animated Pulse Line */}
                  <line
                    x1={coord.x}
                    y1={coord.y}
                    x2={nextCoord.x}
                    y2={nextCoord.y}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    opacity="0"
                    style={{
                      animation: `dash 2s linear infinite`,
                      animationDelay: `${idx * 0.5}s`
                    }}
                  />
                </g>
              );
            })}

            {/* Gradients */}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F2FE" />
                <stop offset="50%" stopColor="#FF6B6B" />
                <stop offset="100%" stopColor="#B366FF" />
              </linearGradient>
            </defs>

            {/* Coordinate Points */}
            {coordinates.map((coord, idx) => (
              <g key={`coord-${idx}`}>
                {/* Outer Pulse Ring */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r="4"
                  fill="none"
                  stroke={coord.color.includes('teal') ? '#00F2FE' : coord.color.includes('coral') ? '#FF6B6B' : '#B366FF'}
                  strokeWidth="1"
                  opacity="0.3"
                  style={{ animation: 'pulse 2s ease-in-out infinite' }}
                />
                {/* Center Point */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r="2"
                  fill={coord.color.includes('teal') ? '#00F2FE' : coord.color.includes('coral') ? '#FF6B6B' : '#B366FF'}
                />
              </g>
            ))}
          </svg>

          <style>{`
            @keyframes dash {
              to {
                stroke-dashoffset: -10;
                opacity: 1;
              }
            }
            @keyframes pulse {
              0%, 100% { r: 4; opacity: 0.3; }
              50% { r: 8; opacity: 0.1; }
            }
          `}</style>
        </div>

        {/* Coordinates Legend */}
        <div className="space-y-2">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-2">Route Points</p>
          {coordinates.map((coord, idx) => (
            <div key={`legend-${idx}`} className="flex items-center gap-2 text-xs">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${coord.color}`} />
              <span className="text-white/70 font-mono">{coord.label}</span>
              <span className="text-white/40 ml-auto">{coord.x}, {coord.y}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
