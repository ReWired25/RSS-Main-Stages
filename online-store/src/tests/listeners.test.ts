import './controller.test';
import {
  FilterRange,
  SearchMethod,
} from '../application/model/listeners-methods';

describe('FilterRange.rangeFiltering', () => {
  it('should filtering products by range and return array of product objects', () => {
    expect(FilterRange.rangeFiltering([])).toEqual([]);
  });
});

describe('SearchMethod.searchFiltering', () => {
  it('should searching products by input value and return array of product objects', () => {
    expect(SearchMethod.searchFiltering([])).toEqual([]);
  });
});
