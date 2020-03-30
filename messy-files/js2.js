function confirm(evt) {
    infoDiv = document.getElementById('info')
    infoDiv.hidden = 'hidden'
    certificateDiv = document.getElementById('certificate')
    completeCertificateText = getCertificateTextElem()
    certificateDiv.appendChild(completeCertificateText)
    certificateDiv.hidden = ''
    event.preventDefault()
}