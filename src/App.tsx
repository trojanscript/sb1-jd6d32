import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LayoutDashboard, Package, Users } from 'lucide-react';
import Inventory from './pages/Inventory';
import Bookings from './pages/Bookings';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <LayoutDashboard className="h-8 w-8 text-indigo-600" />
                    <span className="ml-2 text-xl font-bold text-gray-900">Admin Dashboard</span>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link
                      to="/"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      <Package className="h-4 w-4 mr-1" />
                      Inventory
                    </Link>
                    <Link
                      to="/bookings"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      Bookings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Inventory />} />
              <Route path="/bookings" element={<Bookings />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;