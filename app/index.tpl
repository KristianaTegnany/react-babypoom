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
  <meta property="og:title" content="Hello, il y a un petit bébé qui a très envie de faire ta connaissance, retrouve-le ici " />
  <meta property="og:description" content="{{ogDescription}}" />
  <meta property="og:image" content="{{ogImage}}" />
  <meta property="og:url" content="https://hello.babypoom.com/{{uuid}}" />
  <meta property="og:site_name" content="Babypoom" />
  <% htmlWebpackPlugin.files.css.forEach(css => { %><link rel="stylesheet" href="<%= css %>" /><% }) %>
</head>
<body>
  <div id="root">{{html}}</div>
  <script>{{cachedJs}}</script>
  <% htmlWebpackPlugin.files.js.forEach(f => { %><script defer src="<%= f %>"></script><% }) %>
  <script>
    var link = document.createElement('link');
    link.href = "//fonts.googleapis.com/css?family=Amatic+SC|Raleway";
    link.rel = "stylesheet";
    setTimeout(function() { document.body.appendChild(link) }, 0);
  </script>
  <script>
    window.smartlook||(function(d) {
      var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
      var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
      c.charset='utf-8';c.src='https://rec.smartlook.com/recorder.js';h.appendChild(c);
      })(document);
      smartlook('init', 'cfa58644854321ca8c98d25e0d79507d0bc545e9');
  </script>
</body>
</html>
