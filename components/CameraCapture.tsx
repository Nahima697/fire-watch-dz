"use client";

import { useRef, useState } from "react";

interface CameraCaptureProps {
  onCapture: (imageBase64: string) => void;
  onCancel?: () => void;
}

export default function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ratio = img.width > 800 ? 800 / img.width : 1;
      canvas.width = Math.round(img.width * ratio);
      canvas.height = Math.round(img.height * ratio);

      const ctx = canvas.getContext("2d");
      if (ctx === null) {
        console.error("Impossible d obtenir le contexte 2D du canvas");
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageBase64 = canvas.toDataURL("image/webp", 0.7);
      setCapturedImage(imageBase64);
      onCapture(imageBase64);
      URL.revokeObjectURL(objectUrl);
    };

    event.target.value = "";
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture={"environment" as const}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {!capturedImage && (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full min-h-[60px] text-[18px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          📷 Prendre une photo
        </button>
      )}

      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" style={{ maxWidth: "200px", borderRadius: "8px" }} />
          <button
            onClick={() => {
              setCapturedImage(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
          >
            Reprendre
          </button>
        </div>
      )}

      {onCancel && (
        <button onClick={onCancel}>
          Annuler
        </button>
      )}
    </div>
  );
}
