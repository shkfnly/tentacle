Catpus.Views.List = Backbone.CompositeView.extend({

  template: JST['lists/list'],
  className: 'list-display col-md-3',

  events: {
    'click .delete-list' : 'deleteList',
    'click .edit-list' : 'renderEditList',
  },

  initialize: function(){
    this.collection = this.model.cards();
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addCard);
    this.initializePusher();
  },

  render: function(){
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.renderForm();
    this.renderCards();
    return this;
  },

  renderForm: function(){
    var form = new Catpus.Views.CardForm({list: this.model, collection: this.collection});
    this.addSubview('.card-form', form);
  },

  addCard: function(card){
    
    var view = new Catpus.Views.Card({model: card});
    this.addSubview('.card-index', view);
  },

  renderCards: function(){
    this.model.cards().each(this.addCard.bind(this));
    this.$('.card-index').sortable({connectWith: '.card-index'});
  },

  initializePusher: function(){
    this.channel = pusher.subscribe('boards');
    this.channel.bind('webhook-push', function(data){
      this.collection.fetch({ data: {list_id: this.model.id}
      });
    }.bind(this));
  },

  deleteList: function(){
    this.model.destroy({wait: true})
    this.remove();
  },

  renderEditList: function(event){
    event.preventDefault();
    var view = new Catpus.Views.ListEditForm({model: this.model})
    $(event.target.parentElement).html(view.render().$el)
  }


})