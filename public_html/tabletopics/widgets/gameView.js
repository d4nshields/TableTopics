define( ['widgets/timerView'], 
function( TimerView) {
    return Backbone.View.extend( {
        events: {
        },
        current_state: null,
        topic_num: 0,
        speaker_num: 0,
        initialize: function( options) {
            this.setupPageView = options.setupPageView;
            this.timerView = new TimerView( {
                el: this.$el.selector+" .tabletopic-timer-area",
                setupPageView: options.setupPageView,
                includeClockFn: function() {
                    return (this.setupPageView.getPlayMode() !== 'strict');
                }
            });
        },
        render: function( evt) {
            this.setState( 'INIT');
            // render dependent components:
            this.timerView.render();
            if( "undefined" !== typeof evt)
                evt.preventDefault();
            return false;
        },
        setState: function( state) {
            this.current_state = state;
            this.game_states[ this.current_state].call( this);
        },
        game_states: {
            INIT: function() {
                this.speaker_num=1;
                var _this = this;
                $('.tabletopic-button#tabletopic_proceed').removeClass('inactive')
                        .html( 'First Person').css( 'visibility', 'visible')
                        .on( 'touchstart', function(evt) { 
                            $(evt.target)
                                .off( 'touchstart');_this.setState( 'START');
                            evt.preventDefault();});
                $('.tabletopic-button#tabletopic_done').addClass('inactive')
                        .html( 'Stop Self-timer').css( 'visibility', 'visible')
                        .append( '<div class="tabletopic-button-shade"></div>');
                this.nextPlayerGetReady();
                    
            },
            START: function() {
                    this.timerView.resetTimer();
                    var _this = this;
                    $('.tabletopic-button#tabletopic_proceed')
                            .removeClass('inactive')
                            .html( 'Start Self-timer')
                            .on( 'touchstart', function(evt) { 
                                $(evt.target)
                                    .off( 'touchstart');_this.setState( 'TIMING');
                                evt.preventDefault();});
                    $('.tabletopic-button#tabletopic_done').addClass('inactive')
                            .html( 'Stop Self-timer')
                            .append( '<div class="tabletopic-button-shade"></div>')
                            .off( 'touchstart');
                    this.displayTopic();
            },
            TIMING: function() {
                    $('.tabletopic-button#tabletopic_proceed').addClass('inactive')
                            .append( '<div class="tabletopic-button-shade"></div>')
                            .off( 'touchstart');
                    var _this = this;
                    $('.tabletopic-button#tabletopic_done').removeClass('inactive')
                            .html( 'Stop Self-timer')
                            .on( 'touchstart', function(evt) { 
                                $(evt.target)
                                    .off( 'touchstart');_this.setState( 'REPORT');
                                evt.preventDefault();});
                    this.timerView.startTimer();
            },
            REPORT: function() {
                    this.timerView.stopTimer();
                    var _this = this;
                    if( this.speaker_num >= this.setupPageView.getNumSpeakers()) {
                        this.setState( 'FINISH');
                    } else {
                        $('.tabletopic-button#tabletopic_proceed').removeClass('inactive')
                                .html( 'Next Person')
                                .on( 'touchstart', function(evt) { 
                                    $(evt.target)
                                        .off( 'touchstart');_this.setState( 'START');});
                        $('.tabletopic-button#tabletopic_done').addClass('inactive')
                                .append( '<div class="tabletopic-button-shade"></div>')
                                .off( 'touchstart');
                        this.speaker_num++;
                        this.nextPlayerGetReady();
                    }
            },
            FINISH: function() {
                this.clearTopic();
                var _this = this;
                $('.tabletopic-button#tabletopic_proceed').removeClass('inactive')
                        .html( 'Timer Report')
                        .on( 'touchstart', function( evt) {
                            $(evt.target)
                            .off( 'touchstart'); _this.setState( 'SHOWREPORT');
                        });
                $('.tabletopic-button#tabletopic_done').addClass('inactive')
                        .append( '<div class="tabletopic-button-shade"></div>')
                        .off( 'touchstart');
            },
            SHOWREPORT: function() {
                function formatTime( secs) {
                    var mins = Math.floor(secs/60);
                    var secs = Math.floor(secs)%60;
                    return mins+"mins "+secs+"secs";
                }
               $('#reportspage .timers-report').append( "<table><thead><tbody class='report-data'><tfoot></table>");
               for( var i=0; i < this.timerView.timing_data.length; i++) {
                    var row = this.timerView.timing_data[i];
                    $('#reportspage .timers-report .report-data').append( 
"<tr><td>speaker #"+row.speaker_num+":</td><td style='width:50%;'>\""
+topics.topicsDef[row.selectedTheme][row.topicNum]
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
            }
        },
        displayTopic: function () {
            this.topic_num = (this.topic_num+1) % topics.topicsDef[this.setupPageView.getTopicTheme()].length;
            $('#tabletopicspage .tabletopic-message').html( topics.topicsDef[this.setupPageView.getTopicTheme()][this.topic_num]);
        },
        nextPlayerGetReady: function () {
            $('#tabletopicspage .tabletopic-message').html('<span style="color:yellowgreen;">Speaker #'+this.speaker_num+' please get ready.</span>');
        },
        clearTopic: function () {
            $('#tabletopicspage .tabletopic-message').html('&nbsp;');
        },
        setSpeakerNum: function( num) {
            this.speaker_num = num;
        },
        getSpeakerNum: function() {
            return this.speaker_num;
        },
        setTopicNum: function( num) {
            this.topic_num = num;
        },
        getTopicNum: function() {
            return this.topic_num;
        }
        
    });
});
