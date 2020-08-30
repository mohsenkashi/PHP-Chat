let userId;
let messagesDiv;
let lastMessageId = 0;
$(document).ready(function () {
    onStart()
});


function getNewMessages() {
    $.get(`messages?from=${lastMessageId}`, function (response) {
        response.forEach(onMessage)
        //set timer for new messages
        setTimeout(function () {
            getNewMessages();
        }, 3000);
    })
}

function onStart() {
    const urlParams = new URLSearchParams(window.location.search);
    userId = Number(urlParams.get('userId'));
    messagesDiv = $("#messages");
    $('#message_text').keydown(function (event) {
        let keyPressed = event.keyCode || event.which;
        if (keyPressed === 13) {
            sendMessage();
        }
    });

    getNewMessages();
}


function onMessage(message) {
    let name = message.user.id === userId ? "You" : message.user.name;
    messagesDiv.append(`<span><b>${name}</b>:${message.message}</span><br/>`)
    messagesDiv.scrollTop(messagesDiv[0].scrollHeight);
    lastMessageId = message.id;
}

function sendMessage() {
    let messageTextbox = $("#message_text");
    var message = messageTextbox.val()
    $.post('messages', {userId: userId, message: message}, function () {
        messageTextbox.val("");
        messageTextbox.focus();
    });
}


