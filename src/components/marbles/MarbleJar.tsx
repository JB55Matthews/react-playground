import React, { useRef, useEffect, useState } from 'react';
import '../../styles/marbles/MarbleJar.css';

type Marble = {
    x: number;
    y: number;
    vx: number;
    vy: number;
};

const RADIUS = 12;
const NUM_MARBLES = 50;
const JAR_WIDTH = 350;
const JAR_HEIGHT = 450;
const SHAKE_BOUNDS = {minX: -50, maxX: 50, minY: -50, maxY: 50};

const GRAVITY = 0.3;
const FRICTION = 0.95;
const BOUNCE = 0.8;

function MarbleJar() {
    const [marbles, setMarbles] = useState<Marble[]>([]);
    const [jarOffset, setJarOffset] = useState({ x: 0, y: 0 });
    
    const jarVelocity = useRef({ dx: 0, dy: 0 });
    const isShaking = useRef(false);
    const lastMouse = useRef({ x:0, y:0});

    // Initialize the marble list
    useEffect(() => {
        const init = Array.from({ length: NUM_MARBLES }, () => ({
            x: Math.random() * (JAR_WIDTH - RADIUS * 2) + RADIUS,
            y: Math.random() * (JAR_HEIGHT - RADIUS * 2) + RADIUS,
            vx: 0,
            vy: 0,
        }));
        setMarbles(init);
        }, []);

    // Main physics simulation
    useEffect(() => {
        let animationFrame: number;

        const update = () => {
            const {dx, dy} = jarVelocity.current;

            setMarbles((m) => {
                const updated = m.map((marble) => {
                    let {x, y, vx, vy} = marble;

                    vx += (dx * 0.05) * FRICTION;
                    vy += ((dy * 0.05) + GRAVITY) * FRICTION
                    x += vx;
                    y += vy;

                    if (x <= RADIUS){x = RADIUS; vx *= -BOUNCE;}
                    else if (x >= JAR_WIDTH - RADIUS){x = JAR_WIDTH - RADIUS; vx *= -BOUNCE};
                    if (y <= RADIUS){y = RADIUS; vy *= -BOUNCE}
                    else if (y >= JAR_HEIGHT - RADIUS){y = JAR_HEIGHT - RADIUS; vy *= -BOUNCE};
                    
                    return {x, y, vx, vy};
                    });
                
                for (let i = 0; i < updated.length; i++) {
                    const m1 = updated[i];
                    for (let j = i + 1; j < updated.length; j++) {
                        // const m1 = updated[i];
                        const m2 = updated[j];

                        const dx = m2.x - m1.x;
                        const dy = m2.y - m1.y;
                        const dist = Math.hypot(dx, dy);
                        const minDist = RADIUS * 2;

                        if (dist < minDist && dist !== 0) {
                            const overlap = 0.5 * (minDist - dist);
                            const nx = dx / dist;
                            const ny = dy / dist;

                            m1.x -= nx * overlap;
                            m1.y -= ny * overlap;
                            m2.x += nx * overlap;
                            m2.y += ny * overlap;

                            const impactSpeed = (m2.vx - m1.vx) * nx + (m2.vy - m1.vy) * ny;

                            if (impactSpeed < 0) {
                            const impulse = impactSpeed * -BOUNCE;
                            m1.vx -= impulse * nx;
                            m1.vy -= impulse * ny;
                            m2.vx += impulse * nx;
                            m2.vy += impulse * ny;
                            }
                        }
                    }

                }
                for (let i = 0; i < updated.length; i++) {
                    const m1 = updated[i]
                    if ((m1.vx < 0.28) && m1.vy < 0.28){
                        m1.vx, m1.vy = 0, 0
                    }
                }

                return updated;
            }
            
);

            jarVelocity.current.dx *= 0.8;
            jarVelocity.current.dy *= 0.8;

            animationFrame = requestAnimationFrame(update);
        };
        
        animationFrame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationFrame);
    }, []);
  
    const handleMouseDown = (e: React.MouseEvent) => {
        isShaking.current = true;
        lastMouse.current = {x: e.clientX, y: e.clientY};
    };

    const handleMouseUp = () => {
        isShaking.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isShaking.current) return;

        const dx = e.clientX - lastMouse.current.x;
        const dy = e.clientY - lastMouse.current.y;
    
        lastMouse.current = { x: e.clientX, y: e.clientY };
    
        jarVelocity.current.dx = dx;
        jarVelocity.current.dy = dy;
    
        setJarOffset((prev) => ({
          x: Math.max(SHAKE_BOUNDS.minX, Math.min(SHAKE_BOUNDS.maxX, prev.x + dx)),
          y: Math.max(SHAKE_BOUNDS.minY, Math.min(SHAKE_BOUNDS.maxY, prev.y + dy)),
        }));
    };
    

    return (
        <>
        <div className="jar-container"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}>
            <div className="jar"
                style={{transform: `translate(${jarOffset.x}px, ${jarOffset.y}px)`}}>
            
            {marbles.map((m) => (
                <div
                    className="marble"
                    style={{left: `${m.x - RADIUS}px`, top: `${m.y - RADIUS}px`}}/>
                ))}

            </div>
        </div>
        </>
    )
}

export default MarbleJar
