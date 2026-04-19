# Programmatic SEO Roadmap

## P1 Launch Batch

### New hub
- `/integrations/` targeting integration and destination workflows

### Integration destinations
- `/integrations/google-drive/`
- `/integrations/dropbox/`
- `/integrations/email/`
- `/integrations/sendfaxpro/`

### Integration workflows
- `/integrations/google-drive-receipts/`
- `/integrations/google-drive-invoices/`
- `/integrations/google-drive-contracts/`
- `/integrations/dropbox-receipts/`
- `/integrations/dropbox-contracts/`
- `/integrations/dropbox-medical-records/`
- `/integrations/email-invoices/`
- `/integrations/email-certificates/`
- `/integrations/email-business-cards/`
- `/integrations/sendfaxpro-contracts/`
- `/integrations/sendfaxpro-insurance-forms/`

### Existing-family gap pages
- `/documents/utility-bills/`
- `/documents/checks/`
- `/documents/w9-forms/`
- `/documents/proof-of-address/`
- `/solutions/insurance-agents/`
- `/solutions/healthcare-admins/`
- `/compare/scanner-pro-alternative/`
- `/compare/notebloc-alternative/`

## Priority Notes
- Lead with integrations because they widen the intent surface without forcing unsupported product claims.
- Prioritize receipts, invoices, contracts, and insurance workflows because they map most directly to commercial document handling.
- Use the new gap pages to strengthen internal linking between the document, solution, and comparison families.

## Build Notes
- `scripts/build-programmatic.mjs` generates integration pages from compact seeds.
- `scripts/validate-programmatic.mjs` validates every hub and programmatic page before production builds.
- `src/data/programmatic-integrations.json` is generated output and should stay checked in so local rendering does not depend on a prior manual step.
