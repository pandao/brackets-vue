define(function (require, exports, module) {
	"use strict";

    var FILE_EXT           = ".vue",
        MENU_LABEL         = "New *.vue",
        EXTENSION_NAME     = "Brackets Vue",
        VUE_CREATE_EXECUTE = "vue.create.execute",
		VUE_MODE_FILE_PATH = "/thirdparty/CodeMirror/mode/vue/vue.js",

		documentIndex      = 1,
        templateContent    = require("text!./template.vue"),

		Menus              = brackets.getModule("command/Menus"),
        AppInit            = brackets.getModule("utils/AppInit"),
        Commands           = brackets.getModule("command/Commands"),
        FileUtils          = brackets.getModule("file/FileUtils"),
        FileSystem         = brackets.getModule("filesystem/FileSystem"),
        EditorManager      = brackets.getModule("editor/EditorManager"),
        CommandManager     = brackets.getModule("command/CommandManager"),
        DocumentManager    = brackets.getModule("document/DocumentManager"),
        MainViewManager    = brackets.getModule("view/MainViewManager"),
	    LanguageManager    = brackets.getModule("language/LanguageManager");

    function createVueComponentFile() {
        var document = DocumentManager.createUntitledDocument(documentIndex++, FILE_EXT);
        MainViewManager._edit(MainViewManager.ACTIVE_PANE, document);

        try {
           var activeEditor = EditorManager.getActiveEditor();

               activeEditor.document.replaceRange(
				   templateContent, 
				   activeEditor.getCursorPos()
			   );

        } catch(e) {
            console.log(EXTENSION_NAME + " createVueComponentFile() : ", e);
        }

        return new $.Deferred().resolve(document).promise();
    }

	function setLanguage(mode) {
		LanguageManager.defineLanguage("vue", {
			name           : "Vue component file",
			mode           : mode,
			fileExtensions : ["vue"]
		});
	}

	var file = FileSystem.getFileForPath(
        FileUtils.getNativeBracketsDirectoryPath() + VUE_MODE_FILE_PATH
    );

    file.exists(function (err, exists) {
		setLanguage((!err && exists) ? "vue" : "htmlmixed");
    });

    AppInit.appReady(function () {
        CommandManager.register(MENU_LABEL, VUE_CREATE_EXECUTE, createVueComponentFile);

        var fileMenu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);

            fileMenu.addMenuItem(
				VUE_CREATE_EXECUTE,
				undefined,
				Menus.AFTER,
				Commands.FILE_NEW_UNTITLED
			);
    });
});