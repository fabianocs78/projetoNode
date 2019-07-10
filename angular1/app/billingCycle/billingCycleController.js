(function(){
  angular.module('firstApp').controller('BillingCycleCtrl', [
    '$http',
    'messages',
    'tabs',
    BillingCycleController
  ])

  function BillingCycleController($http, msgs, tabs){
    const vm = this
    const url = 'http://localhost:3003/api/billingCycles'


    vm.refresh = function(){
      $http.get(url, vm.billingCycle).then(function (response) {
        // This function handles success
      
        vm.billingCycle = { credits:[{}], debts:[{}] }
        vm.billingCycles = response.data
        vm.calculateValues()
        tabs.show(vm, {tabList: true, tabCreate: true})

      }).catch(function (response) {
      // this function handles error
        msgs.addError(response.data.errors)
      })
    }


    vm.create = function(){
      $http.post(url, vm.billingCycle).then(function (response) {
        // This function handles success
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(function (response) {

      // this function handles error
        msgs.addError(response.data.errors)
      })
    }

    vm.showTabUpdate = function(billingCycle) {
      vm.billingCycle = billingCycle
      vm.calculateValues()
      tabs.show(vm, {tabUpdate:true})
    }

    vm.showTabDelete = function(billingCycle) {
      vm.billingCycle = billingCycle
      vm.calculateValues()
      tabs.show(vm, {tabDelete:true})
    }

    vm.delete = function(){
      const deleteUrl= `${url}/${vm.billingCycle._id}`
      $http.delete(deleteUrl, vm.billingCycle).then(function(response) {
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(function(response){
        msgs.addError(response.data.errors)
      })
    }

    vm.update = function(){
      const deleteUrl= `${url}/${vm.billingCycle._id}`
      $http.put(deleteUrl, vm.billingCycle).then(function(response) {
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(function(response){
        msgs.addError(response.data.errors)
      })
    }

    vm.addCredit = function(index){
      vm.billingCycle.credits.splice(index + 1, 0, {})
    }

    vm.cloneCredit = function(index, { name, value }){
      vm.billingCycle.credits.splice(index +1 , 0, { name, value })
      vm.calculateValues()
    }

    vm.delCredit = function(index){
      if( vm.billingCycle.credits.lenght > 1) {
        vm.billingCycle.credits.splice(index, 1)
        vm.calculateValues()
      }
    }

    vm.addDebt = function(index){
      vm.billingCycle.debts.splice(index + 1, 0, {})
    }

    vm.cloneDebt = function(index, { name, value, status }){
      vm.billingCycle.debts.splice(index +1 , 0, { name, value, status })
      vm.calculateValues()
    }

    vm.delDebt = function(index){
      if( vm.billingCycle.debts.lenght > 1) {
        vm.billingCycle.debts.splice(index, 1)
        vm.calculateValues()
      }
    }

    vm.calculateValues = function() {
      vm.credit = 0
      vm.debt = 0

      if(vm.billingCycle) {
        vm.billingCycle.credits.forEach(function({value}) {
          vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
        })

        vm.billingCycle.debts.forEach(function({value}) {
          vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
        })
      }

      vm.total = vm.credit - vm.debt
    }
    vm.refresh()
  }
})()
