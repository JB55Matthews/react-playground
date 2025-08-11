import "../../styles/SinRadio/SinRadio.css"
import { useRef, useEffect, useState } from "react";

interface DialProps {
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (v: number) => void;
}

function Dial({ label, min, max, value, onChange }: DialProps){
    const dialRef = useRef<HTMLDivElement>(null);
    const [angle, setAngle] = useState(((value - min) / (max - min)) * 270 - 135);
    
    const updateFromPointer = (clientX: number, clientY: number) => {
        if (!dialRef.current) return;
        const rect = dialRef.current.getBoundingClientRect();
        let deg = (Math.atan2(clientY - rect.top + rect.height / 2, clientX - rect.left + rect.width / 2) * 180) / Math.PI;
        deg -= 90;
        if (deg < -180) deg += 360;
        deg = Math.max(-135, Math.min(135, deg));
        setAngle(deg);
        const newValue = min + ((deg + 135) / 270) * (max - min);
        onChange(Number(newValue.toFixed(2)));
    };
    
    const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        const move = (ev: MouseEvent | TouchEvent) => {
            const pt = "touches" in ev ? ev.touches[0] : ev;
            updateFromPointer(pt.clientX, pt.clientY);
        };
        const up = () => {
            window.removeEventListener("mousemove", move as any);
            window.removeEventListener("mouseup", up);
            window.removeEventListener("touchmove", move as any);
            window.removeEventListener("touchend", up);
        };
        window.addEventListener("mousemove", move as any);
        window.addEventListener("mouseup", up);
        window.addEventListener("touchmove", move as any);
        window.addEventListener("touchend", up);
    };

    return (
    <div>
      <div
        className="dial"
        ref={dialRef}
        style={{ "--rotation": `${angle}deg` } as React.CSSProperties}
        onMouseDown={onPointerDown}
        onTouchStart={onPointerDown}
      >
        <div className="dialFace">
          <div className="dialIndicator" />
        </div>
      </div>
      <div className="dialLabel">{label}</div>
    </div>
    )
}

function SinRadio () {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [amp, setAmp] = useState(10)
    const [freq, setFreq] = useState(0.04)
    const [speed, setSpeed] = useState(1)


    useEffect(() => {
        let animationFrameId: number;
        let sinOffset = 0;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgba(0,255,0,0.2)";
            ctx.fillStyle = "rgba(0,255,0,0.5)";
            ctx.lineWidth = 1;
            ctx.font = "10px monospace";

            const centerY = canvas.height/2

            ctx.beginPath();
            ctx.moveTo(0, centerY- amp);
            ctx.lineTo(canvas.width, centerY- amp);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, centerY + amp);
            ctx.lineTo(canvas.width, centerY+ amp);
            ctx.stroke();
        
            ctx.fillText(`+${amp.toFixed(0)}`, 2, centerY - amp+2);
            ctx.fillText(`-${amp.toFixed(0)}`, 2, centerY + amp+2);

            ctx.strokeStyle = "rgba(0,255,0,0.5)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x++) {
                const y = centerY + Math.sin((x + sinOffset) * freq) * amp;
                ctx.lineTo(x, y);
            }
            ctx.stroke();

            sinOffset += speed;
            animationFrameId = requestAnimationFrame(draw);
        }

        draw();
        return () => cancelAnimationFrame(animationFrameId);
    }, [amp, freq, speed])


    return(
        <>
        <div className="radio-box">
            <div className="sin-display">
                <canvas ref={canvasRef}/>
            </div>
            <div className="dial-container">
                <Dial label="Amp" min={5} max={50} value={amp} onChange={setAmp} />
                <Dial label="Freq" min={0.03} max={0.3} value={freq} onChange={setFreq} />
                <Dial label="Speed" min={0.5} max={5} value={speed} onChange={setSpeed} />
            </div>
        </div>
        </>
    )
}

export default SinRadio