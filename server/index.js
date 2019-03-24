const express = require('express');
var bodyParser = require('body-parser');
let app = express();
const helper = require('../helpers/github.js');
const mongooseDb = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/repos', function (req, res) {




  console.log('req body is:', req.body)
  var githubUsername = req.body.username;

  // let repoSchema = mongoose.Schema({
  //   owner: {
  //     login: String, //username
  //     id: Number, //user's ID
  //     repos_url: String //user's repo URL
  //   },
  //   repo_id: Number, //repo's ID
  //   html_url: String, //this repo's URL
  //   forks_count: Number 
  // });

  var putDataIntoSchemaFormat = (repo) => {
    var obj = {
      repo_id: repo.id,
      name: repo.name,
      html_url: repo.html_url,
      forks_count: repo.forks_count
    };
    return obj;
  }

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  helper.getReposByUsername(githubUsername, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        var dataParsed = JSON.parse(data);
        for (let i = 0; i < dataParsed.length; i++) {
          var dataInSchemaFormat = putDataIntoSchemaFormat(dataParsed[i]);
          mongooseDb.save(dataInSchemaFormat);
        };
      }
  })
});


app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  mongooseDb.Repo
  .find({}, function(err, docs) { 
    if (err) {
      console.log(err)
    } else {
      res.send(docs);
    }
  })
  .limit(50)
  .sort({ forks_count: -1})
  .exec()

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
