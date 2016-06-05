/*
  Copyright (c) 2008 - 2016 MongoDB, Inc. <http://mongodb.com>

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/


var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


function ItemDAO(database) {
    "use strict";
    this.db = database;

    this.getCategories = function (callback) {
        "use strict";

        //http://mongodb.github.io/node-mongodb-native/2.0/reference/crud/

        //=========================================  
        //aggregation framework
        //https://docs.mongodb.org/manual/meta/aggregation-quick-reference/
        //https://docs.mongodb.org/manual/tutorial/aggregation-zip-code-data-set/  
        //$project => Passes along the documents with only the specified fields to the next stage in the pipeline
        //
        //$group => Groups documents by some specified expression and outputs to the next stage a document for each distinct grouping
        //https://docs.mongodb.org/manual/reference/operator/aggregation/group/#pipe._S_group
        //$sum => Calculates and returns the sum of numeric values. Available in the $group and $project stages only.
        //https://docs.mongodb.org/manual/reference/operator/aggregation/sum/#grp._S_sum

        //db.item.aggregate([{ $project: { category: 1 } }, { $group: { _id: "$category", num: { $sum: 1 } } }, {$sort: { _id: 1}}]);

        var categories = [];
        var col = this.db.collection("item");

        col.aggregate([
            { $project: { category: 1 } },
            { $group: { _id: "$category", num: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]).toArray(function (err, docs) {
            var totalNum = 0;
            if (err) console.log("ERROR:    " + JSON.stringify(err));

            docs.forEach(function (doc) {
                var category = {
                    _id: doc._id,
                    num: doc.num
                };
                categories.push(category);
                totalNum++;
            });
            var category_all = {
                _id: "All",
                num: totalNum
            };
            categories.unshift(category_all);
            callback(categories);
        });
    };

    this.getItems = function (category, page, itemsPerPage, callback) {
        "use strict";

        //var pageItem = this.createDummyItem();
        //db.item.aggregate([ { $project: { category: 1 } }, { $group: { _id: "$category", num: { $sum: 1 } } }, { $match: { _id: "Apparel" } } ]);
        //db.item.aggregate([ { $match: { category: "Apparel" } }, { $group: { _id: "$category", num: { $sum: 1 } } }  ]);

        var pageItems = [];
        var col = this.db.collection("item");

        if (category === "All") {
            col.find({}).skip(page * itemsPerPage).limit(itemsPerPage).sort([["_id", 1]])
                .toArray(function (err, docs) {
                    if (err) console.log("Error:    " + err);
                    docs.forEach(function (doc) {
                        pageItems.push(doc);
                    });
                    callback(pageItems);
                });
        } else {
            col.find({ category: category }).skip(page * itemsPerPage).limit(itemsPerPage).sort([["_id", 1]])
                .toArray(function (err, docs) {
                    if (err) console.log("Error:    " + err);
                    docs.forEach(function (doc) {
                        pageItems.push(doc);
                    });
                    callback(pageItems);
                });
        }
    };


    this.getNumItems = function (category, callback) {
        "use strict";

        var col = this.db.collection("item");

        if (category === "All") {
            col.find({}).count(function (err, numItems) {
                callback(numItems);
            });
        } else {
            col.find({ category: category }).count(function (err, numItems) {
                callback(numItems);
            });
        }

    };


    this.searchItems = function (query, page, itemsPerPage, callback) {
        "use strict";

        //db.item.aggregate([{ $match: { $text: { $search: "leaf" } } }, {$sort: { _id: 1 } } ])

        var col = this.db.collection("item");
        col.aggregate([
            { $match: { $text: { $search: query } } },
            { $sort: { _id: 1 } },
            { $skip: page * itemsPerPage },
            { $limit: itemsPerPage }
        ]).toArray(function (err, docs) {
            if (err) console.log("Error: " + err);
            callback(docs);
        });
    };


    this.getNumSearchItems = function (query, callback) {
        "use strict";

        var col = this.db.collection("item");
        col.find({ $text: { $search: query } }).count(function (err, count) {
            callback(count);
        });

    }


    this.getItem = function (itemId, callback) {
        "use strict";

        var col = this.db.collection("item");
        col.findOne({ _id: itemId }, function (err, doc) {
            callback(doc);
        });
    };


    this.getRelatedItems = function (callback) {
        "use strict";

        this.db.collection("item").find({})
            .limit(4)
            .toArray(function (err, relatedItems) {
                assert.equal(null, err);
                callback(relatedItems);
            });
    };


    this.addReview = function (itemId, comment, name, stars, callback) {
        "use strict";

        var col = this.db.collection("item");
        col.updateOne(
            { _id: itemId },
            {
                $push: {
                    reviews: {
                        name: name,
                        comment: comment,
                        stars: stars,
                        date: Date.now()
                    }
                }
            }, function (err, result) {
                if (err) console.log("Error: " + err);
                col.findOne({ _id: itemId }, function (err, doc) {
                    if (err) console.log(err);
                    callback(doc);
                });
            }
        );
    };

}


module.exports.ItemDAO = ItemDAO;
