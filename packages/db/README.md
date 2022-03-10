# Database

TODO: Refactor to remove this package in favor of Typescript Project References.

- Types should be directly related to an endpoint instead of api and consumer
  separately reaching for a type. For example:
  - /case-studies/ should have the CaseStudy[] definition.
  - /case-studies/:id should have the CaseStudy definition.
- Move contents to subdirectory of server repo.
- Adjust tooling to bundle shared types into a ".d.ts" out-file.
- Reference types from server into frontend via project references.

TODO: Automate type-gen for supabase
