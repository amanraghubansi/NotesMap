import loadApp from "./loadApp.js";
// import dataService from "./data-service.js";

// Init App : Fetch Data from ls
loadApp.load();


// var masterData = {
// 	// 1 : { text : "val" }
// }

// document.getElementById("submitBtn").addEventListener("click" , submitBtn , false);

// function submitBtn(){
// 	let value = document.getElementById("myInput").value;
// 	document.getElementById("myInput").value = "";
// 	createNote(value);
// }

// var parentNode;
// var LastId = 1;
// window.addEventListener("load" , ()=>{
// 	parentNode = document.getElementById("parent");
// } );

// function createNote(val){
// 	let el = document.createElement("p");
// 	el.innerHTML = val;
// 	let keys = Object.keys(masterData);
// 	if(keys && keys.length){
// 		let id = keys[keys.length-1];
// 		let newid = id+1;
// 		el.id = newid;
// 		masterData.newid = {
// 			text : val
// 		}
// 	}else{
// 		el.id = LastId;
// 		masterData[LastId] = {
// 			text : val
// 		}
// 	}
// 	parentNode.appendChild(el);
// }