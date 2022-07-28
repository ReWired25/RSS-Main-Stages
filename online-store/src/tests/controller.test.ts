import {
  valueInputCreater,
  filtersCreater,
  cartCreater,
  sliderCreater,
  sortCreater,
  searchCreater,
  resetCreater,
  controlPanelCreater,
} from '../application/controller/controller';

describe('valueInputCreater', () => {
  it('should return product specification with checkboxs with values', () => {
    expect(valueInputCreater('specName', 'spec', 1, ['value'])).toBeInstanceOf(
      HTMLDivElement
    );
  });
});

describe('filtersCreater', () => {
  it('should return wrapper element includes all specification checkbox', () => {
    expect(filtersCreater()).toBeInstanceOf(HTMLDivElement);
  });
});

describe('cartCreater', () => {
  it('should return cart element', () => {
    expect(cartCreater()).toBeInstanceOf(HTMLDivElement);
  });
});

describe('sliderCreater', () => {
  it('should return element with name of type of slider and directly slider', () => {
    expect(sliderCreater(20, 50)).toBeInstanceOf(HTMLDivElement);
  });
});

describe('sortCreater', () => {
  it('should return element with sorting functionality', () => {
    expect(sortCreater()).toBeInstanceOf(HTMLDivElement);
  });
});

describe('searchCreater', () => {
  it('should return input element with searching functionality', () => {
    expect(searchCreater()).toBeInstanceOf(HTMLInputElement);
  });
});

describe('resetCreater', () => {
  it('should return button element with reset filters or app options functionality', () => {
    expect(resetCreater('type of resets')).toBeInstanceOf(HTMLButtonElement);
  });
});

describe('controlPanelCreater', () => {
  it('should create all controller elements and return them in overall control panel', () => {
    expect(controlPanelCreater()).toBeInstanceOf(HTMLDivElement);
  });
});
