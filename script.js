let stream;
let remoteStream;
let videoEl = document.getElementById("video");
const constraints = {
    audio:true,
    video:true
}
let peerConnection;
const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
}

const accept = document.getElementById("shareBtn");
const showVideo = document.getElementById("showBtn");
const stopVideo = document.getElementById("stopBtn");

const getMedia = async()=>{
    try{
        stream = await navigator.mediaDevices.getUserMedia(constraints)
        console.log(stream)
    }catch{
        console.log("access denied")
    }
};

const showVideoFunc = async()=>{
    videoEl.srcObject = stream
    tracks = stream.getTracks();
    console.log(tracks)
 
}

const stopVideoFunc = async()=>{
    const tracks = stream.getTracks();
    tracks.forEach(track => {track.stop()});
}


let createOffer = async () => {
    peerConnection = new RTCPeerConnection(servers);
    remoteStream = new MediaStream();
    document.getElementById("user-2").srcObject = remoteStream

    localStream.getTracks().forEach((track )=> { peerConnection.addTrack(track, localStream)
    })

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        }) 
    }

    peerConnection.onicecandidate = async (event) => {
        if(event.candidate){
            console.log("New candidate", event.candidate)
        }
    }


    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer)

}

accept.addEventListener("click", () => getMedia());

showVideo.addEventListener("click", () => showVideoFunc());
stopVideo.addEventListener("click", () => stopVideoFunc());
