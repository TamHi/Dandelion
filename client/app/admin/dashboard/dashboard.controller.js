'use strict';

angular.module('dandelionApp.admin')
  .controller('AdminDashboardCtrl', function($scope, $http) {

    /**
     * Loading
     */
    $scope.loading = true;
    $http.get('api/statistic/week')
      .then(res => {
        console.log(res);
        $scope.customer = res.data.customer;
        $scope.product = res.data.product;
        $scope.order = res.data.order;
        $scope.total = res.data.total;
      })

    // $scope.time = [
    //   { value: 'week', label: 'Trong tuần' },
    //   { value: 'month', label: 'Trong tháng' },
    //   { value: 'year', label: 'Trong năm' }
    // ];
    // $scope.selectedTime = $scope.time[0].value;
    // $scope.$watch('selectedTime', function(newVal){
    //   console.log(newVal);
    //   $http.get('/api/statistic/' + newVal)
    //     .then(res => {
    //       console.log(res);
    //       // $scope.labels = res.labels;
    //       // $scope.data = res.data;
    //     })
    // })

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
  });