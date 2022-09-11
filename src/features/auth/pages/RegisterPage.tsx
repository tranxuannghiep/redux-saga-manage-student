
import { Paper, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useAppDispatch } from "app/hooks";
import { RegisterPayload } from "../authSlice";
import { RegisterForm } from "../components/RegisterForm";
import { authActions } from 'features/auth/authSlice';
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

export default function RegisterPage() {
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const initialValues: RegisterPayload = {
        email: '',
        name: '',
        password: '',
        repeatPassword: '',
        gender: 'male',
        region: '',
        state: '',
    }
    const handleRegisterFormSubmit = async (formValues: RegisterPayload) => {
        dispatch(authActions.register(formValues))
    }

    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant="h5" component='h1' align="center">Register</Typography>
                <Box mt={4}>
                    <RegisterForm initialValues={initialValues} onSubmit={handleRegisterFormSubmit} />
                </Box>
            </Paper>
        </div>
    );
}
