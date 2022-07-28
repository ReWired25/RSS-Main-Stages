import {
  headerCreater,
  mainCreater,
  footerCreater,
} from '../application/view/page';
import { stabProductWrapper } from './stabs-mocks/stabs-mocks';

describe('headerCreater', () => {
  it('should return header html element', () => {
    expect(headerCreater()).toBeInstanceOf(HTMLElement);
  });
});

describe('mainCreater', () => {
  it('should return main html element', () => {
    expect(mainCreater(stabProductWrapper)).toBeInstanceOf(HTMLElement);
  });
});

describe('footerCreater', () => {
  it('should return footer html element', () => {
    expect(footerCreater()).toBeInstanceOf(HTMLElement);
  });
});
