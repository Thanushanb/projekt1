
// Variabler til at holde styr på den aktuelle spørgesmål og score
let currentQuestion = 0;
let score = 0;

// Liste over spørgsmål, svar og korrekt svar
const questions = [
    { 
        question: "Hvad er mikroplastik?", 
        options: ["Store stykker plastik, der flyder på havoverfladen", "Små plaststykker mindre end 5 mm", "En type plastik, der kun findes i ferskvand"], 
        answer: 1,
        wrongExplanation: "Mikroplastik er små plaststykker, der er mindre end 5 mm i størrelse."
    },
    { 
        question: "Hvordan dannes mikroplastik i havet?", 
        options: ["Gennem sollys og vind, der nedbryder større plaststykker", "Ved naturlig nedbrydning af plast i planter", "Gennem rensningsanlæg, der genbruger plast"], 
        answer: 0,
        wrongExplanation: "Mikroplastik dannes, når sollys og vind nedbryder større plaststykker til mindre partikler."
    },
    { 
        question: "Hvilken sektor står for den største udledning af mikroplastik?", 
        options: ["Byggeriet", "Transport og bilindustrien", "Tøj- og tekstilindustrien"], 
        answer: 2,
        wrongExplanation: "Tøj- og tekstilindustrien står for den største udledning af mikroplastik, især fra syntetiske fibre."
    },
    { 
        question: "Hvorfor er mikroplastik farligt for havdyr?", 
        options: ["De kan blive kvalt af større plastdele", "Mikroplastik kan ophobes i deres kroppe og forgifte dem", "Det gør dem immune over for sygdomme"], 
        answer: 1,
        wrongExplanation: "Mikroplastik kan ophobes i havdyrenes kroppe og forårsage forgiftning."
    },
    { 
        question: "Hvor findes mikroplastik oftest i havene?", 
        options: ["Kun tæt på kysterne", "Fordelt i hele vandmassen og på bunden", "Kun i de dybeste dele af havet"], 
        answer: 1,
        wrongExplanation: "Mikroplastik findes fordelt i hele vandmassen og på havbunden."
    },
    { 
        question: "Hvordan påvirker mikroplastik mennesker?", 
        options: ["Det påvirker ikke mennesker", "Det kan komme ind i fødekæden via fisk og skaldyr", "Det kan ses som små pletter i drikkevand"], 
        answer: 1,
        wrongExplanation: "Mikroplastik kan komme ind i fødekæden gennem fisk og skaldyr, som mennesker kan spise."
    },
    { 
        question: "Hvordan kommer mikroplastik fra tekstiler ud i havene?", 
        options: ["Gennem affald, der flyder fra fabrikker", "Via vask af tøj, hvor små fibre skylles ud i vandet", "Kun gennem regnvand fra marker"], 
        answer: 1,
        wrongExplanation: "Mikroplastik fra tekstiler slipper ud gennem vask af tøj, hvor små fibre skylles ud."
    },
    { 
        question: "Hvor længe kan mikroplastik forblive i havet?", 
        options: ["5-10 år", "20-50 år", "Over 100 år"], 
        answer: 2,
        wrongExplanation: "Mikroplastik kan forblive i havet i mange år, nogle gange over 100 år, da det ikke nedbrydes hurtigt."
    },
    { 
        question: "Hvilket af følgende materialer er en stor kilde til mikroplastik?", 
        options: ["Glas", "Gummi fra bildæk", "Papir"], 
        answer: 1,
        wrongExplanation: "Gummi fra bildæk er en stor kilde til mikroplastik, da det nedbrydes og frigiver små partikler."
    },
    { 
        question: "Hvad kan man gøre for at reducere mængden af mikroplastik i havene?", 
        options: ["Kun bruge plastikposer én gang", "Vaske tøj mindre og undgå plastprodukter", "Undgå genbrug af plastaffald"], 
        answer: 1,
        wrongExplanation: "At vaske tøj mindre og undgå plastprodukter hjælper med at reducere mikroplastikudledningen."
    }
];

// Funktion til at indlæse det aktuelle spørgsmål og svarmuligheder
function loadQuestion() {
    document.getElementById("question-number").innerText = `${currentQuestion + 1} af ${questions.length}`;
    document.getElementById("question").innerText = questions[currentQuestion].question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    questions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.className = "option";
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

// Vis quizzen
function showQuiz() {
    document.getElementById("quiz-overlay").style.display = "flex";
    startQuiz();
}

// Luk quizzen
function closeQuiz() {
    document.getElementById("quiz-overlay").style.display = "none";
}

// Start quizzen
function startQuiz() {
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
}

// Tjek svaret
function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestion].answer;
    const feedback = document.getElementById("feedback");
    const wrongAnswerBox = document.getElementById("wrongAnswerBox");
    const wrongAnswerExplanation = document.getElementById("wrongAnswerExplanation");
    const nextButtonContainer = document.getElementById("nextButtonContainer");

    if (selectedIndex === correctIndex) {
        feedback.innerText = "Korrekt!";
        feedback.style.color = "green";
        score++;
    } else {
        feedback.innerText = "Forkert svar!";
        feedback.style.color = "red";
        wrongAnswerExplanation.innerText = questions[currentQuestion].wrongExplanation;
        wrongAnswerBox.style.display = "block";
    }

    const optionsContainer = document.getElementById("options");
    const allButtons = optionsContainer.getElementsByTagName("button");
    for (let button of allButtons) {
        button.disabled = true;
    }

    nextButtonContainer.style.display = "block";
    document.getElementById("score").innerText = `Score: ${score} / ${questions.length}`;
}

// Gå til næste spørgsmål
function nextQuestion() {
    const nextButtonContainer = document.getElementById("nextButtonContainer");
    nextButtonContainer.style.display = "none";

    const feedback = document.getElementById("feedback");
    feedback.innerText = "";

    const wrongAnswerBox = document.getElementById("wrongAnswerBox");
    wrongAnswerBox.style.display = "none";

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        feedback.innerText = `Quizzen er slut! Din endelige score er ${score} ud af ${questions.length}.`;
        feedback.style.color = "blue";

        const restartButtonContainer = document.getElementById("restartButtonContainer");
        restartButtonContainer.style.display = "block";
    }
}

// Nulstil quizzen
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("score").innerText = "";
    document.getElementById("feedback").innerText = "";

    const wrongAnswerBox = document.getElementById("wrongAnswerBox");
    wrongAnswerBox.style.display = "none";
    const nextButtonContainer = document.getElementById("nextButtonContainer");
    nextButtonContainer.style.display = "none";

    const restartButtonContainer = document.getElementById("restartButtonContainer");
    restartButtonContainer.style.display = "none";

    loadQuestion();
}
// Luk quiz-kassen, når der trykkes udenfor den
document.getElementById("quiz-overlay").addEventListener("click", function (event) {
    // Hvis der klikkes direkte på overlayet (ikke quiz-containeren), lukkes quizzen
    if (event.target.id === "quiz-overlay") {
        closeQuiz();
    }
});