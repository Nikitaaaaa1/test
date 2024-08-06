import I_Person, { PersonId } from "../../interfaces/repositories/database/person";
import Person from "../../core/entity/person/person";
import PersonSchema from "./schema/Person";
import ContinentSchema from './schema/Continent'
import moment from "moment";
import I_Continent from "../../interfaces/repositories/database/continent";
import Continent from "../../core/entity/continent/continent";

export default  class database implements I_Person, I_Continent {
    async deletePerson (personId: PersonId): Promise<boolean> {
        return PersonSchema.destroy({
            where: {
                PersonId: personId
            }
        })
        .then(() => true )
    }
    async deleteAllPersons (): Promise<null> {
        return PersonSchema.truncate().then(() => null)
    }
    async addPerson (
        name: string, 
        surname: string, 
        ContinentId: number, 
        dateOfBirthd: moment.Moment
    ): Promise<PersonSchema | null>  {
        return PersonSchema.create(
            {
                Surname: surname,
                Name: name,
                DateOfBirthd: dateOfBirthd.toISOString(),
                ContinentId: ContinentId
            }
        )
    }
    async getPerson(personId: number): Promise<PersonSchema | null> {
        return PersonSchema
        .findByPk(personId)
    }
    async getPersons(): Promise<PersonSchema[]> {
        return PersonSchema
        .findAll({
            include: [
                {
                    model: ContinentSchema,
                    as: 'continent',
                    required: true
                }
            ]
        })
        
    }
    async putPerson (
        name: string, 
        surname: string, 
        continentId: number, 
        personId: PersonId
    ): Promise<boolean> {
        return PersonSchema.update(
            {
                Name: name,
                Surname: surname,
                ContinentId: continentId
            },
            {
                where: {
                    PersonId: personId
                }
            }
        )
        .then( count => {
            return !!count
        })
    }
    async getContinents(): Promise<ContinentSchema[]> {
        return ContinentSchema
        .findAll()
    }
}