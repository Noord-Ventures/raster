# Security policy

## Supported versions

The latest minor release of each package (`@noorddev/raster`, `@noorddev/raster-react`, `@noorddev/raster-cli`) receives security fixes.

## Reporting a vulnerability

Report vulnerabilities privately through GitHub: open the repository, choose **Security**, then **Report a vulnerability**. Do not open a public issue for a security report.

Include the package and version, a description of the issue, and steps to reproduce. You will get an acknowledgement within five working days and a fix or a mitigation plan within thirty.

## Scope

Raster ships CSS, React components, a CLI that writes files into the current project, and static registry JSON. Reports most likely to matter:

- The CLI writing outside the project directory or following a hostile `--registry`.
- Registry items that execute code at install time (they must not; items are data).
- Components that render untrusted strings as HTML.

Reports against the documentation site are welcome too.
