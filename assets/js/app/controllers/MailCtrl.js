function MailCtrl() {
  var vm = this;
  vm.showTooltip = false
  vm.list = [
    {
      title: 'Gautier is a wonderful guy',
      sender: 'Laure',
      body: 'I loooove Gautier !'
    },
    {
      title: 'Arthur + Bastien = <3 ?',
      sender: 'Gautier',
      body: 'I was wondering if....'
    }
  ]

  vm.add = function() {
    this.list.push({
      title: 'I love you bro !',
      sender: 'Bastien',
      body: 'I need to tell you something Arthur...'
    })
  }
}

angular.module('sangu').controller('MailCtrl', MailCtrl);
