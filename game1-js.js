function findPair(n, arr) {
    let memory = new Set();
    for (let i = 0; i < arr.length; i++) {
        let complement = n - arr[i];
        if (memory.has(complement)) {
            return [complement, arr[i]];
        }
        memory.add(arr[i]);
    }
    return [-1, -1];
}

let arr = [-6, 10, 5, 2, 6];
let result = findPair(0, arr);
console.log(result[0], result[1]);