$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$seedFile = Join-Path $repoRoot "backend\data\db.seed.json"
$dbFile = Join-Path $repoRoot "backend\data\db.json"

Copy-Item -Path $seedFile -Destination $dbFile -Force
Write-Host "Database reset to seed data at $dbFile"
