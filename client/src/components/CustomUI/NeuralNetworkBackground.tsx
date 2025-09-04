"use client";

import { useEffect, useRef } from "react";

const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    // resize canvas with DPR awareness
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset any previous scaling
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }[] = [];

    // Create random nodes
    for (let i = 0; i < 35; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, // small velocity
        vy: (Math.random() - 0.5) * 0.3,
        size: 2 + Math.random() * 2,
      });
    }

    function draw() {
      if (!ctx || !canvas) return;

      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.strokeStyle = `rgba(0, 255, 170, ${0.9 - dist / 200})`; // bluish fade
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes with enhanced pulsating effect
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(
          node.x,
          node.y,
          node.size + Math.sin(Date.now() / 500) * 1.2, // Enhanced pulsating effect for better visibility
          0,
          Math.PI * 2
        );

        // gradient fill (blue + green)
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          8
        );
        gradient.addColorStop(0, "rgba(0, 255, 170, 1)"); // bright neon green
        gradient.addColorStop(1, "rgba(59, 130, 246, 1)"); // deep blue

        ctx.fillStyle = gradient;
        ctx.fill();

        // Update positions
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      // // Handle resize
      // const handleResize = () => {
      //   // canvas.width = window.innerWidth;
      //   // canvas.height = window.innerHeight;

      //   canvas.width = canvas.offsetWidth;
      //   canvas.height = canvas.offsetHeight;
      // };
      // window.addEventListener("resize", handleResize);

      // return () => {
      //   window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-30" />
  );
};

export default NeuralNetworkBackground;
