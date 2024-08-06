

export default class Exeption {
    public message: string = ""
    constructor(message: string) {
        this.message = message
    }
    public Call(): string {return this.message}
}