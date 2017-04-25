CKEDITOR.plugins.add('f6_tooltip', {


    lang: 'fr',
    icons: 'f6_tooltip',
    init: function(editor) {
        // Plugin logic goes here...
                editor.addContentsCss(this.path + 'styles/f6_tooltip.css');
        editor.addCommand('f6_tooltip', new CKEDITOR.dialogCommand('f6_tooltipDialog'));
        editor.ui.addButton('f6_tooltip', {
            label: 'Insert Tooltip',
            command: 'f6_tooltip',
            toolbar: 'insert'
        });
        CKEDITOR.dialog.add('f6_tooltipDialog', this.path + 'dialogs/f6_tooltip.js');
    }
});