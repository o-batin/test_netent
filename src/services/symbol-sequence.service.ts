import { ReelSymbol } from "../model/reel-symbol";
import { getRandomInt } from "../utils/utils";

export class SymbolSequenceService {

    public wildSymbol: ReelSymbol;

    constructor(public symbols: ReelSymbol[]) {
        this.wildSymbol = symbols.find(symbol => symbol.isWild);
    }

    createInitialSequence(symbols: ReelSymbol[]): ReelSymbol[] {
        const resultSequence: ReelSymbol[] = [];
        const symbolsLength = symbols.length;
        for (let i = 0; i < symbolsLength; i++) {
            const randomSymbol = this.pickRandomSymbol(symbols);
            resultSequence.push(randomSymbol);
            symbols = symbols.filter(symbol => !ReelSymbol.equals(symbol, randomSymbol));
        }
        return resultSequence;
    }

    getVictoriousSequence(sequenceLength: number): ReelSymbol[] {
        const resultSequence: ReelSymbol[] = [];
        const victorySymbol = this.pickRandomSymbol(this.symbols);
        const victorySymbolIndex = getRandomInt(0, sequenceLength);
        for (let i = 0; i < sequenceLength; i++) {
            if (victorySymbolIndex == i) {
                resultSequence.push(victorySymbol);
            } else {
                const wildOrVictorySymbol = this.pickRandomSymbol([this.wildSymbol, victorySymbol]);
                resultSequence.push(wildOrVictorySymbol);
            }
        }
        return resultSequence;
    }

    getLosingSequence(sequenceLength: number): ReelSymbol[] {
        const firstSymbol = this.pickRandomSymbol(this.symbols);
        const resultSequence = [firstSymbol];
        let availableSymbols = this.symbols.filter(symbol => !ReelSymbol.equals(symbol, firstSymbol));
        for (let i = 1; i < sequenceLength; i++) {
            if (firstSymbol.isWild) {
                resultSequence.push(firstSymbol);
            } else {
                const randomSymbol = this.pickRandomSymbol(availableSymbols);
                resultSequence.push(randomSymbol);
                availableSymbols = availableSymbols.filter(symbol => !ReelSymbol.equals(symbol, randomSymbol));
            }
        }
        return resultSequence;
    }

    private pickRandomSymbol(symbols: ReelSymbol[]): ReelSymbol {
        const index = getRandomInt(0, symbols.length);
        return symbols[index];
    }
}
