param(
  [switch]$SkipPythonInstall
)

$ErrorActionPreference = "Stop"

function Get-PythonExe {
  $candidates = @()

  $cmd = Get-Command python -ErrorAction SilentlyContinue
  if ($cmd -and $cmd.Source -and ($cmd.Source -notlike "*WindowsApps\\python.exe")) {
    $candidates += $cmd.Source
  }

  $knownRoot = Join-Path $env:LOCALAPPDATA "Programs\Python"
  if (Test-Path $knownRoot) {
    $found = Get-ChildItem -Path $knownRoot -Directory -Filter "Python3*" | Sort-Object Name -Descending
    foreach ($dir in $found) {
      $exe = Join-Path $dir.FullName "python.exe"
      if (Test-Path $exe) {
        $candidates += $exe
      }
    }
  }

  foreach ($exe in $candidates | Select-Object -Unique) {
    try {
      & $exe --version *> $null
      if ($LASTEXITCODE -eq 0) {
        return $exe
      }
    } catch {}
  }

  return $null
}

function Ensure-Python {
  $py = Get-PythonExe
  if ($py) { return $py }

  if ($SkipPythonInstall) {
    throw "Python was not found. Install Python 3.12+ and re-run scripts\setup.ps1."
  }

  $winget = Get-Command winget -ErrorAction SilentlyContinue
  if (-not $winget) {
    throw "winget is not available. Install Python 3.12+ manually, then re-run scripts\setup.ps1."
  }

  Write-Host "Installing Python 3.12 with winget..."
  & winget install -e --id Python.Python.3.12 --scope user --accept-package-agreements --accept-source-agreements
  if ($LASTEXITCODE -ne 0) {
    throw "Python installation failed."
  }

  $py = Get-PythonExe
  if (-not $py) {
    throw "Python installation completed, but python.exe could not be detected."
  }

  return $py
}

$repoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $repoRoot

$pythonExe = Ensure-Python
Write-Host "Using Python at: $pythonExe"

& $pythonExe -m pip install --upgrade pip
if ($LASTEXITCODE -ne 0) { throw "pip upgrade failed." }

& $pythonExe -m pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) { throw "requirements install failed." }

Write-Host ""
Write-Host "Setup complete."
Write-Host "Run app:   powershell -ExecutionPolicy Bypass -File .\scripts\run-app.ps1"
Write-Host "Run tests: powershell -ExecutionPolicy Bypass -File .\scripts\run-tests.ps1"
