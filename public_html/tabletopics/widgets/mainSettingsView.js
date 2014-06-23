define( ['widgets/gameView', 'models/ThemeCollection'], 
function( GameView, ThemeCollection) {
    
    return Backbone.View.extend( {
        events: {
            "change #select-speaker-time": "changedSpeakerTime",
            "load #setuppage .tt-settings-form": "loadSettingsForm"
        },
        initialize: function( options) {
            console.log( "mainSettingsView.initialize();");
            Backbone.View.prototype.initialize.call( this, options);
            //
            options.setupPageView = this;
            this.themeCollection = ThemeCollection.prototype.getThemeCollectionInstance();
            this.gameView = new GameView( options);
            
            this.formatSpeakersTimes( parseInt( $( '#setuppage #select-speaker-time > option:selected').val()));
            
            this.themeCollection.on({
                add: this.renderSelectTheme,
                change: this.renderSelectTheme
            }, this);
            this.themeCollection.fetch( {
                error: function( collection, response, options) {
                    console.log( 'themeEditorViewWebSql.initialize coll.fetch error: '+response);
                },
                success: function( collection, response, options) {
                }
            });
            this.options = options;
        },
        render: function() {
            console.log( "mainSettingsView.render();");
            this.gameView.render();
        },
        renderSelectTheme: function() {
            console.log( "select: renderSelectTheme();");
            this.themeCollection.fetch( {
                error: function( collection, response, options) {
                    console.log( 'themeEditorViewWebSql.initialize coll.fetch error: '+response);
                },
                success: function( collection, response, options) {
                    var themeNames = this.themeCollection.pluck( 'themename');
                    if( themeNames.length > 0)
                        this.selected_theme = themeNames[0];
                    var topicSelect = this.getSelectOptions( 'themename', this.themeCollection.models);
                    $('#setuppage select#select-topic-theme')
                            .html( topicSelect)
                            .selectmenu()
                            .selectmenu("refresh", true);
                }
            });
        },
        /**
         * Converts aArray of values to an options list for use in a select element
         * 
         * @param {String} keyField
         * @param {type} aArray
         * @returns {String}
         */
        getSelectOptions: function( keyField, aArray) {
            var selectOptionsHtml = "";
            var selected = "selected ";
            for( var i=0; i < aArray.length; i++) {
                var val = aArray[i];
                selectOptionsHtml += '<option value="'+val+'" '+selected+'>'+val+'</option>';
                selected = '';
            }
            return selectOptionsHtml;
        },
        // properties:
        getNumSpeakers: function() {
            return $('#select-num-speakers > option:selected').val();
        },
        getSpeakerTime: function() {
            return $('#select-speaker-time > option:selected').val();
        },
        getTopicTheme: function() {
            return $('#select-topic-theme > option:selected').val();
        },
        getPlayMode: function() {
            return $('#select-play-mode > option:selected').val();
        },
        formatSpeakersTimes: function( mins) {
            var targetLength = mins;
            $('#select-num-speakers option').each( function( idx, elem) {
                $(elem).html( ''+(idx+1)+' speakers (approx. '+((idx+1)*targetLength)+' mins.)');
                $('#select-num-speakers').change();
            });
        },
        changedSpeakerTime: function( evt) {
            function formatSpeakersTimes( mins) {
                var targetLength = mins;
                $('#select-num-speakers option').each( function( idx, elem) {
                    $(elem).html( ''+(idx+1)+' speakers (approx. '+((idx+1)*targetLength)+' mins.)');
                    $('#select-num-speakers').change();
                });
            }
            var mins = parseInt( $(evt.target).find( '> option:selected').val());
            this.formatSpeakersTimes( mins);
        }
    });
});
