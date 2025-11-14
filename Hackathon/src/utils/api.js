export const api = {
  // Works
  getWorks: () => fetch('/api/data/works').then(r => r.json()),
  getWork: (id) => fetch(`/api/data/works?id=${id}`).then(r => r.json()),
  createWork: (work) => fetch('/api/data/works', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(work)
  }).then(r => r.json()),
  updateWork: (id, work) => fetch(`/api/data/works?id=${id}`, {
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
  getEquipment: () => fetch('/api/data/equipment').then(r => r.json()),
  updateEquipment: (id, equipment) => fetch(`/api/data/equipment?id=${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipment)
  }).then(r => r.json()),

  // Labour Logs
  getLabourLogs: () => fetch(`${API_BASE}/labourLogs?_expand=work`).then(r => r.json()),
  createLabourLog: (log) => fetch(`${API_BASE}/labourLogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(log)
  }).then(r => r.json()),

  // Finances
  getFinances: () => fetch('/api/data/finances').then(r => r.json()),
  createFinance: (finance) => fetch('/api/data/finances', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(finance)
  }).then(r => r.json()),

  // Timeline
  getTimeline: (workId) => fetch(`${API_BASE}/timeline?workId=${workId}&_sort=date&_order=desc`).then(r => r.json()),
  createTimelineEvent: (event) => fetch(`${API_BASE}/timeline`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  }).then(r => r.json()),

  // Users
  getUsers: () => fetch('/api/users').then(r => r.json()),
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