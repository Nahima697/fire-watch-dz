"use client";

export default function GeoTest() {
  const test = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => alert(`OK: ${pos.coords.latitude}, ${pos.coords.longitude}`),
      (err) => alert(`ERREUR code=${err.code} message=${err.message}`),
      { enableHighAccuracy: false, timeout: 20000 }
    );
  };

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={test} style={{ padding: "20px", fontSize: "18px" }}>
        Tester la géolocalisation
      </button>
    </div>
  );
}
