const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");

function displayBotMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("bot-message");
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
}

function displayUserMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("user-message");
    messageElement.textContent = "水水/帥哥: " + message; // Changed to "水水/帥哥"
    chatMessages.appendChild(messageElement);
}

function getCannedResponse(intent) {
    switch (intent) {
        case "品牌故事和資訊":
            return "這是我們品牌的故事SIGMÛA＂∑＂，是一支品牌私人通路商。每月5號全店更新商品日，貨源有限，不能確保下個月妳喜愛的商品是否延賣。保證全店皆為正品，歡迎來找碴。＂紳士們＂，我們更樂意擔任您的私人購物顧問，根據您提供的女神形象，精心挑選符合期望的禮品。";
        case "產品搜索":
            return "請問您想搜索哪一款產品呢？";
        case "訂單追蹤":
            return "您可以透過訂單號碼來追蹤您的訂單狀態。";
        case "促銷和優惠":
            return "我們目前有一些促銷和優惠活動，您可以前往我們的官網查看詳情。";
        case "產品詳情及特色":
            return "這是我們產品的詳細資訊和特色...";
        case "物流配送地點及取貨方式":
            return "我們提供物流配送到指定地點，也可以選擇到門市取貨。";
        case "付款方式":
            return "我們支援多種付款方式，包括信用卡、PayPal等。";
        case "產品比較":
            return "您可以在我們的網站上進行產品比較，以便找到適合您的產品。";
        case "退換貨政策":
            return "關於退換貨的政策，您可以在我們的官網上找到相關資訊。";
        default:
            return "I'm sorry, I couldn't process your request.";
    }
}

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === "") {
        return;
    }

    displayUserMessage(userMessage);

    const APIkey = "92e3408c5219437fabcfd6dee12832c5";
    const ReqID = "4ffcac1c-b2fc-48ba-bd6d-b69d9942995a";
    const projectName = "SIGMUA";
    const deploymentName = "SIGMUA";

    const url = "https://wanglinchuai.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-10-01-preview";

    const headers = {
        "Ocp-Apim-Subscription-Key": APIkey,
        "Apim-Request-Id": ReqID,
        "Content-Type": "application/json"
    };

    const payload = {
        "kind": "Conversation",
        "analysisInput": {
            "conversationItem": {
                "id": "1",
                "text": userMessage,
                "modality": "text",
                "participantId": "水水/帥哥" // Changed to "水水/帥哥"
            }
        },
        "parameters": {
            "projectName": projectName,
            "verbose": true,
            "deploymentName": deploymentName,
            "stringIndexType": "TextElement_V8"
        }
    };

    fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        const topIntent = data.result.prediction.topIntent;
        const botResponse = getCannedResponse(topIntent);
        displayBotMessage("SIGMUA 小編: " + botResponse); // Display bot response with "SIGMUA 小編" prefix
    })
    .catch(error => {
        console.error("Error:", error);
    });

    userInput.value = "";
}

userInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});