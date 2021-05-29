const fetch = require("node-fetch");
const inputdate = process.argv.slice(2)[0];
const inputmonth = process.argv.slice(2)[1];
const map = {
	1: 31,
	2: 29,
	3: 31,
	4: 30,
	5: 31,
	6: 30,
	7: 31,
	8: 31,
	9: 30,
	10: 31,
	11: 30,
	12: 31,

}
// console.log(map)
const monthValidation = (m) => Object.keys(map).includes(m) ? true : "Invalid Month";
const dateValidation = (m, d) => (d <= map[m] && d > 0) ? true : "Invalid Date"
function getData(inputdate, inputmonth){
	const month = String(Number(inputmonth))
	const date = String(Number(inputdate))
	const validations = [monthValidation(month), dateValidation(month, date)]
	const allFieldsValid = validations.every((validation) => validation === true);
	if (!allFieldsValid){console.log(validations.find((m) => typeof m === "string")); return;}
	const dateString = (inputdate !== "") ? `/${date}` : "";
	const monthString = (inputmonth !== "") ? `/${month}` : "";
	fetch(`https://history.muffinlabs.com/date${monthString}${dateString}`)
	.then((response) => response.json())
	.then((data) => {let obj = data.data
		for(x in obj){
			console.log(x)
			for(y in obj[x]){
				valOne=obj[x][y]["year"]
				valTwo=obj[x][y]["text"]
                console.log(valOne +"\n"+ valTwo)
			}
		}
});
}

getData(inputdate, inputmonth)