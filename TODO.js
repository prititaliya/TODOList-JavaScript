
var alertShowed = false;
var isEdited = false
var nameToBeDeleted;
let submitButton = document.getElementById("submitButton");
let taskName = document.getElementById("taskName");
let taskDescription = document.getElementById("taskDescription");
let dueDate = document.getElementById("dueDate")
var body = header.parentNode;
var mainBody = document.getElementById("mainForm")
submitButton.addEventListener("click", addTask);

var currentMinuts;
var currentHour;
var currentDay=new Date().toISOString().slice(0, 10);
if((Number(new Date().toISOString().slice(12, 13)) + 5)>12){
    let hrs=12-Number(new Date().toISOString().slice(12, 13));
    let hoursToBeAdded=5-hrs;
    currentHour=0+hoursToBeAdded;
}else{
    var currentHour=(Number(new Date().toISOString().slice(12, 13)) + 5);
    console.log("ews")
}
if((Number(new Date().toISOString().slice(14, 16)) + 30)>60){

    let mins=60-Number(new Date().toISOString().slice(14, 16));
    if(currentHour+=1>12){
        currentHour=1
    }else{
        currentHour++;
    }
    let minsToBeAdded=30-mins;
    currentMinuts=0 + minsToBeAdded
}else{
     currentMinuts=(Number(new Date().toISOString().slice(14, 16)) + 30)
     
}
var todaySDateAndTime = ( currentDay.toString()+"T0"+ currentHour.toString() + ":" + currentMinuts.toString())
console.log(todaySDateAndTime)
// var currentDate=(new Date().toISOString().slice(0, 10) 

var keys = []
let allTasks = allStorage()
for (let i = 0; i < Object.keys(allTasks).length; i++) {
    keys.push(Object.keys(allTasks)[i])
}
let informationObject = {
    "taskName": "",
    "taskDescription": "",
    "dueDate": ""
}

showList();

function showList() {
    let List = document.createElement("div");
    List.className = "row container-fluid mx-3"
    let i = 0;
    while (i < keys.length) {


        let mainCard = document.createElement("div");
       


        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let cardTitle = document.createElement("h5");


        let cardDescription = document.createElement("p");
        cardDescription.className = "card-text";

        let dueDate = document.createElement("p");
        cardDescription.className = "card-text";

        let buttonFormat = document.createElement("div");
        buttonFormat.className = "row container";

        let deleteButton = document.createElement("button");
        deleteButton.className = "deleteButton btn btn-danger my-2";
        deleteButton.setAttribute("onclick", `deleteButtonClicked("${JSON.parse(allTasks[keys[i]]).taskName}")`)
        deleteButton.innerHTML = "Delete"
        deleteButton.id = "delet" + JSON.parse(allTasks[keys[i]]).taskName;

        let editButton = document.createElement("button");
        editButton.className = "editButton btn btn-primary";
        editButton.innerHTML = "Edit"
        editButton.setAttribute("onclick", `editButtonClicked("${JSON.parse(allTasks[keys[i]]).taskName}")`)
        editButton.setAttribute("data-bs-toggle", "modal");
        editButton.setAttribute("data-bs-target", "#staticBackdrop")
        editButton.id = "edit" + JSON.parse(allTasks[keys[i]]).taskName;

        buttonFormat.appendChild(deleteButton);
        buttonFormat.appendChild(editButton);

        cardTitle.className = "card-title " + JSON.parse(allTasks[keys[i]]).taskName;
        cardTitle.innerHTML = JSON.parse(allTasks[keys[i]]).taskName;
        cardDescription.innerHTML = JSON.parse(allTasks[keys[i]]).taskDescription;
        dueDate.innerHTML = JSON.parse(allTasks[keys[i]]).dueDate;
        let dueDateTime = JSON.parse(allTasks[keys[i]]).dueDate;
        if (dueDateTime < todaySDateAndTime) {
            console.log("due "+dueDateTime)
            console.log("today "+todaySDateAndTime)
            mainCard.setAttribute("style", "width: 18rem;")
            mainCard.className = "card row my-3 mx-2 alert-danger";
        } else {
            let dueHour=dueDateTime.toString().slice(12, 13);
            let dueMinutes=dueDateTime.toString().slice(14, 16);
            let dueDay=dueDateTime.toString().slice(0, 10) 
            console.log(dueDay==currentDay)
            console.log(dueHour)
            console.log(dueMinutes)
            console.log(dueDateTime)
            if (currentDay==dueDay) {
                mainCard.className = "card row my-3 mx-2 alert-warning";
                mainCard.setAttribute("style", "width: 18rem;")
            } else {
                mainCard.className = "card row my-3 mx-2 alert-success";
                mainCard.setAttribute("style", "width: 18rem;")
            }

        }
        cardBody.appendChild(cardTitle);
        mainCard.appendChild(cardBody);
        mainCard.appendChild(cardDescription)
        mainCard.appendChild(dueDate);
        mainCard.appendChild(buttonFormat)
        List.appendChild(mainCard)
        mainBody.appendChild(List)
        i++;
    }
}

function editButtonClicked(e) {
    nameToBeDeleted = JSON.parse(allTasks[e]).taskName;
    var edittaskname = document.getElementById("editedTaskName");
    let editdescription = document.getElementById("editedTaskDescription");
    let editdatetime = document.getElementById("editedDueDate");
    edittaskname.value = JSON.parse(allTasks[e]).taskName;
    editdescription.value = JSON.parse(allTasks[e]).taskDescription;
    editdatetime.value = JSON.parse(allTasks[e]).dueDate;
    let updateButton = document.getElementById("updateButton")
    isEdited = true
    updateButton.addEventListener("click", addTask)

}
function addTask(e) {
    if (isEdited) {

        var taskName = document.getElementById("editedTaskName").value
        var taskDescription = document.getElementById("editedTaskDescription").value
        var dueDate = document.getElementById("editedDueDate").value;
        localStorage.removeItem(nameToBeDeleted)


    } else {
        var taskName = document.getElementById("taskName").value
        var taskDescription = document.getElementById("taskDescription").value
        var dueDate = document.getElementById("dueDate").value;
    }


    if (taskName.length != 0 && taskDescription.length != 0 && dueDate.length != 0) {
        let informationObject = {
            "taskName": taskName,
            "taskDescription": taskDescription,
            "dueDate": dueDate
        };

        localStorage.setItem(informationObject.taskName, JSON.stringify(informationObject));
        if (localStorage.getItem(informationObject.taskName)) {
            if (alertShowed == true) {
                alertShowed = false;
                showAlert("Task have been added sucessfully", "success")
                document.getElementById("form").reset();
                location.reload();
            } else {
                showAlert("Task have been added sucessfully", "success")
                document.getElementById("form").reset();
                location.reload();
            }

        }

    } else {
        showAlert("please enter all the corret information", "warning");

    }
}

function showAlert(text, alertType) {

    if (alertShowed == false) {
        let createdButton = document.createElement("button")
        createdButton.className = "btn-close";
        createdButton.id = "closeButton";
        createdButton.setAttribute("type", "button")
        createdButton.setAttribute("data-bs-dismiss", "alert")
        createdButton.setAttribute("aria-label", "Close")

        let header = document.getElementById("header");
        let element = document.createElement("div")
        element.className = `alert alert-${alertType} alert-dismissible fade show`;
        element.setAttribute("role", "alert")
        element.innerHTML = text
        element.appendChild(createdButton)


        body.prepend(element)
        alertShowed = true


        // this is for if user click continuesoly click on add task button without filling information and this will prevent from showing multiple alert 
        let closeButton = document.getElementById("closeButton");
        closeButton.addEventListener("click", function (e) {
            alertShowed = false

        })
    }
}



function allStorage() {

    var values = {},
        keys = [];
    var rowval = {}


    let length = Object.keys(localStorage).length

    for (let i = 0; i < length; i++) {
        keys.push(Object.keys(localStorage)[i])

    }
    i = keys.length;
    while (i--) {
        // values.push(keys[i], localStorage.getItem(keys[i]) );
        let currentKey = Object.keys(localStorage)[i];
        let val = localStorage.getItem(currentKey)
        rowval = {
            [currentKey]: val
        }
        Object.assign(values, rowval)
    }
    return values;
}

function deleteButtonClicked(e) {

    localStorage.removeItem(e)

    location.reload();

}
