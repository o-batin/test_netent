import { State } from "./base.state";
import { Slot } from "../slot";
import { WonState } from "./won.state";


export class GameState extends State {

    constructor(slot: Slot) {
        super(slot);
    }

    init() {
        if (!this.slot.button.isActive) {
            this.slot.button.buttonActiveToggle();
        }
    }

    onClick() {
        if (this.slot.moneyAmount <= 0) {
            window.alert('No enough money');
            return;
        }
        this.slot.spinReels();
        this.slot.moneyAmount -= this.slot.betAmount;
        this.slot.budgetContainer.setMoneyText(this.slot.moneyAmount);
        const reelAmount = this.slot.reelAmount;
        this.slot.victoryService.getSlotResult(reelAmount).then(({isWon, images}) => {
            this.slot.onSpinEnd(() => {
                if (isWon) {
                    this.slot.moneyAmount += this.slot.betAmount * 2;
                    this.slot.winAmount += 1;
                    this.slot.budgetContainer.setMoneyText(this.slot.moneyAmount);
                    this.slot.budgetContainer.setWinText(this.slot.winAmount);
                    this.slot.changeState(new WonState(this.slot));
                } else {
                    this.slot.changeState(new GameState(this.slot));
                }
            });
            this.slot.setCentralImages(images);
        });
    }
}
