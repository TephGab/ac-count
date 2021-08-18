import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Counter from './pages/Counter';

function App() {
  return (
    <Router>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/counter" exact component={Counter} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </Router>
  );
}

export default App;