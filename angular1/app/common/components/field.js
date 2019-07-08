(function(){

  angular.module('firstApp').component('field', {
    bindings:{
      grid: '@',
      id: '@',
      label: '@',
      placeholder: '@',
      type: '@',
      model: '=',
    },
    controller: [
      'gridSystem',
      function(gridSystem) {
        this.$onInit = () => {
          this.gridClasses = gridSystem.toCssClasses(this.grid)
        }
      }
    ],
    template: `
    <div class="box-body">
      <div class="{{ $ctrl.gridClasses }}">
        <div class="form-group">
          <label for="{{ $ctrl.id }}">{{ $ctrl.label }}</label>
          <input id="{{ $ctrl.id }}" class="form-control" placeholder="{{ $ctrl.placeholder }}"
          type="{{ $ctrl.type }}"
          ng-model="$ctrl.model"/>
        </div>
      </div>
    </div>
    `
  })

})()
