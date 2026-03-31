$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server running at http://localhost:8080/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $filePath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($filePath)) {
            $filePath = "index.html"
        }
        
        $fullPath = Join-Path (Get-Location) $filePath

        if (Test-Path $fullPath -PathType Leaf) {
            $buffer = [System.IO.File]::ReadAllBytes($fullPath)
            
            # Fayl kengaytmasini (extension) aniqlash
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            if ($ext -eq ".html") { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($ext -eq ".css") { $response.ContentType = "text/css" }
            elseif ($ext -eq ".jpg" -or $ext -eq ".jpeg") { $response.ContentType = "image/jpeg" }
            elseif ($ext -eq ".png") { $response.ContentType = "image/png" }

            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
