import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
            <Route exact path="/" element={ <NotesListPage /> } />
            <Route exact path="/note/:id" element={ <NotePage /> } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
