import { getRandomInt } from "../utils/utils";
import { TileModel } from "../model/tile.model";

export class AsyncVictoryService {
    private readonly tiles: TileModel[];
    private readonly wildTile: TileModel;
    private DEFAULT_FILENAME = 'SYM';
    private WILD_FILENAME = 'SYM1';

    constructor({resources}: PIXI.Loader) {
        this.tiles = [];
        for (const fileName in resources) {
            if (resources.hasOwnProperty(fileName)) {
                if (fileName.match(this.WILD_FILENAME)) {
                    const tile = new TileModel(true, fileName);
                    this.tiles.push(tile);
                    this.wildTile = tile;
                } else if (fileName.match(this.DEFAULT_FILENAME)) {
                    const tile = new TileModel(false, fileName);
                    this.tiles.push(tile)
                }
            }
        }
    }

    private static pickRandomTile(tiles: TileModel[]): TileModel {
        const index = getRandomInt(0, tiles.length);
        return tiles[index];
    }

    private static isWon() {
        return getRandomInt(0, 5) == 0;
    }

    async getSlotResult(reelAmount: number) {
        let images: string[];
        let isWon = AsyncVictoryService.isWon();
        if (isWon) {
            images = this.getVictoriousSequence(reelAmount);
        } else {
            images = this.getLosingSequence(reelAmount);
        }
        return new Promise(resolve => setTimeout(() => { resolve({isWon, images}) }, 3000));
    }

    private getVictoriousSequence(sequenceLength: number): string[] {
        const resultSequence: string[] = [];
        const victoryTile = AsyncVictoryService.pickRandomTile(this.tiles.filter(tile => !tile.isWild));
        const victoryTilePosition = getRandomInt(0, sequenceLength);
        for (let i = 0; i < sequenceLength; i++) {
            if (victoryTilePosition == i) {
                resultSequence.push(victoryTile.fileName);
            } else {
                const wildOrVictoryTile = AsyncVictoryService.pickRandomTile([this.wildTile, victoryTile]);
                resultSequence.push(wildOrVictoryTile.fileName);
            }
        }
        return resultSequence;
    }

    private getLosingSequence(sequenceLength: number): string[] {
        const firstTile = AsyncVictoryService.pickRandomTile(this.tiles);
        const resultSequence = [firstTile.fileName];
        let availableTiles = this.tiles.filter(tile => !TileModel.equals(tile, firstTile));
        for (let i = 1; i < sequenceLength; i++) {
            if (firstTile.isWild) {
                resultSequence.push(firstTile.fileName);
            } else {
                const randomTile = AsyncVictoryService.pickRandomTile(availableTiles);
                resultSequence.push(randomTile.fileName);
                availableTiles = availableTiles.filter(tile => !TileModel.equals(tile, randomTile));
            }
        }
        return resultSequence;
    }

}
