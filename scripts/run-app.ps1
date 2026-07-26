param(
  [int]$Port = 8080
)

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

Write-Host "Serving HAI-Webpage on http://localhost:$Port"
& $pythonExe -m http.server $Port
