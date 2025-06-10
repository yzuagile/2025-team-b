import { TextMode } from "./TextMode";

export class BoldMode extends TextMode {

    actionPerform(start: number, end: number): string|undefined {

        console.log(this.value.slice(start, end + 1));
        if(this.value.slice(start, end + 1).length){
            const newValue =
                this.value.slice(0, start) +
                `**${this.value.slice(start, end + 1)}**` +
                this.value.slice(end);
        
            console.log(newValue);
            return newValue;
        }
        else{
            return undefined;
        }
        
    }
}