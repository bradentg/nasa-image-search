var goButton = document.getElementById('go');
var searchBar = document.getElementById('big-search-bar');
var searchTerm = "";

// Button should start disabled, unless there is text in input box
window.onload = function() {
  if (searchBar.value == ""){
    goButton.disabled = true;
  } else {
    goButton.disabled = false;
  }

}

// Button only enabled when input not empty
searchBar.oninput = function(){
  if (searchBar.value != ""){
    goButton.disabled = false;
  } else {
    goButton.disabled = true;
  }
}

// Begin search
goButton.onclick = function(){
  searchTerm = searchBar.value;
}
