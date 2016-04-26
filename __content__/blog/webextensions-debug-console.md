extends: post.liquid

title:   A better WebExtension debug console
subtitle: Small steps towards an awesome development experience
date:    26 April 2016 15:26:00 +0100
route:   blog
---

I'm happy to announce we landed [Bug 1005193](https://bugzilla.mozilla.org/show_bug.cgi?id=1005193) just in time for the new Firefox 48 release. In short, this gives you the ability to interact with the background script of a WebExtension through the add-on debugging console. I made a GIF to show it off:

![/img/debug_addons.gif](/img/debug_addons.gif)

In this example, we call the `toggleBookmark` function of the [bookmark-it](https://github.com/mdn/webextensions-examples/tree/master/bookmark-it) example extension from our debug console. We can also call any `chrome` or `browser` API that the extension has permissions to access.

Background script debugging is obviously a pretty standard feature. Chrome has it and it's about time Firefox implemented it too. With the Add-On debug tools you can already inspect and debug background scripts. Still, I believe we should go beyond feature-parity with Chrome and build more and better tooling around extension development.

Luckily the WebExtensions team seems motivated to do this and there is a lot of work happening in the areas of developer experience and documentation. As an extension developer for both Firefox and Chrome, I'm looking forward to a more productive future.

By the way, all contributions to WebExtensions were made in my free time. Why do I keep coming back for more? There's an awesome team and no shortage of ideas and issues to tackle. If you want to join in, check out the list of good first bug on the new [web-ext](https://github.com/mozilla/web-ext/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+bug%22) tool or the WebExtension bugs tracked [on Bugzilla](https://bugzilla.mozilla.org/buglist.cgi?cmdtype=runnamed&namedcmd=WebExtensions&list_id=12984337).

