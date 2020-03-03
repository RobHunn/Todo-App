window.addEventListener('load', init)

function init(){
  document.querySelector('.needs-validation').addEventListener('submit', handelSubmit);
  document.querySelector('.todo-list').addEventListener('click', handelClick);
}

let storage = [];

// check localStorage on page load
if(localStorage.getItem('todos')){
  let myObj = JSON.parse(localStorage.getItem("todos"));
  let todoList = document.querySelector(".todo-list");
  storage = myObj.slice(); 
  let output = '';
    myObj.map((e,i) =>{
      output+= ` 
      <li id="${e.uuId}" class="${e.completed}">
        <div class="form-check">
          <label class="form-check-label">
            <input class="checkbox" type="checkbox" checked="">
            ${e.todo}
            <i class="input-helper"></i>
          </label>
        </div>
        <i class="remove fas fa-trash-alt"></i>
      </li>
      `;
    })
  todoList.innerHTML = output;

}

// create new todo and save to localStorage
const handelSubmit = (e) =>{
  e.preventDefault();
  let clear = document.querySelector('.needs-validation')
  let formInput = document.querySelector("#myInput").value; // input value
  let todoList = document.querySelector(".todo-list"); // ul list
  let li = document.createElement('li');
  let d = new Date()
  let uuId = d.getTime();   
  li.setAttribute("id", "uuId");
  let output = 
      ` 
        <div class="form-check">
          <label class="form-check-label">
            <input class="checkbox" type="checkbox">
            ${formInput}
            <i class="input-helper"></i>
          </label>
        </div>
        <i class="remove fas fa-trash-alt"></i>
      `;
  todoList.appendChild(li);
  li.innerHTML = output;
  storage.push({ todo : formInput, completed : '', uuId : uuId });
  localStorage.setItem("todos", JSON.stringify(storage));
  clear.reset();
};

// the crazy looking if else at the bottom is because of the fontawesome svg i used for delete btn, its tag name is 'svg' /// but its just a thin wrapper the inner image is a path tag sooo..... yeah... pain in the butt... basicly 2 delete buttons....

//function below handles onclick for line strike through aka task completed and delete, also updates local storage on delete and task completed.

const handelClick = (e)=>{
  let node = e.target.tagName
    if(node === 'INPUT'){//top half task complete
        e.target.parentElement.parentElement.parentElement.classList.toggle('completed');
        let li = e.target.parentElement.parentElement.parentElement
        let id = li.getAttribute('id')
        id = parseInt(id)
        let todo = li.innerText
        let myObj = JSON.parse(localStorage.getItem("todos"));
        let classN = li.classList.value;
        let objectFound = myObj.findIndex(obj => obj.uuId == id);
        let alteredObj = { 'todo' : todo, 'completed' : classN, uuId : id }
        myObj.splice(objectFound,1,alteredObj)
        storage = myObj.slice();
        localStorage.setItem("todos", JSON.stringify(storage)); 
      }else if(node === 'svg' || node === 'path' || node === 'PATH'){// handle delete
        if( node === 'path' || node === 'PATH' ){ 
        let li = e.target.parentElement.parentElement
        let id = li.getAttribute('id')
        id = parseInt(id)
        let myObj = JSON.parse(localStorage.getItem("todos"));
        let objectFound = myObj.findIndex(obj => obj.uuId == id);
        let terminated = myObj.splice(objectFound,1)
        console.log(terminated);
        storage = myObj.slice();
         e.target.parentElement.parentElement.remove()
        localStorage.setItem("todos", JSON.stringify(storage)); 
        }else if (node === 'svg'){ // second delete btn lolzsssss
        let li = e.target.parentElement
        let id = li.getAttribute('id')
        id = parseInt(id)
        let myObj = JSON.parse(localStorage.getItem("todos"));
        let objectFound = myObj.findIndex(obj => obj.uuId == id);
        let terminated = myObj.splice(objectFound,1)
        console.log(terminated);
        storage = myObj.slice();
        e.target.parentElement.remove()
        localStorage.setItem("todos", JSON.stringify(storage)); 
        }else{
          return;
        }
    }
  }