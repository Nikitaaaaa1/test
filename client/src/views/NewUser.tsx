import { FC, SetStateAction } from 'react'
import {FormControl, Box, Typography } from '@mui/material'
import InputComponent from '../components/Input'
import T_NewPerson from '../core/types/T_NewPerson'
import T_Continent from '../core/types/T_Country'
import PostUserButton from '../features/buttons/PostUserButton'
import ContinentDropDown from '../features/ContinentsDropdown'
import DateOfBirthdInput from '../features/inputs/DateOfBirthdInput'

interface Props {
    data: T_NewPerson | null
    setData: React.Dispatch<SetStateAction<T_NewPerson>>
    continents: T_Continent[] | null,
    enableToSave: boolean
    postUser: ()=>void
    isValidName: boolean
    showUnderSelectCommunicat: boolean
    hideUnderInputNameCommunicat: boolean
}

const NewUser: FC<Props> = (
    {data, setData, continents, enableToSave, postUser, isValidName, showUnderSelectCommunicat, hideUnderInputNameCommunicat}
) => {
    const handleChangeName = (evt: string) => {
        if(evt.length > 100) return
        setData(prev => ({
            ...prev,
            Name: evt,
        }));
    };
    const handleChangeSurname = (evt: string) => {
        if(evt.length > 100) return
        setData(prev => ({
            ...prev,
            Surname:  evt,
        }));
    };
    return (
        <>
        <Box>
            <Typography variant="h6" align="left" m={2} >
                Utwórz nowego użytkownika
            </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" className="flex">
            <FormControl fullWidth>
                <InputComponent
                    setState={handleChangeName}
                    state={data?.Name || ""}
                    label="Imię"
                    placeholder='Wpisz imię...'
                    helperText='Te pole jest wymagane'
                    isValid={isValidName}
                    showHelperText={hideUnderInputNameCommunicat}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputComponent
                    setState={handleChangeSurname}
                    state={data?.Surname || ""}
                    label="Nazwisko"
                    placeholder='Wpisz nazwisko...'
                />
            </FormControl>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" className="flex" m={2}> 
            <DateOfBirthdInput
                dateOfBirthd={data?.DateOfBirthd || ""}
                setData={setData}
            />
            {continents && (
                <ContinentDropDown
                continents={continents}
                continentId={data?.ContinentId} 
                showUnderSelectCommunicat={showUnderSelectCommunicat}
                setData={setData}
                />
            )}
            <PostUserButton
                enableToSave={enableToSave}
                postUser={postUser}
            />
        </Box>
        </>
    )
}

export default NewUser