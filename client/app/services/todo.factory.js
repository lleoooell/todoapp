angular.module('todoapp').factory('todoFactory', ['$resource',
	function($resource) {
		return $resource('/api/todos/:todoId', { todoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
