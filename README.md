# `vitest-pool-example`

[![Version][version-badge]][npm-url]

> Reference implementation of a custom Vitest pool runtime.

## Installation

```sh
npm install -D vitest-pool-example
```

## Configuration

```ts
import { defineConfig } from "vitest/config";
import { customPool } from "vitest-pool-example";

export default defineConfig({
  test: {
    pool: customPool({ customProperty: "b" }),
  },
});
```

[version-badge]: https://img.shields.io/npm/v/vitest-pool-example
[npm-url]: https://www.npmjs.com/package/vitest-pool-example
