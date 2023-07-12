function Quiz(questions){
  this.score=0;
  this.questionIndex=0;
  this.questions=questions;
}

Quiz.prototype.getQuestionByIndex=function(){
  return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded=function(){
  return this.questions.length===this.questionIndex;
}

Quiz.prototype.checkOptionWithAnswer=function(answer){
  if(this.getQuestionByIndex().isCorrectAnswer(answer)){
    this.score++;
  }
  this.questionIndex++;
}

function Question(text, choices, answer){
  this.text=text;
  this.choices=choices;
  this.answer=answer;
}

Question.prototype.isCorrectAnswer=function(choice){
  return this.answer===choice;
}

function loadQuestions(){
  if(quiz.isEnded()){
    showScores();
  }
  else{
    var element= document.getElementById("question");
    element.innerHTML=quiz.getQuestionByIndex().text;
    var choices=quiz.getQuestionByIndex().choices;
    for(var i=0;i<choices.length;i++){
      var element_choice=document.getElementById("choice"+i);
      element_choice.innerHTML=choices[i];
      handleOptionButton("btn"+i,choices[i]);
    }
    showProgress();
  }
}

function handleOptionButton(id,choice){
  var button=document.getElementById(id);
  button.onclick=function(){
      quiz.checkOptionWithAnswer(choice);
      loadQuestions();
  }
}

function showProgress(){
  var currentQuestionNumber=quiz.questionIndex+1;
  var progressbar=document.getElementById("progress");
  progressbar.innerHTML="Question "+currentQuestionNumber + " of "+ quiz.questions.length;

}

function showScores(){
  var result="<h1>Result<h1><h2 id='score'> Your Score :: ";
  result+=quiz.score;
  result+="<br>Percentage is :: "+(quiz.score/questions.length*100) +" %"
  var element=document.getElementById("quiz");
  element.innerHTML=result;
}

var questions = [
  new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"),
  new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
  new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
  new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
  new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

var quiz=new Quiz(questions);
loadQuestions();