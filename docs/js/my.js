var angular = require('angular');
var app = angular.module("app", []);

app.controller("defCtrl", ["$scope", function ($scope) {
    let index = 0;
    $scope.listOfItems = [];
    $scope.listOfItemComments = [];
    $scope.newItemNameInput = "";

    GetItemsFromLocalStorage();

    $scope.AddNewItem = function () {
        if ($scope.newItemNameInput == "") {
            alert("Type input please");
            return;
        }

        $scope.listOfItems.push({
            id: index++,
            itemName: $scope.newItemNameInput,
            comments: []
        });

        $scope.newItemNameInput = "";
        SaveItemsToLocalStorage();
    };

    $scope.SelectItemCommets = function (item) {
        $scope.listOfItemComments = item.comments;
        $scope.selectedItemId = item.id;
    };

    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey) {
            if (event.keyCode == 13) {
                if($scope.newCommentForItem === "" || $scope.newCommentForItem === undefined || $scope.newCommentForItem === null){
                    alert("Type input please");
                    return;
                }
                
                if ($scope.selectedItemId != undefined) {
                    $scope.listOfItems.find(i => i.id == $scope.selectedItemId).comments.push($scope.newCommentForItem);
                    SaveItemsToLocalStorage();
                    $scope.newCommentForItem = "";
                    $scope.$digest();
                } else {
                    alert("Selected item please!");
                }
            }
        }
    });
    
    $scope.DeleteItem = function (item) {
        if(!confirm("Delete selected item?")){
            return;
        }
        
        var removeIndex = $scope.listOfItems.map(function (item) {
            return item.id;
        }).indexOf(item.id);

        $scope.listOfItems.splice(removeIndex, 1);
        SaveItemsToLocalStorage();
    }

    function GetItemsFromLocalStorage() {
        if (localStorage.listOfItemsLS !== undefined) {
            if ((typeof localStorage.listOfItemsLS) == "string") {
                $scope.listOfItems = JSON.parse(localStorage.listOfItemsLS);
            } else {
                $scope.listOfItems = localStorage.listOfItemsLS;
            }
            index = Number(localStorage.indexLS);
        }
    }

    function SaveItemsToLocalStorage() {
        localStorage.listOfItemsLS = JSON.stringify($scope.listOfItems);
        localStorage.indexLS = index;
    }

}]);
