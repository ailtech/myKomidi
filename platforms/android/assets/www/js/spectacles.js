/**
 * Created by rjsdesign on 17/03/17.
 */
$(document).ready(function(){
    //alert("jquery fonctionnelle biatch");
    $.ajax({
        
        url : 'http://komidi.alwaysdata.net//api/index.php?action=apiGetAllSpe&key=31bed188884e193d8465226',

        type : 'GET',

        dataType : 'json', // On désire recevoir du json

        success : function(retour, statut){ // code_html contient le json renvoyé

            //on verifie que la requete ajax c'est ien executer

            if( statut == "success" ) {
                if (!retour.etat) {
                //cas ou erreur dans json
                //alert( retour.message );
                alert(retour.message);
            } else {
                //traitement
                var o = retour.reponse.resultat;
                //console.dir( o );
                var test = "";
                var i = 0;
                var id_spec;

                for (a in o) {
                    id_spec = o[i].id_spe;
                    console.dir(o[i].id_spe );
                    test = test + "<tr><td><img  width='123' src=" + o[i].photo + "></td><td><div><h3>" + o[i].titre + "</h3><p>" + o[i].resume_court + "</p><ul> <li>duree: " + o[i].duree + "  min</li> <li>acteur:" + o[i].acteur + "</li></ul><a class='waves-effect waves-light btn'href='spectacle.html?id_spec=" + id_spec + "'>voire plus </a><a  class='waves-effect waves-light btn'href='spectacle.html?id_spec=" + id_spec + "#geo'>geo spectacle</a></div></td></tr>";
                    i++;

                }
                $("#texteTitre").html(test);
                /*
                 for(var i=0; i <= retour.length; i++){
                 var titre =  retour.reponse.resultat[i].titre;
                 alert(titre);
                 $("#texteTitre").html($("#texteTitre").html()+titre+"<br>");
                 }
                 */
            }}
            else{
                // cas ou requete ajax pas executée
                //alert("requete ajax pas executer");
                //$("#etat").html($("#etat").html()+"requete ajax pas executer<br>");
                alert("Erreur impossible de joindre le serveur.");
            }



        }


    });
});