import { getRandomInt } from "../utils/utils";

export class VictoryProbabilityService {
    constructor(public victoryProbability: number) { }

    isVictory(): boolean {
        return getRandomInt(0, 5) == 0;
    }
}
