<!doctype html>
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
  <% htmlWebpackPlugin.files.css.forEach(css => { %><link rel="stylesheet" href="<%= css %>?version=2.6" /><% }) %>
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
