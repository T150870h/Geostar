async function loadCurrencies() {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await res.json();
    const currencies = Object.keys(data.rates);
    const fromSelect = document.getElementById("fromCurrency");
    const toSelect = document.getElementById("toCurrency");

    
    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";

    currencies.forEach(currency => {
        let option1 = document.createElement("option");
        let option2 = document.createElement("option");
        option1.value = option2.value = currency;
        option1.textContent = option2.textContent = currency;
        fromSelect.appendChild(option1);
        toSelect.appendChild(option2);
    });

    fromSelect.value = "USD";
    toSelect.value = "EUR";
}

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultElement = document.getElementById("result");
    const noteElement = document.querySelector(".note");

    if (amount === "" || isNaN(amount) || amount <= 0) {
        resultElement.textContent = "Please enter a valid amount!";
        return;
    }

    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await res.json();
    const rate = data.rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    // Apply digits divider and retain decimal places
    const formattedAmount = Number(amount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const formattedConvertedAmount = Number(convertedAmount).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    noteElement.textContent = `*1 ${fromCurrency} = ${rate.toFixed(2)} ${toCurrency}`;
    resultElement.textContent = `${formattedAmount} ${fromCurrency} = ${formattedConvertedAmount} ${toCurrency}`;
}

function clearLine(){
    document.getElementById("amount").value="";
}
function swap() {
    const fromSelect = document.getElementById("fromCurrency");
    const toSelect = document.getElementById("toCurrency");

    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
}

loadCurrencies();