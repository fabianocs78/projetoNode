(function(){

  angular.module('firstApp').controller('DashboardCrtl', [
    '$http',
    'messages',
    DaschboardController
  ])

  function DaschboardController ($http, msgs){
  const vm = this
    vm.getSummary = function() {
      const url = 'http://localhost:3003/api/billingSummary'
      $http.get(url).then(function({credit, debt}) {

        // This function handles success
        vm.credit = credit
        vm.debt = debt
        vm.total = credit + debt

      }).catch(function (response) {
      // this function handles error
        msgs.addError('errou')

      })
    }

    vm.getSummary()

  }

})()
