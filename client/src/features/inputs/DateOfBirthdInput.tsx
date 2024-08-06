import React, { FC, SetStateAction } from 'react'
import InputComponent from '../../components/Input'
import T_NewPerson from '../../core/types/T_NewPerson'

interface Props {
    dateOfBirthd: string | undefined
    setData: React.Dispatch<SetStateAction<T_NewPerson>>
}
const DateOfBirthdInput: FC<Props> = ({dateOfBirthd, setData}) => {
    const handleChangeDateOfBirth = (evt: string) => {
        setData(prev => ({
            ...prev,
            DateOfBirthd: evt,
        }));
    };
    return (
        <InputComponent
            setState={handleChangeDateOfBirth}
            state={dateOfBirthd || ""}
            placeholder='Wybierz datę urodzenia'
            type="date"
        />
    )
}

export default DateOfBirthdInput