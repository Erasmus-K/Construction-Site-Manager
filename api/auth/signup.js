import fs from 'fs';
import path from 'path';

const getDbPath = () => path.join(process.cwd(), 'db.json');

const readDB = () => {
  try {
    const data = fs.readFileSync(getDbPath(), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(getDbPath(), JSON.stringify(data, null, 2));
};

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password, confirmPassword, name, email, role } = req.body;
    
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, error: 'Passwords do not match' });
    }

    const db = readDB();
    
    if (db.users.find(u => u.username === username)) {
      return res.status(400).json({ success: false, error: 'Username already exists' });
    }

    const newUser = {
      id: Math.max(...db.users.map(u => u.id), 0) + 1,
      username,
      password,
      name,
      email,
      role
    };

    db.users.push(newUser);
    writeDB(db);

    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ success: true, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}