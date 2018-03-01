/**
 * Created by AchmadYusri on 29/06/2016.
 */
var SummerNoteButton_equestion = function (context) {
    var ui = $.summernote.ui;

    // create button
    var button = ui.button({
        id: 'mathjax-render',
        className: 'mathjax-activated',
        contents: '&sum;',
        tooltip: 'Equestion Activated',
        data: {
            id: 'mathjax-render'
        },
        click: function () {
            /** Get data ID SummerNote : */
            var $getData_id = $(this).parents('.note-editor').parent();
            var $data_id = $getData_id.attr('id');
            if ($data_id == undefined) {
                $getData_id = $(this).parents('.note-editor').parent().parent();
                $data_id = $getData_id.attr('id');
            } else {
                $getData_id = $(this).parents('.note-editor').parent();
                $data_id = $getData_id.attr('id');
            }
            var $loc_data_summernote = '#'+$data_id + ' .panel-body';
            var $loc_script_tag = '#'+$data_id + ' script';
            var $loc_mahtjax = '#'+$data_id + ' .mjx-chtml';
            var $loc_mathjaxContent = '#'+$data_id + ' .mjx-chtml .MJXc-display';
            var $loc_mathjaxCHTML = '#'+$data_id + ' .mjx-chtml .MathJax_CHTML';
            var $loc_mathjaxPreview = '#'+$data_id + ' .MathJax_Preview';

            /** Debug : */
            console.log($data_id);

            /** Check Mathjax activated :
             * $('#place-form-question-edit .mjx-chtml .MathJax_CHTML').attr('data-mathml');
             * */
            if ($($loc_mathjaxContent)) {
                var $get_data_mathml = $($loc_mathjaxCHTML).attr('data-mathml');
                var $get_id_mathjax = $($loc_mathjaxCHTML).attr('id');
                var $get_jsscript_id_mathjax = $($loc_script_tag).attr('id');
                var $loc_mathjax_item = $($loc_mahtjax);
                $($loc_mathjaxPreview).remove();
                $($loc_mathjaxCHTML).remove();
                $($loc_mathjaxContent).remove();
                $('#'+$get_jsscript_id_mathjax).remove();
                $($loc_data_summernote).append($get_data_mathml).each(function() {
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub, $data_id]);
                });
                //context.invoke('editor.insertText', $get_data_mathml);
            } else {
                MathJax.Hub.Queue(["Typeset",MathJax.Hub, $data_id]);
            }
        }
    });

    return button.render();   // return button as jquery object
};
