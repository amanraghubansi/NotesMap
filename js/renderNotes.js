import dataService from "./data-service.js";

class RenderNotes {
    constructor(){
        // console.log(this);
        // var this = this;
    }


    initRender(){
        // console.log(this,this);
        this.parentEl = document.getElementById("parent");
        this.inputEl = document.getElementById("myInput");
        this.searchEl = document.getElementById("mySearch");
        this.bodyEl = document.getElementsByTagName('body')[0];
        document.getElementById("submitBtn").addEventListener("click", this.addParentNotes.bind(this), false);
        document.getElementById("serachBtn").addEventListener("click", this.serachNote.bind(this), false);
    }

    createNoteSkeleton(id,className,html){
        let el = document.createElement("div");
        let genId = id || dataService.fetchUniqueId();
        el.id = genId;
        el.classList=className;
        let elp = document.createElement("div");
        elp.innerHTML = html;
        elp.classList = "note-text";
        
        let noteFooter = document.createElement("div");
        noteFooter.classList = "note-footer";
        let btn1 = this.createBtn("Add Note" , "add btn btn-primary" , this.createChildNoteHander.bind(this));
        let btn2 = this.createBtn("Delete" , "delete btn btn-danger" , this.deleteNoteHandler.bind(this));
        let btn3 = this.createBtn("Edit" , "edit btn btn-default" , this.editNoteHandler.bind(this));
        // el.appendChild(document.createElement("br"));
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
                    self.bodyEl.appendChild(el);
                }
            }else{
                if(parentNode){
                    self.renderOneNode(idVal,data[idVal].text,parentNode);
                }else{
                    let el = self.createNoteSkeleton(idVal,"note",data[idVal].text);
                    self.bodyEl.appendChild(el);
                }
            }
        })
        
    }

    addParentNotes() {
        // this.createNote(this.inputEl.value,this.parentEl);
        let val =this.inputEl.value;
        if(!val){
            alert("Please add note");
            return;
        }
        let el = this.createNoteSkeleton("","note",val);
        this.parentEl.appendChild(el);
        dataService.addNoteToMasterData(el.id,{text : el.children[0].innerText});
        this.inputEl.value = "";
    }

    createBtn(name , className , fn){
        let btn = document.createElement("button");
        btn.innerHTML = name;
        btn.classList = className;
        btn.addEventListener("click" , fn );
        return btn;
    }

    createChildNoteHander(e){
        let parentId = e.target.parentElement.parentElement.id;
        let parent = document.getElementById(parentId);
        this.inputAndSubmitForchild(parentId,parent,this);
    }

    editNoteHandler(e){
        console.log("editNoteHandler");
    }
    deleteNoteHandler(e){
        console.log("deleteNoteHandler");
        dataService.deleteNode(e.target.parentElement.parentElement.id);
    }

    // addChild(parentId, parent){
    //     // let el = this.createNoteSkeleton("","note subNote",val);
    //     // parent.appendChild(el);
    //     // dataService.findNodeAndAddDataToMasterData(parentId,el.id,el.textContent);
    //     this.inputAndSubmitForchild(parentId,parent,this);
    // }

    inputAndSubmitForchild(parentId, parent,ref){
        let panel = parent.querySelector(".add-actions");
        let addBtn = parent.querySelector(".btn-primary");
        addBtn.classList.add("btn-disabled");
        let el = document.createElement("input");
        el.type ="text";
        el.placeholder = "type sub note"
        el.classList="form-control";
        
        let btn = this.createBtn("Submit" , "btn btn-primary" , function(){
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

        let cancelBtn = this.createBtn("Cancel","btn btn-danger",function(){
            panel.innerHTML="";
            addBtn.classList.remove("btn-disabled");
        });
        
        panel.appendChild(el);
        panel.appendChild(btn);
        panel.appendChild(cancelBtn);
    }

    serachNote(){

    }

    
}

const renderNotes = new RenderNotes();
export default renderNotes;