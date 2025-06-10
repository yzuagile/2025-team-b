import { TextMode } from "./TextMode";

export class OrderListMode extends TextMode{

    actionPerform(start: number, end: number): void {
        
        let sel = this.value.substring(start, end+1);
        let insert:string;

        if (sel.length > 0) {
            const lines = sel.split("\n");
      insert = lines
        .map((line, i) => `${i + 1}. ${line}`)
        .join("\n");
        }

        this.value =  this.value.slice(0,start) + insert + this.value.slice(-end);
    }
}