export type FireReport = {
  id: string;
  created_at: string;
  latitude: number;
  longitude: number;
  wilaya: string | null;
  gravity: 'faible' | 'moyen' | 'critique';
  description: string | null;
  upvotes: number;
  status: 'en_attente' | 'confirme' | 'maitrise';
  device_fingerprint: string | null;
};

export type SatelliteFire = {
  lat: number;
  lng: number;
  brightness: number;
  acquired_date: string;
  acquired_time: string;
  type: 'satellite';
};

export type NewFireReportInput = {
  latitude: number;
  longitude: number;
  gravity: 'faible' | 'moyen' | 'critique';
  wilaya?: string;
  description?: string;
  device_fingerprint?: string;
};
