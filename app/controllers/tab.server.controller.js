exports.home = function (req, res) {
    // home로딩데이터 설정
    res.render('tab_home', {
        title: "tab_home"
    });
};

exports.info_study = function (req, res) {
    res.render('tab_info_study', {
        title: "tab_info_study"
    });
};

exports.info_members = function (req, res) {
    res.render('tab_info_members', {
        title: "tab_info_study"
    });
};

exports.QOL = function (req, res) {
    res.render('tab_service_QOL', {
        title: "tab_service_QOL"
    });
};

exports.standard = function (req, res) {
    res.render('tab_service_standard', {
        title: "tab_service_standard"
    });
};

exports.graph = function (req, res) {
    res.render('tab_graph', {
        title: "tab_graph"
    });
};
