//declare all variables
const input = document.getElementById("input");
const submit = document.getElementById("submit");
const reset = document.getElementById("reset");
const answer = document.getElementById("answer");
const bImage = document.getElementById("background-image");
let answerDisplayed = false;
let resetTextNode = document.createTextNode('Reset');
let submitTextNode = document.createTextNode('Submit');

//Functions to update DOM.
function fetchAnswer(params){
    params = encodeURIComponent(params);
    let uri = "https://8ball.delegator.com/magic/JSON/" + params;
    console.log(uri);
    fetch(uri)
        .then(response => response.json())
        .then(data =>{console.log(data.magic.answer);
                      printAnswer(data.magic.answer)})
        .then(buttonChange());

}

function printAnswer(answer1){
    let newEl = document.createElement('span');
    let newAns = document.createTextNode(answer1);
    newEl.appendChild(newAns);
    answer.appendChild(newEl);
}

//Adjust background image dimensions IIFE

(function adjustImage() {
  bImage.style.width = "70%";
  bImage.style.height = "auto";
})()

//Change button

function buttonChange() {
   submit.replaceChild(resetTextNode, submitTextNode);
}


//Add Event listeners
submit.addEventListener('click',function(){
    if(answerDisplayed){
        return;
    } else {  
    let textVal = input.value;
    if(!textVal){
        alert('Please enter a valid question!!')
    }else{
    answerDisplayed = true; 
    fetchAnswer(textVal);
    }
    }
});

//Refresh page
reset.addEventListener('click', () => {
    window.location.reload();
});