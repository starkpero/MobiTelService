const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/mobiTel', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    try {
      console.log('DB connection successful!');
    } catch (err) {
      console.log(err);
    }
  });

//Schema
const customerSch = new mongoose.Schema(
  {
    phone_no: {
      type: Number,
      unique: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    plan_id: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const planSch = new mongoose.Schema(
  {
    plan_id: {
      type: Number,
      unique: true,
    },
    plan_name: {
      type: String,
      unique: true,
    },
    local_rate: {
      type: Number,
    },
    national_rate: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const friendfamilySch = new mongoose.Schema(
  {
    phoneNo: {
      type: Number,
      required: true,
    },
    friendAndFamily: {
      type: String,
      required: true,
    },
    // Added the name as well
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const callSchema = new mongoose.Schema(
  {
    calledBy: {
      type: Number,
      required: true,
    },
    calledTo: {
      type: Number,
      required: true,
    },
    calledOn: {
      type: String,
    },
    duration: {
      type: Number,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

//Models

const dbModels = {};

dbModels.cust = mongoose.model('customers', customerSch);

dbModels.plan = mongoose.model('plans', planSch);

dbModels.callDetails = mongoose.model('callDetails', callSchema);

dbModels.friendfamily = mongoose.model('friendfamilies', friendfamilySch);

dbModels.cust.deleteMany({}, function (err) {
  dbModels.cust.create([
    {
      phone_no: 8861887993,
      password: 'abc@123',
      name: 'Alex',
      age: 24,
      gender: 'M',
      address: 'Sydney',
      plan_id: 1,
    },
    {
      phone_no: 9952272302,
      password: 'abc@223',
      name: 'Sam',
      age: 22,
      gender: 'F',
      address: 'England',
      plan_id: 2,
    },
    {
      phone_no: 8748812296,
      password: 'abc@223',
      name: 'Archi',
      age: 22,
      gender: 'F',
      address: 'Wellington',
      plan_id: 2,
    },
  ]);
  console.log('customers collection updated');
});

dbModels.plan.deleteMany({}, function (err) {
  dbModels.plan.create([
    {
      plan_id: 1,
      plan_name: 'mobi_60',
      local_rate: 60,
      national_rate: 60,
    },
    {
      plan_id: 2,
      plan_name: 'mobi_10',
      local_rate: 10,
      national_rate: 20,
    },
    {
      plan_id: 3,
      plan_name: 'mobi_30',
      local_rate: 30,
      national_rate: 60,
    },
  ]);
  console.log('plans collection updated');
});

dbModels.callDetails.deleteMany({}, function (err) {
  dbModels.callDetails.create([
    {
      calledBy: 8861887993,
      calledTo: 8748812296,
      calledOn: '22-Sep-2020',
      duration: 60,
      name: 'Monica',
    },
    {
      calledBy: 8861887993,
      calledTo: 9952272302,
      calledOn: '22-Aug-2020',
      duration: 20,
      name: 'Sam',
    },
  ]);
  console.log('calldetails collection removed');
});

dbModels.friendfamily.deleteMany({}, function (err) {
  dbModels.friendfamily.create([
    {
      phoneNo: 8861887993,
      friendAndFamily: '9952272302',
      name: 'Alax',
    },
    {
      phoneNo: 8861887992,
      friendAndFamily: '8748812296',
      name: 'Ross',
    },
  ]);
  console.log('friendfamilies collection removed');
});

module.exports = dbModels;
