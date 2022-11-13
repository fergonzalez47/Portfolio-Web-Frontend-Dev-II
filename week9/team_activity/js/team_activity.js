const keys = Array.from( document.querySelectorAll( ".key" ) ) ;
keys.forEach( key => key.addEventListener( "transitionend", removeTransition ) ) ;
window.addEventListener( "keydown", playSound ) ;

let movements = {} ;

function playSound( event ) {
    const sound = document.querySelector( `audio[data-key="${event.keyCode}"]` ) ;
    const key = document.querySelector( `div[data-key="${event.keyCode}"]` ) ;
    if ( ! sound ) return ;
    key.classList.add( "playing" ) ;
    sound.currentTime = 0 ;
    sound.play() ;

    // Stretch Goal 1.
    move( key ) ;
} ;

function removeTransition( event ) {
    if ( event.propertyName !== "transform" ) return ;
    event.target.classList.remove( "playing" ) ;
} ;

function move( element ) {
    let elementStyle = window.getComputedStyle( element ) ;
    let topValue = elementStyle.getPropertyValue( "margin-top" ).replace( "px", "" ) ;

    // Stretch Goal 2.
    const key = element.childNodes[1].innerHTML ;
    movements[ key ] = ( movements[ key ] || 0 ) + 1 ;
    if ( movements[ key ] === 11 ) {
        element.style.marginTop = "10px" ;
        movements[ key ] = 1 ;
    } else {
        element.style.marginTop = ( Number( topValue ) + 10 ) + "px" ;
    } ;
} ;