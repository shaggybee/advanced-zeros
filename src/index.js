module.exports = function getZerosCount(number, base) {

  function findFactors(num){
    let array = [];
    for (let factor = 2; factor <= num; factor++){
      if (num % factor != 0) continue;
      else {
        if (factor === num) array.push(factor);
        else{
          array.push(factor);
          Array.prototype.push.apply(array, findFactors(num / factor));
        }
        return array;
      }
    }
    return array;
  }

  function countZero(number, divisor, countDivisor){
    let zero = 0;
    var factor = divisor;
    for (divisor; number/divisor >= 1; divisor *= factor) zero += Math.floor(number / divisor);
    return Math.floor(zero / countDivisor);
  }

  function resultZero(number, base){
    let zero = 0;
    let array_factors = findFactors(base);
    if (array_factors.length === 1) zero = countZero(number, array_factors[0], array_factors.length);
    else if ((array_factors.length === 2) & (array_factors[0] === array_factors[1])) zero = countZero(number, array_factors[0], array_factors.length);
    else {
      let objFactors = {};
      let objNumZero = {};
      for (let i = 0; i < array_factors.length; i++){
        var num = array_factors[i];
        objFactors[num] = objFactors[num] ? objFactors[num] + 1 : 1;
      }
      for (let i = 0; i < Object.keys(objFactors).length; i++){
        zero = countZero(number, Object.keys(objFactors)[i], objFactors[Object.keys(objFactors)[i]]);
        objNumZero[zero] = zero;
      }
      zero = Object.keys(objNumZero)[0];
    }
    return zero;
  }
  
  return resultZero(number, base);
}