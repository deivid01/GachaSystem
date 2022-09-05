let button = document.getElementById('botao')
let resultado = document.getElementById('resultado')
let divresultado = document.querySelector('.resultado')
let tiros = document.getElementById('tiros')
let historico = document.getElementById('historico')

let personagem4 = ['Bennett', 'Razor', 'Fischl', 'Amber', 'Barbara', 'Diona', 'Kujou Sara', 'Lisa', 'Ningguang', 'Rosaria']

let personagem5 = ['Raiden Shogun', 'Kamisato Ayaka', 'Diluc', 'Mona', 'Arataki Itto', 'Eula', 'Hu Tao', 'Ganyu', 'Kaedehara Kazuha', 'Yae Miko']

button.addEventListener("click", (event) => {

    event.preventDefault()

    function pers4() {
        return personagem4 [Math.floor(Math.random() * personagem4.length)]
    }

    function pers5() {
        return personagem5[Math.floor(Math.random() * personagem5.length)]
    }

    if (Number(tiros.value) <= 0) {
        divresultado.removeAttribute('hidden')
        resultado.innerText = 'Invalid shot value'
    }
    
    if (Number(tiros.value) == 100) {
        divresultado.removeAttribute('hidden')
        resultado.innerText = `Congratulations! You got the five star character ${pers5()}.`
    }

    if ((Number(tiros.value) + Number(historico.value) < 100) && (Number(tiros.value) + Number(historico.value)) > 0 ) {
        divresultado.removeAttribute('hidden')
        resultado.innerText = `Congratulations! You got the four star character ${pers4()}.`
    }

    if ((Number(tiros.value) + Number(historico.value)) >= 100 ) {
        divresultado.removeAttribute('hidden')
        resultado.innerText = `Congratulations! You got the five star character ${pers5()}.`
    }

    let hist = Number(tiros.value) + Number(historico.value)
    if (hist == 0) return ""
    historico.removeAttribute('disabled')
    historico.innerText = hist


    if (Number(historico.value) >= 100 ) {
        historico.innerText = ""

    }

})