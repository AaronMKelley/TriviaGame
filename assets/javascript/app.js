// variables
var timerInterval;
var correctAnswers=0;
var wrongAnswers=0;
var unanswered=0;
var questionCounter=0;
var counter= 11;
var inter;





var questions = [
   { question:"How many seasons of The Office are there?",
     choices: ["A. Seven","B. Nine","C. Five","D. Eight",],
     correctImage:"assets/images/OfficeCorrect1.gif",
     wrongImage:"assets/images/OfficeWrong1.gif",
     choiceAnswer: ["B. Nine"]
},
  {
   question: "Where is the Office Located?",
   choices:[ "A. Syracuse", "B Scranton","C Stamford", "D Rochester",],
   correctImage:"assets/images/OfficeCorrect2.gif",
   wrongImage:"assets/images/OfficeWrong2.gif",
   choiceAnswer: ["B Scranton"]
  },
  {
      question: "Name Michael Scotts Girlfriends in Order",
      choices:[ 'A Donna,Jan,Carol,Holly,Helene,Holly','B. Jan,Carol,Jan,Holly,Helene,Donna,Holly',"C. Carol,Holy,Donna,Phyllis,Meridith",'D. Jan,Donna,Jan,Holly,Pam,Donna,Holly'],
      correctImage:"assets/images/OfficeCorrect3.gif",
      wrongImage: "assets/images/OfficeWrong3.gif",
      choiceAnswer: ["B. Jan,Carol,Jan,Holly,Helene,Donna,Holly"]
},
   
  { question:"What was the name of Phyllis' husband's business?",
    choices:["A. Vance Refridgeration","B. Stewart Plumbing","C. Jones Automotive","D. Lance Construction"],
    correctImage:"assets/images/OfficeCorrect4.gif",
    wrongImage: "assets/images/OfficeWrong4.gif",
    choiceAnswer:['A. Vance Refridgeration']
  },
 {   question:"How many times was Angela engaged?",
    choices:["A. Once","B.Twice,","C. Three Times","Four Times"],
    correctImage:"assets/images/OfficeCorrect5.gif",
    wrongImage: "assets/images/OfficeWrong5.gif",
    choiceAnswer:['C. Three Times']
 },
    { question:"What does Dwight grow on his farm and with who?",
    choices:["A. Corn & Grandpa Joe","B. Radishes and Brother Mark","C. Beets and Cousin Mose","D.Wheat and Papa George"],
    correctImage:"assets/images/OfficeCorrect6.gif",
    wrongImage: "assets/images/OfficeWrong6.gif",
    choiceAnswer:['C. Beets and Cousin Mose']

}];


$('#start').on('click',function(x){
    startGame()
    $('#start').remove();
    // var inter= setInterval(addTimer,1000);
    // setInterval(addTimer,1000)
})

$(document).on('click', ".answer-button", function(x){
    choseAnswer(this);
})

$(document).on('click','#start-over',function(x){
    reset();
})

function addTimer(){
    // setInterval(addTimer,1000)
    counter--
    $("#time").text('Time Remaining'+' '+counter)
    // var inter= setInterval(addTimer,1000)
    if (counter<=0){
        timesUp();
    }
    // setInterval(addTimer,1000)
}

function startGame (){
    clearInterval(inter);
    inter =setInterval(addTimer,1000);
//    addTimer();
   var question= $('<span>');
   question.text(questions[questionCounter].question);
    $('#question').html(question)
    for (var i = 0; i < questions[questionCounter].choices.length; i++){
        $('#multipleChoice').append('<button class="answer-button" id="button"' + 'data-name="' + questions[questionCounter].choices[i] + '">' + questions[questionCounter].choices[i] + '</button>');
        $('<button>').addClass("answer-button");
    }
}
    
function nextQuestion(){
    clearInterval(inter);
    $('#image').empty();
    $('#message').empty();
    $('#question').empty();
    $('#multipleChoice').empty();
    counter=31; 
    inter=setInterval(addTimer,1000)
    questionCounter++
    startGame();
}


function choseAnswer(x){
    clearInterval(inter);
    if ($(x).data("name")==questions[questionCounter].choiceAnswer){
   answeredCorrectly();
} else {
  answeredIncorrectly();
}
}


function answeredCorrectly(){
    clearInterval(inter);
    correctAnswers++
    $("#multipleChoice").empty();
    $('#question').html("Correct!")
    $('#multipleChoice').append('<img src="' + questions[questionCounter].correctImage + '" />')

    if (questionCounter===questions.length-1){
        setTimeout(results,7000)
    }
    else{
        setTimeout(nextQuestion,7000)
    }
};

function answeredIncorrectly(){
    clearInterval(inter);
    wrongAnswers++
    $("#multipleChoice").empty();
    $('#question').html("Wrong! The Correct Answer Was:"+questions[questionCounter].choiceAnswer);
    $('#image').append('<img src="' + questions[questionCounter].wrongImage + '" />')

    if (questionCounter===questions.length-1){
        setTimeout(results,7000)
    }
    else{
        setTimeout(nextQuestion,7000)
    }
}

function timesUp (){
    unanswered ++
    clearInterval(inter);
    $("#multipleChoice").empty();
    $('#question').html('<h2>Out of Time!</h2>');
    $('#message').append('<h3>The Correct Answer Was: ' + questions[questionCounter].choiceAnswer);
    $('#image').append('<img src="' + questions[questionCounter].wrongImage + '" />');
    if (questionCounter===questions.length-1){
        setTimeout(results,5000)
    }
    else{
        setTimeout(nextQuestion,5000)
    }
}
function reset(){
    questionCounter = 0;
    wrongAnswers=0;
    correctAnswers = 0;
    unanswered = 0;
    $('#message').empty();
    $('#image').empty();
    $('#multipleChoice').empty();
    $('#start-over').remove();
    startGame();
}            

function results(){
clearInterval(inter)
$('#time').empty();
$('#mutlipleChoice').empty();
$('#question').html("Thanks for Playing")
$('#message').html(' '+"Correct Answers:"+' '+correctAnswers+' '+"Wrong Answers:"+' '+wrongAnswers+' '+'Unanswered:'+' '+unanswered);
// $('#image').remove();
$('#message').append('<br><button id="start-over">Start Over?</button>');
if (correctAnswers>wrongAnswers){
    $('#image').html("GREAT JOB! You are Worlds Best Boss material")
    $('#multipleChoice').html('<img src="assets/images/OfficeEndCorrect.gif">')
}else if (wrongAnswers>correctAnswers || unanswered>correctAnswers){
    $('#image').html("FAILURE. Dwight would be so dissapointed")
    $('#multipleChoice').html('<img src="assets/images/OfficeEndWrong.gif">')
}else if (correctAnswers=wrongAnswers){
    $('#image').html("SUBPAR. Come on now,you don't want to to the Meridith of the group")
    $('#multipleChoice').html('<img src="assets/images/OFFICESUBPAR.gif">')
}
}


   
   
   
   
   