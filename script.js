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

let volume=document.querySelector(".vol .volume");
volume.max=100;

let listItems=[];
for(let i=1;i<=6;i++) listItems[i]=document.querySelector(".song"+i+"");

let playBtns=[];
for(let i=1;i<=6;i++) playBtns[i]=document.querySelector(".play"+i+"");
let masterPlay=document.querySelector("#masterPlay");

let songNames=[];
for(let i=1;i<=6;i++) songNames[i]=document.querySelector(".song"+i+" p");

let durations=[0,236000,214000,166000,122000,183000,238000];
let durationsMin=["0","3m 56s","3m 34s","2m 46s","2m 02s","3m 04s","3m 58s"];

let Name=document.querySelector("#songName");


setInterval(()=>{
    let s=parseInt(currentSong.currentTime%60);
    let m=parseInt(currentSong.currentTime/60);
    durat.innerHTML=m+"m "+s+"s";
    progressBar.value=((100*currentSong.currentTime)/currentSong.duration);
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
    if(i==currentSongNo && currentSong.duration > 0 && !currentSong.paused)
    {
        listItems[currentSongNo].classList.remove("playing");
        pauseIt();
    }
    else{
        listItems[currentSongNo].classList.remove("playing");
        listItems[i].classList.add("playing");
        time.innerHTML=""+durationsMin[i];
        if((currentSong.duration > 0 && !currentSong.paused))pauseIt();
        currentSongNo=i;
        playIt();
    }

});

progressBar.addEventListener('change',()=>{
    currentSong.currentTime=((progressBar.value*currentSong.duration)/100);
});
progressBar.addEventListener('input',()=>{
    currentSong.currentTime=((progressBar.value*currentSong.duration)/100);
});

masterPlay.addEventListener('click',()=>{
    if(currentSong.duration > 0 && !currentSong.paused) pauseIt();
    else 
    {
        playBtns[currentSongNo].innerHTML="Stop";
        volIcon.classList.add("fa-beat-fade");
        gif[0].style.visibility="visible";
        gif[1].style.visibility="visible";
        masterPlay.classList.remove("fa-play");masterPlay.classList.add("fa-pause");
        currentSong.play();
        setInterval(()=>{
        currentSong.pause();
        gif[0].style.visibility="hidden";
        gif[1].style.visibility="hidden";
        masterPlay.classList.remove("fa-pause");masterPlay.classList.add
        ("fa-play");
        playBtns[currentSongNo].innerHTML="Play";
    },(durations[currentSongNo]-currentSong.currentTime));
    }
});

function pauseIt()
{
    playBtns[currentSongNo].innerHTML="Play";
    currentSong.pause();
    volIcon.classList.remove("fa-beat-fade");
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif[0].style.visibility="hidden";
    gif[1].style.visibility="hidden";
}
function playIt()
{
    playBtns[currentSongNo].innerHTML="Stop";
    Name.innerHTML=""+songNames[currentSongNo].innerHTML;
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
        playBtns[currentSongNo].innerHTML="Play";
    },durations[currentSongNo]-currentSong.currentTime);
    
} 


volume.addEventListener('change',()=>{
    currentSong.volume=(volume.value/100).toFixed(3);
    if(currentSong.volume==0)
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
