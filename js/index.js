import loadApp from "./loadApp.js";
import renderNotes from "./renderNotes.js";
import dataService from "./data-service.js";

loadApp.load();
renderNotes.initRender();
renderNotes.render(dataService.getMasterData());





