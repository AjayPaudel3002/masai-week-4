function get_currency(display_func,currency_from,currency_to) {
	var result = null
	console.log(currency_from)
	console.log(currency_to)
	var http_req = new XMLHttpRequest()
	var url = "https://api.currencystack.io/currency?base=" + currency_from +"&target="  + currency_to + "&apikey=Ra3a8a6676afa944143f3eb8c2d27265"
	http_req.open('GET', url)
	http_req.send()
	http_req.onload = function(){
		if(http_req.status === 200){
			result = http_req.response
			print_currency_data(result)
		}
		else{
			 console.log("Error Code is:" + http_req.status);
		}
	}
}

var print_currency_data = function(input){
	//console.log("print")
	console.log(input)
	var body = document.querySelector('body');
	var display = document.createElement('p');
	if(input == null){  				
		display.textContent = 'Error! No currency data received or invalid reques'
	}
	else{
		var json  = JSON.parse(input)
		var output = document.getElementById("output_amount").value
	 	var amount = document.getElementById("amount").value
		var from_val = document.getElementById("from").value
		var to_val = document.getElementById("to").value
		console.log(from_val)
		document.getElementById("output_amount").value = amount
		var converted_amount = json.rates[to_val] * Number(amount)
		document.getElementById("output_converted_to").value = converted_amount
		var new_element = document.createElement("h3")
		var parent = document.querySelector(".output_margin")
		parent.innerHTML = ""
		parent.appendChild(new_element)
		new_element.textContent = "Last Update " + json.last_update
		var new_element2 = document.createElement("h4")
		parent.appendChild(new_element2)
		new_element2.textContent = "Current Price  "+ "1"+from_val+ " "+ "= "+" " + json.rates[to_val] +to_val
		}
	}		 
	var displayBtn = document.querySelector('#print_currency')
	displayBtn.addEventListener('click',function(){
	var curr_from = document.getElementById('from').value
	var curr_to = document.getElementById('to').value
	var input_value = document.getElementById("amount").value
	console.log("input_value")
	if (input_value !== "") {
		get_currency(print_currency_data, curr_from, curr_to);
	}
	else{
		alert("please enter value")
	}
});
