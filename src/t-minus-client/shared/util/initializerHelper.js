import each from 'lodash/each';
import isFunction from 'lodash/isFunction';

export function runInitializers(initializers, store) {
  each(initializers, (initializer) => {
    if(isFunction(initializer)) {
      initializer(store);
    }
  });
}
