class DataService{
	
	constructor(){
		this.lsKey = "notesApp";
		this.masterData={
			// 1 : {
			// 	text  : "",
			// 	children :{

			// 	}			
			// }
		};
	}

	setMasterData(data){
		if(data){
			this.masterData = data;
		}
	}

	getMasterData(){
		return JSON.parse(JSON.stringify(this.masterData));
	}

	saveInLocalStorage(key,data){
		try{
			localStorage.setItem(key,JSON.stringify(data));
		}catch(e){
			console.log("Opearation failed");
		}
		
	}

	fetchFromLocalStorage(key){
		let data = null;
		try{
			let lsData = localStorage.getItem(key);
			if(lsData){
				data = JSON.parse(lsData);
			}
			
		}catch(e){
			console.log("Parsing failed");
		}
		return data;
	}

	saveNote(){

	}
}

const dataService= new DataService();
export default dataService;
