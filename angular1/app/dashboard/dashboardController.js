(function(){

  angular.module('firstApp').controller('DashboardCrtl', [
    '$http',
    DaschboardController
  ])

  function DaschboardController ($http){
  const vm = this
    vm.getSummary = function() {
      const url = 'http://localhost:3003/api/billingSummary'
      $http.get(url).success(function({credit, debt}){
        vm.credit = credit
        vm.debt = debt
        vm.total = credit + debt

      })
    }

    vm.getSummary()

  }

})()
