import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Landing from './components/Landing'
import Anime from './components/Anime'
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/anime/:id" component={Anime} />
      </div>
    </Router>
  );
}

export default App;
