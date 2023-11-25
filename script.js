import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref ,push ,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


// elements 
const publishBtn = document.getElementById('submit')
const msgInput = document.getElementById('userMsg')
const msgContainer = document.getElementById('displayMsg')
// 

const appSettings = {
    databaseURL :"https://champions-aecc4-default-rtdb.firebaseio.com/"
}



const app = initializeApp(appSettings)

const database = getDatabase(app)

const msgInDB = ref(database,"messages")


//accessing 
onValue(msgInDB,function(snapshots){
    if(snapshots.exists()){
        console.log("Yea we got messages... ")
        let arr = Object.values(snapshots.val())
        arr.reverse() // reversing the order so we can get most recent appended element at start 
       
        renderMsgs(arr)

    }
    else{
        console.log("No msg found")
    }
})

// add a check to confirm that input field is not empty

publishBtn.addEventListener('click',function(){
    const userMsg = msgInput.value
    if(userMsg){
        
        push(msgInDB,userMsg)
        deleteMsg()
        msgInput.value = ""
        
    }
    else{
        alert("Seriously? You want to publish an empty message? 💩")
    }
}
)




function renderMsgs(arr){
    msgContainer.innerHTML = ""
   for(let i = 0 ; i<5; i++){
    let newP = document.createElement("p");
    newP.textContent += arr[i]
    msgContainer.appendChild(newP)
    console.log("msg updated")
   }
}



function deleteMsg (){
    onValue(msgInDB,function(snapshots){
        let msgToremove = Object.keys(snapshots.val())
        if(msgToremove.length > 5)
        remove(ref(database,"messages/"+msgToremove[0]))
    })
}