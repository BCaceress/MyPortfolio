"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingAnimation = () => {
    const [typedText, setTypedText] = useState("");
    const fullText = "Hello World";
    const [activeKey, setActiveKey] = useState<string | null>(null);

    // Keys that will be "pressed" during animation
    const keyboardKeys = [
        { char: "H", id: "h", x: 37, y: 50, label: "H" },
        { char: "e", id: "e", x: 87, y: 50, label: "E" },
        { char: "l", id: "l", x: 147, y: 50, label: "L" },
        { char: "l", id: "l2", x: 147, y: 50, label: "L" },
        { char: "o", id: "o", x: 127, y: 50, label: "O" },
        { char: " ", id: "space", x: 97, y: 90, width: 80, label: "" },
        { char: "W", id: "w", x: 67, y: 30, label: "W" },
        { char: "o", id: "o2", x: 127, y: 50, label: "O" },
        { char: "r", id: "r", x: 107, y: 50, label: "R" },
        { char: "l", id: "l3", x: 147, y: 50, label: "L" },
        { char: "d", id: "d", x: 77, y: 50, label: "D" }
    ];

    useEffect(() => {
        if (typedText.length < fullText.length) {
            const nextChar = fullText[typedText.length];
            const currentKey = keyboardKeys.find(k => k.char === nextChar);

            // Highlight the key
            if (currentKey) {
                setActiveKey(currentKey.id);

                // After highlighting the key, add the character to the typed text
                const typingTimeout = setTimeout(() => {
                    setTypedText(prev => prev + nextChar);
                    setActiveKey(null);
                }, 150);

                return () => clearTimeout(typingTimeout);
            }
        }
    }, [typedText, fullText]);

    useEffect(() => {
        // Start typing after a short delay
        const startTypingTimeout = setTimeout(() => {
            setTypedText("");
        }, 500);

        return () => clearTimeout(startTypingTimeout);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative flex flex-col items-center">
                {/* Background glow */}
                <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/10 to-green-500/10 dark:from-blue-500/5 dark:to-green-500/5 rounded-full filter blur-3xl animate-pulse"></div>

                {/* Monitor/Screen */}
                <motion.div
                    className="relative mb-8 bg-gray-900 dark:bg-gray-800 rounded-lg p-4 overflow-hidden border-2 border-gray-800 dark:border-gray-700 shadow-xl"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ width: "380px", height: "180px" }}
                >
                    {/* Monitor Top Bar */}
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 dark:bg-gray-700 flex items-center px-2">
                        <div className="flex space-x-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-grow flex justify-center">
                            <span className="text-xs text-gray-400 font-mono">terminal</span>
                        </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="mt-6 font-mono text-sm p-2 h-full">
                        <div className="flex items-center mb-2 text-gray-400">
                            <span className="text-green-400">➜</span>
                            <span className="ml-2 text-blue-400">~/portfolio</span>
                            <span className="ml-2">$</span>
                        </div>

                        {/* Typing effect with cursor */}
                        <div className="flex items-center">
                            <span className="mr-2 text-gray-400">$</span>
                            <div className="text-white relative">
                                <span>{typedText}</span>
                                <span className="animate-blink absolute ml-0.5 w-2 h-4 bg-blue-400 dark:bg-green-400"></span>
                            </div>
                        </div>

                        {/* Progress bar at bottom */}
                        {typedText.length === fullText.length && (
                            <div className="absolute bottom-4 left-4 right-4 h-1 bg-gray-700 mt-4 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Keyboard */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative"
                >
                    <svg width="360" height="120" viewBox="0 0 360 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Improved keyboard base with better shadows and rounded edges */}
                        <rect x="10" y="10" width="340" height="100" rx="10" className="fill-gray-200 dark:fill-gray-800 filter drop-shadow-lg" />
                        <rect x="15" y="15" width="330" height="90" rx="8" className="fill-gray-300 dark:fill-gray-700" />

                        {/* Keyboard inner shadow */}
                        <rect x="15" y="15" width="330" height="90" rx="8" className="fill-transparent stroke-gray-400/20 dark:stroke-white/5" />

                        {/* Keyboard keys - first row with letters */}
                        {[...Array(11)].map((_, i) => (
                            <g key={`key-row1-${i}`}>
                                <rect
                                    x={27 + i * 20}
                                    y="30"
                                    width="16"
                                    height="16"
                                    rx="3"
                                    className={`${keyboardKeys.find(k => k.x === (27 + i * 20) && k.y === 30)?.id === activeKey
                                            ? 'fill-blue-400 dark:fill-green-500'
                                            : 'fill-gray-100 dark:fill-gray-600'
                                        } stroke-gray-300 dark:stroke-gray-500`}
                                    filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.1))"
                                />
                                <text
                                    x={(27 + i * 20) + 8}
                                    y="30"
                                    dy="0.9em"
                                    textAnchor="middle"
                                    className="text-[6px] fill-gray-500 dark:fill-gray-400 font-bold pointer-events-none select-none"
                                >
                                    {String.fromCharCode(81 + i)}
                                </text>
                            </g>
                        ))}

                        {/* Keyboard keys - second row with letters */}
                        {[...Array(10)].map((_, i) => (
                            <g key={`key-row2-${i}`}>
                                <rect
                                    x={37 + i * 20}
                                    y="50"
                                    width="16"
                                    height="16"
                                    rx="3"
                                    className={`${keyboardKeys.find(k => k.x === (37 + i * 20) && k.y === 50)?.id === activeKey
                                            ? 'fill-blue-400 dark:fill-green-500'
                                            : 'fill-gray-100 dark:fill-gray-600'
                                        } stroke-gray-300 dark:stroke-gray-500`}
                                    filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.1))"
                                />
                                <text
                                    x={(37 + i * 20) + 8}
                                    y="50"
                                    dy="0.9em"
                                    textAnchor="middle"
                                    className="text-[6px] fill-gray-500 dark:fill-gray-400 font-bold pointer-events-none select-none"
                                >
                                    {String.fromCharCode(65 + i)}
                                </text>
                            </g>
                        ))}

                        {/* Third row */}
                        {[...Array(9)].map((_, i) => (
                            <g key={`key-row3-${i}`}>
                                <rect
                                    x={47 + i * 20}
                                    y="70"
                                    width="16"
                                    height="16"
                                    rx="3"
                                    className="fill-gray-100 dark:fill-gray-600 stroke-gray-300 dark:stroke-gray-500"
                                    filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.1))"
                                />
                                <text
                                    x={(47 + i * 20) + 8}
                                    y="70"
                                    dy="0.9em"
                                    textAnchor="middle"
                                    className="text-[6px] fill-gray-500 dark:fill-gray-400 font-bold pointer-events-none select-none"
                                >
                                    {String.fromCharCode(90 + i)}
                                </text>
                            </g>
                        ))}

                        {/* Space bar with improved look */}
                        <g>
                            <rect
                                x="87"
                                y="90"
                                width="80"
                                height="16"
                                rx="5"
                                className={`${activeKey === 'space'
                                    ? 'fill-blue-400 dark:fill-green-500'
                                    : 'fill-gray-100 dark:fill-gray-600'} stroke-gray-300 dark:stroke-gray-500`}
                                filter="drop-shadow(0px 2px 1px rgba(0,0,0,0.15))"
                            />
                            {/* Space bar reflection */}
                            <rect
                                x="89"
                                y="91"
                                width="76"
                                height="5"
                                rx="2"
                                className="fill-white/10 dark:fill-white/5"
                            />
                        </g>

                        {/* Additional keys with rounded corners */}
                        <rect
                            x="27"
                            y="90"
                            width="56"
                            height="16"
                            rx="5"
                            className="fill-gray-100 dark:fill-gray-600 stroke-gray-300 dark:stroke-gray-500"
                            filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.1))"
                        />
                        <rect
                            x="171"
                            y="90"
                            width="56"
                            height="16"
                            rx="5"
                            className="fill-gray-100 dark:fill-gray-600 stroke-gray-300 dark:stroke-gray-500"
                            filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.1))"
                        />
                    </svg>

                    {/* Enhanced reflection/light effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent dark:from-white/10 pointer-events-none rounded-lg"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 dark:from-white/5 dark:to-white/5 pointer-events-none"></div>
                </motion.div>

                {/* Loading text */}
                <motion.div
                    className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {typedText.length === fullText.length ? (
                        <span className="animate-pulse">Loading portfolio...</span>
                    ) : (
                        <span>Starting up...</span>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoadingAnimation;
