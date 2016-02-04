app.controller('MailCtrl', MailCtrl);

function MailCtrl() {
  this.showTooltip = false
  this.list = [
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

  this.add = function() {
    this.list.push({
      title: 'I love you bro !',
      sender: 'Bastien',
      body: 'I need to tell you something Arthur...'
    })
  }
}
