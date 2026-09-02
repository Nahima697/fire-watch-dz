"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { NewFireReportInput, FireAnalysisResult } from "@/lib/types";
import CameraCapture from "@/components/CameraCapture";

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
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [gravity, setGravity] = useState<"faible" | "moyen" | "critique" | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<FireAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadErrorMessage, setUploadErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGravitySelect = (selectedGravity: "faible" | "moyen" | "critique") => {
    setGravity(selectedGravity);
    setStep(2);
  };

  const handleCapture = async (imageDataUrl: string) => {
    setCapturedImage(imageDataUrl);
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze-fire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageDataUrl }),
      });
      if (response.ok) {
        const data = await response.json();
        setAiAnalysis(data);
      }
    } catch (error) {
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGeoErrorDisplay = (err: GeolocationPositionError) => {
    let message: string;
    if (err.code === 1) {
      message = "Permission de géolocalisation refusée. Veuillez autoriser l'accès à votre position dans les paramètres du navigateur.";
    } else if (err.code === 2) {
      message = "Position indisponible. Vérifiez que votre appareil peut déterminer votre position.";
    } else if (err.code === 3) {
      message = "Délai d'attente dépassé (15 secondes). Vérifiez votre connexion et réessayez.";
    } else {
      message = "Erreur de géolocalisation. Veuillez réessayer.";
    }
    setErrorMessage(message);
    setIsSubmitting(false);
  };

  const processSubmit = async (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let image_url: string | undefined = undefined;
    let ai_verified: boolean | null = null;
    let ai_confidence: number | null = null;

    if (capturedImage !== null) {
      try {
        const blob = await fetch(capturedImage).then((r) => r.blob());
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        const fileName = `report-${timestamp}-${random}.jpg`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("fire-photos")
          .upload(fileName, blob);

        if (uploadError) {
          setUploadErrorMessage(uploadError.message);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from("fire-photos")
            .getPublicUrl(fileName);
          image_url = publicUrl;
          
          if (aiAnalysis !== null) {
            ai_verified = aiAnalysis.is_fire ?? null;
            ai_confidence = aiAnalysis.confidence ?? null;
          }
        }
      } catch (err) {
        setUploadErrorMessage("Erreur lors de l'upload de l'image");
      }
    }

    const newReport: NewFireReportInput = {
      latitude: latitude,
      longitude: longitude,
      gravity: gravity!,
      description: description.trim() || undefined,
      device_fingerprint: `${navigator.userAgent}|${screen.width}x${screen.height}`,
      ...(image_url && { image_url }),
      ...(ai_verified !== null && { ai_verified }),
      ...(ai_confidence !== null && { ai_confidence }),
    };

    const { error } = await supabase.from("fire_reports").insert(newReport);

    if (error) {
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    localStorage.setItem("lastReportTime", Date.now().toString());
    setStep(1);
    setGravity(null);
    setDescription("");
    setCapturedImage(null);
    setAiAnalysis(null);
    setUploadErrorMessage(null);
    setIsSubmitting(false);
    setErrorMessage(null);
    
    if (onSuccess) onSuccess();
    onClose();
  };

  const handleSubmit = () => {
    const lastReportTime = localStorage.getItem("lastReportTime");
    if (lastReportTime && Date.now() - parseInt(lastReportTime) < 900000) {
      setErrorMessage("Veuillez patienter 15 minutes entre deux signalements");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        navigator.geolocation.clearWatch(watchId);
        console.log("🔥 POSITION OBTENUE :", position);
        processSubmit(position);
      },
      (err) => {
        navigator.geolocation.clearWatch(watchId);
        console.error("❌ GEOLOCATION ERROR, fallback sur position par defaut (centre Algerie) :", err.code, err.message);
        setErrorMessage("Position GPS indisponible - signalement envoye avec position approximative (centre carte). Precisez la zone dans la description.");
        const fallbackPosition = {
          coords: { latitude: 36.7538, longitude: 3.0588, accuracy: 0, altitude: null, altitudeAccuracy: null, heading: null, speed: null },
          timestamp: Date.now(),
        } as GeolocationPosition;
        processSubmit(fallbackPosition);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: Infinity }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center">
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
            <CameraCapture onCapture={handleCapture} />
            
            <div className="mt-4">
              <button
                onClick={() => setStep(3)}
                className="w-full min-h-[60px] text-[18px] bg-gray-300 text-gray-700 rounded-lg mb-3 hover:bg-gray-400"
              >
                Passer cette étape
              </button>

              {isAnalyzing && (
                <div className="mb-3 text-center text-gray-600">
                  Analyse en cours...
                </div>
              )}

              {aiAnalysis !== null && (
                <div className={`mb-3 p-3 rounded ${
                  aiAnalysis.is_fire && aiAnalysis.confidence >= 70
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}>
                  {aiAnalysis.is_fire && aiAnalysis.confidence >= 70
                    ? "✓ Feu probable détecté par IA"
                    : "⚠ Analyse incertaine, signalement quand même possible"}
                </div>
              )}

              {capturedImage && (
                <button
                  onClick={() => setStep(3)}
                  className="w-full min-h-[60px] text-[18px] bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Continuer avec cette photo
                </button>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            {uploadErrorMessage && (
              <div className="mb-4 p-3 bg-orange-100 text-orange-700 rounded">
                {uploadErrorMessage}
              </div>
            )}
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
                onClick={() => setStep(2)}
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
