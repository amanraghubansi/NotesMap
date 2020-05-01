import loadApp from "./loadApp.js";
import renderNotes from "./renderNotes.js";
import dataService from "./data-service.js";
// import dataService from "./data-service.js";

// Init App : Fetch Data from ls
loadApp.load();
renderNotes.initRender();
renderNotes.render(dataService.getMasterData());





