import {Switch, Route} from 'react-router-dom'

import Login from './components/loginForm'

import ProtectedRoute from './components/protectedRoute'

import Home from './components/home'

import Jobs from './components/jobs'

import JobItemDetails from './components/jobItemDetails'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
  </Switch>
)

export default App
