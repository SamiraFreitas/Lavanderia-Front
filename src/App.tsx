import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Sidebar } from './components/Sidebar';
import { Login } from './pages/Login';
import { ReadAndExcludeClient } from './pages/ReadAndExcludeClient';
import { RegisterAndEditClient } from './pages/RegisterAndEditClient';
import { ReadAndExcludeRequest } from './pages/ReadAndExcludeRequest';
import { RegisterAndEditRequest } from './pages/RegisterAndEditRequest';
import { Costs } from './pages/Costs';

function App() {
  return (
    <BrowserRouter>
        <Switch>
            {localStorage.getItem('token') ? (
              <Sidebar>
                <Route path="/clients" component={ReadAndExcludeClient}/>
                <Route path="/new/client" component={RegisterAndEditClient}/>
                <Route path="/edit/client/:id" component={RegisterAndEditClient}/>
                <Route path="/requests" component={ReadAndExcludeRequest}/>
                <Route path="/new/request" component={RegisterAndEditRequest}/>
                <Route path="/edit/request/:id" component={RegisterAndEditRequest}/>
                <Route path="/costs" component={Costs}/>
              </Sidebar>
            ): <Route path="/" exact component={Login}/>}
        </Switch>
    </BrowserRouter>
  );
}

export default App;
