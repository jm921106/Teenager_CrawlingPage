var serveyTask = require('../models/Survey.js');

exports.survey = function (req, res) {
    res.render('tab_survey', {
        result: [],
        sum: "",
        avg: ""
    });
};

exports.result = function (req, res) {
    var newGrade = req.body.grade;
    
    /*
    * test
    * */
    console.log(req.body.grade);
    console.log("req.body.index1 :" + req.body.index1)

    var indexs = [
        req.body.index1, req.body.index2, req.body.index3, req.body.index4, req.body.index5,
        req.body.index6, req.body.index7, req.body.index8, req.body.index9, req.body.index10,
        req.body.index11, req.body.index12, req.body.index13, req.body.index14, req.body.index15,
        req.body.index16, req.body.index17, req.body.index18, req.body.index19, req.body.index20,
        req.body.index21, req.body.index22, req.body.index23
    ];

    var survey_answer = [];
    for (var i = 0; i < 23; i++) {
        switch (indexs[i]) {
            case "4" :
                survey_answer.push(4);
                break;
            case "3" :
                survey_answer.push(3);
                break;
            case "2" :
                survey_answer.push(2);
                break;
            case "1" :
                survey_answer.push(1);
                break;
            case "0" :
                survey_answer.push(0);
                break;
            default : //no check = 2점
                survey_answer.push(2);
                break;
        } //switch
    } //for

    var survey_sum = []; // 문제 part별 총합
    var survey_result = []; // 문제 part별 평균
    
    /*
    * 초기화
    * */
    for(var i=0; i<7; i++) {
        survey_sum.push(0); // part 별 총합 0으로 초기화
        survey_result.push(0); // part 별 평균 0으로 초기화
    }
    
    // console.log("test")
    
    var result_num = 0;
    var result;
    var max;
    var count = 0;
    
    for (var i = 0; i < 23; i++) {

        survey_sum[result_num] += survey_answer[i]; // part별 총합에 질문자의 작성답안을 누적.
        count++; // part별 문제에 대한 count

        if(i==6 || i==12 || i==14 || i==17 || i==20 || i==22) {
            //지금까지의 값 합산
            max = 4 * count; // user가 받을 수 있는 part별 최고점. 
            survey_result[result_num] = parseInt(survey_sum[result_num] * 100 / max);
            count = 0; // part별 문제 count 초기화
            
            //다음 level로
            result_num++;
        }
    }

    console.log("test");


    /*
    * 전체 평균 구하기
    * */
    var all = 0;
    for(var i=0; i<survey_sum.length; i++) {
        all += survey_sum[i];
    }
    survey_result[result_num] = parseInt(all * 100 / (survey_answer.length*4));

    console.log(survey_sum);
    console.log(survey_result);
    
    /*
     * user survey insert.
     * */
    new serveyTask({
        date: new Date(),
        grade: req.body.grade,
        answer : survey_answer,
        result : survey_result
    }).save();


    // 기존 데이터 가져와서 평균 내기.
    serveyTask.find(function (err, tasks) {
        // err 처리
        if(err) {
            console.log(err);
        }

        var sumResult = [];
        var gradeResult = [];
        var gradeCount = [];

        /*
        * 초기화 (전체합계)
        * */
        for(var i=0; i<3; i++) {
            gradeResult.push(0);
            gradeCount.push(0);
        }
        for(var i=0; i<survey_result.length; i++) {
            sumResult.push(0);
        }

        // 전체합계 평균내기.
        for (var key in tasks) {
            var task = tasks[key];
            for(var i=0; i<task.result.length; i++) {
                sumResult[i] = sumResult[i] + task.result[i];
            }
            switch (task.grade) {
                case "초등학생" :
                    gradeResult[0] = gradeResult[0] + task.result[6];
                    gradeCount[0]++;
                    break;
                case "중학생" :
                    gradeResult[1] = gradeResult[1] + task.result[6];
                    gradeCount[1]++;
                    break;
                case "고등학생" :
                    gradeResult[2] = gradeResult[2] + task.result[6];
                    gradeCount[2]++;
                    break;
            }
        }

        console.log(gradeResult)
        console.log(gradeCount)
        
        for(var i=0; i<3; i++) {
            gradeResult[i] = gradeResult[i] / gradeCount[i];
            if(gradeResult[i] == NaN) {
                gradeResult[i] = 0;
            }
        }
        
        console.log(gradeResult)

        var avgResult = [];
        for(var i=0; i<23; i++) {
            avgResult[i] = parseInt(sumResult[i] / tasks.length);
        }
        
        console.log("survey post complete!")
        res.render('tab_survey_result', {
            level : ["신체활동","감정,정서","대인관계","자존감","상황적응력","환경적요소","총점"],
            grade : gradeResult, // grade별 평균 
            result: survey_result, // 자신의 평균 결과
            avg : avgResult // 사람들의 평균 결과.
        });
    });
};
