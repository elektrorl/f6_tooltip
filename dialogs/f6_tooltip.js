CKEDITOR.dialog.add('f6_tooltipDialog', function(editor) {
    return {
        title: editor.lang.f6_tooltip.title,
        minWidth: 400,
        minHeight: 200,
        contents: [{
            id: 'tab-basic',
            label: 'Basic Settings',
            elements: [{
                type: 'radio',
                id: 'direction',
                label: editor.lang.f6_tooltip.legendDirection,
                items: [
                    [editor.lang.f6_tooltip.directionTop, 'top'],
                    [editor.lang.f6_tooltip.directionBottom, 'bottom'],
                    [editor.lang.f6_tooltip.directionLeft, 'left'],
                    [editor.lang.f6_tooltip.directionRight, 'right']
                ],
                'default': 'top',
                setup: function(element) {
                    var radioClass = element.getAttribute("class").replace('has-tip ', '');
                    this.setValue(radioClass);
                },
                commit: function(element) {
                    element.setAttribute("class", 'has-tip ' + this.getValue());
                }
            }, {
                type: 'text',
                id: 'title',
                label: editor.lang.f6_tooltip.contentOfTooltip,
                validate: CKEDITOR.dialog.validate.notEmpty(editor.lang.f6_reveal.validation),
                setup: function(element) {
                    this.setValue(element.getAttribute("title"));
                },
                commit: function(element) {
                    element.setAttribute("title", this.getValue());
                }
            }]
        }],
        onShow: function() {
            var selection = editor.getSelection();
            var element = selection.getStartElement();
            if (element) element = element.getAscendant('span', true);
            if (!element || element.getName() != 'span') {
                element = editor.document.createElement('span');
                this.insertMode = true;
            } else {
                this.insertMode = false;
            }
            this.element = element;
            if (!this.insertMode) this.setupContent(element);
        },
        onOk: function() {
            var dialog = this;
            var tooltip = this.element;
            this.commitContent(tooltip);
            if (this.insertMode) {
                var text = editor.getSelection().getSelectedText();
                var tooltip = editor.document.createElement('span');
                tooltip.setAttribute('title', dialog.getValueOf('tab-basic', 'title'));
                tooltip.setAttribute('class', 'has-tip');
                tooltip.setAttribute('data-tooltip', '');
                tooltip.setAttribute('aria-haspopup', 'true');
                tooltip.setAttribute('data-disable-hover', 'false');
                tooltip.setText(text);
                var direction = dialog.getValueOf('tab-basic', 'direction');
                if (direction) tooltip.setAttribute('class', 'has-tip' + ' ' + direction);
                editor.insertElement(tooltip);
            }
        }
    };
});