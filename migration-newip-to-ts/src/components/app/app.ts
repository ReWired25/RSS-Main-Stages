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
        const elem: HTMLDivElement | null = document.querySelector('.sources');

        if (elem) {
            elem.addEventListener('click', (e) => {
                this.controller.getNews(e, (data) => this.view.drawNews(data));
            });
        }
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
