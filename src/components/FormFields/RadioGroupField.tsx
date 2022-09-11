import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormHelperText from '@mui/material/FormHelperText';
import { Control, useController } from "react-hook-form";
export interface RadioGroupOption {
    value: number | string;
    label?: string;
}

export interface RadioGroupFieldProps {
    name: string;
    control: Control<any>;
    label?: string;
    disabled?: boolean;
    options: RadioGroupOption[]
}

export function RadioGroupField({ name, control, label, disabled, options }: RadioGroupFieldProps) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({
        name, control
    })
    return (
        <FormControl disabled={disabled} margin='normal' error={invalid}>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}

            >
                {options.map(option => (<FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />))}

            </RadioGroup>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
