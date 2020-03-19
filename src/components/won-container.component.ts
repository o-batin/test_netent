import * as PIXI from 'pixi.js';

export class WonContainerComponent extends PIXI.Container {

    constructor(x: number, y: number, width: number, height: number) {
        super();
        const bg = new PIXI.Graphics();
        bg.beginFill(0x508679);
        bg.drawRect(0, 0, width, height);
        bg.alpha = 0.7;
        this.setTransform(x, y);
        this.addChild(bg);
        let text = new PIXI.Text('YOU WON!', {
            fontSize: 80,
            dropShadow: true,
            fill: 0xffff06,
            fontFamily: "Verdana, Geneva, sans-serif",
            strokeThickness: 1
        });
        text.anchor.set(0.5, 0.5);
        text.position.set(width / 2, height / 2);
        this.addChild(text);
    }

}
