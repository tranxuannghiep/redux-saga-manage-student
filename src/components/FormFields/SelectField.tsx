import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Control, useController } from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export interface SelectOption {
    value: number | string;
    label?: string;
}

export interface SelectFieldProps {
    name: string;
    control: Control<any>;
    label?: string;
    disabled?: boolean;
    options: SelectOption[]
}

export function SelectField({ name, control, label, disabled, options }: SelectFieldProps) {
    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({
        name, control
    })
    return (
        <FormControl fullWidth size='small' margin='normal' error={invalid}>
            <InputLabel id={`${name}_label`}>{label}</InputLabel>
            <Select
                id={`${name}_label`}
                label={label}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                MenuProps={MenuProps}
            >
                {options.map(option => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}

            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
