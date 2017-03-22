/**
 * Created by ekoodi on 20.3.2017.
 */
contactsApp.buttons = function () {

    function onClicked() {
        var contact = buildInputContact();

        if (modifyIndex > -1) {
            onEdit(modifyIndex);
        }
        else {
            contactsApp.contactStore.saveContact(contact);
        }
        contactsApp.contactsTable.fillTable();
        modifyIndex = -1;
        document.getElementById("addButton").innerText = 'Add';
        emptyInputs();
    }

    function emptyInputs() {
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    }

    function buildInputContact() {

        var contact = contactsApp.contact(
            document.getElementById('firstName').value,
            document.getElementById('lastName').value,
            document.getElementById('phone').value,
            document.getElementById('adress').value,
            document.getElementById('city').value
        );
        return contact;
    }

    function startEdit(editIndex) {
        var contacts = contactsApp.contactStore.loadContacts();
        document.getElementById("firstName").value = contacts[editIndex].firstName;
        document.getElementById("lastName").value = contacts[editIndex].lastName;
        document.getElementById("phone").value = contacts[editIndex].phone;
        document.getElementById("adress").value = contacts[editIndex].adress;
        document.getElementById("city").value = contacts[editIndex].city;
        document.getElementById("addButton").innerText = 'Edit';
    }

    function onEdit(editIndex) {
        var contact = buildInputContact();
        contactsApp.contactStore.editItem(contact, editIndex);
        contactsApp.contactsTable.fillTable();
    }

    function onDelete(delIndex) {
        if (modifyIndex > -1) {
            alert('Hello, edit first');
            return;
        }
        contactsApp.contactStore.removeItem(delIndex);
        contactsApp.contactsTable.fillTable();
    }

    return {
        onClicked: function () {
            onClicked();
        },
        startEdit: function (editIndex) {
            modifyIndex = editIndex;
            startEdit(editIndex);
        },
        onDelete: function (delIndex) {
            onDelete(delIndex);
        }
    }

}