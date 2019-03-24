const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected to Mongooooooose!!!!')
});

// schema is document design
let repoSchema = mongoose.Schema({
  repo_id: {type: Number, unique: true}, //repo's ID
  name: String,
  html_url: String, //repo's URL
  forks_count: Number 
});

// Repo is a class
let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  // console.log(data)
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //oneRepo is a document here
  var oneRepo = new Repo(data);
  oneRepo.save(function(err) {
    if (err) {
      return err;
    } 
  })
}

module.exports.save = save;
module.exports.Repo = Repo;