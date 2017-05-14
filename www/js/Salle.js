$(".button-collapse").sideNav();
$(document).ready(function(){
    $.ajax({

        url : 'http://komidi.alwaysdata.net//api/index.php?action=apiGetSalleId&key=31bed188884e193d8465226',

        type : 'GET',

        dataType : 'json', //Type

        success : function(retour, statut){

            //Vérification de la requête ajax
            if( statut == "success" ){
                //Vérification du json renvoyé
                if( retour.etat ){
                    //traitement
                    var o = retour.reponse.resultat;
                    var test = "";
                    var i =0;
                    for( a in o){
                        test = test+"<tr><td><div class='center-align'><ul><li><h4>"+o[i].nom+"</h4></li><li>Adresse:"+" "+o[i].adresse+"</li></div><div class='center-align'><a class='waves-effect waves-light btn amber darken-1'>La situer</a><a class='waves-effect waves-light btn amber darken-1'>Plus d'informations</a></div></ul></td></tr>";
                        i++;
                    }
                    $("#texteTitre").html(test);
                }
                else{
                    //Si erreur dans json
                    alert(retour.message);
                }
            }
            else{
                //Si la requête ajax n'est pas executée
                alert("Erreur impossible de joindre le serveur.");
            }
        }

    });
});


        
