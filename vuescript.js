var bigSearch = new Vue({
  el: '#bar-button-container',
  data: {
    searchTerm: '',
    isButtonDisabled: true
  },
  methods: {
    buttonAction: function() {
      window.location.href = "results.html";
    }
  },
  watch: {
    // Button should only be enabled when search box is not empty
    searchTerm: function() {
      if(this.searchTerm != ''){
        this.isButtonDisabled = false;
      } else {
        this.isButtonDisabled = true;
      }
    }
  }
})
