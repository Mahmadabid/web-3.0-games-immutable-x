import React from 'react';
import { BalloonProps } from '//types/type';

const Balloon: React.FC<BalloonProps> = ({ color }) => {
    const balloonWidth = 200;
    const balloonHeight = balloonWidth * 1.17;
    const threadHeight = 120;
    const threadThickness = 2;

    return (
        <div style={{ color: color }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${balloonWidth} ${balloonHeight + threadHeight}`}
            >
                <defs>
                    <radialGradient
                        id={`balloon-gradient-1`}
                        cx="40%"
                        cy="40%"
                        r="50%"
                        fx="30%"
                        fy="30%"
                    >
                        <stop offset="0%" stopColor="#fff" />
                        <stop offset="100%" stopColor="currentColor" />
                    </radialGradient>
                    <filter
                        id={`balloon-shadow-1`}
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                    >
                        <feMerge>
                            <feMergeNode in="offsetBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <path
                    d={`M${balloonWidth / 2} ${balloonHeight} Q${balloonWidth / 2 + 15} ${balloonHeight + threadHeight / 4} ${balloonWidth / 2} ${balloonHeight + threadHeight / 2} Q${balloonWidth / 2 - 15} ${balloonHeight + 3 * threadHeight / 4} ${balloonWidth / 2} ${balloonHeight + threadHeight}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={threadThickness}
                />

                <polygon
                    points={`${balloonWidth / 2},${balloonHeight - 3} ${balloonWidth / 2 + 8},${balloonHeight + 5} ${balloonWidth / 2 - 8},${balloonHeight + 5}`}
                    fill="currentColor"
                />
                <ellipse
                    cx={balloonWidth / 2}
                    cy={balloonHeight / 2}
                    rx={balloonWidth / 2}
                    ry={balloonHeight / 2}
                    fill={`url(#balloon-gradient-1)`}
                    filter={`url(#balloon-shadow-1)`}
                />
            </svg>
        </div>
    );
};

export default Balloon;
