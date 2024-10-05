let qst = [
    {
        qest: "What is the purpose of variables in programming?",
        answer: [
            { text: "A. Storing data for later use", correct: true },
            { text: "B. Performing mathematical operations only", correct: false },
            { text: "C. Sending data to the database", correct: false },
            { text: "D. Reading files from the system", correct: false }
        ]
    },
    {
        qest: "What is the difference between the for loop and the while loop?",
        answer: [
            { text: "A. for is used when the number of iterations is known, while while is used when the number of iterations is unknown.", correct: true },
            { text: "B. while is faster than for.", correct: false },
            { text: "C. for is only used in modern programming languages.", correct: false },
            { text: "D. while is used for complex calculations only.", correct: false }
        ]
    },
    {
        qest: "What is the result of executing the following code?",
        code: `x = 10;\ny = 5;\nx += y;\nconsole.log(x);`,
        answer: [
            { text: "A. 5", correct: false },
            { text: "B. 10", correct: false },
            { text: "C. 15", correct: true },
            { text: "D. 50", correct: false }
        ]
    },
    {
        qest: "What is the purpose of using functions in programming?",
        answer: [
            { text: "A. Improving code readability and reducing repetition", correct: true },
            { text: "B. Speeding up the program execution", correct: false },
            { text: "C. Writing larger and more complex code", correct: false },
            { text: "D. Sending data to the user", correct: false }
        ]
    }
];
let qstElemnt=document.getElementById("QST");
let ansButton=document.getElementById("ans-button");
let nextBtn=document.getElementById("next-btn");


let currentQstIndex=0;
let score=0;

function startQuiz(){
    restState();
    currentQstIndex=0;
    score=0;
    nextBtn.innerHTML="Next";
    showQst();
}
function showQst() {
    let currentQst = qst[currentQstIndex];
    let qstNo = currentQstIndex + 1;
    
    qstElemnt.innerHTML = qstNo + ". " + currentQst.qest;
    
  
    if (currentQst.code) {
        const codeElem = document.createElement("pre");
        codeElem.innerHTML = `<code>${currentQst.code}</code>`;
        qstElemnt.appendChild(codeElem);
    }
    currentQst.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}



function restState() {
    nextBtn.style.display = "none"; 
    while (ansButton.firstChild) {
        ansButton.removeChild(ansButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansButton.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextBtn.style.display="block";
}

nextBtn.addEventListener("click",()=>{
    if(currentQstIndex<qst.length){
        handleNext();
    }
    else{
        startQuiz();
    }
});
function showScore(){
    restState();
    qstElemnt.innerHTML=`You scored ${score} out of ${qst.length}`;
    nextBtn.innerHTML="Play Again";
    nextBtn.style.display="block";
}
function handleNext() {
    currentQstIndex++;
    if (currentQstIndex < qst.length) {
        restState(); 
        showQst(); 
    } else {
        showScore();
    }
}

startQuiz();