import * as uiRouter from "angular-ui-router";
import WsService from "../services/wsService";
import AuthorizedPage from "./authorizedPage";

export default class WsPage extends AuthorizedPage {
    /**
     * 登録コンポーネント名
     */
    public static readonly IID: string = "auth.ws";

    /**
     * コンポーネントオプション
     */
    protected static setOptions(options: ng.IComponentOptions) {
        options.templateUrl = "ws/ws.html";
    }

    /**
     * bindings変数リストにResolvedを追加する
     * @param options
     */
    protected static setInheritOptions(options: ng.IComponentOptions): void {
        super.setInheritOptions(options);
        this.setResolveBindings(options, WsPage.state);
    }

    /**
     * ui-uiRouterにおけるstate
     */
    public static readonly state: uiRouter.Ng1StateDeclaration =
    {
        url: "/ws/:wsId",
        abstract: true,
        resolve: {
            wsService: [WsService.IID, "$transition$", "$q", (wsService: WsService, $transition$: uiRouter.Transition, $q: ng.IQService) => {
                const wsId = $transition$.params().wsId;
                return $q.all([wsService.load(wsId), wsService.loadBlobDataList(wsId)]).then(() => wsService);
            }],
        },
    };

    public wsService: WsService;

}
