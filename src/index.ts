import { fromHono } from "chanfana";
import { Hono } from "hono";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";
import { DonationPDFGeneration } from "./endpoints/donationPDFGeneration";
import { UIIDDGeneratior } from "./endpoints/uIIDDGeneratior";
import { SignatureIntegrity } from "./endpoints/signatureIntegrity";
import { cors } from "hono/cors";
import { WebHookWompiDonationPDFGeneration } from "./endpoints/webHookWompiDonationPDFGeneration";
import { AddClientManagementDAO } from "./dao/addClientManagementDAO";
import { ProductProxy } from "./endpoints/ProductProxy";

export type PFUBindings = {
  DB: D1Database;  
};

// Start a Hono app
const app = new Hono<{ Bindings: PFUBindings }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type"],
}));

// PFU - Foundation API Integration
openapi.post("/api/donations/generate-pdf", DonationPDFGeneration);
openapi.get("/api/transaction/generate-uiidd", UIIDDGeneratior);
openapi.post("/api/transaction/signature-transaction", SignatureIntegrity);
openapi.post("/api/webhook/wompi/generate-pdf", WebHookWompiDonationPDFGeneration);
openapi.post("/api/webhook/client/create", AddClientManagementDAO);

// API FOR SHOPPING CAR INTEGRATION
openapi.get("/api/shoppingcar/viewproducts", ProductProxy);
export default app;