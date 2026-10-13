import { createServer } from "node:http";
let last = "";
createServer(async (request, response) => {
  if (request.url === "/health") {
    response.end("ok");
    return;
  }
  if (request.url === "/last") {
    response.setHeader("Content-Type", "text/plain");
    response.end(last);
    return;
  }
  if (
    request.method !== "POST" ||
    request.url !== "/v3/example.test/messages"
  ) {
    response.writeHead(404).end();
    return;
  }
  let body = "";
  for await (const chunk of request) body += chunk;
  last = body;
  response.setHeader("Content-Type", "application/json");
  if (body.includes("failure@example.test")) {
    response
      .writeHead(401)
      .end(JSON.stringify({ message: "Mock delivery failure" }));
    return;
  }
  response.end(
    JSON.stringify({
      id: "<mock@example.test>",
      message: "Queued. Thank you.",
    }),
  );
}).listen(3101, "127.0.0.1");
