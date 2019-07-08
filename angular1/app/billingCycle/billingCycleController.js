(function(){
  angular.module('firstApp').controller('BillingCycleCtrl', [
    '$http',
    BillingCycleController
  ])

  function BillingCycleController($http){
    const vm = this

    vm.create = function(){
      const url = 'http://localhost:3003/api/billingCycles'
      $http.post(url, vm.billingCycle).then(function (response) {

        // This function handles success
        vm.billingCycle = {}
        console.log('sucesso')
      }, function (response) {

      // this function handles error
        console.log('falhou')
      })

    }
  }
})()
