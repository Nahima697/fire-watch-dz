"use client";

interface EmergencyHeaderProps {
  activeFiresCount: number;
}

export default function EmergencyHeader({ activeFiresCount }: EmergencyHeaderProps) {
  const dotColor = activeFiresCount === 0 ? '#10b981' : activeFiresCount >= 1 && activeFiresCount <= 5 ? '#f59e0b' : '#ef4444';

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .pulse-dot {
            animation: pulse 2s ease-in-out infinite;
          }
          .emergency-btn-mobile .short-text {
            display: none;
          }
          @media (max-width: 640px) {
            .emergency-btn-mobile .full-text {
              display: none;
            }
            .emergency-btn-mobile .short-text {
              display: inline;
            }
          }
        `
      }} />
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
        backgroundColor: '#f8f9fa',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '12px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
          Fire Watch DZ
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <a
            href="tel:14"
            className="emergency-btn-mobile"
            style={{
              padding: '10px 16px',
              backgroundColor: '#c41e3a',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              display: 'inline-block',
              whiteSpace: 'nowrap'
            }}
          >
            <span className="full-text">📞 Protection Civile (14)</span>
            <span className="short-text">📞 14</span>
          </a>
          <a
            href="tel:1021"
            className="emergency-btn-mobile"
            style={{
              padding: '10px 16px',
              backgroundColor: '#c41e3a',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              display: 'inline-block',
              whiteSpace: 'nowrap'
            }}
          >
            <span className="full-text">📞 Numéro Vert (1021)</span>
            <span className="short-text">📞 1021</span>
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            className="pulse-dot"
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: dotColor
            }}
          />
          <span style={{ fontSize: '14px', fontWeight: '500' }}>
            {activeFiresCount} foyer(s) actif(s)
          </span>
        </div>
      </div>
    </>
  );
}
