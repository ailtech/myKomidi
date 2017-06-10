

//variable qui definie la barre de navigation
var navigation = "<div class='black darken-2 nav-wrapper'> <a href='#' class='brand-logo center'>MyKomidi</a> <a href='#' data-activates='mobile' class='button-collapse'><i class='material-icons'>menu</i></a> <ul class='left hide-on-med-and-down grey-text text-darken-4 '> <li><a href='index.html'><i class='left material-icons'>theaters</i>Nos Spectacles</a></li> <li><a href='sallelist.html'><i class='left material-icons'>store</i>Nos Salles</a></li> </ul> <ul class='side-nav' id='mobile'> <li><a href='index.html'><i class='left material-icons'>theaters</i>Nos Spectacles</a></li> <li><a href='sallelist.html'><i class='left material-icons'>store</i>Nos Salles</a></li> </ul> </div>";
//variable qui définie le footer
var footer = " <p class='center-align'>Projet réalisée  titre éducatif dans le cadre d'un exercice fait par des éléves de BTS</p> <div class='footer-copyright'> <div class='container center-align'> <p>© Copyright 2017 Robert Steven - Lucas Perez - Alexandre Lefevre</p> </div> </div>";
//affiche la barre de navigation
$("#navigation").html( navigation );
//affiche le footer
$("footer").html( footer );