/* ===========================================================
 * bootstrap-radio.js - v.1.0.0
 * ===========================================================
 * Copyright 2013 Roberto Montresor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function($) {
    var Radio = function(element, options, e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.$element = $(element);
        this.$newElement = null;
        this.button = null;
        this.label = null;
        this.labelPrepend = null;
        this.options = $.extend({}, $.fn.radio.defaults, this.$element.data(), typeof options == 'object' && options);
        this.displayAsButton = this.options.displayAsButton;
        this.buttonStyle = this.options.buttonStyle;
        this.buttonStyleChecked = this.options.buttonStyleChecked;
        this.defaultValueChecked = this.options.defaultValueChecked;
        this.defaultEnabled = this.options.defaultEnabled;
        this.init();
    };

    Radio.prototype = {

        constructor: Radio,

        init: function (e) {
            this.$element.hide();
            this.$element.attr('autocomplete', 'off');
            var classList = this.$element.attr('class') !== undefined ? this.$element.attr('class').split(/\s+/) : '';
            var template = this.getTemplate();
            this.$element.after(template);
            this.$newElement = this.$element.next('.bootstrap-radio');
            this.button = this.$newElement.find('button');
            this.label = this.$newElement.find('span.label-radio');
            this.labelPrepend = this.$newElement.find('span.label-prepend-radio');
            for (var i = 0; i < classList.length; i++) {
                if(classList[i] != 'radio') {
                    this.$newElement.addClass(classList[i]);
                }
            }
            this.button.addClass(this.buttonStyle);
            
            if (this.$element.data('defalut-value-checked') != undefined){
            	this.options.defaultValueChecked = this.$element.data('defalut-value-checked');
            }
            if (this.$element.data('defalut-enabled') != undefined){
            	this.options.defaultEnabled = this.$element.data('defalut-enabled');
            }
            if (this.$element.data('display-as-button') != undefined){
            	this.displayAsButton = this.$element.data('display-as-button');
            }
            
            this.$element.data('options', this.options);
            this.setDefaultValueChecked(this.options.defaultValueChecked);
            
            this.checkEnabled();
            this.checkChecked();
            this.checkTabIndex();
            this.clickListener();
        },
        
        getTemplate: function() {
        	var additionalButtonStyle = this.displayAsButton ? ' displayAsButton' : '',
            	label = this.$element.data('label') ? '<span class="label-radio">'+this.$element.data('label')+'</span>' : '',
            	labelPrepend = this.$element.data('label-prepend') ? '<span class="label-prepend-radio">'+this.$element.data('label-prepend')+'</span>' : '';
            	
            var template = 
            	'<span class="button-radio bootstrap-radio">' +
            		'<button type="button" class="btn clearfix'+additionalButtonStyle+'">' +
            			((this.$element.data('label-prepend') && this.displayAsButton) ? labelPrepend : '')+
	                    '<span class="icon '+this.options.checkedClass+'" style="display:none;"></span>' +
	                    '<span class="icon '+this.options.uncheckedClass+'"></span>' +
	                    ((this.$element.data('label') && this.displayAsButton) ? label : '')+
	                '</button>' +
	            '</span>';
            
            if (!this.displayAsButton && (this.$element.data('label') || this.$element.data('label-prepend'))) {
            	template =
            		'<label class="'+this.options.labelClass+'">' +
            			labelPrepend + template + label+
		            '</label>';
            }
            return template;
        },

        checkEnabled: function() {
        	this.button.attr('disabled', this.$element.is(':disabled'));
        	this.$newElement.toggleClass('disabled', this.$element.is(':disabled'));
        },
		
		checkTabIndex: function() {
			if (this.$element.is('[tabindex]')) {
				var tabindex = this.$element.attr("tabindex");
				this.button.attr('tabindex', tabindex);
			}
		},
		
		checkChecked: function() {
			var whitePattern = /\s/g, replaceChar = '.';
			
			this.$element
				.parents('form')
				.find('input[type="radio"][name="'+this.$element.attr('name')+'"]')
				.each(function(){
					var button = $(this).next('.bootstrap-radio').find('button'),
						options = $(this).data('options');
					if (options != null){
						if ($(this).is(':checked')) {
							button.find('span.'+options.checkedClass.replace(whitePattern, replaceChar)).show();
							button.find('span.'+options.uncheckedClass.replace(whitePattern, replaceChar)).hide();
							if (options.buttonStyleChecked){
								button.removeClass(options.buttonStyle);
								button.addClass(options.buttonStyleChecked);
							}
						} else {
			        		button.find('span.'+options.checkedClass.replace(whitePattern, replaceChar)).hide();
			        		button.find('span.'+options.uncheckedClass.replace(whitePattern, replaceChar)).show();
			        		if (options.buttonStyleChecked){
			        			button.removeClass(options.buttonStyleChecked);
			        			button.addClass(options.buttonStyle);
			        		}
			        	}
					}
				});
		},

        clickListener: function() {
        	var _this = this;
        	this.button.on('click', function(e){
				e.preventDefault();
				_this.$element.click();
				_this.checkChecked();
        	});
			this.$element.on('change', function(e) {
				_this.checkChecked();
			});
			this.$element.parents('form').on('reset', function(e) {
				var options = _this.$element.data('options');
				var checkRadio = options.defaultValueChecked != null &&
					_this.$element.val() == options.defaultValueChecked;
				
				_this.$element.prop('checked', checkRadio);
				_this.$element.prop('disabled', !options.defaultEnabled);
            	_this.checkEnabled();
            	_this.checkChecked();
            	e.preventDefault();
			});
        },
        
        setDefaultValueChecked: function(value) {
        	var _this = this;
        	this.$element
        		.parents('form')
        		.find('input[type="radio"][name="'+this.$element.attr('name')+'"]')
        		.each(function(){
        			var options = $(this).data('options');
					if (options != null){
						options.defaultValueChecked = value;
					}
        		});
        },
        
        setOptions: function(option, event){
	        if (option.checked != undefined) {
	        	this.setChecked(option.checked);
	        }
	        if (option.enabled != undefined) {
	        	this.setEnabled(option.enabled);
	        }
        },
        
        setChecked: function(checked){
        	this.$element.prop("checked", checked);
        	this.checkChecked();
        },
        
        click: function(event){
        	this.$element.click();
        	this.checkChecked();
        },
        
        change: function(event){
        	this.$element.change();
        },
        
        setEnabled: function(enabled){
        	this.$element.attr('disabled', !enabled);
        	this.checkEnabled();
        },
        
        toggleEnabled: function(event){
        	this.$element.attr('disabled', !this.$element.is(':disabled'));
        	this.checkEnabled();
        },
        
        refresh: function(event){
        	this.checkEnabled();
        	this.checkChecked();
        }

    };

    $.fn.radio = function(option, event) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('radio'),
                options = typeof option == 'object' && option;
            if (!data) {
                $this.data('radio', (data = new Radio(this, options, event)));
                if (data.options.constructorCallback != undefined){
                	data.options.constructorCallback(data.$element, data.button, data.label, data.labelPrepend);
                }
            } else {
            	if (typeof option == 'string') {
                    data[option](event);
                } else {
                	data.setOptions(option, event);
                }
            }
        });
    };

    $.fn.radio.defaults = {
    	displayAsButton: false,
    	buttonStyle: 'btn-link',
        buttonStyleChecked: null,
        checkedClass: 'cb-icon-radio-check',
        uncheckedClass: 'cb-icon-radio-check-empty',
        defaultValueChecked: null,
        defaultEnabled: true,
        constructorCallback: null,
        labelClass: "radio bootstrap-radio",
		labelClassChecked: "active"
    };

}(window.jQuery);
