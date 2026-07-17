# AI Study Assistant

A modern, responsive React application that turns your notes into interactive flashcards and practice quizzes using Gemini.

## Features

- **Instant Generation**: Paste your study material and get structured flashcards and quizzes.
- **Interactive Flashcards**: Flip cards, mark concepts as known or still learning.
- **Dynamic Quizzes**: Practice what you've learned and track your score.
- **Retry Wrong Answers**: Focus on the questions you missed.
- **Server-side AI Integration**: A small Express API forwards note text to Gemini and returns structured JSON.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Poonam-Singh123/study-assistant-ai.git
   cd study-assistant-ai
   ```

2. **Create a local env file:**
   Copy the example file and add your Gemini API key.
   ```bash
   copy .env.example .env
   ```

3. **Edit `.env`:**
   ```env
   PORT=3001
   GEMINI_API_KEY="your_api_key_here"
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Run in development:**
   ```bash
   npm run dev
   ```

   - The frontend runs with Vite.
   - The backend API runs on `http://localhost:3001`.

6. **Run a production build:**
   ```bash
   npm run build
   npm start
   ```

   In production, `server.js` serves the built frontend from `dist`.

## Environment Notes

- `.env` is ignored by git, so your API key stays local.
- On deployment (Render, Vercel, etc.), set `GEMINI_API_KEY` in the environment variable settings for your service.
- `api/generate.js` uses `process.env.GEMINI_API_KEY` and will return an error if it is missing.

## Usage

1. Open the app in your browser.
2. Paste your notes into the input area.
3. Click "Generate Study Set".
4. Review generated flashcards and take the quiz.
5. Use the retry option to practice incorrectly answered questions.

## Project Details

- **Tech Stack:** Vite + React, Tailwind CSS, Express, Google Gemini.
- **Backend:** `server.js` serves the app and exposes `/api/generate`.
- **AI:** `api/generate.js` validates `GEMINI_API_KEY` and uses Gemini to generate structured flashcards and quiz content.

## License

MIT License
