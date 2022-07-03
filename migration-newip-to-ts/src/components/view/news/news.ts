import './news.css';
import { ArticleInfo } from '../../../types/interfaces';
import { NewsCount } from '../../../types/enums';

class News {
    draw(data: ArticleInfo[]) {
        const news = data.length >= NewsCount.count ? data.filter((_item, idx) => idx < NewsCount.count) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        if (newsItemTemp) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLDivElement | null;

                if (newsClone) {
                    if (idx % 2) {
                        const newsItem = newsClone.querySelector('.news__item');
                        if (newsItem) newsItem.classList.add('alt');
                    }

                    const newsMetaPhoto: HTMLDivElement | null = newsClone.querySelector('.news__meta-photo');
                    if (newsMetaPhoto) {
                        newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                    }

                    const newsMetaAuthor: HTMLLIElement | null = newsClone.querySelector('.news__meta-author');
                    if (newsMetaAuthor) newsMetaAuthor.textContent = item.author || item.source.name;

                    const newsMetaDate: HTMLLIElement | null = newsClone.querySelector('.news__meta-date');
                    if (newsMetaDate) {
                        newsMetaDate.textContent = item.publishedAt
                            .slice(0, NewsCount.count)
                            .split('-')
                            .reverse()
                            .join('-');
                    }

                    const newsDescriptionTitle: HTMLHeadingElement | null = newsClone.querySelector(
                        '.news__description-title'
                    );
                    if (newsDescriptionTitle) newsDescriptionTitle.textContent = item.title;

                    const newsDescriptionSource: HTMLHeadingElement | null = newsClone.querySelector(
                        '.news__description-source'
                    );
                    if (newsDescriptionSource) newsDescriptionSource.textContent = item.source.name;

                    const newsDescriptionContent: HTMLParagraphElement | null = newsClone.querySelector(
                        '.news__description-content'
                    );
                    if (newsDescriptionContent) newsDescriptionContent.textContent = item.description;

                    const newsReadMore_a: HTMLAnchorElement | null = newsClone.querySelector('.news__read-more a');
                    if (newsReadMore_a) newsReadMore_a.setAttribute('href', item.url);

                    fragment.append(newsClone);
                }
            });
        }

        const newsElement: HTMLDivElement | null = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
