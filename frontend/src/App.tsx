import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RepositoryProvider } from './context/RepositoryContext';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Quiz } from './pages/Quiz/Quiz';
import { Library } from './pages/Library/Library';
import { CreateCard } from './pages/CreateCard/CreateCard';

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
