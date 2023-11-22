let avisoqr = document.createElement('span')
avisoqr.innerText = 'Digite um link válido.'
avisoqr.classList.add('text-red-500', 'font-[poppins]', 'font-medium', 'my-2')
let btn = document.querySelector('button')

let botaoClicado = false

function transformaQR() {
    let textoParaQR = document.querySelector('input').value
    let urlMobile = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${textoParaQR}`
    let urlDesktop = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${textoParaQR}`
    // let imgsrc = urlMobile + textoParaQR
    // let imgsrcDesktop = urDesktop + textoParaQR
    let validacaoHTTP = 'http://'
    let validacaoHTTPS = 'https://'
    const telaDesktop = matchMedia('(min-width:1024px)')
    if (textoParaQR != '' && telaDesktop.matches) {
        if (textoParaQR.includes(validacaoHTTP) || textoParaQR.includes(validacaoHTTPS)) {
            document.querySelector('#container').classList.add('grid-col')
            document.querySelector('img').setAttribute('src', urlDesktop)

        }
        else if (!textoParaQR.includes(validacaoHTTP) || !textoParaQR.includes(validacaoHTTPS)) {
            document.querySelector('div').appendChild(avisoqr)
        }
    }
    else if (textoParaQR != '' && !telaDesktop.matches) {
        if (textoParaQR.includes(validacaoHTTP) || textoParaQR.includes(validacaoHTTPS)) {
            document.querySelector('#container').classList.remove('grid-cols-2')
            document.querySelector('img').setAttribute('src', urlMobile)
        }
        else if (!textoParaQR.includes(validacaoHTTP) || !textoParaQR.includes(validacaoHTTPS)) {
            document.querySelector('div').appendChild(avisoqr)

        }
    }
    if (textoParaQR == '') {
        document.querySelector('div').appendChild(avisoqr)
    }

}


let input = document.querySelector('input')

input.addEventListener('focusin', () => {
    if (document.querySelector('div').contains(avisoqr)) {

        document.querySelector('div').removeChild(avisoqr)
    }
})

input.addEventListener('focusout', () => {
    if (input.value == '') {
        document.querySelector('div').appendChild(avisoqr)
    }
})



if (btn.innerText == 'GERAR QR CODE') {
    btn.addEventListener('click', transformaQR)
}

window.addEventListener('keyup', (tecla) => {
    if (tecla.key == 'Enter') {
        btn.click()
    }
})