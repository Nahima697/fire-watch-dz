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

      // Filtre sur le niveau de confiance NASA (VIIRS : 'low' | 'nominal' | 'high')
      // pour exclure les detections a faible fiabilite, comme le recommande NASA FIRMS.
      if (confidenceIndex !== -1) {
        const confidence = cols[confidenceIndex];
        if (confidence !== 'h' && confidence !== 'high') {
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
    
    return NextResponse.json(fires);
  } catch (error) {
    return NextResponse.json([]);
  }
}
