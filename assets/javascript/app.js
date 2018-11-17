$(document).ready(function(){
    var number = 30;
    var intervalId;
    var currentQuestion = 0;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 0;
    var onHold = true;

    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement,1000);
        onHold=false;
        
      }
      function stop() {
        onHold=true;
        clearInterval(intervalId);
      }

      function decrement() {
        number--;
        $("#timeLeft").html("<h2>" + number + "</h2>");
        if (number === 0) {
            $("#timeLeft h2").html("Your time is up !!!"); 
            gameOver();
        }
    }  
var questions = [
{
    text: "What is the training program that everyone misses the first time?",
    choices: ["The bowling Game","The Jump Program","Telephone trick","Karate lessons"],
    answer: 1,
    img: "assets/images/1stq.gif"
},
{
    text: "What is The Matrix?",
    choices: ["You have to see it for yourself","Green dots on the screen","No one knows","Your everyday miserable life"],
    answer: 0,
    img: "assets/images/2ndq.gif"
},
{
    text: "What was neo's job in the matrix?",
    choices: ["House cleaner","Weed dealer","Computer programmer","Gigolo"],
    answer: 2,
    img: "assets/images/3q.gif"
},
{
    text: "Only one of these lines is actually SPOKEN in a movie. Which one is it?",
    choices: ["There is no fork","Human beings are like a really bad virus","Luke, I am your Father","Free your mind"],
    answer: 3,
    img: "assets/images/q4.gif"
},
{
    text: "Who said 'I know kung fu'",
    choices: ["Morpheus","Agent Smith","Cypher","Neo"],
    answer: 3,
    img: "assets/images/q5.gif"
}
]
$("#startBtn").click(function() {
    $("#timeLeft").html("<h2>" + number + "</h2>");
    $(this).hide();
nextQuestion();
});

function nextQuestion() {
    if (currentQuestion>=questions.length){
        $("#timeLeft h2").html("GAME OVER"); 
        gameOver();
        return;
    }
    $("#startBtn").hide();
    $("#timeLeft").html("<h2>" + number + "</h2>");
    var question = questions[currentQuestion];
    $("#choice"+question.answer).removeClass("correct").removeClass("incorrect");
    $("#currentQuestion").html(question.text);
    $("#answersVar").html("");
    $("#gif").html('<img src="' + question.img +'" height="200">').hide();
    $("#rightAnswer").html("");
    for (i=0; i<question.choices.length; i++){
        $("#answersVar").append('<div id="choice'+i+'" class="answerBtn">' + question.choices[i] +'</div>')
    }
    $(".answerBtn").click(function(){
        if (onHold){
           return; 
        }
        
        if ($(this).attr("id")==="choice"+question.answer){          
            $("#timeLeft h2").html("Correct!!!");
            correctAnswers++;
            
        } else {
            $("#timeLeft h2").html("Wrong!!!"); 
            incorrectAnswers++;      
            $(this).addClass("incorrect");
        }
        $("#gif").show();
        $("#choice"+question.answer).addClass("correct");
        setTimeout(nextQuestion, 5000);
        stop();
    })
    
    $("#gif").html();
    currentQuestion++;
    run();
}

function gameOver(){
    stop();
    $("#gif").html("");
    $("#rightAnswer").html(""); 
    $("#currentQuestion").html("");
    $("#answersVar").html("");
    $("#correctAnswers").html("Correct Answers: " + correctAnswers); 
    $("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswers); 
    $("#unanswered").html("Unanswered: ").append(questions.length - correctAnswers - incorrectAnswers); 
    $("#startBtn").html("Start Over").show();
}

function reset(){
     number = 30;
    intervalId;
     currentQuestion = 0;
     correctAnswers = 0;
     incorrectAnswers = 0;
     unanswered = 0;
     onHold = false;
    $("#rightAnswer").html(""); 
    $("#correctAnswers").html(""); 
    $("#incorrectAnswers").html(""); 
    $("#unanswered").html(""); 
    
    nextQuestion();
  
}
$("#startBtn").click(function() {
    reset();

    if (onHold){
       return; 
    }
    
});
});

