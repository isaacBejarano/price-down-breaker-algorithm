setchange.addEventListener("input", () => downbreak(+setchange.value));

function downbreak(change) {


	const MONEY = [
    // 5pack
		500,
		200,
		100,
		50,
		20,
		10,
		5,
		2,
		1,
		0.5,
		0.2,
		0.1,
		0.05,
		0.02,
		0.01,
	];

	// 1. target(change) must be bigger than smallest coin and have max 2 decimals
	if (change < MONEY[MONEY.length - 1] || change != change.toFixed(2)) {
		invalidToString(
			"change unexistent or too small or with too many decimals to be computed"
		);
	} else {
		// 2. downbreak
		let target = change;
		let result = [];
    let i = 0;
    
		do {
			if (MONEY[i] < target) {
				result[i] = Math.floor(target / MONEY[i]); // quotient
				target = (target % MONEY[i]).toFixed(2); // module only 2 decimals
			} else if (MONEY[i] > target) {
				result[i] = false; // skip index
			} else {
				result[i] = Math.floor(target / MONEY[i]); // base case (module 0)
			}
			i++;
		} while (target % MONEY[i - 1] !== 0); // [i-1] 'coz do{} => i++

		// 3. output
		validToString(result, MONEY);
	}
}

// lib
function invalidToString(output) {
	outlet.innerText = output; // <div #outlet>
	outlet.classList.add("invalid"); // css
}

function validToString(result, MONEY) {
	let template = "<h3>broken down change</h3>";

	// diplay only truthy
	for (let i = 0; i < result.length; i++) {
		// print bills
		if (result[i] && MONEY[i] >= 1)
			template +=
				"<code>" +
				MONEY[i] +
				"€ " +
				"<span>* " +
				result[i] +
				"</span>" +
				"</code><br/>";

		// print ocins
		if (result[i] && MONEY[i] < 1)
			template +=
				"<code>" +
				MONEY[i] * 100 +
				"¢ " +
				"<span>* " +
				result[i] +
				"</span>" +
				"</code><br/>";
	}

	outlet.innerHTML = template; // <div #outlet>
	outlet.classList.remove("invalid");
	outlet.classList.add("valid"); // css
}
