<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>{{title}}</title>
    <link href='http://fonts.googleapis.com/css?family=Josefin+Sans:400,100italic,100,300,300italic,400italic,600italic,600,700,700italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Shadows+Into+Light+Two' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Nothing+You+Could+Do' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="/style.css" type="text/css" media="all" />
  </head>
<body data-route={{route}}>
<nav class="menu">
  <a class="menu-item {%if route == "about"%}current{%endif%}" href="/about/">{%if route == "about"%}Me{%else%}Johann{%endif%}</a>
  <a class="menu-item {%if route == "blog"%}current{%endif%}" href="/">Blog</a>
  <a class="menu-item" href="http://github.com/johannhof">GitHub</a>
  <a class="menu-item" href="http://twitter.com/johannh">Twitter</a>
  <hr>
</nav>
<main>
  {{ content }}
</main>
</body>
  <footer>
    <hr>
    Built with Cobalt.
  </footer>
  </body>
</html>
