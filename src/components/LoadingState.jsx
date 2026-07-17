import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState() {
    const [showTimeoutText, setShowTimeoutText] = useState(false);

    useEffect(() => {
        // Show "Still working..." text after 10 seconds
        const timer = setTimeout(() => {
            setShowTimeoutText(true);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
                <Loader2 className="w-12 h-12 text-indigo-400 animate-spin relative" />
            </div>
            <h3 className="text-xl font-medium text-slate-50 mb-2 animate-pulse">
                Studying your notes...
            </h3>
            <p className="text-slate-400 min-h-[1.5rem] transition-opacity duration-500">
                {showTimeoutText ? "Still working... this is a lot of information!" : "Crafting your flashcards and quiz"}
            </p>
        </div>
    );
}
