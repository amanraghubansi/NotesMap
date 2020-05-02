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
        this.bodyEl = document.getElementsByTagName('body')[0];
        document.getElementById("submitBtn").addEventListener("click", this.addParentNotes.bind(this), false);
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
        console.log(e.target.parentElement.id);
    }
    deleteNoteHandler(e){
        console.log("deleteNoteHandler");
        console.log(e.target.parentElement.id);
        

    }

    // addChild(parentId, parent){
    //     // let el = this.createNoteSkeleton("","note subNote",val);
    //     // parent.appendChild(el);
    //     // dataService.findNodeAndAddDataToMasterData(parentId,el.id,el.textContent);
    //     this.inputAndSubmitForchild(parentId,parent,this);
    // }

    inputAndSubmitForchild(parentId, parent,ref){

        let el = document.createElement("input");
        el.type ="text";
        el.classList="form-control";
        
        let btn = this.createBtn("Submit" , "btn btn-primary" , function(){
            // let ParenP = document.getElementById(parentId);
            // let pel = ParenP.getElementsByTagName("p")[0];
            // pel ? pel.remove() : null;
            let elp = document.createElement("p");
            elp.innerHTML = el.value;
            let value = el.value;
            // parent.appendChild(elp);
            el.remove();
            btn.remove();

            let elt = ref.createNoteSkeleton("","note subNote",value);
            parent.appendChild(elt);
            dataService.findNodeAndAddDataToMasterData(parentId,elt.id,elt.children[0].innerText);
            
        });
        let panel = parent.querySelector(".add-actions");
        panel.appendChild(el);
        panel.appendChild(btn);
    }

    
}

const renderNotes = new RenderNotes();
export default renderNotes;