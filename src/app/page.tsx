// pages/index.tsx

"use client"
import React, { useState, useEffect } from 'react';

interface Countdown {
    hours: string;
    minutes: string;
    seconds: string;
    milliseconds: string;
    isCountdownOver: boolean;
}

export default function Home() {
    const [countdown, setCountdown] = useState<Countdown>(calculateCountdown());

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(calculateCountdown());
        }, 10);

        return () => clearInterval(interval);
    }, []);

    function calculateCountdown(): Countdown {
        const now = new Date();

        // 目標の日付と時間を設定
        const targetTime = new Date("2023-12-25T06:00:00+09:00");

        let timeDiff = targetTime.getTime() - now.getTime();
        let isCountdownOver = false;
        if (timeDiff < 0) {
            // If the target time has passed, set it to the same time next day
            targetTime.setDate(targetTime.getDate() + 1);
            timeDiff = targetTime.getTime() - now.getTime();
            isCountdownOver = true;
        }

        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((timeDiff % 1000) / 10);

        return {
            hours: isCountdownOver ? "00" : formatTime(hours),
            minutes: isCountdownOver ? "00" : formatTime(minutes),
            seconds: isCountdownOver ? "00" : formatTime(seconds),
            milliseconds: isCountdownOver ? "00" : formatTime(milliseconds),
            isCountdownOver,
        };
    }

    function formatTime(time: number): string {
        return time < 10 ? `0${time}` : `${time}`;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7FBFC]">
            {/* Video container */}
            <div className="relative">
                {/* Embedded video */}
                <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                    <source src="/bg.mp4" type="video/mp4" />
                    {/* Add other video formats if needed */}
                </video>
            </div>

            {/* Countdown timer */}
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col text-black">
                <p className="font-bold text-[4vw] mb-[1vw] bg-gray-500 bg-opacity-10 pl-[4vw] pr-[4vw]">
                    {countdown.isCountdownOver ? (
                        <a href={"https://ucho-ten.net/"} target={"_blank"}>Access Ucho-ten</a>
                    ) : (
                        `Ucho-ten`
                    )}
                </p>
                <h1 className={`text-[10vw] font-bold mb-[0.4vw] tabular-nums bg-gray-500 bg-opacity-10 pl-[5vw] pr-[5vw] ${countdown.isCountdownOver ? 'text-red-500' : ''}`} dangerouslySetInnerHTML={{ __html: `${countdown.hours}:${countdown.minutes}:${countdown.seconds}.${countdown.milliseconds}` }}></h1>
            </div>
        </div>
    );
}
