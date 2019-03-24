// For making searchData global so it can be accessed on the results page
let store = {
  searchData: {
    searchTerm: ''
  }
}

// Landing page for accepting search queries
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

// For displaying the search results on the results.html page
var resultsApp = new Vue({
  el: '#results-app',
  data: {
    searchData: JSON.parse(window.localStorage.getItem("localStore")).searchData, //get same searchData from previous page
    searchResults: ''
  },
  mounted () {
    axios
      .get('https://images-api.nasa.gov/search?q=' + this.searchData.searchTerm)
      .then(response => (this.searchResults = response.data.collection.items))
  },
  methods: {
    displayMetadata: function() {

    }
  }
})

// New vue component for displaying images
Vue.component('image-results', {
  props: ['search_item'],
  template: '<img :src="search_item.links[0].href" style="height: 200px;"/>'
})
