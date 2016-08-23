var Keyword = require('../models/Keyword.js');

exports.view = function (req, res) {
    console.log("view render!!!")
    res.render('tab_view', {
        tasks: [],
        keyword: []
    });
};

exports.insert = function (req, res) {

    console.log("insert 해보자")

    new Keyword({
        date: new Date(),
        keyword: req.body.keyword,
        count: parseInt(req.body.count)
    }).save();

    console.log("insert 됬다!");

    res.redirect('/tab_view');
};


exports.select = function (req, res) {

    console.log(req.body.type);
    console.log(req.body.year);
    console.log(req.body.month);
    console.log(req.body.keyword);

    Keyword.find( { keyword : req.body.keyword }, function (err, tasks) {
        // 만약 검색 조건이 year 라면
        if (req.body.type == "year") {
            console.log("in type year");

            var sendData = [];
            for(var i=0; i<12; i++) {
                sendData.push({"row" : i+1, "count" : 0});
            }

            for (var i=0; i<tasks.length; i++) {

                task = tasks[i];

                if ( (1900+task.date.getYear()) == parseInt(req.body.year) ) {

                    console.log("if same year");

                    for(var j=0; j<sendData.length; j++) {
                        if ( sendData[j].row == task.date.getMonth()+1 ) {
                            sendData[j].count = sendData[j].count + task.count
                        }
                    }

                } // if

                console.log(JSON.stringify(sendData));
            } // for about task

            res.render('tab_view', {
                tasks : sendData,
                keyword : req.body.keyword
            });
        }

        // 만약 검색 조건이 month 라면
        else if (req.body.type == "month") {
            console.log("in type month");

            // how to get last day in month
            var d = new Date(req.body.year, req.body.month, 0);
            console.log("last day : " + d.getDate()); // last

            // define send data
            var sendData = [];
            for(var i=0; i<d.getDate(); i++){
                sendData.push({"row" : i+1, "count" : 0});
            }

            for (var i=0; i<tasks.length; i++) {

                task = tasks[i];

                if ( (1900+task.date.getYear()) == parseInt(req.body.year) && (1+task.date.getMonth()) == parseInt(req.body.month) ) {

                    console.log("if same year && same month");

                    for(var j=0; j<sendData.length; j++) {
                        if ( sendData[j].row == task.date.getDate() ) {
                            sendData[j].count = sendData[j].count + task.count
                        }
                    }

                } // if

            } // for about task

            res.render('tab_view', {
                tasks : sendData,
                keyword : req.body.keyword
            });

            // type 이 keyword라면
        } else {
            console.log("in type keyword");

            var sendData = [];

            for (var i=0; i<tasks.length; i++) {

                task = tasks[i];
                
                //있으면 있는 곳에 합치고 없으면 새로 만들어라.]
                var duplication = false; // 중복이 없음.
                
                for(var j=0; j<sendData.length; j++) {
                    if ( sendData[j].row == ((task.date.getYear()+1900)+"."+(task.date.getMonth()+1)) ) {
                        sendData[j].count += task.count;
                        duplication = true;
                        console.log("test1" + duplication);
                    }
                }

                if(duplication == false) {
                    sendData.push({"row":(task.date.getYear()+1900)+"."+(task.date.getMonth()+1), "count":task.count});
                    console.log("test2" + duplication);
                }
               
            } // for about tasks

            console.log(JSON.stringify(sendData));

            res.render('tab_view', {
                tasks : sendData,
                keyword : req.body.keyword
            });
        }
    });
};
