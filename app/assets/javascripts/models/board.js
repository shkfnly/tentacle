Catpus.Models.Board = Backbone.Model.extend({
  defaults: { board :{
    id: null,
    user_id: null,
    repository_url: null,
    repository_id: null,
    repository_name: null,
    }
  },

  urlRoot: 'api/boards'
});