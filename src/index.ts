import { Slot } from "./slot";
import { LoadingState } from "./states";

const slot = new Slot(100, 5);
document.body.appendChild(slot.view);
slot.changeState(new LoadingState(slot));
