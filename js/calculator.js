angular.module('calculator_app', []);

angular.module('calculator_app')
  .controller('CalculatorCtrl', function ($scope) {
    $scope.installments = [];
    $scope.savedInstallments = [];

    $scope.data = {
      amount: null,
      installmentsCnt: null,
      rate: null
    };

    $scope.calculate = function () {
      $scope.installments = [];
      calculateRate($scope.data);
    };

    var calculateRate = function (data) {
      var q = 1 + 1 / 1200 * data.rate;
      var q_n = Math.pow(q, data.installmentsCnt);
      var rate = (data.amount * q_n * (q - 1)) / (q_n - 1);

      var new_data = {
        amount: data.amount - (rate - data.amount * (q - 1)),
//        amount: data.amount - 2100,
        installmentsCnt: data.installmentsCnt - 1,
        rate: data.rate
      };

      $scope.installments.push({
        index: $scope.installments.length + 1,
        rate: rate,
        capital: rate - data.amount * (q - 1),
        interest: data.amount * (q - 1),
        remaining: new_data.amount
      });

      if (new_data.amount > 0) {
//      if ($scope.installments.length < 10) {
        calculateRate(new_data);
      }
    }

    $scope.saveInstallment = function (installment) {
      $scope.savedInstallments.push({
        amount: $scope.data.amount,
        installmentsCnt: $scope.data.installmentsCnt,
        interestRate: $scope.data.rate,
        rate: installment.rate,
        capital: installment.capital,
        interest: installment.interest
      });
    }

  });