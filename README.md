# HAI-Webpage

Interactive vendor booth reservation webpage for Hmong Association, Inc (Arkansas), with bilingual (English/Hmong) UI, checkout flow, map interaction, and diagnostics.

## Windows quick setup

Run from repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup.ps1
```

This script will:
- install Python 3.12 (user scope) if missing,
- upgrade pip,
- install required Python packages from `requirements.txt`.

## Run the app locally

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-app.ps1
```

Default URL: `http://localhost:8080`

## Run diagnostics

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-tests.ps1
```

Optional flags:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-tests.ps1 -Browser chrome -Timeout 90
```

## Run AI layout audit (optional)

Set your API key in the current shell:

```powershell
$env:GEMINI_API_KEY="your_key_here"
```

Then run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\run-ai-audit.ps1
```
