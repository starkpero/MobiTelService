exports.getPlanId = function (data, name) {
  const Curplan = data.filter((plan) => plan.plan_name == name);
  console.log(data);
  console.log(name);
  console.log(Curplan);
  if (Curplan.length === 1) {
    return Curplan[0].plan_id;
  }
  return 'Invalid Plan';
};
