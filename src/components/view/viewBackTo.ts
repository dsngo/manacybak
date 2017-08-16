import ComponentBase from "../componentBase";

/**
 * 画面テンプレートの戻るボタン
 */
export default class ViewBackTo extends ComponentBase {
    /**
     * 登録コンポーネント名
     */
    public static IID: string = "appViewBackTo";

    /**
     * コンポーネントオプション
     */
    protected static setOptions(options: ng.IComponentOptions) {
        options.templateUrl = "../components/view/viewBackTo.html";
        options.bindings = {
            state: "@",
            params: "<?",
        };
    }

    /**
     * 戻り先ステート
     */
    public state: string;

    /**
     * 戻り先パラメータ
     */
    public params: {};

    /**
     * 戻り先の参照を取得する。
     */
    get sref(): string {
        if (this.params == null) {
            return this.state;
        }

        return `${this.state}(${JSON.stringify(this.params)})`;
    }
}
