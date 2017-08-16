export default class appDrawingDirective  {
    static register(appModule){
      touchsEvents(appModule);
      draggable(appModule);
    }
}

function touchsEvents(appModule){
  ['touchstart', 'touchmove', 'touchend'].forEach((eventName) =>{
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const directiveName = 'dr' + capitalizeFirstLetter(eventName);
    appModule.directive(directiveName,['$parse', '$rootScope', function($parse, $rootScope) {
      return {
        restrict: 'A',
        compile: function($element, attr) {
          var forceAsyncEvents = {
            'blur': true,
            'focus': true
          };
          var fn = $parse(attr[directiveName], /* interceptorFn */ null, /* expensiveChecks */ true);
          return function ngEventHandler(scope, element) {
            element.on(eventName, function(event) {
              event.preventDefault();
              var callback = function() {
                fn(scope, {$event:event});
              };
              if (forceAsyncEvents[eventName] && $rootScope.$$phase) {
                scope.$evalAsync(callback);
              } else {
                scope.$apply(callback);
              }
            });
          };
        }
      };
    }]);
  });
}

function draggable(appModule){
    appModule.directive('elDraggable', function() {
    return {
      scope: {
        posX: '=',
        posY: '=',
        parentId: '@',
        offStyle: '<'
      },
      controller: ['$scope', '$element', '$document', '$window', function($scope, $element, $document, $window) {
        var startX = 0, startY = 0;
        const parentElement = $document[0].getElementById($scope.parentId);
        setStyle();
        $element.on('mousedown', function(event) {
          event.preventDefault();
          startX = event.screenX - $scope.posX;
          startY = event.screenY - $scope.posY;
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });
        function mousemove(event) {
          let acitvePosX = event.screenX - startX;
          let acitvePosY = event.screenY - startY;
          let rightAcitve = $window.innerWidth - acitvePosX;
          if(acitvePosY < 0 || acitvePosY > $window.innerHeight - $element[0].offsetParent.clientHeight
           || rightAcitve < 0
           || rightAcitve + $element[0].offsetParent.clientWidth> $window.innerWidth){
            return
          }

          $scope.posY = event.screenY - startY;
          $scope.posX = event.screenX - startX;
          setStyle();
        }
        function mouseup() {
          $document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);
        }

        function setStyle(){
          if($scope.offStyle){
            return
          }
          parentElement.style.top = $scope.posY + 'px';
          parentElement.style.right = $window.innerWidth - $scope.posX + 'px';
        }

      }
    ]};
  });
}
