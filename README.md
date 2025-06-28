# Project-HAshmaps-

What is this project?
You’re going to build your own HashMap class in JavaScript.
A HashMap is a data structure that:
Stores key → value pairs (like apple → red)
Uses a hash function to decide where to store the key
Is very fast to get, set, or remove values
You're not allowed to use JavaScript's built-in Map or Object for this.
You will build everything from scratch.

🧱 Project Structure
You will have:

/project-folder
│
├── HashMap.js // Your HashMap class
├── test.js // Your testing file
└── README.md // (This guide you're reading now)
🚦 RULE: Enforce Boundaries
In JavaScript, arrays can grow automatically.
But in this project, you must not allow going beyond the array size.

Always write:

if (index < 0 || index >= buckets.length) {
throw new Error("Trying to access index out of bounds");
}

This keeps your hash map limited to its current size unless you manually expand it.

🧮 STEP 1: Start Your HashMap Class
Create a file called HashMap.js.

Inside it, write a class with these basic properties:

class HashMap {
constructor(initialCapacity = 16, loadFactor = 0.75) {
this.buckets = new Array(initialCapacity); // Your storage array
this.capacity = initialCapacity; // Max size before resizing
this.loadFactor = loadFactor; // When to expand
this.size = 0; // Number of keys stored
}
}

🔐 STEP 2: Write the Hash Function
Add a hash() method inside your class:

hash(key) {
let hashCode = 0;
const prime = 31;
for (let i = 0; i < key.length; i++) {
hashCode = (prime \* hashCode + key.charCodeAt(i)) % this.capacity;
}
return hashCode;
}

This takes a string key (like "apple") and turns it into a number (like 5)
% this.capacity makes sure the number fits in your bucket array

📥 STEP 3: set(key, value)
This method stores a value in the map.

Basic idea:
Convert the key into an index using the hash() function

If the bucket is empty, store the key/value
If it's already used (collision), check:
If the key exists → update it
If not → add a new entry (use a linked list or array)

Check if size / capacity > loadFactor. If yes → expand the bucket array

📤 STEP 4: get(key)
Use the hash function to find the bucket.
Check if the key exists in that bucket and return the value.
If not found, return null.

✅ STEP 5: has(key)
Return true if the key is found, otherwise return false.

❌ STEP 6: remove(key)
Find the key using the hash.
If it's found, remove it and return true.
If not found, return false.
Also, decrease size.

📏 STEP 7: length()
Return the number of stored key/value pairs.

🧹 STEP 8: clear()
Remove everything:
Set buckets to a new empty array
Set size to 0

🔑 STEP 9: keys()
Return an array of all the keys.

🎁 STEP 10: values()
Return an array of all the values.

🧩 STEP 11: entries()
Return an array of [key, value] pairs like:
[
['apple', 'red'],
['banana', 'yellow']
]

🚀 STEP 12: Auto-Resize
When size / capacity becomes greater than loadFactor, resize the hash map:

Create a new buckets array with double capacity
Re-insert all old keys and values using the new hash positions

🧪 STEP 13: Testing
In a file called test.js:

const test = new HashMap(); // Or: new HashMap(16, 0.75)

test.set('apple', 'red');
test.set('banana', 'yellow');
// ... add more entries

test.set('apple', 'green'); // Should update the value

console.log(test.get('apple')); // "green"
console.log(test.has('banana')); // true
console.log(test.remove('carrot')); // true or false
console.log(test.length()); // How many keys?

console.log(test.keys()); // All keys
console.log(test.values()); // All values
console.log(test.entries()); // All entries

test.clear();
console.log(test.length()); // Should be 0
🏅 Bonus: HashSet
After completing HashMap, try building a HashSet.

It’s the same thing, but:

You only store keys, no values

Useful for checking "has this been seen before?"

📦 Summary Table
Method What it does
hash(key) Turns string into number (index)
set() Stores or updates key/value
get() Finds value for a key
has() Checks if key exists
remove() Deletes a key/value pair
length() Number of key/value pairs
clear() Empties the entire map
keys() Returns all keys
values() Returns all values
entries() Returns key-value pairs

✅ Final Tip: Test Everything
After resizing or removing, make sure everything still works.

Try:

Overwriting values
Resizing after moon → silver
Checking updated length
Getting keys, values, entries
