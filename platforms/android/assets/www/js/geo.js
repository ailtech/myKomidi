/**
 * Created by alexandre on 17/03/17.
 */

$(document).ready(function(){
    $.support.cors=true;
    //$.mobile.allowCrossDomainPages = true;
    /*
    //----------------Fonction qui affiche des message------------------------------
    function toStringInfo( msg ){
        $("#texteModal").text(msg);
        $("#modalInfo").modal();
    }


     */
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: {lat: -21.2075839, lng: 55.471176},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    //-----------------------------------------------------------------------------------------------------------------

    //toStringInfo("Lancement de l\'Application.");
    function getItineraire(idSpe){

        var idSpetacle = idSpe;

        //-----------
        function toStringInfo( msg ){
            $("#texteModal").text(msg);
            $("#modalInfo").modal();
        }

        //-----------------------------------------------------------------------------------------------------------------
        //geolocalisation
        //---------------------------GESTION ERREUR GEOLOCALISATION-----------------------------------------------------
        function erreur(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    //alert("Vous avez choisi de refuser la geolocalisation.");
                    //$("#etat").html($("#etat").html()+"Vous avez choisi de refuser la geolocalisation<br>");
                    toStringInfo("Vous avez choisi de refuser la geolocalisation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    //alert("Impossible d'avoir des information sur votre localisation.");
                    //$("#etat").html($("#etat").html()+"Impossible d'avoir des information sur votre localisation.<br>");
                    toStringInfo("Impossible d'avoir des information sur votre localisation.");
                    break;
                case error.TIMEOUT:
                    //alert("Temps de geolocalisation dépassée.");
                    //$("#etat").html($("#etat").html()+"Temps de geolocalisation dépassée.<br>");
                    toStringInfo("Temps de geolocalisation dépassée.");
                    break;
                case error.UNKNOWN_ERROR:
                    //alert("Une erreur inconnue est survenue.");
                    //$("#etat").html($("#etat").html()+"Une erreur inconnue est survenue.<br>");
                    toStringInfo("Une erreur inconnue est survenue.");
                    break;
            }
        }

        //---------------------------------- Fonction qui crée le tracée ----------------------------------------------
        function CreerItineraire(latDepart,longDepart,latArrivee,longArrivee,nom_salle,titre){
            //alert("hello");

            //initialisation coodonne
            var endroitDepart = {lat: latDepart, lng: longDepart};
            //on recupere les coordone du lieu consulter
            var endroitArrivee = {lat: latArrivee, lng: longArrivee};

            //generateur
            direction = new google.maps.DirectionsRenderer({
                map: map
                //panel : panel // Dom element pour afficher les instructions d'itinéraire
            });
            //tracer
            if(endroitDepart && endroitArrivee){
                var request = {
                    origin      : endroitDepart,
                    destination : endroitArrivee,
                    travelMode  : google.maps.DirectionsTravelMode.DRIVING // Mode de conduite
                }
                var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
                directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
                    if(status == google.maps.DirectionsStatus.OK){
                        //$("#etat").html($("#etat").html()+"debut trassage direction<br>");
                        //toStringInfo("Début du tracée.");**************************************
                        direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
                    }
                });
            }
        }
        //--------------------------------- fonction qui demande les itineraire et le tracée-----------------------------------------------
        function tracerItineraire(position) {
            //document.write('Latitude: '+position.coords.latitude+'Longitude: '+position.coords.longitude);//debug
            var maLatitude = position.coords.latitude;
            //alert(maLatitude);
            var maLongitude = position.coords.longitude;
            //alert(maLongitude);
            //on lance la requete ajaxp our recupere coordonne de la salle
            //--------------------------------------------------------------------------------
            $.ajax({

                url : 'http://komidi.alwaysdata.net//api/index.php?action=apiGetSpeId&key=31bed188884e193d8465226&idSpe='+idSpetacle,

                type : 'GET',

                dataType : 'json', // On désire recevoir du json

                success : function(retour, statut){ // code_html contient le json renvoyé

                    //on verifie que la requete ajax c'est ien executer
                    if( statut == "success" ){
                        //on regarde si le json renvoyer et corrrecte
                        if( retour.etat ){
                            //alert( retour.message );//test
                            //$("#etat").html($("#etat").html()+""+retour.message+"<br>");
                            //toStringInfo( retour.message );***********************************************
                            //alert( maLatitude+"."+maLongitude);
                            //$("#etat").html($("#etat").html()+""+maLatitude+"."+maLongitude+"<br>");
                            //toStringInfo("Votre position est: "+maLatitude+" | "+maLongitude);***********************************
                            //on recupere les info est on commence le tracer
                            //alert("lat: "+maLatitude+"|long: "+maLongitude);
                            var titre =  retour.reponse.resultat[0].titre;
                            var nom_salle =  retour.reponse.resultat[0].nom_salle;
                            var leurLatitude =  parseFloat( retour.reponse.resultat[0].latitude );
                            var leurLongitude =  parseFloat( retour.reponse.resultat[0].longitude );
                            //affcihe les information
                            $("texteSpec").attr("style","");
                            $("#nomSpec").text(titre);
                            $("#nomSalle").text(nom_salle);
                            //alert("Lat: "+typeof leurLatitude+"|"+leurLatitude);
                            //alert("Long: "+typeof leurLongitude+"|"+leurLongitude);
                            //on lance la fonction qui va preparer la map
                            CreerItineraire(maLatitude,maLongitude,leurLatitude,leurLongitude,nom_salle,titre);
                        }
                        else{
                            //cas ou erreur dans json
                            //alert( retour.message );
                            toStringInfo(retour.message);
                        }
                    }
                    else{
                        // cas ou requete ajax pas executée
                        //alert("requete ajax pas executer");
                        //$("#etat").html($("#etat").html()+"requete ajax pas executer<br>");
                        toStringInfo("Erreur impossible de joindre le serveur.");
                    }
                    //alert( statut +"type: "+typeof statut);//string  success
                    //alert( code_html +"type: "+typeof code_html);

                    //alert( code_html.etat +"type: "+typeof code_html.etat);
                    //alert("Coordonne: "+code_html.reponse.resultat.latitude+":"+code_html.reponse.resultat.longitude);


                }

            });


        }

        //------------------------------------- On teste si geolocalisation supportée -------------------------------------------

        if (navigator.geolocation) {

            //alert('geolocalisation supporter');
            //$("#etat").html($("#etat").html()+"geolocalisation supporter<br>");
            //toStringInfo("Geolocalisation supporter.");
            //on recupere la position de l'utilisateur
            navigator.geolocation.getCurrentPosition(tracerItineraire, erreur);
        }
        else {
            //alert('Geolocation n\'est pas supporter par votre apareil');
            //$("#etat").html($("#etat").html()+"Geolocation n\'est pas supporter par votre apareil<br>");
            toStringInfo("La Geolocation n\'est pas supporter par votre apareil");
        }
    }
    /*
    $("#getItineraire").click(function(){
        //geolocalisation
        //---------------------------GESTION ERREUR GEOLOCALISATION-----------------------------------------------------
        function erreur(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    //alert("Vous avez choisi de refuser la geolocalisation.");
                    //$("#etat").html($("#etat").html()+"Vous avez choisi de refuser la geolocalisation<br>");
                    toStringInfo("Vous avez choisi de refuser la geolocalisation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    //alert("Impossible d'avoir des information sur votre localisation.");
                    //$("#etat").html($("#etat").html()+"Impossible d'avoir des information sur votre localisation.<br>");
                    toStringInfo("Impossible d'avoir des information sur votre localisation.");
                    break;
                case error.TIMEOUT:
                    //alert("Temps de geolocalisation dépassée.");
                    //$("#etat").html($("#etat").html()+"Temps de geolocalisation dépassée.<br>");
                    toStringInfo("Temps de geolocalisation dépassée.");
                    break;
                case error.UNKNOWN_ERROR:
                    //alert("Une erreur inconnue est survenue.");
                    //$("#etat").html($("#etat").html()+"Une erreur inconnue est survenue.<br>");
                    toStringInfo("Une erreur inconnue est survenue.");
                    break;
            }
        }

        //---------------------------------- Fonction qui crée le tracée ----------------------------------------------
        function CreerItineraire(latDepart,longDepart,latArrivee,longArrivee,nom_salle,titre){
            //alert("hello");

            //initialisation coodonne
            var endroitDepart = {lat: latDepart, lng: longDepart};
            //on recupere les coordone du lieu consulter
            var endroitArrivee = {lat: latArrivee, lng: longArrivee};

            //generateur
            direction = new google.maps.DirectionsRenderer({
                map: map
                //panel : panel // Dom element pour afficher les instructions d'itinéraire
            });
            //tracer
            if(endroitDepart && endroitArrivee){
                var request = {
                    origin      : endroitDepart,
                    destination : endroitArrivee,
                    travelMode  : google.maps.DirectionsTravelMode.DRIVING // Mode de conduite
                }
                var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
                directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
                    if(status == google.maps.DirectionsStatus.OK){
                        //$("#etat").html($("#etat").html()+"debut trassage direction<br>");
                        //toStringInfo("Début du tracée.");**************************************
                        direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
                    }
                });
            }
        }
        //--------------------------------- fonction qui demande les itineraire et le tracée-----------------------------------------------
        function tracerItineraire(position) {
            //document.write('Latitude: '+position.coords.latitude+'Longitude: '+position.coords.longitude);//debug
            var maLatitude = position.coords.latitude;
            //alert(maLatitude);
            var maLongitude = position.coords.longitude;
            //alert(maLongitude);
            //on lance la requete ajaxp our recupere coordonne de la salle
            //--------------------------------------------------------------------------------
            $.ajax({

                url : 'http://localhost/apiKomidi/index.php?action=apiGetGeoSpe&key=31bed188884e193d8465226&idSpe=3',

                type : 'GET',

                dataType : 'json', // On désire recevoir du json

                success : function(retour, statut){ // code_html contient le json renvoyé

                    //on verifie que la requete ajax c'est ien executer
                    if( statut == "success" ){
                        //on regarde si le json renvoyer et corrrecte
                        if( retour.etat ){
                            //alert( retour.message );//test
                            //$("#etat").html($("#etat").html()+""+retour.message+"<br>");
                            //toStringInfo( retour.message );***********************************************
                            //alert( maLatitude+"."+maLongitude);
                            //$("#etat").html($("#etat").html()+""+maLatitude+"."+maLongitude+"<br>");
                            //toStringInfo("Votre position est: "+maLatitude+" | "+maLongitude);***********************************
                            //on recupere les info est on commence le tracer
                            //alert("lat: "+maLatitude+"|long: "+maLongitude);
                            var titre =  retour.reponse.resultat[0].titre;
                            var nom_salle =  retour.reponse.resultat[0].nom_salle;
                            var leurLatitude =  parseFloat( retour.reponse.resultat[0].latitude );
                            var leurLongitude =  parseFloat( retour.reponse.resultat[0].longitude );
                            //affcihe les information
                            $("texteSpec").attr("style","");
                            $("#nomSpec").text(titre);
                            $("#nomSalle").text(nom_salle);
                            //alert("Lat: "+typeof leurLatitude+"|"+leurLatitude);
                            //alert("Long: "+typeof leurLongitude+"|"+leurLongitude);
                            //on lance la fonction qui va preparer la map
                            CreerItineraire(maLatitude,maLongitude,leurLatitude,leurLongitude,nom_salle,titre);
                        }
                        else{
                            //cas ou erreur dans json
                            //alert( retour.message );
                            toStringInfo(retour.message);
                        }
                    }
                    else{
                        // cas ou requete ajax pas executée
                        //alert("requete ajax pas executer");
                        //$("#etat").html($("#etat").html()+"requete ajax pas executer<br>");
                        toStringInfo("Erreur impossible de joindre le serveur.");
                    }
                    //alert( statut +"type: "+typeof statut);//string  success
                    //alert( code_html +"type: "+typeof code_html);

                    //alert( code_html.etat +"type: "+typeof code_html.etat);
                    //alert("Coordonne: "+code_html.reponse.resultat.latitude+":"+code_html.reponse.resultat.longitude);


                }

            });


        }

        //------------------------------------- On teste si geolocalisation supportée -------------------------------------------

        if (navigator.geolocation) {

            //alert('geolocalisation supporter');
            //$("#etat").html($("#etat").html()+"geolocalisation supporter<br>");
            //toStringInfo("Geolocalisation supporter.");
            //on recupere la position de l'utilisateur
            navigator.geolocation.getCurrentPosition(tracerItineraire, erreur);
        }
        else {
            //alert('Geolocation n\'est pas supporter par votre apareil');
            //$("#etat").html($("#etat").html()+"Geolocation n\'est pas supporter par votre apareil<br>");
            toStringInfo("La Geolocation n\'est pas supporter par votre apareil");
        }



    });
    */


    //demande itineraire en voiture
    $("#modeV").click(function(){
        var idSpetacle= 0 ;
        var requete = window.location.search ;
        if (requete)
        {
            requete=requete.substring(1) ;
            eval(requete); 
        }
        //on recupere le chiffre dans la requete
        var idSpectacle = requete.match(/\d+/g).join('');
        //on demare la geoloclisation
        getItineraire(idSpectacle);

    });


});