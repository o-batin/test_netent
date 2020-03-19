import * as PIXI from 'pixi.js';

export class ButtonComponent extends PIXI.Sprite {
    static readonly OUTPUT_EVENT = 'clickPlay';
    isActive: boolean;
    private readonly activeTexture: PIXI.Texture;
    private readonly disableTexture: PIXI.Texture;

    constructor(
        x: number,
        y: number,
        activeTexture: PIXI.Texture,
        disableTexture: PIXI.Texture,
    ) {
        super();
        this.activeTexture = activeTexture;
        this.disableTexture = disableTexture;
        this.buttonMode = true;
        this.interactive = true;
        this.x = x;
        this.y = y;
        this.anchor.set(0.5, 0.5);
        this.texture = this.activeTexture;
        this.isActive = true;
        this.on('click', () => {
            this.onClick();
        });
    }

    onClick(): void {
        if (!this.isActive) return;
        this.buttonActiveToggle();
        this.emit(ButtonComponent.OUTPUT_EVENT);
    }

    buttonActiveToggle(): void {
        this.isActive = !this.isActive;
        this.texture = this.isActive ? this.activeTexture : this.disableTexture;
    }
}
