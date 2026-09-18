---
name: buildup-enterprise-standards
description: Enforces production-grade enterprise standards from BuildUp Architecture Blueprint v1.0. Prevents regression into MVP patterns.
---

# BuildUp Enterprise Standards

1. **No MVP Components**: Do not create local SQLite, JSON files, or mock hardcoded states for Core Domain Data. All data models must use **Firebase SQL Connect (PostgreSQL)** defined in `dataconnect/schema/schema.gql`.
2. **AI Gateway**: Never use `GEMINI_API_KEY` directly. Always use the **BuildUp AI Gateway** which initializes Vertex AI using Google Cloud Application Default Credentials (ADC) and enforces the `gemini-2.5-flash` model.
3. **Backend Deployment**: The Express backend must remain containerized using `Dockerfile` and `cloudbuild.yaml` for Google Cloud Run deployment. Do not revert to `node server.ts` for production.
4. **Auth & Multi-tenancy**: All GraphQL mutations/queries must include `@auth(level: USER)` and ensure tenant isolation (filtering by `organizationId`).
