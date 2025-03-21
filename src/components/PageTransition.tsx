"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingAnimation from "./LoadingAnimation";

interface PageTransitionProps {
    children: React.ReactNode;
    showLoading?: boolean;
    loadingDuration?: number;
}

const PageTransition: React.FC<PageTransitionProps> = ({
    children,
    showLoading = false,
    loadingDuration = 2000
}) => {
    const [isLoading, setIsLoading] = useState(showLoading);

    useEffect(() => {
        if (showLoading) {
            const timer = setTimeout(() => setIsLoading(false), loadingDuration);
            return () => clearTimeout(timer);
        }
    }, [showLoading, loadingDuration]);

    return (
        <>
            {isLoading && <LoadingAnimation />}

            <motion.div
                className="animate-fadeIn"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.7 }}
            >
                {children}
            </motion.div>
        </>
    );
};

export default PageTransition;
