import dataService from "./data-service.js";

class LoadApp{

    load(){
        let data=  dataService.fetchFromLocalStorage(dataService.lsKey);
        if(data){
            dataService.setMasterData(data);
        }
        let idVal=  dataService.fetchFromLocalStorage("id");
        dataService.setId(idVal);
    }
}

const loadApp= new LoadApp();
export default loadApp;