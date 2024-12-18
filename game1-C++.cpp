#include <iostream>
#include <unordered_set>
using namespace std;

pair<int, int> funcion(int n, int m[], int size) {
    unordered_set<int> memory;
    for (int i = 0; i < size; i++) { // O(n)
        int complement = n - m[i];
        if (memory.find(complement) != memory.end()) { // O(1)
            return make_pair(complement, m[i]);
        }
        memory.insert(m[i]);
    }
    return make_pair(-1, -1);
}

/*
    * Time complexity: O(n)
    * Space complexity: O(n)
    * Where n is the size of the array m 
*/

int main() {
    int m[] = {-6,10,5,2,6};
    pair<int, int> result = funcion(0, m, 5);
    cout << result.first << " " << result.second << endl;
    return 0;
}