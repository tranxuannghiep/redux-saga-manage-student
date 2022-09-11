import { Box, Button, CircularProgress } from "@mui/material";
import { useAppSelector } from "app/hooks";
import { InputField } from "components/FormFields";
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import { LoginPayload, selectLogging } from "../authSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export interface LoginFormProps {
    initialValues?: LoginPayload;
    onSubmit: (auth: LoginPayload) => void;
}

export function LoginForm({ initialValues, onSubmit }: LoginFormProps) {

    const schema = yup.object().shape({
        email: yup.string().email("Please enter email").required("Email is required"),
        password: yup.string().min(6, "Min length is 6 characters").required("Password is required")
    })

    const loading = useAppSelector(selectLogging)
    const { control, handleSubmit } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    })

    const handleFormSubmit = async (formValues: LoginPayload) => {
        try {
            await onSubmit(formValues)
        } catch (error) {
            toast.error("Failed to login")
        }
    }

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="email" control={control} label="Email" />
                <InputField name="password" control={control} label="Password" type="password" />
                <Box mt={2}>
                    <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading}>
                        {loading && <CircularProgress size={16} color="primary" />} login
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
