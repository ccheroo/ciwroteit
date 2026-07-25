// ==========================================
// CIWROTE
// Homepage Firebase Loader
// Fireflies Background
// ==========================================


import { db } from "./firebase.js";


import {

    collection,
    getDocs,
    query,
    orderBy

} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";




// ==========================================
// ELEMENT
// ==========================================


const piecesContainer = document.getElementById("pieces");




// ==========================================
// LOAD ALL PIECES
// ==========================================


async function loadPieces(){


    if(!piecesContainer) return;



    piecesContainer.innerHTML = `

        <div class="loading">

            Loading pieces...

        </div>

    `;



    try{


        const piecesQuery = query(

            collection(db,"pieces"),

            orderBy(
                "createdAt",
                "desc"
            )

        );



        const snapshot =
        await getDocs(piecesQuery);



        piecesContainer.innerHTML="";



        if(snapshot.empty){


            piecesContainer.innerHTML = `

                <article class="piece">

                    <h2>

                        No pieces yet.

                    </h2>


                    <p class="preview">

                        Your first literary work will appear here.

                    </p>


                </article>

            `;


            return;


        }




        snapshot.forEach((doc)=>{


            const piece =
            doc.data();



            const article =
            document.createElement("article");



            article.className="piece";



            article.innerHTML = `


                <p class="date">

                    ${piece.date || ""}

                </p>



                <h2>

                    ${piece.title || "Untitled"}

                </h2>



                <p class="preview">

                    ${getPreview(piece.content)}

                </p>



                <a

                href="piece.html?id=${doc.id}"

                class="read-more">

                    Read →

                </a>


            `;



            piecesContainer.appendChild(article);



        });



    }



    catch(error){


        console.error(
            "Firestore Error:",
            error
        );



        piecesContainer.innerHTML = `


            <article class="piece">


                <h2>

                    Something went wrong.

                </h2>


                <p class="preview">

                    ${error.message}

                </p>


            </article>


        `;


    }


}




// ==========================================
// CLEAN PREVIEW TEXT
// ==========================================


function getPreview(text){


    if(!text){

        return "";

    }



    const cleanText =
    text.replace(
        /<[^>]*>/g,
        ""
    );



    if(cleanText.length <= 200){

        return cleanText;

    }



    return cleanText.substring(0,200) + "...";


}





// ==========================================
// FIREFLY GENERATOR
// ==========================================


const fireflyContainer =
document.querySelector(".fireflies");



if(fireflyContainer){


    for(let i = 0; i < 35; i++){


        const firefly =
        document.createElement("span");



        firefly.className =
        "firefly";



        firefly.style.left =
        Math.random()*100 + "%";



        firefly.style.animationDelay =
        Math.random()*10 + "s";



        firefly.style.animationDuration =
        (8 + Math.random()*10) + "s";



        fireflyContainer.appendChild(
            firefly
        );


    }


}





// ==========================================
// START
// ==========================================


loadPieces();
