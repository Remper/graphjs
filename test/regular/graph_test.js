/**
 * Created by remper on 20.03.14.
 */
'use strict';

(function() {
    var n1, n2, e, g;
    module("Graph unit tests", {
        setup: function() {
            n1 = new GJS.Node();
            n2 = new GJS.Node();
            e = new GJS.Edge(n1, n2);
            g = (new GJS.Graph()).addEdge(e);
        },
        teardown: function() {}
    });

    test("Add edge", function() {
        equal(g.nodes.length, 2, "Nodes count");
        equal(g.edges.length, 1, "Edges count");
    });

    test("Delete edge", function() {
        g.removeEdge(e);
        equal(g.nodes.length, 2, "Nodes count");
        equal(g.edges.length, 0, "Edges count");
    });

    test("Delete node", function() {
        g.removeNode(n2);
        equal(g.nodes.length, 1, "Nodes count");
        equal(g.edges.length, 0, "Edges count");
    });
})();