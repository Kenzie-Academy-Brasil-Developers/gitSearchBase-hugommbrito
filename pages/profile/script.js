// RENDERIZAR O HEADER
function renderProfileInfo(){
    let profileInfo = JSON.parse(sessionStorage.getItem("profileInfo"))
    document.querySelector("header").insertAdjacentHTML("afterbegin", `
        <div class="user flex gap-4 align-center">
            <img src="${profileInfo.avatar_url}" alt="">
            <div class="user-info flex-col gap-6">
                <h2 class="title-2">${profileInfo.name}</h2>
                <p class="text-2">${profileInfo.bio}</p>
            </div>
        </div>
        <div class="flex gap-5 align-center">
            <a href="mailto:${profileInfo.email}"><button class="btn-primary">Email</button></a>
            <a href="../../index.html"><button class="btn-grey">Trocar de usuário</button></a>
        </div>
    `)
}
renderProfileInfo()



// RENDERIZAR OS CARDS DE REPOSITÓRIOS
function renderRepoCards() {
    let divCardsContainer = document.querySelector("#repo-cards-container")
    let SSRepos = JSON.parse(sessionStorage.getItem("ProfileRepos"))

    SSRepos.forEach(({name, description, html_url}) => {
        divCardsContainer.insertAdjacentHTML("beforeend", `
            <div class="card flex-col spc-btwn">
                <h3 class="title-3">${name}</h3>
                <p class="text-3">${description}</p>
                <div class="flex gap-5">
                    <a href="${html_url}" target="_blank"><button class="btn-outline">Repositório</button></a>
                    <button class="btn-outline">Demo</button>
                </div>
            </div>
        `)
    })
}
renderRepoCards()