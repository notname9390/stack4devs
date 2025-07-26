import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Stack from './pages/Stack';
import Account from './pages/Account';
import MyFavorites from './pages/MyFavorites';
import Settings from './pages/Settings';
import Header from './components/Header';
import { initializeTheme } from './utils/settings';
import UseCaseExplorer from './pages/UseCaseExplorer';
import CommunityCases from './pages/CommunityCases';
import CreateCase from './pages/CreateCase';
import CommunityCaseDetail from './pages/CommunityCaseDetail';

function App() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white theme-container">
        <Header />
        <main>
          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/usecase"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Use Case Explorer
            </Link>
            <Link
              to="/community-cases"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Community Cases
            </Link>
            <Link
              to="/favorites"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              My Favorites
            </Link>
            <Link
              to="/settings"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Settings
            </Link>
            <Link
              to="/account"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Account
            </Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usecase" element={<UseCaseExplorer />} />
            <Route path="/community-cases" element={<CommunityCases />} />
            <Route path="/create-case" element={<CreateCase />} />
            <Route path="/community-case/:caseId" element={<CommunityCaseDetail />} />
            <Route path="/stack" element={<Stack />} />
            <Route path="/account" element={<Account />} />
            <Route path="/favorites" element={<MyFavorites />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
