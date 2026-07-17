/**
 * Validates the study set returned by the AI.
 * Throws an error if invalid, which can be caught and shown in ErrorState.
 */
export function validateStudySet(data) {
    if (!data || typeof data !== 'object') {
        throw new Error("Invalid response: Not an object");
    }

    if (!data.topic || typeof data.topic !== 'string') {
        throw new Error("Invalid response: Missing or invalid 'topic'");
    }

    if (!Array.isArray(data.flashcards) || data.flashcards.length === 0) {
        throw new Error("Invalid response: Missing or empty 'flashcards' array");
    }

    // Validate flashcards
    data.flashcards.forEach((card, i) => {
        if (!card.id || !card.front || !card.back) {
            throw new Error(`Invalid response: Flashcard at index ${i} is missing required fields`);
        }
    });

    if (!Array.isArray(data.quiz) || data.quiz.length === 0) {
        throw new Error("Invalid response: Missing or empty 'quiz' array");
    }

    // Validate quiz
    data.quiz.forEach((q, i) => {
        if (!q.id || !q.question || !Array.isArray(q.options) || q.options.length !== 4) {
            throw new Error(`Invalid response: Quiz question at index ${i} is malformed or doesn't have 4 options`);
        }
        if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex >= q.options.length) {
            throw new Error(`Invalid response: Quiz question at index ${i} has invalid correctIndex`);
        }
    });

    return true;
}
