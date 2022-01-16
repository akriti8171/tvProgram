import './App.css';
import {   BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import ShowsList from './shows/showsList';
import ShowDetail from './shows/showDetail';
import Header from './header';
const App=()=>{

  return (
      <Router>
          <Header />
          <Routes>
            <Route path="/shows" exact element={<ShowsList />}/>
            <Route path="/shows/:id" exact element={<ShowDetail />}/>
            <Route path="/" element={<Navigate to="/shows" />}/>
            <Route path="*" element={<Navigate to="/shows" />} />
          </Routes>
      </Router>
  );
}

export default App;
