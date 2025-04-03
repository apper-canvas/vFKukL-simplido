import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import Navbar from './components/Navbar';
import TodoPage from './pages/TodoPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <TodoProvider>
      <Router>
        <div className="min-h-screen bg-purple-50">
          <Navbar />
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