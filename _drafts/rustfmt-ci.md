extends: post.liquid

title:   Running rustfmt on Travis
date:    20 Aug 2016 08:00:00 +0100
route:   blog
---

[rustfmt](https://github.com/rust-lang-nursery/rustfmt) merged another small pull request of mine that will hopefully have a great impact on the way people use it in the future.

`rustfmt --write-mode=diff` now returns an exit code of 4 if the code is not properly formatted, which means it will cause Travis and friends to fail the build.

So, to check 

