import ComponentBase from "../componentBase";

/**
 * 画面テンプレートのヘッダ
 */
export default class ViewHeader extends ComponentBase {
    /**
     * 登録コンポーネント名
     */
    public static IID: string = "appViewHeader";

    /**
     * コンポーネントオプション
     */
    protected static setOptions(options: ng.IComponentOptions) {
        options.templateUrl = "../components/view/viewHeader.html";
        options.bindings = {
            title: "@?",
        };
        options.transclude = {
            title: "?appViewHeaderTitle",
            toolbar: "?appViewHeaderToolbar",
        };
    }
}
