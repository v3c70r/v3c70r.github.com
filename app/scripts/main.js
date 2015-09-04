// jshint devel:true
"use strict";



var terminal = new Terminal('terminal', {
            welcome: 'Hey, Welcome to my web terminal, type <b>help</b> for details' ,
            prompt: '<span class="glyphicon glyphicon-heart-empty" style="color:gray"></span> ', separator: '&gt;'
}
        , { execute: function(cmd, args) {
            if (cmd.toLowerCase() in commands){
                return (commands[cmd.toLowerCase()](args));
            }
            else
                return false;
    }
});
terminal.setTheme("white");

/** Put terminal commands in this JSON **/
var commands = 
{
    'clear': function (args){terminal.clear();return ''},

    'theme': function (args){
        if (args && args[0]) {
            if (args.length > 1) return 'Too many arguments';
            else if (args[0].match(/^interlaced|modern|white$/)) { terminal.setTheme(args[0]); return ''; }
            else return 'Invalid theme';
        }
        return terminal.getTheme();
    },

    'help':function (args) {
        return Object.keys(this);
    },


    'hello': function(args) {
        return 'Hello, Human!'
    },
    
    'blog': function(args) {
        return 'Hey, click <a href="http://v3c70r.github.io/blog"><b>here</b></a> to access my blog'
    },

    'about': function(args) {
        return 'I\'m a graduate student at Concordia University in Montreal, QC. My research intrests lie in Computer Graphics. I sometimes do skateboard in the summer and love to do snowboard in the long boring winter in Quebec. Hope you enjoy your stay.<br/>'+
            ' <a href="https://github.com/v3c70r" class="btn btn-social-icon btn-github"> <i class="fa fa-github"></i> </a> '+
            ' <a href="https://instagram.com/mcvector" class="btn btn-social-icon btn-instagram"> <i class="fa fa-instagram"></i> </a> '
    },

    'nyan': function(args) {
        if (args && args[0])
            if (args.length == 1) 
            {
                window.scrollTo(0,document.getElementById('terminal'));      //scroll to bottom of terminal
                if (args[0].toLowerCase() == 'fat')         return '<img width=200 src="images/nyanFat.gif"/>';
                if (args[0].toLowerCase() == 'mummy')       return '<img width=200 src="images/nyanMummy.gif"/>';
                if (args[0].toLowerCase() == 'original')    return '<img width=200 src="images/nyanOriginal.gif"/>';
                if (args[0].toLowerCase() == 'zombie')      return '<img width=200 src="images/nyanZombie.gif"/>';
            }
        return "Usage: nayn [fat|mummy|original|zombie]";
    },


    //====Play ground===
    'test': function(args) {
        return 'Nothing here';
    },
    
};
