const Base_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swapIcon = document.getElementById("swap-icon");

for(let select of dropdowns) {
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evnt)=> {
        updateFlag(evnt.target);
    })
}

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === 1 || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    
    // console.log(fromCurr.value,toCurr.value);
    const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    
    let finalAmount = amtVal * rate;
    msg.innerText = `${amount.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc // img source change in newSourcw
};

btn.addEventListener("click", (evt)=> {
    evt.preventDefault();  // when form is submitted the defult behavior submit the form, when we set preventDefult so the form is not refresh. 
    updateExchangeRate();
    
})

swapIcon.addEventListener("click", () => {
    const fromValue = fromCurr.value;
    const toValue = toCurr.value;

    fromCurr.value = toValue;
    toCurr.value = fromValue;

    updateFlag(fromCurr);
    updateFlag(toCurr);
    updateExchangeRate();
});

window.addEventListener("DOMContentLoaded", ()=> {
    updateExchangeRate();
});