<%
// Keep track of themes
var fs = require('fs');
var themeManifest = []
try { themeManifest = JSON.parse(fs.readFileSync('theme-manifest.json', 'utf8')) } catch(e) {}
themeManifest = themeManifest.concat(htmlWebpackPlugin.files.css.filter(file => file.slice(1).startsWith('theme-')))
if (useThemeManifest) fs.writeFileSync('theme-manifest.json', JSON.stringify(themeManifest));

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
  <% htmlWebpackPlugin.files.css.filter(file => !file.slice(1).startsWith('theme-')).forEach(css => { %><link rel="stylesheet" href="<%= css %>" /><% }) %>
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
  <!-- Wheelio App  <script type="text/javascript"> var shopID = "db365854-dcd7-405a-c73d-08d93593aba3"; var url = "https://wheelioapp.azureedge.net/app/index.min.js?v=" + new Date().getTime(); var wheelio_script = document.createElement("script"); wheelio_script.setAttribute("src", url); document.body.appendChild(wheelio_script); </script>-->
  <script type="text/javascript">!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});</script>
</body>
</html>
