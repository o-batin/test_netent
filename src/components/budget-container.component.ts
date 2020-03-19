import * as PIXI from 'pixi.js';

export class BudgetContainerComponent extends PIXI.Container {

    private fontSize = 14;
    private textPadding = 10;
    private moneyText: PIXI.Text;
    private winText: PIXI.Text;

    constructor(x: number, y: number, width: number, height: number) {
        super();
        this.x = x;
        this.y = y;
        const bg = new PIXI.Graphics();
        bg.beginFill(0x01796f);
        bg.drawRect(0, 0, width, height);
        this.addChild(bg);
        this.moneyText = new PIXI.Text('', {
            fontSize: this.fontSize,
            fill: 0xffff06,
            fontFamily: "Verdana, Geneva, sans-serif",
        });
        this.moneyText.pivot.set(-this.textPadding, -this.textPadding);
        this.winText = new PIXI.Text('', {
            fontSize: this.fontSize,
            fill: 0xffff06,
            fontFamily: "Verdana, Geneva, sans-serif",
        });
        this.winText.pivot.set(-this.textPadding, -height + this.fontSize + this.textPadding);
        this.addChild(this.winText);
        this.addChild(this.moneyText);
    }

    setMoneyText(amount: number) {
        this.moneyText.text = `MONEY: $${amount}`;
    }

    setWinText(amount: number) {
        this.winText.text = `WIN: ${amount}`;
    }
}
