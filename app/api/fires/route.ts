import { NextResponse } from 'next/server';
import type { SatelliteFire } from '@/lib/types';

export const revalidate = 300;

export async function GET() {
  try {
    const MAP_KEY = process.env.NASA_FIRMS_MAP_KEY || 'DEMO_KEY';
    const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${MAP_KEY}/VIIRS_SNPP_NRT/-8.7,19.0,12.0,37.1/1`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      return NextResponse.json([]);
    }
    
    const csvText = await response.text();
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
      return NextResponse.json([]);
    }
    
    const header = lines[0].split(',');
    const latIndex = header.indexOf('latitude');
    const lngIndex = header.indexOf('longitude');
    const brightIndex = header.indexOf('bright_ti4');
    const dateIndex = header.indexOf('acq_date');
    const timeIndex = header.indexOf('acq_time');
    const confidenceIndex = header.indexOf('confidence');
    
    if (latIndex === -1 || lngIndex === -1 || brightIndex === -1 || dateIndex === -1 || timeIndex === -1) {
      return NextResponse.json([]);
    }
    
    const fires: SatelliteFire[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',');
      
      if (cols.length !== header.length) {
        continue;
      }
      
      const lat = parseFloat(cols[latIndex]);
      const lng = parseFloat(cols[lngIndex]);
      const brightness = parseFloat(cols[brightIndex]);
      const acquired_date = cols[dateIndex];
      const acquired_time = cols[timeIndex];
      
      if (isNaN(lat) || isNaN(lng) || isNaN(brightness)) {
        continue;
      }

      if (confidenceIndex !== -1) {
        const confidence = cols[confidenceIndex];
        if (confidence === 'l' || confidence === 'low') {
          continue;
        }
      }
      
      fires.push({
        lat,
        lng,
        brightness,
        acquired_date,
        acquired_time,
        type: 'satellite'
      });
    }
    
    const clustered: SatelliteFire[] = [];
    const used = new Set<number>();
    
    for (let i = 0; i < fires.length; i++) {
      if (used.has(i)) {
        continue;
      }
      
      const cluster: SatelliteFire[] = [fires[i]];
      used.add(i);
      
      for (let j = i + 1; j < fires.length; j++) {
        if (used.has(j)) {
          continue;
        }
        
        if (Math.abs(fires[j].lat - fires[i].lat) < 0.02 && Math.abs(fires[j].lng - fires[i].lng) < 0.02) {
          cluster.push(fires[j]);
          used.add(j);
        }
      }
      
      const avgLat = cluster.reduce((sum, f) => sum + f.lat, 0) / cluster.length;
      const avgLng = cluster.reduce((sum, f) => sum + f.lng, 0) / cluster.length;
      const maxBrightness = Math.max(...cluster.map(f => f.brightness));
      
      let mostRecent = cluster[0];
      for (const fire of cluster) {
        if (fire.acquired_date > mostRecent.acquired_date || 
            (fire.acquired_date === mostRecent.acquired_date && fire.acquired_time > mostRecent.acquired_time)) {
          mostRecent = fire;
        }
      }
      
      clustered.push({
        lat: avgLat,
        lng: avgLng,
        brightness: maxBrightness,
        acquired_date: mostRecent.acquired_date,
        acquired_time: mostRecent.acquired_time,
        type: 'satellite'
      });
    }
    
    return NextResponse.json(clustered);
  } catch (error) {
    return NextResponse.json([]);
  }
}
