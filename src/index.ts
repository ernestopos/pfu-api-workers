import { fromHono } from "chanfana";
import { Hono } from "hono";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";
import { DonationPDFGeneration } from "./endpoints/donationPDFGeneration";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

// Register OpenAPI endpoints
//openapi.get("/api/tasks", TaskList);
//openapi.post("/api/tasks", TaskCreate);
//openapi.get("/api/tasks/:taskSlug", TaskFetch);
//openapi.delete("/api/tasks/:taskSlug", TaskDelete);

// PFU - Foundation API Integration
openapi.post("/api/donations/generate-pdf", DonationPDFGeneration);

export default app;
