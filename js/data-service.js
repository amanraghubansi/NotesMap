class DataService{
	constructor(){
		this.masterData={};
	}

	saveInLocalStorage(key,data){
		try{
			localStorage.setItem(key,JSON.stringify(data));
		}catch(e){
			console.log("Op. failed");
		}
		
	}

	fetchFromLocalStorage(){

	}

	saveNote(){

	}
}

const dataService= new DataService();
export default dataService;