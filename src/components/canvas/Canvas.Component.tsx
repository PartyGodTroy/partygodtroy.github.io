import { use, useMemo, useState } from "react";
import { useEffect, useRef } from "react";
import { Engine, Scene } from "@babylonjs/core";
import MainScene from "@/scenes/MainScene";


const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    function getWindowScrollAmount() {
      const docElem = window.document.documentElement;
      const docBody = window.document.body;
      const scrollTop =
        window.pageYOffset || docElem.scrollTop || docBody.scrollTop;
      const scrollBottom =
        (docElem.scrollHeight || docBody.scrollHeight) - window.innerHeight;
      const scrollPercent = scrollTop / scrollBottom || 0;
      return scrollPercent;
    }

    const canvas = canvasRef.current;

    const onResize = () => {
      engine.resize();
    };
    const onScroll = () => {
      
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);

    const engine = new Engine(canvasRef.current, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    const scene = new MainScene(engine);


    engine.runRenderLoop(() => {
      scene.render();
    });

    onResize();

    return () => {
      engine.stopRenderLoop();
      engine.dispose();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas className="min-w-screen min-h-screen" ref={canvasRef}></canvas>;
};

export default CanvasComponent;
