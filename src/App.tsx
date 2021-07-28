import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Sidebar } from './components/Sidebar';
import { Clients } from './pages/Clients';
import { RegisterAndEditClient } from './pages/RegisterAndEditClient';
import { Requests } from './pages/Requests';
import { RegisterRequest } from './pages/RegisterRequest';
import { Costs } from './pages/Costs';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Sidebar>
            <Route path="/clients" component={Clients} />
            <Route path="/new/client" component={RegisterAndEditClient} />
            <Route path="/edit/client/:id" component={RegisterAndEditClient} />
            <Route path="/requests" component={Requests} />
            <Route path="/new/request" component={RegisterRequest} />
            <Route path="/costs" component={Costs} />
          </Sidebar>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
