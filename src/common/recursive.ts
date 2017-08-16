/**
 * 再帰ディレクティブ
 */
export default function register(app: ng.IModule) {
    class Recursive implements ng.IController {
        public static $inject: string[] = ["$scope", "$attrs", "$transclude", "$parse"];

        /**
         * 再帰するデータ名
         */
        public name: string;

        /**
         * コンストラクタ
         * @param $scope
         * @param $attrs
         * @param $transclude
         * @param $parse
         */
        constructor(private $scope: ng.IScope, private $attrs: IRecurciveAttributes, public $transclude: ng.ITranscludeFunction, private $parse: ng.IParseService) {
        }

        public $onInit() {
            this.name = this.$attrs.recurse;
            if (this.$attrs.recurseVar) {
                this.name = this.$attrs.recurseVar;
                this.$scope.$watch(this.$attrs.recurse, (v) => this.$parse(this.$attrs.recurseVar).assign(this.$scope, v));
            }
        }
    }

    /**
     * 再帰ディレクティブの属性
     */
    interface IRecurciveAttributes extends ng.IAttributes {
        recurse: string;
        recurseVar: string;
    }

    /**
     * 再帰ディレクティブノードの属性
     */
    interface IRecursiveNodeAttributes extends ng.IAttributes {
        recurseNode: string;
    }

    /**
     * @ngdoc directive
     * @name recurse
     */
    app.directive("recurse", () => {
        return {
            transclude: true,
            restrict: "A",
            template: `<ng-transclude></ng-transclude>`,
            controller: Recursive,
        };
    });

    /**
     * @ngdoc directive
     * @name recurseNode
     */
    app.directive("recurseNode", ["$parse", ($parse: ng.IParseService) => {
        const link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: IRecursiveNodeAttributes, recurcice: Recursive) => {
            if (!attrs.recurseNode) {
                // tslint:disable-next-line:no-console
                console.error("Cannot specific Cannot specific recurseNode..");
                return;
            }

            scope.$watch(attrs.recurseNode, (v) => $parse(recurcice.name).assign(scope, v));
            recurcice.$transclude(scope, (e) => element.append(e));
        };

        return {
            restrict: "A",
            require: "^recurse",
            link,
        };
    }]);
}
