Catpus.Views.Issue = Backbone.View.extend({
  template: JST['issues/item'],
  tagName: 'li',
  className: 'well well-material-red-400',
  events: {
    'click .close-issue' : 'closeIssue'
  },

  initialize: function(options){

    this.listenTo(this.model, 'change sync add', this.render);
  },

  render: function(){
    var content = this.template({issue: this.model});
    this.$el.html(content);
    return this;
  },

  closeIssue: function(event) {
    event.preventDefault();
    this.model.destroy({
      data: {
        number: this.model.get('number'),
        repository: this.model.get('repository_name')
      },
      processData: true,
      wait: true 
    }); 
    this.remove();
  }
})