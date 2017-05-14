/**
 * Created by rjsdesign on 17/03/17.
 */
    //on recupere la variable placer dans url
var id_spec= 0 ;
var requete = window.location.search ;
if (requete) {
    requete=requete.substring(1) ;

        eval(requete); }
$(document).ready(function(){
    //alert("jquery fonctionnelle biatch");

    $.ajax({

        url : 'http://komidi.alwaysdata.net//api/index.php?action=apiGetSpeId&key=31bed188884e193d8465226&idSpe='+id_spec,

        type : 'GET',

        dataType : 'json', // On désire recevoir du json

        success : function(retour, statut){ // code_html contient le json renvoyé

            //on verifie que la requete ajax c'est ien executer
            var requete;

            if( statut == "success" ) {

                //on regarde si le json renvoyer et corrrecte
                //alert( retour.etat );
                //console.dir( retour );
                if (!retour.etat) {
                    //cas ou erreur dans json
                    //alert( retour.message );
                    alert(retour.message);
                } else {
                    //traitement
                    var o = retour.reponse.resultat;

                    console.dir( id_spec );
                    var test = "tooto";
                    console.dir( o[0].titre );
                    var titre =o[0].titre ;
                    var image = "<img  width='123' src="+ o[0].photo +">" ;
                    console.dir( image );
                    var resu_long = o[0].resume_long;
                    var duree = o[0].duree+" min"  ;
                    var auteur = o[0].acteur ;
                    var nomsalle =o[0].nom_salle ;
                    var liengeo =  "<p style='text-align: center;'>"+nomsalle+" <a  class='waves-effect waves-light btn'href='geo.html?idSpetacle=" +id_spec+ "'>geo spectacle</a></p>" ;


                    $("#imagespec").html(image);
                    $("#resu_longspec").html(resu_long);
                    $("#auteurspec").html(auteur);
                    $("#dureespec").html(duree);
                    $("#boutongeospec").html(liengeo);




                    $("#titrespec").html(titre);

                    /*
                     for(var i=0; i <= retour.length; i++){
                     var titre =  retour.reponse.resultat[i].titre;
                     alert(titre);
                     $("#texteTitre").html($("#texteTitre").html()+titre+"<br>");
                     }
                     */
                }
            }
            else{
                // cas ou requete ajax pas executée
                //alert("requete ajax pas executer");
                //$("#etat").html($("#etat").html()+"requete ajax pas executer<br>");
                alert("Erreur impossible de joindre le serveur.");
            }


        }


    });
});