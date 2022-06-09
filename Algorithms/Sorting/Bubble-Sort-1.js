// 서로 인접한 두 원소를 비교하면서 정렬하는 알고리즘

let swap = function (arr, idx_1, idx_2) {
    let tmp = arr[idx_1];
    arr[idx_1] = arr[idx_2];
    arr[idx_2] = tmp;
};

let bubbleSort_1 = function(arr){
    for(let i=0; i<arr.length - 1; i++){
        for(let j=0; j<arr.length - 1; j++){
            if(arr[j] > arr[j+1]){
                swap(arr, j, j+1);
            }
        }
    }
};

let bubbleSort_2 = function(arr){
    for(let i=0; i<arr.length - 1; i++){
        // i만큼 더 빼줌으로써 이미 정렬된 값들은 더 순회를 하지 않게 된다
        for(let j=0; j<arr.length - i - 1; j++){ 
            if(arr[j] > arr[j+1]){
                swap(arr, j, j+1);
            }
        }
    }
};

let bubbleSort_3 = function(arr){
    for(let i=0; i<arr.length - 1; i++){
        let swapped = false;
        for(let j=0; j<arr.length - i - 1; j++){ 
            if(arr[j] > arr[j+1]){
                swap(arr, j, j+1);
            }
            swapped = true;
        }
        if(!swapped) break; //교체 된 것이 없으면 반복문을 빠져나온다.
    }
};

let init_array = [4,2,6,1,5,3];

let array = [...init_array];
bubbleSort_1(array);
console.log(array);
array = [...init_array];
bubbleSort_2(array);
console.log(array);
array = [...init_array];
bubbleSort_3(array);
console.log(array);
