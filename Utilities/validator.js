exports.validateLen = function (data) {
  if (data.length < 3) {
    return false;
  }
  return true;
};

exports.validateAge = function (age) {
  if (age <= 0) {
    return false;
  }
  return true;
};

exports.validatePhone = function (phone) {
  console.log(typeof(phone));
  if (phone.toString().length !== 10) {
    return false;
  }
  return true;
};

// exports.validatePhone = function (phone) {
//   // console.log(phone,phone.length);
//   if (phone<=9999999999 || phone>=6000000000) {
//     return false;
//   }
//   return true;
// };

exports.validateGender = function (gender) {
  if (gender !== 'M' && gender !== 'F') {
    return false;
  }
  return true;
};
