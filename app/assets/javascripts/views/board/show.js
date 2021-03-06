Catpus.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  className: 'board-show clearfix',

  orderOptions: {
    modelElement: '.list-display',
    modelName: 'list',
    subviewContainer: '.list-index'
  },

  events: {
    'sortstop' : 'saveOrds',
    'click .edit-board' : 'renderEditBoard',
    'click .issue-button' : 'renderIssueForm',
    'click .collab-button' : 'renderCollabForm',
    'mouseenter .board-show-title' : 'editDelete',
    'mouseleave .board-show-title' : 'editDelete'
  },

  initialize: function(){
    this.collection = this.model.lists();
    this.members = this.model.members();
    this.repository = this.model.repository();
    this.issues = new Catpus.Collections.Issues();
    this.issues.fetch({ data: {board_id: this.model.id}});
    this.vents = this.repository.events();
    this.repository.fetch({ data: {board_id: this.model.id}, async: true });
    this.contributers = this.repository.contributers();
    this.collaborators = this.repository.collaborators();
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(this.collection, 'sync', this.render)
    this.listenTo(this.collection, 'add', this.addList);
    this.listenTo(this.vents, 'add', this.addEvent);
    this.listenTo(this.issues, 'add', this.addIssue);
    this.listenTo(this.contributers, 'add', this.addContributer);
    this.listenTo(this.collaborators, 'add', this.addCollaborator);
    this.initializePusher();
  },

  render: function(){
    var content = this.template({board: this.model});
    this.$el.html(content);
    this.renderLists();
    this.renderForm();
    this.renderEvents();
    this.renderIssues();
    this.renderContributers();
    this.renderCollaborators();

    return this;
  },

  renderForm: function(){
    var form = new Catpus.Views.ListForm({board: this.model});
    this.addSubview('.list-form', form)
  },


  addList: function(list){
    var view = new Catpus.Views.List({model: list})
    this.addSubview('.list-index', view)
  },

  renderLists: function(){
    this.model.lists().each(this.addList.bind(this));
    this.$('.list-index').sortable();
  },

  addContributer: function(contributer){
    var view = new Catpus.Views.Contributer({model: contributer})
    this.addSubview('.contrib-index', view)
  },

  renderContributers: function(){
    this.contributers.each(this.addContributer.bind(this));
  },

  addCollaborator: function(collaborator){
    var view = new Catpus.Views.Contributer({model: collaborator})
    this.addSubview('.collab-index', view)
  },

  renderCollaborators: function(){
    this.collaborators.each(this.addCollaborator.bind(this));
  },

  addMember: function(member){
    var view = new Catpus.Views.Member({model: member})
  },

  addEvent: function(vent){
    var view = new Catpus.Views.Event({model: vent})
    this.addSubview('.event-index', view);
  },

  renderEvents: function(){
    this.vents.each(this.addEvent.bind(this));
  },

  addIssue: function(issue){
    var view = new Catpus.Views.Issue({model: issue});
    this.addSubview('.issue-index', view);
  },

  renderIssues: function(){
    this.issues.each(this.addIssue.bind(this));
  },

  renderEditBoard: function(event){
    event.preventDefault();
    var view = new Catpus.Views.BoardEditForm({model: this.model})
    $(event.target.parentElement).html(view.render().$el)
  },

  renderIssueForm: function(event){
    event.preventDefault();
    $(event.target.parentElement).prop("disabled", true)
    var view = new Catpus.Views.IssueForm({repository: this.repository, collection: this.issues})
    $(event.target.parentElement).after(view.render().$el)
  },

  renderCollabForm: function(event){
    event.preventDefault();
    $(event.target.parentElement).prop("disabled", true)
    var view = new Catpus.Views.CollabForm({repository: this.repository, collection: this.collaborators})
    $(event.target.parentElement).after(view.render().$el)
  },

  initializePusher: function(){
    this.channel = pusher.subscribe('boards');
    this.channel.bind('webhook-push', function(data){
      this.model.fetch();
      this.collection.fetch({data: {board_id: this.model.id}});
    }.bind(this));
  },

  editDelete: function(event){
    event.stopPropagation();
    if ($(event.target).data('clicked') === true){
      $(event.target).html(this.model.escape('title') + " - <span>" + this.model.escape('repository_name') + "</span>");
      $(event.target).data('clicked', false );
    } else{
      $(event.target).append("<span class='edit-list glyphicon glyphicon-pencil'></span>")
      $(event.target).data('clicked', true)
    }
  },
});

_.extend(Catpus.Views.BoardShow.prototype, Catpus.Utils.OrdView);