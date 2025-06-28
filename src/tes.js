import HashMap from "./hasmaps.js";

const test = new HashMap(); // Or: new HashMap(16, 0.75)

test.set("apple", "red");
test.set("banana", "yellow");
// ... add more entries

test.set("apple", "green"); // Should update the value

console.log(test.get("apple")); // "green"
console.log(test.has("banana")); // true
console.log(test.remove("carrot")); // true or false
console.log(test.length()); // How many keys?

console.log(test.keys()); // All keys
console.log(test.values()); // All values
console.log(test.entries()); // All entries

console.log(test.get("banana")); // "yellow"

test.clear();
console.log(test.length());
