<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Babypoom</title>
  <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta property="og:type" content="Article" />
  <meta property="og:title" content="{{ogTitle}}" />
  <meta property="og:description" content="{{ogDescription}}" />
  <meta property="og:image" content="{{ogImage}}" />
  <meta property="og:url" content="http://hello.babypoom.com/{{uuid}}" />
  <meta property="og:site_name" content="Babypoom" />
  <% for (var i in htmlWebpackPlugin.files.css) { %><link rel="stylesheet" href="<%= htmlWebpackPlugin.files.css[i] %>" /><% } %>
</head>
<body>
  <div id="root">{{html}}</div>
  <script>{{cachedJs}}</script>
  <% for (var j in htmlWebpackPlugin.files.js) { %><script defer src="<%= htmlWebpackPlugin.files.js[j] %>"></script><% } %>
  <script>
    var link = document.createElement('link');
    link.href = "//fonts.googleapis.com/css?family=Amatic+SC|Raleway";
    link.rel = "stylesheet";
    setTimeout(function() { document.body.appendChild(link) }, 0);
  </script>
</body>
</html>
