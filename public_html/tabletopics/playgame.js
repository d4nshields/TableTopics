define( ['require', 'jquery', 'topics', 'jqueryMobile'], function( require, $, topics) {
    
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
                    $('.tabletopic-button.go-button').removeClass('inactive')
                            .html( 'Start Turn').css( 'visibility', 'visible')
                            .on( 'tap', function(evt) { $(evt.target).off( 'tap'); setState( 'START')});
                    $('.tabletopic-button.done-button').addClass('inactive')
                            .html( 'Done Speech').css( 'visibility', 'visible')
                            .append( '<div class="tabletopic-button-shade"></div>');
                    clearTopic();
                    $('.tabletopic-splash').fadeOut( 2000);
            },
            START: function() {
                    $('.tabletopic-button.go-button').removeClass('inactive')
                            .html( 'Begin Speech')
                            .on( 'tap', function(evt) { $(evt.target).off( 'tap'); setState( 'TIMING')});
                    $('.tabletopic-button.done-button').addClass('inactive')
                            .html( 'Done Speech')
                            .append( '<div class="tabletopic-button-shade"></div>')
                            .off( 'tap');
                    displayTopic();
            },
            TIMING: function() {
                    $('.tabletopic-button.go-button').addClass('inactive')
                            .append( '<div class="tabletopic-button-shade"></div>')
                            .off( 'tap');
                    $('.tabletopic-button.done-button').removeClass('inactive')
                            .html( 'Done Speech')
                            .on( 'tap', function(evt) { $(evt.target).off( 'tap'); setState( 'REPORT')});
                    startTimer();
            },
            REPORT: function() {
                    stopTimer();
                    $('.tabletopic-button.go-button').removeClass('inactive')
                            .html( 'Next Person')
                            .on( 'tap', function(evt) { $(evt.target).off( 'tap'); setState( 'START')});
                    $('.tabletopic-button.done-button').addClass('inactive')
                            .append( '<div class="tabletopic-button-shade"></div>')
                            .off( 'tap');
                    clearTopic();
            }
    };
    var current_state;
    function setState( state) {
            current_state = state;
            game_states[current_state].call( this);
    }
    function main() {
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
