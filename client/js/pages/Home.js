var m = require('mithril');

var Navbar = require('../components/Navbar.js');
var Auth = require('../models/Auth.js');

var Home = module.exports = {
  controller: function(){
    var ctrl = this;
    ctrl.msg = '';
    
    if (!Auth.token){
      ctrl.msg = ([
        'Ok! Things seem cool, so go check out the files in ',
        m('code', 'public/'),
        " to see how it's all put together. Your're going to have to ",
        m('a[href="/register"]', {config: m.route}, 'make'),
        ' a ',
        m('code', 'User'),
        " to be able to ",
         m("a[href='/login']", {config: m.route}, 'login'),
        '.'
      ]);
    }else{
      ctrl.msg = ([
        'You are logged in, so go check out ',
        m('a[href="/profile"]', {config: m.route}, 'profile'),
        '.'
      ]);
    }

  },
  
  view: function(ctrl){
    return [ m.component(Navbar), m('.container', [
      m('h1', 'home'),
      m('p', ctrl.msg),
      m('p', 'You can edit this file in ', [
        m('code', 'public/js/pages/Home.js'),
        '.'
      ]),
      m('p', 'Lorem ipsum Cupidatat sed labore reprehenderit aliqua id culpa irure in incididunt voluptate sed quis irure amet proident in adipisicing ea enim dolore Duis aliqua dolor dolore pariatur tempor aliquip velit officia laborum ullamco adipisicing consectetur Ut incididunt in labore do aute eu ea consectetur elit quis magna non laborum velit reprehenderit in cillum cillum laborum deserunt velit officia dolor nulla consectetur ex consectetur elit ad consectetur dolor cillum laboris enim quis voluptate id eu voluptate esse deserunt dolor Duis velit aliqua ex non eiusmod culpa proident incididunt ea irure in quis sint quis Excepteur velit et sunt nisi aute sint laborum Ut sit veniam cupidatat elit consequat nostrud aliqua quis in dolor ex ut adipisicing deserunt irure dolore minim enim ullamco consequat commodo sunt elit est cupidatat sint laboris mollit nulla eu est Excepteur pariatur velit magna eiusmod laborum tempor tempor id eiusmod sit proident quis cillum anim eiusmod occaecat sed adipisicing dolore est anim cillum voluptate.'),
      m('p', 'Lorem ipsum Cupidatat sed labore reprehenderit aliqua id culpa irure in incididunt voluptate sed quis irure amet proident in adipisicing ea enim dolore Duis aliqua dolor dolore pariatur tempor aliquip velit officia laborum ullamco adipisicing consectetur Ut incididunt in labore do aute eu ea consectetur elit quis magna non laborum velit reprehenderit in cillum cillum laborum deserunt velit officia dolor nulla consectetur ex consectetur elit ad consectetur dolor cillum laboris enim quis voluptate id eu voluptate esse deserunt dolor Duis velit aliqua ex non eiusmod culpa proident incididunt ea irure in quis sint quis Excepteur velit et sunt nisi aute sint laborum Ut sit veniam cupidatat elit consequat nostrud aliqua quis in dolor ex ut adipisicing deserunt irure dolore minim enim ullamco consequat commodo sunt elit est cupidatat sint laboris mollit nulla eu est Excepteur pariatur velit magna eiusmod laborum tempor tempor id eiusmod sit proident quis cillum anim eiusmod occaecat sed adipisicing dolore est anim cillum voluptate.'),
      m('p', 'Lorem ipsum Cupidatat sed labore reprehenderit aliqua id culpa irure in incididunt voluptate sed quis irure amet proident in adipisicing ea enim dolore Duis aliqua dolor dolore pariatur tempor aliquip velit officia laborum ullamco adipisicing consectetur Ut incididunt in labore do aute eu ea consectetur elit quis magna non laborum velit reprehenderit in cillum cillum laborum deserunt velit officia dolor nulla consectetur ex consectetur elit ad consectetur dolor cillum laboris enim quis voluptate id eu voluptate esse deserunt dolor Duis velit aliqua ex non eiusmod culpa proident incididunt ea irure in quis sint quis Excepteur velit et sunt nisi aute sint laborum Ut sit veniam cupidatat elit consequat nostrud aliqua quis in dolor ex ut adipisicing deserunt irure dolore minim enim ullamco consequat commodo sunt elit est cupidatat sint laboris mollit nulla eu est Excepteur pariatur velit magna eiusmod laborum tempor tempor id eiusmod sit proident quis cillum anim eiusmod occaecat sed adipisicing dolore est anim cillum voluptate.'),
      m('p', 'Lorem ipsum Cupidatat sed labore reprehenderit aliqua id culpa irure in incididunt voluptate sed quis irure amet proident in adipisicing ea enim dolore Duis aliqua dolor dolore pariatur tempor aliquip velit officia laborum ullamco adipisicing consectetur Ut incididunt in labore do aute eu ea consectetur elit quis magna non laborum velit reprehenderit in cillum cillum laborum deserunt velit officia dolor nulla consectetur ex consectetur elit ad consectetur dolor cillum laboris enim quis voluptate id eu voluptate esse deserunt dolor Duis velit aliqua ex non eiusmod culpa proident incididunt ea irure in quis sint quis Excepteur velit et sunt nisi aute sint laborum Ut sit veniam cupidatat elit consequat nostrud aliqua quis in dolor ex ut adipisicing deserunt irure dolore minim enim ullamco consequat commodo sunt elit est cupidatat sint laboris mollit nulla eu est Excepteur pariatur velit magna eiusmod laborum tempor tempor id eiusmod sit proident quis cillum anim eiusmod occaecat sed adipisicing dolore est anim cillum voluptate.')
    ])];
  }
};