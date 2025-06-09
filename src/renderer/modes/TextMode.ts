

export abstract class TextMode {

    protected value:string;

    constructor() {
        this.value = "";
    }

    getValue():string{
        return this.value;
    }

    abstract actionPerform(start:number, end:number):void;
}