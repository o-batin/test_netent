import { SymbolSequenceService } from "./symbol-sequence.service";
import { VictoryProbabilityService } from "./victory-probability.service";
import { Slot } from "../model/slot";
import { ReelSymbol } from "../model/reel-symbol";

export class GameService {
    constructor(
        private symbolSequenceService: SymbolSequenceService,
        private victoryProbabilityService: VictoryProbabilityService
    ) {}

    spin(slot: Slot): { slot: Slot, hasPlayerWon: boolean } {
        let centerSymbols: ReelSymbol[];
        const hasPlayerWon = this.victoryProbabilityService.isVictory();
        const reelsLength = slot.reels.length;
        if (hasPlayerWon) {
            centerSymbols = this.symbolSequenceService.getVictoriousSequence(reelsLength)
        } else {
            centerSymbols = this.symbolSequenceService.getLosingSequence(reelsLength);
        }
        for (let i = 0; i < reelsLength; i++) {
            const currentReel = slot.reels[i];
            const currentSymbol = centerSymbols[i];
            currentReel.spinToSymbol(currentSymbol);
        }
        return {
            slot,
            hasPlayerWon
        };
    }


}
