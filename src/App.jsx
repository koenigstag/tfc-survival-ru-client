import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '@/pages/Home';
import LauncherPage from '@/pages/Home/Launcher';
import RulesPage from '@/pages/Home/Rules';
import AboutPage from '@/pages/Home/About';
import BannedPage from './pages/Home/Banned';
import OnlinePage from './pages/Home/Online';
import LoginPage from '@/pages/Auth/Login';
import RegisterPage from '@/pages/Auth/Register';
import ProfilePage from './pages/Profile';
import AdminPage from './pages/Admin';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthRoute from './components/ETC/AuthRoute';
import NoAuthRoute from './components/ETC/NoAuthRoute';
import xelo from '@/xelo.png';
import styles from './App.module.sass';

const App = () => {
  const rolltheDice = Math.random() * 100 >= 95;

  if (rolltheDice) {
    setTimeout(() => {
      const elemXelo = document.querySelector('.' + styles.xelo);

      if (elemXelo) {
        const hideXelo = () => {
          elemXelo.style.transform = 'translate(0px, 100px) scaleX(-1)';
        };

        elemXelo.addEventListener('mouseenter', hideXelo);
        setTimeout(hideXelo, 5000);
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

              <Route exact path='/home/launcher' component={LauncherPage} />
              <Route exact path='/home/rules' component={RulesPage} />
              <Route exact path='/home/about' component={AboutPage} />

              <Route exact path='/home/banned' component={BannedPage} />
              <Route exact path='/home/online' component={OnlinePage} />

              <NoAuthRoute
                exact={true}
                path='/account/login'
                component={LoginPage}
              />
              <NoAuthRoute
                exact={true}
                path='/account/register'
                component={RegisterPage}
              />

              <AuthRoute exact={true} path='/profile' component={ProfilePage} />

              <Route exact path='/profile/admin' component={AdminPage} />
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
