"use client";

import { useState, useEffect } from 'react';
import { FireReport } from '@/lib/types';

interface EmergencyHeaderProps {
  satelliteCount: number;
  citizenReportsCount: number;
  fireReports: FireReport[];
  onSelectReport: (report: FireReport) => void;
}

export default function EmergencyHeader({ 
  satelliteCount, 
  citizenReportsCount,
  fireReports,
  onSelectReport
}: EmergencyHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isDropdownOpen && !(e.target as HTMLElement).closest('.emergency-header-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

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
      <div className="emergency-header-container sticky top-0 z-[9999] bg-white flex flex-wrap items-center gap-4 px-4 py-3">
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
        <div className="w-full sm:w-auto sm:ml-auto flex flex-wrap gap-3 mt-2 sm:mt-0">
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
          <div className="flex items-center gap-2" style={{ position: 'relative' }}>
            <div 
              onClick={() => { 
                if (citizenReportsCount > 0) setIsDropdownOpen(!isDropdownOpen); 
              }}
              style={{ 
                cursor: citizenReportsCount > 0 ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
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
            {isDropdownOpen && fireReports.length > 0 && (
              <div style={{ 
                position: 'absolute', 
                top: '100%', 
                right: 0, 
                backgroundColor: 'white', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)', 
                borderRadius: '8px', 
                zIndex: 10000, 
                maxHeight: '300px', 
                overflowY: 'auto', 
                maxWidth: 'calc(100vw - 32px)', width: '280px', 
                marginTop: '4px' 
              }}>
                <div style={{ 
                  padding: '8px 12px', 
                  borderBottom: '1px solid #eee', 
                  display: 'flex', 
                  justifyContent: 'flex-end' 
                }}>
                  <button 
                    onClick={() => setIsDropdownOpen(false)} 
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      fontSize: '18px', 
                      cursor: 'pointer', 
                      color: '#666' 
                    }}
                  >
                    ×
                  </button>
                </div>
                {fireReports.map(report => (
                  <div 
                    key={report.id} 
                    onClick={() => { 
                      onSelectReport(report); 
                      setIsDropdownOpen(false); 
                    }} 
                    style={{ 
                      padding: '12px 16px', 
                      borderBottom: '1px solid #eee', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px', 
                      transition: 'background 0.2s' 
                    }} 
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'} 
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <span style={{ 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      flexShrink: 0, 
                      backgroundColor: (report.gravity === 'critique' && report.status !== 'maitrise') ? '#ef4444' : (report.gravity === 'moyen' ? '#eab308' : '#9ca3af') 
                    }} />
                    <div style={{ flex: 1, fontSize: '14px' }}>
                      <div style={{ fontWeight: 600, marginBottom: '2px' }}>{report.gravity}</div>
                      <div style={{ color: '#666', fontSize: '13px' }}>{report.description?.trim() || 'Aucune description'}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
