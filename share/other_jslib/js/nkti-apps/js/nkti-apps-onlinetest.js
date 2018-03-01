/**
 * Created by AchmadYusri on 12/06/2016.
 */

/** Begin Online Test Plugins :
 * ----------------------------------------------------------- */
jQuery.extend({

    /** For Initialize SummerNote :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk menampilkan SummerNote.
     *
     * @param $data_id  {string}    Berisi ID Tag untuk SummerNote.
     */
    SummerNote_initialize_single: function ($data_id) {

        /** Define variable will be used in this function : */
        var $result;

        /** Check IF $data_id is exists : */
        if ($data_id != undefined || $data_id != null || $data_id != '' || $data_id != "") {

            /** Initialize SummerNote : */
            $('#'+$data_id).summernote({
                height: 150,
                toolbar: [
                    // [groupName, [list of button]]
                    ['style', ['style']],
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['font', ['strikethrough', 'superscript', 'subscript']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['height', ['height']],
                    ['table', ['table']],
                    ['link', ['link']],
                    ['codeview', ['codeview']],
                    ['myButton', ['Equestion']]
                ],

                buttons: {
                    Equestion: SummerNoteButton_equestion
                }
            });

        } /** End of Check IF $data_id is exists. */

        /** Check iF $data_id is not exists : */
        if ($data_id == undefined || $data_id == null || $data_id == '' || $data_id == "") {
            console.error('$data_id is undefined');
            $result = 0;
        } /** End of Check iF $data_id is not exists. */
    },
    /** End of For Initialize SummerNote.
     * ===================================================================================================== */

    /** For Initialize Single SummerNote with Contains :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk menampilkan SummerNote
     * with Contains.
     *
     * @param   $data_id    {string}    Berisi ID Tag SummerNote.
     * @param   $contains   {string}    Berisi Contains of SummerNote.
     */
    SummerNote_initialize_single_contains: function ($data_id, $contains) {

        /** Define variable will be used in this function : */
        var $result;

        /** Check IF $data_id is exists : */
        if ($data_id != undefined || $data_id != null || $data_id != '' || $data_id != "") {

            /** Define variable for ID SummerNote : */
            var $id_summernote = '#'+$data_id;

            /** Initialize SummerNote : */
            $($id_summernote).summernote({
                height: 150,
                toolbar: [
                    // [groupName, [list of button]]
                    ['style', ['style']],
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['font', ['strikethrough', 'superscript', 'subscript']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['height', ['height']],
                    ['table', ['table']],
                    ['link', ['link']],
                    ['codeview', ['codeview']],
                    ['myButton', ['Equestion']]
                ],

                buttons: {
                    Equestion: SummerNoteButton_equestion
                }

            });

            /** Insert Data SummerNote : */
            $($id_summernote).summernote('code', $contains);

        } /** End of Check IF $data_id is exists. */

        /** Check iF $data_id is not exists : */
        if ($data_id == undefined || $data_id == null || $data_id == '' || $data_id == "") {
            console.error('$data_id is undefined');
            $result = 0;
        } /** End of Check iF $data_id is not exists. */

    },
    /** End of For Initialize Single SummerNote with Contains.
     * ===================================================================================================== */

     /** For Create Form Choice Answer :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Form Choice Answer.
     */
    Choice_answer: function ($count, $prefix_title, $prefix_id, $size_judul, $wrap_container, $size_container,
                             $place, $contains, $size_summernote, $id_img_action, $id_progress_upload) {

        /** Define variable will be used in this function : */
        var $result;

        /** Check IF $count is exists : */
        if ($count != undefined || $count != null || $count != '' || $count != "") {

            /** Check IF $prefix_title is Exists : */
            if ($prefix_title != undefined || $prefix_title != null || $prefix_title != '' || $prefix_title != "") {

                /** Check IF $prefix_id is Exists : */
                if ($prefix_id != undefined || $prefix_id != null || $prefix_id != '' || $prefix_id != "") {

                    /** CHeck IF $size_judul is exists : */
                    if ($size_judul != undefined || $size_judul != null || $size_judul != '' || $size_judul != "") {

                        /** Check IF $size_container is exists : */
                        if ($size_container != undefined || $size_container != null || $size_container != '' || $size_container != "") {

                            /** Create SummerNote : */
                            var $create_summerNote = $.SummerNote_loop($count, $prefix_id, $wrap_container,
                                $size_container, $prefix_title, $size_judul, $id_img_action, $id_progress_upload);

                            /** Check IF $place is Exists : */
                            if ($place != undefined || $place != null || $place != '' || $place != "") {

                                /** Get result create : */
                                var $data_summberNote = $create_summerNote['data'];
                                var $data_id = $create_summerNote['id'];

                                /** Place SummerNote into Place : */
                                $($place).html($data_summberNote).each(function() {

                                    /** Check IF $contains is Exist : */
                                    if ($contains != '' || $contains != "") {
                                        //console.log('SummerNote with Contains');

                                        /** Initialize all SummerNote : */
                                        $.SummerNote_initialize_multi_contains($data_id, $size_summernote, $contains);

                                    } /** End of Check IF $contains is Exist. */

                                    /** Check IF $contains is Not Exists : */
                                    else if ($contains == '' || $contains == "") {
                                        //console.log('SummerNote without Contains');

                                        /** Initialize all SummerNote : */
                                        $.SummerNote_initialize_multi($data_id, $size_summernote);

                                    } /** End of Check IF $contains is Not Exists. */
                                });

                                /** Place result : */
                                $result = $create_summerNote;

                            } /** End of Check IF $place is Exists. */

                            /** Check IF $place is not exists : */
                            if ($place == undefined || $place == null || $place == '' || $place == "") {
                                $result = $create_summerNote;
                            } /** End of Check IF $place is not exists. */

                        } /** End of Check IF $size_container is exists. */

                        /** Check IF $size_container is not exists : */
                        if ($size_container == undefined || $size_container == null || $size_container == '' || $size_container == "") {
                            console.error('Size Container is undefined');
                            $result = 0;
                        } /** End of Check IF $size_container is not exists. */

                    } /** End of CHeck IF $size_judul is exists. */

                    /** CHeck IF $size_judul is not exists : */
                    if ($size_judul == undefined || $size_judul == null || $size_judul == '' || $size_judul == "") {
                        console.error('Size Judul is undefined');
                        $result = 0;
                    } /** End of CHeck IF $size_judul is not exists. */

                } /** End of Check IF $prefix_id is Exists. */

                /** Check IF $prefix_id is not exists : */
                if ($prefix_id == undefined || $prefix_id == null || $prefix_id == '' || $prefix_id == "") {
                    console.error('Prefix ID is undefined');
                    $result = 0;
                } /** End of Check IF $prefix_id is not exists. */

            } /** End of Check IF $prefix_title is Exists. */

            /** Check IF $prefix_title is Exists : */
            if ($prefix_title == undefined || $prefix_title == null || $prefix_title == '' || $prefix_title == "") {
                console.error('Prefix Title is undefined');
                $result = 0;
            } /** End of Check IF $prefix_title is Exists. */
        } /** End of Check IF $count is exists. */

        /** Check IF $count is not exists : */
        if ($count == undefined || $count == null || $count == '' || $count == "") {
            console.error('$count is undefined');
            $result = 0;
        } /** End of Check IF $count is not exists. */

        /** Return Result : */
        return $result;
    },
    /** End of For Create Form Choice Answer.
     * ===================================================================================================== */

    /** For Initialize SummerNote :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk Menampilkan SummerNote.
     *
     * @param $data_id  {object}    Berisi object Data ID Tag untuk SummerNote.
     * @param $size     {object}    Berisi
     */
    SummerNote_initialize_multi: function ($data_id, $size) {

        /** Define variable will be used in this function : */
        var $result;
        //console.log('SummerNote - Without Constains');
        //console.log($data_id);
        //console.log('Size SummerNote ' + $size);

        /** Check IF $data_id is exists : */
        if ($data_id != undefined || $data_id != null || $data_id != '' || $data_id != "") {

            /** Prepare while loop to Initialize SummerNote : */
            var $i = 0;
            var $until_loop = $data_id.length,
                $height_size = parseInt($size),
                $id_summerNote;

            /** While loop to Initialize SummerNote : */
            while ($i < $until_loop)
            {
                /** Define variable Prepare Initialize SummerNote : */
                $id_summerNote = '#'+$data_id[$i];
                //console.log('Initialize SummerNote : ' + $data_id[$i]);

                /** Initialize SummerNote : */
                $('#'+$data_id[$i]).summernote({
                    height: $height_size,
                    toolbar: [
                        // [groupName, [list of button]]
                        ['style', ['style']],
                        ['style', ['bold', 'italic', 'underline', 'clear']],
                        ['font', ['strikethrough', 'superscript', 'subscript']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['height', ['height']],
                        ['table', ['table']],
                        ['link', ['link']],
                        ['codeview', ['codeview']],
                        ['myButton', ['Equestion']]
                    ],

                    buttons: {
                        Equestion: SummerNoteButton_equestion
                    }
                });

                /** Auto Increment : */
                $i++;
            } /** End of while loop to Initialize SummerNote. */

        } /** End of Check IF $data_id is exists. */

        /** Check iF $data_id is not exists : */
        if ($data_id == undefined || $data_id == null || $data_id == '' || $data_id == "") {
            console.error('$data_id is undefined');
            $result = 0;
        } /** End of Check iF $data_id is not exists. */
    },
    /** End of For Initialize SummerNote.
     * ===================================================================================================== */

    /** For Initialize Multi SummerNote with Contains  :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk menampilkan SummerNote
     * for Contains.
     *
     * @param   $data_id    {object}    Berisi Data daftar ID SummerNote.
     * @param   $size       {object}    Berisi Ukuran Grid Bootstrap SummerNote,
     *                                  Ex: 6 - 12
     * @param   $contains   {object}    Berisi Data Contains.
     */
    SummerNote_initialize_multi_contains: function ($data_id, $size, $contains) {

        /** Define variable will be used in this function : */
        var $result;
        //console.log('SummerNote - Without Constains');
        //console.log($data_id);
        //console.log('Size SummerNote ' + $size);
        //console.log($contains);

        /** Check IF $data_id is exists : */
        if ($data_id != undefined || $data_id != null || $data_id != '' || $data_id != "") {

            /** Check IF $contains is exists : */
            if ($contains != undefined || $contains != null || $contains != '' || $contains != "") {

                /** Prepare while loop to Initialize SummerNote : */
                var $i = 0;
                var $until_loop = $data_id.length,
                    $indexOfcontains,
                    $id_summerNote;

                /** While loop to Initialize SummerNote : */
                while ($i < $until_loop)
                {
                    /** Define variable Prepare Initialize SummerNote : */
                    $id_summerNote = '#'+$data_id[$i];

                    /** Define variable for Data SummerNote : */
                    $indexOfcontains = 'answer-'+($i + 1);

                    /** Initialize SummerNote : */
                    $('#'+$data_id[$i]).summernote({
                        height: $size,
                        toolbar: [
                            // [groupName, [list of button]]
                            ['style', ['style']],
                            ['style', ['bold', 'italic', 'underline', 'clear']],
                            ['font', ['strikethrough', 'superscript', 'subscript']],
                            ['fontsize', ['fontsize']],
                            ['color', ['color']],
                            ['para', ['ul', 'ol', 'paragraph']],
                            //['height', ['height']],
                            ['table', ['table']],
                            ['link', ['link']],
                            ['codeview', ['codeview']],
                            ['myButton', ['Equestion']]
                        ],

                        buttons: {
                            Equestion: SummerNoteButton_equestion
                        }
                    });

                    /** Check IF Key Property Is Exists : */
                    if ($contains.hasOwnProperty($indexOfcontains)) {

                        /** Insert Contains SummerNote */
                        $($id_summerNote).summernote('code', $contains[$indexOfcontains]);
                    } /** End of Check IF Key Property Is Exists. */

                    /** CHeck IF Key Property is Not Exists : */
                    if (!$contains.hasOwnProperty($indexOfcontains)) {

                        /** Insert Contains SummerNote */
                        $($id_summerNote).summernote('code', '');
                    } /** End of CHeck IF Key Property is Not Exists. */

                    //console.log($contains[$indexOfcontains]);

                    /** Auto Increment : */
                    $i++;
                } /** End of while loop to Initialize SummerNote. */

            } /** End of Check IF $contains is exists. */

            /** Check IF $contains is not exists : */
            if ($contains == undefined || $contains == null || $contains == '' || $contains == "") {
                console.error('$contains is undefined');
                $result = 0;
            } /** End of Check IF $contains is not exists. */

        } /** End of Check IF $data_id is exists. */

        /** Check iF $data_id is not exists : */
        if ($data_id == undefined || $data_id == null || $data_id == '' || $data_id == "") {
            console.error('$data_id is undefined');
            $result = 0;
        } /** End of Check iF $data_id is not exists. */
    },
    /** End of For Initialize Multi SummerNote with Contains .
     * ===================================================================================================== */

    /** For Create Title Choice Answer :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Judul Choice Answer.
     *
     * @param $prefix_title {string} Berisi Prefix Judul.
     * @param $size_judul   {integer} Berisi Ukuran Div Judul dalam Format size bootstrap grid
     *                                Ex: 1 - 4;
     */
    Title_choice_answer: function ($title, $size_judul) {

        /** Define variable will be used in this function : */
        var $judul = '', $size_of_title;

        /** Check Prefix Title : */
        if ($title != undefined || $title != null || $title != '' || $title != "") {
            $judul = $title;
        }
        if ($title == undefined || $title == null || $title == '' || $title == "") {
            $judul = 'Pilihan ';
        }

        /** Check $size_judul : */
        if ($size_judul != undefined || $size_judul != null || $size_judul != '' || $size_judul != "") {
            $size_of_title = ' class="col-md-'+$size_judul+' col-sm-'+$size_judul+' col-xs-12"';
        }
        if ($size_judul == undefined || $size_judul == null || $size_judul == '' || $size_judul == "") {
            $size_of_title = ' class="col-md-3 col-sm-3 col-xs-12"';
        }

        /** Create Tag for Title of Choice Answer : */
        var $data = '<div '+$size_of_title+' data-div="title-answer-choice">';
        $data += '<h4>'+$judul+'</h4>';
        $data += '</div>';

        /** Return Result : */
        return $data;
    },
    /** End of For Create Title Choice Answer.
     * ===================================================================================================== */

    /** For Create summernote container :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat
     *
     * @param $id_tag {integer} Variable yang berisi ID Tag SummerNote Container.
     */
    SummerNote_container: function ($id_tag) {

        /** Check IF $id_tag parameter is exists : */
        if ($id_tag != undefined || $id_tag != null || $id_tag != '' || $id_tag != "") {

            /** Define variable will be used in this function : */
            var $data = '', $result;

            /** Create Div Container : */
            $data += '<div id="'+$id_tag+'"></div>';
            $result = $data;
        }
        /** End of Check IF $id_tag parameter is exists. */

        /** Check IF $id_tag parameter is not exists : */
        else {
            console.error('ID Tag is undefined');
            $result = 0;
        }
        /** End of Check IF $id_tag parameter is not exists. */

        /** Return Container : */
        return $result;
    },
    /** End of For Create summernote container.
     * ===================================================================================================== */

    /** For Create Container FORM Upload Image :
     * ----------------------------------------------------------- */
    Container_form_upload: function ($id_tag, $data_id, $id_progress_upload, $class_wrapper_form) {

        /** Define variable will be used in this function : */
        var $id_form_upload, $data = '', $id_form_answer, $id_prgss_upload, $class_wrap_form_upload;

        /** For data ID : */
        if ($data_id != undefined || $data_id != null || $data_id != '' || $data_id != "") {
            $id_form_answer = 'data-id-form="'+$data_id+'" ';
        }
        if ($data_id == undefined || $data_id == null || $data_id == '' || $data_id == "") {
            $id_form_answer = '';
        }

        /** For ID Tag Progress Upload : */
        if ($id_progress_upload != undefined || $id_progress_upload != null || $id_progress_upload != '' || $id_progress_upload != "") {
            $id_prgss_upload = $id_progress_upload;
        }
        if ($id_progress_upload == undefined || $id_progress_upload == null || $id_progress_upload == '' || $id_progress_upload == "") {
            $id_prgss_upload = 'progress-upload-image';
        }

        /** For Class Wrapper Form : */
        if ($class_wrapper_form != undefined || $class_wrapper_form != null || $class_wrapper_form != '' || $class_wrapper_form != "") {
            $class_wrap_form_upload = $class_wrapper_form;
        }
        if ($class_wrapper_form == undefined || $class_wrapper_form == null || $class_wrapper_form == '' || $class_wrapper_form == "") {
            $class_wrap_form_upload = 'form-upload-image-soal-answer';
        }

        /** Create Form Upload : */
        $data += '<div class="'+$class_wrap_form_upload+'">';
        //$data += '<button type="button" id="list-image-soal" '+$id_form_answer+'class="btn blue btn-outline">Daftar Gambar</button>';
        //$data += '<input type="file" id="'+$id_tag+'" class="btn green btn-outline">Upload';
        $data += '<label id="label_button_upload" data-id-upload="'+$id_tag+'" class="btn green btn-outline btn-file">';
        $data += 'Upload Gambbar<input type="file" id="'+$id_tag+'" '+$id_form_answer+'name="files" style="display: none;"> </label>';
        $data += '<div id="'+$id_prgss_upload+'" data-id-upload="'+$id_tag+'" class="btn btn-outline red-flamingo no-display">0%</div>';
        $data += '</div>';

        /** Return Result : */
        return $data;
    },
    /** End of For Create Container FORM Upload Image.
     * ===================================================================================================== */

    /** For Loop Summernote Container :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat SummerNote Container.
     *
     * @param $count                    {integer}           Berisi data Jumlah Container SummerNote yang akan dibuat.
     * @param $prefix_id                {string}            Berisi Prefix ID Tag Container SummerNote.
     * @param $wrap_container           {string}            Berisi Data attribute Wrapper Container SummerNote.
     * @param $size_container           {string|integer}    Berisi ukuran Bootsrap Grid Container SummerNote.
     * @param $prefix_title             {string}            Berisi Prefix Judul Form SummerNote.
     * @param $size_judul               {string}            Berisi Ukuran Bootstrap Wrapper Judul Form SummerNote.
     * @param $id_img_form              {string}            Berisi Prefix ID Tag Form Upload Image for SummerNote.
     * @param $id_progress_upload       {string}            Berisi ID Tag Progress Upload.
     */
    SummerNote_loop: function ($count, $prefix_id, $wrap_container, $size_container, $prefix_title, $size_judul,
                               $id_img_form, $id_progress_upload) {

        /** Define variable will be used in this function */
        var $result = undefined, $data_summerNote = '', $id_prefix = '', $title = '', $size_summerNote;

        /** Check IF parameter $count : */
        if ($count != undefined || $count != null || $count != '' || $count != "") {

            /** Check IF $prefix_title is Exist : */
            if ($prefix_title != undefined || $prefix_title != null || $prefix_title != '' || $prefix_title != "") {

                /** Check IF $size_judul is exists : */
                if ($size_judul != undefined || $size_judul != null || $size_judul != '' || $size_judul != "") {

                    /** Check Prefix ID : */
                    if ($prefix_id != undefined || $prefix_id != null || $prefix_id != '' || $prefix_id != "") {
                        $id_prefix = $prefix_id;
                    }
                    if ($prefix_id == undefined || $prefix_id == null || $prefix_id == '' || $prefix_id == "") {
                        $id_prefix = 'SummerNote-';
                    }

                    /** Check Size of SummerNote Container : */
                    if ($size_container != undefined || $size_container != null || $size_container != '' || $size_container != "") {
                        $size_summerNote = ' class="col-md-'+$size_container+' col-sm-'+$size_container+' col-xs-12"';
                    } else {
                        $size_summerNote = ' class="col-md-9 col-sm-9 col-xs-12"';
                    }

                    /** Check IF $wrap_container is Exist : */
                    if ($wrap_container != undefined || $wrap_container != null || $wrap_container != '' || $wrap_container != "") {

                        /** Define variable for prepare While loop : */
                        var $i, $id_tag,
                            $array_id, $size_img_action, $class_size_img_action, $id_tag_image;

                        /** Check IF $id_img_form is Exist : */
                        if ($id_img_form != '' || $id_img_form != "") {

                            /** Prepare while loop to Create SummerNote Container : */
                            $i = 0;
                            $array_id = new Array();

                            /** While loop to Create SummerNote Container : */
                            while ($i < $count)
                            {
                                //console.log('Create SummerNote : ' + $id_tag);
                                /** Create Container */
                                $id_tag = $id_prefix + ($i + 1);
                                $title = $prefix_title + ($i + 1);
                                $array_id.push($id_tag);
                                $size_img_action = 12 - (parseInt($size_container) + parseInt($size_judul));
                                $class_size_img_action = ' class="col-md-'+$size_img_action+' col-sm-'+$size_img_action+' col-xs-12"';
                                $id_tag_image = $id_img_form+($i + 1);
                                $data_summerNote += '<div id="form-for-choice-answer-edit-'+($i + 1)+'">'; /** Begin ".row" for Title and FORM */
                                $data_summerNote += $.Title_choice_answer($title, $size_judul);
                                //$data_summerNote += '<div'+$size_summerNote+' data-div="form-answer-choice">';
                                $data_summerNote += '<div'+$size_summerNote+' data-div="'+$wrap_container+'">';
                                $data_summerNote += $.SummerNote_container($id_tag);
                                $data_summerNote += '</div>';
                                $data_summerNote += '</div>'; /** Ending ".row" for Title and FORM */
                                $data_summerNote += '<div id="form-for-upload-image-edit" data-id-form-answer="'+$id_tag+'" class="row">'; /** Begin ".row" for Form Upload Image */
                                $data_summerNote += '<div id="'+$id_tag_image+'"'+$class_size_img_action+'>';
                                $data_summerNote += $.Container_form_upload('button-upload-image-answer', $id_tag, $id_progress_upload);
                                $data_summerNote += '</div>';
                                $data_summerNote += '</div>'; /** Ending ".row" for Form Upload Image */

                                /** Auto Increment : */
                                $i++;
                            } /** End of while loop to Create SummerNote Container. */
                        } /** End of Check IF $id_img_form is Exist. */

                        /** Check IF $id_img_form is not Exists : */
                        else if ($id_img_form == '' || $id_img_form == "")
                        {
                            /** Prepare while loop to Create SummerNote Container : */
                            $i = 0;
                            $array_id = new Array();

                            /** While loop to Create SummerNote Container : */
                            while ($i < $count)
                            {
                                /** Create Container */
                                $id_tag = $id_prefix + ($i + 1);
                                $title = $prefix_title + ($i + 1);
                                $array_id.push($id_tag);
                                $size_img_action = 12 - (parseInt($size_container) + parseInt($size_judul));
                                $class_size_img_action = ' class="col-md-'+$size_img_action+' col-sm-'+$size_img_action+' col-xs-12"';
                                $data_summerNote += $.Title_choice_answer($title, $size_judul);
                                //$data_summerNote += '<div'+$size_summerNote+' data-div="form-answer-choice">';
                                $data_summerNote += '<div'+$size_summerNote+' data-div="'+$wrap_container+'">';
                                $data_summerNote += $.SummerNote_container($id_tag);
                                $data_summerNote += '</div>';

                                /** Auto Increment : */
                                $i++;
                            } /** End of while loop to Create SummerNote Container. */
                        } /** End of Check IF $id_img_form is not Exists. */

                        /** Create Result Function : */
                        $result = {
                            'data' : $data_summerNote,
                            'id' : $array_id
                        };

                    } /** End of Check IF $wrap_container is Exist. */

                    /** Check IF $wrap_container is Not Exists : */
                    if ($wrap_container == undefined || $wrap_container == null || $wrap_container == '' || $wrap_container == "") {
                        console.error('$wrap_container Parameter is undefined');
                        $result = 0;
                    } /** End of Check IF $wrap_container is Not Exists. */
                } /** End of Check IF $size_judul is exists. */

                /** Check IF $size_judul is not exists : */
                //else {
                if ($size_judul == undefined || $size_judul == null || $size_judul == '' || $size_judul == "") {
                    console.error('$prefix_title Parameter is undefined');
                    $result = 0;
                } /** End of Check IF $size_judul is not exists. */

            } /** End of Check IF $prefix_title is Exist. */

            /** Check IF $prefix_title is not exists : */
            //else {
            if ($prefix_title == undefined || $prefix_title == null || $prefix_title == '' || $prefix_title == "") {
                console.error('$prefix_title Parameter is undefined');
                $result = 0;
            } /** End of Check IF $prefix_title is not exists. */
        }
        //else {
        if ($count == undefined || $count == null || $count == '' || $count == "") {
            console.error('Count Parameter is undefined');
            $result = 0;
        }
        /** End of Check IF parameter $count. */

        /** Return Result : */
        return $result;
    },
    /** End of For Loop Summernote Container.
     * ===================================================================================================== */

    /** For Create Button Number Question :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Nomor Halaman.
     *
     * Format Object $place :
     * -----------------------------------------------
     * object {
     *      'selector' : '',
     *      'type' : [ replace || append ],
     * }
     *
     * @param   $data           {object}    Berisi Data Daftar Soal.
     * @param   $place          {object}    Berisi Lokasi Penempatan Tombol.
     * @param   $id_tag         {string}    Berisi ID Tag Item Number.
     * @param   $prefix_id      {string}    Berisi Prefix ID Table.
     * @param   $callback       {function}  Berisi Action Callback.
     * */
    NKTI_TesOnline_btn_number: function ($data, $place, $id_tag, $prefix_id, $callback) {

        /** Define variable will be used in this function : */
        var $result, $data_result= '', $id_tag_html, $prefix_id_href;
        var $data_button = '', $place_button = '';

        /** For ID Tag : */
        if ($id_tag != undefined || $id_tag != null || $id_tag != '' || $id_tag != "") {
            $id_tag_html = 'id="'+$id_tag+'" ';
        }
        if ($id_tag == undefined || $id_tag == null || $id_tag == '' || $id_tag == "") {
            $id_tag_html = '';
        }

        /** End of For ID Tag. */

        /** Check IF $prefix_id is exist : */
        if ($prefix_id != undefined || $prefix_id != null || $prefix_id != '' || $prefix_id != "") {
            $prefix_id_href = '#'+$prefix_id;
        } /** End of Check IF $prefix_id is exist. */

        /** Check IF $prefix_id is not exists : */
        if ($prefix_id == undefined || $prefix_id == null || $prefix_id == '' || $prefix_id == "") {
            $prefix_id_href = '#item-soal-';
        } /** End of Check IF $prefix_id is not exists. */

        /** Check IF $data is exist : */
        if ($data != undefined || $data != null || $data != '' || $data != "")
        {
            /** Declare Variable for Place data Button : */
            var $id_button, $id_kat_button, $type_soal, $type_jawaban, $jawaban_button, $judul_button, $answer_peserta, $href_button;
            $data_button = $data;

            /** Prepare while loop to Get Data Button : */
            var $i = 0;
            var $until_loop = $data_button.length;
            //console.log($until_loop);

            /** While loop to Get Data Button : */
            while ($i < $until_loop)
            {
                /** Define variable for get data button : */
                $id_button = $data[$i]['id'];
                $id_kat_button = $data[$i]['id_kat'];
                $type_soal = $data[$i]['type_soal'];
                $type_jawaban = $data[$i]['type_jawaban'];
                $jawaban_button = $data[$i]['jawaban'];
                $judul_button = $data[$i]['judul'];
                $href_button = $prefix_id_href+$i;

                /** For Answer Peserta : */
                if ($jawaban_button == 0) {
                    $answer_peserta = 'red ';
                } else if ($jawaban_button != 0) {
                    $answer_peserta = 'green ';
                }

                /** Define variable $data_result : */
                $data_result += '<a '+$id_tag_html+'class="btn '+$answer_peserta+'button-num-quest" '+
                'data-num-soal="'+$i+'" '+
                'data-kategori="'+$id_kat_button+'" '+
                'data-soal="'+$id_button+'" href="'+$href_button+'" data-toggle="tab">'+($i + 1)+'</a>';

                /** Auto Increment : */
                $i++;
            }
            /** End of while loop to Get Data Button. */

            /** Check IF $place is exists : */
            if ($place != undefined || $place != null || $place != '' || $place != "") {
                var $selector_button = $place['selector'];
                var $type_place = $place['type'];

                /** Switch for conditions $type_place : */
                switch ($type_place)
                {
                    /** Case for $type_place == 'replace' : */
                    case 'replace' :
                        $($selector_button).html($data_result).each(function() {
                            if (typeof $callback == "function") {
                                $callback.apply();
                            }
                        });
                        break;

                    /** Case for $type_place == 'append' : */
                    case 'append' :
                        $($selector_button).append($data_result).each(function() {
                            if (typeof $callback == "function") {
                                $callback.apply();
                            }
                        });
                        break;
                }
                /** End of switch for conditions $type_place. */
            }
            /** End of Check IF $place is exists. */

            /** Check IF $place is not exists : */
            if ($place == undefined || $place == null || $place == '' || $place == "") {
                $result = $data_result;
            } /** End of Check IF $place is not exists. */
        }
        /** End of Check IF $data is exist. */

        /** Check IF $data is no exists : */
        if ($data == undefined || $data == null || $data == '' || $data == "") {
            console.error('Parameter $data is Undefined');
            $result = 0;
        }
        /** End of Check IF $data is no exists. */

        /** Return Result : */
        return $result;
    },
    /** End of For Create Button Number Question.
     * ===================================================================================================== */

    /** For Activated iCheck Radio Button :
     * ----------------------------------------------------------- */
    NKTI_TesOnline_question_icheck: function ($list_soal, $id_input) {

        /** Define variable will be used in this function : */
        var $result, $list_data_soal, $id_form;

        /** Check IF $list_soal is Exist : */
        if ($list_soal != undefined || $list_soal != null || $list_soal != '' || $list_soal != "") {

            /** Check IF $id_input is Exist : */
            if ($id_input != undefined || $id_input != null || $id_input != '' || $id_input != "") {

                /** Define variable for List Soal : */
                $list_data_soal = $list_soal;
                $id_form = 'id="'+$id_input+'"';

                /** Define variable for Place result item : */
                var $id_item, $id_item_kat;
                var $data_attr_id, $data_attr_kat, $selector_item;

                /** Prepare while loop to Activated iCheck FORM : */
                var $i = 0;
                var $until_loop = $list_data_soal.length;

                /** While loop to Activated iCheck FORM : */
                while ($i < $until_loop)
                {
                    /** Get data item : */
                    $id_item = $list_data_soal[$i]['id'];
                    $id_item_kat = $list_data_soal[$i]['id_kat'];

                    /** Define variable for attribut form INPUT : */
                    $data_attr_id = 'data-soal="'+$id_item+'"';
                    $data_attr_kat = 'data-soal-kat="'+$id_item_kat+'"';
                    $selector_item = 'input['+$id_form+']['+$data_attr_kat+']['+$data_attr_id+']';

                    /** Activated iCheck FORM : */
                    $($selector_item).iCheck({
                        checkboxClass: 'icheckbox_square-green',
                        radioClass: 'iradio_square-green',
                        increaseArea: '20%' // optional
                    });

                    /** Auto Increment : */
                    $i++;
                } /** End of while loop to Activated iCheck FORM. */

                /** Place result : */
                $result = 1;

            } /** End of Check IF $id_input is Exist. */

            /** Check IF $id_input is not exists : */
            if ($id_input == undefined || $id_input == null || $id_input == '' || $id_input == "") {
                console.error('Parameter $id_input is undefined.');
                $result = 0;
            } /** End of Check IF $id_input is not exists. */

        } /** End of Check IF $list_soal is Exist. */

        /** Check IF $list_soal is not exists : */
        if ($list_soal == undefined || $list_soal == null || $list_soal == '' || $list_soal == "") {
            console.error('Parameter $list_soal is undefined.');
            $result = 0;
        } /** End of Check IF $list_soal is not exists. */

        /** Return Result : */
        return $result;
    },
    /** End of For Activated iCheck Radio Button.
     * ===================================================================================================== */

    /** For Create Item Question :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Item Question.
     *
     * Format $list_answer :
     * -------------------------------------
     * object {
     *      'answer-1' : '',
     *      'answer-2' : '',
     *      'answer-3' : '',
     *      'answer-4' : '',
     * }
     *
     * Format Object $place :
     * -------------------------------------
     * object {
     *      'selector' : '',
     *      'type' : '',
     * }
     *
     * @param   $count_soal     {string}        Berisi Jumlah Soal.
     * @param   $number_soal    {string}        Berisi Nomor Soal.
     * @param   $type_jawaban   {string}        Berisi Type Jawaban.
     * @param   $id_soal        {string}        Berisi Nama ID HTML Wrapper Soal.
     * @param   $class_soal     {string}        Berisi Nama Class HTML Wrapper Soal. Ex : "soal".
     * @param   $attr_soal      {string}        Berisi Attribute HTML Wrapper Soal.
     * @param   $class_answer   {string}        Berisi Class HTML Wrapper Soal. Ex : "input-soal".
     * @param   $attr_answer    {string}        Berisi Attribute HTML item Answer.
     * @param   $isi_soal       {string}        Berisi Soal.
     * @param   $list_answer    {object}        Berisi Daftar Jawaban.
     * @param   $value_answer   {object}        Berisi Value Answer Soal.
     * @param   $button_action  {string}        Berisi Data Button Action Item Soal.
     * @param   $place          {object}        Berisi object untuk menyimpan item soal.
     * @param   $selector_soal  {string}        Berisi Selector Soal.
     *
     * */
    NKTI_TesOnline_question_item: function ($count_soal, $number_soal, $type_jawaban, $id_soal, $class_soal, $attr_soal, $class_answer, $attr_answer,
                                            $isi_soal, $list_answer, $value_answer, $button_action, $place) {

        /** Define variable will be used in this function : */
        var $result, $data_result = '';
        var $id_item_soal, $class_item_soal, $attr_item_soal, $class_item_answer, $attr_item_answer, $contains_soal, $list_of_answer;
        var $button_action_soal;

        /** Check IF $id_soal Is Exist : */
        if ($id_soal != undefined || $id_soal != null || $id_soal != '' || $id_soal != "") {

            $id_item_soal = 'id="' + $id_soal + '" ';

            /** Check For $class_soal : */
            if ($class_soal != undefined || $class_soal != null || $class_soal != '' || $class_soal != "") {
                $class_item_soal = 'class="' + $class_soal + '" ';
            }
            if ($class_soal == undefined || $class_soal == null || $class_soal == '' || $class_soal == "") {
                $class_item_soal = 'class="soal" ';
            }

            /** Check For $attr_soal : */
            if ($attr_soal != undefined || $attr_soal != null || $attr_soal != '' || $attr_soal != "") {
                $attr_item_soal = $attr_soal + ' ';
            }
            if ($attr_soal == undefined || $attr_soal == null || $attr_soal == '' || $attr_soal == "") {
                $attr_item_soal = '';
            }

            /** Check For $class_answer : */
            if ($class_answer != undefined || $class_answer != null || $class_answer != '' || $class_answer != "") {
                $class_item_answer = $class_answer + ' ';
            }
            if ($class_answer == undefined || $class_answer == null || $class_answer == '' || $class_answer == "") {
                $class_item_answer = 'input-soal ';
            }

            /** Check For $attr_answer : */
            if ($attr_answer != undefined || $attr_answer != null || $attr_answer != '' || $attr_answer != "") {
                $attr_item_answer = $attr_answer + ' ';
            }
            if ($attr_answer == undefined || $attr_answer == null || $attr_answer == '' || $attr_answer == "") {
                $attr_item_answer = '';
            }

            /** Check For $isi_soal : */
            if ($isi_soal != undefined || $isi_soal != null || $isi_soal != '' || $isi_soal != "") {
                $contains_soal = $isi_soal + ' ';
            }
            if ($isi_soal == undefined || $isi_soal == null || $isi_soal == '' || $isi_soal == "") {
                $contains_soal = '';
            }

            /** Check For $button_action : */
            if ($button_action != undefined || $button_action != null || $button_action != '' || $button_action != "") {
                $button_action_soal = $button_action;
            }
            if ($button_action == undefined || $button_action == null || $button_action == '' || $button_action == "") {
                $button_action_soal = '';
            }

            /** Check IF $list_answer is Exists : */
            if ($list_answer != undefined || $list_answer != null || $list_answer != '' || $list_answer != "") {

                /** Define variable will be used in this function : */
                var $data_result_item = '';
                var $active_tab = '';
                var $class_answer_item = '';

                /** Prepare While loop to craate Item Soal : */
                var $keys = Object.keys($list_answer),
                    $i = 0,
                    $len = $keys.length,
                    $prop,
                    $value,
                    $value_ans;

                /** While loop to create Item Soal : */
                while ($i < $len) {
                    $prop = $keys[$i];
                    $value = $list_answer[$prop];

                    /** Check Answer Soal : */
                    if (($i + 1) == $value_answer) {
                        $value_ans = 'checked';
                    } else {
                        $value_ans = '';
                    }

                    /** Check Type Jawaban : */
                    if ($type_jawaban == 1) {
                        $class_answer_item = 'item-answer';
                    } else {
                        $class_answer_item = 'item-answer-text';
                    }

                    /** Create Item Answer Soal : */
                    $data_result_item += '<div class="'+$class_answer_item+' col-md-6 col-sm-6 col-xs-6">';
                    $data_result_item += '<div class="radio ' + $class_item_answer + 'col-md-2 col-sm-6 col-xs-6">';
                    $data_result_item += '<label><input id="answer-soal" name="nomor-soal-' + $number_soal + '" data-num-soal="' + $number_soal + '" type="radio" value="' + ($i + 1) + '" ' + $attr_item_answer + $value_ans + '></label>';
                    $data_result_item += '</div>';
                    $data_result_item += '<div class="value-input-soal col-md-10 col-sm-10 col-xs-10">' + $value + '</div>';
                    $data_result_item += '</div>';
                    $i++;
                }
                //console.log($data_result_item);

                /** For Active tab : */
                if ($number_soal == 0) {
                    $active_tab = 'active in ';
                } else {
                    $active_tab = '';
                }

                /** Begin Wrapper Item Soal : */
                $data_result += '<div ' + $id_item_soal + $attr_item_soal +
                '' +
                'class="tab-pane fade '+$active_tab+'col-md-12 col-sm-12 col-xs-12">';

                /** For Action Button : */
                $data_result += $button_action_soal;

                /** Inner Item Soal : */
                $data_result += '<div ' + $class_item_soal + '>';
                $data_result += $contains_soal;
                $data_result += '</div>';

                /** For Data List Answer : */
                $data_result += '<div class="pilihan">' + $data_result_item + '</div>';

                /** Ending Wrapper Item Soal : */
                $data_result += '</div>';
                //console.log($place);

                /** Check IF $place is exist : */
                if ($place != undefined || $place != null || $place != '' || $place != "") {
                    //console.log('$place Not null var');

                    /** Check IF $place is object : */
                    if (typeof $place == "object") {
                        //console.log('$place is Object');
                        var $selector_item = $place['selector'];
                        var $type_item = $place['type'];

                        /** Switch for conditions $type_item : */
                        switch ($type_item) {
                        /** Case for $type_item == 'replace' : */
                            case 'replace' :
                                $($selector_item).html($data_result);
                                break;

                        /** Case for $type_item == 'append' : */
                            case 'append' :
                                $($selector_item).append($data_result);
                                break;
                        }
                        /** End of switch for conditions $type_item. */

                        /** Return Result : */
                        $result = 1;
                    }
                    /** End of Check IF $place is object. */

                    /** Check IF $place is not object : */
                    if (typeof $place != "object") {
                        //console.log('$place is not Object');
                        $result = $data_result;
                    }
                    /** End of Check IF $place is not object. */

                }
                /** End of Check IF $place is exist. */

                /** Check IF $place is not exist : */
                if ($place == undefined || $place == null || $place == '' || $place == "") {
                    //console.log('$place is null var');
                    $result = $data_result;
                }
                /** End of Check IF $place is not exist. */
            }
            /** End of Check IF $id_soal Is Exist. */

            /** Check IF $id_soal is not exists : */
            if ($id_soal == undefined || $id_soal == null || $id_soal == '' || $id_soal == "") {
                console.error('Parameter $id_soal is undefined');
                $result = 0;
            }
            /** End of Check IF $id_soal is not exists. */

        } /** End of Check IF $list_answer is Exists. */

        /** Check IF $list_answer is not Exists : */
        if ($list_answer == undefined || $list_answer == null || $list_answer == '' || $list_answer == "") {
            console.error('Parameter $list_answer is undefined');
            $result = 0;
        } /** End of Check IF $list_answer is not Exists. */


        /** Return Result : */
        return $result;
    },
    /** End of For Create Item Question.
     * ===================================================================================================== */

    /** For Create List Question :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat List Item Soal.
     *
     * Format object $list_soal :
     * ------------------------------------------
     * object [
     *      {
     *          'id' : '',
     *          'id_kat' : '',
     *          'jawaban' : '',
     *          'pilihan' : '',
     *          'type_soal' : '',
     *          'type_jawaban' : ''
     *      },
     * ]
     *
     * @param   $list_soal      {object}        Berisi Object Result List Soal.
     * @param   $place          {object}        Berisi Tempat Menyimpan Hasil Pembuatan List Soal.
     * @param   $callback       {function}      Berisi Action Callback.
     */
    NKTI_TesOnline_question_list: function ($list_soal, $place, $callback) {

        /** Define variable will be used in this function : */
        var $result, $result_data = '';

        /** Check IF $list_soal is exists : */
        if ($list_soal != undefined || $list_soal != null || $list_soal != '' || $list_soal != "") {

            /** Check IF $list_soal is object : */
            if (typeof $list_soal == "object") {

                /** Define variable for list Soal : */
                var $id_soal, $id_soal_kat, $judul_soal, $jawaban_soal, $pilihan_soal, $type_soal, $type_jawaban;
                var $count_soal, $nomor_soal, $id_wrap_soal, $class_soal, $attr_soal, $class_answer, $attr_answer = '',
                    $judul_isi_soal, $choice_soal, $answer_soal, $place_item;
                var $data_button_action = '', $data_attr_button;
                var $button_first, $button_middle, $button_end;
                var $result_item_soal = '';

                /** Prepare while loop to Create Item Soal : */
                var $i = 0;
                var $until_loop = $list_soal.length;
                //console.log($list_soal);
                //console.log($until_loop);

                /** While loop to Create Item Soal : */
                while ($i < $until_loop)
                {
                    /** Place data result list Soal : */
                    $id_soal = $list_soal[$i]['id'];
                    $id_soal_kat = $list_soal[$i]['id_kat'];
                    $judul_soal = $list_soal[$i]['judul'];
                    $jawaban_soal = $list_soal[$i]['jawaban'];
                    $pilihan_soal = $list_soal[$i]['pilihan'];
                    $type_soal = $list_soal[$i]['type_soal'];
                    $type_jawaban = $list_soal[$i]['type_jawaban'];

                    /** Create Item List Soal : */
                    $count_soal = $until_loop;
                    $nomor_soal = $i;
                    $id_wrap_soal = 'item-soal-'+$i;
                    $class_soal = 'soal';
                    $attr_soal = 'data-jawaban="'+$jawaban_soal+'" ' +
                    'data-number-of-soal="'+$i+'" ' +
                    'data-kat-of-soal="'+$id_soal_kat+'" ' +
                    'data-id-of-soal="'+$id_soal+'"';
                    $class_answer = 'input-soal';
                    $attr_answer = 'data-soal-kat="'+$id_soal_kat+'" data-soal="'+$id_soal+'"';
                    $judul_isi_soal = $judul_soal;
                    $choice_soal = $pilihan_soal;
                    $answer_soal = $jawaban_soal;
                    $place_item = '';
                    $data_attr_button = '#'+$id_wrap_soal;
                    var $data_number_soal = 'data-number-soal="'+($i + 1)+'" ';

                    /** Create Button Action Item Soal : */
                    if ($i == 0) {
                        $data_button_action = '<div id="loc-button-action" class="btn_action_nextPrev col-md-12">';
                        $data_button_action += '<a id="button-action-soal-next" ' +
                        //'data-toggle="tab" ' +
                        'data-number-soal="'+($i + 2)+'" ' +
                        'data-curr-numsoal="'+$i+'" ' +
                        'data-curr-kat="'+$id_soal_kat+'" ' +
                        'data-curr-soal="'+$id_soal+'" ' +
                        'data-href="#item-soal-'+($i + 1)+'" class="btn btn-primary button-next-soal">Next Soal</a>';
                        $data_button_action += '</div>';
                    } else if ($i != 0) {
                        if ($i == ($until_loop - 1)) {
                            $data_button_action = '<div id="loc-button-action" class="btn_action_nextPrev col-md-12">';
                            $data_button_action += '<a id="button-action-soal-prev" ' +
                            //'data-toggle="tab" ' +
                            'data-number-soal="'+($i)+'" ' +
                            'data-curr-numsoal="'+$i+'" ' +
                            'data-curr-kat="'+$id_soal_kat+'" ' +
                            'data-curr-soal="'+$id_soal+'" ' +
                            'data-href="#item-soal-'+($i - 1)+'" class="btn btn-primary button-prev-soal">Prev Soal</a>';
                            $data_button_action += '<button id="finish-one-exam" ' +
                            'data-soal-kat="kategori-'+$id_soal_kat+'" class="btn btn-success button-next-soal">Selesai</button>';
                            $data_button_action += '</div>';
                        } else if ($i != ($until_loop - 1)) {
                            $data_button_action = '<div id="loc-button-action" class="btn_action_nextPrev col-md-12">';
                            $data_button_action += '<a id="button-action-soal-prev" ' +
                            //'data-toggle="tab" ' +
                            'data-number-soal="'+($i)+'" ' +
                            'data-curr-numsoal="'+$i+'" ' +
                            'data-curr-kat="'+$id_soal_kat+'" ' +
                            'data-curr-soal="'+$id_soal+'" ' +
                            'data-href="#item-soal-'+($i - 1)+'" class="btn btn-primary button-prev-soal">Prev Soal</a>';
                            $data_button_action += '<a id="button-action-soal-next" ' +
                            //'data-toggle="tab" ' +
                            'data-number-soal="'+($i + 2)+'" ' +
                            'data-curr-numsoal="'+$i+'" ' +
                            'data-curr-kat="'+$id_soal_kat+'" ' +
                            'data-curr-soal="'+$id_soal+'" ' +
                            'data-href="#item-soal-'+($i + 1)+'" class="btn btn-primary button-next-soal">Next Soal</a>';
                            $data_button_action += '</div>';
                        }
                    }

                    $result_item_soal += $.NKTI_TesOnline_question_item($count_soal, $nomor_soal, $type_jawaban, $id_wrap_soal, $class_soal,
                        $attr_soal, $class_answer, $attr_answer, $judul_isi_soal, $choice_soal, $answer_soal, $data_button_action, $place_item);

                    /** Auto Increment : */
                    $i++;
                } /** End of while loop to Create Item Soal. */

                /** Create Result Soal : */
                $result_data += '<div class="row" style="margin-left: 0; margin-right: 0;">';
                $result_data += '<div class="tab-content">'+$result_item_soal+'</div>';
                $result_data += '</div>';


                /** Check IF $place is exist : */
                if ($place != undefined || $place != null || $place != '' || $place != "") {

                    /** Check IF $place is object : */
                    if (typeof $place == "object") {
                        var $selector_item = $place['selector'];
                        var $type_item = $place['type'];

                        /** Switch for conditions $type_item : */
                        switch ($type_item) {
                        /** Case for $type_item == 'replace' : */
                            case 'replace' :
                                $($selector_item).html($result_data).each(function() {
                                    if (typeof $callback == "function") {
                                        $callback.apply();
                                    }
                                });
                                break;

                        /** Case for $type_item == 'append' : */
                            case 'append' :
                                $($selector_item).append($result_data).each(function() {
                                    if (typeof $callback == "function") {
                                        $callback.apply();
                                    }
                                });
                                break;
                        }
                        /** End of switch for conditions $type_item. */

                        /** Return Result : */
                        $result = 1;
                    }
                    /** End of Check IF $place is object. */

                    /** Check IF $place is not object : */
                    if (typeof $place != "object") {
                        $result = $result_data;
                    }
                    /** End of Check IF $place is not object. */

                } /** End of Check IF $place is exist. */

                /** Check IF $place is not exist : */
                if ($place == undefined || $place == null || $place == '' || $place == "") {
                    $result = $result_data;
                } /** End of Check IF $place is not exist. */
            }
            /** End of Check IF $list_soal is object. */

            /** Check IF $list_soal is not object : */
            if (typeof $list_soal != "object") {
                console.error('Parameter $list_soal is not Object');
                $result = 0;
            }
            /** End of Check IF $list_soal is not object. */

        } /** End of Check IF $list_soal is exists. */

        /** Check IF $list_soal is not exists : */
        if ($list_soal == undefined || $list_soal == null || $list_soal == '' || $list_soal == "") {
            console.error('Parameter $list_soal is undefined');
            $result = 0;
        } /** End of Check IF $list_soal is not exists. */

        /** Return Result : */
        return $result;
    },
    /** End of For Create List Question.
     * ===================================================================================================== */

    /** For Render MathML :
     * ----------------------------------------------------------- */
    NKTI_render_mathml: function ($loc_soal) {

        /** Define variable will be used in this function : */
        var $loc_list_soal = $loc_soal + ' .tab-content';
        var $loc_items_soal = $($loc_list_soal).children();

        /** Prepare while loop to Render MathML : */
        var $i = 0;
        var $until_loop = $loc_items_soal.length;
        console.log($loc_soal);
        console.log($loc_items_soal);

        /** While loop to Render MathML : */
        while ($i < $until_loop)
        {
            /** Define variable for Begin Get Markup : */
            var $getLoc_item_soal = $($loc_items_soal[$i]);
            var $get_id_item = $getLoc_item_soal.attr('id');
            var $loc_item_soal = 'div#'+$get_id_item + ' .soal';
            var $preloc_items_choice = 'div#'+$get_id_item + ' .pilihan';
            var $loc_items_choice = $($preloc_items_choice).children();

            /** Define variable for get Markup Soal : */
            var $getLoc_mathjax_Content = $loc_item_soal + ' .MJXc-display';
            var $getLoc_mathjax_preview = $loc_item_soal + ' .MathJax_Preview';
            var $getLoc_mathjax_CHTML = $getLoc_mathjax_Content + ' .MathJax_CHTML';
            var $getLoc_mathjax_jsscript = $loc_item_soal + ' script';
            var $getLoc_mathjax_mathml = $loc_item_soal + ' math';

            /** Debug MathJax : */
            console.log('ID Soal : ' + $get_id_item);

            /** Check Content MathJax : */
            if ($($getLoc_mathjax_Content).length != 0) {

                console.log('Math Soal True');

                /** Get Data MathJax : */
                var $getId_mathjax_CHTML = $($getLoc_mathjax_CHTML).attr('id');
                var $getMathML_content = $($getLoc_mathjax_CHTML).attr('data-mathml');
                var $id_script_mathjax = $($getLoc_mathjax_jsscript).attr('id');

                /** Place Current MathML : */
                $($loc_item_soal).append($getMathML_content);
                $($getLoc_mathjax_mathml).insertBefore($($getLoc_mathjax_Content)[0]);

                /** Remove Current Content : */
                $($getLoc_mathjax_preview).remove().each(function() {
                    $($getLoc_mathjax_Content).remove().each(function() {
                        $($getLoc_mathjax_jsscript).remove().each(function() {
                            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                        });
                    });
                });
            }

            /** Check IF no MathJax and there are MathML : */
            else if ($($getLoc_mathjax_Content).length == 0 && $($getLoc_mathjax_mathml).length != 0) {
                MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
            }

            /** Prepare while loop to Render Math in Choice : */
            var $i_c = 0;
            var $until_c = $loc_items_choice.length;

            /** While loop to Render Math in Choice : */
            while ($i_c < $until_c)
            {

                /** Define variable for Begin Get Markup : */
                var $getLoc_mathjax_Contentc = $preloc_items_choice + ' .MJXc-display';
                var $getLoc_mathjax_previewc = $preloc_items_choice + ' .MathJax_Preview';
                var $getLoc_mathjax_CHTMLc = $getLoc_mathjax_Contentc + ' .MathJax_CHTML';
                var $getLoc_mathjax_jsscriptc = $preloc_items_choice + ' script';
                var $getLoc_mathjax_mathmlc = $preloc_items_choice + ' math';

                /** Debug MathJax : */
                console.log($getLoc_mathjax_Contentc);

                /** Check Content MathJax Choice : */
                if ($($getLoc_mathjax_Contentc).length != 0) {

                    /** Debug MathJax : */
                    console.log('Math Choice True');

                    /** Get data Mathjax : */
                    var $getId_mathjax_CHTMLc = $($getLoc_mathjax_CHTML).attr('id');
                    var $getMathML_contentc = $($getLoc_mathjax_CHTMLc).attr('data-mathml');
                    var $id_script_mathjaxc = $($getLoc_mathjax_jsscriptc).attr('id');

                    /** Place Current MathML : */
                    $($preloc_items_choice).append($getMathML_contentc);
                    $($getLoc_mathjax_mathmlc).insertBefore($($getLoc_mathjax_Contentc)[0]);

                    /** Remove Current Content Choice : */
                    $($getLoc_mathjax_previewc).remove().each(function() {
                        $($getLoc_mathjax_Contentc).remove().each(function() {
                            $($getLoc_mathjax_jsscriptc).remove().each(function() {
                                MathJax.Hub.Queue(["Typeset",MathJax.Hub, $preloc_items_choice]);
                            });
                        });
                    });
                }

                /** Auto Increment : */
                $i_c++;
            } /** End of while loop to Render Math in Choice. */

            /** Auto Increment : */
            $i++;
        } /** End of while loop to Render MathML. */

        return 1;
    },
    /** End of For Render MathML.
     * ===================================================================================================== */

    /** For Start Loading Animate :#2D3E29
     * -----------------------------------------------------------
     */
    NKTI_onlineapps_loading_animate_start: function ($target_loading_animate, $color) {

        /** Run Loading Animate : */
        NKTI_loading.blockUI({
            target: $target_loading_animate,
            overlayColor: $color ? $color : false,
            animate: true,
            message: true,
            data_msg: '<div><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i></div><h3>Loading...</h3>'
        });

    },
    /** End of For Start Loading Animate.
     * ===================================================================================================== */

    /** For Stop Loading Animate :
     * -----------------------------------------------------------
     */
    NKTI_onlineapps_loading_animate_end: function ($target_loading_animate) {

        /** Stop Loading Animate : */
        window.setTimeout(function() {
            NKTI_loading.unblockUI($target_loading_animate);
        }, 1000);
    }
    /** End of For Stop Loading Animate.
     * ===================================================================================================== */
    
});
/** End of Online Test Plugins.
 * ===================================================================================================== */
