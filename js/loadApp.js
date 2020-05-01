import dataService from "./data-service.js";

class LoadApp{

    load(){
        let data=  dataService.fetchFromLocalStorage(dataService.lsKey);
        if(data){
            dataService.setMasterData(data);
        }
    }
}

const loadApp= new LoadApp();
export default loadApp;