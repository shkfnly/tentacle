Catpus.Views.Card = Backbone.CompositeView.extend({
  template: JST['cards/card'],
  className: 'card',

  initialize: function(){
    this.collection = this.model.tasks();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addBoard);
    // this.collection.each(function(task){
    //   this.addTask(task)
    // }.bind(this));
  },

  render: function(){
    var content = this.template({card: this.model});
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  addTask: function(task){
    var view = new Catpus.Views.Task({model: task});
    this.addSubview('.task-index', view);
  }



})