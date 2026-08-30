# AI Coding Agent Instructions

## Scope and process

- Read the relevant project documentation before making significant changes.
- Follow the approved project blueprint. Do not silently make major architectural decisions.
- Keep every change within the requested scope and do not modify unrelated files.
- Do not install or change dependencies without human approval.
- Do not create backend, API, database, middleware, or authentication code unless explicitly approved.
- Stop and request human approval before making a major architectural, security, database, authentication, authorization, dependency, or infrastructure decision that is not already approved.

## Security

- Treat security as a continuous requirement.
- Consider authentication, authorization, input validation, secrets, sensitive data, injection, XSS, CSRF, SSRF, IDOR/BOLA, dependency risks, least privilege, logging, and secure configuration whenever relevant.
- Never expose secrets, credentials, tokens, private keys, or other sensitive values in code, output, logs, commits, or reports.

## Validation and reporting

- Do not consider implementation complete merely because code was written; changes must be reviewable and validated.
- Never claim a change was tested unless it was actually tested.
- Clearly distinguish reported, observed, verified, and assumed information.
- For significant implementation work, report:
  - Summary
  - Files created
  - Files modified
  - Files deleted
  - Dependencies changed
  - Database, API, and configuration changes
  - Tests performed
  - Security considerations
  - Remaining issues
- Provide implementation evidence, preferably a git diff or the contents of newly created or modified files, without unnecessarily reproducing unchanged files.
