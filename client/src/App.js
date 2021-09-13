import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Counter from './pages/Counter';
import AcOld from './pages/AcOld';
import Auth from './auth/auth';

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/" exact component={Auth} />
      <Route path="/home" exact component={Dashboard} />
      <Route path="/counter" exact component={Counter} />
      <Route path="/ac-old" exact component={AcOld} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </Router>
  );
}

export default App;