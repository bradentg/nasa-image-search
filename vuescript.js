let store = {
  searchData: {
    searchTerm: ''
  }
}

var bigSearch = new Vue({
  el: '#bar-button-container',
  data: {
    searchData: store.searchData,
    isButtonDisabled: true
  },
  methods: {
    buttonAction: function() {
      window.location.href = "results.html";
      window.localStorage.setItem("localStore", JSON.stringify(store)); //searchData should persist across pages
    }
  },
  watch: {
    // Button should only be enabled when search box is not empty
    'searchData.searchTerm': function() {
      if(this.searchData.searchTerm != ''){
        this.isButtonDisabled = false;
      } else {
        this.isButtonDisabled = true;
      }
    }
  }
})

var resultsApp = new Vue({
  el: '#results-app',
  data: {
    searchData: JSON.parse(window.localStorage.getItem("localStore")).searchData, //get same searchData from previous page
    searchResults: null
  },
  mounted () {
    axios
      .get('https://images-api.nasa.gov/search?q=' + this.searchData.searchTerm)
      .then(response => (this.searchResults = response))
  }
})
