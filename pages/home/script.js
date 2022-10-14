// RENDERIZAR ACHADOS RECENTEMENTE
function renderRecentSearch() {
    let divRecentSearch = document.querySelector("#recent-search")
    let LSList = JSON.parse(localStorage.getItem("recentSearch")) || []
    let counter = 0

    LSList.forEach(element => {
        let divProfile = document.createElement("div")
        let imgProfile = document.createElement("img")
        let btnProfile = document.createElement("button")

        divProfile.classList.add("recent-user")

        imgProfile.id = `img-${counter}`
        imgProfile.src = element.avatar_url

        btnProfile.id = `btn-${counter}`
        btnProfile.classList.add("btn-white", "hidden")
        btnProfile.innerText = "Acessar esse Perfil"

        divProfile.appendChild(imgProfile)
        divProfile.appendChild(btnProfile)
        divRecentSearch.appendChild(divProfile)

        counter++
    })
}
renderRecentSearch()



// MOSTRAR "ACESSAR PERFIL" NOS ACHADOS RECENTES
let recentUsers = document.querySelectorAll(".recent-user img")
let recentUsersBtns = document.querySelectorAll(".recent-user button")
let divPinkInfo = document.querySelector(".div-pink-info")

function toggleClassHidden(){
    recentUsers.forEach(user => user.addEventListener("mouseenter", e => {
        recentUsersBtns.forEach(btn => btn.classList.add("hidden"))
    
        let imgId = e.target.id[4]
    
        let respectiveBtn = document.getElementById(`btn-${imgId}`)
        respectiveBtn.classList.toggle('hidden')
    }))
    divPinkInfo.addEventListener("mouseleave", e => {
        recentUsersBtns.forEach(btn => btn.classList.add("hidden"))
    })
}
toggleClassHidden()

recentUsersBtns.forEach(btn => btn.addEventListener("click", e => {
    let LSList = JSON.parse(localStorage.getItem("recentSearch"))
    let profileClicked = LSList[e.target.id[4]].login
    getProfileRepos(profileClicked)
    getProfileInfo(profileClicked)

}))

// ESCUTA O INPUT PARA ATIVAR O BOTÃO
let btnSeeProfile = document.getElementById("btn-see-profile")
let profileInput = document.getElementById("profile-input")

function activateSearchBtn() {
    profileInput.addEventListener("keyup", e => {
        (profileInput.value.length > 0) ? btnSeeProfile.removeAttribute("disabled") : btnSeeProfile.setAttribute("disabled", "");
    })
}
activateSearchBtn()


// FAZER BUSCA NA API E SALVA NO WebStorage
function searchBtnAction(){
    btnSeeProfile.addEventListener("click", e => {
        btnSeeProfile.innerHTML = "<div class='loading-btn'></div>"
        let inputValue = profileInput.value
        getProfileRepos(inputValue)
        getProfileInfo(inputValue)
    })
}

let userNotFound = document.querySelector("#user-not-found")
async function getProfileRepos(routeParam){
    let APIRepos = await fetch(`https://api.github.com/users/${routeParam}/repos`)
        .then((response) => response.json())
        .then((secondResponse) => secondResponse)
    if(APIRepos.message != "Not Found"){
        sessionStorage.setItem("ProfileRepos", JSON.stringify(APIRepos))
        window.location.href = "./pages/profile/index.html"
    }

}

async function getProfileInfo(routeParam) {
    try{
        let APIData = await fetch(`https://api.github.com/users/${routeParam}`)
        .then((response) => {
            if(response.ok){
                return response.json()
            } else {
                userNotFound.classList.remove("hidden")
                btnSeeProfile.innerHTML = "Ver perfil do github"
            }
        })
        .then((secondResponse) => secondResponse)
        sessionStorage.setItem("profileInfo", JSON.stringify(APIData))

        let localStorageList = JSON.parse(localStorage.getItem("recentSearch")) || []
        let newSearch = {
            login: APIData.login,
            avatar_url: APIData.avatar_url
        }
        localStorageList.unshift(newSearch)
        localStorageList = localStorageList.slice(0, 3)
        localStorage.setItem("recentSearch", JSON.stringify(localStorageList))
        console.log(localStorageList)
    } finally {
    }
}

searchBtnAction()





