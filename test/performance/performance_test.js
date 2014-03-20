/**
 * Created by remper on 20.03.14.
 */
'use strict';

(function() {
    var count = 10000, indexes = [], deletions = [], i;
    var regular = count - 1, double = count * 2 -1;
    for (i = 0; i < count*2; i++) {
        indexes.push([Math.floor(Math.random()*regular), Math.floor(Math.random()*regular)]);
    }
    for (i = 0; i < count; i++) {
        deletions.push(Math.floor(Math.random()*double));
    }

    var insertionPerformance = function(g) {
        console.log(g.container instanceof GJS.ArrayGraphContainer);
        expect(0);
        var i;
        for (i = 0; i < count; i++) {
            g.addNode(new GJS.Node());
        }
        for (i = 0; i < count*2; i++) {
            var index = indexes[i];
            g.addEdge(new GJS.Edge(g.nodes[index[0]], g.nodes[index[1]]));
        }
    };

    var deletionPerformance = function(g) {
        expect(0);
        for (var i = 0; i < count; i++) {
            g.removeEdge(g.edges[deletions[i]]);
        }
    };

    module("Array based graph");
    (function() {
        var g = new GJS.Graph(GJS.ArrayGraphContainer);
        test("Insertion Performance", function() {
            insertionPerformance(g);
        });
        test("Deletion Performance", function() {
            deletionPerformance(g);
        });
    })();

    if (GJS.Misc.isMapSupported()) {
        module("ES6 Map based graph");
        (function() {
            var g = new GJS.Graph(GJS.MapGraphContainer);
            test("Insertion Performance", function() {
                insertionPerformance(g);
            });
            test("Deletion Performance", function() {
                deletionPerformance(g);
            });
        })();
    }
})();