import React, { useEffect, useRef, useCallback } from 'react';

interface Dot {
  x: number;
  y: number;
  localX: number;
  localY: number;
  distanceFromCenter: number;
  size: number;
  opacity: number;
  speed: number;
  color: [number, number, number];
}

// ── Configuration ────────────────────────────────────────────────
const SCALE_FACTOR = 16;
const GRID_STEP = 0.55; // Denser dots to form the detailed shape
const DOT_BASE_SIZE = 1.35;
const DOT_MAX_SIZE = 3.5;
const DOT_BASE_OPACITY = 0.5;
const DOT_MAX_OPACITY = 0.95;

const AMBIENT_BREATHE_SPEED = 0.0015;
const AMBIENT_Y_FLOAT_SPEED = 0.0008;

const BULB_COLOR: [number, number, number] = [255, 185, 15]; // Exact solid amber yellow from image

// Mathematical function to match the exact segmented icon from the image
function isPointInIcon(x: number, y: number): boolean {
  // 1. Top Bulb
  if (y >= 2 && y <= 16) {
    if (y <= 11) {
      if (Math.pow(x - 12, 2) + Math.pow(y - 9, 2) <= 49) return true; // radius 7
    } else {
      const widthAtY = 7 - (y - 11) * 0.6; // Tapends inward towards the bottom
      if (Math.abs(x - 12) <= widthAtY) return true;
    }
  }
  
  // 2. Middle Pill (Thread 1)
  const dy1 = Math.abs(y - 18.4);
  const dx1 = Math.abs(x - 12);
  if (dy1 <= 0.9) {
    if (dx1 <= 3.8) return true; // Wider than the neck
    if (Math.pow(dx1 - 3.8, 2) + Math.pow(dy1, 2) <= 0.81) return true;
  }
  
  // 3. Bottom Pill (Thread 2)
  const dy2 = Math.abs(y - 21.6);
  const dx2 = Math.abs(x - 12);
  if (dy2 <= 0.75) {
    if (dx2 <= 2.2) return true; // Shorter width
    if (Math.pow(dx2 - 2.2, 2) + Math.pow(dy2, 2) <= 0.5625) return true;
  }
  
  return false;
}

const InteractiveDotWave: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const targetCenterRef = useRef({ x: -1, y: -1 });
  const currentCenterRef = useRef({ x: -1, y: -1 });
  const animFrameRef = useRef<number>(0);

  const initDots = useCallback((width: number, height: number, ctx: CanvasRenderingContext2D) => {
    const cx = width / 2;
    const cy = height / 2;
    targetCenterRef.current = { x: cx, y: cy };
    currentCenterRef.current = { x: cx, y: cy };
    
    const dots: Dot[] = [];

    let row = 0;
    // Iterate over the bounding box of the shape (from y=2 to y=23)
    for (let y = 2; y <= 23; y += GRID_STEP * 0.866) { // Hex grid vertical step
      const offset = (row % 2 === 0) ? 0 : (GRID_STEP / 2); // Hex grid stagger
      
      for (let x = 2 - offset; x <= 22; x += GRID_STEP) {
        if (isPointInIcon(x, y)) {
           // Shift so center roughly at (12, 12) is mapping to (0,0) locally
           const localX = (x - 12) * SCALE_FACTOR;
           const localY = (y - 12.5) * SCALE_FACTOR;
           
           // Distance from the main bulb sphere
           const distToBulbCenter = Math.sqrt(Math.pow(x - 12, 2) + Math.pow(y - 9, 2));
           
           // Speed varies so the bottom pieces trail slightly behind the big head like a jellyfish wave
           const speed = 0.16 - (distToBulbCenter / 15) * 0.09;

           dots.push({
             x: cx + localX,
             y: cy + localY,
             localX,
             localY,
             distanceFromCenter: distToBulbCenter,
             size: DOT_BASE_SIZE,
             opacity: DOT_BASE_OPACITY,
             speed,
             color: BULB_COLOR
           });
        }
      }
      row++;
    }

    dots.sort(() => Math.random() - 0.5);
    dotsRef.current = dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      initDots(width, height, ctx);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    let isMouseOnCanvas = false;

    const onMouseMove = (e: MouseEvent) => {
      isMouseOnCanvas = true;
      const rect = canvas.getBoundingClientRect();
      targetCenterRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      isMouseOnCanvas = false;
      targetCenterRef.current = { x: width / 2, y: height / 2 };
    };

    canvas.parentElement?.addEventListener('mousemove', onMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', onMouseLeave);

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const tcx = targetCenterRef.current.x;
      const tcy = targetCenterRef.current.y;
      
      // The master center of the shape follows the cursor
      currentCenterRef.current.x += (tcx - currentCenterRef.current.x) * 0.08;
      currentCenterRef.current.y += (tcy - currentCenterRef.current.y) * 0.08;

      const { x: cx, y: cy } = currentCenterRef.current;
      const t = timestamp;

      const centerDx = tcx - cx;
      const centerDy = tcy - cy;
      const centerVelocity = Math.sqrt(centerDx * centerDx + centerDy * centerDy);
      const isMoving = centerVelocity > 1;

      for (const dot of dotsRef.current) {
        // Ambient animations
        const pulse = Math.sin(t * AMBIENT_BREATHE_SPEED - dot.distanceFromCenter * 0.15) * 0.03;
        const scale = 1 + pulse;
        const floatY = Math.sin(t * AMBIENT_Y_FLOAT_SPEED + dot.localX * 0.04) * 3;

        // Target position bounds
        let targetX = cx + dot.localX * scale;
        let targetY = cy + dot.localY * scale + floatY;

        let targetSize = DOT_BASE_SIZE;
        let targetOpacity = DOT_BASE_OPACITY;

        if (isMoving && dot.distanceFromCenter < 6) {
             // Leading edge gets bright
             targetSize = DOT_BASE_SIZE + 1.5;
             targetOpacity = DOT_MAX_OPACITY;
        } else if (isMouseOnCanvas) {
             // General glowing state on hover
             targetOpacity = DOT_BASE_OPACITY + 0.3;
        }

        dot.size += (targetSize - dot.size) * 0.15;
        dot.opacity += (targetOpacity - dot.opacity) * 0.15;

        // Squishy Wave Physics: each dot lerps towards its target on the moving frame
        dot.x += (targetX - dot.x) * dot.speed;
        dot.y += (targetY - dot.y) * dot.speed;

        // Drawing
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dot.color[0]}, ${dot.color[1]}, ${dot.color[2]}, ${dot.opacity})`;
        ctx.fill();

        // Glow halo
        if (dot.size > DOT_BASE_SIZE + 0.2) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${dot.color[0]}, ${dot.color[1]}, ${dot.color[2]}, ${dot.opacity * 0.2})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [initDots]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default InteractiveDotWave;
