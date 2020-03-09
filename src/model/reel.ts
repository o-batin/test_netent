import { ReelSymbol } from "./reel-symbol";

export class Reel {

    constructor(
        public symbols: ReelSymbol[],
        public indexOfCentralSymbol = 0
    ) { }

    spinToSymbol(reelSymbol: ReelSymbol) {
        this.indexOfCentralSymbol = this.symbols.findIndex(currentSymbol => ReelSymbol.equals(currentSymbol, reelSymbol));
    }

}
