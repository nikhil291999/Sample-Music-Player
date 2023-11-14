const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar");



let musicIndex = Math.floor((Math.random() * allMusic.length) + 1),
isMusicPaused = true;



window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
  // pauseMusic()
  // playMusic();
});

function loadMusic(indexNumb){
  musicName.innerText = allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

function playMusic(){
  wrapper.classList.add("play");
  playPauseBtn.querySelector("i").innerText = "pause";

  mainAudio.play();
  document.getElementById("playing").innerText="Playing";
 
}


function pauseMusic(){
  wrapper.classList.remove("play");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
  document.getElementById("playing").innerText="Paused";
}

function prevMusic(){
  musicIndex--;
  
  if(musicIndex<1)
  musicIndex=allMusic.length;
  
 
  loadMusic(musicIndex);
 
  playMusic();
  
}


function nextMusic(){
  musicIndex++; 
 
if(musicIndex>allMusic.length)
  musicIndex=1;
  loadMusic(musicIndex);
 
  playMusic();

}

playPauseBtn.addEventListener("click", ()=>{
  const MusicPlay = wrapper.classList.contains("play");
 
   if(MusicPlay)
   pauseMusic();
   else
   playMusic();


});

prevBtn.addEventListener("click", ()=>{
  let myInterval = setInterval(pauseMusic, 1000);
  clearInterval(myInterval);

  prevMusic();
});


nextBtn.addEventListener("click", ()=>{
  nextMusic();
});


mainAudio.addEventListener("timeupdate", (e)=>{
  const currentTime = e.target.currentTime;
  const duration = e.target.duration; 
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = wrapper.querySelector(".current-time"),
  musicDuartion = wrapper.querySelector(".max-duration");
  mainAudio.addEventListener("loadeddata", ()=>{
   
    let mainAdDuration = mainAudio.duration;
    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ 
      totalSec = `0${totalSec}`;
    }
    musicDuartion.innerText = `${totalMin}:${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if(currentSec < 10){ 
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});


progressArea.addEventListener("click", (e)=>{
  let progressWidth = progressArea.clientWidth; 
  let clickedOffsetX = e.offsetX; 
  let songDuration = mainAudio.duration; 
  
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic(); 
 
});


const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click", ()=>{
  let getText = repeatBtn.innerText; 
  switch(getText){
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});


mainAudio.addEventListener("ended", ()=>{

  let getText = repeatBtn.innerText; 
  switch(getText){
    case "repeat":
      nextMusic(); 
      break;
    case "repeat_one":
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); 
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); 
      musicIndex = randIndex; 
      loadMusic(musicIndex);
      playMusic();
    
      break;
  }
});

window.addEventListener("keypress",function(e){

let key=e.key;

console.log(key);
if(key==' ')
{
  const isMusicPlay = wrapper.classList.contains("play");

  isMusicPlay ? pauseMusic() : playMusic();
}
else if(key=='.')
{
  nextMusic();
}
else if(key==',')
{
  prevMusic();
}
else 
window.alert("not a valid key");
});