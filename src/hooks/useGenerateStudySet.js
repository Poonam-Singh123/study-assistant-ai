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

            console.warn('Study set generation failed, falling back to local mock:', err);
            const mock = createMockStudySet(text);
            setData({
                topic: mock.topic,
                flashcards: mock.flashcards.map(f => ({ ...f, known: null })),
                quiz: mock.quiz,
            });
            setLoading(false);
        }
    }, []);

    const clearData = useCallback(() => {
        setData(null);
    }, []);

    return { generate, data, loading, error, setError, clearData };
}

function createMockStudySet(text) {
    const sentences = text
        .split(/(?<=[.?!])\s+/)
        .map(s => s.replace(/\s+/g, ' ').trim())
        .filter(Boolean);

    const topic = sentences[0] ? sentences[0].slice(0, 60) : 'Study Set';

    const flashcards = sentences.slice(0, 6).map((s, i) => ({
        id: `f${i + 1}`,
        front: s.length > 60 ? s.slice(0, 60) + '…' : s,
        back: s,
    }));

    while (flashcards.length < 6) {
        const i = flashcards.length;
        flashcards.push({ id: `f${i + 1}`, front: `Concept ${i + 1}`, back: `Explanation for concept ${i + 1}` });
    }

    const quiz = [];
    for (let i = 0; i < 5; i++) {
        const correctBack = flashcards[i % flashcards.length].back;
        const distractors = [];
        for (let j = 1; j <= 3; j++) {
            const idx = (i + j) % flashcards.length;
            distractors.push(flashcards[idx].back.slice(0, 80));
        }
        const options = [correctBack, ...distractors].slice(0, 4).map(o => o.length > 120 ? o.slice(0, 120) + '…' : o);
        const shuffled = options.map((opt, idx) => ({ opt, idx }));
        shuffled.sort(() => Math.random() - 0.5);
        const correctIndex = shuffled.findIndex(s => s.opt === correctBack);
        quiz.push({ id: `q${i + 1}`, question: `Question about: ${flashcards[i].front}`, options: shuffled.map(s => s.opt), correctIndex });
    }

    return { topic: topic || 'Study Set', flashcards, quiz };
}
