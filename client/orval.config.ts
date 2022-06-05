import { defineConfig } from "orval";

export default defineConfig({
  addressBook: {
    output: {
      mode: "split",
      target: "src/api/endpoints/addressBook.ts",
      schemas: "src/api/model",
      client: "react-query",
      override: {
        mutator: {
          path: "src/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
    input: {
      target: "http://localhost:3000/api-json",
    },
  },
});
