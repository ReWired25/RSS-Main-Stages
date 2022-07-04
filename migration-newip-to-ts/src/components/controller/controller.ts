import AppLoader from './appLoader';
import { Callback } from '../../types/functions';

class AppController extends AppLoader {
    getSources<T>(callback: Callback<T>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews<T>(e: Event, callback: Callback<T>) {
        let target = e.target as HTMLDivElement | null;
        const newsContainer = e.currentTarget as HTMLDivElement | null;

        if (target && newsContainer) {
            while (target !== newsContainer) {
                if (target.classList.contains('source__item')) {
                    const sourceId: string | null = target.getAttribute('data-source-id');
                    if (sourceId) {
                        if (newsContainer.getAttribute('data-source') !== sourceId) {
                            newsContainer.setAttribute('data-source', sourceId);
                            super.getResp(
                                {
                                    endpoint: 'everything',
                                    options: {
                                        sources: sourceId,
                                    },
                                },
                                callback
                            );
                        }
                    }
                    return;
                }

                const ParentTarget = target.parentNode as HTMLDivElement | null;
                if (ParentTarget) {
                    target = ParentTarget;
                }
            }
        }
    }

    getFoundNews(regexp: RegExp) {
        const newsSources: NodeListOf<HTMLDivElement> = document.querySelectorAll('.source__item');

        newsSources.forEach((item) => {
            const sourceTitle: string | undefined = item.querySelector('.source__item-name')?.innerHTML;

            if (sourceTitle) {
                if (!sourceTitle.match(regexp)) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'block';
                }
            }
        });
    }
}

export default AppController;
