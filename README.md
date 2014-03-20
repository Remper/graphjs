[graphjs]
=======

This is going to be a library for various graph-related algorithms. 
For now it can be used only as a simple implementation of graph, but if I have enough time it is going to grow.
Check out the roadmap and feel free to contribute — there is no good enough graph-related js library yet.

Roadmap
---------------------

1. Implement simple Graph entity using different containers (Set, custom HashTable-ish ES5 implementation)
The problem is that simple array-based implementation lacks performance for obvious reasons, 
that is why we either have to use new ES6 containers such as Map and Set (which is working only in Firefox)
or implement custom hash table container that accept Objects as keys.
Interesting to see how efficient different implementations are.

2. Make efficient implementations for different types of special graphs including 
trees and allow tree->graph and graph->tree conversion as soon as Graph is acyclic, make efficient
representations for various graph-related tasks.

3. Implement basic algorithms: Dijkstra’s algorithm, Ford–Fulkerson for flow networks etc.
If you never implemented those algorithms — this is your chance to try one. 
Feel free to grab wikipedia, implement, write tests and commit.
