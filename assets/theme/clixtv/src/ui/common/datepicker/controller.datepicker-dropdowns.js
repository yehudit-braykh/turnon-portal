(function() {

    var DatepickerDropdowns = [
        '$scope',
        function($scope) {

            function _getMonthOptions() {
                return moment.monthsShort().map(function(month, i) {
                    return {
                        label: month,
                        value: (i + 1),
                        onClick: function() {
                            $scope.selectedMonth = (i + 1);
                            $scope.days = _getDayOptions();
                            _updateModelDate();
                        }
                    }
                });
            }

            function _getDayOptions() {
                var numberOfDays,
                    options = [];
                if (!$scope.selectedMonth) {
                    $scope.selectedMonth = 1;
                }

                // Set the current selected day back to undefined since changing the
                // month will update the possible number of days to choose from
                $scope.selectedDay = undefined;

                // Force set the year to a leap year to give Feb the max possible
                // amount of days to choose from
                numberOfDays = moment('2016-' + $scope.selectedMonth, 'YYYY-M').daysInMonth();
                for (var i = 1, length = numberOfDays; i <= length; i++) {
                    (function(day) {
                        options.push({
                            label: i,
                            value: i,
                            onClick: function () {
                                $scope.selectedDay = day;
                                _updateModelDate();
                            }
                        })
                    }(i));
                }
                return options;
            }

            function _getYearOptions() {
                var options = [],
                    currentYear = new Date().getFullYear(),
                    minimumYear = currentYear - 100;
                for (var i = minimumYear, length = currentYear; i <= length; i++) {
                    (function(year) {
                        options.push({
                            label: i,
                            value: i,
                            onClick: function() {
                                $scope.selectedYear = year;
                                _updateModelDate();
                            }
                        })
                    }(i));
                }
                return options.reverse();
            }

            function _updateModelDate() {
                var month = $scope.selectedMonth,
                    day = $scope.selectedDay,
                    year = $scope.selectedYear;

                if (!month || !day || !year) {
                    $scope.ngModel = undefined;
                    return;
                }

                $scope.ngModel = moment(month + '-' + day + '-' + year, 'M-D-YYYY').toDate();
            }

            $scope.months = _getMonthOptions();
            $scope.days = _getDayOptions();
            $scope.years = _getYearOptions();

        }
    ];

    angular
        .module('clixtv')
        .controller('DatepickerDropdowns', DatepickerDropdowns);
}());