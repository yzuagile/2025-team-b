import { TextMode } from "./TextMode";

export class UnorderListMode extends TextMode {

    actionPerform(start: number, end: number): string | undefined {

        if (this.value.slice(start, end + 1).length) {
            let sel = this.value.substring(start, end + 1);
            let insert: string;

            if (sel.length > 0) {
                const lines = sel.split("\n");
                insert = lines.map(line => `- ${line}`).join("\n");
            }

            return this.value.slice(0, start) + insert + this.value.slice(end);
        }
        else{
            return undefined;
        }

    }
}