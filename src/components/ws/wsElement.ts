import Models from "../../models/models";
import IdentityService from "../../services/IdentityService";
import UserService from "../../services/userService";
import WsService from "../../services/wsService";
import WsElementBase from "./wsElementBase";

export default class WsElement extends WsElementBase {
    /**
     * 登録コンポーネント名
     */
    public static readonly IID: string = "appWsElement";

    /**
     * コンポーネントオプション
     */
    protected static setOptions(options: ng.IComponentOptions) {
        super.setOptions(options);
        options.templateUrl = "../components/ws/wsElement.html";
        options.transclude = true;
    }

    /**
     * InjectするService
     */
    public static $inject = [WsService.IID, UserService.IID, IdentityService.IID, "$scope", "$sce"];

    /**
     * コンストラクタ
     * @param wsService
     */
    public constructor(
        public wsService: WsService,
        public userService: UserService,
        public identityService: IdentityService,
        public $scope: ng.IScope,
        public $sce: ng.ISCEService,
    ) {
        super(wsService, userService, identityService, $scope);
    }

    /**
     * エレメントの表示／非表示制御
     */
    public get isVisible(): boolean {

        // Contentが存在しなければ非表示
        // if (!this.content) return false;

        // アクセスレベルがNoAccessならば非表示
        if (this.accessLevel === Models.AccessPermissionEnum.NoAccess) { return false; }

        return true;

    }

    public get description() {
        return this.$sce.trustAsHtml(this.content.description);
    }

}
