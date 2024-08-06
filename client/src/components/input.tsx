import { Input } from '@mui/material';
import { FormControl, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
    state: string,
    setState: (prev: string) => void,
    placeholder?: string,
    isValid?: boolean,
    type?: "string" | "date",
}

const InputComponent: FC<Props> = ({ state, setState, placeholder="", isValid=true, type="string" }) => {

    return (
        <FormControl>
            {type === "date" && (
                <Typography>{placeholder}</Typography>
            )}
            <Input
                sx={{
                    margin: 2
                }}
                type={type}
                placeholder={placeholder}
                value={state}
                onChange={(e) => setState(e.target.value)}
                error={!isValid}
                maxRows={100}
            />
        </FormControl>
    );
};

export default InputComponent;
