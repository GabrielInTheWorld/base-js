import { FakeBase64 } from './utils';

test('Base64 encode ""', () => {
  const encoded = FakeBase64.encode('');
  expect(encoded).toBe('');
});

test('Base64 encode "f"', () => {
  const encoded = FakeBase64.encode('f');
  expect(encoded).toBe('Zg==');
});

test('Base64 encode "fo"', () => {
  const encoded = FakeBase64.encode('fo');
  expect(encoded).toBe('Zm8=');
});

test('Base64 encode "foo"', () => {
  const encoded = FakeBase64.encode('foo');
  expect(encoded).toBe('Zm9v');
});

test('Base64 encode "foob"', () => {
  const encoded = FakeBase64.encode('foob');
  expect(encoded).toBe('Zm9vYg==');
});

test('Base64 encode "fooba"', () => {
  const encoded = FakeBase64.encode('fooba');
  expect(encoded).toBe('Zm9vYmE=');
});

test('Base64 encode "foobar"', () => {
  const encoded = FakeBase64.encode('foobar');
  expect(encoded).toBe('Zm9vYmFy');
});
