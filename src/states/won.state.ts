import { State } from "./base.state";
import { Slot } from "../slot";
import { WonContainerComponent } from "../components";
import { GameState } from "./game.state";

export class WonState extends State {

    constructor(slot: Slot) {
        super(slot);
    }

    init() {
        const wonContainer = new WonContainerComponent(70, 70, 717, 400);
        this.slot.stage.addChild(wonContainer);
        this.slot.stage.interactive = true;
        const timerID = setTimeout(() => {
            this.backToReady(wonContainer)
        }, 3000);
        this.slot.stage.on('click', () => {
            clearTimeout(timerID);
            this.backToReady(wonContainer);
        })
    }

    backToReady(wonContainer: WonContainerComponent) {
        this.slot.stage.removeChild(wonContainer);
        this.slot.stage.interactive = false;
        this.slot.changeState(new GameState(this.slot));
    }

}
