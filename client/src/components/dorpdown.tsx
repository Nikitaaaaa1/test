import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material"
import { FC } from "react"

interface Props {
    state?: number | null,
    setState: (value: number) => void,
    placeholder?: string,
    data: Map<string, string>,
    showHelper: boolean,
    helperText:string
}

const Dropdown: FC<Props> = ({state, setState, placeholder, data, showHelper=false, helperText=""}) => {
    return (
        <FormControl>
            <InputLabel id="select-label">{placeholder}</InputLabel>
            <Select
                sx={{ width: '30vw' }} 
                labelId="select-label"
                label={placeholder}
                type="select"
                id="dropdown"
                value={state}
                onChange={evt => setState(Number(evt.target.value))}
            >
                {Array.from(data).map((i, idx) => (
                    <MenuItem value={i[0]} key={idx}>{i[1]}</MenuItem>
                ))}
            </Select>
            {showHelper && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}

export default Dropdown