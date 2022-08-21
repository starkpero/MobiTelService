const express = require('express');

const routing = express.Router();

const mobiTel = require('../Service/mobiTelService');

routing.post('/login', mobiTel.checkLogin);

routing.post('/customers', mobiTel.register);

routing.get('/customers/:phone', mobiTel.customerProfile);

routing.get('/plans', mobiTel.getAllPlans);

routing.get('/plan/:id', mobiTel.getPlan);

routing.get('/plans/:plan_name', mobiTel.getPlandetails); 

routing.get('/customers/:phone/fNumber', mobiTel.friendNumber); // to get friend numbers

routing.get('/customers/:phone/calldetails', mobiTel.callDetails);

routing.post('/customers/:logPhone/friends', mobiTel.addFriend);

routing.all('*', mobiTel.invalid);

module.exports = routing;
