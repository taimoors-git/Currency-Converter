const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const input = document.querySelector("form input");
const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");


for(let select of dropdown){
    for(let code in countryList){
        let option = document.createElement("option");
        option.innerText = code;
        select.append(option);
        const defaultFrom = "USD";
        const defaultTo = "PKR";
        if (select.name === "from" && code === defaultFrom) {
            option.selected = true;
        }
        if (select.name === "to" && code === defaultTo){
            option.selected = true;
        }
    }
    select.addEventListener("change", (event)=>{
        showFlag(event.target);
    })
}

const showFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let inputField = document.querySelector("#input");
    let amount = document.querySelector("input").value;
    if (amount === "" || amount < 1) {
        amount = 1;
        inputField.value = 1
    }
    
    const baseUrl = `${url}/${fromCurr.value.toLowerCase()}.json`;
    try {
        let response = await fetch(baseUrl);
        let data = await response.json();
        let rates = data[fromCurr.value.toLowerCase()];
        let rate = rates[toCurr.value.toLowerCase()];
        if(!rate){
            throw new Error(`Rate for ${toCurr.value} not found`)
        };
        let finalAmount = (amount * rate).toFixed(2);
        let msg = document.querySelector(".msg");
        msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        console.log(rate);
    } catch (error) {
        console.log(error)
    }
});