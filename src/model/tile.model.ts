export class TileModel {
    isWild: boolean;
    fileName: string;

    constructor(isWild: boolean, fileName: string) {
        this.isWild = isWild;
        this.fileName = fileName;
    }

    static equals(t1: TileModel, t2: TileModel) {
        return t1.fileName == t2.fileName;
    }
}
