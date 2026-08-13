import type { Plugin, ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "http";
import handler from "../../api/chat";

export function aiServerPlugin(): Plugin {
  return {
    name: "ai-server-plugin",
    configureServer(server: ViteDevServer) {
      const handleRequest = async (
        req: IncomingMessage,
        res: ServerResponse,
      ) => {
        try {
          await handler(req, res);
        } catch (error: unknown) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          const errMsg =
            error instanceof Error
              ? error.message
              : "Internal Server Error in AI handler";
          res.end(
            JSON.stringify({
              error: errMsg,
            }),
          );
        }
      };

      server.middlewares.use("/api/chat", handleRequest);
      server.middlewares.use("/api/ai/chat", handleRequest);
    },
  };
}
