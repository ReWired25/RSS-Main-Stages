import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { controllerClass, viewClass } from '../../types/interfaces';

class App {
    private controller: controllerClass;
    private view: viewClass;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const buttonElement: HTMLDivElement | null = document.querySelector('.sources');
        if (buttonElement) {
            buttonElement.addEventListener('click', (e) => {
                this.controller.getNews(e, (data) => this.view.drawNews(data));
            });
        }
        this.controller.getSources((data) => this.view.drawSources(data));

        const inputElemet: HTMLInputElement | null = document.querySelector('.search-input');
        if (inputElemet) {
            inputElemet.addEventListener('input', () => {
                const searchStr: string = inputElemet.value;
                const regexp = new RegExp(`^${searchStr}|\\b${searchStr}`, 'gmi');

                this.controller.getFoundNews(regexp);
            });
        }
    }
}

export default App;
