/**
 * Created by remper on 20.03.14.
 */
'use strict';

(function() {
    var n1, n2, e, g;

    var addEdge = function() {
        var container = g.container;
        equal(container.getNodeCount(), 2, "Nodes count");
        equal(container.getEdgeCount(), 1, "Edges count");
    };

    var deleteEdge = function() {
        g.removeEdge(e);
        var container = g.container;
        equal(container.getNodeCount(), 2, "Nodes count");
        equal(container.getEdgeCount(), 0, "Edges count");
    };

    var deleteNode = function() {
        g.removeNode(n2);
        var container = g.container;
        equal(container.getNodeCount(), 1, "Nodes count");
        equal(container.getEdgeCount(), 0, "Edges count");
    };

    module("Graph factory", {
        setup: function() {
            g = GJS.createGraph();
        },
        teardown: function() {}
    });

    if (GJS.Misc.isMapSupported()) {
        test("Graph factory with ES6", function() {
            ok(g instanceof GJS.Graph);
            ok(g.container instanceof GJS.MapGraphContainer);
        });
    } else {
        test("Graph factory without ES6", function() {
            ok(g instanceof GJS.Graph);
            ok(g.container instanceof GJS.ArrayGraphContainer);
        });
    }

    module("Graph with default container", {
        setup: function() {
            n1 = new GJS.Node();
            n2 = new GJS.Node();
            e = new GJS.Edge(n1, n2);
            g = (new GJS.Graph()).addEdge(e);
        },
        teardown: function() {}
    });

    test("Add edge", addEdge);
    test("Delete edge", deleteEdge);
    test("Delete node", deleteNode);

    if (GJS.Misc.isMapSupported()) {
        module("Graph with map container", {
            setup: function() {
                n1 = new GJS.Node();
                n2 = new GJS.Node();
                e = new GJS.Edge(n1, n2);
                g = (new GJS.Graph(GJS.MapGraphContainer)).addEdge(e);
            },
            teardown: function() {}
        });

        test("Add edge", addEdge);
        test("Delete edge", deleteEdge);
        test("Delete node", deleteNode);
    }
})();