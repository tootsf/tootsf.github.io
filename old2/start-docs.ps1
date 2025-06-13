#!/usr/bin/env pwsh

Write-Host "Building documentation structure..." -ForegroundColor Green
python build/generate-structure.py

Write-Host "Starting local server..." -ForegroundColor Green
Write-Host "Documentation will be available at: http://localhost:8000" -ForegroundColor Yellow
python -m http.server 8000
