import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { UseControllerProps, useController } from 'react-hook-form';
import { ISelectOpt } from '../../models/todo/task';

interface Props extends UseControllerProps {
    label: string;
    items: ISelectOpt[];
}

export default function AppSelectList(props: Props) {
    const {fieldState, field} = useController({...props, defaultValue: ''})
    return (
        <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                value={field.value}
                label={props.label}
                onChange={field.onChange}
            >
                {props.items.map((item, index) => (
                    <MenuItem value={item.value} key={index}>{item.text}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
    )
}