import AppController from '../controller/controller'; // Получает функционал контроллера
import { AppView } from '../view/appView'; // Получает функционал от вьюшки

// Запускает вместе всё это дело

class App {
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document
            .querySelector('.sources') // получает сорс из мейна
            .addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data)); // отрисовка стартового приложения
    }
}

export default App;
