$from = "noreply@<도메인>"
$to = "user1@example.net"
$smtpServer = "email-smtp.us-west-2.amazonaws.com"
$smtpPort = "587"
$username = "<액세스 키>"
$password = "<시크릿 키>"
$subject = "Hello"
$body = "Hello SES SMTP"

$smtp = New-Object System.Net.Mail.SmtpClient($smtpServer, $smtpPort)

$smtp.EnableSSL = $true
$smtp.Credentials = New-Object System.Net.NetworkCredential($username, $password)
$smtp.Send($from, $to, $subject, $body)