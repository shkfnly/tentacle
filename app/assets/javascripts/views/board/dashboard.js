Catpus.Views.Dashboard = Backbone.CompositeView.extend({
  // orderOptions: {
  //   modelElement: '.card-display',
  //   modelName: 'card',
  //   subviewContainer: '.list-cards'
  // },

  template: JST['boards/index'],
  className: 'board-display',

  events: {
    'click #board-title' : 'formClear'
  },

  initialize: function(){
    this.collection = this.model.boards();
    this.issues = this.model.issues();
    // this.listenTo(this.model, 'sync', this.render);
    // I am curious about these two listenTos below
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addBoard);
    // this.listenTo(this.contribBoards, 'add', this.addContrib);
    this.listenTo(this.issues, 'add', this.addIssue);
    this.initializePusher();
  },

  formClear: function(event){
    $(event.target).val('');
    $('textarea').html('');
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    this.renderBoards();
    this.renderIssues();
    this.renderForm();

    return this;
  },

  renderForm: function(){
    var form = new Catpus.Views.BoardForm({ user: this.model });
    this.addSubview('.board-form', form);
  },

  addIssue: function(issue) {
    var view = new Catpus.Views.Issue({model: issue});
    this.addSubview('.issues-list', view);
  },

  renderIssues: function(){
    this.issues.each(this.addIssue.bind(this));
  },

  addBoard: function(board){
    var view = new Catpus.Views.Board({model: board});
    if (board.get('user_id') != current_user_id){
      this.addSubview('.contrib-board-index', view);
    }
    else{
      this.addSubview('.board-index', view);
    }
  },

  renderBoards: function(){
    this.collection.each(this.addBoard.bind(this));
  },

  initializePusher: function(){
    this.channel = pusher.subscribe('boards');
    this.channel.bind('webhook-push', function(data){
      this.model.fetch();
      this.collection.fetch({data: {user_id: this.model.id}});
    }.bind(this));
  }
});

