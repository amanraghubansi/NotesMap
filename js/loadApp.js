import dataService from "./data-service.js";
import renderNotes from "./renderNotes.js";

class LoadApp{

    load(){
        // localStorage.clear();
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