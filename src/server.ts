import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

const port : number = 8000;

app.use((ctx) => { 
  ctx.response.body = "Hello World!"; 
});

console.log(`Server running on http://localhost${port}`);

// @ts-ignore
await app.listen({ port });
