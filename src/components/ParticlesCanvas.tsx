import React, { useRef } from 'react';
import { useParticles } from '@/hooks/useParticles';

interface ParticlesCanvasProps {
  className?: string;
}

const ParticlesCanvas: React.FC<ParticlesCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

export default React.memo(ParticlesCanvas);
