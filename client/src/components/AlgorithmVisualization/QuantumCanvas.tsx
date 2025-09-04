import { useEffect, useRef } from "react";
import { AlgorithmState } from "./types.ts"; // keep shared types in a separate file if needed

interface QuantumCanvasProps {
  qubits: AlgorithmState["qubits"];
}

export default function QuantumCanvas({ qubits }: QuantumCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawQuantumField = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw quantum field points
      ctx.strokeStyle = "rgba(0, 255, 255, 0.2)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          const x = (i / 20) * canvas.width;
          const y = (j / 20) * canvas.height;
          const intensity =
            Math.sin(Date.now() * 0.002 + i * 0.5 + j * 0.5) * 0.5 + 0.5;

          ctx.globalAlpha = intensity * 0.3;
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Draw entanglement lines
      qubits.forEach((qubit, i) => {
        if (qubit.state === "entangled") {
          const nextQubit = qubits[(i + 1) % qubits.length];
          const x1 = (qubit.x / 100) * canvas.width;
          const y1 = (qubit.y / 100) * canvas.height;
          const x2 = (nextQubit.x / 100) * canvas.width;
          const y2 = (nextQubit.y / 100) * canvas.height;

          ctx.globalAlpha = 0.6;
          ctx.strokeStyle = "rgba(153, 51, 255, 0.8)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
    };

    const animationFrame = requestAnimationFrame(function animate() {
      drawQuantumField();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [qubits]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="absolute inset-0 w-full h-full opacity-30"
    />
  );
}
