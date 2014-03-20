/**
 * Created by remper on 20.03.14.
 */
'use strict';

(function() {
    var count = 10000, indexes = [], deletions = [], gArray = new GJS.Graph(), i;
    var regular = count - 1, double = count * 2 -1;
    for (i = 0; i < count*2; i++) {
        indexes.push([Math.floor(Math.random()*regular), Math.floor(Math.random()*regular)]);
    }
    for (i = 0; i < count; i++) {
        deletions.push(Math.floor(Math.random()*double));
    }
    module("Array-based graph");

    test("Insertion Performance", function() {
        expect(0);
        var i;
        for (i = 0; i < count; i++) {
            gArray.addNode(new GJS.Node());
        }
        for (i = 0; i < count*2; i++) {
            var index = indexes[i];
            gArray.addEdge(new GJS.Edge(gArray.nodes[index[0]], gArray.nodes[index[1]]));
        }
    });

    test("Deletion Performance", function() {
        expect(0);
        for (var i = 0; i < count; i++) {
            gArray.removeEdge(gArray.edges[deletions[i]]);
        }
    });
})();