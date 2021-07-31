import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '@/components/Header';
import HomePage from '@/pages';
import LoginPage from '@/pages/Auth/Login';
import RegisterPage from '@/pages/Auth/Register';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />

        <main className='App-header'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='account/login' component={LoginPage} />
            <Route exact path='account/register' component={RegisterPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
