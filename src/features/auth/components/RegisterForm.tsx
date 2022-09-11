import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress } from "@mui/material";
import authApi from "api/authApi";
import { useAppSelector } from "app/hooks";
import { InputField, RadioGroupField, SelectField } from "components/FormFields";
import { Region, State } from "models";
import { useCallback, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import * as yup from "yup";
import { RegisterPayload, selectLoadingRegister } from "../authSlice";

export interface RegisterFormProps {
    initialValues?: RegisterPayload;
    onSubmit: (user: RegisterPayload) => void;
}

export function RegisterForm({ initialValues, onSubmit }: RegisterFormProps) {
    const loading = useAppSelector(selectLoadingRegister)
    const [stateList, setStateList] = useState<State[]>([])
    const [regionList, setRegionList] = useState<Region[]>([])

    const schema = yup.object().shape({
        email: yup.string().email("Please enter email").required("Email is required"),
        password: yup
            .string()
            .min(4, "Min password is 4 characters")
            .required("Password is required"),
        repeatPassword: yup
            .string()
            .required("RepeatPassword is required")
            .oneOf([yup.ref("password")], "RepeatPassword not matched"),
        name: yup
            .string()
            .required("Name is required")
            .test("two words", "Name too short", (value = "") => {
                return value.trim().split(" ").length >= 2;
            }),
        gender: yup.string().required("Gender is required"),
        region: yup.string().required("Region is required"),
        state: yup.string().required("State is required"),
    })

    const { control, handleSubmit, watch } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    })

    const handleFormSubmit = async (formValues: RegisterPayload) => {
        try {
            await onSubmit(formValues)
            toast.success("Register user successfully!")
        } catch (error) {
            toast.error("Failed to register")
        }
    }
    const checkRegionChange = watch("region")

    const fetchStateList = useCallback(async (pid: string) => {
        try {
            const data = await authApi.getStateList(pid)
            setStateList(data.data)
        } catch (error) {
            toast.error('Failed to fetch state')
        }
    }, [])

    const fetchRegionList = useCallback(async () => {
        try {
            const data = await authApi.getRegionList()
            setRegionList(data.data)
        } catch (error) {
            toast.error('Failed to fetch region')
        }
    }, [])

    useEffect(() => {
        fetchRegionList()
    }, [fetchRegionList])

    useEffect(() => {
        if (checkRegionChange) {
            fetchStateList(checkRegionChange as string)
        }
    }, [checkRegionChange, fetchStateList])

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="email" control={control} label="Email" />
                <InputField name="name" control={control} label="Name" />
                <InputField name="password" control={control} label="Password" type="password" />
                <InputField name="repeatPassword" control={control} label="Repeat password" type="password" />
                <RadioGroupField name="gender" control={control} label="Gender" options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                ]} />
                <SelectField name="region" label="Region" control={control} options={regionList.map(region => (
                    { value: region.id, label: region.name }
                ))} />
                <SelectField name="state" label="State" control={control} options={stateList.map(state => (
                    { value: state.id, label: state.name }
                ))} />
                <Box mt={2}>
                    <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading}>
                        {loading && <CircularProgress size={16} color="primary" />} Register
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
