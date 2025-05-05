declare class FileManager {
    /**
     * write data into a json file async
     * @param fileName file name with .json
     * @param content Object with json type
     */
    static write(fileName: string, content: any): Promise<void>;

    /**
     * read data in a file async
     * @param fileName file name with .json, the name should be UUID.json
     * @param content Object with json type
     */
    static read(fileName: string): Promise<string>;
}