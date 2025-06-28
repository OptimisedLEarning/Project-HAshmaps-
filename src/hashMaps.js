export default class hashMaps {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity);
    this.capacity = initialCapacity;
    this.size = 0;
    this.loadFactor = loadFactor;
  }
  //hash function to compute the index for a given key
  hash(key) {
    const index = this.buckets.findIndex((bucket) => bucket.key === key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    if (this.buckets[index] === undefined) {
      this.buckets[index] = [];
    }
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * prime + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  //Set(key,value)  sets thevalue of perticaula key in the hash map

  //   Psedo code for set method:
  //   1. Compute the index for the key using the hash function.
  //   2. Check if the bucket at that index exists; if not, create it.
  //   3. Iterate through the entries in the bucket to check if the key already exists.
  //   4. If the key exists, update its value.
  //   5. If the key does not exist, add a new entry with the key and value.
  //   6. Increment the size of the hash map.
  //   7. Check the load factor; if it exceeds the threshold, resize the hash map.

  set(key, value) {
    const index = this.hash(key) % this.capacity; // Jump to right bucket
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    for (let i = 0; i < this.buckets[index].length; i++) {
      const entry = this.buckets[index][i];
      if (entry.key === key) {
        entry.value = value; // Update existing key's value
        return;
      }
    }
    this.buckets[index].push({ key, value });
    this.size++;

    // Check load factor and resize if necessary
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  //psedo code for get method:
  //   1. Compute the index for the key using the hash function.
  //   2. Check if the bucket at that index exists.
  //   3. If the bucket exists, iterate through its entries.
  //   4. If the key matches, return the corresponding value.
  //   5. If the key is not found, return null.
  get(key) {
    const index = this.hash(key) % this.capacity; // Jump to right bucket
    if (!this.buckets[index]) {
      return null; // Bucket doesn't exist
    }

    for (let i = 0; i < this.buckets[index].length; i++) {
      const entry = this.buckets[index][i];
      if (entry.key === key) {
        return entry.value; // Key found, return value
      }
    }
    return null; // Key not found
  }

  //psedo code for has method:
  //   1. Compute the index for the key using the hash function.
  //   2. Check if the bucket at that index exists.
  //   3. If the bucket exists, iterate through its entries.
  //   4. If the key matches, return true.
  //    5. If the key is not found, return false.
  has(key) {
    const index = this.hash(key) % this.capacity; // Jump to right bucket
    if (!this.buckets[index]) {
      return false; // Bucket doesn't exist
    }
    for (let i = 0; i < this.buckets[index].length; i++) {
      const entry = this.buckets[index][i];
      if (entry.key === key) {
        return true; // Key found
      }
    }
    return false; // Key not found
  }

  //psedo code for remove method:
  //   1. Compute the index for the key using the hash function.
  //   2. Check if the bucket at that index exists.
  //   3. If the bucket exists, iterate through its entries.
  //   4. If the key matches, remove the entry from the bucket.
  //   5. If the key is not found, do nothing.

  remove(key) {
    const index = this.hash(key) % this.capacity; // Jump to right bucket

    if (!this.buckets[index]) {
      return; // Bucket doesn't exist, nothing to remove
    }
    for (let i = 0; i < this.buckets[index].length; i++) {
      const entry = this.buckets[index][i];
      if (entry.key === key) {
        this.buckets[index].splice(i, 1); // Remove the entry
        this.size--;
        return; // Key found and removed
      }
    }
    // Key not found, nothing to remove
  }

  // Pseudo code for length method:

  //   1. Return the size of the hash map.
  length() {
    return this.size; // Return the number of entries in the hash map
  }

  //Pseudo code for clear method:
  //   1. Clear all entries in the hash map.
  clear() {
    this.buckets = new Array(this.capacity); // Reset buckets
    this.size = 0; // Reset size
  }

  // Pseudo code for keys method:
  //   1. Create an empty array to hold the keys.
  //   2. Iterate through each bucket in the hash map.
  //   3. If the bucket exists, iterate through its entries.
  //   4. Add each key to the keys array.
  //   5. Return the keys array.
  keys() {
    const keys = []; // Initialize an empty array to store the keys
    for (const bucket of this.buckets) {
      if (bucket) {
        // Check if the bucket is not empty
        for (const entry of bucket) {
          keys.push(entry.key); // Add the key to the keys array
        }
      }
    }
    return keys; // Return the array of keys
  }
  // Pseudo code for values method:
  //   1. Create an empty array to hold the values.
  //   2. Iterate through each bucket in the hash map.
  //   3. If the bucket exists, iterate through its entries.
  //   4. Add each value to the values array.
  //   5. Return the values array.
  values() {
    const values = [];

    for (const bucket of this.buckets) {
      if (bucket) {
        // Check if the bucket is not empty
        for (const entry of bucket) {
          values.push(entry.value); // Add the value to the values array
        }
      }
    }
    return values; // Return the array of values
  }

  //Pseudo code for entries method:

  //   1. Create an empty array to hold the key-value pairs.
  //   2. Iterate through each bucket in the hash map.
  //   3. If the bucket exists, iterate through its entries.
  //   4. Add each key-value pair to the entries array.
  //   5. Return the entries array.

  entries() {
    const entries = []; // Initialize an empty array to store the key-value pairs
    for (const bucket of this.buckets) {
      if (bucket) {
        // Check if the bucket is not empty
        for (const entry of bucket) {
          entries.push([entry.key, entry.value]); // Add the key-value pair to the entries array
        }
      }
    }
    return entries; // Return the array of key-value pairs
  }

  // Pseudo code for Auto-Resize method:
  //  When size / capacity becomes greater than loadFactor, resize the hash map:
  //Create a new buckets array with double capacity
  //Re-insert all old keys and values using the new hash positions

  //1. Store the current buckets in a temporary variable (oldBuckets)
  //2. Double the capacity (capacity = capacity * 2)
  //3. Reset the size to 0 (you’ll re-add all pairs, so start fresh)

  //4. Create a new buckets array using the new capacity

  //5. Loop through each bucket in oldBuckets:
  //    a. If the bucket is not empty:
  //        i. For each entry in that bucket:
  //            - Use set(entry.key, entry.value) to reinsert into the new buckets
  // 6. Done!

  resize() {
    const oldBuckets = this.buckets; // Store the current buckets
    this.capacity *= 2; // Double the capacity
    this.size = 0; // Reset size to 0
    this.buckets = new Array(this.capacity); // Create a new buckets array
    // Reinsert all old keys and values using the new hash positions
    for (const bucket of oldBuckets) {
      if (bucket) {
        // Check if the bucket is not empty
        for (const entry of bucket) {
          this.set(entry.key, entry.value); // Reinsert each key-value pair
        }
      }
    }
  }
}
