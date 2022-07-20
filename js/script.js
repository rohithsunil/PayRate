const dropList = document.querySelectorAll("form select"),
	fromCurrency = document.querySelector(".from select"),
	toCurrency = document.querySelector(".to select"),
	getButton = document.querySelector("form button");
toggleButton = document.querySelector("#toggle");

function changeCurr() {
	if (toggleButton.checked) {
		document.querySelector("body").classList.remove("pay");
		document.querySelector("body").classList.add("bit");
		document.querySelector(".bitHeader").classList.remove("hidden");
		document.querySelector(".payHeader").classList.add("hidden");
	} else {
		document.querySelector("body").classList.remove("bit");
		document.querySelector("body").classList.add("pay");
		document.querySelector(".bitHeader").classList.add("hidden");
		document.querySelector(".payHeader").classList.remove("hidden");
	}
	populateList();
	getExchangeRate();
}

function populateList() {
	for (let i = 0; i < dropList.length; i++) {
		dropList[i].innerHTML = "";
		for (let currency_code in country_list) {
			// selecting AED by default as FROM currency and INR as TO currency
			let selected =
				i == 0
					? currency_code == "AED"
						? "selected"
						: ""
					: currency_code == "INR"
					? "selected"
					: "";
			// creating option tag with passing currency code as a text and value
			let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
			// inserting options tag inside select tag
			dropList[i].insertAdjacentHTML("beforeend", optionTag);
		}
		dropList[1].addEventListener("change", (e) => {
			loadFlag(e.target); // calling loadFlag with passing target element as an argument
		});
	}

	if (toggleButton.checked) {
		dropList[0].innerHTML = "";
		for (let crypto_code in crypto_list) {
			let selected = crypto_code == "BTC" ? "selected" : "";
			let optionTag = `<option value="${crypto_code}" ${selected}>${crypto_code}</option>`;
			// inserting options tag inside select tag
			dropList[0].insertAdjacentHTML("beforeend", optionTag);
		}
		dropList[0].parentElement.querySelector("img").src =
			"https://upload.wikimedia.org/wikipedia/commons/1/1d/No_image.svg";
	} else {
		loadFlag(fromCurrency); // calling loadFlag with passing select element (fromCurrency) of FROM
		// calling loadFlag with passing target element as an argument
		dropList[0].addEventListener("change", (e) => {
			loadFlag(e.target); // calling loadFlag with passing target element as an argument
		});
	}
}

function loadFlag(element) {
	for (let code in country_list) {
		if (code == element.value) {
			// if currency code of country list is equal to option value
			let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
			// passing country code of a selected currency code in a img url
			imgTag.src = `https://flagcdn.com/48x36/${country_list[
				code
			].toLowerCase()}.png`;
		}
	}
}

window.addEventListener("load", () => {
	changeCurr();
});

getButton.addEventListener("click", (e) => {
	e.preventDefault(); //preventing form from submitting
	getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", () => {
	let tempCode = fromCurrency.value; // temporary currency code of FROM drop list
	fromCurrency.value = toCurrency.value; // passing TO currency code to FROM currency code
	toCurrency.value = tempCode; // passing temporary currency code to TO currency code
	loadFlag(fromCurrency); // calling loadFlag with passing select element (fromCurrency) of FROM
	loadFlag(toCurrency); // calling loadFlag with passing select element (toCurrency) of TO
	getExchangeRate(); // calling getExchangeRate
});

function getExchangeRate() {
	const amount = document.querySelector("form input");
	const exchangeRateTxt = document.querySelector("form .exchange-rate");
	let amountVal = amount.value;
	// if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
	if (amountVal == "" || amountVal == "0") {
		amount.value = "1";
		amountVal = 1;
	}
	exchangeRateTxt.innerText = "Getting exchange rate...";

	if (toggleButton.checked) {
		let toCryptoUrl = `https://min-api.cryptocompare.com/data/price?fsym=${fromCurrency.value}&tsyms=USD`;
		let toCurrUrl = `https://v6.exchangerate-api.com/v6/07918a05543d669af668dab4/pair/USD/${toCurrency.value}`;
		// fetching api response and returning it with parsing into js obj and in another then method receiving that obj

		fetch(toCryptoUrl)
			.then((response) => response.json())
			.then((result) => {
				let coinToUSDRate = result["USD"];
				let usdToCurRate; // getting user selected TO currency rate // multiplying user entered value with selected TO currency rate
				fetch(toCurrUrl)
					.then((response) => response.json())
					.then((result) => {
						usdToCurRate = result.conversion_rate;
						let totalExRate = (
							amountVal *
							coinToUSDRate *
							usdToCurRate
						).toFixed(2);
						exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
					});
			})
			.catch(() => {
				// if user is offline or any other error occured while fetching data then catch function will run
				exchangeRateTxt.innerText = "Something went wrong";
			});
	} else {
		let url = `https://v6.exchangerate-api.com/v6/07918a05543d669af668dab4/latest/${fromCurrency.value}`;
		// fetching api response and returning it with parsing into js obj and in another then method receiving that obj
		fetch(url)
			.then((response) => response.json())
			.then((result) => {
				let exchangeRate = result.conversion_rates[toCurrency.value]; // getting user selected TO currency rate
				let totalExRate = (amountVal * exchangeRate).toFixed(2); // multiplying user entered value with selected TO currency rate
				exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
			})
			.catch(() => {
				// if user is offline or any other error occured while fetching data then catch function will run
				exchangeRateTxt.innerText = "Something went wrong";
			});
	}
}
