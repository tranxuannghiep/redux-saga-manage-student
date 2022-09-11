import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import AuthComponent from 'features/auth';
import { Route, Switch } from 'react-router-dom';

function App() {

  return (
    <>
      <Switch>
        <Route path="/auth" >
          <AuthComponent />
        </Route>
        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>
        <Route path="*" >
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
