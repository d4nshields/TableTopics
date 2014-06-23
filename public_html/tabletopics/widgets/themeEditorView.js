define( ['models/ThemeCollection', 'models/ThemeModel'], 
function( ThemeCollection, ThemeModel) {
    return Backbone.View.extend( {
        events: {
            'change #edit-topic-theme': 'setSelectedTheme',         // drop-down list
            'change .tt-themename-editable': 'saveSelectedTheme',   // input
            'touchstart .tt-themename-removeit': 'removeSelectedTheme'   // remove button
        },
        initialize: function( options) {
            console.log( "themeEditorView.initialize();");
            Backbone.View.prototype.initialize.call( this, options);
            this.setupPageView = options.setupPageView;
            this.themeCollection = ThemeCollection.prototype.getThemeCollectionInstance();
            this.themeCollection.fetch( {
                error: function( collection, response, options) {
                    console.log( 'themeEditorViewWebSql.initialize coll.fetch error: '+response);
                },
                success: function( collection, response, options) {
                }
            });
            this.options = options;
        },
        render: function( evt) {
            console.log( "themeEditorView.render();");
            //this.$el = $(this.$el.selector);
            
            var _this = this;
            var topicSelect = _this.getSelectOptions( 'themename', _this.themeCollection.models);
            topicSelect += '<option value="New Theme" >New Theme</option>';
            this.$el.find('select#edit-topic-theme')
                    .html( topicSelect)
                    .selectmenu()
                    .selectmenu("refresh", true);

            var newval = this.$el.find('select option:selected').val();
            var newvalid = this.$el.find('select option:selected').data('id');
            this.$el.find('.tt-themename-editable').attr( 'value', newval);
            this.$el.find('.tt-themename-editable').data( 'id', newvalid);
//            var $el = this.$el.find('ul');
//            for( var i=0; i < topics.topicsDef[this.configs.selectedTheme].length; i++) {
//                $el.append( '<li>'+topics.topicsDef[this.configs.selectedTheme][i]+'</li>');
//            } 
            this.$el.find('select option').hallo( {
                hallolists: {

                }
            });
            if( "undefined" !== typeof evt)
                evt.preventDefault();
            return false;
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
                var val = aArray[i].get( keyField);
                selectOptionsHtml += '<option data-id="'
                        +aArray[i].get('id')+'" value="'+val+'" '+selected+'>'
                        +val+'</option>';
                selected = '';
            }
            return selectOptionsHtml;
        },
        setSelectedTheme: function( evt) {
            console.log( "select: event setSelectedTheme(evt)");
            var newval = this.$el.find('select option:selected').val();
            var newvalid = this.$el.find( 'select option:selected').data( 'id');
            this.$el.find('.tt-themename-editable').val( newval);
            this.$el.find('.tt-themename-editable').data('id', newvalid);
        },
        saveSelectedTheme: function( evt) {
            console.log( "select: event saveSelectedTheme(evt)");
            var newval = $('.tt-themename-editable').val();
            var origid = $('.tt-themename-editable').data('id');
            if( "undefined" === typeof origid) {
                this.$el.find('select#edit-topic-theme')
                        .append( '<option value="New Theme" >New Theme</option>')
                        .selectmenu()
                        .selectmenu("refresh", true);
                (new ThemeModel( {themename: newval})).save();
            } else {
                var origvals = this.themeCollection.where( { id: origid});
                _.each( origvals, function( elem, idx) {
                    elem.set( {themename: newval});
                    elem.save();
                });
            }
            
            this.$el.find('select option:selected').html( this.$el.find('.tt-themename-editable').val());
            this.$el.find('select option:selected').attr( 
                    'value', this.$el.find('.tt-themename-editable').val()
                    );
            this.$el.find('select#edit-topic-theme')
            .selectmenu()
            .selectmenu("refresh", true);
    
            this.$el.find('.tt-themename-editable').data('id', origid);
        },
        removeSelectedTheme: function( evt) {
            console.log( "select: event removeSelectedTheme(evt)");
            var elemid = this.$el.find('select option:selected').data('id');
            var removeIter = this.themeCollection.where( {id: elemid});
            _.each( removeIter, function( elem, idx) {
                elem.destroy();
            });
            this.$el.find('select option:selected').remove()
            .selectmenu()
            .selectmenu("refresh", true);
        }
    });
});
