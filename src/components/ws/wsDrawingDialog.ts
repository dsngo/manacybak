import Models from "../../models/models";
import WsEditorService from "../../services/wsEditorService";
import AppDialog from "../appDialog";

export default class WsDrawingDialog extends AppDialog {
    // /**
    //  * 登録コンポーネント名
    //  */
    // public static readonly IID: string = 'appWsSelectOrigin';

    // /**
    //  * コンポーネントオプション
    //  */
    // protected static setOptions(options: ng.IComponentOptions) {
    //     options.templateUrl = '../components/wsEditor/wsSelectOrigins.html';
    // }

    /**
     * ダイアログ表示設定を返す
     * @param
     */
    public static getDialogOptions($event): ng.material.IDialogOptions {
        const options = super.getDialogOptions($event);
        options.templateUrl = "./wsDrawingDialog.html";
        options.fullscreen = true;
        return options;
    }

    /**
     * InjectするService
     */
    public static $inject = ["$mdDialog", "$scope"];

    /**
     * コンストラクタ
     * @param wsService
     */
    public constructor(
        public $mdDialog: ng.material.IDialogService,
        public $scope: ng.IScope,
    ) {
        super($mdDialog);
    }

    public cancel(): void {

        const thisComponent = this;

        // parentElementパラメーターをダイアログに渡す
        // const dialogOption = WsDrawingDialog.getDialogOptions($event);

        this.$mdDialog.cancel();
    }
}
