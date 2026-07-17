# AI Study Assistant

A modern, responsive React application that leverages AI to instantly turn your notes into interactive flashcards and practice quizzes.

## Features

- **Instant Generation**: Paste your study material and get structured flashcards and quizzes.
- **Interactive Flashcards**: 3D flip animation, mark cards as "Got it" or "Still learning".
- **Dynamic Quizzes**: Practice what you've learned. Test yourself and track your score.
- **Targeted Practice**: "Retry wrong answers" loop lets you focus only on what you got wrong.
- **Robust Error Handling**: Graceful error states and intelligent race-condition prevention using React hooks.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Poonam-Singh123/study-assistant-ai.git
   cd study-assistant-ai
   ```

2. **Set up Environment Variable:**
   Create a `.env` file in the root of the project and add your Gemini API Key:
   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```

3. **Install Dependencies & Start:**
   Run the following command to install dependencies and start both the Express backend and the Vite frontend simultaneously:
   ```bash
   npm install && npm start
   ```

The application will be available at `http://localhost:5173/`.

## Usage

1. Open the app in your browser.
2. Under "Turn Notes into Knowledge", paste any subject matter, topic, or dense lecture notes.
3. Click "Generate Study Set".
4. When the AI is done, the app will display a Flashcards view and a Practice Quiz view.
5. Use the flashcards to memorize content by flipping them and tracking your known/unknown cards.
6. Switch to the Practice Quiz to test your knowledge! If you make mistakes, tap the "Retry Wrong Answers" button at the end to drill only those incorrectly answered questions.

## Development Details

- **Tech Stack**: Vite + React, TailwindCSS v4, Express Server, Google Gemini 1.5 Flash API.
- **AI-usage note**: This project was developed with the assistance of an AI coding agent (Antigravity) paired with a user orchestrator. The AI significantly accelerated UI scaffolding, implemented complex 3D flip animations with Framer Motion, and engineered the schema validation / state handling required to reliably parse AI responses in a structured paradigm.
- **Known limitations**: 
  - Study sets are held in local state (`useState`). They are lost if you refresh the browser page (persistence to `localStorage` or a database was outside the scope of current requirements).
  - The single correct index format means multiple-select questions are not supported.
- **Time spent**: ~2.5 hours

## License

MIT License
