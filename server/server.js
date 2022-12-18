import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(cors());

app.get('/api/products', (req, res) => {
  res.status(200).json(data.products);
});

app.listen(port, () => {
  console.log(`Server at https://localhost:${port}`);
});
