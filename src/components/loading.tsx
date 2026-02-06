import { useEffect, useState } from "react";

interface LoadingScreenProps {
  logoSrc?: string;
  showProgress?: boolean;
  progress?: number;
  onComplete?: () => void;
  duration?: number;
}

export function LoadingScreen({ logoSrc = "/logo-apae.jpg", showProgress = true, progress: externalProgress, onComplete, duration = 2500 }: LoadingScreenProps) {
  const [internalProgress, setInternalProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const progress = externalProgress ?? internalProgress;

  useEffect(() => {
    if (externalProgress !== undefined) return;

    const interval = 30;
    const step = (100 / duration) * interval;

    const timer = setInterval(() => {
      setInternalProgress((prev) => {
        const next = prev + step + Math.random() * step * 0.5;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, externalProgress]);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setFadeOut(true);
        const completeTimeout = setTimeout(() => {
          onComplete?.();
        }, 500);
        return () => clearTimeout(completeTimeout);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${fadeOut ? "pointer-events-none opacity-0" : "opacity-100"}`}
      style={{ backgroundColor: "#0b1a2e" }}
    >
      {/* Linha verde decorativa no topo */}
      <div className="absolute left-0 right-0 top-0 h-1" style={{ background: "linear-gradient(90deg, #16a34a, #22c55e, #16a34a)" }} />

      {/* Logo + Loading */}
      <div className="flex flex-col items-center gap-10">
        {/* Logo com anel giratório */}
        <div className="relative">
          {/* Anel externo */}
          <div className="absolute -inset-5 animate-spin" style={{ animationDuration: "3s" }}>
            <svg viewBox="0 0 130 130" className="h-full w-full">
              <circle cx="65" cy="65" r="62" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="18 14" opacity="0.4" />
            </svg>
          </div>

          {/* Anel interno (sentido contrario) */}
          <div className="absolute -inset-2 animate-spin" style={{ animationDuration: "4s", animationDirection: "reverse" }}>
            <svg viewBox="0 0 114 114" className="h-full w-full">
              <circle cx="57" cy="57" r="54" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="8 20" opacity="0.15" />
            </svg>
          </div>

          {/* Logo */}
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-white/10 shadow-2xl sm:h-32 sm:w-32">
            <img src={logoSrc || "/placeholder.svg"} alt="Logo" className="object-cover" />
          </div>

          {/* Glow sutil */}
          <div className="absolute inset-0 -z-10 scale-150 rounded-full blur-3xl" style={{ backgroundColor: "#16a34a", opacity: 0.08 }} />
        </div>

        {/* Barra de progresso minimalista */}
        {showProgress && (
          <div className="w-48 sm:w-56">
            <div className="h-[3px] w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
              <div
                className="h-full rounded-full transition-all duration-150 ease-out"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: "linear-gradient(90deg, #16a34a, #22c55e)",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
