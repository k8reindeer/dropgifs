Gifs = new Mongo.Collection("gifs")

if (Meteor.isClient) {

  Template.body.helpers({
    gifs: function () {
      return Gifs.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.gif.created = function () {
    this.showing = new ReactiveVar(true);
  }

  Template.gif.helpers({
    showing: function () {
      return Template.instance().showing.get()
    }
  })

  Template.gif.events({
    'click .delete': function(event) {
      Gifs.remove(this._id)
    },
    'click .collapse': function(event, template) {
      showing_now = template.showing.get()
      template.showing.set(!showing_now);
    }
  });

  Template.submission.events({
    'submit .submission': function(event) {
      gif_url = event.target.submission.value
      Gifs.insert({
        url: gif_url,
        createdAt: new Date()
      });
      event.target.submission.value = ""
      return false;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
