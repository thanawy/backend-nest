const random = require('random');

export const gaussianEngine = {
  next: () => random.normal(0, 1)(),
};
