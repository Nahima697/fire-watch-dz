"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import EmergencyHeader from "@/components/EmergencyHeader";
import ReportModal from "@/components/ReportModal";
import { supabase } from "@/lib/supabaseClient";

const LiveMap = dynamic(() => import("@/components/LiveMap"), {
  ssr: false,
  loading: () => <div>Chargement de la carte...</div>,
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFiresCount, setActiveFiresCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from("fire_reports")
        .select("*", { count: "exact", head: true })
        .neq("status", "maitrise");

      let satelliteCount = 0;
      try {
        const res = await fetch("/api/fires");
        const satelliteFires = await res.json();
        satelliteCount = Array.isArray(satelliteFires) ? satelliteFires.length : 0;
      } catch (err) {
        console.error(err);
      }

      setActiveFiresCount((count || 0) + satelliteCount);
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
      <EmergencyHeader activeFiresCount={activeFiresCount} />
      <LiveMap />
      <button
        className="fixed bottom-4 right-4 z-50 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg"
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
