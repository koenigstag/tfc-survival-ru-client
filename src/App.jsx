import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '@/pages/Home';
import RulesPage from './pages/Home/Rules';
import LoginPage from '@/pages/Auth/Login';
import RegisterPage from '@/pages/Auth/Register';
import Header from '@/components/Header';
import Footer from './components/Footer';
import xelo from '@/xelo.png';
import styles from './App.module.sass';

const App = () => {
  const rolltheDice = Math.random() * 100 >= 95;

  if (rolltheDice) {
    setTimeout(() => {
      const elemXelo = document.querySelector('.' + styles.xelo);
      console.log('.' + styles.xelo);
      if (elemXelo) {
        console.log('test');
        elemXelo.addEventListener('mouseenter', () => {
          elemXelo.style.transform = 'translate(0px, 100px) scaleX(-1)';
        });
      }
    }, 500);
  }

  return (
    <Router>
      <div className={styles.App}>
        <Header />

        <main className={styles.AppMain}>
          <div className={styles.container}>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/account/login' component={LoginPage} />
              <Route exact path='/account/register' component={RegisterPage} />
              <Route exact path='/home/rules' component={RulesPage} />
            </Switch>
          </div>
        </main>
        <Footer />
        {rolltheDice && (
          <img className={styles.xelo} src={xelo} alt='Secret xelo posture' />
        )}
      </div>
    </Router>
  );
};

export default App;
