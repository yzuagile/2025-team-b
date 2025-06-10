import { TextMode } from "./TextMode";

export class OrderListMode extends TextMode {

    actionPerform(start: number, end: number): string | undefined {

        if (this.value.slice(start, end + 1).length) {

            let sel = this.value.substring(start, end + 1);
            let insert: string;

            const lines = sel.split("\n");
            insert = lines
                .map((line, i) => `${i + 1}. ${line}`)
                .join("\n");
            return this.value.slice(0, start) + insert + this.value.slice(-end);
        }
        else {
            return undefined;
        }
    }
}