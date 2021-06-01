<%
// Keep track of themes
var fs = require('fs');
var themeManifest = []
try { themeManifest = JSON.parse(fs.readFileSync('theme-manifest.json', 'utf8')); } catch(e) {}
themeManifest = themeManifest.concat(htmlWebpackPlugin.files.css.filter(file => file.slice(1).startsWith('theme-')))
fs.writeFileSync('theme-manifest.json', JSON.stringify(themeManifest));

%><!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Babypoom - Album</title>
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <meta http-Equiv="Cache-Control" Content="no-cache" />
  <meta http-Equiv="Pragma" Content="no-cache" />
  <meta http-Equiv="Expires" Content="0" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>
    (function() {
      var DEFAULT_THEME = 1;
      var theme = (window.location.search.slice(1).match(/theme=(\\d+)(?:&|$)/) || [])[1] || DEFAULT_THEME;
      var css = <%= JSON.stringify(themeManifest) %>;
      for (var i = 0, len = css.length; i < len; ++i) {
        if (1 === css[i].indexOf('theme-' + theme)) {
          var link = document.createElement('link');
          link.setAttribute('rel', 'stylesheet');
          link.setAttribute('href', css[i]);
          document.getElementsByTagName('head')[0].appendChild(link);
          break;
        }
      }
    })()
  </script>
</head>
<body>
  <div id="root">{{html}}</div>
  <script>{{cachedJs}}</script>
  <% htmlWebpackPlugin.files.js.forEach(f => { %><script defer src="<%= f %>"></script><% }) %>
  <script>
    var link = document.createElement('link');
    link.href = "//fonts.googleapis.com/css?family=Varela+Round";
    link.rel = "stylesheet";
    setTimeout(function () { document.body.appendChild(link) }, 0);
  </script>
</body>
</html>
