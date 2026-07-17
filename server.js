import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateRoute from './api/generate.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/generate', generateRoute);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
