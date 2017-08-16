import * as uiRouter from "angular-ui-router";
import IdentityService from "../../services/IdentityService";
import ComponentBase from "./../componentBase";

/**
 * 画面テンプレート
 */
export default class View extends ComponentBase {
    /**
     * 登録コンポーネント名
     */
    public static IID: string = "appView";

    /**
     * 通常メニュー表示フラグ
     */
    private basicMenuOpenFlg: boolean = false;

    /**
     * サイドナビ表示フラグ
     */
    private sideNavOpenFlg: boolean;

    /**
     * コンポーネントオプション
     */
    protected static setOptions(options: ng.IComponentOptions) {
        options.templateUrl = "../components/view/view.html";
        options.bindings = {
            sideNavOpenFlg: "=?",
        };
        options.transclude = {
            backTo: "?appViewBackTo",
            header: "appViewHeader",
            nav: "?appViewNav",
            content: "appViewContent",
        };
    }

    public static $inject: string[] = ["$state", "$transclude", "$mdMedia", IdentityService.IID];

    constructor(
        private $state: uiRouter.StateService,
        private $transclude: ng.ITranscludeFunction,
        private $mdMedia: angular.material.IMedia,
        public identityService: IdentityService,
    ) {
        super();
    }

    /**
     * 通常メニューの表示を切り替える。
     */
    public toggleBasicMenu() {
        this.basicMenuOpenFlg = !this.basicMenuOpenFlg;
    }

    /**
     * サイドナビの表示を切り替える。
     */
    public toggleSideNav() {
        this.sideNavOpenFlg = !this.hasOpenSideNav();
    }

    /**
     * ログアウトする。
     */
    public logoff(): void {
        this.identityService.logoff();
        this.$state.go("login");
    }

    /**
     * デバイス表示かを判定する。
     * @return {boolean} デバイス表示の場合はtrue、そうでない場合はfalse
     */
    public isDeviceMode(): boolean {
        return this.$mdMedia("xs");
    }

    /**
     * 戻ることが可能かを判定する。
     * @return {boolean} 戻ることが可能な場合はtrue、そうでない場合はfalse
     */
    public canBackTo(): boolean {
        return this.$transclude.isSlotFilled("backTo");
    }

    /**
     * 通常メニューを表示するかを判定する。
     * @return {boolean}
     */
    public hasOpenBasicMenu(): boolean {
        return !this.isDeviceMode() || this.basicMenuOpenFlg;
    }

    /**
     * ナビを保持しているかを判定する。
     * @return {boolean}
     */
    public containsNav(): boolean {
        return this.$transclude.isSlotFilled("nav");
    }

    /**
     * サイドナビを表示するかを判定する。
     */
    public hasOpenSideNav(): boolean {
        return "sideNavOpenFlg" in this ? this.sideNavOpenFlg : true;
    }
}
