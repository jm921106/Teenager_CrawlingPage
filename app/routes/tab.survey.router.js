var survey_task = require('../controllers/survey.server.controller.js');
var serveyTask = require('../models/Survey.js');
var fs = require('fs');

exports.route = function (app) {
    app.get('/tab_survey', survey_task.survey);

    app.post('/survey_result', survey_task.result);





    app.get('/SeeMe_Data_Insert', function (req, res) {

        console.log("in SeeMe_Data_Insert");

        fs.readFile('./app/models/seeme.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }

            var seeme_data = JSON.parse(data);

            for (var i = 0; i < seeme_data.length; i++) {

                var survey_result = []; // 문제 part별 평균

                for (var j = 0; j < 7; j++) {             // 초기화
                    survey_result.push(0); // part 별 평균 0으로 초기화
                } // for j

                var result_num =0, count=0, all=0, max = 0; // 계산에 필요한 상수들.
                for (var j = 0; j < seeme_data[i].data.length; j++) { // 초중고 차례대로 준비된 json 데이터를 돌린다.

                    survey_result[result_num] += seeme_data[i].data[j]; // part별 총합에 질문자의 작성답안을 누적.
                    count++; // part별 문제에 대한 count

                    if (j == 6 || j == 12 || j == 14 || j == 17 || j == 20 || j == 22) {
                        //총점에 합산
                        all += survey_result[result_num];

                        //지금까지의 값 합산
                        max = 4 * count; // user가 받을 수 있는 part별 최고점.
                        survey_result[result_num] = parseInt(survey_result[result_num] * 100 / max);

                        count = 0; // part별 문제 count 초기화
                        result_num++; //다음 part로
                    }
                } // for j
                survey_result[result_num] = parseInt(all * 100 / (seeme_data[i].data.length * 4)); // 마지막 배열에 총점 넣어줌

                // 데이터 insert !
                for (var j = 0; j < seeme_data[i].count; j++) {
                    new serveyTask({
                        date: new Date(),
                        grade: seeme_data[i].grade,
                        answer: seeme_data[i].data,
                        result: survey_result
                    }).save();
                } // for j
            } // for i
        });

        console.log("seeme data insert complete!");
        
        res.send("seeme data insert complete!");
    });
};