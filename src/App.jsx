import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '@/components/Header';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Auth/Login';
import RegisterPage from '@/pages/Auth/Register';
import styles from './App.module.sass';

const App = () => {
  return (
    <Router>
      <div className={styles.App}>
        <Header />

        <main className={styles.AppMain}>
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
