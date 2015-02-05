Catpus.Views.BoardIndex = Backbone.View.extend({
  template: JST['boards/index'],
  initialize: function(){
    this.listenTo(this.collection, 'sync add change', this.render)
  },
  render: function(){
    var content = this.template({repos: this.collection})
    this.$el.html(content);
    return this;
  }
})
