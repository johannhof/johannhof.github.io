extends: post.liquid

title:   An intro to hand-written WebAssembly
date:    20 Mar 2017 10:00:00 +0100
route:   blog
---

Ever since reading [Rasmus Andersson's _Introduction to WebAssembly_](https://rsms.me/wasm-intro), which was a wonderful
starting point to explore the wasm/wast/wat format and hand-writing my own WebAssembly, I wanted to take the time and
write down what I learned based on writing a couple of fun exercise programs. I hope to do this in a format that can be understood
by most people with some basic programming experience.

> This post assumes you know why you want to try out WebAssembly and have a general idea of how it fits into the world of web development. If you want to know more about what WebAssembly is and how it works first, check out the [excellent post series on Mozilla Hacks](https://hacks.mozilla.org/2017/02/a-cartoon-intro-to-webassembly/).

## Embedding

Let's start off with an explanation of the different files we will encounter in this example:

- **index.html**: That's the HTML file where we will use JavaScript to load and run our wasm code.
- **example.wast**: The "WebAssembly" that we are writing in this tutorial. *wast* stands for WebAssembly Abstract Syntax Tree *or* WebAssembly text format, my sources were not really clear on that one. So this is indeed WebAssembly, but it can't be run inside the browser. We first need to translate it to:
- **example.wasm**: This is the compiled WebAssembly source that we will load and run. Looks weird and is not intended to be read by normal humans.

Since it's only about printing to the command line in this example, we're fine with putting literaly only this script tag in the HTML file:

```html
<script>
  fetch('example.wasm').then(response =>
    response.arrayBuffer()
  ).then(bytes =>
    WebAssembly.instantiate(bytes)
  ).then({instance} => {
    // Use the instance object in JS somehow.
    console.log(instance.exports.foo());
  });
</script>
```

Let's go through what this does in a bit of detail.

```js
fetch('example.wasm')
```

This uses the [fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) to load the .wasm file from wherever it's located.

```js
response.arrayBuffer()
```

This creates a new [array buffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) from the data for the compiler to compile. Note that an array buffer is just a blob of binary data, however, the compiler also accepts a JavaScript TypedArray, which can be quite useful for inlining (see below).

```js
WebAssembly.instantiate(bytes)
```

## Our first program

To compile wast to wasm we will need the [WebAssembly Binary Toolkit](https://github.com/WebAssembly/wabt). Please follow the instructions on the page. If everything worked out, you should have `wast2wasm` in your `PATH` now.

My first attempt was at hand-writing a simple Fibonacci series.

### My attempt

```lisp
(module
  (export "fib" (func $fib))
  (func $fib (param $n i32) (result i32)
    get_local $n ;; Push the first parameter onto the stack
    i32.const 0 ;; Push the constant 0 onto the stack
    i32.eq ;; Pop the two latest values off the stack and check for equality
    if
      get_local $n
      return
    end

    get_local $n ;; Push the first parameter onto the stack
    i32.const 1 ;; Push the constant 0 onto the stack
    i32.eq ;; Pop the two latest values off the stack and check for equality
    if
      get_local $n
      return
    end

    get_local $n
    i32.const 1
    i32.sub
    call $fib

    get_local $n
    i32.const 2
    i32.sub
    call $fib

    i32.add
  )
)
```

### Benchmarks

This is an important part of the story, since WebAssembly is supposed to be faster than JavaScript. On my Firefox Nightly,
the WASM code is usually about 3x faster than the JS equivalent. I'm using benchmark.js to run the tests. You can click
the button below to try it yourself:

<button onclick="runBench()">Run Benchmark</button>
<pre><code id="summary"></code></pre>

## Bubblesort

A classical interview question, re-imagined in WASM. Remember this one and you can show off at your next code interview.

### My attempt

### Compiled from C

### Benchmarks

## String concatenation

As someone primarily coding in high-level languages, this sounded much more trivial than expected.

### My attempt

### Compiled from C

### Benchmarks

<script src="/js/lodash.min.js"></script>
<script src="/js/benchmark.js"></script>
<script src="/js/wasm.js"></script>
