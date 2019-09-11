const TEAMS_URL = "http://localhost:3000/teams"
const PLAYERS_URL = "http://localhost:3000/players"
const createTeamForm = document.getElementById("create-team-form")
let allPlayers = []
const modal = document.querySelector(".modal");
function toggleModal() {
    modal.classList.toggle("show-modal");
}
function main() {
    document.addEventListener("DOMContentLoaded", () =>{
        fetchPlayers()
        showTeams()
        createTeam()
        playerDropdowns()
        deleteTeam()
        editTeam()
    })
}







function editTeam() {
    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }
    document.addEventListener("click", (e)=> {
        if (e.target.className==="ui blue button edit-team-button"){
            let teamButton = e.target
            let teamID = e.target.dataset.id
            const modalContent = document.getElementById("modal-content")
            // console.log(allPlayers)
            modalContent.innerHTML = `<span class="close-button">&times;</span>
            <div id="edit-team-div">
                <h3>Edit Team</h3>
                <div class="ui mini form">
                    <form id="edit-team-form" class="ui equal width form">
                      <div class="fields">
                        <div class="field">
                        <label>Team Name</label>
                        <input placeholder="Team Name" type="text" value="">
                        </div>
                        <div class="field">
                        <label>Goalkeeper</label>
                        <select id="modal-goalkeeper-dropdown" class="position ui search selection dropdown">
                        </select>
                        </div>
                        <div class="field">
                          <label>Left Back</label>
                          <select id="modal-lb-dropdown" class="position ui search selection dropdown">
                          </select>
                        </div>
                        <div class="field">
                          <label>Left Center Back</label>
                          <select id="modal-lcb-dropdown" class="position ui search selection dropdown">
                          </select>
                        </div> 
                        <div class="field">
                          <label>Right Center Back</label>
                          <select id="modal-rcb-dropdown" class="position ui search selection dropdown">
                          </select>
                        </div>  
                        <div class="field">
                          <label>Right Back</label>
                          <select id="modal-rb-dropdown" class="position ui search selection dropdown">
                          </select>
                        </div>  
                      </div>
                      <div class="fields">
                        <div class="field">
                          <label>Center Defensive Mid</label>
                          <select id="modal-cdm-dropdown" class="position ui search selection dropdown">
                          </select>
                        </div>      
                        <div class="field">
                          <label>Left Attacking Mid</label>
                          <select id="modal-lam-dropdown" class="position ui search selection dropdown">
                          </select>
                        </div>
                        <div class="field">
                          <label>Right Attacking Mid</label>
                          <select id="modal-ram-dropdown" class="position ui search selection dropdown">
                          </select>
                        </div>   
                        <div class="field">
                          <label>Left Winger</label>
                          <select id="modal-lw-dropdown" class="position ui search selection dropdown">
                          </select>
                        </div>   
                        <div class="field">
                          <label>Striker</label>
                          <select id="modal-st-dropdown" class="position ui search selection dropdown">
                          </select>
                        </div>     
                        <div class="field">
                          <label>Right Winger</label>
                          <select id="modal-rw-dropdown" class="position ui search selection dropdown">
                          </select>
                        </div>
                      </div>
                      <div id="edit-team-button" class="ui submit button">Edit</div>
                  </form>
                </div>
              </div>`
            allPlayers.forEach(player => {
                addPlayerToDropdown(player)
                $("select").each(function() { this.selectedIndex = 5});
               
            })
            const closeButton = document.querySelector(".close-button");
            const editButton = document.querySelector("#edit-team-button")
            
            editButton.addEventListener("click", (e) => {
                editTeamRequest(teamID, teamButton)
            })

            closeButton.addEventListener("click", (e) => {
                toggleModal()
            }
            );
            toggleModal();
        }
    })

    function editTeamRequest(teamID, teamButton){
        const editTeamForm = document.getElementById("edit-team-form")
        const formData = {
            teamName: editTeamForm[0].value,
            players: [editTeamForm[1].value,editTeamForm[2].value,editTeamForm[3].value,editTeamForm[4].value,editTeamForm[5].value,editTeamForm[6].value,editTeamForm[7].value,editTeamForm[8].value,editTeamForm[9].value,editTeamForm[10].value,editTeamForm[11].value]
        }
        const reqObj = {
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData)
        }
        fetch(`${TEAMS_URL}/${teamID}`, reqObj)
        .then(res=>res.json())
        .then(team =>{
            teamButton.parentNode.parentNode.parentNode.innerHTML = ` 
            <div class="striker-area">
              <div class="striker">${team.players[0].name}</div>
            </div>
            <div class = "winger-area">
              <div class = "left-winger">${team.players[1].name}</div>
              <div class = "right-winger">${team.players[2].name}</div>
            </div>
            <div class = "cam-area">
              <div class = "left-cam">${team.players[3].name}</div>
              <div class = "right-cam">${team.players[4].name}</div>
            </div>
            <div class = "cdm-area">
              <div class = "cdm">${team.players[5].name}</div>
            </div>
            <div class = "def-area">
              <div class = "left-back">${team.players[6].name}</div>
              <div class = "left-center-back">${team.players[7].name}</div>
              <div class = "right-center-back">${team.players[8].name}</div>
              <div class = "right-back">${team.players[9].name}</div>
            </div>
            <div class = "goalkeeper-area">
              <div class = "goalkeeper">${team.players[10].name}</div>
            </div>
            <div class = team-buttons-div>
                <div class="delete-team-button-div">
                  <button data-id="${team.id}" class = "ui red button delete-team-button">Delete</button>
                </div>
                <div class="edit-team-button-div">
                  <button data-id="${team.id}" class="ui blue button edit-team-button">Edit</button>
                </div>
              </div>`
              toggleModal();
        })
    }


    
  
    window.addEventListener("click", windowOnClick);

    // x- find edit button
    // x- if pressed, get model to pop up
    // put form into modal
    // when form is submitted, send Patch to API
    //then edit team on screen without refresh
}













function deleteTeam() {
    document.addEventListener("click", (e) => {
        if(e.target.className==="ui red button delete-team-button") {
            removeTeamFromApi(e.target)
        }
    })
    // add a listener to button
    // when clicked, delete team in backend
    // then remove that team from screen
}

function removeTeamFromApi(button) {
    fetch(`${TEAMS_URL}/${button.dataset.id}`, {method:"DELETE"})
    .then(res => res.json())
    .then(message => {
        button.parentNode.parentNode.parentNode.remove()
    })
}

function fetchPlayers() {
    fetch(PLAYERS_URL)
    .then(resp => resp.json())
    .then(players => showPlayers(players))
}
function showPlayers(players) {
    const showPlayersList = document.getElementById("show-players-list")
    showPlayersList.width = 70%
    players.forEach(player => {
        const renderPlayer = document.createElement("li")
        renderPlayer.id = "show-player"
        renderPlayer.innerHTML= `${player.name} (${player.club})`
        showPlayersList.append(renderPlayer)
        
    });
}

function showTeams() {
    fetch(TEAMS_URL)
    .then(res => res.json())
    .then(teams => {
        teams.forEach(team => {
            createIndividualPitch(team)
        })
        
    })
    // x -fetch teams
    // x -create a new div for a team
    // x -insert players into positions in team
    // x -render new div to screen
}

function createIndividualPitch(team) {
    const newPitch = document.createElement("div")
    const allTeams = document.getElementById("all-teams-div")
    newPitch.className = "show-team-div"
    newPitch.innerHTML=` 
    <div class="striker-area">
      <div class="striker">${team.players[0].name}</div>
    </div>
    <div class = "winger-area">
      <div class = "left-winger">${team.players[1].name}</div>
      <div class = "right-winger">${team.players[2].name}</div>
    </div>
    <div class = "cam-area">
      <div class = "left-cam">${team.players[3].name}</div>
      <div class = "right-cam">${team.players[4].name}</div>
    </div>
    <div class = "cdm-area">
      <div class = "cdm">${team.players[5].name}</div>
    </div>
    <div class = "def-area">
      <div class = "left-back">${team.players[6].name}</div>
      <div class = "left-center-back">${team.players[7].name}</div>
      <div class = "right-center-back">${team.players[8].name}</div>
      <div class = "right-back">${team.players[9].name}</div>
    </div>
    <div class = "goalkeeper-area">
      <div class = "goalkeeper">${team.players[10].name}</div>
    </div>
    <div class = team-buttons-div>
        <div class="delete-team-button-div">
          <button data-id="${team.id}" class = "ui red button delete-team-button">Delete</button>
        </div>
        <div class="edit-team-button-div">
          <button data-id="${team.id}" class="ui blue button edit-team-button">Edit</button>
        </div>
      </div>`
    allTeams.append(newPitch)
}

function createTeam() {
    const createTeamButton = document.getElementById("create-team-button")
    
    createTeamButton.addEventListener("click", (e) => {
        e.preventDefault
        const formData = {
            teamName: createTeamForm[0].value,
            players: [createTeamForm[1].value,createTeamForm[2].value,createTeamForm[3].value,createTeamForm[4].value,createTeamForm[5].value,createTeamForm[6].value,createTeamForm[7].value,createTeamForm[8].value,createTeamForm[9].value,createTeamForm[10].value,createTeamForm[11].value]
        }
        postTeam(formData)


        //upon click, create team in backend
        //append players to the created team
        //clear form values
        //render new team to page in correct order
    })
}
function postTeam(formData) {

        reqObj = {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(formData)
        }
    fetch(TEAMS_URL, reqObj)
    .then(res => res.json())
    .then(team => {
        createIndividualPitch(team)
        resetForm()
    })
}

function playerDropdowns() {
    fetch(PLAYERS_URL)
    .then(res => res.json())
    .then(players => {
        allPlayers = players
        console.log(allPlayers)
        players.forEach(player => {
            addPlayerToDropdown(player)
        })
    })
    //fetch players
    //for each player, make it an option in each dropdown
}

function addPlayerToDropdown(player) {
    const dropdowns = document.getElementsByClassName("position")
    for (i=0; i<dropdowns.length; i++) {
        const newOption = document.createElement("option")
        newOption.innerText=player.name
        newOption.value=player.id
        dropdowns[i].appendChild(newOption)
    }
}

function resetForm() {
    $("select").each(function() { this.selectedIndex = 0});
    createTeamForm[0].value = ""
}



main()

