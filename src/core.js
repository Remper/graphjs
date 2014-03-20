/**
 * Created by remper on 20.03.14.
 */
'use strict';

var GJS = {};

/**
 * Simple module system for factories
 */
GJS.impl = {
    container: {},
    register: function(type, id, func) {
        if (typeof this[type] === "object") {
            this[type][id] = func;
        }
    },
    getImpl: function(type, id) {
        if (typeof this[type] === "object" && typeof this[type][id] === "function") {
            return this[type][id];
        }

        return false;
    }
};

/**
 * Default graph factory
 *
 * @returns {GJS.Graph}
 */
GJS.createGraph = function() {
    var container = this.impl.getImpl("container", "map");
    if (container) {
        return new this.Graph(container);
    }

    return new this.Graph();
};

/**
 * Misc functions namespace
 */
GJS.Misc = {
    /**
     * Basic inheritance pattern
     *
     * @param {Function} child
     * @param {Function} parent
     */
    inherit: function(child, parent) {
        var F = function() {};
        F.prototype = parent.prototype;
        child.prototype = jQuery.extend(new F(), child.prototype);
        child.uber = parent.prototype;
        child.prototype.constructor = child;
    },
    /**
     * Check if parameter was set, if not then fallback to defaults
     *
     * @param value
     * @param def
     * @returns {*}
     */
    defValue: function(value, def) {
        return typeof value === "undefined" ? def : value;
    },
    isMapSupported: function() {
        return typeof Map !== "undefined" && typeof (new Map()).forEach !== "undefined";
    }
};

/**
 * Exceptions and error handling
 */
(function(exports) {
    //Imports
    var inherit = exports.Misc.inherit;

    /**
     * This exception rises when there are semantic issues
     * for example, invalid GraphContainer or unexpected Graph state
     *
     * @param message Message to display
     * @constructor
     */
    var SemanticError = function(message) { Error.call(this, message); };
    inherit(SemanticError, Error);

    exports.SemanticError = SemanticError;
})(GJS);

/**
 * Core entities: Node, Edge and Graph
 */
(function(exports) {
    //Imports
    var defValue = exports.Misc.defValue,
        inherit = exports.Misc.inherit,
        SemanticError = exports.SemanticError;

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

    var GraphContainer = function() {
        this.edges = this.nodes = null;
    };
    GraphContainer.prototype = {
        addNode: function(node) { this._add(this.nodes, node); },
        addEdge: function(edge) { this._add(this.edges, edge); },
        nodeExists: function(node) { return this._exists(this.nodes, node); },
        edgeExists: function(edge) { return this._exists(this.edges, edge); },
        removeNode: function(node) { this._remove(this.nodes, node); },
        removeEdge: function(edge) { this._remove(this.edges, edge); },
        forEachNode: function(func, context) { this._forEach(this.nodes, func, context); },
        forEachEdge: function(func, context) { this._forEach(this.edges, func, context); },
        getEdgeCount: function() { return this._count(this.edges); },
        getNodeCount: function() { return this._count(this.nodes); },
        _count: function() {
            throw new SemanticError("Trying to use abstract GraphContainer");
        },
        _forEach: function() {
            throw new SemanticError("Trying to use abstract GraphContainer");
        },
        _add: function() {
            throw new SemanticError("Trying to use abstract GraphContainer");
        },
        _remove: function() {
            throw new SemanticError("Trying to use abstract GraphContainer");
        },
        _exists: function() {
            throw new SemanticError("Trying to use abstract GraphContainer");
        }
    };
    var ArrayGraphContainer = function() {
        this.edges = [];
        this.nodes = [];
    };
    ArrayGraphContainer.prototype = {
        _count: function(collection) {
            return collection.length;
        },
        _forEach: function(collection, func, context) {
            collection.forEach(func, context);
        },
        _add: function(collection, entity) {
            collection.push(entity);
        },
        _remove: function(collection, entity) {
            var index = collection.indexOf(entity);
            if (index === -1) {
                return;
            }
            collection.splice(index, 1);
        },
        _exists: function(collection, entity) {
            return collection.indexOf(entity) !== -1;
        }
    };
    inherit(ArrayGraphContainer, GraphContainer);

    var Graph = function(container) {
        this.container = new (defValue(container, ArrayGraphContainer))();
        this.edges = [];
        this.nodes = [];
    };
    Graph.prototype = {
        addNode: function(node) {
            if (node instanceof Node && !this.nodeExists(node)) {
                this.container.addNode(node);
            }
            return this;
        },
        addEdge: function(edge) {
            if (edge instanceof Edge && !this.edgeExists(edge)) {
                this.addNode(edge.source);
                this.addNode(edge.sink);
                this.container.addEdge(edge);
            }
            return this;
        },
        nodeExists: function(node) {
            return this.container.nodeExists(node);
        },
        edgeExists: function(edge) {
            return this.container.edgeExists(edge);
        },
        removeNode: function(node) {
            if (!this.container.nodeExists(node)) {
                return this;
            }

            var edges = this.findEdgesByNode(node);
            edges.forEach(function(edge) {
                this.removeEdge(edge);
            }, this);

            this.container.removeNode(node);
            return this;
        },
        removeEdge: function(edge) {
            this.container.removeEdge(edge);
            return this;
        },
        findEdgesByNode: function(node) {
            var match = [];
            this.container.forEachEdge(function(edge) {
                console.log(edge);
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
    exports.GraphContainer = GraphContainer;
    exports.ArrayGraphContainer = ArrayGraphContainer;
    exports.Node = Node;
    exports.Edge = Edge;
    exports.FlowEdge = FlowEdge;
    exports.impl.register("container", "default", ArrayGraphContainer);
})(GJS);