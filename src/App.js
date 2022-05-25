import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/loginForm'

import ProtectedRoute from './components/protectedRoute'

import Home from './components/home'

import Jobs from './components/jobs'

import JobItemDetails from './components/jobDetailsResponse'

import notFound from './components/notFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route path="/not-found" component={notFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
