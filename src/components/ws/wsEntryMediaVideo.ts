import WsEntryMediaBlob from "./wsEntryMediaBlob";

export default class WsEntryMediaVideo extends WsEntryMediaBlob {
    /**
     * 登録コンポーネント名
     */
    public static readonly IID: string = "appWsEntryMediaVideo";

    /**
     * コンポーネントオプション
     */
    protected static setOptions(options: ng.IComponentOptions) {
        super.setOptions(options);
        options.templateUrl = "../components/ws/wsEntryMediaVideo.html";
    }

    /**
     * サムネイルURLを取得する。
     * @return {string}
     */
    public get thumbUrl(): string {
        if (!this.blobData) {
            return null;
        }

        return this.blobData.urlInfo.thumbnailUrl;
    }
}
