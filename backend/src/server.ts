// src/server.ts
import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres1234',
  port: 5432,
});

app.use(cors());
app.use(express.json());

app.get('/api/status', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM pod_status ORDER BY id DESC LIMIT 1');
    const statusData = result.rows[0];
    res.json(statusData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
