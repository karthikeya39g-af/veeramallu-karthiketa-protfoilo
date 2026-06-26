import React, { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;
}

export function ThreeDCard({ children, className = '', id, onClick }: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to the card (percentage)
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const percentageX = x / rect.width;
    const percentageY = y / rect.height;
    
    // Calculate rotation angles (max tilt of 10 degrees)
    const maxRotation = 10;
    const rX = (0.5 - percentageY) * maxRotation * 2; // Invert to tilt correctly
    const rY = (percentageX - 0.5) * maxRotation * 2;
    
    setRotateX(rX);
    setRotateY(rY);
    setGlarePosition({ x: percentageX * 100, y: percentageY * 100 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? 1.025 : 1,
        z: isHovered ? 20 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 22,
        mass: 0.6,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      className={`relative cursor-pointer select-none ${className}`}
    >
      {/* Glare/Shine layer */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[inherit]"
        style={{
          opacity: isHovered ? 0.12 : 0,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 75%)`,
          mixBlendMode: 'overlay',
          zIndex: 10,
        }}
      />
      
      {/* 3D content container */}
      <div 
        style={{ 
          transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)',
          transition: 'transform 0.15s ease-out',
        }}
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
