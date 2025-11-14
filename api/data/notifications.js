import fs from 'fs';
import path from 'path';

const getDbPath = () => path.join(process.cwd(), 'db.json');

const readDB = () => {
  try {
    const data = fs.readFileSync(getDbPath(), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { notifications: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(getDbPath(), JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
  const db = readDB();
  const { userId, _sort, _order } = req.query;

  switch (req.method) {
    case 'GET':
      let notifications = db.notifications || [];
      
      if (userId) {
        notifications = notifications.filter(n => n.userId === parseInt(userId));
      }
      
      if (_sort === 'createdAt' && _order === 'desc') {
        notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      
      res.json(notifications);
      break;

    case 'POST':
      try {
        const newNotification = {
          id: Math.max(...(db.notifications || []).map(n => n.id), 0) + 1,
          ...req.body,
          read: false,
          createdAt: new Date().toISOString()
        };
        
        if (!db.notifications) db.notifications = [];
        db.notifications.push(newNotification);
        writeDB(db);
        
        res.json(newNotification);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'PATCH':
      try {
        const { id } = req.query;
        const notificationIndex = db.notifications.findIndex(n => n.id === parseInt(id));
        
        if (notificationIndex === -1) {
          return res.status(404).json({ error: 'Notification not found' });
        }
        
        db.notifications[notificationIndex] = { ...db.notifications[notificationIndex], ...req.body };
        writeDB(db);
        
        res.json(db.notifications[notificationIndex]);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}