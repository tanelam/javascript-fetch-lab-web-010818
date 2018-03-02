document.addEventListener("DOMContentLoaded", function(){
  console.log("loaded")
})

const TOKEN = "b1b2702672d0b0c2f671738495da7577e67ef924"
const USER = 'tanelam';
const API = 'https://api.github.com/'
const REPO = 'javascript-fetch-lab'


function createIssue() {
  const issueTitle = document.getElementById("title").value
  const issueBody = document.getElementById("body").value

   object = {
    method: "POST",
    body: JSON.stringify({title: issueTitle, body: issueBody}),
    headers: {
      Authorization: `token ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }
  fetch('https://api.github.com/repos/tanelam/javascript-fetch-lab/issues', object)
  .then(res => res.json())
  .then(json => getIssues(json))
}

function getIssues(json) {
  fetch("https://api.github.com/repos/tanelam/javascript-fetch-lab/issues", {
    headers:{ Authorization:`token ${getToken()}`}
  })
  .then(res => res.json())
  .then(json => showIssues(json))
}

function showIssues(json) {
  let issues = document.getElementById("issues")
  let jsonArray = json
  for (let i = 0; i < jsonArray.length; i++){
    let issuesUl = document.createElement("ul")
    let issuesLi = document.createElement("li")
    issuesUl.setAttribute("id", "issue-title")
    let issue = jsonArray[i]
    issuesUl.innerText = `Issue Title: ${issue.title}`
    issuesLi.innerText = issue.body
    // issuesUl.append(issuesLi)
    issues.append(issuesUl)
    
    issuesUl.addEventListener("click", () => {
      issuesUl.append(issuesLi)
    })
  }
}

function showResults(json) {
  let results = document.getElementById('results')
  let li = document.createElement("li")
  let a = document.createElement("a")
  li.append(a)
  results.append(li)
  a.innerText = "tania"
  a.href= "#"

  li.addEventListener("click", () => {
    window.open('https://github.com/tanelam/javascript-fetch-lab')
  })
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  // console.log(`${API}repos/${repo}/forks`)
  fetch(`${API}repos/${repo}/forks`, {
    method: 'post',
    headers: { 'Authorization': `token ${getToken()}`}
  })
  .then(res => res.json())
  .then(json => showResults(json))
}

function getToken() {
   // return ''
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
   return TOKEN
}
