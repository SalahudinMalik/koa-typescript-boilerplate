export interface IBodyFile {
    size: number;
    filepath: string;
    mimetype: string;
    mtime?: Date;
    originalFilename: string;
}
