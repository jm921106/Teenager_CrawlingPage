var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var KeywordSchema = new Schema({
    // id: String, // date + content
    date: Date,
    keyword : String,
    count : Number
    // author: {type:String, default: 'Tester'}
});

module.exports = mongoose.model('Keyword', KeywordSchema); // 넘겨준다.



