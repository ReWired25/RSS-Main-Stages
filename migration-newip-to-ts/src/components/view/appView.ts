import News from './news/news';
import Sources from './sources/sources';
import { newsClass, sourceClass, IDataSource, IDataNews } from '../../types/interfaces';

export class AppView {
    private news: newsClass;
    private sources: sourceClass;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IDataNews) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IDataSource) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
