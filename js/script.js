const charactersContainer = document.getElementById("charactersContainer")
const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")
const resetBtn = document.getElementById("resetBtn")
const API_URL = "http://localhost:4000/characters"


searchBtn.addEventListener("click", async () => {
  const searchValue = searchInput.value.trim().toLocaleLowerCase()
  if(searchValue) {
    const characters = await fetchCharactersByName(searchValue)
    renderCharacters(characters)
  }
})

resetBtn.addEventListener("click", () => {
  searchInput.value = ""
  loadAllCharracters()
})


// Dejamos la página en blanco

// resetBtn.addEventListener("click", () => {
//   searchInput.value = ""
//   charactersContainer.innerHTML = ""
// })

const fetchCharactersByName = async (name) => {
  try {
    const response = await fetch(`${API_URL}/${name}`)
    const data = await response.json()
    if(data.error) {
      return []
    }
    return data
  } catch(error) {
    console.error(error)
    return []
  }
}

const fetchAllCharacters = async () => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    return data
  } catch(error) {
    console.error(error)
  }
}

const renderCharacters = (characters) => {
  if(!characters || characters.length === 0) {
    charactersContainer.innerHTML = "<p>No se ha encontrado ningún personaje</p>"
    return
  }
  const result = characters.map(({name, image}) => {
    const template = `
      <li>
        <h2>${name}</h2>
        <img src=${image} alt=${name}>
      </li>
    `
    return template
  })
  charactersContainer.innerHTML = result.join("")
}

const loadAllCharracters = async () => {
  const characters = await fetchAllCharacters()
  renderCharacters(characters)
}

loadAllCharracters()