function range(a, b) {
  let size = b - a + 1;
  let start = a;
  return Array.from({ length: size }, (_, index) => index + start);
}

function facto(n, end = 1) {
  return range(end, n).reduce((prev, current) => {
    return prev * current;
  }, 1);
}

function permutation(n, r) {
  return facto(n, n - r + 1);
}

function combination(n, r) {
  return permutation(n, r) / facto(r);
}

function multiPermutation(n, r) {
  return n ** r;
}

function multiCombination(n, r) {
  return combination(n + r - 1, r);
}

module.exports = {
  permutation,
  combination,
  multiPermutation,
  multiCombination,
};
