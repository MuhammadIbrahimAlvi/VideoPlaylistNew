// Regex For the Videos
var validURL = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
var validName = /^[a-z ,.'-]+$/i;
var vid = [];
// calling getVideos
getVideos();
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

function getVideos() {
  
  if (localStorage.getItem('videos') !== null ) {
    vid = JSON.parse(localStorage.getItem('videos'));
  }
 

vid.forEach((ele)=>{
  console.log(ele.videoNam)
 // Creating li
 let li = document.createElement("li");
 // classname
 li.className = "button";
 // id
 li.id = "created-li"
 // attributes
 li.setAttribute("name", ele.videoNam);
 li.setAttribute("url",ele.videoURL);
 li.innerText = ele.videoNam;

  // adding delete icon to li
  let icon = document.createElement("i");
  icon.className = "fas fa-trash-alt";
  let button = document.createElement("button");
  button.className = "del-btn";
  button.appendChild(icon);
  button.onclick = removeItem;
  let ulmin = document.createElement("ul");
  ulmin.appendChild(button);
  ulmin.appendChild(li);
  const ul = document.querySelector(".main-list");
  ul.appendChild(ulmin);
  
  li.addEventListener("click", (e) => {
    console.log(e.target);
    const url = e.target.getAttribute("url");
    const name = e.target.getAttribute("name");
console.log(url,name)
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
    console.log(e.target)
    e.target.parentElement.parentElement.remove()
 localStorage.removeItem(e.target.value)
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

  if (validURL.test(inputUrl.value) && validName.test(inputVideoName.value)) {
    // Creating li
    let li = document.createElement("li");
    // classname
    li.className = "button";
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
    button.className = "del-btn";
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

function removeItem(e) {
  e.target.parentElement.parentElement.remove();
}