import fs from 'fs';
import path from 'path';

const getDbPath = () => path.join(process.cwd(), 'db.json');

const readDB = () => {
  try {
    const data = fs.readFileSync(getDbPath(), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { timeline: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(getDbPath(), JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
  const db = readDB();
  const { workId, _sort, _order, _limit } = req.query;

  switch (req.method) {
    case 'GET':
      let timeline = db.timeline || [];
      
      if (workId) {
        timeline = timeline.filter(t => t.workId === parseInt(workId));
      }
      
      if (_sort === 'createdAt' && _order === 'desc') {
        timeline.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      
      if (_limit) {
        timeline = timeline.slice(0, parseInt(_limit));
      }
      
      res.json(timeline);
      break;

    case 'POST':
      try {
        const newEvent = {
          id: Math.max(...(db.timeline || []).map(t => t.id), 0) + 1,
          ...req.body,
          createdAt: new Date().toISOString()
        };
        
        if (!db.timeline) db.timeline = [];
        db.timeline.push(newEvent);
        writeDB(db);
        
        res.json(newEvent);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}