const getKLargest = (intList, k, n) => {
    if (n<intList.length) {
        let numbers = intList.slice(n-1);
        // console.log('numbers = ', numbers);
        numbers.sort((a,b) => {
            a-b;
        });
        // console.log('Sorted numbers = ', numbers);
    
        if (numbers.length-k < 0) {
            return -1;
        }
        return numbers[numbers.length-k];
    } else {
        return 'n value is less than length of integers list';
    } 
};

module.exports = { getKLargest };