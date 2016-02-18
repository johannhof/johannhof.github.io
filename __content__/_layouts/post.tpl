<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>{{title}}</title>
    <link href='https://fonts.googleapis.com/css?family=Muli:400,300' rel='stylesheet' type='text/css'>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha256-3dkvEK0WLHRJ7/Csr0BZjAWxERc5WH7bdeUya2aXxdU= sha512-+L4yy6FRcDGbXJ9mPG8MT/3UCDzwR9gPeyFNMCtInsol++5m3bk2bXWKdZjvybmohrAsn3Ua5x8gfLnbE1YkOg==" crossorigin="anonymous">
    <link rel="stylesheet" href="//writ.cmcenroe.me/1.0.2/writ.min.css">
    <link rel="stylesheet" href="/style.css" type="text/css" media="all" />
  </head>
<body data-route={{route}}>
<nav class="menu">
  <a class="menu-item {%if route == "about"%}current{%endif%}" href="/about/">Johann</a>
  <a class="menu-item {%if route == "blog"%}current{%endif%}" href="/">Blog</a>
  <a class="menu-item {%if route == "talks"%}current{%endif%}" href="/talks/">Talks</a>
  <a class="menu-item" href="http://github.com/johannhof">GitHub</a>
  <a class="menu-item" href="https://getpocket.com/@jprimero">Reading List</a>
  <a class="menu-item" href="http://twitter.com/johannh">Twitter</a>
  <hr>
</nav>
<main>
  <article>
    <h1>{{ title }}</h1>
    <time pubdate="pubdate">{{ date }}</time>
    {{ content }}
  </article>
</main>
</body>
  <footer>
    <hr>
    <p><a href="https://github.com/cobalt-org/cobalt.rs">Built with Cobalt.</a></p>
    <br>
  </footer>
  </body>
</html>
