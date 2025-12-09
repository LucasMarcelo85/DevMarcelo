$folder = 'c:\Users\Windows\Desktop\DevMarcelo\images\gofashion'
$files = Get-ChildItem -Path $folder -File -Include *.jpg, *.jpeg, *.png, *.gif, *.webp | Sort-Object Name
$files | ForEach-Object {
  $name = $_.Name
  $title = $_.BaseName
  Write-Output "      { name: '$name', title: '$title' },"
}
