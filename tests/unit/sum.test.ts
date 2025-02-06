import { expect, test } from 'vitest';
import { sum } from '../../src/sum';

test('Add numbers', () => {
  expect(sum(1, 2)).toBe(3);
});
