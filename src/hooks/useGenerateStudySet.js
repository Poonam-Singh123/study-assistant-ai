import { useState, useRef, useCallback, useEffect } from 'react';
import { validateStudySet } from '../lib/validateStudySet';

export function useGenerateStudySet() {
    // No persistence: always start with a fresh session on load
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);

    // Intentionally no persistence: do not save study sets to localStorage

    const generate = useCallback(async (text) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        setLoading(true);
        setError(null);
        setData(null);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
                signal: abortController.signal,
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || `Server error: ${response.status} ${response.statusText}`);
            }

            const json = await response.json();
            validateStudySet(json);

            setData({
                topic: json.topic,
                flashcards: json.flashcards.map(f => ({ ...f, known: null })),
                quiz: json.quiz
            });
            setLoading(false);
        } catch (err) {
            if (err.name === 'AbortError') {
                return;
            }

            let message = err.message;
            if (err instanceof SyntaxError) {
                message = "Couldn't understand the AI's response (Malformed JSON)";
            }

            setError(message);
            setLoading(false);
        }
    }, []);

    const clearData = useCallback(() => {
        setData(null);
    }, []);

    return { generate, data, loading, error, setError, clearData };
}
