/**
 * Created by remper on 20.03.14.
 */
'use strict';

var GJS = {};

(function(exports) {
    var defValue = function(value, def) {
        return typeof value === "undefined" ? def : value;
    };
    var inherit = function(child, parent) {
        var F = function() {};
        F.prototype = parent.prototype;
        child.prototype = jQuery.extend(new F(), child.prototype);
        child.uber = parent.prototype;
        child.prototype.constructor = child;
    };

    var Node = function() {};

    var Edge = function(source, sink) {
        this.source = source;
        this.sink = sink;
    };
    Edge.prototype = {
        isRelatedToNode: function(node) {
            return node === this.source || node === this.sink;
        }
    };

    var FlowEdge = function(source, sink, capacity) {
        Edge.call(this, source, sink);
        this.capacity = defValue(capacity, 0);
    };
    inherit(FlowEdge, Edge);

    var Graph = function() {
        this.edges = [];
        this.nodes = [];
    };
    Graph.prototype = {
        addNode: function(node) {
            if (node instanceof Node && !this.nodeExists(node)) {
                this.nodes.push(node);
            }
            return this;
        },
        addEdge: function(edge) {
            if (edge instanceof Edge && !this.edgeExists(edge)) {
                this.addNode(edge.source);
                this.addNode(edge.sink);
                this.edges.push(edge);
            }
            return this;
        },
        nodeExists: function(node) {
            return this.nodes.indexOf(node) !== -1;
        },
        edgeExists: function(edge) {
            return this.edges.indexOf(edge) !== -1;
        },
        removeNode: function(node) {
            var index = this.nodes.indexOf(node);
            if (index === -1) {
                return this;
            }

            var edges = this.findEdgesByNode(node);
            edges.forEach(function(edge) {
                this.removeEdge(edge);
            }, this);

            this.nodes.splice(index, 1);
            return this;
        },
        removeEdge: function(edge) {
            var index = this.edges.indexOf(edge);
            if (index === -1) {
                return this;
            }

            this.edges.splice(index, 1);
            return this;
        },
        findEdgesByNode: function(node) {
            var match = [];
            this.edges.forEach(function(edge) {
                if (edge.isRelatedToNode(node)) {
                    match.push(edge);
                }
            });
            return match;
        }
    };

    exports.Node = Node;
    exports.Edge = Edge;
    exports.FlowEdge = FlowEdge;
    exports.Graph = Graph;
})(GJS);