const uname = document.getElementById('username')
const saveBtn = document.getElementById('saveBtn')
recentScore = localStorage.getItem('mostRecentScore')
const finalScore = document.getElementById('finalScore')
// get highscores array from local storage or create array if not existent
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const max_Scores = 5
finalScore.innerText = recentScore

uname.addEventListener('keyup', () => {
  saveBtn.disabled = !uname.value
})
saveScore = (e) => {
 
  e.preventDefault()
  const score = {
    score: recentScore,
    name: uname.value
  }
  highScores.push(score)
  // sort highscores array by score in descending
  highScores.sort((a,b) => {
    return b.score-a.score
  })
  // cut scores after 5th position
  highScores.splice(5)

  // update highscores array
  localStorage.setItem('highScores',JSON.stringify(highScores))
  window.location.assign('/index.html')
  console.log(highScores)
 
}


