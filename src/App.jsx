import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.png';
import './App.css';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />

        <main className='App-header'>
          <Switch>
            <Route exact path='/'>
              <img src={logo} className='App-logo' alt='logo' />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className='App-link'
                href='https://reactjs.org'
                target='_blank'
                rel='noopener noreferrer'
              >
                Learn React
              </a>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
