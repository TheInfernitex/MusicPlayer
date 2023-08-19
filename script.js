let currentSongNo=1,currentSong=new Audio("assets/Music/song1.mp3");
currentSong.volume=0.5;

let volIcon=document.querySelector(".volIcon");
const gif=document.querySelectorAll(".gif");
const durat=document.querySelector("#durat");
const time=document.querySelector("#time");
const backward=document.querySelector(".fa-backward-step");
const forward=document.querySelector(".fa-forward-step");



let progressBar=document.querySelector(".prog");
progressBar.max=100;

let volume=document.querySelector(".volume");
volume.max=100;

let listItems=[];
for(let i=1;i<=6;i++) listItems[i]=document.querySelector(".song"+i+"");

let playBtns=[];
for(let i=1;i<=6;i++) playBtns[i]=document.querySelector(".play"+i+"");
let masterPlay=document.querySelector("#masterPlay");

let songNames=[];
for(let i=1;i<=6;i++) songNames[i]=document.querySelector(".song"+i+" p");

let durations=[0,236000,214000,166000,122000,183000,238000];
let durationsMin=["0","3m 56.0s","3m 34.0s","2m 46.0s","2m 02.0s","3m 04.0s","3m 58.0s"];

let Name=document.querySelector("#songName");

setInterval(()=>{
    let s=(currentSong.currentTime%60).toFixed(1);
    let m=(s/60).toFixed(0);
    durat.innerHTML=m+"m "+s+"s";
    progressBar.value=((100*currentSong.currentTime)/currentSong.duration.toFixed(5));
},100);

forward.addEventListener('click',()=>{
    let songNo;
    if(currentSongNo==6)songNo=1;
    else songNo=currentSongNo+1;
    if((currentSong.duration > 0 && !currentSong.paused))pauseIt();
    listItems[currentSongNo].classList.remove("playing");
    listItems[songNo].classList.add("playing");

    time.innerHTML=""+durationsMin[songNo];

    currentSongNo=songNo;
    playIt();
});

backward.addEventListener('click',()=>{
    let songNo;
    if(currentSongNo==1)songNo=6;
    else songNo=currentSongNo-1;
    if((currentSong.duration > 0 && !currentSong.paused))pauseIt();
    listItems[currentSongNo].classList.remove("playing");
    listItems[songNo].classList.add("playing");

    time.innerHTML=""+durationsMin[songNo];

    currentSongNo=songNo;
    playIt();
});

for(let i=1;i<=6;i++)
playBtns[i].addEventListener('click',()=>{
    listItems[currentSongNo].classList.remove("playing");
    listItems[i].classList.add("playing");
    time.innerHTML=""+durationsMin[i];
    if((currentSong.duration > 0 && !currentSong.paused))pauseIt();

    currentSongNo=i;
    Name.innerHTML=""+songNames[i].innerHTML;
    playIt();

});

progressBar.addEventListener('change',()=>{
    currentSong.currentTime=(progressBar.value*currentSong.duration/100);
});


masterPlay.addEventListener('click',()=>{
    if(currentSong.duration > 0 && !currentSong.paused) pauseIt();
    else 
    {
        volIcon.classList.add("fa-beat-fade");
        gif[0].style.visibility="visible";
        gif[1].style.visibility="visible";
        masterPlay.classList.remove("fa-play");masterPlay.classList.add("fa-pause");
        currentSong.play();
        setInterval(()=>{
        currentSong.pause();
        gif[0].style.visibility="hidden";
        gif[1].style.visibility="hidden";
        masterPlay.classList.remove("fa-pause");masterPlay.classList.add("fa-play");
    },(durations[currentSongNo]-currentSong.currentTime));
    }
});

function pauseIt()
{
    currentSong.pause();
    volIcon.classList.remove("fa-beat-fade");
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif[0].style.visibility="hidden";
    gif[1].style.visibility="hidden";
}
function playIt()
{
    volIcon.classList.add("fa-beat-fade");
    currentSong=new Audio("assets/Music/song"+currentSongNo+".mp3");
    gif[0].style.visibility="visible";
    gif[1].style.visibility="visible";
    masterPlay.classList.remove("fa-play");masterPlay.classList.add("fa-pause");
    currentSong.play();
    setInterval(()=>{
        currentSong.pause();
        gif[0].style.visibility="hidden";
        gif[1].style.visibility="hidden";
        masterPlay.classList.remove("fa-pause");masterPlay.classList.add("fa-play");
        volIcon.classList.remove("fa-beat-fade");
    },durations[currentSongNo]-currentSong.currentTime);
    
} 

setInterval(()=>{
    console.log(currentSong.volume);
},1000);

volume.addEventListener('change',()=>{
    currentSong.volume=(volume.value/100).toFixed(2);
    if(currentSong.volume==0.00)
    {
        volIcon.classList.remove("fa-volume-high");
        volIcon.classList.remove("fa-volume-low");
        volIcon.classList.add("fa-shake");
        volIcon.classList.add("fa-volume-xmark");
        setTimeout(() => {
            volIcon.classList.remove("fa-shake");
        }, 1000);
    }
    else if(currentSong.volume<0.50)
    {
        volIcon.classList.remove("fa-volume-high");
        volIcon.classList.remove("fa-volume-xmark");
        volIcon.classList.add("fa-volume-low");
    }
    else{
        volIcon.classList.remove("fa-volume-xmark");
        volIcon.classList.remove("fa-volume-low");
        volIcon.classList.add("fa-volume-high");
    }
});
