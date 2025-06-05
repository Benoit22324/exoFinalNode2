"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
const env_1 = require("./env");
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: "postgresql",
    out: "src/migrations",
    schema: "src/schemas/index.ts",
    dbCredentials: {
        url: env_1.env.DATABASE_URL
    },
    verbose: true,
    strict: true
});
