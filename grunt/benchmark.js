/*jslint indent: 4 */
/*global module */
module.exports = {
    options: {
        displayResults: false
    },
    all: {
        src: ['benchmarks/**/*.bench.js'],
        dest: 'build/reports/benchmark.csv'
    }
};
