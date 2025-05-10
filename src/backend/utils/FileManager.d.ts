declare class FileManager {
    /**
     * write data into a json file async
     * @template T
     * @param fileName file name with .json
     * @param content Object with json type
     */
    static write<T>(fileName: string, content: T): Promise<void>;

    /**
     * read data in a file async
     * @template T
     * @param fileName file name with .json, the name should be UUID.json
     * @param content Object with json type
     */
    static read<T>(fileName: string): Promise<T>;
}