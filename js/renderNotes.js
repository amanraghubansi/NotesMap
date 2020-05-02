import dataService from "./data-service.js";

class RenderNotes {
    constructor(){
    }

    initRender(){
        this.parentEl = document.getElementById("parent");
        this.inputEl = document.getElementById("myInput");
        this.submitBtn = document.getElementById("submitBtn");
        this.searchEl = document.getElementById("mySearch");
        this.bodyEl = document.getElementsByTagName('body')[0];
        this.clearSearchBtn = document.getElementById("clearSearch");
        this.delAllBtn = document.getElementById("delAll");
        this.submitBtn.addEventListener("click", this.addParentNotes.bind(this), false);
        this.searchEl.addEventListener("keyup", this.searchNotes.bind(this), false);
        this.clearSearchBtn.addEventListener("click", this.resetSearch.bind(this), false);
        this.parentEl.addEventListener("click" , this.parentEvent.bind(this), false);
        this.delAllBtn.addEventListener("click" , this.deleteAllNotes.bind(this),false);
    }

    createNoteSkeleton(id,className,html){
        let el = document.createElement("div");
        let genId = id || dataService.fetchUniqueId();
        el.id = genId;
        el.classList=className;
        let elp = document.createElement("div");
        elp.classList = "note-text";
        let textNodeVal = document.createElement("span");
        textNodeVal.innerHTML = html;
        let editDiv = document.createElement("div");
        editDiv.classList="noshow edit-note";
        let inputEl =  document.createElement("input");
        inputEl.type = 'text';
        inputEl.classList="form-control";
        let editBtn = this.createBtn("Save" , "btn  m-r-s btn-primary", "save" , function(e){
            let parent = e.target.parentElement.parentElement.parentElement;
            let val = parent.children[0].children[1].children[0].value
            dataService.findAndUpdateInMasterData(parent.id,val);
            parent.children[0].children[0].classList="";
            parent.children[0].children[1].classList="edit-note noshow";
            parent.children[0].children[0].innerHTML = val;
        });
        let cancelBtn = this.createBtn("cancel" , "btn btn-danger", "cancl" , function(e){
            let parent = e.target.parentElement.parentElement.parentElement;
            parent.children[0].children[0].classList="";
            parent.children[0].children[1].classList="edit-note noshow";
        });
        editDiv.appendChild(inputEl);
        editDiv.appendChild(editBtn);
        editDiv.appendChild(cancelBtn);
        elp.appendChild(textNodeVal);
        elp.appendChild(editDiv);
        let noteFooter = document.createElement("div");
        noteFooter.classList = "note-footer";
        let btn1 = this.createBtn("Add Note" , "btn btn-primary" , "add");
        let btn2 = this.createBtn("Delete" , "btn btn-danger" , "del");
        let btn3 = this.createBtn("Edit" , "btn btn-default" , "edit");
        noteFooter.appendChild(btn1);
        noteFooter.appendChild(btn3);
        noteFooter.appendChild(btn2);

        let addPlaceholder = document.createElement("div");
        addPlaceholder.classList="add-actions";

        el.appendChild(elp);
        el.appendChild(noteFooter);
        el.appendChild(addPlaceholder);
        return el;
    }

    renderOneNode(id,txt,parent){
        let el =this.createNoteSkeleton(id,"note subNote",txt);
        parent.appendChild(el);
    }

    render(data,parentNode) {
        var self = this;
        Object.keys(data).forEach(function(idVal){
            if(idVal && typeof data[idVal] && data[idVal].children){
                let el = self.createNoteSkeleton(idVal,"note subNote",data[idVal].text);
                self.render(data[idVal].children,el);
                if(parentNode){
                    parentNode.appendChild(el);
                }else{
                    el.classList = "note";
                    self.parentEl.appendChild(el);
                }
            }else{
                if(parentNode){
                    self.renderOneNode(idVal,data[idVal].text,parentNode);
                }else{
                    let el = self.createNoteSkeleton(idVal,"note",data[idVal].text);
                    self.parentEl.appendChild(el);
                }
            }
        })
        
    }

    addParentNotes() {
        let val =this.inputEl.value;
        if(!val){
            alert("Please add note");
            return;
        }
        this.resetSearch();
        let el = this.createNoteSkeleton("","note",val);
        this.parentEl.appendChild(el);
        dataService.addNoteToMasterData(el.id,{text : el.children[0].innerText});
        this.inputEl.value = "";
    }

    createBtn(name , className , id ,fn){
        let btn = document.createElement("button");
        btn.innerHTML = name;
        btn.classList = className;
        btn.id = id;
        fn ? btn.addEventListener("click" , fn ) : null;
        return btn;
    }

    createChildNoteHander(e){
        let parentId = e.target.parentElement.parentElement.id;
        let parent = document.getElementById(parentId);
        this.inputAndSubmitForchild(parentId,parent,this);
    }

    editNoteHandler(e){
        let editDiv = document.getElementById(e.target.parentElement.parentElement.id).querySelector(".edit-note");
        let noteTextDiv = document.getElementById(e.target.parentElement.parentElement.id).querySelector(".note-text")
        editDiv.classList = editDiv.className.replace("noshow","");
        editDiv.children[0].value = noteTextDiv.children[0].innerText;
        noteTextDiv.children[0].classList="noshow";
    }
    
    deleteNoteHandler(e){
        dataService.deleteNode(e.target.parentElement.parentElement.id);
    }

    inputAndSubmitForchild(parentId, parent,ref){
        let panel = parent.querySelector(".add-actions");
        let addBtn = parent.querySelector("#add");
        addBtn.classList.add("btn-disabled");
        let el = document.createElement("input");
        el.type ="text";
        el.placeholder = "type sub note"
        el.classList="form-control";
        
        let btn = this.createBtn("Submit" , "btn btn-primary" , "submit" ,function(e){
            e.stopPropagation();
            let value = el.value;
            if(!value){
                alert("Please add note");
                return;
            }
            panel.innerHTML="";
            addBtn.classList.remove("btn-disabled");
            let elt = ref.createNoteSkeleton("","note subNote",value);
            parent.appendChild(elt);
            dataService.findNodeAndAddDataToMasterData(parentId,elt.id,elt.children[0].innerText);
            
        });

        let cancelBtn = this.createBtn("Cancel","btn btn-danger", "cancel" , function(){
            panel.innerHTML="";
            addBtn.classList.remove("btn-disabled");
        });
        
        panel.appendChild(el);
        panel.appendChild(btn);
        panel.appendChild(cancelBtn);
    }

    searchNotes(){
        let value = this.searchEl.value;
        if(!value){
            this.resetSearch();
            return;
        }
        this.clearSearchBtn.style.display = "inline-block";
        
        dataService.setSearchStatus(true);
        let data = dataService.getSearchResults(value);
        this.clearNotes();
        this.render(data,this.parentEl);

    }

    clearNotes(){
        this.parentEl.innerHTML="";
    }

    resetSearch(){
        this.searchEl.value = "";
        this.clearSearchBtn.style.display = "none";
        this.clearNotes();
        this.render(dataService.getMasterData());
    }

    parentEvent(e){
        if(e && e.target && e.target.parentElement && e.target.parentElement.parentElement && e.target.parentElement.parentElement.id){
            if(e.target.nodeName == "BUTTON" && e.target.classList && e.target.classList.contains("btn-primary")){
                this.createChildNoteHander(e);
            }else if( e.target.nodeName == "BUTTON" && e.target.classList && e.target.classList.contains("btn-danger") ){
                let delConfirm = confirm("Are you Sure Want to delete Note? \n If any Sub Notes , will be deleted.");
                if (delConfirm) {
                    this.deleteNoteHandler(e);
                }
            }else if(e.target.nodeName == "BUTTON" && e.target.classList && e.target.classList.contains("btn-default")){
                this.editNoteHandler(e);
            }
        }
    }

    deleteAllNotes(){
        let data = dataService.getMasterData();
        if(data && Object.keys(data) && Object.keys(data).length){
            let delConfirm = confirm("Are you Sure to delete every Notes?");
            if (delConfirm) {
                localStorage.clear();
                this.clearNotes();
                dataService.setMasterData({});
                dataService.setId(0);
            }
        }
    }

    
}

const renderNotes = new RenderNotes();
export default renderNotes;