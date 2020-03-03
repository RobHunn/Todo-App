// my logic without localStorage. See localStorage.js for the completed version.
window.addEventListener('load', init)

function init(){
  document.querySelector('.needs-validation').addEventListener('submit', handelSubmit);
  document.querySelector('.todo-list').addEventListener('click', handelClick);
}

const handelSubmit = (e) =>{
  e.preventDefault();
  let clear = document.querySelector('.needs-validation')
  let formInput = document.querySelector("#myInput").value; // input value
  let todoList = document.querySelector(".todo-list"); // ul list
  let li = document.createElement('li');
  let output = 
      ` 
        <div class="form-check">
          <label class="form-check-label">
            <input class="checkbox" type="checkbox">
            ${formInput}
            <i class="input-helper"></i>
          </label>
        </div>
        <i style="font-size: 888px !important;" class="remove fas fa-trash-alt"></i>
      `;
  todoList.appendChild(li);
  li.innerHTML = output;
  clear.reset();
};

//the crazy looking if else is because of the fontawsome svg i used for delete btn, its tag name is 'svg' but thats a very thin wrapper the inner image is a path tag sooo..... yeah...
const handelClick = (e)=>{
  let node = e.target.tagName
    if(node === 'INPUT'){
        let x = e.target.parentElement.parentElement.parentElement.classList.toggle('completed');
        console.log('i am x', x);  
      }else if(node === 'svg' || node === 'path' || node === 'PATH'){
        if( node === 'path' || node === 'PATH' ){
            e.target.parentElement.parentElement.remove()
        }else if (node === 'svg'){
           e.target.parentElement.remove()
        }else{
          return;
        }
    }
  }