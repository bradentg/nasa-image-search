// For making searchData global so it can be accessed on the results page
let store = {
  searchData: {
    searchTerm: ''
  },
  imageData: {
    imageTitle: '',
    imageDescription: '',
    imageSecondaryCreator: '',
    imageNasaId: '',
    imageDate: ''
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
    searchResults: '',
    imageData: store.imageData
  },
  mounted () { // Wait until vue instance is mounted to query NASA's API
    axios
      .get('https://images-api.nasa.gov/search?q=' + this.searchData.searchTerm)
      .then(response => (this.searchResults = response.data.collection.items))
  },
  methods: {
    newSearch: function() {
      window.location.href="index.html"
    }
  }
})

// Helper function
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// New vue component for displaying images
Vue.component('image-results', {
  props: ['search_item'],
  template: '<img :src="search_item.links[0].href" class="image-result" v-on:click="displayMetadata" />',
  data: function() {
    return {
      imageData: store.imageData,
      resultsDisplay: document.getElementById('results-display')
    }
  },
  beforeCreate: function() {
    document.getElementById('no-results').style.visibility = "hidden";
  },
  methods: {
    displayMetadata: function() {
      var resultsDisplayCopy = this.resultsDisplay.cloneNode(true);
      this.resultsDisplay.remove();
      var metadata = this.$props.search_item.data[0];
      this.imageData.imageTitle = metadata.title;
      this.imageData.imageDescription = metadata.description;
      this.imageData.imageSecondaryCreator = metadata.secondary_creator;
      this.imageData.imageNasaId = metadata.nasa_id;
      this.imageData.imageDate = metadata.date_created;
      var metadataDiv = document.getElementById('image-metadata');
      metadataDiv.style.visibility = "visible";
      var btn = document.createElement('BUTTON');
      btn.innerHTML = "Back to results";
      metadataDiv.appendChild(btn);

      // Hide metadata/return to search results
      btn.addEventListener("click", function() {
        /*this.resultsDisplay = resultsDisplayCopy;
        document.getElementById('results-app').appendChild(this.resultsDisplay);
        metadataDiv.remove();*/
        window.location.reload();
      });
    }
  }
})
