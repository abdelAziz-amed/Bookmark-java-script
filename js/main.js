var siteName = document.getElementById("webSiteName");
var url = document.getElementById("webSiteUrl");
var addBtn = document.getElementById("addBtn");
var siteArray;

if (localStorage.getItem("setKey") == null) {
  var siteArray = [];
} else {
  siteArray = JSON.parse(localStorage.getItem("setKey"));
  dissplay();
}

function add() {
  var siteObject = {
    name: siteName.value,
    siteUrl: url.value,
  };
  siteArray.push(siteObject);
  localStorage.setItem("setKey", JSON.stringify(siteArray));
}

addBtn.onclick = function () {
  add();
  dissplay();
  clear();
};

function dissplay() {
  cartona = "";
  for (var i = 0; i < siteArray.length; i++) {
    cartona += `<div class="Books rounded-5 p-2 form-control">
            <h2 class="ps-3">${siteArray[i].name}</h2>
            <div>
            <a class="btn btn-info m-2" target="_blank " href="${siteArray[i].siteUrl}">visit</a>
            <button onClick="deleteFun(${i})" class="btn btn-danger m-2">Delete</button>
          

            </div>
            
            </div>`;
  }

  document.getElementById("results").innerHTML = cartona;
}

function deleteFun(index) {
  siteArray.splice(index, 1);
  dissplay();
  localStorage.setItem("setKey", JSON.stringify(siteArray));
}

function clear() {
  siteName.value = "";
  url.value = "";
}

function search(txt) {
  cartona = "";
  for (var i = 0; i < siteArray.length; i++) {
    if (siteArray[i].name.toUpperCase().includes(txt.toUpperCase())) {
      cartona += `<div class="Books rounded-5 p-2 form-control">
            <h2 class="ps-3">${siteArray[i].name}</h2>
            <div>
            <a class="btn btn-info m-2" target="_blank " href="${siteArray[i].siteUrl}">visit</a>
            <button onClick="deleteFun(${i})" class="btn btn-danger m-2">Delete</button>
            </div>
            
            </div>`;
    }

    document.getElementById("results").innerHTML = cartona;
  }
}

var nameAlert = document.getElementById("nameAlert");
var urlALert = document.getElementById("urlALert");

siteName.onkeyup = function () {
  var valid = /^[a-z A-Z]{2,8}$/;
  if (valid.test(siteName.value)) {
    addBtn.removeAttribute("disabled");
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
  } else {
    addBtn.disabled = "true";
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
  }
};

url.onkeyup = function () {
  var valid =
    /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

  if (valid.test(url.value)) {
    addBtn.removeAttribute("disabled");
    url.classList.add("is-valid");
    url.classList.remove("is-invalid");
    urlALert.classList.add("d-none");
  } else {
    addBtn.disabled = "true";
    url.classList.add("is-invalid");
    url.classList.remove("is-valid");
    urlALert.classList.remove("d-none");
  }
};
