// *** VARIABLES ***

// Sound variables
var greenSound = new Audio('/sounds/green.mp3');
var redSound = new Audio('/sounds/red.mp3');
var yellowSound = new Audio('/sounds/yellow.mp3');
var blueSound = new Audio('/sounds/blue.mp3');
var wrongSound = new Audio('/sounds/wrong.mp3');

// Game sequence
var gameSequence = [];

// Human sequence
var humanSequence = [];  

// Ready to start
var start = false;

// *** FUNCTIONS ***

// Function to generate next button of the game sequence
function nextButton(){

    var randomColor = Math.floor(Math.random() * 4) + 1; 
    var buttonColors = ['green', 'red', 'yellow', 'blue'];     

    gameSequence.push(buttonColors[randomColor-1]);               // Push a random color to the gameSequence
    playSound(buttonColors[randomColor-1]);                       // Play the sound of the color
    $('.' + buttonColors[randomColor-1]).fadeOut(200).fadeIn(200);//FadeOut and FadeIn the next button
}

// Function to animate the button
function animatePress(color){

    $('.' + color).addClass('pressed'); 

    setTimeout( function(){
        $('.' + color).removeClass('pressed');
    }, 200);
}

// Function to play the sound
function playSound(color){
    switch (color) {
        case 'green':
            greenSound.play();
            break;
        case 'red':
            redSound.play();
            break;
        case 'yellow':
            yellowSound.play();
            break;
        case 'blue':
            blueSound.play();            
            break;
        default: console.log('Error: No sound played. Wrong color: ' + color);
            break;
    }
}

// Function to validade the sequence on the last level given
function validateSequenceLevel(providedSequence){    
    
    if(providedSequence[providedSequence.length-1] == gameSequence[providedSequence.length-1]){
        return true;
    } else {  
        return false;             
    }        
}

// Stuff that happens when sequence os invalid
function gameOver(){

    wrongSound.play();                                      // Play the wrong sound    
    $('h1').text('Game Over, Press Any Key to Restart');    // Alter the H1 text

    $('body').addClass('game-over');                        // Add the red background and remove it after 200ms
    setTimeout( function(){
        $('body').removeClass('game-over');
    }, 200);

    start = false;       // Force restart
    humanSequence = [];  // Reset humanSequence
    gameSequence = [];   // Reset gameSequence
}

// *** OTHERS ***

// Keydown to press any keyboard key to play
$(document).on('keydown', function(event){

    if (!start){                
        nextButton();
        $('h1').text('Level ' + gameSequence.length);
        start = true;
    } 
})

// When any button is clicked
$('.btn').on('click', function(){

    if(start){       
                
        var colorChosen = $(this).attr('id');                   // Save the color of the button pressed
        humanSequence.push(colorChosen);                        // Insert to the humanSequence    

        if(validateSequenceLevel(humanSequence)){               // Validate the last button pressed

            playSound(colorChosen);                             // Play sound of color chosen
            animatePress(colorChosen);                          // Animate the button chosen

            if(humanSequence.length == gameSequence.length){    // If the lenght is equal and all the buttons
                                                                // were validated, then the next button can be played
                setTimeout(function(){
                    nextButton();                               // After 500ms show the next button and erase the
                    humanSequence = [];                         // previously played sequence
                    $('h1').text('Level ' + gameSequence.length);
                }, 500);
            }

        } else {                                              
            gameOver();        
        }             
    }
})
