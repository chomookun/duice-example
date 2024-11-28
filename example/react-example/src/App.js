import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import MasterDetail from './pages/MasterDetail';

function App() {
  return (
    <Router basename="/react-example">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/master-detail" element={<MasterDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
