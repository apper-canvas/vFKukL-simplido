import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <TodoProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<TodoPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;