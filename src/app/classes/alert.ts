import { AlertType } from '../enums/alert-type.enum';


export class Alert {
    text: String;
    type : AlertType;

    constructor(text:String,type= AlertType.Success){
        this.type = type;
        this.text = text;
    }

}
