import { TextMode } from "./TextMode";

export class ItalicMode extends TextMode {

    actionPerform(start: number, end: number): string {

        const newValue =
            this.value.slice(0, start) +
            `*${this.value.slice(start, end + 1)}*` +
            this.value.slice(-end);

        return newValue;
    }
}