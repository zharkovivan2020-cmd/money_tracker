# GitHub CLI: add to PATH for this session and run setup
$ghDir = "${env:ProgramFiles}\GitHub CLI"
if (-not (Test-Path "$ghDir\gh.exe")) {
  Write-Error "GitHub CLI not found. Install: winget install GitHub.cli"
  exit 1
}

$env:Path = "$ghDir;$env:Path"
Set-Location $PSScriptRoot\..

Write-Host "GitHub CLI: $(gh --version)" -ForegroundColor Green
Write-Host ""
Write-Host "Step 1: Login (browser will open)" -ForegroundColor Cyan
gh auth login -h github.com -p https -w

if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Step 2: Create repo and push to zharkovivan2020-cmd/money_tracker" -ForegroundColor Cyan
gh repo create money_tracker --public --source=. --remote=origin --push

if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "Done: https://github.com/zharkovivan2020-cmd/money_tracker" -ForegroundColor Green
}
