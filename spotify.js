let CurrentSong = new Audio();
let songs;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
      return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSong(){
        let a = await fetch("/songs")
        let response = await a.text();
        console.log(response)
        let div = document.createElement("div") 
        div.innerHTML = response;
        let as = div.getElementsByTagName("a")
        let songs = []
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if(element.href.endsWith(".mp3")){
                songs.push(element.href.split("/songs/")[1])
            }
            
        }
        return songs
}
const playmusic = (track,pause=false)=>{
    CurrentSong.src = ("/songs/")+track;
    if (!pause) {
      CurrentSong.play()
      play.src = "icon/pause.svg"
  }
    document.querySelector(".songinfo").innerHTML= track;
    document.querySelector(".songtime").innerHTML= "00:00/00:00";
}


async function main(){
     songs = await getSong()
    console.log(songs)

  playmusic(songs[0],true)
    // print list of all songs in library section

    let songUL = document.querySelector(".Liblist").getElementsByTagName("ul")[0]
    for(const song of songs){
        songUL.innerHTML = songUL.innerHTML + ` <li> 
        <img class="invert" src="icon/music.svg" alt="music">
              <div class="libinfo">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>Sidhu Moose Wala</div>
              </div>
              <div class="libbtn">
                <svg class="invert" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="#000000">
                  <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
              </svg>
                <div>Play now</div>
              </div>
        
        </li>`;
    }

    //Attached event listener to all songs
    Array.from(document.querySelector(".Liblist").getElementsByTagName("li")).forEach(e => {
            e.addEventListener("click",element=>{
              console.log(e.querySelector(".libinfo").firstElementChild.innerHTML)
              playmusic(e.querySelector(".libinfo").firstElementChild.innerHTML.trim())

            })
    });



      //attached event listener to seekbar
      play.addEventListener("click", () => {
          if(CurrentSong.paused){
            CurrentSong.play()
            play.src="icon/pause.svg"
          }
          else{
            CurrentSong.pause()
            play.src="icon/play.svg"
          }
      })



      //listen to timeupdate event

      CurrentSong.addEventListener("timeupdate",()=>{
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(CurrentSong.currentTime)} / ${secondsToMinutesSeconds(CurrentSong.duration)}`
        document.querySelector(".circle").style.left = (CurrentSong.currentTime / CurrentSong.duration) * 100 + "%";
      })


      // add event listener to seek on seekbar

      document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        CurrentSong.currentTime = ((CurrentSong.duration) * percent) / 100
    })


      // adding hamburger

      document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "0" ;
      })


      // add event listner to remove left side

      document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "-100%" ;
      })

      // Add an event listener to previous
    previous.addEventListener("click", () => {
      CurrentSong.pause()
      let index = songs.indexOf(CurrentSong.src.split("/").slice(-1)[0])
      if ((index - 1) >= 0) {
          playmusic(songs[index - 1])
      }
  })

  // Add an event listener to next
  next.addEventListener("click", () => {
      CurrentSong.pause()
      let index = songs.indexOf(CurrentSong.src.split("/").slice(-1)[0])
      if ((index + 1) < songs.length) {
          playmusic(songs[index + 1])
      }
  })


    var audio = new Audio(songs[0]);
    // audio.play();
}

main()

