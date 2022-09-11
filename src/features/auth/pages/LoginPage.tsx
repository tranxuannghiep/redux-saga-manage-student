import { Paper, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useAppDispatch } from "app/hooks";
import { Redirect } from "react-router-dom";
import { authActions, LoginPayload } from "../authSlice";
import { LoginForm } from "../components/LoginForm";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexFlow: "row no-wrap",
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    },

    box: {
        padding: theme.spacing(3)
    }

}))

export default function LoginPage() {
    const classes = useStyles()
    const dispatch = useAppDispatch()

    const initialValues: LoginPayload = {
        email: '',
        password: ''
    }

    const handleLoginFormSubmit = async (auth: LoginPayload) => {
        dispatch(authActions.login(auth))

    }

    const isLogin = Boolean(localStorage.getItem('access_token'))
    if (isLogin) return <Redirect to='/admin/dashboard' />;
    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant="h5" component='h1' align="center">Login</Typography>
                <Box mt={4}>
                    <LoginForm initialValues={initialValues} onSubmit={handleLoginFormSubmit} />

                </Box>
            </Paper>
        </div>
    );
}
