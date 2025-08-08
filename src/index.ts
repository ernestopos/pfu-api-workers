import { fromHono } from "chanfana";
import { Hono } from "hono";
import { DonationPDFGeneration } from "./endpoints/donationPDFGeneration";
import { UIIDDGeneratior } from "./endpoints/uIIDDGeneratior";
import { SignatureIntegrity } from "./endpoints/signatureIntegrity";
import { cors } from "hono/cors";
import { WebHookWompiDonationPDFGeneration } from "./endpoints/webHookWompiDonationPDFGeneration";
import { ProductProxy } from "./endpoints/ProductProxy";
import { AddClienProxy } from "./endpoints/addClienProxy";
import { SaveDonationProxy } from "./endpoints/saveDonationProxy";

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
openapi.post("/api/webhook/client/create", AddClienProxy);
openapi.post("/api/webhook/donations/create", SaveDonationProxy);


// API FOR SHOPPING CAR INTEGRATION
openapi.get("/api/shoppingcar/viewproducts", ProductProxy);
export default app;