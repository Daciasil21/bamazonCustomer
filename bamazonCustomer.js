var mysql = require("mysql");
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
});
connection.connect(function(err) {
    if (err) throw err;
   
});

function shopping() {

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID " + res[i].item_id + " || Product: " + res[i].product_name + " || department: " + res[i].department_name + " || Price: " + res[i].price + " || In Stock: " + res[i].stock_quantity);
        }
   
    inquirer.prompt([{
            name: "item_id",
            type: "input",
            message: "What is the identification number of the item you are interested in?"
        }, {
            name: "quantity",
            type: "input",
            message: "How many would you like?"
        }]).then(function(answer) {
            

            connection.query("SELECT product_name FROM products WHERE ?", { item_id: answer.item_id }, function(err, res) {
                console.log("You Chose " + res[0].product_name + ".");
                console.log("You want" + " " + answer.quantity + " " + res[0].product_name +".");

                connection.query("SELECT stock_quantity FROM products WHERE ?", { item_id: answer.item_id }, function(err, res) {
                    var amount = parseInt(res[0].stock_quantity) - parseInt(answer.quantity);
                    // console.log(parseInt(amount));

                    if (parseInt(amount) >= 0) {
                        connection.query("UPDATE products SET stock_quantity = ? WHERE ?", [parseInt(amount), { item_id: answer.item_id }], function(err, res) {
                            console.log(amount + " left!");
                        })//end of changing stock quantities
                    } else {
                        console.log("Insufficent Amount");
                    }//end of else

                })//end of viewing stock quantities
            })//end of selecting id
        }) //end of then
     }) //end of select from products
}; //end of shopping

shopping();
