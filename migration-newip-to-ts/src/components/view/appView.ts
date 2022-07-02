import News from './news/news';
import Sources from './sources/sources';
import { SourceInfo, ArticleInfo, IDataSource, IDataNews } from '../../types/interfaces';

export class AppView {
    private news: { draw: (data: ArticleInfo[]) => void };
    private sources: { draw: (data: SourceInfo[]) => void };

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
