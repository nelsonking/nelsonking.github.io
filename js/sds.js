$(function(){
    // 渲染试题
    let str = _.template($("#question_template").html(),{variable: 'data'})(questions);
    $("#questions").html(str);

    $("#check").click(function () {
        let score = 0;
        let allDO = true;

        $(".question").each(function(key, value) {
            let val = $(value).find('input:radio:checked').val();
            if (val === undefined) {
                console.log($(val));

                let questionId = $(value).find('input:first').attr('name').split('_')[1];

                alert(`试题${questionId}没有选择，请填写后进行提交`);
                allDO = false;

                return false;
                // TODO test
                // score += 4;
            } else {
                score += parseInt(val);
            }
        });

        if (allDO) {
            score = (score * 1.25).toFixed(2);
            showMessage(score);
        }
    });

    function showMessage(score) {
        $("#score").html(score);

        let suggest = "";

        if (score < 50) {
            suggest = "<span style='color:#2ab303'>您的生活很愉快，没有抑郁的烦恼，请继续保持。</span>";
        } else if (score > 50 && score < 60) {
            suggest = "<span style='color:#a921f5'>您有轻微的抑郁表象，需要引起注意！</span>";
        } else {
            suggest = "<span style='color:#ff0112'>您的情况较为严重! 请及时拜访心理医生，进行治疗。</span>";
        }

        $("#suggest").html(suggest);
        $("#messages").show();
        $("#questions").hide();
    }
});