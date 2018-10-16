
function myFunction(serchResponseJson) {
    const responseArray = JSON.parse(serchResponseJson);
    let table = "";
    for (let i = 0; i < responseArray.length; i++) {
        table +=
            `<div class="tab">
           <div class="section">
           <p>${i + 1}</p>
            </div>
           <div class="section">
           <p><a href="${responseArray[i].url}" target="_blank">${responseArray[i].name}</a></p>
           </div>
           <div class="section">
            <p>${responseArray[i].views}</p>
           </div>
       </div>`
    }
        document.getElementById("table").innerHTML = table;
        document.getElementById("preloader").style.visibility = "hidden"

}

function displayResult() {
    let searchValue = document.getElementById("search-inp").value;
    let pagesValue = document.getElementById("pages-inp").value;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            myFunction(this.responseText);
        }
    };

    xmlhttp.open("GET", "/api?uri= " + searchValue + "&pages=" + pagesValue, true);
    xmlhttp.send();
}

const preloaderVisible = () => document.getElementById("preloader").style.visibility="visible";

let searchButton = document.getElementById("searchButton");

searchButton.addEventListener('click',preloaderVisible);
searchButton.addEventListener('click',displayResult);








