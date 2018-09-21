
    // let serchResponseJson = this.responseText;
    // let searchValue = document.getElementById("search-inp").value;
    // let pagesValue = document.getElementById("pages-inp").value;

    function myFunction(serchResponseJson) {
    const responseArray = JSON.parse(serchResponseJson);
    let table;  
    for (let i = 0; i < responseArray.length; i++) { 
    table +=
     `<div id="tab">
           <div style="flex-grow: 10 ; text-align: left; padding-left: 10px" class="section">
           <p>${responsArray[i].name}</p>
            </div>
           <div style="flex-grow: 1" class="section">
           <a href="${responseArray[i].url}">Лінк</a>
           </div>
           <div style="flex-grow: 1" class="section">
            <p>${responseArray[i].views}</p>
           </div>           
       </div>`
  }
  document.getElementById("tab").innerHTML = table;
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
document.getElementById("searchButton").onclick = displayResult;