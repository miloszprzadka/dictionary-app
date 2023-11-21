const typeBar = document.querySelector('.searchTab input');
const btn = document.querySelector('.searchTab button');
const result = document.getElementById('result');
const sound = document.getElementById('sound');


btn.addEventListener('click', function(){

    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
    const typedWord = typeBar.value;
    console.log(typedWord);
    fetch(`${url}${typedWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `        
                <div class="wordTab">
                    <p>${typedWord}</p>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>        
                </div>
                <div class="meanings">
                    <p id="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
                    <span id="pronounce">${data[0].phonetics[0].text}</span>
                </div>
                <div class="definition">
                    <p>${data[0].meanings[0].definitions[0].definition || data[0].meanings[0].definitions[2].definition || data[0].meanings[0].definitions[2].definition}</p>
                </div>
                <div class="example">
                    <span></span>
                    <p>${data[0].meanings[0].definitions[0].example || ""}</p>
                </div>`;

            sound.setAttribute("src", `${data[0].phonetics[0].audio}` || `${data[0].phonetics[1].audio}` || `${data[0].phonetics[0].audio}`);
            })

        .catch(() => {
           result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });

})

function playSound() {
    sound.play();
}