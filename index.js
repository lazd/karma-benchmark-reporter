var BenchReporter = function(baseReporterDecorator) {
  baseReporterDecorator(this);

  var resultSet = {};

  this.onRunComplete = function(browsers, resultInfo) {
    for (var browserName in resultSet) {
      var groups = resultSet[browserName];

      this.write(browserName+'\n');

      for (var groupName in groups) {
        var results = groups[groupName]
        if (results.length) {
          // Find the fastest among the groups
          results.sort(function(a, b) {
            return b.benchmark.hz - a.benchmark.hz;
          });

          var fastest = results[0];
          var secondFastest = results[1];

          var timesFaster = (fastest.benchmark.hz/secondFastest.benchmark.hz).toFixed(2);
          this.write('  '+fastest.benchmark.suite+': '+fastest.benchmark.name+' at '+Math.floor(fastest.benchmark.hz)+' ops/sec ('+timesFaster+'x faster than '+secondFastest.benchmark.name+')\n');
        }
        else {
          this.write('  '+results[0].description+' had no peers for comparison at '+Math.floor(results[0].benchmark.hz)+' ops/sec\n')
        }
      }
    }
  };

  this.specSuccess = function(browser, result) {
    var browser = browser.name;
    var suite = result.benchmark.suite;
    var name = result.benchmark.name;

    // Get set and store results
    var browserSet = resultSet[browser] = resultSet[browser] || {};
    browserSet[suite] = browserSet[suite] || [];
    browserSet[suite].push(result);

    this.write(browser+'  '+suite+': '+name+' at '+Math.floor(result.benchmark.hz)+' ops/sec\n');
  };
};

BenchReporter.$inject = ['baseReporterDecorator'];

module.exports = {
  'reporter:benchmark': ['type', BenchReporter]
};
