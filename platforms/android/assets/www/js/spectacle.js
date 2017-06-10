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
                if (retour.etat) {
                    //traitement
                    var o = retour.reponse.resultat;

                    //console.log(id_spec);
                    var test = "tooto";
                    //console.log(o[0].titre);
                    var titre = o[0].titre;
                    var image = "<img  width='123' src=" + o[0].photo + ">";
                    //console.log(image);
                    var resu_long = o[0].resume_long;
                    var duree = o[0].duree + " min";
                    var auteur = o[0].acteur;
                    var nomsalle = o[0].nom_salle;
                    var liengeo = " <a class='waves-effect waves-light btn' href='geo.html?idSpetacle=" + id_spec + "'>geolocalisation</a>";
                    var tcorp= [

                        '<thead> ',
                        '<TH colspan=3  ><h5> ' + titre + '</h5></TH>',

                        '</thead> ',
                        '<tbody>',
                        '<td><img  width="123" src="' + o[0].photo + '"></td><td><ul class="list-unstyled"><li><p>Durée : ' + duree + '</p></li><li><p>auteur :  ' + auteur + '</p></li></ul></td>',

                        '<TR><td colspan=2><h5>Synopsis</h5></td></TR>',
                        '<TR><td colspan=3 ><p align="left">' + resu_long + '</p></td></TR>',
                        '<TR><td colspan=2><p> la salle de :  ' + nomsalle + '</p></td></TR>',
                        '<TR><td><p>Itineraire de la salle :</p></td><td>'+ liengeo + '</td></TR>',
                        '</tbody>'
                    ];


                    $("#imagespec").html(image);
                    $("#resu_longspec").html(resu_long);
                    $("#auteurspec").html(auteur);
                    $("#dureespec").html(duree);
                    $("#boutongeospec").html(liengeo);
                    $("#nomsallespec").html(nomsalle);

                    $("#test").html(tcorp);

                    $("#titrespec").html(titre);
                    /*
                     for(var i=0; i <= retour.length; i++){
                     var titre =  retour.reponse.resultat[i].titre;
                     alert(titre);
                     $("#texteTitre").html($("#texteTitre").html()+titre+"<br>");
                     }
                     */
                }
                else {
                    //cas ou erreur dans json
                    //alert( retour.message );
                    alert(retour.message);
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