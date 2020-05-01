import network from "./network.js";
import dataService from "./data-service.js";
import autocomplete from "./autocomplete-util.js";

//Init App : Fetch Data from server
network.httpGet("https://restcountries.eu/rest/v2/all",function(data){
	if(data){
		try{
			dataService.setCountries(JSON.parse(data));
			console.log(dataService.getCountries());
		}catch(e){
			alert("Api fetch failed");
		}
	}
});

//init autocomplete
autocomplete.initAutocomplete();

