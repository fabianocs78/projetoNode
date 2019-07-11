angular.module('firstApp').constant('consts', {
  appName: 'Angular - FirstApp',
  version: '1.0',
  owner: 'Fabiano Souza',
  year: '2019',
  site: 'http://cod3r.com.br',
  apiUrl: 'http://localhost:3003/api',
  oapiUrl: 'http://localhost:3003/oapi',
  userKey: '_primeira_app_user'
}).run(['$rootScope', 'consts', function($rootScope, consts) {
  $rootScope.consts = consts
}])
