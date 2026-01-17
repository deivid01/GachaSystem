let button = document.getElementById('botao')
let resultado = document.getElementById('resultado')
let divresultado = document.querySelector('.resultado')
let tiros = document.getElementById('tiros')
let historico = document.getElementById('historico')
let imgres = document.getElementById('divimg')

let personagem4 = ['Bennett', 'Razor', 'Fischl', 'Amber', 'Barbara', 'Diona', 'Kujou Sara', 'Lisa', 'Ningguang', 'Rosaria'] //four star characters arry 

let personagem5 = ['Raiden Shogun', 'Kamisato Ayaka', 'Diluc', 'Mona', 'Arataki Itto', 'Eula', 'Hu Tao', 'Ganyu', 'Kaedehara Kazuha', 'Yae Miko'] // five star characters array


button.addEventListener("click", (event) => { //main function that makes everything work at the click of the button

    event.preventDefault()

    //support variables
    let char5 = pers5() 

    let char4 = pers4()

    let SwitchChar = ""

    //functions to generate randomly a four or five star character
    function pers4() {
    return personagem4 [Math.floor(Math.random() * personagem4.length)]
    }

    function pers5() {
        return personagem5[Math.floor(Math.random() * personagem5.length)] 
        
    }
    
    //result conditions
    if (Number(tiros.value) <= 0) {
        divresultado.removeAttribute('hidden')
        resultado.innerText = 'Invalid shot value'
    }
    
    if (Number(tiros.value) == 100) {
        divresultado.removeAttribute('hidden')
        resultado.innerText = `Congratulations! You got the five star character ${char5}.`
        SwitchChar = char5
    }

    if ((Number(tiros.value) + Number(historico.value) < 100) && (Number(tiros.value) + Number(historico.value)) > 0 ) {
        divresultado.removeAttribute('hidden')
        resultado.innerText = `Congratulations! You got the four star character ${char4}.`
        SwitchChar = char4
    }

    if ((Number(tiros.value) + Number(historico.value)) >= 100 ) {
        divresultado.removeAttribute('hidden')
        resultado.innerText = `Congratulations! You got the five star character ${char5}.`
        SwitchChar = char5
    }

    let hist = Number(tiros.value) + Number(historico.value)
    if (hist == 0) return ""
    historico.removeAttribute('disabled')
    historico.innerText = hist


    if (Number(historico.value) >= 101 ) {
        historico.innerText = ""

    }

    //switch structure to generate character images 
    switch(SwitchChar) {
        case "Raiden Shogun":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/raiden.jpg'>"
        break

        case "Kamisato Ayaka":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/ayaka.jpg'>"
        break    
        
        case "Diluc":
            divimg.removeAttribute('hidden')
        divimg.innerHTML = "<img src = 'public/images/diluc.jpg'>"
        break

        case "Eula":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/eula.jpg'>"
        break

        case "Ganyu":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/ganyu.jpg'>"
        break

        case "Hu Tao":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/hutao.jpg'>"
        break

        case "Arataki Itto":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/itto.jpg'>"
        break

        case "Kaedehara Kazuha":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/kazuha.jpg'>"
        break

        case "Mona":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/mona.jpg'>"
        break

        case "Yae Miko":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/yae.jpg'>"
        break

        case "Lisa":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/lisa.jpg'>"
        break

        case "Barbara":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/barbara.jpg'>"
        break

        case "Bennett":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/bennett.jpg'>"
        break

        case "Diona":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/diona.jpg'>"
        break

        case "Fischl":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/fischl.jpg'>"
        break

        case "Kujou Sara":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/kujousara.jpg'>"            
        break

        case "Ningguang":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/ningguang.jpg'>"
        break

        case "Razor":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/razor.jpg'>"
        break

        case "Rosaria":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = 'public/images/rosaria.jpg'>"
        break

        case "Amber":
            divimg.removeAttribute('hidden')
            divimg.innerHTML = "<img src = '../public/images/amber.jpg'>"
        break

        default :
        divimg.removeAttribute('hidden')
            divimg.innerHTML = "character image error"
        break    
    }

})
