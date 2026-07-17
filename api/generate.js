import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

function getGenAI() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        throw new Error('GEMINI_API_KEY not set');
    }
    return new GoogleGenerativeAI(key);
}

const schema = {
    description: "A study set containing a topic, flashcards, and a quiz.",
    type: SchemaType.OBJECT,
    properties: {
        topic: {
            type: SchemaType.STRING,
            description: "Short title summarizing the input",
        },
        flashcards: {
            type: SchemaType.ARRAY,
            description: "List of flashcards (6-10 items usually)",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    id: { type: SchemaType.STRING, description: "Unique identifier, e.g., UUID or simple sequence" },
                    front: { type: SchemaType.STRING, description: "Flashcard front concept or term" },
                    back: { type: SchemaType.STRING, description: "Flashcard back explanation or definition" },
                },
                required: ["id", "front", "back"],
            },
        },
        quiz: {
            type: SchemaType.ARRAY,
            description: "List of multiple choice quiz questions (5-8 items usually)",
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    id: { type: SchemaType.STRING },
                    question: { type: SchemaType.STRING },
                    options: {
                        type: SchemaType.ARRAY,
                        items: { type: SchemaType.STRING },
                        description: "Exactly 4 options"
                    },
                    correctIndex: { type: SchemaType.INTEGER, description: "Index of the correct option (0 to 3)" },
                },
                required: ["id", "question", "options", "correctIndex"],
            },
        },
    },
    required: ["topic", "flashcards", "quiz"],
};

export default async function handler(req, res) {
    const hasKey = Boolean(process.env.GEMINI_API_KEY);
    let genAI;

    // In non-production (development) mode, prefer returning a deterministic mock
    // so local demos and testing work even when the Gemini API is unavailable or quota-limited.
    if (process.env.NODE_ENV !== 'production') {
        const { text } = req.body || {};
        if (text && typeof text === 'string') {
            return res.json(createMockStudySet(text));
        }
    }

    if (hasKey) {
        try {
            genAI = getGenAI();
        } catch (err) {
            console.error(err);
            // fallthrough to error response below
        }
    }
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: "Missing or invalid 'text' payload" });
    }

    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-flash-latest',
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            }
        });

        const prompt = `Create a study tool set (flashcards and a quiz) based on the following notes.
Please generate 6-10 flashcards and 5-8 quiz questions.
Notes:
${text}`;

        const result = await model.generateContent(prompt);
        let jsonText = result.response.text();

        // In case model wraps in markdown
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.substring(7);
            if (jsonText.endsWith('```')) {
                jsonText = jsonText.substring(0, jsonText.length - 3);
            }
        }

        const parsed = JSON.parse(jsonText.trim());
        res.json(parsed);

    } catch (error) {
        console.error("Gemini API error:", error);
        // If running in development or no API key available, return a safe mock study set
        if (process.env.NODE_ENV !== 'production') {
            try {
                const mock = createMockStudySet(text);
                return res.json(mock);
            } catch (e) {
                console.error('Failed to generate mock study set', e);
            }
        }

        res.status(500).json({ error: "Failed to generate study set", details: error.message });
    }
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

    // Ensure at least 6 flashcards
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
        // shuffle options but keep track of correctIndex
        const shuffled = options.map((opt, idx) => ({ opt, idx }));
        shuffled.sort(() => Math.random() - 0.5);
        const correctIndex = shuffled.findIndex(s => s.opt === correctBack);
        quiz.push({ id: `q${i + 1}`, question: `Question about: ${flashcards[i].front}`, options: shuffled.map(s => s.opt), correctIndex });
    }

    return { topic: topic || 'Study Set', flashcards, quiz };
}
