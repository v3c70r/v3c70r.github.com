// jshint devel:true
console.log('\'Allo \'Allo!');
var terminal = new Terminal('terminal', {}, {
    execute: function(cmd, args) {
        switch (cmd) {
            case 'clear':
                terminal.clear();
                return '';

            case 'help':
                return 'Commands: clear, help, theme, ver or version<br>More help available <a class="external" href="http://github.com/SDA/terminal" target="_blank">here</a>';

            case 'theme':
                if (args && args[0]) {
                    if (args.length > 1) return 'Too many arguments';
                    else if (args[0].match(/^interlaced|modern|white$/)) { terminal.setTheme(args[0]); return ''; }
                    else return 'Invalid theme';
                }
                return terminal.getTheme();

            case 'ver':
            case 'version':
                return '1.0.0';
            case 'test':
                return '<div class=jumbotron> Hello!!</div>'

            default:
                // Unknown command.
                return false;
        };
    }
});
terminal.setTheme("white");
