import { TextMode } from "./TextMode";

export class ItalicMode extends TextMode {

    actionPerform(start: number, end: number): string|undefined {

        if(this.value.slice(start, end + 1).length){
            const newValue =
                this.value.slice(0, start) +
                `*${this.value.slice(start, end + 1)}*` +
                this.value.slice(end);

            return newValue;
        }
        else{
            return undefined;
        }
        
    }
}