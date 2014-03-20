/**
 * Created by remper on 20.03.14.
 */
'use strict';

if (typeof GJS === "undefined") {
    throw new Error("Wrong inclusion order: core.js must be the first one");
}

/**
 * ES6 Map implementation of GraphContainer
 */
(function(exports) {
    //This implementation is only supported if Map is present
    if (!GJS.Misc.isMapSupported()) {
        return;
    }

    //Imports
    var inherit = exports.Misc.inherit,
        GraphContainer = exports.GraphContainer;

    var MapGraphContainer = function() {
        this.edges = new Map();
        this.nodes = new Map();
    };
    MapGraphContainer.prototype = {
        _count: function(collection) {
            return collection.size;
        },
        _forEach: function(collection, func, context) {
            collection.forEach(function(value, key) {
                func.call(this, key);
            }, context);
        },
        _add: function(collection, entity) {
            collection.set(entity, null);
        },
        _remove: function(collection, entity) {
            collection.delete(entity);
        },
        _exists: function(collection, entity) {
            return collection.has(entity);
        }
    };
    inherit(MapGraphContainer, GraphContainer);

    exports.MapGraphContainer = MapGraphContainer;
    exports.impl.register("container", "map", MapGraphContainer);
})(GJS);
