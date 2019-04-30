// @name        Wanikani-Wariai
// @namespace   andrewkfiedler
// @description Change some CSS
// @version     1.0.0
// @include     https://www.wanikani.com/review/session*
// @run-at      document-end
// @grant       none

(function() {
    var style = document.createElement('style');
    style.innerHTML = 'body {background-color: #dddddd}';
    document.getElementsByTagName('head')[0].append(style);
})();