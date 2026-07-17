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
    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Server missing GEMINI_API_KEY" });
    }
    let genAI;
    try {
        genAI = getGenAI();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server misconfiguration: GEMINI_API_KEY' });
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
        res.status(500).json({ error: "Failed to generate study set", details: error.message });
    }
}
