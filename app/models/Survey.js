var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var surveySchema = new Schema({
    date: Date,
    grade: String,
    answer: Array,
    result: Array
});

module.exports = mongoose.model('Survey', surveySchema); // 넘겨준다.
