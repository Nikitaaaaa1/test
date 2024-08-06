import T_NewPerson from "../types/T_NewPerson"
import moment from "moment"
import addPerson from "./postPersonData"
import Person from "../Person"
import getPersons from "./getPersons"
import {SetStateAction} from "react"


const postUser = (
    data: T_NewPerson
    , setData: React.Dispatch<SetStateAction<T_NewPerson>>
    , setPersons: React.Dispatch<SetStateAction<Person[] | null>>
    , changeTheme: ()=>void 
    , europeId: number | null
    , hideUnderInputNameCommunicat: React.Dispatch<SetStateAction<boolean>>
) => {
    if (!data.Name || !data.Name.length) {
        hideUnderInputNameCommunicat(false)
        throw Error("No field provided")
    }
    hideUnderInputNameCommunicat(true)
    if (
        (europeId === data?.ContinentId && String(data.Surname).length < 2)
        || (Number(moment.duration(moment().diff(moment(data?.DateOfBirthd)))) < 0)
    ) throw Error("No field provided")
    addPerson(
        data.Name,
        data.Surname,
        data.ContinentId,
        data.DateOfBirthd
    )
    .then(added => {
        if (!added) {
            window.alert("porazka")
            return 
        }
        changeTheme()
        
        setData(i => ({
            ...i, 
            Name: "",
            Surname: "",
            DateOfBirthd: "",
            ContinentId: 0,
        }))
        return getPersons()
            .then(p => setPersons(p.map(i => new Person(i))))
            .catch(e => console.log(e)) 
    })
}

export default postUser