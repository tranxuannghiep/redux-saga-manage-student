import { Route, Switch, useRouteMatch, } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";



export default function AuthComponent() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route path={`${match.path}/login`}>
                <LoginPage />
            </Route>
            <Route path={`${match.path}/register`}>
                <RegisterPage />
            </Route>
        </Switch>
    );
}
