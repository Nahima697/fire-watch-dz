"use client";

interface EmergencyHeaderProps {
  satelliteCount: number;
  citizenReportsCount: number;
}

export default function EmergencyHeader({ satelliteCount, citizenReportsCount }: EmergencyHeaderProps) {
  return (
    <>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
      `}</style>
      <div className="sticky top-0 z-50 bg-white flex flex-wrap items-center gap-4 px-4 py-3">
        <div className="flex-shrink-0">
          <h1 className="text-lg font-bold" style={{ color: '#333333' }}>Fire Watch DZ</h1>
        </div>
        <div className="flex gap-2">
          <a
            href="tel:14"
            className="px-3 py-2 rounded font-semibold text-sm"
            style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
          >
            Protection Civile 14
          </a>
          <a
            href="tel:1021"
            className="px-3 py-2 rounded font-semibold text-sm"
            style={{ backgroundColor: '#dc2626', color: '#ffffff' }}
          >
            Numéro Vert 1021
          </a>
        </div>
        <div className="ml-auto flex-shrink-0 flex gap-4">
          <div className="flex items-center gap-2">
            <span
              className="pulse-animation rounded-full"
              style={{ width: '8px', height: '8px', backgroundColor: '#f97316' }}
            />
            <div>
              <div className="font-medium text-sm" style={{ color: '#333333' }}>
                {satelliteCount} détections satellite (24h)
              </div>
              <div className="text-xs" style={{ color: '#777777' }}>
                Anomalies thermiques NASA, non confirmées
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={citizenReportsCount > 0 ? 'pulse-animation rounded-full' : 'rounded-full'}
              style={{ 
                width: '8px', 
                height: '8px', 
                backgroundColor: citizenReportsCount > 0 ? '#ef4444' : '#22c55e' 
              }}
            />
            <div>
              <div className="font-medium text-sm" style={{ color: '#333333' }}>
                {citizenReportsCount} signalement(s) citoyen(s)
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
