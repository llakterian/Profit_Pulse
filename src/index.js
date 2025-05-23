import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  </React.StrictMode>
);