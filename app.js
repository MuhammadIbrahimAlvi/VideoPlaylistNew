// Regex For the Videos
const validURL = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
const validName = /^[a-z ,.'-]+$/i;
var vid = [];
// calling getVideos
getVideos();
// Function on AddButton to Playlist
function Store(videoNams, videoURLs) {
  if (localStorage.getItem('videos') === null) {
    // start of if

    vids = {
      videoNam: videoNams,
      videoURL: videoURLs
    }
    vid.push(vids);
    localStorage.setItem('videos', JSON.stringify(vid));
  } else {
    // start of else
    vids = {
      videoNam: videoNams,
      videoURL: videoURLs
    }
    vid.push(vids);
    localStorage.setItem('videos', JSON.stringify(vid));
  }
  // console.log(vid)
}







// Getting video from the local Storage and Render
function getVideos() {
  
  if (localStorage.getItem('videos') !== null ) {
    vid = JSON.parse(localStorage.getItem('videos'));
  }
vid.forEach((ele)=>{
  // console.log(ele.videoNam)
 // Creating li
 let li = document.createElement("li");
 // classname
 li.className = "btn btn2";
 // id
 li.id = "created-li"
 // attributes
 li.setAttribute("name", ele.videoNam);
 li.setAttribute("url",ele.videoURL);
 li.innerText = ele.videoNam;

  // adding delete icon to li
  let icon = document.createElement("i");
  icon.className = "fas fa-trash-alt fa-2x";
  icon.onclick = removeItem;
  let button = document.createElement("button");
  button.className = "del-btn btn2";
  button.appendChild(icon);
  // button
  let ulmin = document.createElement("ul");
  ulmin.appendChild(button);
  ulmin.appendChild(li);
  const ul = document.querySelector(".main-list");
  ul.appendChild(ulmin);
  
  li.addEventListener("click", (e) => {
    console.log(e.target);
    const url = e.target.getAttribute("url");
    const name = e.target.getAttribute("name");
// console.log(url,name)
    const iframe = document.getElementById("playing-iframe");
    let extract = url;
    let index = extract.search("=");
    let embed = url.slice(index + 1);
    let string = `https://www.youtube.com/embed/${embed}`;
    iframe.src = string;
    const h5 = document.getElementById("h5-iframe");
    h5.innerHTML = name;
  });
  function removeItem(e) {
    let obj = e.target.parentElement.parentElement.lastChild
    let objAtt = obj.getAttribute("name")
    // console.log(vid)
let videoss = JSON.parse(localStorage.getItem('videos'));
console.log(videoss)
let index = videoss.findIndex(video=>{
return video.videoNam==objAtt
})
videoss.splice(index,1)
localStorage.setItem('videos',JSON.stringify(videoss))
console.log(videoss)
    e.target.parentElement.parentElement.remove()
//  localStorage.removeItem(e.target.value)
  }
})
}





// getting inputs
let inputUrl = document.getElementById("input-url");
let inputVideoName = document.getElementById("input-video_name");

// getting mainiframesDiv
let mainiframeDiv = document.querySelector(".videos-play");

// input Form
document.getElementById("add-list").addEventListener("click", (e) => {

  // calling store
  Store(inputVideoName.value, inputUrl.value);
// validation
  if (validURL.test(inputUrl.value) && validName.test(inputVideoName.value)) {
    // Creating li
    let li = document.createElement("li");
    // classname
    li.className = "btn btn2 btnn";
    // id
    li.id = "created-li"
    // attributes
    li.setAttribute("name", inputVideoName.value);
    li.setAttribute("url", inputUrl.value);
    li.innerHTML = inputVideoName.value;






    
    // Function on li

    li.addEventListener("click", (e) => {
      // console.log(e.target);
      const url = e.target.getAttribute("url");
      const name = e.target.getAttribute("name");
      const iframe = document.getElementById("playing-iframe");
      let extract = url;
      let index = extract.search("=");
      let embed = url.slice(index + 1);
      let string = `https://www.youtube.com/embed/${embed}`;
      iframe.src = string;
      const h5 = document.getElementById("h5-iframe");
      h5.innerHTML = name;
    });
    // console.log(li)
    // adding delete icon to li
    let icon = document.createElement("i");
    icon.className = "fas fa-trash-alt";
    let button = document.createElement("button");
    button.className = "del-btn btn2";
    button.appendChild(icon);
    button.onclick = removeItem;
    let ulmin = document.createElement("ul");
    ulmin.appendChild(button);
    ulmin.appendChild(li);
    const ul = document.querySelector(".main-list");
    ul.appendChild(ulmin);
    inputVideoName.value = "";
    inputUrl.value = "";


  } else {
    alert("Enter Valid Fields Input");
  }
  e.preventDefault();
});






var counter=0;
// Getting Button for ThemeChanger
let mod = document.querySelector('.themeChanger')
mod.addEventListener('click',modeChange)
// Theme Function
function modeChange(){
if(counter%2===0)
{
  mod.style.backgroundColor="#fff"
  document.body.style.backgroundColor="black"
  document.querySelector('.video-header').style.color='white'
  document.querySelector('.fa-file-video').style.color = 'white'
  document.querySelector('.headings').style.color='white'
  document.getElementById('h5-iframe').style.color="white"

}else{
  document.body.style.backgroundColor="white"
  document.querySelector('.video-header').style.color='black'
  document.querySelector('.fa-file-video').style.color = 'black'
  document.querySelector('.headings').style.color='black'
  document.getElementById('h5-iframe').style.color="black"
  mod.style.backgroundColor="black"
 

}
  counter++
}





// Deleting Video from Playlist and Local Storage
function removeItem(e) {
  let obj = e.target.parentElement.parentElement.lastChild
  let objAtt = obj.getAttribute("name")
let videoss = JSON.parse(localStorage.getItem('videos'));
console.log(videoss)
let index = videoss.findIndex(video=>{
return video.videoNam==objAtt
})
videoss.splice(index,1)
localStorage.setItem('videos',JSON.stringify(videoss))
console.log(videoss)
  e.target.parentElement.parentElement.remove()

}

