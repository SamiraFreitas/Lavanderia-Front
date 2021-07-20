import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Sidebar } from './components/Sidebar';
import { Clients } from './pages/Clients';
import { NewClient } from './pages/NewClient';
import { EditClient } from './pages/EditClient';
import { Requests } from './pages/Requests';
import { NewRequest } from './pages/NewRequest';
import { Costs } from './pages/Costs';
import {Status} from './pages/Status';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Sidebar>
            <Route path="/clients" component={Clients} />
            <Route path="/new/client" component={NewClient} />
            <Route path="/edit/client/:id" component={EditClient} />
            <Route path="/requests" component={Requests} />
            <Route path="/new/request" component={NewRequest} />
            <Route path="/costs" component={Costs} />
            <Route path="/status" exact component={Status} />
          </Sidebar>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
