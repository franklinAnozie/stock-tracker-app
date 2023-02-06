import SummaryPage from './Pages/SummaryPage';
import DetailsPage from './Pages/DetailsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <main className="container">
      <Router>
        <Routes>
          <Route
            path='/'
            element={<SummaryPage />}
          >
          </Route>
          <Route
            path='/details/:symbol'
            element={<DetailsPage />}
          >
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
