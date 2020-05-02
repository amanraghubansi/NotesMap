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

	setSearchStatus(flag){
		this.searchInProgress = !!flag;
	}
	getSearchResults(val){
		let data = this.getMasterData();	
		let temp = {};
		this.filterData(val,temp,data);
		return temp;
		
	}

	filterData(val,res,data){
		if(data){
			let objKeys= Object.keys(data);
			for (let index = 0; index < objKeys.length; index++) {
				if(data[objKeys[index]].children){
					this.filterData(val,res, data[objKeys[index]].children);
					if(data[objKeys[index]].text.indexOf(val) !== -1){
						res[objKeys[index]] = {text : data[objKeys[index]].text};
					}
				}else if(data[objKeys[index]].text.indexOf(val) !== -1){
					res[objKeys[index]] = {text : data[objKeys[index]].text};
				}
				
			}
		}
	}

	findAndUpdateInMasterData(parentId,text){
		let dataObj = this.findObjectById(parentId,this.masterData);
		dataObj.text = text;
		this.saveInLocalStorage(this.lsKey,this.masterData);
	}
}

const dataService= new DataService();
export default dataService;
