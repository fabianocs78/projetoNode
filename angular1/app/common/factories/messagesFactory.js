(function(){
  angular.module('firstApp').factory('messages', [
    'toastr',
    MessagesFactory
  ])

  function MessagesFactory (toastr) {

    function addMsg(msgs, title, method){

      if(msgs instanceof Array){
        msgs.forEach(msg => toastr[method](msg, title))
      }else{
        toastr[method](msgs, title)
      }
    }

    function addSuccess(msgs){
      addMsg(msgs, 'Sucesso', 'success')
    }
    function addError(msgs){
      addMsg(msgs, 'Erro', 'error')
    }

    return { addSuccess, addError }
  }


})()
