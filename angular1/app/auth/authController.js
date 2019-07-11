(function(){

  angular.module('firstApp').controller('AuthCtrl', [  
    '$location',  
    'messages',  
    'auth',
    AuthController
  ])

  function AuthController($location, messages, auth) {  
    const vm = this

    vm.loginMode = true

    vm.changeMode = () => vm.loginMode = !vm.loginMode

    vm.login = () => {  
      auth.login(vm.user, err => err ? messages.addError(err) :  $location.path('/'))
    }
    vm.signup = () => {  
      auth.signup(vm.user, err => err ? messages.addError(err) : $location.path('/'))
    }

    
    vm.getUser = () => auth.getUser()

    vm.logout = () => {
      auth.logout(() => $location.path('/'))  
    }
  }

})()
