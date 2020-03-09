export class ReelSymbol {
    constructor(
        public texturePath: string,
        public isWild: boolean
    ) { }

    static equals(o1: ReelSymbol, o2: ReelSymbol) {
        return o1.texturePath == o2.texturePath;
    }
}
