import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Sidebar } from './components/Sidebar';
import { Clients } from './pages/Clients';
import { Requests } from './pages/Requests';
import { Costs } from './pages/Costs';
import { Login } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
        <Switch>
        <Route path="/login" exact component={Login} />
          <Sidebar>
            <Route path="/clients" exact component={Clients} />
            <Route path="/requests" exact component={Requests} />
            <Route path="/costs" exact component={Costs} />
          </Sidebar>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
