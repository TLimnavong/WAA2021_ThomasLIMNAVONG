require('dotenv').config()

const mongodb= require('mongodb')
const mongoURL=process.env.mongoUrl
const MongoClient = require('mongodb').MongoClient;
let client = new mongodb.MongoClient(mongoURL)
const DATABASE_NAME = 'ImagesDB'


client.connect().then(client => {
  db = client.db(DATABASE_NAME)
}).catch(err => {
  console.log(err)
})
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const fs = require('fs');
const express = require('express')
const app = express()

const port = process.env.PORT || 8080
const http = require('http').createServer(app)
const io = require('socket.io')(http)
app.use(express.json())
app.use(express.static('public'))

//I listen for socket connection
io.on('connect', (socket) => {
  //Once a user is connected I wait for him to send me figure on the event 'send_figure' or line with the event 'send_line'
  console.log('New connection')
  socket.on('send_figure', (figure_specs) => {
    //Here I received the figure specs, all I do is send back the specs to all other client with the event share figure
    socket.broadcast.emit('share_figure', figure_specs)
  })

  socket.on('send_line', (line_specs) => {
    //Here I received the line specs, all I do is send back the specs to all other client with the event share line
    socket.broadcast.emit('share_line', line_specs)
  })
})


// create an endpoint where we will get the image from mongo
app.get('/get_images', (req, res) => {
  //link to go back to the main page
  let html='<a href="/">Go Back to the page</a>'
  //request that get all the image in the database
  db.collection('images').find().toArray(function (err, result){
    if(err) throw err
    //loop to take all the images in the database
    for(let i=0; i<result.length;i++)
      {
        //create a div for all the images
        html+=`<div class='container'>
            <h4> user:${result[i].username} </h4>
            <h4> date:${new Date(result[i].nowdate)}</h4>
            <img id='${result.id}' src='${result[i].image}'/><br>
        `
        
      }
    res.send(
      html
      
    )
  })
})


//post images on mongodb 
app.post('/submit_images',jsonParser, function(req, res){
  //Add to mongo db

console.log(req.body)
db.collection('images').insertOne(req.body, function(err, res){
  if(err) throw err
  console.log('1 Document inserted')
  console.log(req.body)
})
res.status(200).json({
  message: 'OK'
})
const json=req.body
//convert the file on png and put it in the folder Images
if(json){
  console.log('1')
  let imageurl= json.image.replace(/^data:image\/\w+;base64,/,"")
  var imagepng= Buffer.from(imageurl,'base64');
  fs.writeFile(`./Images/${json.nowdate}.png`,imagepng,function(err){
    if(err) throw(err);
    else console.log('Document saved')
  });
}
else{console.log('body is empty')}

})



http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})







