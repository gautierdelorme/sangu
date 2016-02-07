function HelloCtrl() {
  var vm = this;
  vm.name = 'World'
}

angular.module('sangu').controller('HelloCtrl', HelloCtrl);
