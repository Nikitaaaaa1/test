import { FormHelperText, Input, TextField } from '@mui/material';
import { FormControl, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
    state: string,
    setState: (prev: string) => void,
    placeholder?: string,
    label?: string,
    isValid?: boolean,
    type?: "string" | "date",
    helperText?: string
}

const InputComponent: FC<Props> = ({ state, setState, placeholder="", isValid=true, type="string", label="", helperText }) => {

    return (
        <FormControl>
            {type === "date" && (
                <Typography>{placeholder}</Typography>
            )}
            <TextField
                sx={{
                    margin: 2
                }}
                label={label}
                type={type}
                placeholder={placeholder}
                value={state}
                onChange={(e) => setState(e.target.value)}
                error={!isValid}
                maxRows={100}
            />
            {!isValid && helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default InputComponent;
