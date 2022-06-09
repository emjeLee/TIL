// 서로 인접한 두 원소를 비교하면서 정렬하는 알고리즘

let swap = function (arr, idx_1, idx_2) {
    let tmp = arr[idx_1];
    arr[idx_1] = arr[idx_2];
    arr[idx_2] = tmp;
};

let ascending = function(x,y){
    return x > y;
};

let descending = function(x,y){
    return x < y;
};

let bubbleSort = function(arr, compare){
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = 0; j < arr.length - i - 1; j++){
            if(compare(arr[j], arr[j+1])) {
                swap(arr,j, j + 1);
            }
        }
    }
}


let init_array = [4,2,6,1,5,3];
let array;

let sorting = [bubbleSort];
let order = [ascending, descending];
for(let i = 0; i < sorting.length; i++){
    for(let j = 0; j < order.length; j++){
        console.log(sorting[i].name, order[j].name);

        array = [...init_array];
        sorting[i](array, order[j]);
        console.log(array);
    };
};
