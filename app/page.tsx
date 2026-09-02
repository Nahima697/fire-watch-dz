"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import EmergencyHeader from "@/components/EmergencyHeader";
import ReportModal from "@/components/ReportModal";
import { supabase } from "@/lib/supabaseClient";
import type { FireReport } from "@/lib/types";

const LiveMap = dynamic(() => import("@/components/LiveMap"), {
  ssr: false,
  loading: () => <div>Chargement de la carte...</div>,
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [citizenReportsCount, setCitizenReportsCount] = useState(0);
  const [satelliteCount, setSatelliteCount] = useState(0);
  const [fireReportsList, setFireReportsList] = useState<FireReport[]>([]);
  const [focusedReport, setFocusedReport] = useState<FireReport | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const { data, count } = await supabase
        .from("fire_reports")
        .select("*", { count: "exact" })
        .neq("status", "maitrise");

      setCitizenReportsCount(count || 0);
      setFireReportsList((data as FireReport[]) || []);

      try {
        const res = await fetch("/api/fires");
        const satelliteFires = await res.json();
        setSatelliteCount(Array.isArray(satelliteFires) ? satelliteFires.length : 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCount();

    const channel = supabase
      .channel("active_fires_count")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "fire_reports",
        },
        () => {
          fetchCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="relative" style={{ height: "100vh", width: "100vw" }}>
      <EmergencyHeader
        satelliteCount={satelliteCount}
        citizenReportsCount={citizenReportsCount}
        fireReports={fireReportsList}
        onSelectReport={(report: FireReport) => setFocusedReport(report)}
      />
      <LiveMap focusedReport={focusedReport} />
      <button
        className="fixed bottom-4 right-4 z-[9999] bg-red-600 text-white px-6 py-3 rounded-full shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        Signaler un départ de feu 🔥
      </button>
      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
    </div>
  );
}
