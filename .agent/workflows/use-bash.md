---
description: Always use bash (Git Bash) for running terminal commands in this project
---

// turbo-all

When running any terminal command in this project, always use Git Bash syntax:

- Use `bash` shell, NOT PowerShell
- Use `;` to chain commands (not `&&` which fails in PowerShell)
- Run commands from the project root: `d:\Developer\Jona\osito-mimoso`
- Example: `npm install package-name`
- Example chaining: `npm uninstall old-pkg; npm install new-pkg`
