function runBench() {
  let summary = document.getElementById("summary");
  summary.textContent = "...running benchmark\n";
  let wasmCode = new Uint8Array([0,97,115,109,1,0,0,0,1,134,128,128,128,0,1,96,1,127,1,127,3,130,128,128,128,0,1,0,4,132,128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,0,1,6,129,128,128,128,0,0,7,144,128,128,128,0,2,6,109,101,109,111,114,121,2,0,3,102,105,98,0,0,10,167,128,128,128,0,1,161,128,128,128,0,0,2,64,32,0,65,1,114,65,1,71,13,0,32,0,15,11,32,0,65,127,106,16,0,32,0,65,126,106,16,0,106,11]);
  WebAssembly.compile(wasmCode).then(mod => {
    function fibJS(n) {
      if (n == 0 || n == 1) {
        return n;
      }

      return fibJS(n - 1) + fibJS(n - 2);
    }
    let m = new WebAssembly.Instance(mod)
    console.log();
    let suite = new Benchmark.Suite;

    suite.add('WASM', function() {
      m.exports.fib(30);
    })
    .add('JS', function() {
      fibJS(30);
    })
    // add listeners
    .on('cycle', function(event) {
      summary.textContent += String(event.target) + "\n";
    })
    .on('complete', function() {
      summary.textContent += 'Fastest is ' + this.filter('fastest').map('name') + "\n";
    })
    // run async
    .run({ 'async': true });
  })
}
