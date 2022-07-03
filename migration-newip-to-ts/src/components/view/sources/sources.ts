import './sources.css';
import { SourceInfo } from '../../../types/interfaces';

class Sources {
    draw(data: SourceInfo[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        if (sourceItemTemp) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLDivElement | null;

                if (sourceClone) {
                    const sourceItemName: HTMLSpanElement | null = sourceClone.querySelector('.source__item-name');
                    if (sourceItemName) sourceItemName.textContent = item.name;

                    const sourceItem: HTMLDivElement | null = sourceClone.querySelector('.source__item');
                    if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);

                    fragment.append(sourceClone);
                }
            });

            const sourcesElement: HTMLDivElement | null = document.querySelector('.sources');
            if (sourcesElement) sourcesElement.append(fragment);
        }
    }
}

export default Sources;
