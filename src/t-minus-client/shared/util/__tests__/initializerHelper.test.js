import { runInitializers } from '../initializerHelper';

describe('initializerHelper', () => {
  describe('runInitializers', () => {
    it('runs all initializers', () => {
      const initializer = jest.fn();
      runInitializers([initializer]);
      expect(initializer).toHaveBeenCalled();
    });

    it('ignores non-function initializers', () => {
      const initializer = Math.PI;
      expect(() => {
        runInitializers([initializer]);
      }).not.toThrowError();
    });
  });
});
