import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { refreshUserAsync, selectUser } from 'app/slices/userSlice';
// import browserHistory from './browserHistory';
import constants from './constants';

import AuthRoute from './components/ETC/Routes/AuthRoute';
import NoAuthRoute from './components/ETC/Routes/NoAuthRoute';
import AdminRoute from './components/ETC/Routes/AdminRoute';
import { ThemeProvider } from 'context';
import styles from './App.module.sass';

// import Loader from './components/Loader';
import CircleLoader from 'react-spinners/ClipLoader';
import HeaderSkeleton from './components/Header/HeaderSkeleton';
import FooterSkeleton from './components/Footer/FooterSkeleton';
import ActivateEmailPage from 'pages/Auth/ActivateEmail';
/* 
const daytime = new Date().getHours();
const pretheme = daytime > 18 || daytime < 6 ? 'dark' : 'light';
window.root.classList.add(pretheme); */

let pretheme = localStorage.getItem('theme');
if (!pretheme) {
  pretheme = 'light';
  localStorage.setItem('theme', pretheme);
}
window.root.classList.add(pretheme);

const HomePage = React.lazy(() => import('pages/Home'));
const PageNotFound = React.lazy(() => import('./pages/404'));

const Header = React.lazy(() => import('components/Header'));
const Footer = React.lazy(() => import('components/Footer'));

const LauncherPage = React.lazy(() => import('pages/Home/Launcher'));
const RulesPage = React.lazy(() => import('pages/Home/Rules'));
const AboutPage = React.lazy(() => import('pages/Home/About'));

const BannedPage = React.lazy(() => import('./pages/Home/Banned'));
const MapPage = React.lazy(() => import('./pages/Home/Map'));
const StatsPage = React.lazy(() => import('./pages/Home/Stats'));
// const StatsPage = React.lazy(() => import('pages/Home/Stats'));

const LoginPage = React.lazy(() => import('pages/Auth/Login'));
const RegisterPage = React.lazy(() => import('pages/Auth/Register'));
const ProfilePage = React.lazy(() => import('./pages/Profile'));

const AdminPage = React.lazy(() => import('./pages/Admin'));

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [theme, setTheme] = useState(pretheme);
  const handleSetTheme = useCallback(() => {
    setTheme(v => {
      if (v === 'light') {
        window.root.classList.replace('light', 'dark');
        localStorage.setItem('theme', 'dark');
        return 'dark';
      }
      if (v === 'dark') {
        window.root.classList.replace('dark', 'light');
        localStorage.setItem('theme', 'light');
        return 'light';
      }
    });
  }, []);

  console.log(theme);
  const themeState = useMemo(() => [theme, handleSetTheme], [theme, handleSetTheme]);

  useEffect(() => {
    if (user.data === null) {
      const refreshToken = localStorage.getItem(constants.REFRESH_TOKEN)
      
      if (refreshToken) {
        dispatch(refreshUserAsync(refreshToken));
      }
    }
  }, [dispatch, user.data]);

  const rolltheDice = Math.random() * 100 >= 97;

  if (rolltheDice) {
    setTimeout(() => {
      const elemXelo = document.querySelector('.' + styles.xelo);

      if (elemXelo) {
        const hideXelo = () => {
          elemXelo.style.transform = 'translate(0px, 400px) scaleX(-1)';
        };

        elemXelo.addEventListener('mouseenter', hideXelo);
        setTimeout(hideXelo, 5000);
      }
    }, 500);
  }

  return (
    <ThemeProvider value={themeState}>
      <BrowserRouter /* history={browserHistory} */>
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
                  {/* Public routes */}
                  <Route exact path='/' component={HomePage} />

                  <Route exact path='/home/rules' component={RulesPage} />
                  <Route exact path='/home/about' component={AboutPage} />
                  <Route exact path='/home/launcher' component={LauncherPage} />

                  <Route exact path='/home/map' component={MapPage} />

                  <Route exact path='/home/banned' component={BannedPage} />
                  <Route exact path='/home/stats' component={StatsPage} />
                  {/* <Route exact path='/home/stats' component={StatsPage} /> */}

                  {/* No auth routes */}
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
                  <NoAuthRoute exact={true} path='/activate-email' component={ActivateEmailPage} />

                  {/* Auth required routes */}  
                  <AuthRoute
                    exact={true}
                    path='/profile'
                    component={ProfilePage}
                  />

                  {/* Admin routes */}
                  <AdminRoute exact path='/profile/admin' component={AdminPage} />

                  {/* 404 */}
                  <Route path={['*', '/404']} component={PageNotFound} />
                </Switch>
              </Suspense>
            </div>
          </main>
          <Suspense fallback={<FooterSkeleton />}>
            <Footer />
          </Suspense>
          {/* TODO nigga xelo on dark theme */}
          {rolltheDice && (
            <img className={styles.xelo} src={theme === "light"? '/xelo.png' : '/xelo_black.png' } alt='Secret xelo posture' />
          )}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
