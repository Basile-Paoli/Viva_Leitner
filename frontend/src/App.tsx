import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RepositoryProvider } from './context/RepositoryContext';
import { Dashboard } from './pages/Dashboard';
import { Quiz } from './pages/Quiz';
import { Library } from './pages/Library';
import { CreateCard } from './pages/CreateCard';

function App() {
  return (
    <RepositoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateCard />} />
          <Route path="/library" element={<Library />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </BrowserRouter>
    </RepositoryProvider>
  );
}

export default App;
