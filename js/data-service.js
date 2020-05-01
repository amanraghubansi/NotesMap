class DataService{
	
	constructor(){
		this.lsKey = "notesApp";
		this.id=1;
			this.masterData={
				// 1 : {
				// 	text  : "Parent 1",
				// 	children :{
				// 		2 : {
				// 			text : "parent 1 | child 2"
				// 		},
				// 		3 : {
				// 			text : "parent 1 | child 3",
				// 			children : {
				// 				4 : {
				// 					text : "parent 1 | child 3 | child 4"
				// 				},
				// 				5 : {
				// 					text : "parent 1 | child 3 | child 5"
				// 				},
				// 			}
				// 		}
						
				// 	}			
				// }
			};
		}	

	fetchUniqueId(){
		this.id++;
		return this.id
	}

	setMasterData(data){
		if(data){
			this.masterData=data;
		}
	}

	getMasterData(){
		return JSON.parse(JSON.stringify(this.masterData));
	}

	addNoteToMasterData(id,data){
		if(data){
			this.masterData[id]=data;
			this.saveInLocalStorage(this.lsKey,this.masterData);
		}
	}

	findNodeAndAddDataToMasterData(parentId,elId,text){
		let dataObj = this.findObjectById(parentId,this.masterData);
		if(!dataObj.children){
			dataObj.children={};
		}
		let obj={text : text};
		dataObj.children[elId] = obj;
		this.saveInLocalStorage(this.lsKey,this.masterData);
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

	createNote(id,txt){
		this.addNoteToMasterData(id,txt);
	}

	findObjectById(id,data){
		let objKeys= Object.keys(data);
		for (let index = 0; index < objKeys.length; index++) {
			if(""+id === objKeys[index]){
				return data[objKeys[index]];
			}else {
				return this.findObjectById(id, data[objKeys[index]].children);
			}
			
		}

	}
}

const dataService= new DataService();
export default dataService;
