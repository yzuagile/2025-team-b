import { marked } from "marked"

export async function parseMD(context: string): Promise<string> {
    try {
        const html = await marked.parse(context)
        
        return html;
    }
    catch (error) {
        throw error;
    }
}