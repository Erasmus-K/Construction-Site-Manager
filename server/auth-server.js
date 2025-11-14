import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'auth-db.json');

const initDB = () => {
  const defaultData = {
    users: [
      {
        id: 1,
        username: "admin",
        password: "admin123",
        role: "admin",
        name: "Admin User",
        email: "admin@construction.com"
      },
      {
        id: 2,
        username: "agent1",
        password: "agent123",
        role: "site_agent",
        name: "Site Agent",
        email: "agent@construction.com"
      },
      {
        id: 3,
        username: "client1",
        password: "client123",
        role: "client",
        name: "John Client",
        email: "client@example.com"
      }
    ]
  };

  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
  }
};

const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

app.post('/auth/login', (req, res) => {
  try {
    const { username, password, role } = req.body;
    const db = readDB();
    
    const user = db.users.find(u => 
      u.username === username && 
      u.password === password && 
      u.role === role
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      res.json({ success: true, user: userWithoutPassword });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/auth/signup', (req, res) => {
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
      id: Math.max(...db.users.map(u => u.id)) + 1,
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
});

initDB();

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Auth Server running on http://localhost:${PORT}`);
});