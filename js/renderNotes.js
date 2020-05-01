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

    createNoteDiv(id,className,html){
        let el = document.createElement("div");
        el.id = id;
        el.classList = className;
        el.innerHTML= html;
        return el;
    }

    createNoteSkeleton(id,className,html){
        let el = document.createElement("div");
        let genId = id || dataService.fetchUniqueId();
        el.id = genId;
        el.innerHTML = html;
        el.classList=className;
        let btn1 = this.createBtn("Add Note" , "add" , this.createChildNoteHander.bind(this));
        let btn2 = this.createBtn("Delete" , "delete" , this.btnDelClicked.bind(this));
        let btn3 = this.createBtn("Edit" , "edit" , this.btnEditClicked.bind(this));
        el.appendChild(document.createElement("br"));
        el.appendChild(btn1);
        el.appendChild(btn2);
        el.appendChild(btn3);
        return el;
    }

    renderOneNode(id,txt,parent){
        let el =this.createNoteSkeleton(id,"note",txt);
        parent.appendChild(el);
        console.log(parent);
    }

    render(data,parentNode) {
        var self = this;
        Object.keys(data).forEach(function(idVal){
            if(idVal && typeof data[idVal] && data[idVal].children){
                let el = self.createNoteSkeleton(idVal,"note",data[idVal].text);
                self.render(data[idVal].children,el);
                if(parentNode){
                    parentNode.appendChild(el);
                }else{
                    self.bodyEl.appendChild(el);
                }
            }else{
                self.renderOneNode(idVal,data[idVal].text,parentNode);
            }
        })
        console.log("forEach round completed" , parentNode , data);

        
    }

    addParentNotes() {
        // this.createNote(this.inputEl.value,this.parentEl);
        let val =this.inputEl.value;
        let el = this.createNoteSkeleton("","note",val);
        this.parentEl.appendChild(el);
        dataService.addNoteToMasterData(el.id,{txt : el.textContent});
        this.inputEl.value = "";
    }

    // createNote(val,parent) {
    //     let el = this.createNoteSkeleton("","note",val);
    //     parent.appendChild(el);
    //     dataService.addNoteToMasterData(el.id,{txt : el.textContent});
        
    // }

    createBtn(name , className , fn){
        let btn = document.createElement("button");
        btn.innerHTML = name;
        btn.classList = className;
        btn.addEventListener("click" , fn );
        return btn;
    }

    counter = 1;
    value = this.counter + "val"; 
    createChildNoteHander(e){
        console.log("createChildNoteHander");
        console.log(e.target.parentElement.id);
        this.addChild(e.target.parentElement.id,document.getElementById(e.target.parentElement.id),+this.counter+this.value);
        this.counter++;
    }

    btnEditClicked(e){
        console.log("btnEditClicked");
        console.log(e.target.parentElement.id);
    }
    btnDelClicked(e){
        console.log("btnDelClicked");
        console.log(e.target.parentElement.id);
        

    }

    addChild(parentId, parent,val){
        // let el = this.createNoteSkeleton("","note subNote",val);
        // parent.appendChild(el);
        // dataService.findNodeAndAddDataToMasterData(parentId,el.id,el.textContent);
        this.inputAndSubmitForchild(parentId,parent,this);
    }

    inputAndSubmitForchild(parentId, parent,ref){

        let el = document.createElement("input");
        let btn = this.createBtn("Submit" , "" , function(){
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
            dataService.findNodeAndAddDataToMasterData(parentId,elt.id,elt.textContent);
            
        });
        parent.appendChild(el);
        parent.appendChild(btn);
    }

    
}

const renderNotes = new RenderNotes();
export default renderNotes;