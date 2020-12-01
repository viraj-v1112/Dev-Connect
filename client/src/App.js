import {Fragment} from 'react'
import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => (
    <Router>
      <Fragment className="App">
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
          </Switch>
        </section>
        
      </Fragment>
    </Router>
)

export default App;
