import './App.css';
import {BrowserRouter as Router } from 'react-router-dom';
import { Routers } from './router/Routers';

function App() {
  return (
    <div>
       <Router>
          <Routers />
        </Router>
    </div>
  );
}

export default App;
