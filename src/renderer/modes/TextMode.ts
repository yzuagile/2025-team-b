

export abstract class TextMode {

    protected value:string;

    constructor() {
        this.value = "";
    }

    getValue():string{
        return this.value;
    }

    setValue(text:string){
        this.value = text;
    }
    
    abstract actionPerform(start:number, end:number):string|undefined;
}