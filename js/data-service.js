class DataService{
	
	constructor(){
		this.lsKey = "notesApp";
		this.id=0;
		this.masterData={};
		}	

	fetchUniqueId(){
		this.id++;
		return this.id;
	}

	setMasterData(data){
		if(data){
			this.masterData=data;
		}
	}

	setId(id){
		this.id =+id;
	}

	getMasterData(){
		return JSON.parse(JSON.stringify(this.masterData));
	}

	addNoteToMasterData(id,data){
		if(data){
			this.masterData[id]=data;
			this.saveInLocalStorage(this.lsKey,this.masterData);
			this.saveInLocalStorage("id",this.id);
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
		this.saveInLocalStorage("id",this.id);
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

	findObjectById(id,data , action){
		if(data){
			let objKeys= Object.keys(data);
			for (let index = 0; index < objKeys.length; index++) {
				if(""+id === objKeys[index]){
					if(action){
						return delete data[objKeys[index]];
					}
					return data[objKeys[index]];
				}else {
					let matchedObj = this.findObjectById(id, data[objKeys[index]].children , action);
					if(matchedObj){
						return matchedObj;
					}
					

				}
				
			}
		}

	}

	deleteNode(id){
		this.findObjectById(id , this.masterData , "delete");
		this.saveInLocalStorage(this.lsKey,this.masterData);
		document.getElementById(id).remove();
	}
}

const dataService= new DataService();
export default dataService;
