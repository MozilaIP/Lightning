window.onload = function(){

if (localStorage.getItem('Count') === undefined)
{
    localStorage.setItem('Count', 0);
}

var TabNames = [];
var URLs = [];

function save_options() {
  var Name = document.getElementById('tabname').value;
  var Url = document.getElementById('taburl').value;

  TabNames[Count] = Name;
  URLs[Count] = Url;


    localStorage.setItem("URL", JSON.stringify(URLs));
    localStorage.setItem("TabName", JSON.stringify(TabNames));

    var Count = localStorage.getItem('Count')+1;
    localStorage.setItem('Count', Count);

}

function Load(){
    //document.getElementById("prenick").innerHTML = "You current nickname:";
    //document.getElementById("Grid").innerHTML = '<div class="el"><div id="dropbox">'+localStorage.getItem("TabName")+'</div></div>';
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
//document.addEventListener('DOMContentLoaded', restore_options);
var SaveButton = document.getElementById('save');

if (SaveButton){
    SaveButton.addEventListener('click',save_options);}

    document.getElementById('clear').onclick = function ()
    {
        localStorage.clear();
    }

}
