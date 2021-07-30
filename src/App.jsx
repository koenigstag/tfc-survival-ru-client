import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from "@/pages"

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />

        <main className='App-header'>
          <Switch>
            <Route exact path='/' component={HomePage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
