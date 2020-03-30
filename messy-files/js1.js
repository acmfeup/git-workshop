function getCertificateTextElem() {
    participantNameInput = document.getElementById("participantName")
    participantName = participantNameInput.value || 'Anonymous'
    certificateTextElem = document.getElementById("certificateText")
    certificateTextElem.innerHTML = certificateTextElem.innerHTML.replace('${participantName}', participantName)
    return certificateTextElem
}