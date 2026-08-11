$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$sourceRoot = Join-Path $repoRoot "backend\src"
$outputRoot = Join-Path $repoRoot "backend\out-check"

if (Test-Path $outputRoot) {
  Remove-Item $outputRoot -Recurse -Force
}

New-Item -ItemType Directory -Path $outputRoot | Out-Null
$sourceFiles = Get-ChildItem -Path $sourceRoot -Recurse -Filter *.java | ForEach-Object { $_.FullName }
javac -d $outputRoot $sourceFiles
if (-not $?) {
  throw "Java compilation failed"
}

Write-Host "Java backend compilation passed"
