import { expect } from '@jest/globals';
import DrawWidget from '../DrawWidget';

const widget = new DrawWidget();

test('test function of present number', () => {
  const result = widget.drawNumberFormat(5000000000);
  const expected = '5 000 000 000';

  expect(result).toBe(expected);
})