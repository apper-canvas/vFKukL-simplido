import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, BarChart2 } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-6 w-6" />
            <h1 className="text-xl font-bold">TodoTracker</h1>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 rounded hover:bg-purple-700 transition-colors ${
                location.pathname === '/' ? 'bg-purple-700' : ''
              }`}
            >
              <span>Todo List</span>
            </Link>
            
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2 rounded hover:bg-purple-700 transition-colors ${
                location.pathname === '/dashboard' ? 'bg-purple-700' : ''
              }`}
            >
              <BarChart2 className="h-5 w-5 mr-1" />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;