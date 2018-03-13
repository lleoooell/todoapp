angular.module("todoapp").controller('home.ctrl', ['$scope', '$http', '$rootScope', 'todoFactory', function($scope, $http, $rootScope, todoFactory) {

    $scope.test = false;
    $scope.todoList = [];
    todoFactory.query().$promise.then(function(success) {
        $scope.todoList = success
    }, function(err) {
        console.log(err);
    })
    $scope.addTodo = function(todo) {

        console.log('add' + todo)
        todoFactory.save(todo);
        $scope.todo = {};
        $scope.test = !$scope.test;
    }
    $scope.deleteTodo = function(todo){
    	console.log(todo);
    	todo.$delete().then(function(success) {
            console.log(success);
        }, function(err) {
            console.log(err);
        });
    }
    $scope.checkTodo = function(todo){
    	todo.done = !todo.done;
    	todo.$update().then(function(success){
    		console.log(success);
    	},function(err){
    		console.log(err);
    	})
    }
    socket.on('newTodo',function(newtodo){
    	console.log('new todo add');
    	var t = new todoFactory(newtodo);
    	$scope.todoList.push(t);
    	console.log($scope.todoList);
    	$scope.$apply();
    });
     socket.on('updatedTodo',function(newtodo){
    	console.log('edited todo add');
    	console.log(newtodo);
    	var ind = _.findIndex($scope.todoList, function(o) { return o._id == newtodo._id });
    	if(ind >= 0){
    		$scope.todoList[ind].done = newtodo.done;
    		$scope.$apply();
    	}
    });
    
    socket.on('deleteTodo',function(oldTodo){
    	console.log('new deleteTodo');
    	var ind = _.findIndex($scope.todoList, function(o) { return o._id == oldTodo.id });
    	if(ind >= 0){
    		$scope.todoList.splice(ind,1);
    		$scope.$apply();
    	}
  //   	console.log(oldTodo);
  //   	var index;
  //   	var found = $scope.todoList.find(function(element, index) {
    		
		//   return element._id == oldTodo.id;

		// });
		// console.log(found );
		// if(found && found._id){
		// 	console.log($scope.todoList);
		// 	$scope.todoList.splice(index,1);
		// 	$scope.$apply();
		// }
    });

}]);