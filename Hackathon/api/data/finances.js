import fs from 'fs';
import path from 'path';

const getDbPath = () => path.join(process.cwd(), 'db.json');

const readDB = () => {
  try {
    const data = fs.readFileSync(getDbPath(), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { finances: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(getDbPath(), JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
  const db = readDB();

  switch (req.method) {
    case 'GET':
      res.json(db.finances || []);
      break;

    case 'POST':
      try {
        const newFinance = {
          id: Math.max(...(db.finances || []).map(f => f.id), 0) + 1,
          ...req.body,
          createdAt: new Date().toISOString()
        };
        
        if (!db.finances) db.finances = [];
        db.finances.push(newFinance);
        writeDB(db);
        
        res.json(newFinance);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}