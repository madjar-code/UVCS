import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
