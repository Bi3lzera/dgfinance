import React, { useState, useEffect, useRef } from 'react';
import { formatCurrencyToBRL } from '../../../utils/formats';

interface AnimatedCounterProps {
    value: number;
    duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 1200 }) => {
    const [count, setCount] = useState(0);
    const prevValueRef = useRef(0);

    useEffect(() => {
        const startValue = prevValueRef.current;
        const endValue = value;
        
        if (startValue === endValue) {
            setCount(endValue);
            return;
        }

        const startTime = performance.now();
        let animationFrameId: number;

        const updateCount = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic: f(t) = 1 - (1 - t)^3
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            const currentVal = startValue + (endValue - startValue) * easeProgress;
            setCount(currentVal);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(updateCount);
            } else {
                prevValueRef.current = endValue;
            }
        };

        animationFrameId = requestAnimationFrame(updateCount);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [value, duration]);

    // Keep the ref updated with the latest value
    useEffect(() => {
        prevValueRef.current = value;
    }, [value]);

    return <span>{formatCurrencyToBRL(count)}</span>;
};

export default AnimatedCounter;
