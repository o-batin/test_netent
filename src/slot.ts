import * as PIXI from "pixi.js";
import { BudgetContainerComponent, ButtonComponent, ReelComponent } from "./components";
import { AsyncVictoryService } from "./services/asyncVictory.service";
import { State } from "./states";

export class Slot extends PIXI.Application {
    button: ButtonComponent;
    budgetContainer: BudgetContainerComponent;
    victoryService: AsyncVictoryService;
    winAmount: number;
    moneyAmount: number;
    betAmount: number;
    private state: State;
    private reels: ReelComponent[] = [];

    constructor(startMoneyAmount: number, betAmount: number) {
        super({
            backgroundColor: 0x000000,
            width: 960,
            height: 536
        });
        this.moneyAmount = startMoneyAmount;
        this.betAmount = betAmount;
        this.winAmount = 0;
    }

    get reelAmount() {
        return this.reels.length;
    }

    changeState(state: State) {
        this.state = state;
        this.state.init();
    }

    onClick() {
        this.state.onClick();
    }

    spinReels() {
        this.reels.forEach(slot => slot.spin());
    }

    onSpinEnd(callback: () => void) {
        let counter = 0;
        this.reels.forEach(reel => {
            reel.on(ReelComponent.OUTPUT_EVENT, () => {
                counter += 1;
                if (counter == this.reelAmount) {
                    callback();
                }
            })
        });
    }

    setCentralImages(images: string[]) {
        for (let i = 0; i < images.length; i++) {
            this.reels[i].centralTileFileName = images[i];
        }
    }

    addReel(reel: ReelComponent) {
        this.reels.push(reel);
    }

    showReels() {
        this.reels.forEach(slot => this.stage.addChild(slot));
    }
}

