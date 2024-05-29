function sendWhatsApp() {
    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;
    var whatsappMessage = "Nama: " + name + " Pesan: " + message;
    var whatsappLink = "https://wa.me/+6289514564265?text=" + encodeURIComponent(whatsappMessage);
    window.open(whatsappLink, '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
    var sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', sendWhatsApp);
});
