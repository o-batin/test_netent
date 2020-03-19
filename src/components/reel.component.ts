import * as PIXI from 'pixi.js';

export class ReelComponent extends PIXI.Container {
    static readonly OUTPUT_EVENT = 'spinFinish';
    public tiles: { fileName: string, sprite: PIXI.Sprite }[] = [];
    public centralTileFileName: string;
    private TILE_HEIGHT = 190;

    constructor(x: number, y: number, tileTextures: PIXI.Texture[]) {
        super();
        this.position.x = x;
        this.position.y = y;
        this.createReel(tileTextures);
    }

    createReel(textures: PIXI.Texture[]) {
        textures.sort(() => 0.5 - Math.random());
        for (let i = 0; i < textures.length; i++) {
            const currentSymbol = textures[i];
            const sprite = new PIXI.Sprite(currentSymbol);
            sprite.position.y = -this.TILE_HEIGHT + (i * this.TILE_HEIGHT);
            this.addChild(sprite);
            this.tiles.push({
                fileName: currentSymbol.textureCacheIds[0],
                sprite: sprite
            });
        }
    }

    spin() {
        const centralTile = this.tiles.find(tile => tile.fileName === this.centralTileFileName);
        if (centralTile && centralTile.sprite.position.y == this.TILE_HEIGHT) {
            this.centralTileFileName = null;
            this.emit(ReelComponent.OUTPUT_EVENT);
            return;
        }
        for (let i = 0; i < this.tiles.length; i++) {
            let current = this.tiles[i].sprite;
            current.position.y += 10;
            if (this.isOverflowContainer(current) && current.position.y !== 0) {
                current.position.y = -this.TILE_HEIGHT;
            }
        }
        requestAnimationFrame(() => this.spin());
    }

    private isOverflowContainer(sprite: PIXI.Sprite) {
        const y = sprite.position.y;
        const reelHeight = this.TILE_HEIGHT * (this.tiles.length - 1);
        return y % reelHeight == 0;
    }
}
