import { API_BASE_URL } from '../config/api';

export const api = {
  // Works
  getWorks: () => fetch(`${API_BASE_URL}/works`).then(r => r.json()),
  getWork: (id) => fetch(`${API_BASE_URL}/works/${id}`).then(r => r.json()),
  createWork: (work) => fetch(`${API_BASE_URL}/works`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(work)
  }).then(r => r.json()),
  updateWork: (id, work) => fetch(`${API_BASE_URL}/works/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(work)
  }).then(r => r.json()),

  // Site Visits
  getSiteVisits: () => fetch(`${API_BASE}/siteVisits?_expand=work`).then(r => r.json()),
  createSiteVisit: (visit) => fetch(`${API_BASE}/siteVisits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(visit)
  }).then(r => r.json()),

  // Equipment
  getEquipment: () => fetch(`${API_BASE_URL}/equipment`).then(r => r.json()),
  createEquipment: (equipment) => fetch(`${API_BASE_URL}/equipment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipment)
  }).then(r => r.json()),
  updateEquipment: (id, equipment) => fetch(`${API_BASE_URL}/equipment/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipment)
  }).then(r => r.json()),

  // Labour Logs
  getLabourLogs: () => fetch('http://localhost:3001/labourLogs').then(r => r.json()),
  createLabourLog: (log) => fetch('http://localhost:3001/labourLogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(log)
  }).then(r => r.json()),

  // Finances
  getFinances: () => fetch('http://localhost:3001/finances').then(r => r.json()),
  createFinance: (finance) => fetch('http://localhost:3001/finances', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(finance)
  }).then(r => r.json()),

  // Timeline
  getTimeline: (workId) => fetch(`http://localhost:3001/timeline?workId=${workId}&_sort=date&_order=desc`).then(r => r.json()),
  createTimelineEvent: (event) => fetch('http://localhost:3001/timeline', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  }).then(r => r.json()),

  // Users
  getUsers: () => fetch(`${API_BASE_URL}/users`).then(r => r.json()),
  createUser: (user) => fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }).then(r => r.json()),
  updateUser: (id, user) => fetch(`${API_BASE}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }).then(r => r.json()),
  deleteUser: (id) => fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' })
};