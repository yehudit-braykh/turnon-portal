(function() {

    var DropdownController = [
        '$q',
        '$scope',
        '$timeout',
        function($q, $scope, $timeout) {

            // $scope.bodyClicked = function(event) {
            //     $scope.menuVisible = false;
            // };
            //
            // $scope.triggerClicked = function() {
            //     $scope.menuVisible = !$scope.menuVisible;
            // };
            //
            // $scope.$watch('ngModel', function() {
            //     $timeout(function() {
            //         if ($scope.ngModel) {
            //             $scope.selected = $scope.ngModel;
            //             $scope.$apply();
            //         }
            //     });
            // });
            //
            // $scope.$watch('options', function() {
            //     if (!$scope.options) {
            //         return;
            //     }
            //     $scope.selected = $scope.placeholderText ? { label: $scope.placeholderText } : $scope.options[0];
            //     $scope.dropdownOptions = $scope.options.map(function(option) {
            //         return {
            //             label: option.label,
            //             // onClickDefault: option.onClick,
            //             onClick: function() {
            //                 $scope.selected = option;
            //                 $scope.menuVisible = false;
            //                 $scope.ngModel = option;
            //                 $timeout(function() {
            //                     $scope.$apply();
            //                 });
            //                 if (option.onClick) {
            //                     option.onClick(option);
            //                 }
            //             }
            //         }
            //     });
            // });
        }
    ];

    angular
        .module('turnon')
        .controller('DropdownController', DropdownController);
}());
