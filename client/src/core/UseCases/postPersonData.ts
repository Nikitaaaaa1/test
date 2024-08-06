import axios from 'axios'
import moment from 'moment';
export default async function postPersonData(
    name: string
    , surname?: string
    , continentId?: number
    , dateOfBirthd?: string
): Promise<boolean> {
    const body = {
        Name:name
        , Surname:surname
        , ContinentId: continentId
        , DateOfBirthd: moment(dateOfBirthd, "YYYY-MM-DD").format("YYYY-MM-DD 12:mm:ss")
    }
    return axios.post("http://localhost:3000/api/form", body)
    .then(res => {
        if (res.status > 299) throw Error(res.statusText)
        return res.data
    })
} 