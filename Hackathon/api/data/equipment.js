import fs from 'fs';
import path from 'path';

const getDbPath = () => path.join(process.cwd(), 'db.json');

const readDB = () => {
  try {
    const data = fs.readFileSync(getDbPath(), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { equipment: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(getDbPath(), JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
  const db = readDB();

  switch (req.method) {
    case 'GET':
      res.json(db.equipment || []);
      break;

    case 'PATCH':
      try {
        const { id } = req.query;
        const equipmentIndex = db.equipment.findIndex(e => e.id === parseInt(id));
        
        if (equipmentIndex === -1) {
          return res.status(404).json({ error: 'Equipment not found' });
        }
        
        db.equipment[equipmentIndex] = { ...db.equipment[equipmentIndex], ...req.body };
        writeDB(db);
        
        res.json(db.equipment[equipmentIndex]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}