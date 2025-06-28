export default class HashMaps {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity); // Initialize the buckets array with the specified initial capacity
    this.capacity = initialCapacity; // Set the initial capacity of the hash map
    this.size = 0; // Initialize the size of the hash map to 0
    this.loadFactor = loadFactor; // Set the load factor for resizing the hash map
  }

  //hash function to compute the index for a given key
  hash(key) {
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * prime + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }
  set(key, value) {
    const index = this.hash(key) % this.capacity; // Jump to right bucket

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    for (let i = 0; i < this.buckets[index].length; i++) {
      const [k, v] = this.buckets[index][i];
      if (k === key) {
        this.buckets[index][i][1] = value; // ✅ Real update
        return;
      }
    }

    this.buckets[index].push([key, value]);
    this.size++;
  }

  get(key) {
    const index = this.hash(key); // Compute the index for the key using the hash function
    if (this.buckets[index]) {
      // Check if there is a bucket at the computed index
      for (const [k, v] of this.buckets[index]) {
        // Iterate through the entries in the bucket
        if (k === key) {
          // If the key matches, return the value
          return v;
        }
      }
    }
    return null; // If the key is not found, return null
  }
  has(key) {
    const index = this.hash(key); // Compute the index for the key using the hash function
    if (this.buckets[index]) {
      // Check if there is a bucket at the computed index
      for (const [k, v] of this.buckets[index]) {
        // Iterate through the entries in the bucket
        if (k === key) {
          // If the key matches, return true
          return true;
        }
      }
    }
    return false; // If the key is not found, return false
  }

  remove(key) {
    const index = this.hash(key); // Compute the index for the key using the hash function
    if (this.buckets[index]) {
      // Check if there is a bucket at the computed index
      for (let i = 0; i < this.buckets[index].length; i++) {
        const [k, v] = this.buckets[index][i];
        if (k === key) {
          // If the key matches, remove the entry from the bucket
          this.buckets[index].splice(i, 1);
          this.size--; // Decrease the size of the hash map
          return v; // Return the value associated with the removed key
        }
      }
    }
    return null; // If the key is not found, return null
  }
  length() {
    return this.size; // Return the current size of the hash map
  }
  clear() {
    this.buckets = new Array(this.capacity); // Reinitialize the buckets array
    this.size = 0; // Reset the size of the hash map to 0
  }
  keys() {
    const keys = []; // Initialize an empty array to store the keys
    for (const bucket of this.buckets) {
      if (bucket) {
        // Check if the bucket is not empty
        for (const [k, v] of bucket) {
          keys.push(k); // Add the key to the keys array
        }
      }
    }
    return keys; // Return the array of keys
  }
  values() {
    const values = []; // Initialize an empty array to store the values
    for (const bucket of this.buckets) {
      if (bucket) {
        // Check if the bucket is not empty
        for (const [k, v] of bucket) {
          values.push(v); // Add the value to the values array
        }
      }
    }
    return values; // Return the array of values
  }
  entries() {
    const entries = []; // Initialize an empty array to store the key-value pairs
    for (const bucket of this.buckets) {
      if (bucket) {
        // Check if the bucket is not empty
        for (const [k, v] of bucket) {
          entries.push([k, v]); // Add the key-value pair to the entries array
        }
      }
    }
    return entries; // Return the array of key-value pairs
  }

  // When size  capacity becomes greater than loadFactor, resize the hash map:

  resize() {
    const newCapacity = Math.floor(this.capacity / this.loadFactor); // Calculate the new capacity based on the load factor
    const newBuckets = new Array(newCapacity); // Create a new buckets array with the new capacity

    for (const bucket of this.buckets) {
      if (bucket) {
        // Check if the bucket is not empty
        for (const [k, v] of bucket) {
          const index = this.hash(k) % newCapacity; // Compute the new index for the key using the hash function and new capacity
          if (!newBuckets[index]) {
            newBuckets[index] = []; // Initialize a new bucket if it doesn't exist
          }
          newBuckets[index].push([k, v]); // Add the key-value pair to the new bucket
        }
      }
    }

    this.buckets = newBuckets; // Update the buckets array to the new buckets
    this.capacity = newCapacity; // Update the capacity to the new capacity
  }
}
