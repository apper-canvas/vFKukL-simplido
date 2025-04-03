import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-purple-600 flex items-center">
            <CheckSquare className="h-6 w-6 mr-2" />
            TodoTracker
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CheckSquare className="h-5 w-5 mr-1" />
              Tasks
            </Link>
            
            <Link
              to="/dashboard"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/dashboard' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="h-5 w-5 mr-1" />
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;