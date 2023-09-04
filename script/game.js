const readyButton = document.getElementById("readyButton")

const p1 = document.querySelector(".p1")
const p2 = document.querySelector(".p2")

const p1ScoreHtml = document.querySelector(".p1Score")
const p2ScoreHtml = document.querySelector(".p2Score")
let p1Score = 0
let p2Score = 0

const roundHtml = document.querySelector(".roundNumber")
const p1WinsHtml = document.querySelector(".p1Round")
const p2WinsHtml = document.querySelector(".p2Round")
let p1Wins = 0
let p2Wins = 0

const timer = document.querySelector(".timer")

const stein = document.querySelector(".stein")
const saks = document.querySelector(".saks")
const papir = document.querySelector(".papir")

const winSound = document.querySelector(".winSound")
const loseSound = document.querySelector(".loseSound")

let hand = ""
let com = ""
let early = ""
let round = 1


function loop(){ //kjører hver gang man trykker på knappen "klar"/"spill igjen"
    readyButton.style.backgroundColor = "chartreuse";
    readyButton.style.border = "solid chartreuse";
    readyButton.style.animation = "none"
    document.getElementById("readyButton").disabled = true; 
    p1.style.border = "solid black"
    p2.style.border = "solid black"
    console.log("hei")

    early = ""
    let time = 3
    timer.innerHTML = time
    timerInterval = setInterval(function(){
        time -= 1
        timer.innerHTML = time
        if(time <= 0){
            clearInterval(timerInterval)
            
        }
        return time
    }, 1000)

    p1Interval = setInterval(randomPic1, 40)
    p2Interval = setInterval(randomPic2, 40)
    
    function randomPic1(){ //rullerer tilfeldig mellom bildene
        let x = Math.floor(Math.random() * 3)

        if(x == 0){
            p1.src = "../img/stein.jpg"
        }
        if(x == 1){
            p1.src = "../img/saks.jpg"
        }
        if(x == 2){
            p1.src = "../img/papir.jpg"
        }
    }
    function randomPic2(){ //rullerer tilfeldig mellom bildene
        let x = Math.floor(Math.random() * 3)

        if(x == 0){
            p2.src = "../img/stein.jpg"
            com = "stein"
        }
        if(x == 1){
            p2.src = "../img/saks.jpg"
            com = "saks"
        }
        if(x == 2){
            p2.src = "../img/papir.jpg"
            com = "papir"
        }
    }
    
    stein.addEventListener("click", e => { //lagrer valget "stein"
        hand = "stein"
        early = ""
        p1.src = "../img/stein.jpg"
        if(timer.innerHTML >= 2){ //hvis du trykker for tidlig velger motstander papir
            console.log(timer.innerHTML)
            early = "papir"
        }
        clearInterval(p1Interval);
    })
    saks.addEventListener("click", e => { //lagrer valget "saks"
        hand = "saks"
        early = ""
        p1.src = "../img/saks.jpg"
        if(timer.innerHTML >= 2){ //hvis du trykker for tidlig velger motstander stein
            console.log(early)
            early = "stein"
        }
        clearInterval(p1Interval);
    })
    papir.addEventListener("click", e => { //lagrer valget "papir"
        hand = "papir"
        early = ""
        p1.src = "../img/papir.jpg"
        if(timer.innerHTML >= 2){ //hvis du trykker for tidlig velger motstander saks
            console.log(early)
            early = "saks"
        }
        clearInterval(p1Interval);
    })

    setTimeout(function(){ //kjører etter 3 sek
        clearInterval(p1Interval);
        clearInterval(p2Interval);
        console.log(com)
        if(early == "stein"){ //skjekker om du trykket for tidlig
            p2.src = "../img/stein.jpg"
            p2Score += 1
            p2ScoreHtml.innerHTML = `${p2Score}`
            p1.style.border = "solid red"
            p2.style.border = "solid green"
            loseSound.play()
            console.log("for rask stein")
        } else if(early == "saks"){
            p2.src = "../img/saks.jpg"
            p2Score += 1
            p2ScoreHtml.innerHTML = `${p2Score}`
            p1.style.border = "solid red"
            p2.style.border = "solid green"
            loseSound.play()
            console.log("for rask saks")
        } else if(early == "papir"){
            p2.src = "../img/papir.jpg"
            p2Score += 1
            p2ScoreHtml.innerHTML = `${p2Score}`
            p1.style.border = "solid red"
            p2.style.border = "solid green"
            loseSound.play()
            console.log("for rask papir")
        } else {
            if(hand == "stein" && com == "saks"){ //skjekker om du vant
                p1Score += 1
                p1ScoreHtml.innerHTML = `${p1Score}`
                p1.style.border = "solid green"
                p2.style.border = "solid red"
                winSound.play()
                console.log("win")
            } else if(hand == "saks" && com == "papir"){ 
                p1Score += 1
                p1ScoreHtml.innerHTML = `${p1Score}`
                p1.style.border = "solid green"
                p2.style.border = "solid red"
                winSound.play()
                console.log("win")
            } else if(hand == "papir" && com == "stein"){
                p1Score += 1
                p1ScoreHtml.innerHTML = `${p1Score}`
                p1.style.border = "solid green"
                p2.style.border = "solid red"
                winSound.play()
                console.log("win")
            } else if(hand == com){ //skjekker om det ble uavgjort
                p1.style.border = "solid white"
                p2.style.border = "solid white"
                console.log("tie")
            } else { //hvis du ikke vant eller ble uavgjort, så taper du
                p2Score += 1
                p2ScoreHtml.innerHTML = `${p2Score}`
                p2.style.border = "solid green"
                p1.style.border = "solid red"
                loseSound.play()
                console.log("lose")
            }
        }
        
        if(p1Score == 2 || p2Score == 2){ //starter ny runde hvis noen har "2" i score
            console.log("ny runde")
            setTimeout(function(){
            if(p1Score == 2){
                p1Wins += 1
                p1WinsHtml.innerHTML = `${p1Wins}`
            }
            if(p2Score == 2){
                p2Wins += 1
                p2WinsHtml.innerHTML = `${p2Wins}`
            }
            readyButton.style.backgroundColor = "red";
            readyButton.style.border = "solid red";
            readyButton.style.animation = "button 1s"
            readyButton.style.animationDirection = "alternate" 
            readyButton.style.animationIterationCount = "infinite"
            p1Score = 0
            p2Score = 0
            round += 1
            p1ScoreHtml.innerHTML = `${p1Score}`
            p2ScoreHtml.innerHTML = `${p2Score}`
            roundHtml.innerHTML = `${round}`
            readyButton.innerText ="Spill igjen?"
            document.getElementById("readyButton").disabled = false; 
            }, 1000)
        } else if(p1Score < 2 || p2Score < 2){ //hvis ingen har "2" i score, kjører koden igjen
            setTimeout(function(){
                loop()
            },500)
        }
    } ,3000)
}
      
readyButton.addEventListener("click", e => {
    loop()
})

