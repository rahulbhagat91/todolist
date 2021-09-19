let globalTaskData = [];
taskContents = document.getElementById("taskContents");
openTaskModal= document.getElementById("openTask");
const addCard = () => {
  const newTaskDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("imageURL").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("taskDescription").value,
  };

  taskContents.insertAdjacentHTML("beforeend",generateTaskCard(newTaskDetails));

  globalTaskData.push(newTaskDetails);
  saveToLocalStorage();
};

const generateTaskCard = ({ id, url, title, type, description }) =>
  `<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-outline-info" name=${id} onclick="editTask(this)">
                    <i class="fas fa-pencil-alt" name=${id} onclick="editTask(this)"></i>
                </button>
                <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
                    <i class="fas fa-trash-alt" name=${id} onclick="deleteTask(this)"></i>
                </button>
            </div>
        </div>
        <img class="card-img-top" alt="img" src="${url}">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card=text">${description}</p>
            <span class="badge bg-primary">${type}</span>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-primary float-end" data-bs-toggle="modal" data-bs-target="#openModal" name=${id} onclick="openTask(this)"  >Open Task</button>
        </div>
    </div>
</div>`;

const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify({ task: globalTaskData }));
};

const reloadTaskCards = () => {
  const localStorageCopy = JSON.parse(localStorage.getItem("tasks"));
  if (localStorageCopy) {
    globalTaskData = localStorageCopy["task"];
  }
  globalTaskData.map((cardData) => {
    taskContents.insertAdjacentHTML("beforeend", generateTaskCard(cardData));
  });
};

const deleteTask = (e) =>{
const targetID = e.getAttribute("name");
globalTaskData = globalTaskData.filter((cardData)=> cardData.id!==targetID);
saveToLocalStorage();
window.location.reload();
}

const editTask = (e) =>{
  const targetID = e.getAttribute("name");
  
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true");
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true");
  e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true");
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES";
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","saveEditTask(this)");
  saveToLocalStorage();
  }

  const saveEditTask = (e) =>{
    const targetID = e.getAttribute("name");
     const title = e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML;
     const type = e.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML;
     const description = e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML;
     console.log(globalTaskData);
     globalTaskData = globalTaskData.filter((cardData)=> {
     if(cardData.id==targetID){
        cardData.title = title;
        cardData.type = type;
        cardData.description = description;
     }
      return globalTaskData;
     })
     saveToLocalStorage();
     window.location.reload();
  }

  const openTask = (e) =>{
    const targetID = e.getAttribute("name");
    let url;
    globalTaskData.map((c)=>{
      if(targetID==c.id)
      url=c.url;
    })
    document.getElementById("openM").setAttribute("src",url);
  }