import { TextMode } from "./TextMode";

export class UnorderListMode extends TextMode{

    actionPerform(start: number, end: number): void {
        
        let sel = this.value.substring(start, end+1);
        let insert:string;

        if (sel.length > 0) {
            const lines = sel.split("\n");
            insert = lines.map(line => `- ${line}`).join("\n");
        }

        this.value =  this.value.slice(0,start) + insert + this.value.slice(-end);
    }
}