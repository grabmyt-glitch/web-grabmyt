import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { ActivityFeed } from './ActivityFeed';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
      <ActivityFeed />
    </div>
  );
}
