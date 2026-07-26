$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $repoRoot

$pythonExe = $null
$knownRoot = Join-Path $env:LOCALAPPDATA "Programs\Python"
if (Test-Path $knownRoot) {
  $found = Get-ChildItem -Path $knownRoot -Directory -Filter "Python3*" | Sort-Object Name -Descending
  foreach ($dir in $found) {
    $exe = Join-Path $dir.FullName "python.exe"
    if (Test-Path $exe) { $pythonExe = $exe; break }
  }
}

if (-not $pythonExe) {
  throw "Python not found. Run scripts\setup.ps1 first."
}

if (-not $env:GEMINI_API_KEY) {
  Write-Host "GEMINI_API_KEY is not set for this shell."
  Write-Host "Set it first, then run this script again."
  exit 1
}

& $pythonExe .\ai_layout_check.py
