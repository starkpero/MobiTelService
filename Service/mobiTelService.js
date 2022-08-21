const mobiTel = require('../Model/DataAccess');
const validator = require('../Utilities/validator');
const helper = require('../Utilities/helpers');

//check login with phoneNo and password
exports.checkLogin = async (req, res, next) => {
  try {
    const customer = await mobiTel.cust.find({
      phone_no: req.body.phone_no,
      password: req.body.password,
    });
    if (customer.length === 1) {
      res.status(200).json({
        status: 'success',
        result: true,
      });
    } else {  
      res.status(200).json({
        status: 'success',
        result: false,
      });
    }
  } catch (err) {
    next(err);
  }
};

//check customer already present or not
exports.checkCustomer = async (req, res, next) => {
  try {
    const customer = await mobiTel.cust.find({
      phone_no: req.params.phone,
    });
    if (customer.length === 1) {
      res.status(200).json({
        status: 'success',
        result: { data: customer },
      });
    } else {
      res.status(200).json({
        status: 'success',
        result: { data: 'Customer not available' },
      });
    }
  } catch (err) {
    next(err);
  }
};

//check customer and return complete details
exports.customerProfile = async (req, res, next) => {
  try {
    const customer = await mobiTel.cust.find(
      {
        phone_no: req.params.phone,
      },
      {
        _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
        password: 0,
      }
    );
    if (customer.length === 1) {
      //Fetch Plan Details
      const planDetails = await mobiTel.plan.find(
        { plan_id: customer[0].plan_id },
        {
          _id: 0,
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        }
      );
      //Fetch Friend Details
      const friendDetails = await mobiTel.friendfamily.find(
        { phoneNo: customer[0].phone_no },
        {
          friendAndFamily: 1,
          _id: 0,
        }
      );
      const fList = [];
      friendDetails.forEach((element) => fList.push(element.friendAndFamily));
      const custData = {
        phone_no: customer[0].phone_no,
        name: customer[0].name,
        age: customer[0].age,
        gender: customer[0].gender,
        address: customer[0].address,
        friendAndFamily: fList,
        currentPlan: planDetails[0],
      };
      res.status(200).json({
        status: 'success',
        result: { data: custData },
      });
    } else {
      res.status(200).json({
        status: 'success',
        result: { data: 'Customer not available' },
      });
    }
  } catch (err) {
    next(err);
  }
};

// New registration
exports.register = async (req, res, next) => {
  try {
    const allplans = await mobiTel.plan.find({}, { _id: 0, __v: 0 });
    const planId = helper.getPlanId(allplans, req.body.plan_name);
    const Address = req.body.address;
    const Name = req.body.name;
    const Password = req.body.password;
    const Phone = req.body.phoneNo;
    const Age = req.body.age;
    const Gender = req.body.gender;
    if (
      validator.validateLen(Address) &&
      validator.validateLen(Name) &&
      validator.validateLen(Password) &&
      validator.validatePhone(Phone) &&
      validator.validateAge(Age) &&
      validator.validateGender(Gender) &&
      planId !== 'Invalid Plan'
    ) {
      const customer = await mobiTel.cust.find({
        phone_no: Phone,
      });
      if (customer.length === 1) {
        res.status(200).json({
          status: 'fail',
          message: 'Customer already registered',
        });
      } else {
        const newCust = await mobiTel.cust.create({
          phone_no: Phone,
          password: Password,
          name: Name,
          age: Age,
          gender: Gender,
          address: Address,
          plan_id: planId,
        });
        res.status(201).json({
          status: 'success',
          message: `Customer with ${newCust.phone_no} number registered successfully`,
        });
      }
    } else if (!validator.validateLen(Address)) {
      res.status(400).json({
        status: 'fail',
        message: 'Minimum 3 characters should be there in address',
      });
    } else if (!validator.validateLen(Name)) {
      res.status(400).json({
        status: 'fail',
        message: 'Minimum 3 characters should be there in name',
      });
    } else if (!validator.validateLen(Password)) {
      res.status(400).json({
        status: 'fail',
        message: 'Minimum 3 characters should be there in password',
      });
    } else if (!validator.validatePhone(Phone)) {
      res.status(400).json({
        status: 'fail',
        message: 'Phone number should be 10 digits',
      });
    } else if (!validator.validateAge(Age)) {
      res.status(400).json({
        status: 'fail',
        message: 'Age should be greater than 0',
      });
    } else if (!validator.validateGender(Gender)) {
      res.status(400).json({
        status: 'fail',
        message: 'Gender should be either M/F',
      });
    } else if (planId === 'Invalid Plan') {
      res.status(400).json({
        status: 'fail',
        message: 'Invalid Plan',
      });
    }
  } catch (err) {
    next(err);
  }
};

//get specific plan by plan id
exports.getPlan = async (req, res, next) => {
  try {
    const plan = await mobiTel.plan.find(
      { plan_id: req.params.id },
      { _id: 0, __v: 0 }
    );
    if (plan.length > 0) {
      res.status(200).json({
        status: 'success',
        results: plan.length,
        data: {
          plan,
        },
      });
    } else {
      res.status(400).json({
        status: 'success',
        data: {
          message: 'No plans available in the database',
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

// get plan by plan name 
exports.getPlandetails = async (req, res, next) => {
  try {
    const plan = await mobiTel.plan.find(
      { plan_name: req.params.plan_name },
      { _id: 0, __v: 0 }
    );
    if (plan.length > 0) {
      res.status(200).json({
        status: 'success',
        results: plan.length,
        data: {
          plan,
        },
      });
    } else {
      res.status(400).json({
        status: 'success',
        data: {
          message: 'No plans available in the database',
        },
      });
    }
  } catch (err) {
    next(err);
  }
};
// get All plans API
exports.getAllPlans = async (req, res, next) => {
  try {
    const allplans = await mobiTel.plan.find({}, { _id: 0, __v: 0 });
    if (allplans.length > 0) {
      res.status(200).json({
        status: 'success',
        results: allplans.length,
        data: {
          allplans,
        },
      });
    } else {
      res.status(400).json({
        status: 'success',
        data: {
          message: 'No plans available in the database',
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

// Call details retrival for specific customer

exports.callDetails = async (req, res, next) => {
  try {
    const callDet = await mobiTel.callDetails.find(
      { calledBy: req.params.phone },
      { _id: 0, __v: 0 }
    );
    if (callDet.length > 0) {
      res.status(200).json({
        status: 'success',
        results: callDet.length,
        data: {
          callDet,
        },
      });
    } else {
      res.status(400).json({
        status: 'success',
        data: {
          message: 'No call information found for the user',
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.addFriend = async (req, res, next) => {
  const custPhoneNo = req.params.logPhone.toString();
  const friendPhoneNo = req.body.friendAndFamily;
  const fname = req.body.name;
  console.log(custPhoneNo, friendPhoneNo);
  try {
    if (custPhoneNo === friendPhoneNo) {
      res.status(201).json({
        message: 'Same phone numbers cannot be added as friends',
      });
    } else if (
      custPhoneNo != null &&
      validator.validatePhone(custPhoneNo) &&
      validator.validatePhone(friendPhoneNo)
    ) {
      const customer = await mobiTel.cust.find({
        phone_no: [friendPhoneNo, custPhoneNo],
      });

      if (customer.length === 2) {
        const custcheck = await mobiTel.friendfamily.find({
          phoneNo: custPhoneNo,
          friendAndFamily: friendPhoneNo,
        });

        if (custcheck.length === 1) {
          res.status(201).json({
            message: `Already added as friends/Family contact`,
          });
        } else {
          const addnumber = await mobiTel.friendfamily.create({
            phoneNo: custPhoneNo,
            friendAndFamily: friendPhoneNo,
            name: fname,
          });
          res.status(201).json({
            message: 'Successfully added number to database',
            data: {
              addnumber,
              fname,
            },
          });
        }
      } else {
        res.status(400).json({
          message:
            'The provided number not registered with us. Kindly register first!',
        });
      }
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'Phone number should be 10 digits',
      });
    } // closing of 1st if check
  } catch (err) {
    next(err);
  }
};

exports.friendNumber = async (req, res, next) => {
  try {
    const custPhoneNo = req.params.phone;
    const friendPhone = await mobiTel.friendfamily.find(
      { phoneNo: custPhoneNo },
      { friendAndFamily: 1, name: 1, _id: 0 }
    );
    if (friendPhone.length > 0) {
      console.log('in friendNumber', friendPhone);
      res.status(200).json({
        status: 'success',
        data: {
          friendPhone,
        },
      });
    } else {
      res.status(400).json({
        status: 'success',
        data: {
          message: 'Friend is not added Yet',
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

// Invalid
exports.invalid = async (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Invalid path',
  });
};
