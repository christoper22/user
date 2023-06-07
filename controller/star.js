exports.printstar = () => {
  let n = 5;
  let stringA = '';
  let stringC = '';
  let stringB = '';
  let stringD = '';

  for (let i = 1; i <= n; i++) {
    //A
    for (let j = 0; j < i; j++) {
      stringA += '*';
    }
    stringA += '\n';

    // C
    for (let j = 0; j < n - i; j++) {
      stringC += ' ';
    }
    // printing star
    for (let k = 0; k < i; k++) {
      stringC += '*';
    }
    stringC += '\n';
    //B
    for (let k = 0; k < n - i; k++) {
      stringB += '*';
    }
    stringB += '\n';
    //D
    for (let j = 1; j <= n - i; j++) {
      stringD += ' ';
    }
    // printing star
    for (let k = 0; k < 2 * i - 1; k++) {
      stringD += '*';
    }
    stringD += '\n';
  }
  return { stringA, stringB, stringC, stringD };
};
exports.fibbonaci = (n) => {
  const number = n;
  let n1 = 0,
    n2 = 1,
    nextTerm;

  console.log(`Fibonacci Series: ${number}`);
  const data = [];
  for (let i = 1; i <= number; i++) {
    console.log(n1);
    data.push(n1);
    nextTerm = n1 + n2;
    n1 = n2;
    n2 = nextTerm;
  }
  return data;
};
exports.countData = (arry) => {
  const counts = {};

  const toFindDuplicates = (arry) =>
    arry.filter((item, index) => arry.indexOf(item) !== index);

  const duplicateElement = [...new Set(toFindDuplicates(arry))];
  console.log(duplicateElement);

  duplicateElement.forEach((y) => {
    arry.forEach(function (x) {
      if (x === y) {
        counts[x] = (counts[x] || 0) + 1;
      }
    });
  });
  console.log(counts);
  return counts;
};
exports.reverseArray = (arry) => {
  const data = arry.reverse();
  console.log(data);
  return data;
};
exports.minmax = (arry) => {
  const smallestNumber = Math.min(...arry);
  const largestNumber = Math.max(...arry);
  return { smallestNumber, largestNumber };
};
