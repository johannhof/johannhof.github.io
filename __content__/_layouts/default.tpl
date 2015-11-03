<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>{{title}}</title>
    <link href='https://fonts.googleapis.com/css?family=Muli:400,300' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="//writ.cmcenroe.me/1.0.2/writ.min.css">
    <link rel="stylesheet" href="/style.css" type="text/css" media="all" />
  </head>
<body data-route={{route}}>
<nav class="menu">
  <a class="menu-item {%if route == "about"%}current{%endif%}" href="/about/">Johann</a>
  <a class="menu-item {%if route == "blog"%}current{%endif%}" href="/">Blog</a>
  <a class="menu-item {%if route == "talks"%}current{%endif%}" href="/talks/">Talks</a>
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
    <p><a href="https://github.com/cobalt-org/cobalt.rs">Built with Cobalt.</a></p>
    <br>
  </footer>
  </body>
</html>
