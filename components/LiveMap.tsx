"use client";

import { supabase } from '@/lib/supabaseClient';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FireReport, SatelliteFire } from '@/lib/types';
import { useState, useEffect } from 'react';

function RecenterButton({ userPosition }: { userPosition: [number, number] | null }) {
  const map = useMap();
  
  if (!userPosition) return null;
  
  return (
    <button
      onClick={() => map.setView(userPosition, 13)}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        padding: '8px 16px',
        backgroundColor: 'white',
        border: '2px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      Me recentrer
    </button>
  );
}

export default function LiveMap() {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [fireReports, setFireReports] = useState<FireReport[]>([]);
  const [satelliteFires, setSatelliteFires] = useState<SatelliteFire[]>([]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error(error);
      }
    );

    fetch('/api/fires')
      .then(res => res.json())
      .then(data => setSatelliteFires(data))
      .catch(error => console.error(error));

    supabase
      .from('fire_reports')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else if (data) {
          setFireReports(data);
        }
      });

    const channel = supabase
      .channel('fire_reports_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'fire_reports' }, (payload) => {
        setFireReports(prev => [...prev, payload.new as FireReport]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'fire_reports' }, (payload) => {
        setFireReports(prev => prev.map(r => r.id === (payload.new as FireReport).id ? payload.new as FireReport : r));
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'fire_reports' }, (payload) => {
        setFireReports(prev => prev.filter(r => r.id !== (payload.old as { id: string }).id));
      })
      .subscribe();

    return () => {
      navigator.geolocation.clearWatch(watchId);
      channel.unsubscribe();
    };
  }, []);

  return (
    <div>
      <MapContainer center={[28.0339, 1.6596]} zoom={6} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
        <RecenterButton userPosition={userPosition} />
        {userPosition && (
          <Circle center={userPosition} radius={500} pathOptions={{ color: 'blue' }} />
        )}
        {fireReports.map(report => (
          <Circle
            key={report.id}
            center={[report.latitude, report.longitude]}
            radius={1000}
            pathOptions={{
              color: report.status === 'maitrise'
                ? 'gray'
                : report.gravity === 'critique'
                ? 'red'
                : report.gravity === 'moyen'
                ? 'yellow'
                : 'green'
            }}
          >
            <Popup>
              <div>
                <p>Gravité : {report.gravity}</p>
                <p>Statut : {report.status}</p>
                <p>Votes : {report.upvotes}</p>
                <button
                  onClick={async () => {
                    try {
                      const newUpvotes = report.upvotes + 1;
                      const newStatus = newUpvotes >= 3 ? 'confirme' : report.status;
                      await supabase
                        .from('fire_reports')
                        .update({ upvotes: newUpvotes, status: newStatus })
                        .eq('id', report.id);
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  Confirmer la présence du feu
                </button>
              </div>
            </Popup>
          </Circle>
        ))}
        {satelliteFires.map(fire => (
          <Circle
            key={`${fire.lat}-${fire.lng}-${fire.acquired_date}-${fire.acquired_time}`}
            center={[fire.lat, fire.lng]}
            radius={2000}
            pathOptions={{ color: 'orange', fillOpacity: 0.3 }}
          >
            <Popup>
              <p>Source : Satellite</p>
              <p>Luminosité : {fire.brightness}</p>
              <p>Date : {fire.acquired_date} {fire.acquired_time}</p>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
      <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1000, backgroundColor: 'white', padding: '10px', borderRadius: '4px' }}>
        <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: 'green', marginRight: '4px' }}></span> Faible{' '}
        <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: 'yellow', marginRight: '4px' }}></span> Moyen{' '}
        <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: 'red', marginRight: '4px' }}></span> Critique{' '}
        <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: 'orange', marginRight: '4px' }}></span> Satellite
      </div>
    </div>
  );
}
