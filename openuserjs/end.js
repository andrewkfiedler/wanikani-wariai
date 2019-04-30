

]]></>).toString();

var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);

})();