Gifs = new Mongo.Collection("gifs")

if (Meteor.isClient) {

  Template.body.helpers({
    gifs: function () {
      return Gifs.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.gif.events({
    'click .delete': function(event) {
      console.log(this._id)
      Gifs.remove(this._id)
    }
  });

  Template.submission.events({
    'submit .submission': function(event) {
      gif_url = event.target.submission.value
      console.log(gif_url);
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
