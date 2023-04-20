/*
 *  jquery-weekpicker - v0.1.0
 *  jQuery Weekpicker plugin
 *  http://www.mihai-marica.ro
 *
 *  Made by Mihai Marica
 *  Under MIT License
 */
;( function( $, window, document, undefined ) {

    "use strict";

    // keep a list of weekpicker objects by datepicker input id
    var instances = [];
    var pluginName = "WeekPicker",
        defaults = {
            firstDay: 1,
            dateFormat: "dd/mm/yy",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: true,
            maxDate: 0,
            // supported keywords:
            //  w  = week number, eg. 3
            //  ww = zero-padded week number, e.g. 03
            //  o  = short (week) year number, e.g. 18
            //  oo = long (week) year number, e.g. 2018
            weekFormat: "yyyy-mm-dd~yyyy-mm-dd"
        };

    function getMonDay(d) {
    	  d = new Date(d);
    	  var c = new Date();
    	  var begin = c.valueOf();
    	  var day = d.getDay(), diff = d.getDate() - day + 1;
      	  var s = new Date(d.setDate(diff));
      	  var after = s.valueOf();
      	  
      	  if( begin < after) {
          	  alert("현재 날짜의 주차 이후는 선택 하실 수 없습니다.")
          	  day = c.getDay(),
    	      diff = c.getDate() - day + 1;          	  
          	  s = new Date(c.setDate(diff));
      	  }
      		  
      	  return s;
    }
    
    function getSunDay(d) {
      d = new Date(d);	
      var c = new Date();
  	  var begin = c.valueOf();
  	  var day = d.getDay(), diff = d.getDate() - day + 7;
  	  var s = new Date(d.setDate(diff));
  	  
  	  var after = s.valueOf();
  	  
  	  if( begin <= after) {
     	  diff = c.getDate() - 1;      		  
  		  s = new Date(c.setDate(diff));
  	  }
  		  
  	  return s;
    }    
    
    function WeekPicker ( element, options ) {
        this.datePickerInput = $( element );
        this.datePickerId = getDatePickerId( this.datePickerInput );

        this.settings = $.extend( {
            beforeShow: this.beforeShow,
            onClose: this.onClose,
            onSelect: this.onSelect
        }, options );

        this.init();

        instances[ this.datePickerId ] = this;
        return this;
    }

    $.extend( WeekPicker.prototype, {
        init: function() {
            this.weekPickerInput = createWeekPickerInput( this.datePickerInput );

            // initialize the date picker input, but hide it,
            // so only the week picker version remains visible
            this.datePickerInput.datepicker( this.settings );
            this.datePickerInput.hide();
            $("input[name=end_date]").datepicker("option", "maxDate", $.datepicker.formatDate($.datepicker.ATOM, new Date()));
            this.weekPickerInput.focus( function() {

                // briefly focus the datepicker before hiding it to make the selection window open
                this.datePickerInput.show().focus().hide();
            }.bind( this ) );

            $( "body" ).on( "mousemove", ".ui-weekpicker .ui-datepicker-calendar tr",
                function() { $( this ).find( "td a" ).addClass( "ui-state-hover" ); }
            ).on( "mouseleave", ".ui-weekpicker .ui-datepicker-calendar tr",
                function() { $( this ).find( "td a" ).removeClass( "ui-state-hover" ); }
            );
        },
        beforeShow: function() {
            $( this ).datepicker( "widget" ).addClass( "ui-weekpicker" );
        },
        onClose: function() {
            $( this ).datepicker( "widget" ).removeClass( "ui-weekpicker" );
        },
        onSelect: function( dateText, dpInstance ) {
        	var instance = getWeekPickerByInstanceId( dpInstance.id );

            var datepickerValue = $( this ).datepicker( "getDate" );
            var year = datepickerValue.getFullYear();
            var month = datepickerValue.getMonth();

            var dateObj = new Date( year, month, datepickerValue.getDate() );
            var dateString = $.datepicker.formatDate( 'yy-mm-dd', dateObj);

            var text = "";
            var _monday =  getMonDay(dateString);
            var _sunday =  getSunDay(_monday);
            
            text = $.datepicker.formatDate( 'yy-mm-dd', _monday) + ' ~ ' +  $.datepicker.formatDate( 'yy-mm-dd', _sunday);
            $("#start_date").val($.datepicker.formatDate( 'yy-mm-dd', _monday));
            $("#end_date").val($.datepicker.formatDate( 'yy-mm-dd', _sunday));
            instance.weekPickerInput.val( text );
           
        }
    } );

    $.fn.weekpicker = function( options ) {
        return this.each( function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" +
                    pluginName, new WeekPicker( this, options ) );
            }
        } );
    };

    var getDatePickerId = function( datePickerInput ) {
        var datePickerId = datePickerInput.attr( "id" );

        if ( datePickerId === undefined ) {
            var generateUniqueId = function( prefix ) {
                var id;

                do {
                    id = prefix + Math.floor( ( 1 + Math.random() ) * 0x100000000 )
                        .toString( 16 ).substring( 1 );
                } while ( $( "#" + id ).length );

                return id;
            };

            datePickerId = generateUniqueId( "datepicker_" );
            datePickerInput.attr( "id", datePickerId );
        }

        return datePickerId;
    };

    var createWeekPickerInput = function( datePickerInput ) {
        var datePickerId = datePickerInput.attr( "id" );
        var weekPickerId = datePickerId + "_weekpicker";
        var weekPickerInput = $( "<input type=\"text\" id=\"" + weekPickerId +
            "\" data-datepicker-id=\"" + datePickerId + "\">" );

        datePickerInput.after( weekPickerInput );
        datePickerInput.data( "weekpicker-id", weekPickerId );

        return weekPickerInput;
    };

    var getWeekPickerByInstanceId = function( instId ) {
        return instances[ instId ];
    };

    var leftPad = function( input, length, padString ) {
        padString = padString || "0";
        input = input + "";
        return input.length >= length ?
            input :
            new Array( length - input.length + 1 ).join( padString ) + input;
    };
} )( jQuery, window, document );
