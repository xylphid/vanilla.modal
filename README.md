# Vanilla modal

vanilla.modal is a simple method of displaying modal window.

## Requirements

* [vanilla](https://github.com/xylphid/vanilla)

## Installation

Include [vanilla](https://github.com/xylphid/vanilla) and `vanilla.modal.min.js`script :
```html
<script src="vanilla.min.js" type="text/javascript" charset="utf-8" />
<script src="vanilla.modal.min.js" type="text/javascript" charset="utf-8" />
```

Include the modal requirements and `vanilla.modal.css` default style :
```html
<link rel="stylesheet" href="vanilla.modal.css" type="text/css" media="screen" />
```

## Usage

### Method 1 : Open and close modal with link

Add `data-modal` attribute to your links and use `href` attribute to define what should be opened in the modal.
```html
<a href="#example-1" data-modal>Click to open</a>
<div id="example-1" class="example">
    Lorem ipsum
</div>
```

### Method 2 : Open and close modal with AJAX

This example opens the modal automatically and load the page content into modal with AJAX.
```html
<a href="ajax.html" data-modal>Click to open</a>
```

The following example shows how you can manually load AJAX page into a modal.<br />
__Note :__ _Ajax response must be wrapped in a div with class `vanilla-modal-content`. If not it will raise a javascript error._
```html
<a href="ajax.html" id="example-ajax">Click to open</a>
```

```js
vanilla('#example-ajax').on('click', function(event){
    event.preventDefault();
    vanilla(this).modal();
});
```

## Closing

Because there can be only one modal active at a single time, there's no need to select which modal to close:
```js
vanilla.modal.close();
```

## Options

These are the supported options and their default values:
```js
vanilla.modal.defaults = {
    opacity: 0.75,              // Overlay opacity
    overlay: '#000',            // Overlay color
    showSpinner: true,          // Show spinner on loading
    zIndex: 1,                  // Overlay z-index
}
```

# License (MIT)

jQuery Modal is distributed under the [MIT License](Learn more at http://opensource.org/licenses/mit-license.php):

    Copyright (c) 2015 Anthony PERIQUET

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.