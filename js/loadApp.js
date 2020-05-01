import dataService from "./data-service";


class LoadApp{
	constructor(){
    }

    load(){
        let data=  dataService.fetchFromLocalStorage(dataService.lsKey);
        if(data){
            dataService.setMasterData(data);
        }
    }
}

const loadApp= new LoadApp();
export default loadApp;
