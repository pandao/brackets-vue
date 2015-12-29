define(function (require, exports, module) {
	"use strict";

    var documentIndex      = 1,
        FILE_EXT           = ".vue",
        MENU_LABEL         = "New *.vue",
        EXTENSION_NAME     = "Brackets Vue",
        VUE_CREATE_EXECUTE = "vue.create.execute",
        bracketsVersion    = brackets.metadata.version.match(/^(\d+)\.(\d+)\.(\d+)\-(.*)$/),
        templateContent    = require("text!./template.vue"),

        AppInit            = brackets.getModule("utils/AppInit"),
        Menus              = brackets.getModule("command/Menus"),
        Commands           = brackets.getModule("command/Commands"),
        CommandManager     = brackets.getModule("command/CommandManager"),
        DocumentManager    = brackets.getModule("document/DocumentManager"),
        EditorManager      = brackets.getModule("editor/EditorManager"),
        MainViewManager    = brackets.getModule("view/MainViewManager"),
	    LanguageManager    = brackets.getModule("language/LanguageManager");
    
    function setCodeMirrorMode() {
        var firstVer = parseInt(bracketsVersion[1]),
            midVer   = parseInt(bracketsVersion[2]);
        
        return (firstVer >= 1 && midVer >= 5) ? "vue" : "htmlmixed";
    }

    function createVueComponentFile() {
        var document = DocumentManager.createUntitledDocument(documentIndex++, FILE_EXT);
        MainViewManager._edit(MainViewManager.ACTIVE_PANE, document);

        try {
           var activeEditor = EditorManager.getActiveEditor();
               activeEditor.document.replaceRange(templateContent, activeEditor.getCursorPos());
        } catch(e) {
            console.log(EXTENSION_NAME + " createVueComponentFile() : ", e);
        }

        return new $.Deferred().resolve(document).promise();
    }

    var MODE_NAME = setCodeMirrorMode();

	LanguageManager.defineLanguage("vue", {
		name: "Vue component file",
		mode: MODE_NAME,
		fileExtensions: ["vue"]
	});

    AppInit.appReady(function () {

        CommandManager.register(MENU_LABEL, VUE_CREATE_EXECUTE, createVueComponentFile);

        var fileMenu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
            fileMenu.addMenuItem(VUE_CREATE_EXECUTE, undefined, Menus.AFTER, Commands.FILE_NEW_UNTITLED);
    });
});