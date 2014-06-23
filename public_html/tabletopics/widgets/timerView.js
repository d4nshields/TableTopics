define( [], 
function( ) {
    return Backbone.View.extend( {
        events: {
        },
        speaker_num: 0,
        timestamp: null,
        baseTime: (new Date()).getTime(),
        tick_id: null,
        timing_data: [],
        timing: {
            '1': {
                gogreen: 30,
                goyellow: 45,
                gored: 60
            },
            '2': {
                gogreen: 60,
                goyellow: 1.5*60,
                gored: 2*60
            },
            '3': {
                gogreen: 2.0*60,
                goyellow: 2.5*60,
                gored: 3*60
            },
            '4': {
                gogreen: 3.0*60,
                goyellow: 3.5*60,
                gored: 4.0*60
            }
        },

        initialize: function( options) {
            console.log( "timerView.initialize();");
            this.setupPageView = options.setupPageView;
            this.includeClockFn = options.includeClockFn;
            this.speakerTime = this.setupPageView.getSpeakerTime();
        },
        render: function(evt) {
            console.log( "timerView.render();");
            var timer_visibility = (this.includeClockFn() ? 'visible' : 'hidden');
            
            $( '.stopwatch-container').addClass( timer_visibility);
            if( "undefined" !== typeof evt)
                evt.preventDefault();
            return false;
        },
        tick: function () {
            var elapsed = (new Date()).getTime() - this.baseTime;
            var deg = -90 + elapsed*360/(60*1000);
            $('.stopwatchArm').css( {
                '-webkit-transform': 'rotate('+deg+'deg)',
                '-webkit-transform-origin': '14.5px center',
                'transition': '0.1s'
            });
            if( elapsed >= this.timing[''+this.speakerTime].gored*1000) {
                $('.tabletopic-timer-area').css( 'background-color', 'red');
            } else if( elapsed >= this.timing[''+this.speakerTime].goyellow*1000) {
                $('.tabletopic-timer-area').css( 'background-color', 'yellow');
            } else if( elapsed >= this.timing[''+this.speakerTime].gogreen*1000) {
                $('.tabletopic-timer-area').css( 'background-color', 'green');
            } else {
                $('.tabletopic-timer-area').css( 'background-color', 'white');
            }
        },
        resetTimer: function () {
            $('.stopwatchArm').css( {
                '-webkit-transform': 'rotate(-90deg)',
                '-webkit-transform-origin': '14px 14px',
                'transition': '0s'
            });
            $('.tabletopic-timer-area').css( 'background-color', 'white');
            this.baseTime = (new Date()).getTime();
            window.clearInterval( this.tick_id);
        },
        startTimer: function () {
            this.timestamp = (new Date()).getTime();
            this.baseTime = (new Date()).getTime();
            $('#timer').removeClass('stopped').addClass( 'started');
            var _this = this;
            this.tick_id = window.setInterval( function() { _this.tick(); }, 100);
        },
        stopTimer: function () {
            this.timing_data.push( {
                elapsed: (new Date()).getTime() - this.timestamp,
                speaker_num: this.setupPageView.gameView.getSpeakerNum(),
                selectedTheme: this.setupPageView.getTopicTheme(),
                topicNum: this.setupPageView.gameView.getTopicNum()
            });
            $('#timer').removeClass('started').addClass( 'stopped');
            window.clearInterval( this.tick_id);
        }
        
    });
});
