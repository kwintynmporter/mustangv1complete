
var contactReturn = [];
var mustangContacts= [];
var contactLoad = 0;
var response = 0; 

function initApplication() {
    console.log('Mustang Lite - Starting!'); 
}

function loadIndex() {
    var mustRequest = new XMLHttpRequest();
    mustRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    mustRequest.onload = function() {
        console.log("Index JSON:" + mustRequest.responseText);
        document.getElementById("indexID").innerHTML = mustRequest.responseText;
        contactIndex = JSON.parse(mustRequest.responseText);
        for (i=0; i<contactIndex.length; i++) {
            contactReturn.push(contactIndex[i].ContactURL);
        }
        console.log("contactReturn: " + JSON.stringify(contactReturn));
    }

// Error Checking -v 
    data = JSON.parse(response, function (key, value) {
        var type;
        if(response) {
            try {
                a = JSON.parse(response);
            } catch(e) {
                alert(e); 
            }
        }
        return value;
    });
    mustRequest.send();
}

function loadContacts() {
  
    mustangContacts.length = 0;
    contactLoad = 0;
// The contactReturn here -v was another one of the lines
// that were giving me the error. I just had a typo. 
    if (contactReturn.length > contactLoad) {
        loadNextContact(contactReturn[contactLoad]);
    }
}

function loadNextContact(URL) {
    console.log("URL: " + URL);
    mustangContactRequest = new XMLHttpRequest();
    mustangContactRequest.open('GET', URL);
    mustangContactRequest.onload = function() {
        console.log(mustangContactRequest.responseText);
        var contactLists;
        contactLists = JSON.parse(mustangContactRequest.responseText);
        console.log("Contact: " + contactLists.firstName);

// The line here -v is what was causing my code not to work. 

        mustangContacts.push(contactLists);
        document.getElementById("contactsID").innerHTML = JSON.stringify(mustangContacts);

        contactLoad++;
        if (contactReturn.length > contactLoad) {
            loadNextContact(contactReturn[contactLoad]);
        }
    }

    mustangContactRequest.send();
}

function contactsLog() {
    console.log(mustangContacts);
}


