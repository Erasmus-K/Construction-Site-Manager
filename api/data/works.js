import fs from 'fs';
import path from 'path';

const getDbPath = () => path.join(process.cwd(), 'db.json');

const readDB = () => {
  try {
    const data = fs.readFileSync(getDbPath(), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { works: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(getDbPath(), JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
  const db = readDB();

  switch (req.method) {
    case 'GET':
      res.json(db.works || []);
      break;

    case 'POST':
      try {
        const newWork = {
          id: Math.max(...(db.works || []).map(w => w.id), 0) + 1,
          ...req.body,
          createdAt: new Date().toISOString()
        };
        
        if (!db.works) db.works = [];
        db.works.push(newWork);
        writeDB(db);
        
        res.json(newWork);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'PATCH':
      try {
        const { id } = req.query;
        const workIndex = db.works.findIndex(w => w.id === parseInt(id));
        
        if (workIndex === -1) {
          return res.status(404).json({ error: 'Work not found' });
        }
        
        db.works[workIndex] = { ...db.works[workIndex], ...req.body };
        writeDB(db);
        
        res.json(db.works[workIndex]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}