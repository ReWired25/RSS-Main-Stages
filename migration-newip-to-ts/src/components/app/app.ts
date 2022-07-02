import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { controllerClass, viewClass, IDataNews, IDataSource } from '../../types/interfaces';

class App {
    private controller: controllerClass;
    private view: viewClass;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLDivElement).addEventListener('click', (e) => {
            this.controller.getNews(e, (data) => this.view.drawNews(data as IDataNews));
        });
        this.controller.getSources((data) => this.view.drawSources(data as IDataSource));
    }
}

export default App;
