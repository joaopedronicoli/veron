$exclude = @("node_modules", ".git", "dist", "deploy.ps1")
$src = Get-Location
$dst = "veron-deploy.zip"

Write-Host "1. Gerando novo ZIP corrigido..."
Compress-Archive -Path "C:\Users\peedr\.gemini\veron\*" -DestinationPath $dst -CompressionLevel Optimal -Update

Write-Host "2. ZIP gerado! Agora copie e cole os comandos abaixo:"
Write-Host "---------------------------------------------------"
Write-Host "scp veron-deploy.zip root@144.76.64.45:/opt/"
Write-Host "ssh root@144.76.64.45 'cd /opt && unzip -o veron-deploy.zip -d veron && cd veron && docker compose up -d --build'"
Write-Host "---------------------------------------------------"
