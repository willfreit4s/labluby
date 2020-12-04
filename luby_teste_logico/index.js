function createArray(num, char){
    const array = [];
    if(num > 0){
        for(let i = 0; i < num; i++){
            array.push(char.toString());
        }
    }
    return array;
};

function invertArray(array){
    const newArray = [];
    if(array.length){
        for(let i = 0; i < array.length; i++){
            newArray.unshift(array[i]);
        }
    }

    return newArray;
}

function clearArray(array){
    const newArray = array.filter( item => {
        return item;
    });

    return newArray;
}

function convertArray(array){
    let newObj = {};
    array.forEach(item => {
        let obj = Object.assign({[item[0]]: item[1]});
        newObj = {
            ...newObj,
            ...obj
        };
    });
    return newObj;
}

function filterArray(array, num){
    if(array.length){
        for(let i = 1; i < arguments.length; i++){
            for(let pos = array.indexOf(arguments[i]); pos != -1; pos = array.indexOf(arguments[i])){
                array.splice(pos, 1);
            }
        }
    }

    return array;
}

function simplyArray(array){
    const newArray = [];
    array.forEach(item => {
        if(newArray.indexOf(item) == -1){
            newArray.push(item);
        }
    });

    return newArray;
}

function compareArray(array1, array2){
    let bool = false;
    if(array1.length == array2.length){
        array1.forEach((item, index)=>{
            if(item != array2[index]){
                bool = false;
                return;
            }else{
                bool = true;
            }
        });

        return bool;
    }
    return false;
}

function arrayClean(array){
    const newArray = [];
    if(array.length){
        array.forEach(item => {
            if(Array.isArray(item)){
                item.forEach(item => {
                    newArray.push(item);    
                });
            }else{
                newArray.push(item);
            }
        });
    }

    return newArray;
}

function divideArray(array, num){
    const newArray = [];
    let subArray = [];

    if(array.length){
        array.forEach(item => {
            if(subArray.length >= num){
                newArray.push(subArray);
                subArray = [];
            }
            subArray.push(item);
        });

        if(subArray.length){
            newArray.push(subArray);
        }
    }

    return newArray;
}

function intersecArray(array1, array2){
    const newArray = [];

    if(array1 && array2){
        array1.forEach(item => {
            if(array2.indexOf(item) != -1){
                newArray.push(item);
            }
        });
    }

    return newArray;
}

console.log(createArray(3, 'a'))
console.log(invertArray([1, 2, 5, 7, 9, 0]))
console.log(clearArray([1, 2, 5, 7, 9, 0, null, undefined]))
console.log(convertArray([["c",2],["d",4]]))
console.log(filterArray([5,4,3,2,5], 5,3))
console.log(simplyArray([1,2,3,3,2,4,5,4,7,3]))
console.log(compareArray([1,2,3,4],[1,2,3,4]));
console.log(arrayClean([1, 2, [3], [4, 5]]))
console.log(divideArray([1, 2, 3, 4, 5], 2))
console.log(intersecArray([6, 8], [8, 9]))