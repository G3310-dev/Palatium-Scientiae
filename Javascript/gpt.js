const messsageBar = document.querySelector(".bot_container input");
const sendBtn = document.querySelector(".bot_container button");
const messageBox = document.querySelector(".bot_box");

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "BLOCKED"

sendBtn.onclick = function () {
    if(messsageBar.value.length > 0){
        let message = 
            `<div class="user">
                <img src="/Assets/Icons/AP.png" alt="">
                <p class="user">${messsageBar.value}</p>
            </div>`

        let response = 
        `<div class="bot">
                <img src="/Assets/Icons/AP.png" alt="">
                <p class="bot">...</p>
            </div>`
        messageBox.insertAdjacentHTML("beforeend", message)

        setTimeout(() => {
            messageBox.insertAdjacentHTML("beforeend", response)

            const requestOptions = {
                method : 'POST',
                headers : {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body : JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [{"role": "user", "content": messsageBar.value}],
                })
            }

            fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
                const ChatBotResponse = document.querySelector(".response .new");
                ChatBotResponse.innerHTML = data.choices[0].message.content;
                ChatBotResponse.classList.remove("new");
            }).catch((error) => {
                console.log(error);
            })
        }, 100);
    }
}