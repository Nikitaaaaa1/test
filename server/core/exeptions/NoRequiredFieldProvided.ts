import Exeption from "./Exeption"
import Fields from "./types/T_Fields"
import Message from "./types/T_Message"


function returnKeyNameAndBool<T> (keyArr: T, valueArr: boolean[]): string {
    if(!keyArr) return ""
    else if (Array.isArray(keyArr)){
        return keyArr
        .map((value, key) => `${value}: ${valueArr[key] ? "true" : "false"};`)
        .join(" ")
    }
    return ""
}
function returnTruelyFIeldsName<T> (keyArr: T, valueArr: boolean[]): string {
    if(!keyArr) return ""
    else if (Array.isArray(keyArr)){
        return keyArr
            .map((value, key)=> valueArr[key] ? value : "")
            .join(", ")
    }
    return ""
}  


class NoRequiredFieldProvided <T> extends Exeption{
    
    private fieldsName: Fields<T>[]
    private isFieldCompleted: boolean[]

    constructor(
        message?: Message,
        fieldsName?: Fields<T>[],
        isFieldCompleted?: boolean[]
    ) {
        if (!message) {
            message = "no required field provided."
        }
        super(message)
        this.fieldsName = fieldsName ? fieldsName : []
        this.isFieldCompleted = isFieldCompleted ? isFieldCompleted : [false]
    }

    public throw() {
        if (Array.isArray(this.fieldsName) && Array.isArray(this.isFieldCompleted)) {
            return Error(`\n
                ${super.Call()}\n\t 
                    Wait : ${this.fieldsName};\n\t 
                    Have : ${returnTruelyFIeldsName<Fields<T>[]>(this.fieldsName, this.isFieldCompleted)};\n
                    `
            )
        }
        return Error("sdfsdf")
    }
}

export default NoRequiredFieldProvided