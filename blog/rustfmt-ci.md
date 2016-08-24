extends: post.liquid

title:   Running rustfmt on Travis CI
date:    24 Aug 2016 20:00:00 +0100
route:   blog
---

[rustfmt](https://github.com/rust-lang-nursery/rustfmt) just added a small feature that will hopefully have great impact on the way people use it in the future.

`rustfmt --write-mode=diff` now returns an exit code of 4 if the code is not properly formatted, which will cause Travis and other CI tools to fail the build. That's great for checking if your contributors ran `cargo fmt`.

This is an example Travis configuration you can use:

```
language: rust
cache: cargo
before_script: (cargo install rustfmt || true)
script:
- |
  cargo fmt -- --write-mode=diff &&
  cargo build &&
  cargo test
```

`cache: cargo` is highly suggested, compiling a fresh rustfmt on every run significantly slows down your CI.
Since cargo returns an error if a package is installed already, I have to use `(cargo install rustfmt || true)`.
(If anyone wants to add support for a `--update` flag in cargo, [I think they'd be happy to merge it](https://github.com/rust-lang/cargo/pull/2405#issuecomment-195475633)).

You can obviously adjust the `cargo fmt` command to whatever [custom rustfmt configuration](https://github.com/rust-lang-nursery/rustfmt#configuring-rustfmt) you're using. Just remember to append `--write-mode=diff`. Also note that I'd like to discourage you from configuring your rustfmt. Instead, you could participate in the upcoming process outlined by [RFC 1607](https://github.com/rust-lang/rfcs/blob/master/text/1607-style-rfcs.md) to decide on a common Rust style for everyone.

I already converted my [liquid](https://travis-ci.org/cobalt-org/liquid-rust) and [Cobalt](https://github.com/cobalt-org/cobalt.rs) projects to automatically check if pull requests adhere to the rustfmt style and it works quite well. The program output even shows you a list of things you need to fix ([example](https://travis-ci.org/cobalt-org/liquid-rust/jobs/143378751#L263)).

I hope this is useful to folks!
