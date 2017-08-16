import WsService from "../../services/wsService";
import ComponentBase from "../componentBase";

export default class WsSaveBar extends ComponentBase {
    /**
     * 登録コンポーネント名
     */
    public static readonly IID: string = "appWsSaveBar";

    /**
     * コンポーネントオプション
     */
    protected static setOptions(options: ng.IComponentOptions) {
        super.setOptions(options);
        options.templateUrl = "../components/ws/wsSaveBar.html";
    }

    /**
     * InjectするService
     */
    public static $inject = [WsService.IID, "$scope"];

    /**
     * コンストラクタ
     * @param wsService
     */
    public constructor(
        public wsService: WsService,
        public $scope: ng.IScope,
    ) {
        super();
    }

    public save() {
        this.wsService.save(this.$scope);
    }

}
