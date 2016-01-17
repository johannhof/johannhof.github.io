extends: default.tpl

title: Articles
route: blog
---

<ul class="blog-list">
  {% for post in posts %}
    <li>
      <a href="blog/{{ post.path }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
