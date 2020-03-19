import * as PIXI from 'pixi.js';

export class BackgroundComponent extends PIXI.Sprite {

    constructor(texture: PIXI.Texture) {
        super();
        this.texture = texture;
    }

}
