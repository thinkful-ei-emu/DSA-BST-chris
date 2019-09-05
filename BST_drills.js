// 1. Draw a BST
// Given the data 3,1,4,6,9,2,5,7, if you were to insert this into an empty 
// binary search tree, what would the tree look like? (Draw the tree, no coding needed here.)
// Draw the BST with the keys - E A S Y Q U E S T I O N
//    /3\
// 1\      4\
//     2      /6\
//         5      /9
//             7


//    /E\
// A\         /S\
//     E  /Q\          /Y
//      I\     S    /U
//        /O      T
//      N

// 2. Remove the root
// Show how the above trees would look like if you deleted the root of each tree. 
// (Draw the trees, no coding needed here.)
// 1\      4\
//     2      /6\
//         5      /9
//             7

// A\         /S\
//     E  /Q\          /Y
//      I\     S    /U
//        /O      T
//      N

// Without running this code in your code editor, explain what the following program does. 
// Show with an example the result of executing this program. What is the runtime of this algorithm?

function tree(t){
  if(!t){
    return 0;
  }
  return tree(t.left) + t.value + tree(t.right);
}
//this function sums up the value of all the numerical keys in a tree.
// O(n)
// input
//    /3\
// 1\      4\
//     2      /6\
//output
// 16

// 5. Height of a BST
// Write an algorithm to find the height of a binary search tree. 
// What is the time complexity of your algorithm?
function treeHeight(tree, pos = 0, res = []){
  if(!tree){
    return 0;
  }
  res[pos] = 1;
  pos++;
  if(tree){
    treeHeight(tree.left, pos, res);
    treeHeight(tree.right, pos, res);
  }
  return res.length;
}

// 6. Is it a BST?
// Write an algorithm to check whether an arbitrary binary tree is a binary 
// search tree, assuming the tree does not contain duplicates.

function notABST(tree){
  if(tree.left >= tree.value || tree.right <= tree.value){
    return true;
  }
  if(tree.left || tree.right){
    notABST(tree.left);
    notABST(tree.right);
    return false;
  }
}

// 7. 3rd largest node
// Write an algorithm to find the 3rd largest node in a binary search tree.
function thirdLg(tree, x = tree.key, max = tree.key, next = tree.key, res = tree.key){
  if(x > max){
    res = next;
    next = max;
    max = x;
  } else if (x > next){
    res = next;
    next = x;
  } else if (x > res){
    res = x;
  }
  if(!tree){
    return res;
  }
  let a;
  let b;
  if(tree){
    a = thirdLg(tree.left, tree.key, max, next, res);
    b = thirdLg(tree.right, tree.key, max, next, res);
  }
  return a > b ? a : b;
}


// 8. Balanced BST
// Write an algorithm that checks if a BST is balanced (i.e., a tree where 
//     no 2 leaves differ in distance from the root by more than 1).
function compHgt(tree){
  let treeHgt={};
  if(tree===null)
    return true;
  hgtCount(tree,1,treeHgt);
  let hgt=Object.keys(treeHgt);
  if(hgt.length>2)
    return false;
  if(hgt.length===1)
    return true;
  if(Math.abs(hgt[0]-hgt[1]) <=1){
    return true;
  }
}

function hgtCount(node,hgt,treeHgt){
  if(node===null)
    return;
  if(node.left===null && node.right===null){
    treeHgt[hgt]='here';
    return;
  }
  hgtCount(node.left,hgt+1,treeHgt);
  hgtCount(node.right,hgt+1,treeHgt);
}


// 9. Are they the same BSTs?
// You are given two arrays which represent two sequences of keys that are 
// used to create two binary search trees. Write a program that will tell 
// whether the two BSTs will be identical or not without actually constructing 
// the tree. You may use another data structure such as an array or a linked 
// list but don't construct the BST. What is the time complexity of your 
// algorithm? E.g., 3, 5, 4, 6, 1, 0, 2 and 3, 1, 5, 2, 4, 6, 0 are two 
// sequences of arrays but will create the exact same BSTs and your program 
// should return true.
function sameBST(arr1, arr2){
  if(arr1.length !== arr2.length){
    return false;
  } if(arr1[0] !== arr2[0]){
    return false;
  } if(arr1.length === 0){
    return true;
  }
  let big1 = [];
  let lil1 = [];
  let big2 = [];
  let lil2 = [];
  for(let i=0; i<arr1.length; i++){
    if(arr1[i] >= arr1[0]){
      big1.push(arr1[i]);
    } else {
      lil1.push(arr1[i]);
    }
    if(arr2[i] >= arr2[0]){
      big2.push(arr2[i]);
    } else {
      lil2.push(arr2[i]);
    }
  }
  let smaller = sameBST(lil1, lil2);
  if (!smaller){
    return false;
  }
  if(big1.length !== big2.length){
    return false;
  } 
  for(let i=0; i<big1.length; i++){
    if(big1[i] !== big2[i]){
      return false;
    }
  }
  return true;
}
console.log(sameBST([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]));



function arrayToBTS(arr, bts = new BinarySearchTree(), start = 0, end = arr.length - 1){
  if(start > end){
    return;
  }
  if(start<end){
    let middle = Math.floor((start+end)/2);
    bts.insert(middle);
    bts.left = arrayToBTS(arr, bts, start, middle-1);
    bts.right = arrayToBTS(arr, bts, middle+1, end);
  }

  return bts;
}
// arrayToBTS([1,2,3,4,5,6,7,8,9]);

