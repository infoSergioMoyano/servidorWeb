var login = null
var navegacio = null
var popups = null
var seccioBackofficeUsuaris = null
var seccioFrontendProductes = null

// Aquesta funció s'inicia al carregar la pàgina
async function inicia () {

    // Iniciem els objectes globals
    login = new ObjLogin()
    navegacio = new ObjNavegacio()
    popups = new ObjPopups()
    seccioBackofficeUsuaris = new ObjSeccioBackofficeUsuaris()
    seccioFrontendProductes = new ObjSeccioFrontendProductes()

    // Inicia les funcions de navegació HTML5
    navegacio.inicia()

    // Fem que els botons de navegació endavant i endarrera mostrin el canvi de secció
    window.onpopstate = function (evt) {
        if (evt.state === null) {
            navegacio.mostraSeccio('frontendHome')
        } else {
            navegacio.mostraSeccio(evt.state.html)
        }
    }

    // Si tenim guardat un usuari i un token intentem identificar-lo
    await login.autenticaAmbToken()
}

function iniciaSeccio(seccio) {
    switch(seccio) {
    case 'frontendProductes': seccioFrontendProductes.iniciaSeccio(); break
    case 'backofficeUsuaris': seccioBackofficeUsuaris.iniciaSeccio(); break
    default:
    }
}

// Script per al menú mòbil
async function mostraMenu (evt) {
    let refBody = document.getElementsByTagName('body')[0],
        refSmall = document.getElementById('menuContainer'),
        refContainer = document.getElementById('menuAmagat')
        
    evt.preventDefault()
    
    refBody.style.overflow = 'hidden' // Treure scroll
    refSmall.style.display = 'flex'
    await promiseWait(1)
    refSmall.style.opacity = 1
    refContainer.style.transform =  'translateX(0)'
}
async function amagaMenu (evt) {
    let refBody = document.getElementsByTagName('body')[0],
        refSmall = document.getElementById('menuContainer'),
        refContainer = document.getElementById('menuAmagat')

    evt.preventDefault()

    refBody.style.overflow = 'auto' // Recuperar scroll

    refSmall.style.opacity = 0
    refContainer.style.transform = 'translateX(-50%)'
    await promiseWait(500)
    refSmall.style.display = 'none'
}