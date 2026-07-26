param(
  [ValidateSet("auto", "chrome", "edge")]
  [string]$Browser = "auto",
  [int]$Port = 8081,
  [int]$Timeout = 60
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

& $pythonExe .\run_tests.py --browser $Browser --port $Port --timeout $Timeout
