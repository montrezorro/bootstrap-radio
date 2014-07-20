bootstrap-radio
===============

A radio component based on bootstrap framework

## Author
[Roberto Montresor](https://github.com/montrezorro)

## Documentation
You can find demo and documentation [here](http://montrezorro.github.io/bootstrap-radio).

## Usage

Create your `<input type="radio">` with the `.radio` class.

    <input type="radio" class="radio" />
    <input type="radio" class="radio" checked="checked"/>
    <input type="radio" class="radio" disabled="disabled"/>
    <input type="radio" class="radio" checked="checked" disabled="disabled"/>
	
    
Enable Bootstrap-radio via JavaScript:

    $('.radio').radio();

Or just

    $('input[type="radio"]').radio();

## Options

Options can be passed via data attributes or JavaScript.

    $('input[type="radio"]').radio({
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
    });

You can append or prepend a label via the `data-label` or `data-label-prepend` attribute.
You can set a default value checked (used when you reset a form) via the `defalut-value-checked` attribute.
You can set a default abilitation (used when you reset a form) via the `data-default-enabled` attribute.

## Methods

    $('input[type="radio"]').radio('click'); // change input's state
    $('input[type="radio"]').radio('toggleEnabled'); // change input's enabled
    
## Copyright and license

Copyright (C) 2014 Roberto Montresor

Licensed under the Apache License 2.0.