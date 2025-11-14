import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';

const Layout = () => {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/app/dashboard', roles: ['admin', 'site_agent', 'engineer', 'foreman', 'client'] },
    { name: 'Works', path: '/app/works', roles: ['admin', 'site_agent', 'engineer', 'foreman'] },
    { name: 'Site Visits', path: '/app/site-visits', roles: ['admin', 'site_agent', 'engineer'] },
    { name: 'Equipment', path: '/app/equipment', roles: ['admin', 'site_agent', 'foreman'] },
    { name: 'Labour', path: '/app/labour', roles: ['admin', 'site_agent', 'foreman'] },
    { name: 'Finances', path: '/app/finances', roles: ['admin', 'site_agent'] },
    { name: 'AI Agents', path: '/app/ai-agents', roles: ['admin', 'site_agent'] },
    { name: 'Admin Panel', path: '/app/admin', roles: ['admin'] }
  ];

  const allowedNavigation = navigation.filter(nav => nav.roles.includes(user?.role));

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 lg:p-6 border-b border-slate-700">
          <h2 className="text-lg lg:text-xl font-bold text-blue-400">Construction Manager</h2>
          <p className="text-sm text-gray-300 mt-2">Welcome, {user?.name}</p>
          <p className="text-xs text-gray-400 capitalize">{user?.role?.replace('_', ' ')}</p>
        </div>
        
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            {allowedNavigation.map(nav => (
              <li key={nav.path}>
                <Link 
                  to={nav.path} 
                  className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === nav.path 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 lg:ml-0">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 lg:px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <button 
                className="lg:hidden mr-3 p-2 rounded-md text-gray-600 hover:bg-gray-100"
                onClick={() => setSidebarOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg lg:text-2xl font-semibold text-gray-800">Construction Site Manager</h1>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="relative">
                <button 
                  className="relative px-2 lg:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <span className="hidden sm:inline">Notifications</span>
                  <span className="sm:hidden">🔔</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute top-full right-0 mt-2 w-72 lg:w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-gray-500 text-center">No notifications</div>
                    ) : (
                      notifications.slice(0, 10).map(notification => (
                        <div 
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="font-medium text-gray-800">{notification.title}</div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <small className="text-xs text-gray-400">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              
              <button 
                className="px-2 lg:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 text-sm lg:text-base"
                onClick={logout}
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Exit</span>
              </button>
            </div>
          </div>
        </header>
        
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;