/**
 * Created by ekoodi on 20.3.2017.
 */

contactsApp.contactStore = (function () {
    var contactLocalStorageKey = 'ca-storageKey';

    if (!localStorage.getItem(contactLocalStorageKey)) {
        localStorage.setItem(contactLocalStorageKey, JSON.stringify([]));
    }

    function loadLocalStorage() {
        var data = localStorage.getItem(contactLocalStorageKey);
        return JSON.parse(data);
    }

    function saveContactsToLocalStorage(contacts) {
        localStorage.setItem(contactLocalStorageKey, JSON.stringify(contacts));
    }

    function removeItemFromList(index) {
        var editTable = [];
        var contacts = loadLocalStorage();
        for (var i = 0; i < contacts.length; i++) {
            if (i != index) {
                editTable.push(contacts[i]);
            }
        }
        saveContactsToLocalStorage(editTable);
    }

    function editItemInList(contact, index) {
        var contacts = loadLocalStorage();
        contacts[index] = contact;
        saveContactsToLocalStorage(contacts);
    }

    return {
        saveContact: function (contact) {
            var contacts = loadLocalStorage();
            contacts.push(contact);
            saveContactsToLocalStorage(contacts);
        },
        loadContacts: function () {
            return loadLocalStorage();
        },
        removeItem: function (index) {
            removeItemFromList(index);
        },
        editItem: function (contact, index) {
            editItemInList(contact, index);
        }
    }
})();