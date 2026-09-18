const { TextDecoder, TextEncoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

jest.mock('./src/firebaseConfig', () => ({
  db: {},
  app: {},
  auth: {}
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn()
}));
