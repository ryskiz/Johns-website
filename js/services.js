angular.module('commentService', [])

    .factory('Comments', function($http) {
        return {
            get : function() {
                return $http.get('/api/comments');
            },
            create : function(commentData) {
                return $http.post('/api/comments', commentData);
            },
            delete : function(id) {
                return $http.delete('/api/comments/' + id);
            }
        }
    });