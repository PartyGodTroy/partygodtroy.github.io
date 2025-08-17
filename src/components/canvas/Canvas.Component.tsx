import { use, useMemo, useState } from "react";
import { useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";
import MainScene from "@/scenes/MainScene";

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      engine.resize(true);
    };

    window.addEventListener("resize", onResize);

    const engine = new Engine(canvasRef.current, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    engine.hideLoadingUI();

    const scene = new MainScene(engine);

    engine.runRenderLoop(() => {
      scene.render();
    });

    onResize();

    return () => {
      engine.stopRenderLoop();
      engine.dispose();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="grid-bg scroll-gutter"></canvas>;
};

export default CanvasComponent;
