import { Iproduct } from '../../application/types/interfaces';

export let mockFlagForLoader = false;
export const mockForLoader = (data: Iproduct[]): void => {
  if (Array.isArray(data)) mockFlagForLoader = true;
};

export const stabForSpecCreater = () => {
  const specParagraph = document.createElement('p');
  specParagraph.innerHTML = 'spec:';

  const spanForValue = document.createElement('span');
  spanForValue.innerHTML = 'value';

  specParagraph.append(spanForValue);
  return specParagraph;
};

export const stabProductWrapper = document.createElement('div');
