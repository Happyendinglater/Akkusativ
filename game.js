const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Ich suche _____ Ingenieur. ",
        choice1: "den",
        choice2: 'die',
        choice3: 'das',
        
        answer: 1,
    },
    {
        question: "Wo hast du _____ Fahrrad gekauft?",
        choice1: "die",
        choice2: "das ",
        choice3: "den",
        
        answer: 2,
    },
    {
        question: "Wir rufen _____ Krankenhaus an.",
        choice1: "das",
        choice2: "die",
        choice3: "den",
        
        answer: 1,
    },
    {
        question: "Hast du _____ ideale Wohnung gefunden?",
        choice1: "das",
        choice2: "den",
        choice3: "die",
        
        answer: 3,
    },
    {
        question: "Ich nehme an, dass sies ich für _____ Jungen interressiert. ",
        choice1: "den",
        choice2: "das",
        choice3: "der",
        
        answer: 1,
    },
    {
        question: "Ich freue mich auf _____ Ferien.",
        choice1: "die",
        choice2: "den",
        choice3: "das",
        
        answer: 1,
    },
    {
        question: "Wo habt ihr _____ Teppich gekauft?",
        choice1: "den",
        choice2: "die",
        choice3: "das",
        
        answer: 1,  
    },
    {
        question: "Wohin gehst du? In _____ Kino!",
        choice1: "die",
        choice2: "das",
        choice3: "den",
        
        answer: 2,
    },
    {
        question: "Brauchst du _____ Handy? ",
        choice1: "den",
        choice2: "das",
        choice3: "die",
        
        answer: 2,
    },
    {
        question: "Ich habe _____ Übung sehr interessant gefunden.",
        choice1: "das",
        choice2: "den",
        choice3: "die",
        
        answer: 3,
    },
    {
        question: "What does the accusative case represent in a sentence?",
        choice1: "the subject",
        choice2: "the indirect object",
        choice3: "the direct object",
        
        answer: 3,
    },
    {
        question: "Das Baby lässt_____ Finger nicht mehr los.",
        choice1: "den",
        choice2: "die",
        choice3: "das",
        
        answer: 1,
    },
    {
        question: "Andrea sieht _____einfach überhaupt nicht ein.",
        choice1: "des",
        choice2: "deren",
        choice3: "es",
        
        answer: 3,
    },
    {
        question: "Mein Hund kann alle _____ Befehle ohne Probleme verstehen.",
        choice1: "einfaches",
        choice2: "einfacher ",
        choice3: "einfachen",
        
        answer: 3,
    },
    {
        question: "Können wir im Kino _____ Filme sehen?",
        choice1: "schönen",
        choice2: "schöner",
        choice3: "schöne",
        
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
