import * as PIXI from 'pixi.js';

export class LoadingContainerComponent extends PIXI.Container {

    constructor(width: number, height: number) {
        super();
        const bg = new PIXI.Graphics();
        bg.beginFill(0x000000);
        bg.drawRect(0, 0, width, height);
        this.addChild(bg);
        let text = new PIXI.Text('LOADING', {
            fontSize: 50,
            fontWeight: 'bold',
            fill: 0xFFFFFF
        });
        text.anchor.set(0.5, 0.5);
        text.position.set(width / 2, height / 2);
        this.addChild(text);
    }

}
