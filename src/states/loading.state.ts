import { State } from "./base.state";
import { Slot } from "../slot";
import {
    BackgroundComponent,
    BudgetContainerComponent,
    ButtonComponent,
    LoadingContainerComponent,
    ReelComponent
} from "../components";
import { AsyncVictoryService } from "../services/asyncVictory.service";
import { GameState } from "./game.state";

export class LoadingState extends State {

    constructor(slot: Slot) {
        super(slot);
    }

    init() {
        const loading = new LoadingContainerComponent(this.slot.view.width, this.slot.view.height);
        this.slot.stage.addChild(loading);
        this.loadJSON()
            .then(images => this.loadResources(images))
            .then(_ => {
                this.slot.victoryService = new AsyncVictoryService(this.slot.loader);
                const tiles = [
                    this.slot.loader.resources['SYM1.png'].texture,
                    this.slot.loader.resources['SYM3.png'].texture,
                    this.slot.loader.resources['SYM4.png'].texture,
                    this.slot.loader.resources['SYM5.png'].texture,
                    this.slot.loader.resources['SYM6.png'].texture,
                    this.slot.loader.resources['SYM7.png'].texture
                ];
                this.slot.addReel(new ReelComponent(70, 0, tiles));
                this.slot.addReel(new ReelComponent(310, 0, tiles));
                this.slot.addReel(new ReelComponent(554, 0, tiles));
                this.slot.button = new ButtonComponent(
                    873,
                    this.slot.view.height / 2,
                    this.slot.loader.resources['BTN_Spin.png'].texture,
                    this.slot.loader.resources['BTN_Spin_d.png'].texture,
                );
                this.slot.button.on(ButtonComponent.OUTPUT_EVENT, () => this.slot.onClick());
                const bg = new BackgroundComponent(this.slot.loader.resources['BG.png'].texture);
                this.slot.budgetContainer = new BudgetContainerComponent(815, 400, 115, 60);
                this.slot.budgetContainer.setMoneyText(this.slot.moneyAmount);
                this.slot.budgetContainer.setWinText(this.slot.winAmount);
                this.slot.stage.removeChild(loading);
                this.slot.stage.addChild(bg);
                this.slot.stage.addChild(this.slot.button);
                this.slot.stage.addChild(this.slot.budgetContainer);
                this.slot.showReels();
                this.slot.changeState(new GameState(this.slot));
            });
    }

    async loadJSON() {
        const response = await fetch(`assets/images.json`);
        const images: string[] = await response.json();
        return images;
    }

    loadResources(images: string[]) {
        this.slot.loader.baseUrl = 'assets/';
        this.slot.loader.add(images);
        return new Promise(resolve => {
            this.slot.loader.load((loader) => resolve(loader));
        })
    }

}
