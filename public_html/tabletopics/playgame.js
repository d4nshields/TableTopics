define( ['require', 'jquery', 'fastclick', 'topics', 'jqueryMobile'], 
function( require, $, fastclick, topics) {
    $.mobile.defaultPageTransition   = 'none';
    $.mobile.defaultDialogTransition = 'none';
    $.mobile.buttonMarkup.hoverDelay = 0;
    
    var topicNum = Math.floor( Math.random() * topics.topiclist.length);
    
    function displayTopic() {
            console.log( 'displayTopic()');
            $('.tabletopic-message').html( topics.topiclist[topicNum]);
            topicNum = (topicNum+1) % topics.topiclist.length;
    }
    function clearTopic() {
            $('.tabletopic-message').html('');
    }
    var game_states = {
            INIT: function() {
                    $('.tabletopic-button#tabletopic_proceed').removeClass('inactive')
                            .html( 'Start Turn').css( 'visibility', 'visible')
                            .on( 'touchstart', function(evt) { 
                                $(evt.target)
                                    .off( 'touchstart');setState( 'START');});
                    $('.tabletopic-button#tabletopic_done').addClass('inactive')
                            .html( 'Done Speech').css( 'visibility', 'visible')
                            .append( '<div class="tabletopic-button-shade"></div>');
                    clearTopic();
                    $('.tabletopic-splash').fadeOut( 2000);
            },
            START: function() {
                    $('.tabletopic-button#tabletopic_proceed')
                            .removeClass('inactive')
                            .html( 'Begin Speech')
                            .on( 'touchstart', function(evt) { 
                                $(evt.target)
                                    .off( 'touchstart');setState( 'TIMING');});
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
                                    .off( 'touchstart');setState( 'REPORT');});
                    startTimer();
            },
            REPORT: function() {
                    stopTimer();
                    $('.tabletopic-button#tabletopic_proceed').removeClass('inactive')
                            .html( 'Next Person')
                            .on( 'touchstart', function(evt) { 
                                $(evt.target)
                                    .off( 'touchstart');setState( 'START');});
                    $('.tabletopic-button#tabletopic_done').addClass('inactive')
                            .append( '<div class="tabletopic-button-shade"></div>')
                            .off( 'touchstart');
                    clearTopic();
            }
    };
    var current_state;
    function setState( state) {
            current_state = state;
            game_states[current_state].call( this);
    }
    function main() {
        fastclick.attach( document.body);
        window.setTimeout( function() { setState( 'INIT'); }, 1000*0);
    }
    function startTimer() {
            $('.tabletopicapp .tabletopic-timer-area').append( '<li>starting timer</li>');
    }
    function stopTimer() {
            $('.tabletopicapp .tabletopic-timer-area').append( '<li>stopping timer</li>');
    }
    return {
        'main': main
    }
});
