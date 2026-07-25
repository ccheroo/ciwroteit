// ==========================================
// CIWROTE
// Single Piece Reader
// Music Support Version
// ==========================================


import { db } from "./firebase.js";


import {

    doc,

    getDoc

} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";





// ==========================================
// ELEMENT
// ==========================================


const pieceContainer =
document.getElementById("piece");





// ==========================================
// GET PIECE ID
// ==========================================


const params =
new URLSearchParams(
    window.location.search
);



const pieceId =
params.get("id");





// ==========================================
// LOAD PIECE
// ==========================================


async function loadPiece(){


    if(!pieceId){


        showError(
            "No piece selected."
        );


        return;


    }




    try{


        const pieceRef =
        doc(

            db,

            "pieces",

            pieceId

        );




        const snapshot =
        await getDoc(pieceRef);





        if(!snapshot.exists()){


            showError(
                "This piece does not exist."
            );


            return;


        }





        const piece =
        snapshot.data();




        displayPiece(piece);




    }




    catch(error){


        console.error(error);



        showError(

            "Unable to load this piece."

        );



    }


}






// ==========================================
// DISPLAY
// ==========================================


function displayPiece(piece){



    let musicSection = "";



    if(piece.songLink){



        musicSection = `


            <div class="music-player">


                <p class="music-title">

                    🎵 ${piece.songTitle || "Listen while reading"}

                </p>



                ${createMusicEmbed(piece.songLink)}



            </div>



        `;


    }







    pieceContainer.innerHTML = `



        <p class="date">

            ${piece.date || ""}

        </p>





        <h1>

            ${piece.title || "Untitled"}

        </h1>





        <p class="category">

            ${piece.category || ""}

        </p>





        ${musicSection}






        <div class="full-content">


            ${piece.content || "No content available."}


        </div>




    `;



}







// ==========================================
// CREATE MUSIC PLAYER
// ==========================================


function createMusicEmbed(link){



    if(link.includes("spotify.com")){


        return `


            <iframe

                style="border-radius:12px"

                src="https://open.spotify.com/embed/track/${getSpotifyID(link)}"

                width="100%"

                height="80"

                frameBorder="0"

                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">

            </iframe>


        `;


    }







    if(link.includes("youtube.com") || link.includes("youtu.be")){


        const videoID =
        getYoutubeID(link);




        return `


            <iframe

                width="100%"

                height="200"

                src="https://www.youtube.com/embed/${videoID}"

                title="YouTube music"

                frameborder="0"

                allow="autoplay; encrypted-media"

                allowfullscreen>

            </iframe>



        `;


    }






    return `


        <a

        href="${link}"

        target="_blank"

        class="music-link">


            Open song 🎧


        </a>



    `;



}







// ==========================================
// GET SPOTIFY ID
// ==========================================


function getSpotifyID(url){


    const parts =
    url.split("/track/");



    if(parts.length > 1){


        return parts[1].split("?")[0];


    }



    return "";

}







// ==========================================
// GET YOUTUBE ID
// ==========================================


function getYoutubeID(url){



    if(url.includes("youtu.be")){


        return url.split("/").pop();


    }




    const params =
    new URL(url).searchParams;



    return params.get("v");



}







// ==========================================
// ERROR
// ==========================================


function showError(message){



    pieceContainer.innerHTML = `



        <h1>

            Oops.

        </h1>




        <p>

            ${message}

        </p>



    `;



}







// ==========================================
// START
// ==========================================


loadPiece();
