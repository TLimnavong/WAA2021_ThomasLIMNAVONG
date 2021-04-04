// clé api 77c9133483df2cf7a1eb322d38433453
//id for my first movie fast five
var idMovieInit='51497';
//list for the movie already used with fast five on it because it's the first one
var listmoviesubmitted=['fast five'];

//First Part 1/2/3/4 the movie part 

function GetMovieInfo(id){
//call the api for all info about the movie with his id. 
//it's the first function we call so at first we use an id that will display the movie that i want
//then it will be a loop when we arrive at the part 10 and the function submitmovie will give the next id
movieulr= 'https://api.themoviedb.org/3/movie/'+id+'?api_key=77c9133483df2cf7a1eb322d38433453'
fetch(movieulr)
.then(function(msg){
    return msg.json();
})

.then((msg)=>{
    
    Movie(msg)
    
})
}

//create the balise and fill them with the info from the api in the variable msg
function Movie(msg)
{
    
    //i create 2 div one with title image release date and the quote "give me an actor" 
    //the other one with input and the button
    var div1 = document.createElement("div");
    var div2= document.createElement("div");
    var image=document.createElement("img");
    var title=document.createElement("h2");
    var question=document.createElement("h4");
    var date=document.createElement("h3");
    div1.className="container"
    div2.className="container"
    
    //fill the created element with the info from the api
    var questiontext = document.createTextNode("Give me an actor");
    question.appendChild(questiontext)
    var nametitle = document.createTextNode(msg.original_title);
    title.appendChild(nametitle)
    div1.appendChild(title)
    var releasedate = document.createTextNode(msg.release_date)
    date.appendChild(releasedate)
    div1.appendChild(date)
    let GetPoster= `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${msg.poster_path}`
    image.src=GetPoster
    image.style.width="20%"
    div1.appendChild(image);
    div1.appendChild(question)
    
    var button= document.createElement("button");
    var buttontext = document.createTextNode("submit");
    button.appendChild(buttontext)
    var input=document.createElement("input");
    input.id="answeractor"
    div2.appendChild(button)
    div2.appendChild(input)
    div2.style.paddingBottom="30px";
    document.body.appendChild(div1)
    document.body.appendChild(div2)
    console.log(msg.id)
    button.onclick=function(){SubmitActorDirector(msg.id)}
    
}

//Submit button that will verify if the actor or the director exist and will call the creation of the next div
function SubmitActorDirector(idmovie)
{
    var actor_director=document.getElementById("answeractor").value
    
    //url of the movie with all cast (actor) and crew (we just need the director) so we can compare to the input
    apiActor= 'https://api.themoviedb.org/3/movie/'+idmovie+'/credits?api_key=77c9133483df2cf7a1eb322d38433453&language=en-US'
fetch(apiActor)
.then(function(msg){
    return msg.json();
})

.then((msg)=>
{
    console.log(msg)
    console.log(msg.cast.length)
    //first check the cast (actor) so we do a loop if it stop the variable "i" will be less than the length of the list 
    for( var i=0; i< msg.cast.length;i++)
    {
        console.log(msg.cast[i].name.toLowerCase())
        //check if the name in the input is the same as the list on the api
        if (msg.cast[i].name.toLowerCase()==actor_director.toLowerCase())
            //put everything in lowercase so there is no mistake with uppercase i could also pu everything in uppercase
        {
            console.log(actor_director)
            console.log(msg.cast[i].name)
            console.log('true')
            console.log(i)
            break 
            //it will stop when we find the first match and "i" will not increase 
        }
        
        
    }
    // condition if we didn't find in the actor section
    if (i==msg.cast.length)
    {
        //loop for the director
        for( var j=0; j< msg.crew.length;j++)
        {
        //check if the name in the input is the same as the list on the api and also we just want the director and not all the crew so i added an other condition
        if (msg.crew[j].name.toLowerCase()==actor_director.toLowerCase()&& msg.crew[j].job=="Director" )
            {
                console.log(actor_director)
                console.log(msg.crew[i].name)
            
                console.log('true')
                console.log(i)
                break
            }
        }
        // condition if we didn't find in the director section so we can display a "wrong" message 
        if(j==msg.crew.length)
                {
                    console.log("pas trouvé")
                    var input=document.getElementById('answeractor')
                    input.value=''
                    input.placeholder="wrong"
                    
                }
        else{
        console.log('directeur trouvé')
        //change the id of our input balise so when we play for several round with a new movies it will not take the last input but the one with answeractor
        document.getElementById("answeractor").id = "oldactor"
        GetActorDirectorInfo(msg.crew[j].id)
        }
        }
        else   
        {
            console.log("trouvé")
            //call the Part6 of the assignment and will display the div with the actordirector info
            GetActorDirectorInfo(msg.cast[i].id)
            //same idea as when we find the actor (it's the same input box)
            document.getElementById("answeractor").id = "oldactor"
        
        }   
    
})
// Actor Part 6 7 8 9 
// Get the data of the actor or the director (image+name)
//Get info Actor
function GetActorDirectorInfo(id){
    //call 
    actordirectorulr= 'https://api.themoviedb.org/3/person/'+id+'?api_key=77c9133483df2cf7a1eb322d38433453&language=en-US'
    fetch(actordirectorulr)
    .then(function(msg){
        return msg.json();
    })
    
    .then((msg)=>{
        
        ActorDirector(msg)
        
    })
    }
}
//same as movie but with actor info
function ActorDirector(msg)
{
    var div3 = document.createElement("div");
    var div4= document.createElement("div");
    var image=document.createElement("img");
    var title=document.createElement("h2");
    var question=document.createElement("h4");
    div3.className="container"
    div4.className="container"

    var nametitle = document.createTextNode(msg.name);
    var questiontext = document.createTextNode("Give me a movie");
    question.appendChild(questiontext)
    title.appendChild(nametitle)
    div3.appendChild(title)
    console.log(msg.id)

    
    //fill the created element with the info from the api
    let GetPoster= `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${msg.profile_path}`
    image.src=GetPoster
    image.style.width="20%"
    div3.appendChild(image);
    div3.appendChild(question)
    
    var button= document.createElement("button");
    var buttontext = document.createTextNode("submit");
    button.appendChild(buttontext)
    var input=document.createElement("input");
    input.id="answermovie"
    console.log(input)
    div4.appendChild(button)
    div4.appendChild(input)
    div4.style.paddingBottom="30px";
    document.body.appendChild(div3)
    document.body.appendChild(div4)
    console.log(msg)
    button.onclick=function(){SubmitMovie(msg.id)}
    
}

//Submit button that will verify if the movie exist and will call the creation of the next div
function SubmitMovie(idactor)
{
    var movie=document.getElementById("answermovie").value
    
    
   
    moviecrediturl='https://api.themoviedb.org/3/person/'+idactor+'/movie_credits?api_key=77c9133483df2cf7a1eb322d38433453&language=en-US'
    fetch(moviecrediturl)
    .then(function(msg){
        return msg.json();
    })
    .then((msg)=>{
    // look if the movie is already on our list of movie submitted
    if (listmoviesubmitted.includes(movie.toLowerCase()))
        {
            var input=document.getElementById('answermovie')
            input.value=''
            input.placeholder="you have already use this movie"
        }
    else{
        for( var i=0; i< msg.cast.length;i++)
    {
        console.log(msg.cast[i].title.toLowerCase())
        if (msg.cast[i].title.toLowerCase()==movie.toLowerCase() )
        //put everything in lowercase so there is no mistake with uppercase i could also pu everything in uppercase
        {
            listmoviesubmitted.push(movie.toLowerCase())
            
            
            
            console.log('true')
            
            break
        }
    }
        if(i==msg.cast.length)
        {
        console.log("pas trouvé")
        var input=document.getElementById('answermovie')
        input.value=''
        input.placeholder="wrong"
        }
        else{
            console.log('film trouvé')
            //change the id of our input balise so when we play for several round with a new movies it will not take the last input but the one with answermovie
            document.getElementById("answermovie").id = "oldmovie"
            document.getElementById("oldmovie")
            //When we call this function we come back at the part 2 of the assignment
            GetMovieInfo(msg.cast[i].id)
        }}
    })
}
// At all i used 6 function but they are all the same between submitactor/submitmovie, getmovieinfo/getactordirectorinfo and movie/actordirector 
// Just to run the first movie
function Main(){
    GetMovieInfo(idMovieInit)
}
Main()

