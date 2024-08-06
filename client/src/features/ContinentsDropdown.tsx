
import { FC, SetStateAction } from "react"
import Dropdown from "../components/Dropdown"
import T_Continent from "../core/types/T_Country"
import T_NewPerson from "../core/types/T_NewPerson"

interface Props {
    continents: T_Continent[]
    continentId: number | undefined
    showUnderSelectCommunicat: boolean
    setData: React.Dispatch<SetStateAction<T_NewPerson>>
}
const ContinentDropDown: FC<Props> = ({continents, continentId, showUnderSelectCommunicat, setData}) => {
    const handleChangeContinentId = (evt: number) => {
        setData(prev => ({
            ...prev,
            ContinentId: Number(evt)
        }));
    };
    return (
        <Dropdown
            setState={handleChangeContinentId}
            state={continentId || 0}
            data={new Map(continents.map(i => [i.ContinentId, i.Name]))}
            label='Kontynent'
            showHelper={showUnderSelectCommunicat}
            helperText='Nie spełnione kryteria'
        />
    )
}

export default ContinentDropDown