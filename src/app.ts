import * as PIXI from 'pixi.js';

export class App {
    constructor() {}

    init() {
        const app = new PIXI.Application({
            backgroundColor: 0x1099bb
        });
        document.body.appendChild(app.view);

        const loadingContainer = new PIXI.Container();
        const bg = new PIXI.Graphics();
        bg.beginFill(0x000000);
        bg.drawRect(0, 0, app.view.width, app.view.height);
        loadingContainer.addChild(bg);
        const textLoading = [
            'LOADING',
            'LOADING.',
            'LOADING..',
            'LOADING...',
        ];
        let index = 0;
        let text = new PIXI.Text(textLoading[index], {
            fontSize: 50,
            fontWeight: 'bold',
            fill: 0xFFFFFF
        });
        text.pivot.set(text.width / 2, text.height / 2);
        text.position.set(app.view.width / 2, app.view.height / 2);
        loadingContainer.addChild(text);
        app.stage.addChild(loadingContainer);

        setInterval(() => {
            index += 1;
            text.text = textLoading[index % textLoading.length];
        }, 1000)
    }


}
