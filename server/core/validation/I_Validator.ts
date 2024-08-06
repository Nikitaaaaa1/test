export default interface I_Validator {
    validateUser(name: string, surname: string, continentId: number, dateOfBirthd: string): Promise<boolean>
}