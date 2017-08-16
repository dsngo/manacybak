import Recurse from "./recurse/recurse";
import RecurseNode from "./recurse/recurseNode";

export default function registerDirectives(app: ng.IModule) {
    // 再帰ディレクティブ
    Recurse.register(app);
    RecurseNode.register(app);
}
