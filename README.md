# marko-starter-babel

Transpile JavaScript using Babel with [marko-starter](https://github.com/marko-js/marko-starter).

## Installation

```bash
npm install marko-starter-babel --save
```

## Usage

**my-marko-starter-project/project.js**
```js
const markoStarter = require('marko-starter');

markoStarter.plugins(['marko-starter-babel']);

module.exports = markoStarter.projectConfig({
  // ...
});
```
