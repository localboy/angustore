/**
 * Created by localboy on 1/22/16.
 */

(function(){
    var app = angular.module('store', ['ngRoute']);
    app.controller('ProductController',['$scope','$http',function($scope,$http){
        $http.get('products.json').success(function(data){
            $scope.products=data
        })
        .error(function(){
            alert('error')
        });
    }]);
    app.controller('detailsController', ["$scope", "$http", "$routeParams", "$filter",
        function($scope, $http, $routeParams, $filter){
            $http.get('products.json').success(function(data){
                $scope.products=$filter("filterById")(data, $routeParams.id)
            })
            .error(function(){
                alert('error')
            });
        }
    ]);
    /*app.controller('StoreController',function($scope){
        //this.product = gem;
        $scope.products = gems;
        $scope.submitForm = function(){
            $scope.products.reviews.push({stars:this.review.stars,body:this.review.body, author:this.review.author});
        };
    });*/
    app.controller('PanelController', function ($scope) {
        $scope.tab=1;
        $scope.selectTab = function(setTab){
            $scope.tab = setTab;
        };
        $scope.isSelected = function(checkTab){
            return $scope.tab === checkTab;
        };
    });
    app.controller('ReviewController', function($scope){
        $scope.reviews = [
            {
                stars:4,
                body:'I love the product',
                author:'Karim'
            },
            {
                stars:4,
                body:'I love the product',
                author:'Karim'
            }
        ];
        $scope.addReview = function(){
            $scope.reviews.push({
                stars: this.review.stars,
                body: this.review.body,
                author: this.review.author
            });
            console.log(this.review);
        };
        $scope.review="";


    });

    //Route for my app
    app.config(function($routeProvider){
        $routeProvider
        .when("/contact",{
            templateUrl:"contact.html"
        })
        .when("/product",{
            templateUrl:"product.html"
        })
        .when("/detail/:id",{
            templateUrl:"detail.html",
            controller:"detailsController",
            controllerAs:"detCon"
        })
        .when("/",{
            templateUrl:"home.html"
        })
    });
    app.filter("filterById",function(){
        return function(objArr, id){
            var i= 0, len = objArr.length;
            for (; i<len; i++){
                if(+objArr[i].id==+id){
                    return objArr[i];
                }
            }
            return null;
        }
    });
    /*var gems = [
        {
            name:'Dodecahedron',
            price: 2.34,
            description: 'This is description',
            canPurchase: true,
            soldOut: false,
            images:{
                full:'img/full.png',
                thumb:'img/thumb.pmg'
            },
            reviews:[
                {
                    stars:4,
                    body:'I love the product',
                    author:'Karim'
                },
                {
                    stars:4,
                    body:'I love the product',
                    author:'Karim'
                }
            ]
        },
        {
            name:'Pentagonal',
            price: 5.45,
            description: 'This is description',
            canPurchase: true,
            soldOut: false,
            images:{
                full:'img/full.png',
                thumb:'img/thumb.pmg'
            },
            reviews:[
                {
                    stars:4,
                    body:'I love the product',
                    author:'Karim'
                }
            ]
        }
    ]*/
})();
