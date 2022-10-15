// Requirement 2.

import Hikes from "./hikes.js" ;

// On load grab the array and insert it into the page.
const myHikes = new Hikes( "hikes" ) ;
window.addEventListener( "load", () => {
    myHikes.showHikeList() ;
} ) ;