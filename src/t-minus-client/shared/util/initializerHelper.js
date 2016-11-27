import { isFunction } from 'lodash';

export function runInitializers(initializers, store) {
  Object.keys(initializers).forEach((key) => {
    if(isFunction(initializers[key])) {
      initializers[key](store);
    }
  });
}
