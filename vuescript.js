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
