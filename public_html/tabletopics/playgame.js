define( ['require', 'fastclick', 'topics'], 
function( require, fastclick, topics) {
    
    var viewport_height = $(window).height();
    var viewport_width = $(window).width();
    var selectedTopic = Object.keys(topics.topicsDef)[0];
    var topicNum = Math.floor( Math.random() * topics.topicsDef[selectedTopic].length);
    var num_speakers = 0;
    var speaker_num = 1;
    var timing_data=[];
    
    function displayTopic() {
            console.log( 'displayTopic()');
            topicNum = (topicNum+1) % topics.topicsDef[selectedTopic].length;
            $('.tabletopic-message').html( topics.topicsDef[selectedTopic][topicNum]);
    }
    function nextPlayerGetReady() {
            $('.tabletopic-message').html('<span style="color:yellowgreen;">Speaker #'+speaker_num+' please get ready.</span>');
    }
    function clearTopic() {
            $('.tabletopic-message').html('&nbsp;');
    }
    function formatTime( secs) {
        var mins = Math.floor(secs/60);
        var secs = Math.floor(secs)%60;
        return mins+"mins "+secs+"secs";
    }
    var game_states = {
            INIT: function() {
                speaker_num=1;
                    $('.tabletopic-button#tabletopic_proceed').removeClass('inactive')
                            .html( 'First Person').css( 'visibility', 'visible')
                            .on( 'touchstart', function(evt) { 
                                $(evt.target)
                                    .off( 'touchstart');setState( 'START');
                                evt.preventDefault();});
                    $('.tabletopic-button#tabletopic_done').addClass('inactive')
                            .html( 'Done Speech').css( 'visibility', 'visible')
                            .append( '<div class="tabletopic-button-shade"></div>');
                    nextPlayerGetReady();
                    
            },
            START: function() {
                    resetTimer();
                    $('.tabletopic-button#tabletopic_proceed')
                            .removeClass('inactive')
                            .html( 'Begin Speech')
                            .on( 'touchstart', function(evt) { 
                                $(evt.target)
                                    .off( 'touchstart');setState( 'TIMING');
                                evt.preventDefault();});
                    $('.tabletopic-button#tabletopic_done').addClass('inactive')
                            .html( 'Done Speech')
                            .append( '<div class="tabletopic-button-shade"></div>')
                            .off( 'touchstart');
                    displayTopic();
            },
            TIMING: function() {
                    $('.tabletopic-button#tabletopic_proceed').addClass('inactive')
                            .append( '<div class="tabletopic-button-shade"></div>')
                            .off( 'touchstart');
                    $('.tabletopic-button#tabletopic_done').removeClass('inactive')
                            .html( 'Done Speech')
                            .on( 'touchstart', function(evt) { 
                                $(evt.target)
                                    .off( 'touchstart');setState( 'REPORT');
                                evt.preventDefault();});
                    startTimer();
            },
            REPORT: function() {
                    stopTimer();
                    if( speaker_num >= num_speakers) {
                        setState( 'FINISH');
                    } else {
                        $('.tabletopic-button#tabletopic_proceed').removeClass('inactive')
                                .html( 'Next Person')
                                .on( 'touchstart', function(evt) { 
                                    $(evt.target)
                                        .off( 'touchstart');setState( 'START');});
                        $('.tabletopic-button#tabletopic_done').addClass('inactive')
                                .append( '<div class="tabletopic-button-shade"></div>')
                                .off( 'touchstart');
                        speaker_num++;
                        nextPlayerGetReady();
                    }
            },
            FINISH: function() {
                clearTopic();
                $('.tabletopic-button#tabletopic_proceed').removeClass('inactive')
                        .html( 'Timer Report')
                        .on( 'touchstart', function( evt) {
                            $(evt.target)
                            .off( 'touchstart'); setState( 'SHOWREPORT');
                        });
                $('.tabletopic-button#tabletopic_done').addClass('inactive')
                        .append( '<div class="tabletopic-button-shade"></div>')
                        .off( 'touchstart');
            },
            SHOWREPORT: function() {
               $('#reportspage .timers-report').append( "<table><thead><tbody class='report-data'><tfoot></table>");
               for( var i=0; i < timing_data.length; i++) {
                    var row = timing_data[i];
                    $('#reportspage .timers-report .report-data').append( 
"<tr><td>speaker #"+row.speaker_num+":</td><td style='width:50%;'>\""
+topics.topicsDef[row.selectedTopic][row.topicNum]
+"\"</td><td>&nbsp;"+formatTime((row.elapsed/1000)+0.5)+"</td></tr>"
                            );
                }
                
                $('#reportspage .tabletopic-button#restart_app').removeClass('inactive')
                        .css( 'visibility', 'visible')
                        .on( 'touchstart', function( evt) {
                            $(evt.target)
                            .off( 'touchstart');
                            $('*').css({
                                'color':'black',
                                'background-color': 'black'
                            });
                            $.mobile.pageContainer.pagecontainer( "change", "#splashpage");
                            document.location.reload();
                        });
               $.mobile.pageContainer.pagecontainer( "change", "#reportspage", {
                            transition: 'fade'
                        });
//                // what are the results?
//                $("#tabletopicFinish").popup({
//                    dismissible: false
//                }).popup( "open");
//                $('#tabletopicFinish-popup').css( {
//                    top: (viewport_height-$('#tabletopicFinish').height())/2+'px',
//                    left: (viewport_width-$('#tabletopicFinish').width())/2+'px'
//                });
            }
    };
    var current_state;
    function setState( state) {
            current_state = state;
            game_states[current_state].call( this);
    }
    function main() {
        fastclick.attach( document.body);
        $.mobile.pageContainer.pagecontainer( "change", "#splashpage");
        window.setTimeout( function() { 
            
//            $.mobile.pageContainer.pagecontainer("load", "tabletopics/tabletopics.html")
//                    .done( function() {
                        var fixTopicSelect = "";
                        var selected = "selected ";
                        for( var key in topics.topicsDef) {
                            if( topics.topicsDef.hasOwnProperty(key)) {
                                fixTopicSelect += '<option value="'+key+'" '+selected+'>'+key+'</option>';
                                selected = '';
                            }
                        }
                        
                        $('select#select-topic-theme')
                                .html( fixTopicSelect)
                                .selectmenu()
                                .selectmenu("refresh", true);
                        $.mobile.pageContainer.pagecontainer( "change", "#tabletopicspage", {
                            transition: 'fade'
                        }).find( '#setupForm').popup({
                            dismissible: false,
                            transition: "pop",
                            positionTo: "window"
                        }).popup( "open");
                        $('#setupForm-popup').css( {
                            top: (viewport_height-$('#setupForm').height())/2+'px',
                            left: (viewport_width-$('#setupForm').width())/2+'px'
                        });

                        $("#setupForm #setupReady").on( 'click', function(evt) {
                            num_speakers = parseInt( $("#setupForm #select-num-speakers").val());
                            selectedTopic = $("#setupForm #select-topic-theme option:selected").val();
                            console.log( "setting num_speakers="+num_speakers);
                            $('#setupForm').popup("close");
                            setState( 'INIT');
                            evt.preventDefault();
                            return false;
                        });
//                    });
        }, 1500);
    }
    var timestamp;
    var baseTime = (new Date()).getTime();
    var tick_id;
    
    function tick() {
        var elapsed = (new Date()).getTime() - baseTime;
        var deg = -90 + elapsed*360/(60*1000);
        $('.stopwatchArm').css( {
            '-webkit-transform': 'rotate('+deg+'deg)',
            'transition': '0.1s'
        });
        if( elapsed > 90*1000) {
            $('.tabletopic-timer-area').css( 'background-color', 'red');
        } else if( elapsed > 60*1000) {
            $('.tabletopic-timer-area').css( 'background-color', 'yellow');
        } else if( elapsed > 30*1000) {
            $('.tabletopic-timer-area').css( 'background-color', 'green');
        } else {
            $('.tabletopic-timer-area').css( 'background-color', 'white');
        }
    }
    
    function resetTimer() {
        $('.stopwatchArm').css( {
            '-webkit-transform': 'rotate(-90deg)',
            'transition': '0s'
        });
        $('.tabletopic-timer-area').css( 'background-color', 'white');
        baseTime = (new Date()).getTime();
        window.clearInterval( tick_id);
    }
    function startTimer() {
        timestamp = (new Date()).getTime();
        baseTime = (new Date()).getTime();
        $('#timer').removeClass('stopped').addClass( 'started');
        tick_id = window.setInterval( tick, 100);
    }
    function stopTimer() {
        timing_data.push( {
            elapsed: (new Date()).getTime() - timestamp,
            speaker_num: speaker_num,
            selectedTopic: selectedTopic,
            topicNum: topicNum
        });
        $('#timer').removeClass('started').addClass( 'stopped');
        window.clearInterval( tick_id);
        
    }
    return {
        'main': main
    };
});
