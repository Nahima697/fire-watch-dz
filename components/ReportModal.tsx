"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { NewFireReportInput } from "@/lib/types";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ReportModal({
  isOpen,
  onClose,
  onSuccess,
}: ReportModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [gravity, setGravity] = useState<"faible" | "moyen" | "critique" | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGravitySelect = (selectedGravity: "faible" | "moyen" | "critique") => {
    setGravity(selectedGravity);
    setStep(2);
  };

  const handleSubmit = async () => {
    const lastTimestamp = localStorage.getItem("lastReportTimestamp");
    if (lastTimestamp && Date.now() - parseInt(lastTimestamp) < 900000) {
      setErrorMessage("Veuillez patienter 15 minutes entre deux signalements");
      return;
    }

    setIsSubmitting(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const device_fingerprint = `${navigator.userAgent}|${screen.width}x${screen.height}`;

        const newReport: NewFireReportInput = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          gravity: gravity!,
          description: description.trim() || undefined,
          device_fingerprint: device_fingerprint,
        };

        const { error } = await supabase.from("fire_reports").insert(newReport);

        if (error) {
          setErrorMessage(error.message);
          setIsSubmitting(false);
          return;
        }

        localStorage.setItem("lastReportTimestamp", Date.now().toString());
        setStep(1);
        setGravity(null);
        setDescription("");
        setIsSubmitting(false);
        setErrorMessage(null);
        if (onSuccess) onSuccess();
        onClose();
      },
      () => {
        setErrorMessage("Géolocalisation requise");
        setIsSubmitting(false);
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Signaler un incendie</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errorMessage}
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="mb-4 text-gray-700">Sélectionnez la gravité :</p>
            <button
              onClick={() => handleGravitySelect("faible")}
              className="w-full min-h-[60px] text-[18px] bg-yellow-500 text-white rounded-lg mb-3 hover:bg-yellow-600"
            >
              Faible
            </button>
            <button
              onClick={() => handleGravitySelect("moyen")}
              className="w-full min-h-[60px] text-[18px] bg-orange-500 text-white rounded-lg mb-3 hover:bg-orange-600"
            >
              Moyen
            </button>
            <button
              onClick={() => handleGravitySelect("critique")}
              className="w-full min-h-[60px] text-[18px] bg-red-600 text-white rounded-lg mb-3 hover:bg-red-700"
            >
              Danger immédiat
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block mb-2 text-gray-700">
              Description (optionnelle) :
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded p-3 w-full min-h-[96px] mb-4"
              placeholder="Détails supplémentaires..."
            />
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 min-h-[60px] text-[18px] bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                disabled={isSubmitting}
              >
                Retour
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 min-h-[60px] text-[18px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isSubmitting ? "Envoi..." : "Envoyer"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
