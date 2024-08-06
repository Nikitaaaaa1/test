import Exeption from "./Exeption"
import Fields from "./types/T_Fields"
import Message from "./types/T_Message"


abstract class NoRequiredFieldProvided extends Exeption{
    
    private have: Fields 
    private want: Fields

    constructor(
        message?: Message,
        have?: Fields,
        want?: Fields
    ) {
        if (!message) {
            message = "no required field provided."
        }
        super(message)
        this.have = have
        this.want = want
    }

    public throw() {
        throw Error(`\n
            ${super.Call()}\n\t 
                Wait: ${this.want};\n\t 
                Have: ${this.have};\n`
        )
    }
}

export default NoRequiredFieldProvided