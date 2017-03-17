/**
 * Created by ekoodi on 16.3.2017.
 */

var contacts = [];
var editMode = -1;

function onLoad() {
    if (typeof (Storage) !== 'undefined') {
      var  data = localStorage.getItem("data");
        if (data == null) {
            contacts = [];
            return;
        }
        contacts=JSON.parse(data);
        fillTable();
    }
}

function onClicked() {
    if (checkEmpyts()) {
        return;
    }
    var newContact = createContact();
    if (editMode > -1) {
        contacts[editMode] = newContact;
        document.getElementById("addButton").innerText = 'Add';
        editMode=-1;
    }
    else {
        contacts.push(newContact);
    }
    saveData();
    fillTable();
    emptyInputs();
}

function saveData() {
    localStorage.removeItem("data");
    localStorage.setItem("data",JSON.stringify( contacts));
}

function checkEmpyts() {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value == '') {
            alert('Hellou some input fields are empty :) ');
            return true;
        }
    }
}

function createContact() {
    return {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        street: document.getElementById('street').value,
        city: document.getElementById('city').value
    };
}

function fillTable() {
    var table = document.getElementById("resultsTable");
    table.innerHTML = "<tr><th>First name</th><th>Last name</th><th>Phone</th><th>Address</th><th></th><th></th></tr>";
    for (var i = 0; i < contacts.length; i++) {

        var row = table.insertRow(table.rows.length);
        var fName = row.insertCell(0);
        var lName = row.insertCell(1);
        var pho = row.insertCell(2);
        var adress = row.insertCell(3);
        var edit = row.insertCell(4);
        var del = row.insertCell(5);

        fName.innerText = contacts[i].firstName;
        lName.innerText = contacts[i].lastName;
        pho.innerText = contacts[i].phone;
        adress.innerHTML= googleAdress(contacts[i].street ,contacts[i].city);// contacts[i].street + ' , ' + contacts[i].city;
        edit.innerHTML = '<button class="btnEdit" onclick="onEdit(' + i + ')">Edit</button>';
        del.innerHTML = '<button class="btnDelete" onclick="onDelete(' + i + ')">Delete</button>';

        if (i % 2 == 0) {
            row.className = "evenRow";
        }
        else {
            row.className = "oddRow";
        }
    }
}

function googleAdress(street, city) {
    return '<a href="https://www.google.fi/maps/place/'+street+',+'+city+'" target="_blank">'+street + ' , ' + city+'</a>';
}

function emptyInputs() {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function onEdit(editIndex) {
    document.getElementById("firstName").value = contacts[editIndex].firstName;
    document.getElementById("lastName").value = contacts[editIndex].lastName;
    document.getElementById("phone").value = contacts[editIndex].phone;
    document.getElementById("street").value = contacts[editIndex].street;
    document.getElementById("city").value = contacts[editIndex].city;
    document.getElementById("addButton").innerText = 'Edit';
    editMode = editIndex;
}

function onDelete(delIndex) {
    if(editMode>-1){
        alert('Hey, edit first');
        return;
    }
    var editTable = [];
    for (var i = 0; i < contacts.length; i++) {
        if (i != delIndex) {
            editTable.push(contacts[i]);
        }
    }
    contacts = editTable;
    saveData();
    fillTable();
}