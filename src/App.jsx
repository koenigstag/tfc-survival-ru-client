import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthRoute from './components/ETC/Routes/AuthRoute';
import NoAuthRoute from './components/ETC/Routes/NoAuthRoute';
import AdminRoute from './components/ETC/Routes/AdminRoute';
import xelo from '@/xelo.webp';
import styles from './App.module.sass';

// import Loader from './components/Loader';
import CircleLoader from 'react-spinners/ClipLoader';
import HeaderSkeleton from './components/Header/HeaderSkeleton';
import FooterSkeleton from './components/Footer/FooterSkeleton';

const HomePage = React.lazy(() => import('@/pages/Home'));
const PageNotFound = React.lazy(() => import('./pages/404'));

const Header = React.lazy(() => import('@/components/Header'));
const Footer = React.lazy(() => import('@/components/Footer'));

const LauncherPage = React.lazy(() => import('@/pages/Home/Launcher'));
const RulesPage = React.lazy(() => import('@/pages/Home/Rules'));
const AboutPage = React.lazy(() => import('@/pages/Home/About'));

const BannedPage = React.lazy(() => import('./pages/Home/Banned'));
const MapPage = React.lazy(() => import('./pages/Home/Map'));
const OnlinePage = React.lazy(() => import('./pages/Home/Online'));

const LoginPage = React.lazy(() => import('@/pages/Auth/Login'));
const RegisterPage = React.lazy(() => import('@/pages/Auth/Register'));
const ProfilePage = React.lazy(() => import('./pages/Profile'));

const AdminPage = React.lazy(() => import('./pages/Admin'));

const App = () => {
  const rolltheDice = Math.random() * 100 >= 98;

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
        <Suspense fallback={<HeaderSkeleton />}>
          <Header />
        </Suspense>
        <main className={styles.AppMain}>
          <div className={styles.container}>
            <Suspense
              fallback={
                <center>
                  <br />
                  <br />
                  <br />
                  <br />
                  <CircleLoader color='blue' size={100} />
                </center>
              }
            >
              <Switch>
                <Route exact path='/' component={HomePage} />

                <Route exact path='/home/launcher' component={LauncherPage} />
                <Route exact path='/home/rules' component={RulesPage} />
                <Route exact path='/home/about' component={AboutPage} />

                <Route exact path='/home/map' component={MapPage} />

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

                <AuthRoute
                  exact={true}
                  path='/profile'
                  component={ProfilePage}
                />

                <AdminRoute exact path='/profile/admin' component={AdminPage} />

                <Route path={['*', '/404']} component={PageNotFound} />
              </Switch>
            </Suspense>
          </div>
        </main>
        <Suspense fallback={<FooterSkeleton />}>
          <Footer />
        </Suspense>
        {/* // TODO nigga xelo on dark theme */}
        {rolltheDice && (
          <img className={styles.xelo} src={xelo} alt='Secret xelo posture' />
        )}
      </div>
    </Router>
  );
};

export default App;
