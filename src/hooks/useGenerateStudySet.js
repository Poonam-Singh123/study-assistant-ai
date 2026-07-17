import { useState, useRef, useCallback, useEffect } from 'react';
import { validateStudySet } from '../lib/validateStudySet';

export function useGenerateStudySet() {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('studyAssistantData');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) { return null; }
        }
        return null;
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);

    // Save to local storage whenever data changes
    useEffect(() => {
        if (data) {
            localStorage.setItem('studyAssistantData', JSON.stringify(data));
        } else {
            localStorage.removeItem('studyAssistantData');
        }
    }, [data]);

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
