@extends: default.tpl

title:   Using rustfmt in Vim
date:    11/03/2015
path:    rustfmt-vim.html
route:   blog
---

# {{ title }}

[rustfmt](https://github.com/nrc/rustfmt) just added support for receiving code on stdin. This means that you can now pipe things into `rustfmt` on stdin and receive a plain formatted version of your input on stdout, the UNIX way.

      echo "pub fn main(){println!(\"hello\");}" | rustfmt

      cat src/lib.rs | rustfmt

This enables us to write editor plugins that call `rustfmt` and replace the file content with the result from stdout.

Here's how to do it in Vim, my editor of heart.

## Integrating with Vim-Autoformat

[Vim-Autoformat](https://github.com/Chiel92/vim-autoformat) is a neat plugin that allows you to define custom formatters to run on your code while you're editing it in Vim.

Only a few steps are required to make it work with rustfmt.

1. __Install rustfmt__, instructions can be found here: [https://github.com/nrc/rustfmt#installation](https://github.com/nrc/rustfmt#installation)

      multirust run nightly cargo install --git https://github.com/nrc/rustfmt

2. __Install vim-autoformat__ with a plugin manager of your choice, I use [vim-plug](https://github.com/junegunn/vim-plug)

      Plug 'Chiel92/vim-autoformat'

3. __Add rustfmt to the list of formatters.__ vim-autoformat comes with a set of predefined formatters for popular languages, but until my [pull request adding Rust](https://github.com/Chiel92/vim-autoformat/pull/87) is merged we'll have to add it ourselves.

Fortunately, it's quite easy. Just add the following two lines to your .vimrc:

      let g:formatdef_rustfmt = '"rustfmt"'
      let g:formatters_rust = ['rustfmt']

Now you can call `:Autoformat` to automatically format your Rust code. Optionally you can map it to something more convenient, I use `<Leader>f`

      nmap <Leader>f :Autoformat<CR>

Or you can instruct Vim to automatically format on save, which is only convenient if the formatter is fast enough. (`rustfmt` is blazing fast)

      au BufWrite * :Autoformat

Now go ahead and integrate `rustfmt` into your preferred editor! It's a great way to keep your code consistent and a tight editor integration will ensure your workflow is never disrupted and that you will never forget to rustfmt anything again.

