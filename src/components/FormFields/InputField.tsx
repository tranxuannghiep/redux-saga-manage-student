import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";
import { TextField } from '@mui/material';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;

}

export function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name, control
    })
    return (
        <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            size="small"
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
        />
    );
}
