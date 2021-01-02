import { FakeBase32 } from './utils';

test('Base32 encode "f"', () => {
  const encoded = FakeBase32.encode('f');
  expect(encoded).toBe('MY======');
});

test('Base32 decode "MY======"', () => {
  const decoded = FakeBase32.decode('MY======');
  expect(decoded).toBe('f');
});
