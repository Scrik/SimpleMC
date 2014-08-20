function SimpleMc() {

    this.refresh = new function () {

        /**
        Configuration
        */
        var maxPlayer   = config.displayAvatars;
        var serverName  = config.name;
        var serverIP    = config.host;
        var serverPORT  = config.port;

        /**
        Clear the avatar list and show the loading message
        */
        //$('#more-players').hide();
        //$('.avatar .list').empty();

        var originalLoadingText = $("#loading").text();
        var textI = 0;
        var loadingID = setInterval(function () {

            $("#loading").append(".");
            textI++;

            if (textI == 4) {
                $("#loading").html(originalLoadingText);
                textI = 0;
            }

        }, 500);

        /*
        Rotate the favicon
        */

        var runFavicon = true;

        function rotateFavicon() {

            var angle = 0;

            var faviconIntervalID = setInterval(function () {

                angle += 3;

                if (!runFavicon && ((angle / 360) % 1 === 0)) {
                    clearInterval(faviconIntervalID);
                }

                $('.buttons .favicon').rotate(angle);

            }, 25);


        }

        //call the function
        rotateFavicon();


        /*
            Load the avatars and other avatar stuff
            */

        var playerList = [];
        
        $.ajax({
            type: 'POST',
            url: 'inc/status.php',
            data: {query: null, ip: serverIP, port: serverPORT},
            async: false
        }).done(function(data) {
            var queryData = $.parseJSON(data);

            $.each(queryData.players.list, function (k, v) {
                playerList.push(v);
            });            
        });
        
        
        /*
            Get more server information
        */
        var serverInfo = [];
        
        $.ajax({
            type: 'POST',
            url: 'inc/status.php',
            data: {info: null, ip: serverIP, port: serverPORT},
            async: false
        }).done(function(data) {
        
            var queryData = $.parseJSON(data);

            $.each(queryData, function (k, v) {
                serverInfo.push(v);
            });
      
        });
        
        console.log(serverInfo);
        
        //---
        var i = 0;

        function loadAvatars() {

            var intervalID = setInterval(function () { // this code is executed every 200 milliseconds:               

                if ($('#user-' + playerList[i]).size() == 0) {
                    $('.avatar .list').prepend('<img class="avatar-item" id="user-' + playerList[i] + '" src="http://mcapi.sweetcode.de/api/v2/?avatar&player=' + playerList[i] + '">');
                }

                i++;

                if (i >= playerList.length || i >= maxPlayer) {
                    runFavicon = false;

                    $('.loading').hide();

                    if (i >= maxPlayer && (playerList.length - maxPlayer) != 0) {
                        $('#more-players').addClass('buttons');
                        $('#more-players').text("and " + (playerList.length - maxPlayer) + " more...");
                        $('#more-players').show();
                    } else {
                        $('#more-players').hide();   
                    }

                    clearInterval(intervalID);
                }

                //delete offline players
                if (i == 1) {
                    
                    $.each($('.avatar-item'), function (k, v) {
                        var contentID = $(v).attr('id');
                        var username = contentID.split('-')[1]
                        
                        if ($.inArray(username, playerList) == -1) {

                            $('#' + contentID).remove();
                            
                        }

                    });
                    
                }
                
                //more server information
                if(i == 1) {
                    console.log(serverInfo);
                    //title
                    document.title = serverName;
                    $('.server-header').text(serverName);    
                    
                    if(serverInfo[1] == true) {
                        
                        //set player
                        $('#count-player').text(serverInfo[4].currently + '/' + serverInfo[4].max);
                        
                        //set tatus
                        $('#server-status').removeClass('offline');
                        $('#server-status').addClass('online');
                        $('#server-status').text('online');
                        
                        //favicon
                        $('.favicon').attr('src', serverInfo[5]['favicon']);
                        $('.favicon-icon').attr('href', serverInfo[5]['favicon']);
                        
                        //motd
                        $('.motd-status').text(serverInfo[5]['motd'][0]);
                        
                        //version
                        $('#server-version').text(serverInfo[2]);
                        
                        //ping
                        var pingClass = 'normal';
                        var ping = serverInfo[5]['ping'];
                        
                        if(ping <= 50) {
                            pingClass = 'good';   
                        } else if(ping > 50 && ping <= 100) {
                            pingClass = 'normal';   
                        } else {
                            pingClass = 'bad';   
                        }
                        
                        //remove old class
                        $('#server-ping').removeClass('good');
                        $('#server-ping').removeClass('normal');
                        $('#server-ping').removeClass('bad');
                        
                        //add new class and set the ping-text
                        $('#server-ping').addClass(pingClass);
                        $('#server-ping').text(ping + 'ms');
                        
                    } else {
                        
                        //set tatus
                        $('#server-status').removeClass('online');
                        $('#server-status').addClass('offline');
                        $('#server-status').text('offline');
                    
                        //remove old class
                        $('#server-ping').removeClass('good');
                        $('#server-ping').removeClass('normal');
                        $('#server-ping').removeClass('bad');
                        
                        //add new class and set the ping-text
                        $('#server-ping').addClass('bad');
                        $('#server-ping').text('-ms');
                        
                        //version
                        $('#server-version').text('-.-.-');
                        
                        //set player
                        $('#count-player').text('-/-');
                        
                    }

                    
                }
        
            }, 50);

        }
        $(loadAvatars);
        clearInterval(loadingID); //hide the "Loading..." message after the work is done  
    };

}