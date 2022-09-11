import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { useAppSelector } from "app/hooks";
import { InputField, RadioGroupField, SelectField } from "components/FormFields";
import { selectCityOptions } from "features/city/citySlice";
import { Student } from "models";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export interface StudentFormProps {
    initialValues?: Student;
    onSubmit: (formValues: Student) => void;
}


const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    age: yup
        .number()
        .positive("Please enter a positive number")
        .integer("Please enter an integer")
        .required("Age is required")
        .typeError("Please enter a valid number"),
    mark: yup
        .number()
        .positive("Please enter a positive number")
        .max(10, "Max is 10")
        .required("Mark is required")
        .typeError("Please enter a valid number"),
    gender: yup
        .string()
        .oneOf(['male', 'female'], 'Please select either male or female')
        .required("Gender is required"),
    city: yup.string(),
})

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {

    const cityOptions = useAppSelector(selectCityOptions)
    const [messageError, setMessageError] = useState('')

    const {
        control, handleSubmit, formState: { isSubmitting }
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    })

    const handleFormSubmit = async (formValues: Student) => {
        try {
            setMessageError('')
            await onSubmit(formValues)
        } catch (error) {
            setMessageError('this is a message')
        }
    }

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="name" control={control} label="Full Name" />
                <RadioGroupField name="gender" control={control} label="Gender" options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' },
                ]} />
                <InputField name="age" control={control} label="Age" type="number" />
                <InputField name="mark" control={control} label="Mark" type="number" />
                <SelectField name="city" control={control} label="City" options={cityOptions} />
                {messageError &&
                    <Alert severity="error">{messageError}</Alert>
                }

                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                        {isSubmitting && <CircularProgress size={16} color="primary" />} Save
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
