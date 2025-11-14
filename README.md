# Construction Site Management System

A comprehensive React SPA with json-server backend for managing construction site operations.

## Features

- **Role-based Access Control**: Admin, Site Agent, Engineer, Foreman, Driver Operator, Mason, Casual, Client
- **Work Management**: Create and track construction works with financial reconciliation
- **Site Visits**: QC checklists with photo uploads and inspection reports
- **Equipment Management**: Inventory tracking and assignment to works
- **Labour Logging**: Daily worker logs with cost tracking
- **Financial Management**: Expense tracking with work reconciliation
- **Real-time Notifications**: Client notifications for all significant events
- **Timeline Tracking**: Event history for each work
- **Admin Panel**: User management with CRUD operations

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the json-server backend:**
   ```bash
   npm run server
   ```
   This starts the API server on http://localhost:3001

3. **Start the React development server:**
   ```bash
   npm start
   ```
   This starts the frontend on http://localhost:3000

4. **Or run both simultaneously:**
   ```bash
   npm run dev
   ```

## Demo Accounts

- **Admin**: username: `admin`, password: `admin123`
- **Site Agent**: username: `agent1`, password: `agent123`
- **Client**: username: `client1`, password: `client123`

## API Endpoints

### Authentication
- `GET /users` - Get all users
- `POST /users` - Create new user

### Works Management
- `GET /works` - Get all works
- `GET /works/:id` - Get specific work
- `POST /works` - Create new work
- `PATCH /works/:id` - Update work

### Site Visits
- `GET /siteVisits` - Get all site visits
- `POST /siteVisits` - Create site visit

### Equipment
- `GET /equipment` - Get all equipment
- `PATCH /equipment/:id` - Update equipment assignment

### Labour Logs
- `GET /labourLogs` - Get all labour logs
- `POST /labourLogs` - Create labour log

### Finances
- `GET /finances` - Get all financial records
- `POST /finances` - Create financial record

### Timeline
- `GET /timeline?workId=:id` - Get timeline for specific work
- `POST /timeline` - Create timeline event

### Notifications
- `GET /notifications?userId=:id` - Get user notifications
- `POST /notifications` - Create notification
- `PATCH /notifications/:id` - Mark notification as read

## Example REST API Calls

### Create a New Work
```javascript
POST http://localhost:3001/works
Content-Type: application/json

{
  "title": "Foundation Work",
  "description": "Concrete foundation for Building A",
  "clientId": 3,
  "estimatedValue": 50000,
  "startDate": "2024-01-15",
  "endDate": "2024-02-15",
  "status": "in_progress",
  "createdBy": 1,
  "createdAt": "2024-01-10T10:00:00Z"
}
```

### Record Site Visit
```javascript
POST http://localhost:3001/siteVisits
Content-Type: application/json

{
  "workId": 1,
  "visitDate": "2024-01-16",
  "inspector": "Site Agent",
  "qcChecklist": {
    "materialQuality": true,
    "safetyCompliance": true,
    "workmanship": false,
    "timelineAdherence": true
  },
  "notes": "Minor workmanship issues noted",
  "photos": ["photo1.jpg"],
  "createdAt": "2024-01-16T14:30:00Z"
}
```

### Log Daily Labour
```javascript
POST http://localhost:3001/labourLogs
Content-Type: application/json

{
  "workId": 1,
  "date": "2024-01-16",
  "workers": [
    {
      "name": "John Mason",
      "role": "mason",
      "hoursWorked": 8,
      "hourlyRate": 25
    }
  ],
  "totalCost": 200,
  "createdAt": "2024-01-16T18:00:00Z"
}
```

## Acceptance Criteria

### ✅ Core Features
- [x] Role-based authentication and authorization
- [x] Work creation and management
- [x] Site visits with QC checklists
- [x] Equipment inventory and assignment
- [x] Labour daily logging
- [x] Financial tracking and reconciliation
- [x] Timeline event tracking
- [x] Client notifications system
- [x] Admin panel for user management

### ✅ Technical Requirements
- [x] React SPA with functional components and hooks
- [x] json-server backend with db.json
- [x] Fetch API (no axios)
- [x] Role-based route protection
- [x] Frontend financial reconciliation
- [x] Mock authentication for development

### ✅ Business Logic
- [x] Notifications created for clients at every significant event
- [x] Financial entries automatically reconcile with work values
- [x] Equipment assignment tracking
- [x] Labour costs automatically create financial entries
- [x] Timeline events track all major activities

## Architecture

### Frontend Structure
```
src/
├── components/          # Reusable components
│   ├── Layout.js       # Main layout with navigation
│   └── ProtectedRoute.js # Route protection
├── pages/              # Page components
│   ├── Login.js        # Authentication
│   ├── Dashboard.js    # Overview and stats
│   ├── Works.js        # Work management
│   ├── SiteVisits.js   # QC and inspections
│   ├── Equipment.js    # Equipment management
│   ├── Labour.js       # Labour logging
│   ├── Finances.js     # Financial reconciliation
│   └── AdminPanel.js   # User management
├── hooks/              # Custom React hooks
│   ├── useAuth.js      # Authentication context
│   └── useNotifications.js # Notifications context
├── utils/              # Utility functions
│   └── api.js          # API calls
└── App.js              # Main application component
```

### Backend Schema (db.json)
- **users**: User accounts with roles
- **works**: Construction projects
- **siteVisits**: QC inspections with checklists
- **equipment**: Inventory and assignments
- **labourLogs**: Daily worker logs
- **finances**: Income and expense tracking
- **timeline**: Event history
- **notifications**: User notifications

## Financial Reconciliation

The system automatically reconciles financial data:

1. **Work Estimation vs Actual**: Compares estimated work value with actual expenses
2. **Category Breakdown**: Groups expenses by type (labour, equipment, materials)
3. **Variance Analysis**: Shows over/under budget status
4. **Completion Tracking**: Calculates completion percentage based on expenses

## Notification System

Clients receive notifications for:
- Work creation
- Site visit completions
- Timeline updates
- Financial milestones
- Equipment assignments
- Labour activities

## Security Notes

This is a development/demo application with:
- Simple password-based authentication
- No encryption or secure token handling
- Mock user roles for demonstration
- Client-side route protection only

For production use, implement:
- JWT tokens or session management
- Password hashing
- Server-side authentication
- HTTPS encryption
- Input validation and sanitization