"use strict";

$(document).ready(() => {

    let score = 0;
    const red_alert = new Audio("sounds/red_alert.wav");
    
    function fillGrid(arr) {
        for (let i = 0; i < arr.length; i++) {
            $(".card_deck").append(arr[i]);
        }
    }

    class CardDeck {
        constructor(numOfCards) {
            this.deck = [];
            this.numOfCards = numOfCards;
        }
        generateCards(numOfCards) {
            numOfCards = numOfCards / 2;
            const deck = [];
            for (let i = 1; i <= numOfCards; i++) {
                for (let j = 0; j < 2; j++) {
                    this.deck.push(`<div class="card is_not_flipped" value="${i}"><div class="card_face card_face_front" value="${i}"></div><div class="card_face card_face_back" value="${i}"></div></div>`);
                }
            }
        }
        randomizeCards() {
            this.deck.sort(function() {
                return 0.5 - Math.random();
            });
        }
    }

    let memoryDeck = new CardDeck();
    memoryDeck.generateCards(16);

    //when you click a card
    $(document).on("click", ".card", function() {
        let audio = new Audio("sounds/cards.mp3");
        audio.play();
        let superman = new Audio("sounds/superman.mp3");
        let batman = new Audio("sounds/batman.mp3");
        let flash = new Audio("sounds/flash.mp3");
        let wonderWoman = new Audio("sounds/wonderWoman.mp3");
        let aquaman = new Audio("sounds/aquaman.mp3");
        let greenLantern = new Audio("sounds/greenLantern.mp3");
        let captainMarvel = new Audio("sounds/shazam.mp3");
        let nightwing = new Audio("sounds/nightwing.mp3");

        //add a class to the card
        $(this).toggleClass("is_not_flipped is_flipped");

        //if 2 cards are flipped
        if ($(".is_flipped").length === 2) {
            //check if is a match
            if ($(".is_flipped").eq(0).attr("value") === $(".is_flipped").eq(1).attr("value")) {
                switch($(".is_flipped").eq(0).attr("value")) {
                    case "1":
                        superman.play();
                        break;
                    case "2":
                        batman.play();
                        break;
                    case "3":
                        flash.play();
                        break;
                    case "4":
                        aquaman.play();
                        break;        
                    case "5":
                        wonderWoman.play();
                        break;
                    case "6":
                        captainMarvel.play();
                        break;
                    case "7":
                        greenLantern.play();
                        break;
                    case "8":
                        nightwing.play();
                        break;
                    default:
                        console.log($(".is_flipped").eq(0).attr("value"))
                }
                //if matched increment score and hide cards
                $(".is_flipped").toggleClass("is_flipped")
                    .animate({ opacity: 0, }, 1000);
                score += 5;
                $("#score").text(`SCORE: ${score}`);
            } else {
                //if no match wait 3sec then flip
                $(".is_flipped")
                    .delay(1100)
                    .queue(function(next) {
                        $(".is_flipped")
                            .toggleClass("is_flipped is_not_flipped");
                        next();
                        audio.play();
                    });
            }
        }
        //win
        if (score === 40) {
            red_alert.pause();
            red_alert.currentTime = 0;
            let outstanding = new Audio("sounds/outstanding.mp3");
            setTimeout(function(){
                outstanding.play();
                
            },1000)
        }

    });

    //alternating Start/Reset button
    $("button").click(function () {
        memoryDeck.randomizeCards();
        fillGrid(memoryDeck.deck);
        
        const explosion = new Audio("sounds/explosion.wav");
        //attach images to cards
        $(".card_face_back").each(function() {
            $(this).css("background-image", `url("img/${$(this).attr("value")}.jpg")`);
        });

        //start button
        if($(this).attr("class") === "start") {
            let counter = 45;
            let jokerLaugh = new Audio("sounds/jokerLaugh.mp3");

        
            setInterval(function() {
                counter--;
              // you win, stop timer
            if (score == 40) {
                clearInterval(counter);                
                return ;
            }
                // countdown timer
                if (counter > 15) {
                    $("#count").text(counter);
                } else if (counter < 16 && counter > 5) {
                    $("#count")
                        .text(counter)
                        .css("color", "#bb2826")
                        .css("font-size", "150%");
                } else if (counter < 6 && counter >= 0) {
                    red_alert.volume = 0.5;
                    red_alert.play();
                    $("#count")
                        .text(counter)
                        .fadeOut(100);
                    $("#count")
                        .text(counter)
                        .fadeIn(100);
                }
                if (counter === 0) {
                    explosion.volume = 0.2;
                    explosion.play();
                    jokerLaugh.volume = 1.0;
                    jokerLaugh.play();
                    clearInterval(counter);
                  
                //game over
                $(".card_deck").toggle();
                $("#gameBoard").css("background", "url('img/villains.jpg')");
                $("#gameBoard").css("background-size", "cover");
                }
            }, 1000);
            $(this).
            toggleClass("start reset")
            .text("RESET");
        //reset button
        } else if ($(this).attr("class") === "reset") {
            location.reload();
            $(this)
            .toggleClass("reset start")
            .text("START");
        }
    });
    
});