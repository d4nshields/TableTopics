define( ['require', 'fastclick', 'topics'], 
function( require, fastclick, topics) {
    
    var selectedTopic = "Adventure...";
    var topicNum = Math.floor( Math.random() * topics.topicsDef[selectedTopic].length);
    var num_speakers = 0;
    var speaker_num = 1;
    
    function displayTopic() {
            console.log( 'displayTopic()');
            $('.tabletopic-message').html( topics.topicsDef[selectedTopic][topicNum]);
            topicNum = (topicNum+1) % topics.topicsDef[selectedTopic].length;
    }
    function nextPlayerGetReady() {
            $('.tabletopic-message').html('<span style="color: yellow;">Speaker #'+speaker_num+' please get ready.</span>');
    }
    function clearTopic() {
            $('.tabletopic-message').html('&nbsp;');
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
                $.mobile.pageContainer.pagecontainer("load", "tabletopics/reports.html")
                        .done( function() {
                            $.mobile.pageContainer.pagecontainer( "change", "#reportspage");
                        });
                
                // what are the results?
                $("#tabletopicFinish").popup({
                    dismissible: false
                });
                $("#tabletopicFinish").popup( "open");
            }
    };
    var current_state;
    function setState( state) {
            current_state = state;
            game_states[current_state].call( this);
    }
    function main() {
        fastclick.attach( document.body);
        $.mobile.pageContainer.pagecontainer("load", "tabletopics/splash.html")
                .done( function() {
                    $.mobile.pageContainer.pagecontainer( "change", "#splashpage");
                });
        window.setTimeout( function() { 
            
            $.mobile.pageContainer.pagecontainer("load", "tabletopics/tabletopics.html")
                    .done( function() {
                        var fixTopicSelect = "";
                        var selected = "selected ";
                        for( var key in topics.topicsDef) {
                            if( topics.topicsDef.hasOwnProperty(key)) {
                                fixTopicSelect += '<option value="'+key+'" '+selected+'>'+key+'</option>';
                                selected = '';
                            }
                        }
                        $('select#select-topic-theme').html( fixTopicSelect);
                        $('select#select-topic-theme').selectmenu("refresh", true);
                        $.mobile.pageContainer.pagecontainer( "change", "#tabletopicspage", {
                            transition: 'fade'
                        });
                    });
            window.setTimeout( function() {
                $("#setupForm").popup({
                    dismissible: false,
                    positionTo: "window",
                    overlayTheme: "b",
                    theme: "a"
                });
                $("#setupForm").popup( "open");
                $("#setupForm").popup( "reposition", {
                    x: "0",
                    y: "0"
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
            },500);
//            setState( 'INIT'); 
        }, 2500);
    }
    function startTimer() {
        $('#timer').removeClass('stopped').addClass( 'started');
    }
    function stopTimer() {
        $('#timer').removeClass('started').addClass( 'stopped');
    }
    return {
        'main': main
    }
});
