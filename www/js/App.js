$(document).ready(function(){
    $(".button-collapse").sideNav();
    var version = 1;
    //console.log(version);
    $.ajax({

        url : 'http://komidi.alwaysdata.net//api/index.php?action=apiGetMaj&version='+version,

        type : 'GET',

        dataType : 'json', //Type

        success : function(retour, statut){
            //console.log("retour: "+retour);
            if( retour.message == "Votre application n'est pas à jour." ){

                $("#miseajour").html("<a href='maj.html'><img class='btn btn-floating right pulse'  src='image/maj.png' style='margin:10px 10px 0px 0px;'/></a>");
                //console.log("ok");
                //console.log(descriptif+'|'+lien+'|'+version);

                if(document.title == "maj"){
                    //alert("ok");
                    //traitement on recupere tout les valeurs
                    var o = retour.reponse.resultat;
                    var descriptif = o[0].descriptif;
                    var lien = o[0].lien;
                    var version = o[0].version;

                    var texte = "<h4 class='center-align'>Mise à jour vers version "+version+" disponible <a href='"+lien+"' class='waves-effect waves-light btn'>ICI</a></h4><p>"+descriptif+"</p>";
                    $("#maj").html(texte);
                }
                else{
                    //alert("ko");
                }
            }
            else{
                //console.log("ko");
            }
        }

    });
});

