import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import logo from './logo.png'
import './App.css'
import NavList from './components/Header/NavList'

const App = () => {
  return (
    <Router>
      <div className='App'>
        <header>
          <NavList />
        </header>

        <main className='App-header'>
          <Switch>
            <Route exact path="/" >
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
  )
}

export default App
