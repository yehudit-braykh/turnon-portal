var lot = null;
peruDigitalApp.controller('lotteryController', function lotteryController ($scope) {
      lot = $scope;

      $scope.lottery={textFieldsQuestions:[{name:'Nombre', text:''},{name:'Correo', text:''}],
                      CheckBoxQuestions: [{name:'Segundo sábado de diciembre?', isChecked:false},
                                          {name:'Tercer domingo de julio?', isChecked:false},
                                          {name:'Tercer domingo de octubre?', isChecked:false}]};
  });
