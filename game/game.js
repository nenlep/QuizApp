const question = document.getElementById('question')
const Textscore = document.getElementById('score')
const progressBarFull = document.getElementById('progressBarFull')
const choices = Array.from(document.getElementsByClassName('choice-text'))
const progressTitle = document.getElementById('hud-title')
const loader = document.getElementById('loader')
const game = document.getElementById('game')

// fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
// .then(res => {
//   res.json()
// }).then(loadedQuestions => {

// })


let acceptingAnswers = false
let currQuestion = {}
let qCounter = 0
let availQuestions = []
let score = 0

let questions = []

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple").then(res => {
  return res.json()
}).then((loadedQuestions)=>{
  //questions = loadedQuestions
 
  questions = loadedQuestions.results.map(loadedQuestion => {
    const formattedQuestion = {
      question: loadedQuestion.question
    }
    const answerChoices = [...loadedQuestion.incorrect_answers]
    // random index between 0 and 3
    formattedQuestion.answer = Math.floor(Math.random() * 3) + 1
    // add correct answer to answerChoices at index formattedaswer - 1
    answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer)
    answerChoices.forEach((choice,index) => {
      formattedQuestion["choice" + (index+1)] = choice
    })
    return formattedQuestion
  })
  
  startGame()
}).catch(err => {
  console.log(err)
})

const max_Questions = 10
startGame = () => {
  qCounter = 0
  availQuestions = [...questions];
  score = 0
  getNewQuestions()
  // show game and hide loader
  game.classList.remove('hidden')
  loader.classList.add('hidden')
}

getNewQuestions = () => {
  // if no more availQuestins or question counter is > max_Questions, end game
  if(availQuestions.length == 0 || qCounter >= max_Questions){
    localStorage.setItem('mostRecentScore', score)
    window.location.assign('/end/end.html')
  }
  // increase question counter
  qCounter ++

  // update progress title
  progressTitle.innerText = `Question ${qCounter} / ${max_Questions}`
  // update progress bar

  progressBarFull.style.width = `${(qCounter / max_Questions) * 100}%`

  // generate random availquestion array index number
  let questionIndex = Math.floor(Math.random() * availQuestions.length)
  currQuestion = availQuestions[questionIndex]
  
  //display current question in html element
  question.innerText = currQuestion.question

  // for each choice data number display corresponding choice in questions array
  choices.forEach(choice => {
    const num = choice.dataset['number']
    choice.innerText = currQuestion['choice' + num]
  })

  // remove displayed question form availQuestions array
  availQuestions.splice(questionIndex, 1)

  acceptingAnswers = true
  
}

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if(!acceptingAnswers) return
    acceptingAnswers = false
    
    const selectedChoice = e.target
    const selectedAnswer = e.target.dataset['number']

    // if selectedChoice == answer to question, classToApply is correct else incorrect
    const classToApply = selectedAnswer == currQuestion.answer ? 'correct' : 'incorrect'
    
    if(classToApply == 'correct'){
      // increase and display score
      incScore()  
      //console.log(score) 
    }
    // add classToApply to classList
    
    selectedChoice.classList.add(classToApply)
    
    setTimeout(() => 
      {selectedChoice.classList.remove(classToApply) 
        getNewQuestions()
      }, 1000);
    
  })
})
incScore = () => {
  score++
  Textscore.innerText = score
}
