import { Slot } from "../slot";

export abstract class State {
    slot: Slot;

    protected constructor(slot: Slot) {
        this.slot = slot;
    }

    abstract init(): void;

    onClick(): void {
        console.log('Not implemented');
    };
}
