import { loader, ElementsFabric } from '../application/model/model';
import { Iproduct } from '../application/types/interfaces';
import {
  mockFlagForLoader,
  mockForLoader,
  stabForSpecCreater,
} from './stabs-mocks/stabs-mocks';

describe('loader response/reject', () => {
  it('stab should return arrays of produts objects', () => {
    return loader(mockForLoader).then(() => {
      mockForLoader(<Iproduct[]>[]);
      expect(mockFlagForLoader).toBeTruthy();
    });
  });

  it('get an arr of products and launch callback with it without errors', () => {
    return loader(mockForLoader).then((data) => {
      expect(data).toBeUndefined();
    });
  });

  it('should be finished with an error', async () => {
    return loader(mockForLoader).catch((error) => {
      expect(error).toMatch('error');
    });
  });
});

describe('ElementFabric.createValueSpecs', () => {
  it('should return a specification item with a value for product descriptions', () => {
    const specParagraph = stabForSpecCreater();

    expect(ElementsFabric.createValueSpecs('value', 'spec')).toEqual(
      specParagraph
    );
  });
});
