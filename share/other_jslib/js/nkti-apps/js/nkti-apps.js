/* !Copyright (c) 2015 Achmad Yusri Afandi
 * Used GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * Version 0.1 Beta.
 *
 */

/** Begin Function Applications for "NKTI Pattern Apps" :
 * -----------------------------------------------------------
 */
var NKTI_pattern = function () {

    /** For Return in this application :
     * -----------------------------------------------------------
     */
    return {

        /** For Manage Pattern FORM :
         * ----------------------------------------------------------
         *
         * Format pattern_form :
         * -------------------------------
         * Object {
         *      'nama_in_data_form' : {
         *      'type' : [ Tipe Tag ],
         *      'html' : [ nama TAG HTML ]
         *      'selector' : [ Selector TAG ],
         *      'value' : [ for 'type-place' == 'attr' ]
         *      'type-place' : [ Method Place data form ],
         *      'custom-value' : [For Custom Value selector]
         *      },
         * }
         *
         * Explain value of index 'type' :
         * -------------------------------------
         * - direct -> $(Your_direct_selector).[val | text | html | attr | dsb ](Your_value);
         * - input -> $(input[your_name_selector]).val(Your_value);
         * - textarea -> $(textarea[your_name_selector]).val(Your_value);
         * - select -> $(select[your_name_selector] option[value='Your_value']).attr('selected', true).change();
         *
         * Explain value of index 'selector' :
         * -------------------------------------
         * - 'name tag. Ex : name="yourname_tag" | put just "name" no put attribute "name" ' => for 'type' = input, textarea, select
         * - 'jQUery Selector. Ex : "div#idtag .|#, etc"' => for 'type' = other HTML TAG.
         *
         * @param pattern_form_key {object} berisi object form.
         * @param pattern_form {object} berisi object form.
         * @param data_form {object} berisi Object isi form.
         *
         * Explain value of index 'value' :
         * -------------------------------------
         * - 'attr' => user attr().
         * - '' => Not used attr().
         *
         * Explain value of 'type-place' :
         * -------------------------------------
         * 'val' =>
         * 'text' =>
         * 'html' =>
         * 'src' => for 'value' == 'attr'
         * 'other attributes' => for 'value' == 'attr'
         *
         * Explain value of 'custom-value' :
         * -------------------------------------
         *
         * Example to use :
         * -------------------------------------
         * id : {'type':'input | textarea | select'}
         *
         */
        action_result_JSON: function(pattern_form_key, pattern_form, data_form) {

            /** Define variable wil be used in this function : */
            var $result = [];
            var $your_dataForm;

            if (data_form == '' || data_form == undefined || data_form == null) {
                $your_dataForm = {};
            } else {
                $your_dataForm = data_form;
            }

            //console.log(pattern_form);
            //console.log(pattern_form['nama']);
            //console.log($your_dataForm);

            /** Define variable for Pattern FORM : */
            var $pattern = pattern_form_key;

            //console.log($pattern);
            //console.log(pattern_form_key);

            /** Prepare while loop to Placing data form : */
            $i = 0;
            $until_loop = $pattern.length;

            /** While loop to Placing data form : */
            while ($i < $until_loop) {

                /** Define fill of pattern_form : */
                var $type = pattern_form[$pattern[$i]]['type'];
                var $html = pattern_form[$pattern[$i]]['html'];
                var $selector = pattern_form[$pattern[$i]]['selector'];
                var $type_place = pattern_form[$pattern[$i]]['type-place'];
                var $value = pattern_form[$pattern[$i]]['value'];
                var $custom_value = pattern_form[$pattern[$i]]['custom-value'];

                //console.log($type);
                //console.log($selector);

                /** Define fill of data_form : */
                var $isi_data_form = $your_dataForm[$pattern[$i]];
                var $search, $replace, $new_isi_form = null;
                //console.log($isi_data_form);

                /** Switch for conditions $type : */
                switch ($type)
                {
                    /** Case for $type == 'input' : */
                    case 'input' :
                        if (typeof $custom_value == 'object') {
                            $i = 0;
                            $until_loop = $custom_value.length;
                            while ($i < $until_loop) {
                                $search = $custom_value[$i]['search'];
                                $replace = $custom_value[$i]['replace'];
                                if ($search == $isi_data_form) {
                                    $new_isi_form = $replace;
                                    break;
                                } else {
                                    $new_isi_form = $isi_data_form;
                                }
                                $i++;
                            }
                            $('input[name="' + $selector + '"]').val($new_isi_form);
                        } else {
                            $('input[name="' + $selector + '"]').val($isi_data_form);
                            var $for_result_input = {"0": $pattern[$i]};
                            $result.push($for_result_input);
                        }
                        break;

                    /** Case for $type == 'textarea' : */
                    case 'textarea' :
                        if (typeof $custom_value == 'object') {
                            $i = 0;
                            $until_loop = $custom_value.length;
                            while ($i < $until_loop) {
                                $search = $custom_value[$i]['search'];
                                $replace = $custom_value[$i]['replace'];
                                if ($search == $isi_data_form) {
                                    $new_isi_form = $replace;
                                    break;
                                } else {
                                    $new_isi_form = $isi_data_form;
                                }
                                $i++;
                            }
                            $('textarea[name="' + $selector + '"]').val($new_isi_form);
                        } else {
                            $('textarea[name="' + $selector + '"]').val($isi_data_form);
                            var $for_result_textarea = {"0": $pattern[$i]};
                            $result.push($for_result_textarea);
                        }
                        break;

                    /** Case for $type == 'select' : */
                    case 'select' :
                        if (typeof $custom_value == 'object') {
                            $i = 0;
                            $until_loop = $custom_value.length;
                            while ($i < $until_loop) {
                                $search = $custom_value[$i]['search'];
                                $replace = $custom_value[$i]['replace'];
                                if ($search == $isi_data_form) {
                                    $new_isi_form = $replace;
                                    break;
                                } else {
                                    $new_isi_form = $isi_data_form;
                                }
                                $i++;
                            }
                            $('select[name="' + $selector + '"]').val($new_isi_form);
                        } else {
                            $('select[name="' + $selector + '"] option[value="' + $isi_data_form + '"]').attr('selected', true).change();
                            var $for_result_select = {"0": $pattern[$i]};
                            $result.push($for_result_select);
                        }
                        break;

                    /** Case for $type == 'select-custom-selector' : */
                    case 'select-custom-selector' :
                        if (typeof $custom_value == 'object') {
                            $i = 0;
                            $until_loop = $custom_value.length;
                            while ($i < $until_loop) {
                                $search = $custom_value[$i]['search'];
                                $replace = $custom_value[$i]['replace'];
                                if ($search == $isi_data_form) {
                                    $new_isi_form = $replace;
                                    break;
                                } else {
                                    $new_isi_form = $isi_data_form;
                                }
                                $i++;
                            }
                            $($selector+' option[value="' + $new_isi_form + '"]').attr('selected', true).change();
                        } else {
                            $($selector+' option[value="' + $isi_data_form + '"]').attr('selected', true).change();
                            var $for_result_select_custom = {"0": $pattern[$i]};
                            $result.push($for_result_select_custom);
                        }

                        console.log($selector+' option[value="' + $isi_data_form + '"]');
                        break;

                    /** Case for $type == 'direct' : */
                    case 'direct' :
                        /** Define variable will be used in this case : */
                        var $for_result_val;

                        /** Switch for conditions $value : */
                        switch ($value)
                        {
                        /** Case for $value == 'attr' : */
                            case 'attr' :

                                /** Switch for conditions $html : */
                                switch ($html) {

                                /** Case for $html == 'img' : */
                                    case 'img' :
                                        if (typeof $custom_value == 'object') {
                                            $i = 0;
                                            $until_loop = Object.keys($custom_value).length;
                                            while ($i < $until_loop) {
                                                $search = $custom_value[$i]['search'];
                                                $replace = $custom_value[$i]['replace'];
                                                if ($search == $isi_data_form) {
                                                    $new_isi_form = $replace;
                                                    break;
                                                } else {
                                                    $new_isi_form = $isi_data_form;
                                                }
                                                $i++;
                                            }
                                            if ($new_isi_form != '') {
                                                $($selector).attr($type_place, $new_isi_form);
                                                //$.NKTI_image_reading($selector, $isi_data_form);
                                                $.NKTI_image_reading_URL($isi_data_form);
                                            }
                                            console.log($new_isi_form);
                                        } else {
                                            if ($isi_data_form != '') {
                                                $($selector).attr($type_place, $isi_data_form);
                                                //$.NKTI_image_reading($selector, $isi_data_form);
                                                $.NKTI_image_reading_URL($isi_data_form);
                                            }
                                            $for_result_val = {"0": $pattern[$i]};
                                            $result.push($for_result_val);
                                            console.log($isi_data_form);
                                        }
                                        break;

                                /** Case for $html == 'a' : */
                                    case 'a' :
                                        if (typeof $custom_value == 'object') {
                                            $i = 0;
                                            $until_loop = Object.keys($custom_value).length;
                                            while ($i < $until_loop) {
                                                $search = $custom_value[$i]['search'];
                                                $replace = $custom_value[$i]['replace'];
                                                if ($search == $isi_data_form) {
                                                    $new_isi_form = $replace;
                                                    break;
                                                } else {
                                                    $new_isi_form = $isi_data_form;
                                                }
                                                $i++;
                                            }
                                            $($selector).attr($type_place, $new_isi_form);
                                        } else {
                                            $($selector).attr($type_place, $isi_data_form);
                                            $for_result_val = {"0": $pattern[$i]};
                                            $result.push($for_result_val);
                                        }
                                        break;

                                /** Default case for $html ==  : */
                                    default  :
                                        if (typeof $custom_value == 'object') {
                                            $i = 0;
                                            $until_loop = Object.keys($custom_value).length;
                                            while ($i < $until_loop) {
                                                $search = $custom_value[$i]['search'];
                                                $replace = $custom_value[$i]['replace'];
                                                if ($search == $isi_data_form) {
                                                    $new_isi_form = $replace;
                                                    break;
                                                } else {
                                                    $new_isi_form = $isi_data_form;
                                                }
                                                $i++;
                                            }
                                            $($selector).attr($type_place, $new_isi_form);
                                        } else {
                                            $($selector).attr($type_place, $isi_data_form);
                                            $for_result_val = {"0": $pattern[$i]};
                                            $result.push($for_result_val);
                                        }
                                        break;
                                } /** End of Switch for conditions $html. */
                                break;

                            /** Case for $value == 'custom-html' : */
                            case 'custom-html' :
                                var $custoM_html = '<'+$custom_value+'>'+$isi_data_form+'</'+$custom_value+'>';
                                $($selector).html($custoM_html);
                                break;

                            /** Case for $value == 'money-curr' : */
                            case 'money-curr' :
                                var $money_format = accounting.formatMoney($isi_data_form, "Rp", 2, ".", ",");
                                $($selector).html('<b>'+$money_format+'</b>');
                                break;

                            /** Case for $value == '' : */
                            case '' :

                                /** Switch for conditions $type_place : */
                                switch ($type_place)
                                {
                                    /** Case for $type_place == 'val' : */
                                    case 'val' :
                                        if (typeof $custom_value == 'object') {
                                            $i = 0;
                                            $until_loop = Object.keys($custom_value).length;
                                            while ($i < $until_loop) {
                                                $search = $custom_value[$i]['search'];
                                                $replace = $custom_value[$i]['replace'];
                                                if ($search == $isi_data_form) {
                                                    $new_isi_form = $replace;
                                                    break;
                                                } else {
                                                    $new_isi_form = $isi_data_form;
                                                }
                                                $i++;
                                            }
                                            $($selector).val( $new_isi_form);
                                        } else {
                                            $($selector).val($isi_data_form);
                                            $for_result_val = {"0": $pattern[$i]};
                                            $result.push($for_result_val);
                                        }
                                        break;

                                    /** Case for $type_place == 'text' : */
                                    case 'text' :
                                        if (typeof $custom_value == 'object') {
                                            $i = 0;
                                            $until_loop = Object.keys($custom_value).length;
                                            while ($i < $until_loop) {
                                                $search = $custom_value[$i]['search'];
                                                $replace = $custom_value[$i]['replace'];
                                                if ($search == $isi_data_form) {
                                                    $new_isi_form = $replace;
                                                    break;
                                                } else {
                                                    $new_isi_form = $isi_data_form;
                                                }
                                                $i++;
                                            }
                                            $($selector).text($new_isi_form);
                                        } else {
                                            $($selector).text($isi_data_form);
                                            $for_result_val = {"0": $pattern[$i]};
                                            $result.push($for_result_val);
                                        }
                                        break;

                                    /** Case for $type_place == 'html' : */
                                    case 'html' :
                                        if (typeof $custom_value == 'object') {
                                            $i = 0;
                                            $until_loop = Object.keys($custom_value).length;
                                            while ($i < $until_loop) {
                                                $search = $custom_value[$i]['search'];
                                                $replace = $custom_value[$i]['replace'];
                                                if ($search == $isi_data_form) {
                                                    $new_isi_form = $replace;
                                                    break;
                                                } else {
                                                    $new_isi_form = $isi_data_form;
                                                }
                                                $i++;
                                            }
                                            $($selector).html( $new_isi_form);
                                        } else {
                                            $($selector).html($isi_data_form);
                                            $for_result_val = {"0": $pattern[$i]};
                                            $result.push($for_result_val);
                                        }
                                        break;
                                }
                                /** End of switch for conditions $type_place. */
                                break;
                        }
                        /** End of switch for conditions $value. */
                        break;
                }
                /** End of switch for conditions $type. */

                /** Auto Increment : */
                $i++;
            }
            /** End of while loop to Placing data form. */

            /** For Return Result : */
            return $result;

        }, /** End of action. */

        /** Pattern For Create item Option in SELECT FORM :
         * --------------------------------------------------------------------------------------------------
         * Function untuk membuat item option di Form SELECT.
         *
         * Format $data_item :
         * ---------------------------------
         * object {
         *     "0" : { id : '', 'class' : '', 'attr' : '', 'style' : '', 'value' : '', 'name' : ''},
         *     "1" : { id : '', 'class' : '', 'attr' : '', 'style' : '', 'value' : '', 'name' : ''},
         * }
         *
         *
         */
        option_select : function($key_data, $data_item, $target_selector) {

            /** Define variable will be used in this function : */
            var id_option, class_option, attr_option, style_option, value_option, name_option, item_option;

            /** Prepare while loop to Create Item Option Form Select : */
            $i = 0;
            $until_loop = $key_data.length;

            /** While loop to Create Item Option Form Select : */
            while ($i < $until_loop) {

                if ($data_item[$i]['id'] != undefined || $data_item[$i]['id'] != '' || $data_item[$i]['id'] != "") { id_option = $data_item[$i]['id']; } else { id_option = ''; }
                if ($data_item[$i]['class'] != undefined || $data_item[$i]['class'] != '' || $data_item[$i]['class'] != "") { class_option = $data_item[$i]['class']; } else { class_option = ''; }
                if ($data_item[$i]['attr'] != undefined || $data_item[$i]['attr'] != '' || $data_item[$i]['attr'] != "") { attr_option = $data_item[$i]['attr']; } else { attr_option = ''; }
                if ($data_item[$i]['style'] != undefined || $data_item[$i]['style'] != '' || $data_item[$i]['style'] != "") { style_option = $data_item[$i]['style']; } else { style_option = ''; }
                if ($data_item[$i]['value'] != undefined || $data_item[$i]['value'] != '' || $data_item[$i]['value'] != "") { value_option = $data_item[$i]['value']; } else { value_option = ''; }
                if ($data_item[$i]['name'] != undefined || $data_item[$i]['name'] != '' || $data_item[$i]['name'] != "") { name_option = $data_item[$i]['name']; } else { name_option = ''; }

                /** Create Item Option : */
                item_option += '<option '+id_option+' '+class_option+' '+attr_option+' value="'+value_option+'" '+style_option+'>'+name_option+'</option>';

                /** Auto Increment : */
                $i++;
            }
            /** End of while loop to Create Item Option Form Select. */

            /** Placing item option on select form : */
            $($target_selector).html(item_option);
        }
    }; /** End of Return Result. */

}();
/** Ending Function Applications for "NKTI Pattern Apps".
 * ========================================================================================================== */

/** Begin Function Apps for "NKTI Form Validation" :
 * -----------------------------------------------------------
 */
jQuery.extend({

    /** For Function Form validation :
     * -----------------------------------------------------------
     *
     * @param $type_form {string} Variable yang berisi tipe form. Ex : 'input' | 'textarea' | 'select'
     * @param $select_form {string} Variabel yang berisi nama form. Ex : $('your_type_form[name="your_name_form]').
     * @param $identified_value {string|integer} Variable yang berisi nilai default jika FORM kosong. Ex : 0 | '' | "".
     * @param $valid_value {string|integer} Variable yang berisi nilai valid FORM Validation
     */
    NKTI_Form_validation : function($type_form, $select_form, $identified_value, $valid_value)
    {
        /** Define variable will be used in this function : */
        var $for_result;
        var $form_loc = $select_form;
        var $val_form = $form_loc.val();

        /** Check IF FORM kosong : */
        if ($val_form == $identified_value || $val_form == undefined || $val_form == null || $val_form == "") {
            $form_loc.css('border', '1px solid #B33C3C');
        }

        /** Switch for conditions $type_form : */
        switch ($type_form) {

            /** Case for $type_form == 'input' AND 'textarea' : */
            case 'textarea' :
            case 'input' :

                if ($form_loc.val() == '') {
                    if ($valid_value != undefined || $valid_value != null || $valid_value != '' || $valid_value != "") {

                        if ($form_loc.val().length > $valid_value) {
                            $(this).css('border', '1px solid #33863C');
                            $for_result = 1
                        } else {
                            $for_result = 0;
                        }
                    }
                    if ($valid_value == undefined || $valid_value == null || $valid_value == '' || $valid_value == "") {

                        if ($form_loc.val().length > 6) {
                            $(this).css('border', '1px solid #33863C');
                            $for_result = 1
                        } else {
                            $for_result = 0;
                        }
                    }
                }
                if ($form_loc.val() != '') {

                    if ($form_loc.val().length > $valid_value) {
                        $(this).css('border', '1px solid #33863C');
                        $for_result = 1
                    } else {
                        $for_result = 0;
                    }
                }
                break;

            /** Case for $type_form == 'select' : */
            case 'select' :
                if ($val_form > $identified_value) {
                    $for_result = 1
                } else {
                    $for_result = 0;
                    $(this).css('border', '1px solid #33863C');
                }
                break;
        }
        /** End of switch for conditions $type_form. */

        /** Return result conditons : */
        return $for_result;
    },

    /** For Function FORM Validation File :
     * -----------------------------------------------------------
     *
     * @param $file_selector {string} Variable yang berisi selector form input file.
     * @param $identified_value {string} Variable yang berisi jenis identifikasi value.
     * @param $default_value {string} Variable yang berisi default value yang dijadikan acuan
     *
     */
    NKTI_Form_validation_file : function($file_selector, $identified_value, $default_value) {

        /** Define variable will be used in this function : */
        var $file_input, $target_result, $value_identified, $value_default;
        var $result_validation;

        /** Check IF $file_selector is defined : */
        if ($file_selector != undefined || $file_selector != null || $file_selector != '' || $file_selector != "") {

            /** Define file selector : */
            $file_input = $file_selector;

            /** Check Identified Value : */
            if ($identified_value != undefined || $identified_value != null || $identified_value != '' || $identified_value != "") {
                $value_identified = $identified_value;
            }
            if ($identified_value == undefined || $identified_value == null || $identified_value == '' || $identified_value == "") {
                $value_identified = 'exist';
            }

            /** Check Default Value : */
            if ($default_value != undefined || $default_value != null || $default_value != '' || $default_value != "") {
                $value_default = $default_value;
            }
            if ($default_value == undefined || $default_value == null || $default_value == '' || $default_value == "") {
                $value_default = '';
            }

            /** Switch for conditions $value_identified : */
            switch ($value_identified) {

                /** Case for $value_identified == 'exist' : */
                case 'exist' :
                    var $id_files = $file_input.attr('id');
                    var $file_loc = document.getElementById($id_files);

                    if ($file_loc.length > 0) {
                        $result_validation = 1;
                    } else {
                        $result_validation = 0;
                    }
                    break;
                /** Case for $value_identified == 'size-all' : */
                case 'size-all' :

                    /** Define variable will be used in this case : */
                    var $id_files_CsizeAll = $file_input.attr('id');
                    var $file_loc_CsizeAll = document.getElementById($id_files_CsizeAll);
                    var $size_Allfiles = 0;

                    if ($file_loc_CsizeAll.length > 0) {

                        /** Prepare while loop to Get size all files : */
                        $i = 0;
                        $until_loop = $file_loc_CsizeAll.length;

                        /** While loop to Get size all files : */
                        while ($i < $until_loop) {

                            $size_Allfiles += $file_loc_CsizeAll[$i].size;

                            /** Auto Increment : */
                            $i++;
                        }
                        /** End of while loop to Get size all files. */

                        /** Check IF $size_Allfiles >= $value_default : */
                        if ($size_Allfiles >= $value_default) {

                            /** Define result validation : */
                            $result_validation = 1;
                        }
                        /** End of check IF $size_Allfiles >= $value_default.*/

                        /** Check IF $value_default : */
                        if ($value_default) {

                            /** Define Result Validation  : */
                            $result_validation = 0;
                        }
                        /** End of check IF $value_default.*/
                    } else {
                        $result_validation = 2;
                    }
                    break;

                /** Case for $value_identified == 'count-file' : */
                case 'count-file' :

                    /** Define variable will be used in this case : */
                    var $id_files_cCount = $file_input.attr('id');
                    var $file_loc_cCount = document.getElementById($id_files_cCount);
                    var $this_files = $file_loc_cCount.files;

                    /** Check IF $this_files.length > $value_default : */
                    if ($this_files.length > $value_default) {

                        /** Define result validation : */
                        $result_validation = 0;
                    } /** End of check IF $this_files.length > $value_default.*/

                    /** Check IF $this_files.length > $value_default : */
                    else {

                        /** Define result validation : */
                        $result_validation = 1;
                    } /** End of check IF $this_files.length > $value_default.*/

                    //console.log($this_files.length);

                    break;

                /** Case for $value_identified == 'width' : */
                case 'width' :
                    var $id_files_cWidth = $file_input.attr('id');
                    var $file_loc_cWidth = document.getElementById($id_files_cWidth);
                    var $this_files_cWidth = $file_loc_cWidth.files;
                    var reader_width = new FileReader();

                    reader_width.onload = function (e) {

                        /** Get Image Size : */
                        var img = new Image;

                        img.onload = function() {
                            if ($value_default == this.width) {
                                $file_input.attr('data-result-validation', 1);
                            } else {
                                $file_input.attr('data-result-validation', 0);
                            }
                        };
                        img.src = reader_width.result; // is the data URL because called with readAsDataURL
                    };

                    reader_width.readAsDataURL($this_files_cWidth[0]);
                    break;

                /** Case for $value_identified == 'height' : */
                case 'height' :
                    var $id_files_cHeight = $file_input.attr('id');
                    var $file_loc_cHeight = document.getElementById($id_files_cHeight);
                    var $this_files_cHeight = $file_loc_cHeight.files;
                    var reader_height = new FileReader();

                    reader_height.onload = function (e) {

                        /** Get Image Size : */
                        var img = new Image;

                        img.onload = function() {
                            if ($value_default == this.height) {
                                $file_input.attr('data-result-validation', 1);
                            } else {
                                $file_input.attr('data-result-validation', 0);
                            }
                            //alert(img.width); // image is loaded; sizes are available
                        };

                        img.src = reader_height.result; // is the data URL because called with readAsDataURL
                    };
                    reader_height.readAsDataURL($this_files_cHeight[0]);
                    break;

                /** Case for $value_identified == 'wnh' : */
                case 'wnh' :
                    var $id_files_cWnH = $file_input.attr('id');
                    var $file_loc_cWnH = document.getElementById($id_files_cWnH);
                    var $this_files_cWnH = $file_loc_cWnH.files;
                    var reader_wnh = new FileReader();

                    reader_wnh.onload = function (e) {

                        /** Get Image Size : */
                        var img = new Image;

                        img.onload = function() {
                            if ($value_default == this.height) {
                                $file_input.attr('data-result-validation', 1);
                            } else {
                                $file_input.attr('data-result-validation', 0);
                            }
                            //alert(img.width); // image is loaded; sizes are available
                        };

                        img.src = reader_wnh.result; // is the data URL because called with readAsDataURL
                    };
                    reader_wnh.readAsDataURL($this_files_cWnH[0]);
                    break;
            }
            /** End of switch for conditions $value_identified. */


        } /** End of check IF $file_selector is defined */

        /** Check IF $file_selector is undefined : */
        if ($file_selector == undefined || $file_selector == null || $file_selector == '' || $file_selector == "") {
            console.log('File Input Selector is undefined');
        } /** End of check IF $file_selector is undefined. */

        /** Return Result validation : */
        return $result_validation;

    },

    /** For Function FORM must give valid value :
     * -----------------------------------------------------------
     *
     * @param $selector {string} Variable yang berisi selector form input. Ex : 'input[name="YourName_Form"]'.
     * @param $count_parent {integer} Variable yang berisi jumlah parent tag HTML hinggal menemukan
     *                                tag "LABEL".
     * @param $color_label {string} Variable yang berisi class css color label. Ex : text-red | text-blue.
     * @param $coloring_method {string} Variable yang berisi metode coloring. Ex : attr | class
     */
    NKTI_FORM_must_valid_value : function($selector, $count_parent, $color_label, $coloring_method) {

        /** Define variable will be used in this function : */
        var $form_selector, $countOf_parent, $colorLabel, $method_coloring, $result_action;

        /** Check IF $selector is defined : */
        if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {
            
            /** Define variable for Selector FORM : */
            $form_selector = $selector;

            /** Check IF $count_parent is defined : */
            if ($count_parent != undefined || $count_parent != null || $count_parent != '' || $count_parent != "") {

                /** Define variable for Count of parent : */
                $countOf_parent = $count_parent;

                /** Check IF $color_label is defined : */
                if ($color_label != undefined || $color_label != null || $color_label != '' || $color_label != "") {
                    $colorLabel = $color_label;
                }
                /** End of Check IF $color_label is defined. */

                /** Check IF $color_label is undefined : */
                if ($color_label == undefined || $color_label == null || $color_label == '' || $color_label == "") {
                    $colorLabel = 'text-red';
                }
                /** End of Check IF $color_label is undefined. */

                /** Check IF $coloring_method is defined : */
                if ($coloring_method != undefined || $coloring_method != null || $coloring_method != '' || $coloring_method != "") {
                    $method_coloring = $coloring_method;
                }
                /** End of Check IF $coloring_method is defined. */

                /** Check IF $coloring_method is undefined : */
                if ($coloring_method == undefined || $coloring_method == null || $coloring_method == '' || $coloring_method == "") {
                    $method_coloring = 'class';
                }
                /** End of Check IF $coloring_method is undefined. */


                /** Define variable to prepare give simbol "important" of label : */
                var $the_selector = $($form_selector);
                var $loc_label;

                /** Switch for conditions $countOf_parent : */
                switch ($countOf_parent) {
                /** Case for $countOf_parent == 1 : */
                    case 1 :
                        $loc_label = $the_selector.parent().children('label');

                        if ($method_coloring == 'attr') {
                            $loc_label.attr('data-color-must', $colorLabel);
                        }
                        if ($method_coloring == 'class') {
                            if ($loc_label.hasClass($colorLabel)) {
                                $loc_label.removeClass($colorLabel);
                                $loc_label.addClass($colorLabel);
                            } else {
                                $loc_label.addClass($colorLabel);
                            }
                        }
                        $result_action = 11;
                        break;

                /** Case for $countOf_parent == 2 : */
                    case 2 :
                        $loc_label = $the_selector.parent().parent().children('label');

                        if ($method_coloring == 'attr') {
                            $loc_label.attr('data-color-must', $colorLabel);
                        }
                        if ($method_coloring == 'class') {
                            if ($loc_label.hasClass($colorLabel)) {
                                $loc_label.removeClass($colorLabel);
                                $loc_label.addClass($colorLabel);
                            } else {
                                $loc_label.addClass($colorLabel);
                            }
                        }
                        $result_action = 12;
                        break;

                /** Case for $countOf_parent == 3 : */
                    case 3 :
                        $loc_label = $the_selector.parent().parent().parent().children('label');

                        if ($method_coloring == 'attr') {
                            $loc_label.attr('data-color-must', $colorLabel);
                        }
                        if ($method_coloring == 'class') {
                            if ($loc_label.hasClass($colorLabel)) {
                                $loc_label.removeClass($colorLabel);
                                $loc_label.addClass($colorLabel);
                            } else {
                                $loc_label.addClass($colorLabel);
                            }
                        }
                        $result_action = 13;
                        break;

                /** Case for $countOf_parent == 4 : */
                    case 4 :
                        $loc_label = $the_selector.parent().parent().parent().parent().children('label');

                        if ($method_coloring == 'attr') {
                            $loc_label.attr('data-color-must', $colorLabel);
                        }
                        if ($method_coloring == 'class') {
                            if ($loc_label.hasClass($colorLabel)) {
                                $loc_label.removeClass($colorLabel);
                                $loc_label.addClass($colorLabel);
                            } else {
                                $loc_label.addClass($colorLabel);
                            }
                        }
                        $result_action = 14;
                        break;

                /** Case for $countOf_parent == 5 : */
                    case 5 :
                        $loc_label = $the_selector.parent().parent().parent().parent().parent().children('label');

                        if ($method_coloring == 'attr') {
                            $loc_label.attr('data-color-must', $colorLabel);
                        }
                        if ($method_coloring == 'class') {
                            if ($loc_label.hasClass($colorLabel)) {
                                $loc_label.removeClass($colorLabel);
                                $loc_label.addClass($colorLabel);
                            } else {
                                $loc_label.addClass($colorLabel);
                            }
                        }
                        $result_action = 15;
                        break;
                } /** End of switch for conditions $countOf_parent. */
            } /** End of Check IF $count_parent is defined. */

            /** Check IF $count_parent is undefined : */
            if ($count_parent == undefined || $count_parent == null || $count_parent == '' || $count_parent == "") {
                $result_action = 0;
                console.error('Parameter $count_parent is undefined !!!');
            } /** End of Check IF $count_parent is undefined. */
        } /** End of check IF $selector is defined. */

        /** Check IF $selector is undefined : */
        if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {
            $result_action = 1;
            console.error('Selector is undefined !!!');
        } /** End of check IF $selector is undefined. */

        /** Return Result : */
        return $result_action;
    }

});
/** End of Function Apps for "NKTI Form Validation".
 * ===================================================================================================== */

/** Begin Function Apps for "NKTI View Multiple Image: :
 * -----------------------------------------------------------
 */
jQuery.extend({

    /** For View Multiple Image :
     * -----------------------------------------------------------
     *
     * @param $place_item {string} Berisi selector Place item. Ex : 'div#ID_tag';
     * @param $size_image_view {integer} Berisi nilai ukuran Image View. Ex : 3 - 12.
     * @param $height_of_img {string} Berisi ukuran tinggi Img.
     * @param $prefix_id_wrap {string} berisi prefix id wrap img. Ex : 'your-prefix-wrapimg_';
     * @param $prefix_id {string} berisi prefix id img. Ex : 'your-prefiximg_'
     * @param $files_loc {object} Berisi object Image. Ex : "input.files";
     */
    NKTI_image_multiple : function($place_item, $size_image_view, $height_of_img, $prefix_id_wrap, $prefix_id, $files_loc) {

        /** Define variable will be used in this function : */
        var $target_place, $size_img_view, $height_size_img, $file_input;
        var $id_wrap_prefix_img, $id_prefix_img;

        /** Check IF $place_item tidak kosong : */
        if ($place_item != undefined || $place_item != null || $place_item != '' || $place_item != "") {

            /** Define variable will be used in this condition : */
            $target_place = $place_item;

            /** Check For $size_image_view : */
            if ($size_image_view != undefined || $size_image_view != null || $size_image_view != '' || $size_image_view != "") {
                $size_img_view = $size_image_view;
            }
            if ($size_image_view == undefined || $size_image_view == null || $size_image_view == '' || $size_image_view == "") {
                $size_img_view = 6;
            }

            /** Check For $height_of_img : */
            if ($height_of_img != undefined || $height_of_img != null || $height_of_img != '' || $height_of_img != "") {
                $height_size_img = $height_of_img;
            }
            if ($height_of_img == undefined || $height_of_img == null || $height_of_img == '' || $height_of_img == "") {
                $height_size_img = '150px';
            }

            /** Check For $files_loc tidak kosong : */
            if ($files_loc != undefined || $files_loc != null || $files_loc != '' || $files_loc != "") {
                $file_input = $files_loc;

                /** Check IF $file_input == object : */
                if (typeof $file_input == "object") {
                    
                    /** For Prefix ID : */
                    if ($prefix_id_wrap != undefined || $prefix_id_wrap != null || $prefix_id_wrap != '' || $prefix_id_wrap != "") {
                        $id_wrap_prefix_img = $prefix_id_wrap;
                    }
                    if ($prefix_id_wrap == undefined || $prefix_id_wrap == null || $prefix_id_wrap == '' || $prefix_id_wrap == "") {
                        $id_wrap_prefix_img = 'wrap-image-view_';
                    }

                    if ($prefix_id != undefined || $prefix_id != null || $prefix_id != '' || $prefix_id != "") {
                        $id_prefix_img = $prefix_id;
                    }
                    if ($prefix_id == undefined || $prefix_id == null || $prefix_id == '' || $prefix_id == "") {
                        $id_prefix_img = 'image-view_';
                    }

                    /** Prepare while loop to Create Image : */
                    $i = 0;
                    $until_loop = $file_input.length;

                    /** While loop to Create Image : */
                    while ($i < $until_loop) {

                        /** Define variable will be used in this loop : */
                        var $new_id_prefix_wrap = $id_wrap_prefix_img+'node-'+$i;
                        var $new_id_prefix = $id_prefix_img+'node-'+$i;

                        /** Create Attribute Wrapper Image : */
                        var $attr_wrap_image = {
                            'id': $new_id_prefix_wrap,
                            'class': '',
                            'attr': '',
                            'style': ''
                        };

                        /** Create Attributes Image : */
                        var $attr_image = {
                            'id': $new_id_prefix,
                            'class': '',
                            'attr': '',
                            'style': ''
                        };

                        /** Create Item Image : */
                        $.NKTI_image_item_view($target_place, $size_img_view, '20%', $attr_wrap_image, $attr_image);

                        /** Read Image View : */
                        $.NKTI_image_reading('#'+$new_id_prefix, $file_input[$i]);

                         /** Auto Increment : */
                        $i++;
                    } /** End of while loop to Create Image. */
                } /** End of check IF $file_input == object. */

                /** Check IF $file_input != object : */
                if (typeof $file_input != "object") {
                    console.log('File Input is not object.');
                }  /** End of check IF $file_input != object.*/
            } /** End of check for files_loc tidak kosong. */

            /** Check for files_loc kosong. */
            if ($files_loc == undefined || $files_loc == null || $files_loc == '' || $files_loc == "") {
                console.log('File input is Undefined');
            } /** End of check for files_loc kosong. */
        } /** End of check iF $place_item tidak kosong. */

        /** Check IF $place_item kosong : */
        if ($place_item == undefined || $place_item == null || $place_item == '' || $place_item == "") {
            console.log('Target Place Item Undefined');
        }/** End of check iF $place_item kosong. */

    },

    /** For Item Image View :
     * -----------------------------------------------------------
     *
     * Format $attr_wrap_img :
     * -------------------------------------
     * object {
     *      'id' : [],
     *      'class : [],
     *      'attr' : [],
     *      'style' : []
     * }
     *
     * Format $attr_img :
     * -------------------------------------
     * object {
     *      'id' : [],
     *      'class : [],
     *      'attr' : [],
     *      'style' : []
     * }
     *
     * @param $place_item {string} Berisi target lokasi penempatan Image.
     * @param $size_image_view {string} Berisi ukuran image view. Ex : 3 - 12.
     * @param $height_size {string} Berisi nilai ukuran wrap image. Ex : 200px | [20% - 100%] .
     * @param $attr_wrap_img {object} Berisi config attribute wrapper image.
     * @param $attr_img {object} Berisi config attribute image.
     *
     */
    NKTI_image_item_view : function($place_item, $size_image_view, $height_size, $attr_wrap_img, $attr_img) {

        /** Define variable will be used in this function : */
        var $target_place, $size_image, $size_height_image;
        var $id_wrap, $class_wrap, $attr_wrap, $style_wrap, $attribute_wraps_images;
        var $id, $class, $attr, $style, $attributes_img;
        var $size_lg_view, $size_sm_view, $size_xs_view, $new_size_view;

        /** Check IF $place_item not null : */
        if ($place_item != undefined || $place_item != null || $place_item != '' || $place_item != "") {
            $target_place = $place_item;

            /** For this Parameter : */
            if ($size_image_view != undefined || $size_image_view != null || $size_image_view != '' || $size_image_view != "") {
                $size_image = $size_image_view;
            }
            if ($size_image_view == undefined || $size_image_view == null || $size_image_view == '' || $size_image_view == "") {
                $size_image = 6;
            }
            if ($height_size != undefined || $height_size != null || $height_size != '' || $height_size != "") {
                $size_height_image = $height_size;
            }
            if ($height_size == undefined || $height_size == null || $height_size == '' || $height_size == "") {
                $size_height_image = 200;
            }

            /** Define size of image wrapper : */
            if ($size_image < 3) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image - 1;
            }
            if ($size_image > 3 && $size_image < 5) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 2;
                $size_lg_view = $size_image - 2;
            }
            if ($size_image > 5 && $size_image < 7) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 3;
                $size_lg_view = $size_image - 3;
            }
            if ($size_image > 7 && $size_image < 11) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image / 2;
            }
            if ($size_image > 11) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image / 2;
            }
            if ($size_image == 3) {
                $size_sm_view = $size_image;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image - 2;
            }
            if ($size_image == 5) {
                $size_sm_view = $size_image;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image - 3;
            }
            if ($size_image == 7) {
                $size_sm_view = $size_image;
                $size_xs_view = $size_image;
                $size_lg_view = $size_image - 3;
            }
            if ($size_image == 11) {
                $size_sm_view = $size_image;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image - 4;
            }

            /** For this Parameter Attribute Wrap img TAG : */
            if (typeof $attr_wrap_img == "object") {
                $id_wrap = 'id="'+$attr_wrap_img['id']+'"';
                $class_wrap = 'class="col-md-'+$size_image+' '+$attr_wrap_img['class']+'"';
                $attr_wrap = $attr_wrap_img['attr'];
                $style_wrap = 'style="'+$attr_wrap_img['style']+'"';

                $attribute_wraps_images = $id_wrap+' '+$class_wrap+' '+$attr_wrap+' '+$style_wrap+'';
            }
            if (typeof $attr_wrap_img != "object") {
                $attribute_wraps_images = 'class="col-lg-'+$size_lg_view+' col-sm-'+$size_xs_view+' col-sm-'+$size_sm_view+' col-md-'+$size_image+'"';
            }

            /** For this Parameter Attribute img TAG : */
            if (typeof $attr_img == "object") {
                $id = 'id="'+$attr_img['id']+'"';
                $class = 'class="'+$attr_img['class']+'"';
                $attr = $attr_img['class'];
                $style = 'style="width: 100%; height: '+$size_height_image+'px; '+$attr_img['style']+'"';
                $attributes_img = $id+' '+$class+' '+$attr+' '+$style;
            }
            if (typeof $attr_img != "object") {
                $attributes_img = 'style="width: 100%; height: '+$size_height_image+';"';
            }

            var $item_image = '<div '+$attribute_wraps_images+'>' +
                '<div class="thumbnail">' +
                '<img alt="" '+$attributes_img+'>' +
                '</div>' +
                '</div>';

            /** Define variable for count of children $target_place : */
            var $count_of_target_place = $($target_place).children().length;
            //console.log('sekarang : ' + $count_of_target_place);

            /** Check Fill $target_place : */
            if ($count_of_target_place == 0) {
                $($target_place).html($item_image);
                //console.log('belum ada');
            }
            if ($count_of_target_place > 0) {
                $($target_place).append($item_image);
                //console.log('sudah ada');
            }
        }
        if ($place_item == undefined || $place_item == null || $place_item == '' || $place_item == "") {
            console.log('undefined target location image');
        }
    },

    /** For Item Image View :
     * -----------------------------------------------------------
     *
     * Format $attr_wrap_img :
     * -------------------------------------
     * object {
     *      'id' : [],
     *      'class : [],
     *      'attr' : [],
     *      'style' : []
     * }
     *
     * Format $attr_img :
     * -------------------------------------
     * object {
     *      'id' : [],
     *      'class : [],
     *      'attr' : [],
     *      'style' : []
     * }
     *
     * @param $place_item {string} Berisi target lokasi penempatan Image.
     * @param $size_image_view {string} Berisi ukuran image view. Ex : 3 - 12.
     * @param $width_size {string} Berisi nilai ukuran wrap image. Ex : 200px | [20% - 100%] .
     * @param $height_size {string} Berisi nilai ukuran wrap image. Ex : 200px | [20% - 100%] .
     * @param $attr_wrap_img {object} Berisi config attribute wrapper image.
     * @param $attr_img {object} Berisi config attribute image.
     *
     */
    NKTI_image_item_view_custom_size : function($place_item, $size_image_view, $width_size, $height_size, $attr_wrap_img, $attr_img) {

        /** Define variable will be used in this function : */
        var $target_place, $size_image, $size_width_image, $size_height_image;
        var $id_wrap, $class_wrap, $attr_wrap, $style_wrap, $attribute_wraps_images;
        var $id, $class, $attr, $style, $attributes_img;
        var $size_lg_view, $size_sm_view, $size_xs_view, $new_size_view;

        /** Check IF $place_item not null : */
        if ($place_item != undefined || $place_item != null || $place_item != '' || $place_item != "") {
            $target_place = $place_item;

            /** For this Parameter : */
            if ($size_image_view != undefined || $size_image_view != null || $size_image_view != '' || $size_image_view != "") {
                $size_image = $size_image_view;
            }
            if ($size_image_view == undefined || $size_image_view == null || $size_image_view == '' || $size_image_view == "") {
                $size_image = 6;
            }
            if ($width_size != undefined || $width_size != null || $width_size != '' || $width_size != "") {
                $size_width_image = 'width: '+$width_size+';';
            }
            if ($width_size == undefined || $width_size == null || $width_size == '' || $width_size == "") {
                $size_width_image = '';
            }
            if ($height_size != undefined || $height_size != null || $height_size != '' || $height_size != "") {
                $size_height_image = 'height: '+$height_size;
            }
            if ($height_size == undefined || $height_size == null || $height_size == '' || $height_size == "") {
                $size_height_image = '';
            }

            /** Define size of image wrapper : */
            if ($size_image < 3) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image - 1;
            }
            if ($size_image > 3 && $size_image < 5) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 2;
                $size_lg_view = $size_image - 2;
            }
            if ($size_image > 5 && $size_image < 7) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 3;
                $size_lg_view = $size_image - 3;
            }
            if ($size_image > 7 && $size_image < 11) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image / 2;
            }
            if ($size_image > 11) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image / 2;
            }
            if ($size_image == 3) {
                $size_sm_view = $size_image;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image - 2;
            }
            if ($size_image == 5) {
                $size_sm_view = $size_image;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image - 3;
            }
            if ($size_image == 7) {
                $size_sm_view = $size_image;
                $size_xs_view = $size_image;
                $size_lg_view = $size_image - 3;
            }
            if ($size_image == 11) {
                $size_sm_view = $size_image;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image - 4;
            }

            /** For this Parameter Attribute Wrap img TAG : */
            if (typeof $attr_wrap_img == "object") {
                $id_wrap = 'id="'+$attr_wrap_img['id']+'"';
                $class_wrap = 'class="col-md-'+$size_image+' '+$attr_wrap_img['class']+'"';
                $attr_wrap = $attr_wrap_img['attr'];
                $style_wrap = 'style="'+$attr_wrap_img['style']+'"';

                $attribute_wraps_images = $id_wrap+' '+$class_wrap+' '+$attr_wrap+' '+$style_wrap+'';
            }
            if (typeof $attr_wrap_img != "object") {
                $attribute_wraps_images = 'class="col-lg-'+$size_lg_view+' col-sm-'+$size_xs_view+' col-sm-'+$size_sm_view+' col-md-'+$size_image+'"';
            }

            /** For this Parameter Attribute img TAG : */
            if (typeof $attr_img == "object") {
                $id = 'id="'+$attr_img['id']+'"';
                $class = 'class="'+$attr_img['class']+'"';
                $attr = $attr_img['class'];
                $style = 'style="'+$size_width_image+'; '+$size_height_image+''+$attr_img['style']+'"';
                $attributes_img = $id+' '+$class+' '+$attr+' '+$style;
            }
            if (typeof $attr_img != "object") {
                $attributes_img = 'style="'+$size_width_image+'; '+$size_height_image+';"';
            }

            var $item_image = '<div '+$attribute_wraps_images+'>' +
                '<div class="thumbnail">' +
                '<img '+$attributes_img+'>' +
                '</div>' +
                '</div>';

            /** Define variable for count of children $target_place : */
            var $count_of_target_place = $($target_place).children().length;
            //console.log('sekarang : ' + $count_of_target_place);

            /** Check Fill $target_place : */
            if ($count_of_target_place == 0) {
                $($target_place).html($item_image);
                //console.log('belum ada');
            }
            if ($count_of_target_place > 0) {
                $($target_place).append($item_image);
                //console.log('sudah ada');
            }
        }
        if ($place_item == undefined || $place_item == null || $place_item == '' || $place_item == "") {
            console.log('undefined target location image');
        }
    },

    /** For Item Image View :
     * -----------------------------------------------------------
     *
     * Format $attr_wrap_img :
     * -------------------------------------
     * object {
     *      'id' : [],
     *      'class : [],
     *      'attr' : [],
     *      'style' : []
     * }
     *
     * Format $attr_img :
     * -------------------------------------
     * object {
     *      'id' : [],
     *      'class : [],
     *      'attr' : [],
     *      'style' : []
     * }
     *
     * @param $place_item {string} Berisi target lokasi penempatan Image.
     * @param $size_image_view {string} Berisi ukuran image view. Ex : 3 - 12.
     * @param $width_size {string} Berisi nilai ukuran wrap image. Ex : 200px | [20% - 100%] .
     * @param $height_size {string} Berisi nilai ukuran wrap image. Ex : 200px | [20% - 100%] .
     * @param $attr_wrap_img {object} Berisi config attribute wrapper image.
     * @param $attr_img {object} Berisi config attribute image.
     *
     */
    NKTI_image_item_view_width : function($place_item, $size_image_view, $width_size, $height_size, $attr_wrap_img, $attr_img) {

        /** Define variable will be used in this function : */
        var $target_place, $size_image, $size_width_image, $size_height_image;
        var $id_wrap, $class_wrap, $attr_wrap, $style_wrap, $attribute_wraps_images;
        var $id, $class, $attr, $style, $attributes_img;
        var $size_lg_view, $size_sm_view, $size_xs_view, $new_size_view;

        /** Check IF $place_item not null : */
        if ($place_item != undefined || $place_item != null || $place_item != '' || $place_item != "") {
            $target_place = $place_item;

            /** For this Parameter : */
            if ($size_image_view != undefined || $size_image_view != null || $size_image_view != '' || $size_image_view != "") {
                $size_image = $size_image_view;
            }
            if ($size_image_view == undefined || $size_image_view == null || $size_image_view == '' || $size_image_view == "") {
                $size_image = 6;
            }
            if ($width_size != undefined || $width_size != null || $width_size != '' || $width_size != "") {
                $size_width_image = 'width: '+$width_size+';';
            }
            if ($width_size == undefined || $width_size == null || $width_size == '' || $width_size == "") {
                $size_width_image = '';
            }
            if ($height_size != undefined || $height_size != null || $height_size != '' || $height_size != "") {
                $size_height_image = $height_size;
            }
            if ($height_size == undefined || $height_size == null || $height_size == '' || $height_size == "") {
                $size_height_image = 200;
            }

            /** Define size of image wrapper : */
            if ($size_image < 3) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image - 1;
            }
            if ($size_image > 3 && $size_image < 5) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 2;
                $size_lg_view = $size_image - 2;
            }
            if ($size_image > 5 && $size_image < 7) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 3;
                $size_lg_view = $size_image - 3;
            }
            if ($size_image > 7 && $size_image < 11) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image / 2;
            }
            if ($size_image > 11) {
                $size_sm_view = $size_image + 1;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image / 2;
            }
            if ($size_image == 3) {
                $size_sm_view = $size_image;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image - 2;
            }
            if ($size_image == 5) {
                $size_sm_view = $size_image;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image - 3;
            }
            if ($size_image == 7) {
                $size_sm_view = $size_image;
                $size_xs_view = $size_image;
                $size_lg_view = $size_image - 3;
            }
            if ($size_image == 11) {
                $size_sm_view = $size_image;
                $size_xs_view = $size_image + 1;
                $size_lg_view = $size_image - 4;
            }

            /** For this Parameter Attribute Wrap img TAG : */
            if (typeof $attr_wrap_img == "object") {
                $id_wrap = 'id="'+$attr_wrap_img['id']+'"';
                $class_wrap = 'class="col-md-'+$size_image+' '+$attr_wrap_img['class']+'"';
                $attr_wrap = $attr_wrap_img['attr'];
                $style_wrap = 'style="'+$attr_wrap_img['style']+'"';

                $attribute_wraps_images = $id_wrap+' '+$class_wrap+' '+$attr_wrap+' '+$style_wrap+'';
            }
            if (typeof $attr_wrap_img != "object") {
                $attribute_wraps_images = 'class="col-lg-'+$size_lg_view+' col-sm-'+$size_xs_view+' col-sm-'+$size_sm_view+' col-md-'+$size_image+'"';
            }

            /** For this Parameter Attribute img TAG : */
            if (typeof $attr_img == "object") {
                $id = 'id="'+$attr_img['id']+'"';
                $class = 'class="'+$attr_img['class']+'"';
                $attr = $attr_img['class'];
                $style = 'style="'+$size_width_image+'; height: '+$size_height_image+'px; '+$attr_img['style']+'"';
                $attributes_img = $id+' '+$class+' '+$attr+' '+$style;
            }
            if (typeof $attr_img != "object") {
                $attributes_img = 'style="'+$size_width_image+' height: '+$size_height_image+';"';
            }

            var $item_image = '<div '+$attribute_wraps_images+'>' +
                '<div class="thumbnail">' +
                '<img '+$attributes_img+'>' +
                '</div>' +
                '</div>';

            console.log($item_image);

            /** Define variable for count of children $target_place : */
            var $count_of_target_place = $($target_place).children().length;
            //console.log('sekarang : ' + $count_of_target_place);

            /** Check Fill $target_place : */
            if ($count_of_target_place == 0) {
                $($target_place).html($item_image);
                //console.log('belum ada');
            }
            if ($count_of_target_place > 0) {
                $($target_place).append($item_image);
                //console.log('sudah ada');
            }
        }
        if ($place_item == undefined || $place_item == null || $place_item == '' || $place_item == "") {
            console.log('undefined target location image');
        }
    },

    /** For Read Image View :
     * -----------------------------------------------------------
     *
     * @param $your_selector {string} Parameter yang berisi selector image location.
     * @param $your_url_files {string} Parameter yang berisi URL File yang akan diload. Ex : 'your_id.files[0]'
     */
    NKTI_image_reading: function($your_selector, $your_url_files) {

        var reader = new FileReader();

        reader.onload = function (e) {
            var $target_result = e.target.result +'?'+Math.floor(Date.now() / 1000);
            $($your_selector).attr('src', e.target.result);
        };

        reader.readAsDataURL($your_url_files);

    },

    /** For Read Image View With Callback :
     * -----------------------------------------------------------
     *
     * @param $your_selector {string} Parameter yang berisi selector image location.
     * @param $your_url_files {string} Parameter yang berisi URL File yang akan diload. Ex : 'your_id.files[0]'
     * @param $callback {function} Parameter yang berisi function untuk callback
     */
    NKTI_image_reading_with_callback: function($your_selector, $your_url_files, $callback) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var $target_result = e.target.result +'?'+Math.floor(Date.now() / 1000);
            $($your_selector).attr('src', e.target.result);

            /** Get Image Size : */
            var img = new Image;

            img.onload = function() {
                $($your_selector).attr('data-img-width', this.width);
                $($your_selector).attr('data-img-height', this.height);
                //alert(img.width); // image is loaded; sizes are available
            };

            img.src = reader.result; // is the data URL because called with readAsDataURL=
        };

        if (typeof $callback == "function") {
            $callback.apply(reader, this);
        }

        reader.readAsDataURL($your_url_files);
    },

    /** For Read Image For Reading Validation With Callback :
     * -----------------------------------------------------------
     *
     * @param $your_selector {string} Parameter yang berisi selector image location.
     * @param $your_url_files {string} Parameter yang berisi URL File yang akan diload. Ex : 'your_id.files[0]'
     */
    NKTI_image_reading_for_validation: function($your_selector, $your_url_files, $) {

        var reader = new FileReader();
        var $result;

        reader.onload = function (e) {
            var $target_result = e.target.result +'?'+Math.floor(Date.now() / 1000);
            $($your_selector).attr('src', e.target.result);

            /** Get Image Size : */
            var img = new Image;

            img.onload = function() {
                $($your_selector).attr('data-img-width', this.width);
                $($your_selector).attr('data-img-height', this.height);
                //alert(img.width); // image is loaded; sizes are available
            };

            img.src = reader.result; // is the data URL because called with readAsDataURL
        };

        reader.readAsDataURL($your_url_files);
    },

    /** For Read URL Image :
     * -----------------------------------------------------------
     */
    NKTI_image_reading_URL: function($url_image) {

        /** Define variable will be used in this function : */
        var image = new Image();
        image.src = $url_image;

    },
    /** End of For Read URL Image.
     * ===================================================================================================== */

    /** For HTML Entities :
     * ----------------------------------------------------------- */
    NKTI_htmlentities: function (str) {

        /** Clean HTML Entities : */
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    /** End of For HTML Entities.
     * ===================================================================================================== */

});
/** End of Function Apps for "NKTI View Multiple Image:.
 * ===================================================================================================== */

/** Begin Function Application for NKTI Application For Image :
 * -------------------------------------------------------------------------
 */
var NKTI_image = function() {

    /** For Return in this application :
     * ----------------------------------------------------------- */
    return {

        /** Property for read Image :
         * -----------------------------------------------------------
         *
         * @param $your_selector {string} Parameter yang berisi selector image location.
         * @param $your_url_files {string} Parameter yang berisi URL File yang akan diload. Ex : 'your_id.files[0]'
         */
        readImage : function($your_selector, $your_url_files) {

            var reader = new FileReader();

            reader.onload = function (e) {
                $($your_selector).attr('src', e.target.result);
            };

            reader.readAsDataURL($your_url_files);
        }

    }; /** End of Return Result. */

}();
/** End of Begin Function Application for NKTI Application For Image.
 * ===================================================================================================== */

/** Begin function Application for Table :
 * -----------------------------------------------------------
 */
jQuery.extend({

    /** For Create Table data :
     * -----------------------------------------------------------
     *
     *
     * @param $data_config_wrap {object} Variable yang berisi data config untuk pembuatan attribute table.
     * @param $data_config {object} Variable yang berisi data config untuk pembuatan table.
     * @param $selector {string} Variable yang berisi nama selector untuk table data.
     * @config {object} [Data_Wrap_Table] {
     *      'wrap' : {
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *      },
     *      'filter' : {
     *          'config' : {
     *              'id' : '',
     *              'class' : '',
     *              'attr' : '',
     *              'style' : '',
     *          },
     *          'data' : {
     *              'count' : {
     *                  'config' : {
     *                      'id' : '',
     *                      'class' : '',
     *                      'attr' : '',
     *                      'style' : '',
     *                  }
     *                  'min-count' : '',
     *                  'max-count' : '',
     *              }
     *          }
     *      },
     * }
     * @config {object} [Data_Config] {
     *      'table' : {}
     *      'header' : {}
     *      'content' : {}
     * }
     */
    NKTI_Table_data: function ($data_config_wrap, $data_config, $selector) {

        /** Define variable will be used in this function : */
        var $config_wrap_table, $config_table_data, $target_place, $result_table = '', $result;

        /** Check IF $data_config_wrap is defined : */
        if ($data_config_wrap != undefined || $data_config_wrap != null || $data_config_wrap != '' || $data_config_wrap != "") {

            /** Define variable for Config Wrapper Table */
            $config_wrap_table = $data_config_wrap;

            /** Check IF $data_config is defined : */
            if ($data_config != undefined || $data_config != null || $data_config != '' || $data_config != "") {

                /** Define variable for target place result table : */
                $target_place = $selector;

                /** Define variable for attribute wrapper table */
                var $id_wrap, $class_wrap, $attr_wrap, $style_wrap;
                var $filter;

                // FOR Wrapper Table :
                // ==================================================================================================

                /** Check FOR $config_wrap_table['wrap']['id'] : */
                if ($config_wrap_table['wrap']['id'] != undefined || $config_wrap_table['wrap']['id'] != null || $config_wrap_table['wrap']['id'] != '' || $config_wrap_table['wrap']['id'] != "") {
                    $id_wrap = ' id="'+$config_wrap_table['wrap']['id']+'" ';
                }
                if ($config_wrap_table['wrap']['id'] == undefined || $config_wrap_table['wrap']['id'] == null || $config_wrap_table['wrap']['id'] == '' || $config_wrap_table['wrap']['id'] == "") {
                    $id_wrap = ' ';
                }

                /** Check FOR $config_wrap_table['wrap']['class'] : */
                if ($config_wrap_table['wrap']['class'] != undefined || $config_wrap_table['wrap']['class'] != null || $config_wrap_table['wrap']['class'] != '' || $config_wrap_table['wrap']['class'] != "") {
                    $class_wrap = ' class="'+$config_wrap_table['wrap']['class']+'" ';
                }
                if ($config_wrap_table['wrap']['class'] == undefined || $config_wrap_table['wrap']['class'] == null || $config_wrap_table['wrap']['class'] == '' || $config_wrap_table['wrap']['class'] == "") {
                    $class_wrap = '';
                }

                /** Check FOR $config_wrap_table['wrap']['attr'] : */
                if ($config_wrap_table['wrap']['attr'] != undefined || $config_wrap_table['wrap']['attr'] != null || $config_wrap_table['wrap']['attr'] != '' || $config_wrap_table['wrap']['attr'] != "") {
                    $attr_wrap = ' '+$config_wrap_table['wrap']['attr']+' ';
                }
                if ($config_wrap_table['wrap']['attr'] == undefined || $config_wrap_table['wrap']['attr'] == null || $config_wrap_table['wrap']['attr'] == '' || $config_wrap_table['wrap']['attr'] == "") {
                    $attr_wrap = '';
                }

                /** Check FOR $config_wrap_table['wrap']['style'] : */
                if ($config_wrap_table['wrap']['style'] != undefined || $config_wrap_table['wrap']['style'] != null || $config_wrap_table['wrap']['style'] != '' || $config_wrap_table['wrap']['style'] != "") {
                    $style_wrap = ' style="'+$config_wrap_table['wrap']['style']+'" ';
                }
                if ($config_wrap_table['wrap']['style'] == undefined || $config_wrap_table['wrap']['style'] == null || $config_wrap_table['wrap']['style'] == '' || $config_wrap_table['wrap']['style'] == "") {
                    $style_wrap = '';
                }

                /** Begin wrapper table : */
                $result_table += '<div '+$id_wrap+$class_wrap+$attr_wrap+$style_wrap+'>';

                // FOR Filter Table :
                // ==================================================================================================

                /** CHeck IF $config_wrap_table['filter'] is defined : */
                if ($config_wrap_table['filter'] != undefined || $config_wrap_table['filter'] != null || $config_wrap_table['filter'] != '' || $config_wrap_table['filter'] != "") {

                    /** Define variable for config wrapper filter table : */
                    var $config_wrap_filter = $config_wrap_table['filter']['config'];
                    var $id_wrapFilter, $class_wrapFilter, $attr_wrapFilter, $style_wrapFilter;

                    /** Check FOR $config_wrap_filter['id'] : */
                    if ($config_wrap_filter['id'] != undefined || $config_wrap_filter['id'] != null || $config_wrap_filter['id'] != '' || $config_wrap_filter['id'] != "") {
                        $id_wrapFilter = ' id="filter_table-'+$config_wrap_filter['id']+'" ';
                    }
                    if ($config_wrap_filter['id'] == undefined || $config_wrap_filter['id'] == null || $config_wrap_filter['id'] == '' || $config_wrap_filter['id'] == "") {
                        $id_wrapFilter = ' id="filter_table" ';
                    }

                    /** Check FOR $config_wrap_filter['class'] : */
                    if ($config_wrap_filter['class'] != undefined || $config_wrap_filter['class'] != null || $config_wrap_filter['class'] != '' || $config_wrap_filter['class'] != "") {
                        $class_wrapFilter = ' class="'+$config_wrap_filter['class']+'" ';
                    }
                    if ($config_wrap_filter['class'] == undefined || $config_wrap_filter['class'] == null || $config_wrap_filter['class'] == '' || $config_wrap_filter['class'] == "") {
                        $class_wrapFilter = '';
                    }

                    /** Check FOR $config_wrap_filter['attr'] : */
                    if ($config_wrap_filter['attr'] != undefined || $config_wrap_filter['attr'] != null || $config_wrap_filter['attr'] != '' || $config_wrap_filter['attr'] != "") {
                        $attr_wrapFilter = ' '+$config_wrap_filter['attr']+' ';
                    }
                    if ($config_wrap_filter['attr'] == undefined || $config_wrap_filter['attr'] == null || $config_wrap_filter['attr'] == '' || $config_wrap_filter['attr'] == "") {
                        $attr_wrapFilter = '';
                    }

                    /** Check FOR $config_wrap_filter['style'] : */
                    if ($config_wrap_filter['style'] != undefined || $config_wrap_filter['style'] != null || $config_wrap_filter['style'] != '' || $config_wrap_filter['style'] != "") {
                        $style_wrapFilter = ' style="'+$config_wrap_filter['style']+'"';
                    }
                    if ($config_wrap_filter['style'] == undefined || $config_wrap_filter['style'] == null || $config_wrap_filter['style'] == '' || $config_wrap_filter['style'] == "") {
                        $style_wrapFilter = '';
                    }

                    /** Begin wrapper filter table : */
                    $result_table += '<div'+$id_wrapFilter+$class_wrapFilter+$attr_wrapFilter+$style_wrapFilter+'>';

                    /** Define variable for filter table : */
                    $filter = $config_wrap_table['filter']['data'];
                    var $key_filter = Object.keys($filter);

                    /** Prepare while loop to Create Filter Table : */
                    var $ft = 0;
                    var $until_ft = $key_filter.length;

                    /** While loop to Create Filter Table : */
                    while ($ft < $until_ft) {

                        /** Switch for conditions $key_filter[$ft] : */
                        switch ($key_filter[$ft]) {
                        /** Case for $key_filter[$ft] == 'count' : */
                            case 'count' :
                                $result_table += $.NKTI_Table_addon_control_count_list_item($filter['count']['min-count'], $filter['count']['max-count'], $filter['count']['config']);
                                //console.log($result_table);
                                break;
                        /** Case for $key_filter[$ft] == 'select' : */
                            case 'select' :
                                var $wrap_table = $filter['select']['wrap'];
                                $result_table += '<div id="'+$wrap_table['id']+'" class="'+$wrap_table['class']+'">';
                                $result_table += $.NKTI_Table_addon_select_bootstrap($filter['select']['data'], '');
                                $result_table += '</div>';
                                //console.log($result_table);
                                break;
                        }
                        /** End of switch for conditions $key_filter[$ft]. */

                        /** Auto Increment : */
                        $ft++;
                    } /** End of while loop to Create Filter Table. */

                    /** Ending Wrapper filter table : */
                    $result_table += '</div>';

                } /** End of CHeck IF $config_wrap_table['filter'] is defined. */

                /** Define variable for data config table : */
                $config_table_data = $data_config;

                /** Define variable for Data Config Table : */
                var $table_config = $config_table_data['table'];
                var $header_table = $config_table_data['header'];
                var $content_table = $config_table_data['content'];

                /** Create Table Data : */
                $result_table += $.NKTI_Table_advanced_create($table_config, $header_table, $content_table, '');

                /** Ending wrapper table : */
                $result_table += '</div>';

                /** Define variable for result : */
                $result = 1;

                /** Check IF $selector is defined : */
                if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                    /** Placing result into tab page : */
                    $($selector).html($result_table);

                } /** End of Check IF $selector is defined. */

                /** Check IF $selector is undefined : */
                if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {
                    $result = $result_table;
                } /** End of Check IF $selector is undefined. */

            } /** End of Check IF $data_config is defined. */

            /** Check IF $data_config is undefined : */
            if ($data_config == undefined || $data_config == null || $data_config == '' || $data_config == "") {
                console.error('data config table is undefined');
                $result = 0;
            } /** End of Check IF $data_config is undefined. */

        } /** End of Check IF $data_config_wrap is defined. */

        /** Check IF $data_config_wrap is undefined : */
        if ($data_config_wrap == undefined || $data_config_wrap == null || $data_config_wrap == '' || $data_config_wrap == "") {
            console.error('Data Wrapper table is undefined');
            $result = 0;
        } /** End of Check IF $data_table is undefined. */

        /** Return Result : */
        return $result;
    },
    /** End of For Create Table data.
     * ===================================================================================================== */

    /** For Create Table :
     * -----------------------------------------------------------
     *
     * Format Header Table :
     * -------------------------------------
     * Object {
     *      'config' : {
     *              'id' : '',
     *              'class' : '',
     *              'attr' : '',
     *              'style' : ''
     *      },
     *      'data' : [
     *          { "nama" : "", "id" : "", "class" : "", "attr" : "", "style" : "" },
     *          { "nama" : "", "id" : "", "class" : "", "attr" : "", "style" : "" }
     *      ]
     * }
     *
     * Format Data Table :
     * -------------------------------------
     * Object [
     *      {
     *          "baris" : { "id" : [ID Produk], "class" : [custom class css], "attr" : [custom attr], "style" : [custom style] },
     *          "kolom" : [
     *                      {
     *                          "type" : [text | html | input | radio | checkbox | img ],
     *                          "value" : [value column rows],
     *                          "id" : [ID <td> Table],
     *                          "class" : [Class <td> Table],
     *                          "attr" : [ Attr <td> Table],
     *                          "style" : [ Style <td> Table],
     *                      },
     *          ]
     *      },
     * ]
     *
     *
     * @param $header {object} Berisi key header table.
     * @param $data {object} Berisi data table.
     * @param $selector {string} Berisi selector untuk menyimpan hasil pembuatan table.
     */
    NKTI_Table_create: function($header, $data, $selector) {

        /** Define variable will be used in this function : */
        var $table_header, $table_data;

        /** Check IF $header table is Defined : */
        if ($header != undefined || $header != null || $header != '' || $header != "") {

            /** Define Header Table : */
            $table_header = $header;

            /** Check IF $table_header is object : */
            if (typeof $table_header == 'object') {

                /** Check IF $data is Defined : */
                if ($data != undefined || $data != null || $data != '' || $data != "") {

                    /** Define Data Table : */
                    $table_data = $data;
                    var $id_table = '';
                    var $class_table = '';
                    var $attr_table = '';
                    var $style_table = '';
                    var $data_header_tbl ='';

                    /** Check FOR $table_header['config']['id'] : */
                    if ($table_header['config']['id'] != undefined || $table_header['config']['id'] != null || $table_header['config']['id'] != '' || $table_header['config']['id'] != "") {
                        $id_table = 'id="'+$table_header['config']['id']+'" ';
                    }
                    if ($table_header['config']['id'] == undefined || $table_header['config']['id'] == null || $table_header['config']['id'] == '' || $table_header['config']['id'] == "") {
                        $id_table = '';
                    }

                    /** Check FOR $table_header['config']['class'] : */
                    if ($table_header['config']['class'] != undefined || $table_header['config']['class'] != null || $table_header['config']['class'] != '' || $table_header['config']['class'] != "") {
                        $class_table = ' '+$table_header['config']['class'];
                    }
                    if ($table_header['config']['class'] == undefined || $table_header['config']['class'] == null || $table_header['config']['class'] == '' || $table_header['config']['class'] == "") {
                        $class_table = '';
                    }

                    /** Check FOR $table_header['config']['attr'] : */
                    if ($table_header['config']['attr'] != undefined || $table_header['config']['attr'] != null || $table_header['config']['attr'] != '' || $table_header['config']['attr'] != "") {
                        $attr_table = $table_header['config']['attr'];
                    }
                    if ($table_header['config']['attr'] == undefined || $table_header['config']['attr'] == null || $table_header['config']['attr'] == '' || $table_header['config']['attr'] == "") {
                        $attr_table = '';
                    }

                    /** Check FOR $table_header['config']['style'] : */
                    if ($table_header['config']['style'] != undefined || $table_header['config']['style'] != null || $table_header['config']['style'] != '' || $table_header['config']['style'] != "") {
                        $style_table = ' style="'+$table_header['config']['style']+'" ';
                    }
                    if ($table_header['config']['style'] == undefined || $table_header['config']['style'] == null || $table_header['config']['style'] == '' || $table_header['config']['style'] == "") {
                        $style_table = '';
                    }

                    /** Check FOR $table_header['data'] is Defined : */
                    if ($table_header['data'] != undefined || $table_header['data'] != null || $table_header['data'] != '' || $table_header['data'] != "") {

                       /** Define data header table : */
                        $data_header_tbl = $table_header['data'];
                        var $tag_header_tbl = '', $tag_rows_tbl = '', $tag_rows_column_tbl = '', $result_create_table = '';

                        /** Wrapper Table : */
                        var $begin_wrap_table = '<table '+$id_table+'class="table table-bordered table-hover'+$class_table+'" '+$attr_table+' '+$style_table+'>';
                        var $end_wrap_table = '</table>';

                        /** Wrapper Header Table : */
                        var $begin_header_table = '<thead><tr>';
                        var $ending_header_table = '</tr></thead>';

                        /** Wrapper Data Table : */
                        var $begin_wrapper_table = '<tbody>';
                        var $ending_wrapper_table = '</tbody>';

                        /** Prepare while loop to Create Header Table : */
                        var $th = 0;
                        var $until_loop_header = $data_header_tbl.length;

                        /** While loop to Create Header Table : */
                        while ($th < $until_loop_header) {

                            /** Define variable for data head table : */
                            var $id_th = '', $class_th = '', $attr_th = '', $style_th = '', $name_th = '';
                            
                            /** Check IF $data_header_tbl[$th]['id'] is defined : */
                            if ($data_header_tbl[$th]['id'] != undefined || $data_header_tbl[$th]['id'] != null || $data_header_tbl[$th]['id'] != '' || $data_header_tbl[$th]['id'] != "") {
                                $id_th = ' id="'+$data_header_tbl[$th]['id']+'"';
                            }
                            if ($data_header_tbl[$th]['id'] == undefined || $data_header_tbl[$th]['id'] == null || $data_header_tbl[$th]['id'] == '' || $data_header_tbl[$th]['id'] == "") {
                                $id_th = '';
                            }

                            /** Check IF $data_header_tbl[$th]['class'] is defined : */
                            if ($data_header_tbl[$th]['class'] != undefined || $data_header_tbl[$th]['class'] != null || $data_header_tbl[$th]['class'] != '' || $data_header_tbl[$th]['class'] != "") {
                                $class_th = ' class="'+$data_header_tbl[$th]['class']+'" ';
                            }
                            if ($data_header_tbl[$th]['class'] == undefined || $data_header_tbl[$th]['class'] == null || $data_header_tbl[$th]['class'] == '' || $data_header_tbl[$th]['class'] == "") {
                                $class_th = '';
                            }

                            /** Check IF $data_header_tbl[$th]['attr'] is defined : */
                            if ($data_header_tbl[$th]['attr'] != undefined || $data_header_tbl[$th]['attr'] != null || $data_header_tbl[$th]['attr'] != '' || $data_header_tbl[$th]['attr'] != "") {
                                $attr_th = ' '+$data_header_tbl[$th]['attr']+' ';
                            }
                            if ($data_header_tbl[$th]['attr'] == undefined || $data_header_tbl[$th]['attr'] == null || $data_header_tbl[$th]['attr'] == '' || $data_header_tbl[$th]['attr'] == "") {
                                $attr_th = '';
                            }

                            /** Check IF $data_header_tbl[$th]['style'] is defined : */
                            if ($data_header_tbl[$th]['style'] != undefined || $data_header_tbl[$th]['style'] != null || $data_header_tbl[$th]['style'] != '' || $data_header_tbl[$th]['style'] != "") {
                                $style_th = ' style="'+$data_header_tbl[$th]['style']+'" ';
                            }
                            if ($data_header_tbl[$th]['style'] == undefined || $data_header_tbl[$th]['style'] == null || $data_header_tbl[$th]['style'] == '' || $data_header_tbl[$th]['style'] == "") {
                                $style_th = '';
                            }

                            /** Check IF $data_header_tbl[$th]['name'] is defined : */
                            if ($data_header_tbl[$th]['name'] != undefined || $data_header_tbl[$th]['name'] != null || $data_header_tbl[$th]['name'] != '' || $data_header_tbl[$th]['name'] != "") {
                                $name_th = $data_header_tbl[$th]['name'];
                            }
                            if ($data_header_tbl[$th]['name'] == undefined || $data_header_tbl[$th]['name'] == null || $data_header_tbl[$th]['name'] == '' || $data_header_tbl[$th]['name'] == "") {
                                $name_th = '';
                            }

                            /** Create Header Table : */
                            $tag_header_tbl += '<th '+$id_th+$class_th+$attr_th+$style_th+'>'+$name_th+'</th>';

                            /** Auto Increment : */
                            $th++;
                        } /** End of while loop to Create Header Table. */

                        /** Prepare while loop to Craete Data Table : */
                        var $i = 0;
                        var $until_loop_tr = $table_data.length;

                        /** While loop to Craete Data Table : */
                        while ($i < $until_loop_tr) {

                            /** Define variable for Data Table : */
                            var $id_tr = '', $class_tr = '', $attr_tr = '', $style_tr = '';

                            /** Check IF $table_data[$i]['baris']['id'] is defined : */
                            if ($table_data[$i]['baris']['id'] != undefined || $table_data[$i]['baris']['id'] != null || $table_data[$i]['baris']['id'] != '' || $table_data[$i]['baris']['id'] != "") {
                                $id_tr = 'id="' + $table_data[$i]['baris']['id'] + '"';
                            }
                            if ($table_data[$i]['baris']['id'] == undefined || $table_data[$i]['baris']['id'] == null || $table_data[$i]['baris']['id'] == '' || $table_data[$i]['baris']['id'] == "") {
                                $id_tr = '';
                            }

                            /** Check IF $table_data[$i]['baris']['class'] is defined : */
                            if ($table_data[$i]['baris']['class'] != undefined || $table_data[$i]['baris']['class'] != null || $table_data[$i]['baris']['class'] != '' || $table_data[$i]['baris']['class'] != "") {
                                $class_tr = ' class="' + $table_data[$i]['baris']['class'] + '" ';
                            }
                            if ($table_data[$i]['baris']['class'] == undefined || $table_data[$i]['baris']['class'] == null || $table_data[$i]['baris']['class'] == '' || $table_data[$i]['baris']['class'] == "") {
                                $class_tr = '';
                            }

                            /** Check IF $table_data[$i]['baris']['attr'] is defined : */
                            if ($table_data[$i]['baris']['attr'] != undefined || $table_data[$i]['baris']['attr'] != null || $table_data[$i]['baris']['attr'] != '' || $table_data[$i]['baris']['attr'] != "") {
                                $attr_tr = $table_data[$i]['baris']['attr'];
                            }
                            if ($table_data[$i]['baris']['attr'] == undefined || $table_data[$i]['baris']['attr'] == null || $table_data[$i]['baris']['attr'] == '' || $table_data[$i]['baris']['attr'] == "") {
                                $attr_tr = '';
                            }

                            /** Check IF $table_data[$i]['baris']['style'] is defined : */
                            if ($table_data[$i]['baris']['style'] != undefined || $table_data[$i]['baris']['style'] != null || $table_data[$i]['baris']['style'] != '' || $table_data[$i]['baris']['style'] != "") {
                                $style_tr = ' style="' + $table_data[$i]['baris']['style'] + '"';
                            }
                            if ($table_data[$i]['baris']['style'] == undefined || $table_data[$i]['baris']['style'] == null || $table_data[$i]['baris']['style'] == '' || $table_data[$i]['baris']['style'] == "") {
                                $style_tr = '';
                            }

                            /** Begin Wrapper Baris : */
                            $tag_rows_tbl += '<tr '+$id_tr+$class_tr+' '+$attr_tr+$style_tr+'>';

                            /** Create Baris Table : */
                            $tag_rows_tbl += $.NKTI_Table_create_isi_baris($table_data[$i]['kolom']);

                            /** Create Data Table : */
                            $tag_rows_tbl += $tag_rows_column_tbl;
                            //console.log('Baris : '+$tag_rows_column_tbl);

                            /** Ending Wrapper baris : */
                            $tag_rows_tbl += '</tr>';

                            /** Auto Increment : */
                            $i++;

                        } /** End of while loop to Craete Data Table. */

                        /** Create Begin Item Table : */
                        $result_create_table += $begin_wrap_table;

                        /** Create Begin Header Table : */
                        $result_create_table += $begin_header_table;
                        $result_create_table += $tag_header_tbl;
                        $result_create_table += $ending_header_table;

                        /** Create Begin Content Table : */
                        $result_create_table += $begin_wrapper_table;
                        $result_create_table += $tag_rows_tbl;
                        $result_create_table += $ending_wrapper_table;

                        /** Create Ending Item Table : */
                        $result_create_table += $end_wrap_table;

                        //console.log($result_create_table);

                        /** Check IF $selector is defined : */
                        if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                            /** Placing Table in $selector : */
                            $($selector).html($result_create_table);

                        } /** End of Check IF $selector is defined : */

                        /** Check IF $selector is undefined : */
                        if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {
                            console.error('Selector is undefined');
                        } /** End of Check IF $selector is undefined : */

                    } /** End of Check FOR $table_header['data'] is Defined : */

                    /** Check FOR $table_header['data'] is Undefined : */
                    if ($table_header['data'] == undefined || $table_header['data'] == null || $table_header['data'] == '' || $table_header['data'] == "") {
                        console.error('Data Header Table is undefined');
                    } /** End of Check FOR $table_header['data'] is Undefined : */

                } /** End of Check IF $data is Defined. */

                /** Check IF $data is undefined : */
                if ($data == undefined || $data == null || $data == '' || $data == "") {
                    console.error('Data table is undefined');
                } /** End of Check IF $data is undefined. */

            } /** End of check IF $table_header is object. */

            /** Check IF $table_header is not object : */
            if (typeof $table_header != 'object') {
                console.error('Header Table is not object');
            } /** End of check IF $table_header is not object. */

        } /** End of Check IF $header table is Defined : */

        /** Check IF $header table is undefined : */
        if ($header == undefined || $header == null || $header == '' || $header == "") {
            console.error('Header Table is undefined');
        } /** End of Check IF $header table is undefined : */
        
    },
    /** End of For Create Table.
     * ===================================================================================================== */

    /** For Create Advanced Table :
     * -----------------------------------------------------------
     *
     *
     * @param $table {object} Variable yang berisi data config table.
     * @param $header {object} Variable yang berisi data config header table.
     * @param $data {object} Variable yang berisi config isi table.
     * @param $selector {string} Variable yang berisi nama selector.
     *
     * @config {object} [Data_Format_table] {
     *      'type' : [table-responsive | table-scrollable | table-scrollable table-scrollable-borderless ],
     *      'wrap' : {
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *      },
     *      'table' : {
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : ''
     *      }
     * }
     *
     *
     * @config {object} [Data_Format_Header_table] [
     *      {
     *          'baris' : {
     *              'id' : '', 'class' : '', 'attr' : '', 'style' : ''
     *          },
     *          'kolom' : [
     *              {
     *                  'type' : '[ checkbox | radio | input | img | custom-html | html | text ]',
     *                  'value' : [ Value Object | string],
     *                  'id' : '',
     *                  'class' : '',
     *                  'attr' : [ colspan | rowspan ],
     *                  'style' : '',
     *              },
     *          ]
     *      },
     *      {
     *          'baris' : {
     *              'id' : '', 'class' : '', 'attr' : '', 'style' : ''
     *          },
     *          'kolom' : [
     *              {
     *                  'type' : '[ checkbox | radio | input | img | custom-html | html | text ]',
     *                  'value' : [ Value Object | string],
     *                  'id' : '',
     *                  'class' : '',
     *                  'attr' : '',
     *                  'style' : '',
     *              },
     *          ]
     *      },
     * ]
     *
     * @config {object} [Data_Table] - "[
     *      {
     *          "baris" : { "id" : (ID Produk), "class" : (custom class css), "attr" : (custom attr), "style" : (custom style) },
     *          "kolom" : [
     *                      {
     *                          "type" : [ checkbox | radio | input | img | custom-html | html | text ],
     *                          "value" : [value column rows],
     *                          "id" : [ID <td> Table],
     *                          "class" : [Class <td> Table],
     *                          "attr" : [ Attr <td> Table],
     *                          "style" : [ Style <td> Table],
     *                      },
     *          ]
     *      },
     * ]"
     */
    NKTI_Table_advanced_create: function($table, $header, $data, $selector) {

        /** Define variable will be used in this function : */
        var $config_table, $header_table, $data_table, $target_place,
            $table_result = '', $result;

        /** Check IF $table is defined : */
        if ($table != undefined || $table != null || $table != '' || $table != "") {
            
            /** Define data config table : */
            $config_table = $table;

            //console.log('Table Data : ');
            //console.log($table);
            //console.log('Header Table Data : ');
            //console.log($header);
            //console.log('Content Data : ');
            //console.log($data);
            //console.log($selector);

            /** Check IF $config_table is object : */
            if (typeof $config_table == "object") {

                /** Define variable for Attribute Table : */
                var $type_wrap_table, $id_wrap_table, $class_wrap_table, $attr_wrap_table, $style_wrap_table;
                var $id_table, $class_table, $attr_table, $style_table;

                // FOR Wrapper Table :
                // ==================================================================================================

                /** CHeck FOR $config_table['type'] : */
                if ($config_table['type'] != undefined || $config_table['type'] != null || $config_table['type'] != '' || $config_table['type'] != "") {
                    $type_wrap_table = $config_table['type'];
                }
                if ($config_table['type'] == undefined || $config_table['type'] == null || $config_table['type'] == '' || $config_table['type'] == "") {
                    $type_wrap_table = 'table-responsive';
                }

                /** CHeck FOR $config_table['wrap']['id'] : */
                if ($config_table['wrap']['id'] != undefined || $config_table['wrap']['id'] != null || $config_table['wrap']['id'] != '' || $config_table['wrap']['id'] != "") {
                    $id_wrap_table = ' id="' + $config_table['wrap']['id'] + '" ';
                }
                if ($config_table['wrap']['id'] == undefined || $config_table['wrap']['id'] == null || $config_table['wrap']['id'] == '' || $config_table['wrap']['id'] == "") {
                    $id_wrap_table = ' ';
                }

                /** CHeck FOR $config_table['wrap']['class'] : */
                if ($config_table['wrap']['class'] != undefined || $config_table['wrap']['class'] != null || $config_table['wrap']['class'] != '' || $config_table['wrap']['class'] != "") {
                    $class_wrap_table = ' ' + $config_table['wrap']['class'];
                }
                if ($config_table['wrap']['class'] == undefined || $config_table['wrap']['class'] == null || $config_table['wrap']['class'] == '' || $config_table['wrap']['class'] == "") {
                    $class_wrap_table = '';
                }

                /** CHeck FOR $config_table['wrap']['attr'] : */
                if ($config_table['wrap']['attr'] != undefined || $config_table['wrap']['attr'] != null || $config_table['wrap']['attr'] != '' || $config_table['wrap']['attr'] != "") {
                    $attr_wrap_table = ' ' + $config_table['wrap']['attr'] + ' ';
                }
                if ($config_table['wrap']['attr'] == undefined || $config_table['wrap']['attr'] == null || $config_table['wrap']['attr'] == '' || $config_table['wrap']['attr'] == "") {
                    $attr_wrap_table = '';
                }

                /** CHeck FOR $config_table['wrap']['style'] : */
                if ($config_table['wrap']['style'] != undefined || $config_table['wrap']['style'] != null || $config_table['wrap']['style'] != '' || $config_table['wrap']['style'] != "") {
                    $style_wrap_table = ' style="' + $config_table['wrap']['style'] + '" ';
                }
                if ($config_table['wrap']['style'] == undefined || $config_table['wrap']['style'] == null || $config_table['wrap']['style'] == '' || $config_table['wrap']['style'] == "") {
                    $style_wrap_table = '';
                }

                /** Begin Wrap table : */
                $table_result += '<div'+$id_wrap_table+'class="'+$type_wrap_table+$class_wrap_table+'"'+$attr_wrap_table+$style_wrap_table+'>';

                // FOR Tables :
                // ==================================================================================================

                /** Check FOR $config_table['attr'] : */
                if ($config_table['table']['id'] != undefined || $config_table['table']['id'] != null || $config_table['table']['id'] != '' || $config_table['table']['id'] != "") {
                    $id_table = ' id="' + $config_table['table']['id'] + '" ';
                }
                if ($config_table['table']['id'] == undefined || $config_table['table']['id'] == null || $config_table['table']['id'] == '' || $config_table['table']['id'] == "") {
                    $id_table = ' ';
                }

                /** Check FOR $config_table['table']['class'] : */
                if ($config_table['table']['class'] != undefined || $config_table['table']['class'] != null || $config_table['table']['class'] != '' || $config_table['table']['class'] != "") {
                    $class_table = ' ' + $config_table['table']['class'];
                }
                if ($config_table['table']['class'] == undefined || $config_table['table']['class'] == null || $config_table['table']['class'] == '' || $config_table['table']['class'] == "") {
                    $class_table = '';
                }

                /** Check FOR $config_table['table']['attr'] : */
                if ($config_table['table']['attr'] != undefined || $config_table['table']['attr'] != null || $config_table['table']['attr'] != '' || $config_table['table']['attr'] != "") {
                    $attr_table = ' ' + $config_table['table']['attr'] + ' ';
                }
                if ($config_table['table']['attr'] == undefined || $config_table['table']['attr'] == null || $config_table['table']['attr'] == '' || $config_table['table']['attr'] == "") {
                    $attr_table = '';
                }

                /** Check FOR $config_table['table']['style'] : */
                if ($config_table['table']['style'] != undefined || $config_table['table']['style'] != null || $config_table['table']['style'] != '' || $config_table['table']['style'] != "") {
                    $style_table = ' style="' + $config_table['table']['style'] + '" ';
                }
                if ($config_table['table']['style'] == undefined || $config_table['table']['style'] == null || $config_table['table']['style'] == '' || $config_table['table']['style'] == "") {
                    $style_table = '';
                }

                /** Check IF $header is defined : */
                if ($header != undefined || $header != null || $header != '' || $header != "") {

                    /** Define Data header Table : */
                    $header_table = $header;

                    /** Check IF $header_table is object : */
                    if (typeof $header_table == "object") {

                        /** Check IF $data is defined : */
                        if ($data != undefined || $data != null || $data != '' || $data != "") {

                            /** Define variable for data config fill table : */
                            $data_table = $data;

                            /** Check IF $data_table is object : */
                            if (typeof $data_table == 'object') {

                                /** Begin Table : */
                                $table_result += '<table'+$id_table+'class="table'+$class_table+'"'+$attr_table+$style_table+'>';

                                /** Create Header Table : */
                                $table_result += '<thead>';
                                $table_result += $.NKTI_Table_create_header_advanced($header_table);
                                $table_result += '</thead>';

                                /** Create Data table : */
                                $table_result += '<tbody>';
                                $table_result += $.NKTI_Table_create_baris($data_table);
                                $table_result += '</tbody>';

                                /** Ending Table : */
                                $table_result += '</table>';

                                /** Endig Wraper Table : */
                                $table_result += '</div>';

                                /** Check IF $selector is defined : */
                                if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                                    /** Define variable for target place : */
                                    $target_place = $($selector);

                                    /** Placing Result : */
                                    $target_place.html($table_result);

                                    /** Define variable for result : */
                                    $result = 1;

                                } /** End of Check IF $selector is defined. */

                                /** Check IF $selector is undefined : */
                                if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {

                                    /** Placing result : */
                                    $result = $table_result;

                                } /** End of Check IF $selector is undefined. */

                            } /** End of Check IF $data_table is object. */

                            /** Check IF $data_table is not object : */
                            if (typeof $data_table != 'object') {
                                console.error('Data config fill table is not object');
                                $result = 0;
                            } /** End of Check IF $data_table is not object. */

                        } /** End of Check IF $data is defined. */

                        /** Check IF $data is undefined : */
                        if ($data == undefined || $data == null || $data == '' || $data == "") {
                            console.error('Data config fill table is undefined');
                            $result = 0;
                        } /** End of Check IF $data is undefined. */

                    } /** End of Check IF $header_table is object. */

                    /** Check IF $header_table is not object : */
                    if (typeof $header_table != "object") {
                        console.error('Data config header table is not object');
                        $result = 0;
                    } /** End of Check IF $header_table is not object. */

                } /** End of Check IF $header is defined. */

                /** Check IF $header is undefined : */
                if ($header == undefined || $header == null || $header == '' || $header == "") {
                    console.error('Data config header table is undefined');
                    $result = 0;
                } /** End of Check IF $header is undefined. */

            } /** End of Check IF $config_table is object. */

            /** Check IF $config_table is not object : */
            if ($config_table == undefined || $config_table == null || $config_table == '' || $config_table == "") {
                console.error('Data config table is not object');
                $result = 0;
            } /** End of Check IF $config_table is not object. */
            
        } /** End of Check IF $table is defined. */

        /** Check IF $table is undefined : */
        if ($table == undefined || $table == null || $table == '' || $table == "") {
            console.error('Data config table is undefined');
            $result = 0;
        } /** End of Check IF $table is undefined. */
        
        /** Return $result : */
        return $result;

    },
    /** End of For Create Advanced Table.
     * ===================================================================================================== */

    /** For Create control list item view :
     * -----------------------------------------------------------
     *
     */
    NKTI_Table_addon_control_count_list_item: function ($min_count_item, $max_count_item, $wrap_count_item) {

        /** Define variable will be used in this function : */
        var $min_count, $max_count_item_list, $config_control = new Array(), $result_count_list = '', $result;

        /** Check FOR $min_count_item : */
        if ($min_count_item != undefined || $min_count_item != null || $min_count_item != '' || $min_count_item != "") {
            $min_count = $min_count_item;
        }
        if ($min_count_item == undefined || $min_count_item == null || $min_count_item == '' || $min_count_item == "") {
            $min_count = 20;
        }

        /** End of Check IF $min_count_item is defined. */

        /** Check IF $max_count_item is defined : */
        if ($max_count_item == undefined || $max_count_item != null || $max_count_item != '' || $max_count_item != "") {

            /** Define variable for Max Count Item in List : */
            $max_count_item_list = $max_count_item;

            /** Define data Option : */
            var $data_option = new Array();

            /** Prepare while loop to Create data option : */
            var $i = 1;
            var $until_loop = 6;
            var $item_option;

            /** While loop to Create data option : */
            while ($i < $until_loop) {

                /** Create Item option : */
                $data_option.push({
                    'value' : ($min_count * $i),
                    'name' : ($min_count * $i)
                });

                /** Auto Increment : */
                $i++;
            }
            /** End of while loop to Create data option. */

            /** Create Config for Count control item list : */
            $config_control.push({
                'config' : {
                    'id' : 'count-item-control',
                    'attr' : 'data-item-control="'+$max_count_item_list+'"',
                    'name' : 'filter-count-list-item'
                },
                'option': $data_option
            });

            /** Check IF $wrap_count_item is defined : */
            if ($wrap_count_item != undefined || $wrap_count_item != null || $wrap_count_item != '' || $wrap_count_item != "") {

                /** Define variable will be used in this function : */
                var $id_wrap, $class_wrap, $attr_wrap, $style_wrap;

                /** Check FOR $wrap_count_item['id'] : */
                if ($wrap_count_item['id'] != undefined || $wrap_count_item['id'] != null || $wrap_count_item['id'] != '' || $wrap_count_item['id'] != "") {
                    $id_wrap = ' id="' + $wrap_count_item['id'] + '" ';
                }
                if ($wrap_count_item['id'] == undefined || $wrap_count_item['id'] == null || $wrap_count_item['id'] == '' || $wrap_count_item['id'] == "") {
                    $id_wrap = ' ';
                }

                /** Check FOR $wrap_count_item['class'] : */
                if ($wrap_count_item['class'] != undefined || $wrap_count_item['class'] != null || $wrap_count_item['class'] != '' || $wrap_count_item['class'] != "") {
                    $class_wrap = ' class="' + $wrap_count_item['class'] + '" ';
                }
                if ($wrap_count_item['class'] == undefined || $wrap_count_item['class'] == null || $wrap_count_item['class'] == '' || $wrap_count_item['class'] == "") {
                    $class_wrap = '';
                }

                /** Check FOR $wrap_count_item['attr'] : */
                if ($wrap_count_item['attr'] != undefined || $wrap_count_item['attr'] != null || $wrap_count_item['attr'] != '' || $wrap_count_item['attr'] != "") {
                    $attr_wrap = ' ' + $wrap_count_item['attr'] + ' ';
                }
                if ($wrap_count_item['attr'] == undefined || $wrap_count_item['attr'] == null || $wrap_count_item['attr'] == '' || $wrap_count_item['attr'] == "") {
                    $attr_wrap = '';
                }

                /** Check FOR $wrap_count_item['style'] : */
                if ($wrap_count_item['style'] != undefined || $wrap_count_item['style'] != null || $wrap_count_item['style'] != '' || $wrap_count_item['style'] != "") {
                    $style_wrap = ' style="' + $wrap_count_item['style'] + '"';
                }
                if ($wrap_count_item['style'] == undefined || $wrap_count_item['style'] == null || $wrap_count_item['style'] == '' || $wrap_count_item['style'] == "") {
                    $style_wrap = '';
                }

                /** Begin wrapper count list item : */
                $result_count_list += '<div'+$id_wrap+$class_wrap+$attr_wrap+$style_wrap+'>';

                /** Create FORM Select : */
                $result_count_list += $.NKTI_Table_addon_select_bootstrap($config_control);

                /** Ending Wrapper count list item : */
                $result_count_list += '</div>';

                /** Define result : */
                $result = $result_count_list;

            } /** End of Check IF $wrap_count_item is defined. */

            /** Check IF $wrap_count_item is undefined : */
            if ($wrap_count_item == undefined || $wrap_count_item == null || $wrap_count_item == '' || $wrap_count_item == "") {

                /** Create FORM Select : */
                $result = $.NKTI_Table_addon_select_bootstrap($config_control);

            } /** End of Check IF $wrap_count_item is undefined. */

        } /** End of Check IF $max_count_item is defined. */

        /** Check IF $max_count_item is undefined : */
        if ($max_count_item == undefined || $max_count_item == null || $max_count_item == '' || $max_count_item == "") {

            console.error('data Max Count Item is undefined');
            $result = 0;

        } /** End of Check IF $max_count_item is undefined. */

        /** Return Result : */
        return $result;

    },
    /** End of For Create control list item view.
     * ===================================================================================================== */

    /** For Create Header Advanced Table :
     * -----------------------------------------------------------
     *
     * Format Header Table :
     * -------------------------------------
     * object [
     *      {
     *          'baris' : {
     *              'id' : '', 'class' : '', 'attr' : '', 'style' : ''
     *          },
     *          'kolom' : [
     *              {
     *                  'type' : '[ checkbox | radio | input | img | html | text ]',
     *                  'value' : [ Value Object | string],
     *                  'id' : '',
     *                  'class' : '',
     *                  'attr' : [ colspan | rowspan ],
     *                  'style' : '',
     *              },
     *          ]
     *      },
     *      {
     *          'baris' : {
     *              'id' : '', 'class' : '', 'attr' : '', 'style' : ''
     *          },
     *          'kolom' : [
     *              {
     *                  'type' : '[ checkbox | radio | input | img | html | text ]',
     *                  'value' : [ Value Object | string],
     *                  'id' : '',
     *                  'class' : '',
     *                  'attr' : '',
     *                  'style' : '',
     *              },
     *          ]
     *      },
     * ]
     *
     * @param $data_header {object} Variable yang berisi data object table :
     * @param $selector {string} Variable yang berisi nama selector untuk menyimpan hasil pembuatan header table.
     */
    NKTI_Table_create_header_advanced: function ($data_header, $selector) {

        /** Define variable will be used in this function : */
        var $config_header, $target_place,
            $tr_th_result = '',
            $th_result = '', $result;

        /** Check IF $data_header is defined : */
        if ($data_header != undefined || $data_header != null || $data_header != '' || $data_header != "") {

            /** Define variable for data Header : */
            $config_header = $data_header;

            /** Prepare while loop to Create Header Table : */
            var $i = 0;
            var $until_loop = $config_header.length;

            /** While loop to Create Header Table : */
            while ($i < $until_loop) {

                /** Define variable for Attribute : */
                var $id_baris, $class_baris, $attr_baris, $style_baris;

                /** Check FOR $config_header[$i]['baris']['id'] : */
                if ($config_header[$i]['baris']['id'] != undefined || $config_header[$i]['baris']['id'] != null || $config_header[$i]['baris']['id'] != '' || $config_header[$i]['baris']['id'] != "") {
                    $id_baris = ' id="'+$config_header[$i]['baris']['id']+'" ';
                }
                if ($config_header[$i]['baris']['id'] == undefined || $config_header[$i]['baris']['id'] == null || $config_header[$i]['baris']['id'] == '' || $config_header[$i]['baris']['id'] == "") {
                    $id_baris = ' ';
                }

                /** Check FOR $config_header[$i]['baris']['class'] : */
                if ($config_header[$i]['baris']['class'] != undefined || $config_header[$i]['baris']['class'] != null || $config_header[$i]['baris']['class'] != '' || $config_header[$i]['baris']['class'] != "") {
                    $class_baris = ' class="'+$config_header[$i]['baris']['class']+'" ';
                }
                if ($config_header[$i]['baris']['class'] == undefined || $config_header[$i]['baris']['class'] == null || $config_header[$i]['baris']['class'] == '' || $config_header[$i]['baris']['class'] == "") {
                    $class_baris = '';
                }

                /** Check FOR $config_header[$i]['baris']['attr'] : */
                if ($config_header[$i]['baris']['attr'] != undefined || $config_header[$i]['baris']['attr'] != null || $config_header[$i]['baris']['attr'] != '' || $config_header[$i]['baris']['attr'] != "") {
                    $attr_baris = ' '+$config_header[$i]['baris']['attr']+' ';
                }
                if ($config_header[$i]['baris']['attr'] == undefined || $config_header[$i]['baris']['attr'] == null || $config_header[$i]['baris']['attr'] == '' || $config_header[$i]['baris']['attr'] == "") {
                    $attr_baris = '';
                }

                /** Check FOR $config_header[$i]['baris']['style'] : */
                if ($config_header[$i]['baris']['style'] != undefined || $config_header[$i]['baris']['style'] != null || $config_header[$i]['baris']['style'] != '' || $config_header[$i]['baris']['style'] != "") {
                    $style_baris = ' style="'+$config_header[$i]['baris']['style']+'" ';
                }
                if ($config_header[$i]['baris']['style'] == undefined || $config_header[$i]['baris']['style'] == null || $config_header[$i]['baris']['style'] == '' || $config_header[$i]['baris']['style'] == "") {
                    $style_baris = '';
                }

                /** Begin Baris Header : */
                $tr_th_result += '<tr'+$id_baris+$class_baris+$attr_baris+$style_baris+'>';

                /** Prepare while loop to Create Kolom baris Header Table : : */
                var $th = 0;
                var $until_loop_th = $config_header[$i]['kolom'].length;

                /** While loop to Create Kolom baris Header Table : : */
                while ($th < $until_loop_th) {

                    /** Define variable for Attribute Kolom baris : */
                    var $kolom_baris = $config_header[$i]['kolom'];
                    var $id_th, $class_th, $attr_th, $style_th, $type_th, $value_th;

                    /** Check FOR $kolom_baris[$th]['id'] : */
                    if ($kolom_baris[$th]['id'] != undefined || $kolom_baris[$th]['id'] != null || $kolom_baris[$th]['id'] != '' || $kolom_baris[$th]['id'] != "") {
                        $id_th = ' id="' + $kolom_baris[$th]['id'] + '" ';
                    }
                    if ($kolom_baris[$th]['id'] == undefined || $kolom_baris[$th]['id'] == null || $kolom_baris[$th]['id'] == '' || $kolom_baris[$th]['id'] == "") {
                        $id_th = ' ';
                    }

                    /** Check FOR $kolom_baris[$th]['class'] : */
                    if ($kolom_baris[$th]['class'] != undefined || $kolom_baris[$th]['class'] != null || $kolom_baris[$th]['class'] != '' || $kolom_baris[$th]['class'] != "") {
                        $class_th = ' class="' + $kolom_baris[$th]['class'] + '" ';
                    }
                    if ($kolom_baris[$th]['class'] == undefined || $kolom_baris[$th]['class'] == null || $kolom_baris[$th]['class'] == '' || $kolom_baris[$th]['class'] == "") {
                        $class_th = '';
                    }

                    /** Check FOR $kolom_baris[$th]['attr'] : */
                    if ($kolom_baris[$th]['attr'] != undefined || $kolom_baris[$th]['attr'] != null || $kolom_baris[$th]['attr'] != '' || $kolom_baris[$th]['attr'] != "") {
                        $attr_th = ' ' + $kolom_baris[$th]['attr'] + ' ';
                    }
                    if ($kolom_baris[$th]['attr'] == undefined || $kolom_baris[$th]['attr'] == null || $kolom_baris[$th]['attr'] == '' || $kolom_baris[$th]['attr'] == "") {
                        $attr_th = '';
                    }

                    /** Check FOR $kolom_baris[$th]['style'] : */
                    if ($kolom_baris[$th]['style'] != undefined || $kolom_baris[$th]['style'] != null || $kolom_baris[$th]['style'] != '' || $kolom_baris[$th]['style'] != "") {
                        $style_th = ' style="' + $kolom_baris[$th]['style'] + '" ';
                    }
                    if ($kolom_baris[$th]['style'] == undefined || $kolom_baris[$th]['style'] == null || $kolom_baris[$th]['style'] == '' || $kolom_baris[$th]['style'] == "") {
                        $style_th = '';
                    }

                    /** Check FOR $kolom_baris[$th]['type'] : */
                    if ($kolom_baris[$th]['type'] != undefined || $kolom_baris[$th]['type'] != null || $kolom_baris[$th]['type'] != '' || $kolom_baris[$th]['type'] != "") {
                        $type_th = $kolom_baris[$th]['type'];
                    }
                    if ($kolom_baris[$th]['type'] == undefined || $kolom_baris[$th]['type'] == null || $kolom_baris[$th]['type'] == '' || $kolom_baris[$th]['type'] == "") {
                        $type_th = 'text';
                    }

                    /** Check FOR $kolom_baris[$th]['value'] : */
                    if ($kolom_baris[$th]['value'] != undefined || $kolom_baris[$th]['value'] != null || $kolom_baris[$th]['value'] != '' || $kolom_baris[$th]['value'] != "") {
                        $value_th = $kolom_baris[$th]['value'];
                    }
                    if ($kolom_baris[$th]['value'] == undefined || $kolom_baris[$th]['value'] == null || $kolom_baris[$th]['value'] == '' || $kolom_baris[$th]['value'] == "") {
                        $value_th = '';
                    }

                    /** Begin Kolom Baris : */
                    $tr_th_result += '<th'+$id_th+$class_th+$attr_th+$style_th+'>';

                    /** Switch for conditions $type_th : */
                    switch ($type_th) {
                    /** Case for $type_th == 'input' : */
                        case 'input' :
                            $tr_th_result += $.NKTI_Table_addon_input($value_th);
                            break;

                    /** Case for $type_th == 'radio' : */
                        case 'radio' :
                            $tr_th_result += $.NKTI_Table_addon_radio($value_th);
                            break;

                    /** Case for $type_th == 'checkbox' : */
                        case 'checkbox' :
                            $tr_th_result += $.NKTI_Table_addon_checkbox($value_th);
                            break;

                    /** Case for $type_th == 'select' : */
                        case 'select' :
                            $tr_th_result += $.NKTI_Table_addon_select_bootstrap($value_th);
                            break;

                    /** Case for $type_th == 'img' : */
                        case 'img' :
                            $tr_th_result += $.NKTI_Table_addon_img_fancybox($value_th);
                            break;

                    /** Case for $type_th == 'button' : */
                        case 'button' :
                            $tr_th_result += $.NKTI_Table_addon_button($value_th);
                            break;

                    /** Case for $type_th == 'custom-html' : */
                        case 'custom-html' :
                            $tr_th_result += $.NKTI_Table_addon_custom_html_tag($value_th);
                            break;

                    /** Case for $type_th == 'text' : */
                        case 'text' :
                            $tr_th_result += $value_th;
                            break;

                    /** Case for $type_th == 'html' : */
                        case 'html' :
                            $tr_th_result += $value_th;
                            break;
                    }
                    /** End of switch for conditions $type_th. */

                    /** Begin Kolom Baris : */
                    $tr_th_result += '</th>';

                    /** Auto Increment : */
                    $th++;
                }
                /** End of while loop to Create Kolom baris Header Table :. */

                /** Ending Baris Header : */
                $tr_th_result += '</tr>';

                /** Auto Increment : */
                $i++;
            } /** End of while loop to Create Header Table. */

            /** Check IF $selector is defined : */
            if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                /** Define variable for target place result : */
                $target_place = $($selector);

                /** Placing Result Header table : */
                $target_place.html($tr_th_result);

                /** Define variable for return result : */
                $result = 1;

            } /** End of Check IF $selector is defined. */

            /** Check IF $selector is undefined : */
            if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {

                /** Placing result header table into variable $result : */
                $result = $tr_th_result;

            } /** End of Check IF $selector is undefined. */

        } /** End of Check IF $data_header is defined. */

        /** Check IF $data_header is undefined : */
        if ($data_header == undefined || $data_header == null || $data_header == '' || $data_header == "") {

            /** Create Log Error : */
            console.error('Data config header table is undefined');

            /** Define result : */
            $result = 0;

        } /** End of Check IF $data_header is undefined. */

        /** Return Result : */
        return $result;
    },
    /** End of For Create Header Advanced Table.
     * ===================================================================================================== */

    /** For Create Kolom Baris Table :
     * -----------------------------------------------------------
     *
     * Format Kolom Baris :
     * -------------------------------------
     * object array : [
     *              {
     *                  "type" : [text | html | input | radio | checkbox | img ],
     *                  "value" : [value column rows],
     *                  "id" : [ID <td> Table],
     *                  "class" : [Class <td> Table],
     *                  "attr" : [ Attr <td> Table],
     *                  "style" : [ Style <td> Table],
     *              },
     *  ]
     *
     *
     * @param $table_tr_td {object} berisi data object untuk membuat kolom baris table.
     * @return {string}
     *
     */
    NKTI_Table_create_isi_baris: function ($table_tr_td) {

        /** Define variable will be used in this function : */
        var $td_result = '';

        /** Prepare while loop to Create Kolom Baris : */
        var $td = 0;
        var $until_loop_td = $table_tr_td.length;

        /** While loop to Create Kolom Baris : */
        while ($td < $until_loop_td) {

            /** Define variable for Data Table : */
            var $kolom_baris = $table_tr_td;
            var $id_td = '', $class_td = '', $attr_td = '', $style_td = '', $value_td = '', $type_td = '';

            /** Check IF $kolom_baris[$td]['type'] is defined : */
            if ($kolom_baris[$td]['type'] != undefined || $kolom_baris[$td]['type'] != null || $kolom_baris[$td]['type'] != '' || $kolom_baris[$td]['type'] != "") {

                /** Define type kolom baris : */
                $type_td = $kolom_baris[$td]['type'];

                /** Check IF $kolom_baris[$td]['id'] is Defined : */
                if ($kolom_baris[$td]['id'] != undefined || $kolom_baris[$td]['id'] != null || $kolom_baris[$td]['id'] != '' || $kolom_baris[$td]['id'] != "") {
                    $id_td = ' id="' + $kolom_baris[$td]['id'] + '" ';
                }
                if ($kolom_baris[$td]['id'] == undefined || $kolom_baris[$td]['id'] == null || $kolom_baris[$td]['id'] == '' || $kolom_baris[$td]['id'] == "") {
                    $id_td = '';
                }

                /** Check IF $kolom_baris[$td]['class'] is Defined : */
                if ($kolom_baris[$td]['class'] != undefined || $kolom_baris[$td]['class'] != null || $kolom_baris[$td]['class'] != '' || $kolom_baris[$td]['class'] != "") {
                    $class_td = ' class="' + $kolom_baris[$td]['class'] + '" ';
                }
                if ($kolom_baris[$td]['class'] == undefined || $kolom_baris[$td]['class'] == null || $kolom_baris[$td]['class'] == '' || $kolom_baris[$td]['class'] == "") {
                    $class_td = '';
                }

                /** Check IF $kolom_baris[$td]['attr'] is Defined : */
                if ($kolom_baris[$td]['attr'] != undefined || $kolom_baris[$td]['attr'] != null || $kolom_baris[$td]['attr'] != '' || $kolom_baris[$td]['attr'] != "") {
                    $attr_td = ' ' + $kolom_baris[$td]['attr'] + ' ';
                }
                if ($kolom_baris[$td]['attr'] == undefined || $kolom_baris[$td]['attr'] == null || $kolom_baris[$td]['attr'] == '' || $kolom_baris[$td]['attr'] == "") {
                    $attr_td = '';
                }

                /** Check IF $kolom_baris[$td]['style'] is Defined : */
                if ($kolom_baris[$td]['style'] != undefined || $kolom_baris[$td]['style'] != null || $kolom_baris[$td]['style'] != '' || $kolom_baris[$td]['style'] != "") {
                    $style_td = ' style="' + $kolom_baris[$td]['style'] + '"';
                }
                if ($kolom_baris[$td]['style'] == undefined || $kolom_baris[$td]['style'] == null || $kolom_baris[$td]['style'] == '' || $kolom_baris[$td]['style'] == "") {
                    $style_td = '';
                }

                /** Check IF $kolom_baris[$td]['value'] is Defined : */
                if ($kolom_baris[$td]['value'] != undefined || $kolom_baris[$td]['value'] != null || $kolom_baris[$td]['value'] != '' || $kolom_baris[$td]['value'] != "") {

                    /** Switch for conditions $type_td : */
                    switch ($type_td) {
                        /** Case for $type_td == 'img' : */
                        case 'img' :
                            $value_td += $.NKTI_Table_addon_img_fancybox($kolom_baris[$td]['value'], '');
                            break;

                        /** Case for $type_td == 'input' : */
                        case 'input' :
                            $value_td += $.NKTI_Table_addon_input($kolom_baris[$td]['value'], '');
                            break;

                        /** Case for $type_td == 'radio' : */
                        case 'radio' :
                            $value_td += $.NKTI_Table_addon_radio($kolom_baris[$td]['value'], '');
                            break;

                        /** Case for $type_td == 'select' : */
                        case 'select' :
                            $value_td += $.NKTI_Table_addon_select_bootstrap($kolom_baris[$td]['value']);
                            break;

                        /** Case for $type_td == 'checkbox' : */
                        case 'checkbox' :
                            $value_td += $.NKTI_Table_addon_checkbox($kolom_baris[$td]['value']);
                            break;

                        /** Case for $type_td == 'button' : */
                        case 'button' :
                            $value_td += $.NKTI_Table_addon_button($kolom_baris[$td]['value']);
                            break;

                        /** Case for $type_td == 'custom-html' : */
                        case 'custom-html' :
                            $value_td += $.NKTI_Table_addon_custom_html_tag($kolom_baris[$td]['value']);
                            break;

                        /** Case for $type_td == 'html' : */
                        case 'html' :
                            $value_td += $kolom_baris[$td]['value'];
                            break;

                        /** Case for $type_td == 'text' : */
                        case 'text' :
                            $value_td += $kolom_baris[$td]['value'];
                            break;
                    }
                    /** End of switch for conditions $type_td. */
                }
                if ($kolom_baris[$td]['value'] == undefined || $kolom_baris[$td]['value'] == null || $kolom_baris[$td]['value'] == '' || $kolom_baris[$td]['value'] == "") {
                    $value_td = '';
                }

                /** Create Kolom Baris : */
                $td_result += '<td' + $id_td + $class_td + $attr_td + $style_td + '>' + $value_td + '</td>';
                //console.log('Kolom Baris : <td' + $id_td + $class_td + $attr_td + $style_td + '>' + $value_td + '</td>');

            } /** End of Check IF $kolom_baris[$td]['type'] is defined : */

            /** Check IF $kolom_baris[$td]['type'] is undefined : */
            if ($kolom_baris[$td]['type'] == undefined || $kolom_baris[$td]['type'] == null || $kolom_baris[$td]['type'] == '' || $kolom_baris[$td]['type'] == "") {

                /** Create Kolom Baris for Undefined : */
                $td_result += '<td>Undefined</td>';

            } /** End of Check IF $kolom_baris[$td]['type'] is undefined : */

            /** Auto Increment : */
            $td++;
        }
        /** End of while loop to Create Kolom Baris. */

        /** Return Result : */
        return $td_result;
    },
    /** End of For Create Kolom Baris Table.
     * ===================================================================================================== */

    /** For Create Baris Table :
     * -----------------------------------------------------------
     *
     * Format $data_baris :
     * -------------------------------------
     * Object [
     *      {
     *          "baris" : { "id" : [ID Produk], "class" : [custom class css], "attr" : [custom attr], "style" : [custom style] },
     *          "kolom" : [
     *                      {
     *                          "type" : [text | html | input | radio | checkbox | img ],
     *                          "value" : [value column rows],
     *                          "id" : [ID <td> Table],
     *                          "class" : [Class <td> Table],
     *                          "attr" : [ Attr <td> Table],
     *                          "style" : [ Style <td> Table],
     *                      },
     *          ]
     *      },
     * ]
     *
     * @param $data_baris {object} Variable yang data config baris table.
     * @param $selector {string} Variable yang berisi nama selector
     *                           untuk menyimpan hasil pembuatan baris table
     * @param $status_append {string} Variable yang berisi string status append. Ex : 0 | 1
     * @return {string}
     */
    NKTI_Table_create_baris: function ($data_baris, $selector, $status_append) {

        /** Define variable will be used in this function : */
        var $config_baris, $place, $tr_result = '', $tr_td_result = '', $result;

        /** Chec IF $data_baris is Defined : */
        if ($data_baris != undefined || $data_baris != null || $data_baris != '' || $data_baris != "") {

            /** Check IF $data_baris is Object : */
            if (typeof $data_baris == "object") {

                /** Define Config Baris Table : */
                $config_baris = $data_baris;

                //console.log('data baris table');
                //console.log($config_baris);

                /** Prepare while loop to Create Baris Table : */
                var $i = 0;
                var $until_loop = $config_baris.length;

                /** While loop to Create Baris Table : */
                while ($i < $until_loop) {

                    /** Check IF $config_baris[$i]['baris'] is defined : */
                    if ($config_baris[$i]['baris'] != undefined || $config_baris[$i]['baris'] != null || $config_baris[$i]['baris'] != '' || $config_baris[$i]['baris'] != "") {

                        /** Define Baris Table : */
                        var $baris_table = $config_baris[$i]['baris'];

                        /** Define variable will be used in this function : */
                        var $id_baris, $class_baris, $attr_baris, $style_baris;

                        /** Check FOR $baris_table['id'] : */
                        if ($baris_table['id'] != undefined || $baris_table['id'] != null || $baris_table['id'] != '' || $baris_table['id'] != "") {
                            $id_baris = ' id="'+$baris_table['id']+'" '
                        }
                        if ($baris_table['id'] == undefined || $baris_table['id'] == null || $baris_table['id'] == '' || $baris_table['id'] == "") {
                            $id_baris = '';
                        }

                        /** Check FOR $baris_table['class'] : */
                        if ($baris_table['class'] != undefined || $baris_table['class'] != null || $baris_table['class'] != '' || $baris_table['class'] != "") {
                            $class_baris = ' class="'+$baris_table['class']+'" '
                        }
                        if ($baris_table['class'] == undefined || $baris_table['class'] == null || $baris_table['class'] == '' || $baris_table['class'] == "") {
                            $class_baris = '';
                        }

                        /** Check FOR $baris_table['attr'] : */
                        if ($baris_table['attr'] != undefined || $baris_table['attr'] != null || $baris_table['attr'] != '' || $baris_table['attr'] != "") {
                            $attr_baris = ' '+$baris_table['attr']+' '
                        }
                        if ($baris_table['attr'] == undefined || $baris_table['attr'] == null || $baris_table['attr'] == '' || $baris_table['attr'] == "") {
                            $attr_baris = '';
                        }

                        /** Check FOR $baris_table['style'] : */
                        if ($baris_table['style'] != undefined || $baris_table['style'] != null || $baris_table['style'] != '' || $baris_table['style'] != "") {
                            $style_baris = ' style="'+$baris_table['style']+'" '
                        }
                        if ($baris_table['style'] == undefined || $baris_table['style'] == null || $baris_table['style'] == '' || $baris_table['style'] == "") {
                            $style_baris = '';
                        }

                        /** Create Baris Table : */
                        $tr_result += '<tr '+$id_baris+$class_baris+$attr_baris+$style_baris+'>';
                        $tr_result += $.NKTI_Table_create_isi_baris($config_baris[$i]['kolom']);
                        $tr_result += '</tr>';

                    } /** End of Check IF $config_baris[$i]['baris'] is defined. */

                    /** Check IF $config_baris[$i]['baris'] is undefined : */
                    if ($config_baris[$i]['baris'] == undefined || $config_baris[$i]['baris'] == null || $config_baris[$i]['baris'] == '' || $config_baris[$i]['baris'] == "") {
                        $result = 0;
                        console.error('Baris table tidak didefinisikan');
                        break;
                    } /** End of Check IF $config_baris[$i]['baris'] is undefined. */
                    
                    /** Auto Increment : */
                    $i++;
                } /** End of while loop to Create Baris Table. */

                /** Define result baris table : */
                $tr_td_result += $tr_result;

                /** Check IF $selector is defined : */
                if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                    /** Check IF $status_append is defined : */
                    if ($status_append != undefined || $status_append != null || $status_append != '' || $status_append != "" || $status_append == 1) {

                        /** Placing Result Rows Table : */
                        $($selector).append($tr_td_result);

                    } /** End of Check IF $status_append is defined. */

                    /** Check IF $status_append is undefined : */
                    if ($status_append == undefined || $status_append == null || $status_append == '' || $status_append == "") {

                        /** Placing Result Rows Table : */
                        $($selector).html($tr_td_result);

                    } /** End of Check IF $status_append is undefined. */

                } /** End of Check IF $selector is defined. */

                /** Check IF $selector is undefined : */
                if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {

                    /** Define result Rows table : */
                    $result = $tr_td_result;

                } /** End of Check IF $selector is undefined. */

            } /** End of Check IF $data_baris is Object. */

            /** Check IF $data_baris is not Object : */
            if (typeof $data_baris != "object") {
                $result = 0;
                console.error('Data config baris bukan object');
            } /** End of Check IF $data_baris is not Object. */

        } /** End of Chec IF $data_baris is Defined. */

        /** Chec IF $data_baris is Undefined : */
        if ($data_baris == undefined || $data_baris == null || $data_baris == '' || $data_baris == "") {
            $result = 0;
            console.error('Data config Baris table tidak didefinisikan');
        } /** End of Chec IF $data_baris is Undefined. */

        /** Return Result : */
        return $result;

    },
    /** End of For Create Baris Table.
     * ===================================================================================================== */

    /** For Create Custom HTML kolom baris Table :
     * -----------------------------------------------------------
     *
     * Format $data_html :
     * -------------------------------------
     * object {
     *      'tag' : '',
     *      'id' : '',
     *      'class' : '',
     *      'attr' : '',
     *      'style' : '',
     *      'text' : '',
     * }
     *
     * @param $data_html {object} Variable yang berisi object config untuk membuat Custom html tag.
     * @param $selector {string} Variable yang berisi nama selector untuk menyimpan
     */
    NKTI_Table_addon_custom_html_tag: function ($data_html, $selector) {

        /** Define variable will be used in this function : */
        var $config_html, $target_place, $tag_result = '', $result;

        /** Check IF $data_html is defined : */
        if ($data_html != undefined || $data_html != null || $data_html != '' || $data_html != "") {

            /** Define variable for config Custom html : */
            $config_html = $data_html;

            /** Check IF $config_html['tag'] is defined : */
            if ($config_html['tag'] != undefined || $config_html['tag'] != null || $config_html['tag'] != '' || $config_html['tag'] != "") {

                /** Define variable for name HTML Tag : */
                var $html_tag = $config_html['tag'];

                /** Define variable for attribute HTML Tag : */
                var $id_tag, $class_tag, $attr_tag, $style_tag, $text_html;

                /** Check FOR $config_html['id'] : */
                if ($config_html['id'] != undefined || $config_html['id'] != null || $config_html['id'] != '' || $config_html['id'] != "") {
                    $id_tag = ' id="'+$config_html['id']+'" ';
                }
                if ($config_html['id'] == undefined || $config_html['id'] == null || $config_html['id'] == '' || $config_html['id'] == "") {
                    $id_tag = ' ';
                }

                /** Check FOR $config_html['class'] : */
                if ($config_html['class'] != undefined || $config_html['class'] != null || $config_html['class'] != '' || $config_html['class'] != "") {
                    $class_tag = ' class="'+$config_html['class']+'" ';
                }
                if ($config_html['class'] == undefined || $config_html['class'] == null || $config_html['class'] == '' || $config_html['class'] == "") {
                    $class_tag = '';
                }

                /** Check FOR $config_html['attr'] : */
                if ($config_html['attr'] != undefined || $config_html['attr'] != null || $config_html['attr'] != '' || $config_html['attr'] != "") {
                    $attr_tag = ' '+$config_html['attr']+' ';
                }
                if ($config_html['attr'] == undefined || $config_html['attr'] == null || $config_html['attr'] == '' || $config_html['attr'] == "") {
                    $attr_tag = '';
                }

                /** Check FOR $config_html['style'] : */
                if ($config_html['style'] != undefined || $config_html['style'] != null || $config_html['style'] != '' || $config_html['style'] != "") {
                    $style_tag = ' style="'+$config_html['style']+'"';
                }
                if ($config_html['style'] == undefined || $config_html['style'] == null || $config_html['style'] == '' || $config_html['style'] == "") {
                    $style_tag = '';
                }

                /** Check FOR $config_html['text'] : */
                if ($config_html['text'] != undefined || $config_html['text'] != null || $config_html['text'] != '' || $config_html['text'] != "") {
                    $text_html = ''+$config_html['text']+'';
                }
                if ($config_html['text'] == undefined || $config_html['text'] == null || $config_html['text'] == '' || $config_html['text'] == "") {
                    $text_html = '';
                }

                /** Create Item Custom HTML : */
                $tag_result += '<'+$html_tag+$id_tag+$class_tag+$attr_tag+$style_tag+'>'+$text_html+'</'+$html_tag+'>';

                /** Check IF $selector is defined : */
                if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                    /** Define Target Place : */
                    $target_place = $($selector);

                    /** Placing result create header table : */
                    $target_place.html($tag_result);

                    /** Define variable for return result : */
                    $result = 1;

                } /** End of Check IF $selector is defined. */

                /** Check IF $selector is undefined : */
                if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {

                    /** Placing result into variable $result : */
                    $result = $tag_result;

                } /** End of Check IF $selector is undefined. */

            } /** End of Check IF $config_html['tag'] is defined. */

            /** Check IF $config_html['tag'] is undefined : */
            if ($config_html['tag'] == undefined || $config_html['tag'] == null || $config_html['tag'] == '' || $config_html['tag'] == "") {

                /** Create Error Log */
                console.error('Data name tag html is undefined');

                /** Define result : */
                $result = 0;

            } /** End of Check IF $config_html['tag'] is undefined. */

        } /** End of Check IF $data_html is defined. */

        /** Check IF $data_html is undefined : */
        if ($data_html == undefined || $data_html == null || $data_html == '' || $data_html == "") {

            /** Create Error Log : */
            console.error('Data config custom html is undefined');

            /** Define result : */
            $result = 0;

        } /** End of Check IF $data_html is undefined. */

        /** Return Result : */
        return $result;
    },
    /** End of For Create Custom HTML kolom baris Table.
     * ===================================================================================================== */

    /** For Create Form Input in rows column table :
     * -----------------------------------------------------------
     *
     * Format $data_input :
     * ---------------------------
     * object {
     *      'name' : '',
     *      'type' : [ text | checkbox | radio ],
     *      'value' : '',
     *      'id' : '',
     *      'class' : '',
     *      'attr' : '',
     *      'style' : '',
     * }
     *
     * @param $data_input {object} Berisi config form input.
     * @param $selector {string} Berisi selector untuk menempatkan hasil pembuatan input FORM.
     * @return {string}
     */
    NKTI_Table_addon_input: function($data_input, $selector) {

        /** Define variable will be used in this function : */
        var $data_form;
        var $input_form = '';
        var $result_action = 0;

        /** Check IF $data_input is defined : */
        if ($data_input != undefined || $data_input != null || $data_input != '' || $data_input != "") {

            /** Define Data config Input FORM : */
            $data_form = $data_input;
            var $type_input = 'text', $name_input = '', $value_input = '', $id_input = '',
                $class_input = '', $attr_input = '', $style_input = '', $placeholder_input = '';

            /** Check IF $data_form['name'] : */
            if ($data_form['name'] != undefined || $data_form['name'] != null || $data_form['name'] != '' || $data_form['name'] != "") {

                /** Define name input form : */
                $name_input = $data_form['name'];

                /** Check For $data_form['type'] : */
                if ($data_form['type'] != undefined || $data_form['type'] != null || $data_form['type'] != '' || $data_form['type'] != "") {
                    $type_input = $data_form['type'];
                }
                if ($data_form['type'] == undefined || $data_form['type'] == null || $data_form['type'] == '' || $data_form['type'] == "") {
                    $type_input = '';
                }

                /** Check For $data_form['value'] : */
                if ($data_form['value'] != undefined || $data_form['value'] != null || $data_form['value'] != '' || $data_form['value'] != "") {
                    $value_input = ' value="'+$data_form['value']+'"';
                }
                if ($data_form['value'] == undefined || $data_form['value'] == null || $data_form['value'] == '' || $data_form['value'] == "") {
                    $value_input = '';
                }

                /** Check For $data_form['id'] : */
                if ($data_form['id'] != undefined || $data_form['id'] != null || $data_form['id'] != '' || $data_form['id'] != "") {
                    $id_input = ' id="'+$data_form['id']+'" ';
                }
                if ($data_form['id'] == undefined || $data_form['id'] == null || $data_form['id'] == '' || $data_form['id'] == "") {
                    $id_input = '';
                }

                /** Check For $data_form['class'] : */
                if ($data_form['class'] != undefined || $data_form['class'] != null || $data_form['class'] != '' || $data_form['class'] != "") {
                    $class_input = ' class="'+$data_form['class']+'" ';
                }
                if ($data_form['class'] == undefined || $data_form['class'] == null || $data_form['class'] == '' || $data_form['class'] == "") {
                    $class_input = '';
                }

                /** Check For $data_form['attr'] : */
                if ($data_form['attr'] != undefined || $data_form['attr'] != null || $data_form['attr'] != '' || $data_form['attr'] != "") {
                    $attr_input = ' '+$data_form['attr']+' ';
                }
                if ($data_form['attr'] == undefined || $data_form['attr'] == null || $data_form['attr'] == '' || $data_form['attr'] == "") {
                    $attr_input = '';
                }

                /** Check For $data_form['style'] : */
                if ($data_form['style'] != undefined || $data_form['style'] != null || $data_form['style'] != '' || $data_form['style'] != "") {
                    $style_input = ' style="'+$data_form['style']+'" ';
                }
                if ($data_form['style'] == undefined || $data_form['style'] == null || $data_form['style'] == '' || $data_form['style'] == "") {
                    $style_input = '';
                }

                /** Check For $data_form['placeholder'] : */
                if ($data_form['placeholder'] != undefined || $data_form['placeholder'] != null || $data_form['placeholder'] != '' || $data_form['placeholder'] != "") {
                    $placeholder_input = ' placeholder="'+$data_form['placeholder']+'" ';
                }
                if ($data_form['placeholder'] == undefined || $data_form['placeholder'] == null || $data_form['placeholder'] == '' || $data_form['placeholder'] == "") {
                    $placeholder_input = '';
                }

                /** Switch for conditions $type_input : */
                switch ($type_input) {
                /** Case for $type_input == 'text' : */
                    case 'text' :
                        $input_form = '<div class="form-group">';
                        $input_form += '<div class="col-md-12">';
                        $input_form += '<input type="text" name="'+$name_input+'"'+$id_input+$class_input+$attr_input+$style_input+$value_input+'>';
                        $input_form += '</div>';
                        $input_form += '</div>';
                        break;

                /** Case for $type_input == 'radio' : */
                    case 'radio' :
                        $input_form = '<div class="form-group">';
                        $input_form += '<div class="col-md-12">';
                        $input_form += '<input type="radio" name="'+$name_input+'"'+$id_input+$class_input+$attr_input+$style_input+$value_input+'>';
                        $input_form += '</div>';
                        $input_form += '</div>';
                        break;

                /** Case for $type_input == 'checkbox' : */
                    case 'checkbox' :
                        $input_form = '<div class="form-group">';
                        $input_form += '<div class="col-md-12">';
                        $input_form += '<input type="checkbox" name="'+$name_input+'"'+$id_input+$class_input+$attr_input+$style_input+$value_input+'>';
                        $input_form += '</div>';
                        $input_form += '</div>';
                        break;

                /** Default Case : */
                    default :
                        $input_form = '<div class="form-group">';
                        $input_form += '<div class="col-md-12">';
                        $input_form += '<input type="text" name="'+$name_input+'"'+$id_input+$class_input+$attr_input+$style_input+$value_input+'>';
                        $input_form += '</div>';
                        $input_form += '</div>';
                        break;
                } /** End of switch for conditions $type_input. */

                /** Check IF $selector is defined : */
                if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {
                    $($selector).html($input_form);
                    $result_action = 1;
                } /** End of Check IF $selector is defined : */

                /** Check IF $selector is Undefined : */
                if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {
                    $result_action = $input_form;
                } /** End of Check IF $selector is Undefined : */

            } /** Check IF $data_form['name'] is defined : */

            /** Check IF $data_form['name'] is undefined : */
            if ($data_form['name'] == undefined || $data_form['name'] == null || $data_form['name'] == '' || $data_form['name'] == "") {
                console.error('Name Input is Undefined');
                $result_action = 0;
            } /** End of Check IF $data_form['name'] is undefined : */

        } /** End of Check IF $data_input is defined : */

        /** Check IF $data_input is undefined : */
        if ($data_input == undefined || $data_input == null || $data_input == '' || $data_input == "") {
            console.error('Data Input FORM is Undefined !!!');
            $result_action = 0;
        } /** End of Check IF $data_input is undefined. */

        /** Return Input FORM : */
        return $result_action;
    },
    /** End of For Create FORM Input type Text.
     * ===================================================================================================== */

    /** For Create FORM Input type Radio :
     * -----------------------------------------------------------
     *
     * Format $data_input :
     * -------------------------------------
     * Object {
     *      'id' : '',
     *      'attr' : '',
     *      'name' : '',
     *      'class' : '',
     *      'value' : '',
     * }
     *
     * @param $data_input {object} Berisi data config untuk pembuatan form input.
     * @param $selector {string} Berisi selector untuk penyimpan hasil pembuatan form input radio.
     */
    NKTI_Table_addon_radio: function($data_input, $selector) {

        /** Define variable will be used in this function : */
        var $data_config, $place, $return_data;

        /** Check IF $data_input is defined : */
        if ($data_input != undefined || $data_input != null || $data_input != '' || $data_input != "") {

            /** Check IF $data_input is object : */
            if (typeof $data_input == "object") {

                /** Define config Input FORM Radio : */
                $data_config = $data_input;

                /** define variable for result : */
                var $result_radio = '';

                /** Define wrapper Radio FORM : */
                $result_radio += '<div class="icheck-inline">';

                /** Prepare while loop to Create Item Radio FORM : */
                var $i = 0;
                var $until_loop = $data_config.length;

                /** While loop to Create Item Radio FORM : */
                while ($i < $until_loop) {

                    /** Define variable for Data Config : */
                    var $id_radio, $attr_radio, $name_radio, $class_radio, $value_radio, $title_radio;

                    /** Check FOR $data_config['id']: */
                    if ($data_config[$i]['id'] != undefined || $data_config[$i]['id'] != null || $data_config[$i]['id'] != '' || $data_config[$i]['id'] != "") {
                        $id_radio = ' id="' + $data_config[$i]['id'] + '" ';
                    }
                    if ($data_config[$i]['id'] == undefined || $data_config[$i]['id'] == null || $data_config[$i]['id'] == '' || $data_config[$i]['id'] == "") {
                        $id_radio = '';
                    }

                    /** Check FOR $data_config[$i]['class']: */
                    if ($data_config[$i]['class'] != undefined || $data_config[$i]['class'] != null || $data_config[$i]['class'] != '' || $data_config[$i]['class'] != "") {
                        $class_radio = ' class="'+$data_config[$i]['class']+'" ';
                    }
                    if ($data_config[$i]['class'] == undefined || $data_config[$i]['class'] == null || $data_config[$i]['class'] == '' || $data_config[$i]['class'] == "") {
                        $class_radio = '';
                    }

                    /** Check FOR $data_config[$i]['attr]: */
                    if ($data_config[$i]['attr'] != undefined || $data_config[$i]['attr'] != null || $data_config[$i]['attr'] != '' || $data_config[$i]['attr'] != "") {
                        $attr_radio = ' '+$data_config[$i]['attr']+' ';
                    }
                    if ($data_config[$i]['attr'] == undefined || $data_config[$i]['attr'] == null || $data_config[$i]['attr'] == '' || $data_config[$i]['attr'] == "") {
                        $attr_radio = '';
                    }

                    /** Check FOR $data_config[$i]['name']: */
                    if ($data_config[$i]['name'] != undefined || $data_config[$i]['name'] != null || $data_config[$i]['name'] != '' || $data_config[$i]['name'] != "") {
                        $name_radio = $data_config[$i]['name'];
                    }
                    if ($data_config[$i]['name'] == undefined || $data_config[$i]['name'] == null || $data_config[$i]['name'] == '' || $data_config[$i]['name'] == "") {
                        $name_radio = 'undefined';
                    }

                    /** Check FOR $data_config[$i]['value']: */
                    if ($data_config[$i]['value'] != undefined || $data_config[$i]['value'] != null || $data_config[$i]['value'] != '' || $data_config[$i]['value'] != "") {
                        $value_radio = ' value="'+$data_config[$i]['value']+'" ';
                    }
                    if ($data_config[$i]['value'] == undefined || $data_config[$i]['value'] == null || $data_config[$i]['value'] == '' || $data_config[$i]['value'] == "") {
                        $value_radio = '';
                    }

                    /** Check FOR $data_config[$i]['title']: */
                    if ($data_config[$i]['title'] != undefined || $data_config[$i]['title'] != null || $data_config[$i]['title'] != '' || $data_config[$i]['title'] != "") {
                        $title_radio = $data_config[$i]['title'];
                    }
                    if ($data_config[$i]['title'] == undefined || $data_config[$i]['title'] == null || $data_config[$i]['title'] == '' || $data_config[$i]['title'] == "") {
                        $title_radio = '';
                    }

                    /** Create Item FORM input : */
                    $result_radio += '<div class="radio-check-img-list-edit">'; /** Begin Wrapper Radio FORM. */
                    $result_radio += '<div class="malltronik-radio-label">'; /** Begin Wrapper Label Radio FORM. */
                    $result_radio += $title_radio; /** Title Radio FORM. */
                    $result_radio += '</div>'; /** Ending Wrapper Label Radio FORM. */
                    $result_radio += '<div class="malltronik-radio">'; /** Begin Wrapper Item Radio FORM. */
                    $result_radio += '<input type="radio" '+$id_radio+$class_radio+$attr_radio+$value_radio+' name="'+$name_radio+'"/>';
                    $result_radio += '</div>'; /** Ending Wrapper Item Radio FORM. */
                    $result_radio += '</div>'; /** Ending Wrapper Radio FORM. */

                    /** Auto Increment : */
                    $i++;

                } /** End of while loop to Create Item Radio FORM. */

                /** Ending Wrapper Radio FORM : */
                $result_radio += '</div>';

                /** Check IF $selector is defined : */
                if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                    /** Define variable for placing result : */
                    $place = $selector;

                    /** Placing result into selector : */
                    $($place).html($result_radio);

                    /** Return $result : */
                    $return_data = 1;

                } /** End of Check IF $selector is defined : */

                /** Check IF $selector is undefined : */
                if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {

                    /** Return $result : */
                    $return_data = $result_radio;

                } /** End of Check IF $selector is defined : */

            } /** End of Check IF $data_input is object. */

            /** Check IF $data_input is not object : */
            if (typeof $data_input != "object") {
                console.error('Data config not valid.');
                $return_data = 0;
            }
            /** End of Check IF $data_input is not object. */

        } /** End of Check IF $data_input is defined. */

        /** Check IF $data_input is undefined : */
        if ($data_input == undefined || $data_input == null || $data_input == '' || $data_input == "") {
            console.error('Data Config Radio Input Form is undefined !!');
            $return_data = 0;
        } /** End of Check IF $data_input is undefined. */

        /** Return Result : */
        return $return_data;

    },
    /** End of For Create FORM Input type Radio.
     * ===================================================================================================== */

    /** Create FORM Input type Checkbox :
     * -----------------------------------------------------------
     *
     * Format Data Checkbox :
     * -------------------------------------
     * object {
     *      'wrap' : {
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *      },
     *      'inner' : {
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *      },
     *      'checkbox' : {
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *          'name' : '',
     *          'value' : '',
     *      }
     * }
     *
     * @param $data_checkbox {object} Variable yang berisi data config untuk membuat checkbox.
     * @param $selector {string} Variable yang berisi nama selector untuk menyimpan
     *                           hasil pembuatan Checkbox FORM.
     * @return {string|integer}
     */
    NKTI_Table_addon_checkbox: function ($data_checkbox, $selector) {

        /** Define variable will be used in this function : */
        var $config_checkbox,
            $target_place,
            $wrap_checkbox = '',
            $inner_checkbox = '',
            $checkbox = '',
            $result_checkbox = '', $result;

        /** Check IF $data_checkbox is defined : */
        if ($data_checkbox != undefined || $data_checkbox != null || $data_checkbox != '' || $data_checkbox != "") {

            /** Define variable for data config checkbox : */
            $config_checkbox = $data_checkbox;

            console.log($config_checkbox);

            /** Define variable for data config checkbox : */
            var $id_wrap_checkbox, $class_wrap_checkbox, $attr_wrap_checkbox, $style_wrap_checkbox;
            var $id_inner_checkbox, $class_inner_checkbox, $attr_inner_checkbox, $style_inner_checkbox;
            var $id_checkbox, $class_checkbox, $attr_checkbox, $style_checkbox, $value_checkbox, $name_checkbox;

            // For Wrapper Checkbox :
            // ==================================================================================================

            /** Check IF $config_checkbox['wrap'] is defined : : */
            if ($config_checkbox['wrap'] != undefined || $config_checkbox['wrap'] != null || $config_checkbox['wrap'] != '' || $config_checkbox['wrap'] != "") {

                /** Check FOR $config_checkbox['wrap']['id'] : */
                if ($config_checkbox['wrap']['id'] != undefined || $config_checkbox['wrap']['id'] != null || $config_checkbox['wrap']['id'] != '' || $config_checkbox['wrap']['id'] != "") {
                    $id_wrap_checkbox = ' id="'+$config_checkbox['wrap']['id']+'" ';
                }
                if ($config_checkbox['wrap']['id'] == undefined || $config_checkbox['wrap']['id'] == null || $config_checkbox['wrap']['id'] == '' || $config_checkbox['wrap']['id'] == "") {
                    $id_wrap_checkbox = ' ';
                }

                /** Check FOR $config_checkbox['wrap']['class'] : */
                if ($config_checkbox['wrap']['class'] != undefined || $config_checkbox['wrap']['class'] != null || $config_checkbox['wrap']['class'] != '' || $config_checkbox['wrap']['class'] != "") {
                    $class_wrap_checkbox = ' '+$config_checkbox['wrap']['class'];
                }
                if ($config_checkbox['wrap']['class'] == undefined || $config_checkbox['wrap']['class'] == null || $config_checkbox['wrap']['class'] == '' || $config_checkbox['wrap']['class'] == "") {
                    $class_wrap_checkbox = '';
                }

                /** Check FOR $config_checkbox['wrap']['attr'] : */
                if ($config_checkbox['wrap']['attr'] != undefined || $config_checkbox['wrap']['attr'] != null || $config_checkbox['wrap']['attr'] != '' || $config_checkbox['wrap']['attr'] != "") {
                    $attr_wrap_checkbox = ' '+$config_checkbox['wrap']['attr']+' ';
                }
                if ($config_checkbox['wrap']['attr'] == undefined || $config_checkbox['wrap']['attr'] == null || $config_checkbox['wrap']['attr'] == '' || $config_checkbox['wrap']['attr'] == "") {
                    $attr_wrap_checkbox = '';
                }

                /** Check FOR $config_checkbox['wrap']['style'] : */
                if ($config_checkbox['wrap']['style'] != undefined || $config_checkbox['wrap']['style'] != null || $config_checkbox['wrap']['style'] != '' || $config_checkbox['wrap']['style'] != "") {
                    $style_wrap_checkbox = ' style="'+$config_checkbox['wrap']['style']+'"';
                }
                if ($config_checkbox['wrap']['style'] == undefined || $config_checkbox['wrap']['style'] == null || $config_checkbox['wrap']['style'] == '' || $config_checkbox['wrap']['style'] == "") {
                    $style_wrap_checkbox = '';
                }

                /** Begin Wrapper Wrapper Checkbox : */
                $result_checkbox += '<div'+$id_wrap_checkbox+'class="'+$class_wrap_checkbox+'"'+$attr_wrap_checkbox+$style_wrap_checkbox+'>';

            } /** End of Check IF $config_checkbox['wrap'] is defined :. */

            // FOR Inner Checkbox :
            // ==================================================================================================

            /** Check IF $config_checkbox['inner'] is defined : */
            if ($config_checkbox['inner'] != undefined || $config_checkbox['inner'] != null || $config_checkbox['inner'] != '' || $config_checkbox['inner'] != "") {

                /** Check FOR $config_checkbox['inner']['id'] : */
                if ($config_checkbox['inner']['id'] != undefined || $config_checkbox['inner']['id'] != null || $config_checkbox['inner']['id'] != '' || $config_checkbox['inner']['id'] != "") {
                    $id_inner_checkbox = ' id="'+$config_checkbox['inner']['id']+'" ';
                }
                if ($config_checkbox['inner']['id'] == undefined || $config_checkbox['inner']['id'] == null || $config_checkbox['inner']['id'] == '' || $config_checkbox['inner']['id'] == "") {
                    $id_inner_checkbox = ' ';
                }

                /** Check FOR $config_checkbox['inner']['class'] : */
                if ($config_checkbox['inner']['class'] != undefined || $config_checkbox['inner']['class'] != null || $config_checkbox['inner']['class'] != '' || $config_checkbox['inner']['class'] != "") {
                    $class_inner_checkbox = ' class="'+$config_checkbox['inner']['class']+'" ';
                }
                if ($config_checkbox['inner']['class'] == undefined || $config_checkbox['inner']['class'] == null || $config_checkbox['inner']['class'] == '' || $config_checkbox['inner']['class'] == "") {
                    $class_inner_checkbox = '';
                }

                /** Check FOR $config_checkbox['inner']['attr'] : */
                if ($config_checkbox['inner']['attr'] != undefined || $config_checkbox['inner']['attr'] != null || $config_checkbox['inner']['attr'] != '' || $config_checkbox['inner']['attr'] != "") {
                    $attr_inner_checkbox = ' '+$config_checkbox['inner']['attr']+' ';
                }
                if ($config_checkbox['inner']['attr'] == undefined || $config_checkbox['inner']['attr'] == null || $config_checkbox['inner']['attr'] == '' || $config_checkbox['inner']['attr'] == "") {
                    $attr_inner_checkbox = '';
                }

                /** Check FOR $config_checkbox['inner']['style'] : */
                if ($config_checkbox['inner']['style'] != undefined || $config_checkbox['inner']['style'] != null || $config_checkbox['inner']['style'] != '' || $config_checkbox['inner']['style'] != "") {
                    $style_inner_checkbox = ' style="'+$config_checkbox['inner']['style']+'" ';
                }
                if ($config_checkbox['inner']['style'] == undefined || $config_checkbox['inner']['style'] == null || $config_checkbox['inner']['style'] == '' || $config_checkbox['inner']['style'] == "") {
                    $style_inner_checkbox = '';
                }

                /** Begin Inner Wrapper Checkbox : */
                $result_checkbox += '<span'+$id_inner_checkbox+$class_inner_checkbox+$attr_inner_checkbox+$style_inner_checkbox+'>';

            } /** End of Check IF $config_checkbox['inner'] is defined. */

            // FOR Checkbox :
            // ==================================================================================================

            /** Check FOR $config_checkbox['checkbox']['id'] : */
            if ($config_checkbox['checkbox']['id'] != undefined || $config_checkbox['checkbox']['id'] != null || $config_checkbox['checkbox']['id'] != '' || $config_checkbox['checkbox']['id'] != "") {
                $id_checkbox = ' id="' + $config_checkbox + '" ';
            }
            if ($config_checkbox['checkbox']['id'] == undefined || $config_checkbox['checkbox']['id'] == null || $config_checkbox['checkbox']['id'] == '' || $config_checkbox['checkbox']['id'] == "") {
                $id_checkbox = ' ';
            }

            /** Check FOR $config_checkbox['checkbox']['class'] : */
            if ($config_checkbox['checkbox']['class'] != undefined || $config_checkbox['checkbox']['class'] != null || $config_checkbox['checkbox']['class'] != '' || $config_checkbox['checkbox']['class'] != "") {
                $class_checkbox = ' class="' + $config_checkbox + '" ';
            }
            if ($config_checkbox['checkbox']['class'] == undefined || $config_checkbox['checkbox']['class'] == null || $config_checkbox['checkbox']['class'] == '' || $config_checkbox['checkbox']['class'] == "") {
                $class_checkbox = '';
            }

            /** Check FOR $config_checkbox['checkbox']['attr'] : */
            if ($config_checkbox['checkbox']['attr'] != undefined || $config_checkbox['checkbox']['attr'] != null || $config_checkbox['checkbox']['attr'] != '' || $config_checkbox['checkbox']['attr'] != "") {
                $attr_checkbox = ' ' + $config_checkbox + ' ';
            }
            if ($config_checkbox['checkbox']['attr'] == undefined || $config_checkbox['checkbox']['attr'] == null || $config_checkbox['checkbox']['attr'] == '' || $config_checkbox['checkbox']['attr'] == "") {
                $attr_checkbox = '';
            }

            /** Check FOR $config_checkbox['checkbox']['style'] : */
            if ($config_checkbox['checkbox']['style'] != undefined || $config_checkbox['checkbox']['style'] != null || $config_checkbox['checkbox']['style'] != '' || $config_checkbox['checkbox']['style'] != "") {
                $style_checkbox = ' style="' + $config_checkbox + '" ';
            }
            if ($config_checkbox['checkbox']['style'] == undefined || $config_checkbox['checkbox']['style'] == null || $config_checkbox['checkbox']['style'] == '' || $config_checkbox['checkbox']['style'] == "") {
                $style_checkbox = '';
            }

            /** Check FOR $config_checkbox['checkbox']['name'] : */
            if ($config_checkbox['checkbox']['name'] != undefined || $config_checkbox['checkbox']['name'] != null || $config_checkbox['checkbox']['name'] != '' || $config_checkbox['checkbox']['name'] != "") {
                $name_checkbox = ' name="' + $config_checkbox['checkbox']['name'] + '" ';
            }
            if ($config_checkbox['checkbox']['name'] == undefined || $config_checkbox['checkbox']['name'] == null || $config_checkbox['checkbox']['name'] == '' || $config_checkbox['checkbox']['name'] == "") {
                $name_checkbox = '';
            }

            /** Check FOR $config_checkbox['checkbox']['value'] : */
            if ($config_checkbox['checkbox']['value'] != undefined || $config_checkbox['checkbox']['value'] != null || $config_checkbox['checkbox']['value'] != '' || $config_checkbox['checkbox']['value'] != "") {
                $value_checkbox = ' value="' + $config_checkbox['checkbox']['value'] + '" ';
            }
            if ($config_checkbox['checkbox']['value'] == undefined || $config_checkbox['checkbox']['value'] == null || $config_checkbox['checkbox']['value'] == '' || $config_checkbox['checkbox']['value'] == "") {
                $value_checkbox = '';
            }

            /** Create Item Checkbox : */
            $result_checkbox += '<input type="checkbox"'+$class_checkbox+$name_checkbox+$value_checkbox+$style_checkbox+'>';

            /** Check IF $config_checkbox['inner'] is defined : */
            if ($config_checkbox['inner'] != undefined || $config_checkbox['inner'] != null || $config_checkbox['inner'] != '' || $config_checkbox['inner'] != "") {

                /** Begin Inner Wrapper Checkbox : */
                $result_checkbox += '</span>';

            } /** End of Check IF $config_checkbox['inner'] is defined. */

            /** Check IF $config_checkbox['wrap'] is defined. */
            if ($config_checkbox['wrap'] != undefined || $config_checkbox['wrap'] != null || $config_checkbox['wrap'] != '' || $config_checkbox['wrap'] != "") {

                /** Ending Wrapper Checkbox : */
                $result_checkbox += '</div>';
            } /** End of Check IF $config_checkbox['wrap'] is defined. */

            /** Check IF $selector is defined : */
            if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                /** Define Target Place result : */
                $target_place = $($selector);

                /** Placing Result CHeckbox into target place : */
                $target_place.html($result_checkbox);

                /** Define result : */
                $result = 1;

            } /** End of Check IF $selector is defined. */

            /** Check IF $selector is undefined : */
            if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {

                /** Placing Result Checkbox : */
                $result = $result_checkbox;

            } /** End of Check IF $selector is undefined. */

        } /** End of Check IF $data_checkbox is defined. */

        /** Check IF $data_checkbox is undefined : */
        if ($data_checkbox == undefined || $data_checkbox == null || $data_checkbox == '' || $data_checkbox == "") {
            console.error('Data config checkbox is undefined');
            $result = 0;
        } /** End of Check IF $data_checkbox is undefined. */

        /** Return Result : */
        return $result;

    },
    /** End of Create FORM Input type Checkbox.
     * ===================================================================================================== */

    /** For Create Image Fancy Box :
     * -----------------------------------------------------------
     *
     * Format $data_input :
     * -------------------------------------
     *
     * @param $config {object} Berisi data config pembuatan image.
     * @param $selector {string} Berisi nama selector untuk penempatkan hasil pembuatan Image Fancybox.
     * @result {string|integer}
     */
    NKTI_Table_addon_img_fancybox: function($config, $selector) {

        /** Define variable will be used in this function : */
        var $data_config, $item_img = '', $result_creator = null;

        /** Check IF $config is defined : */
        if ($config != undefined || $config != null || $config != '' || $config != "") {

            /** Define data config : */
            $data_config = $config;

            /** Define variable for data config image fancybox : */
            var $id_img, $id_tag_a, $class_img, $attr_img, $style_img, $url_img;

            /** Check For $data_config['id'] : */
            if ($data_config['id'] != undefined || $data_config['id'] != null || $data_config['id'] != '' || $data_config['id'] != "") {
                $id_img = ' id="' + $data_config['id'] + '" ';
                $id_tag_a = $data_config['id'];
            }
            if ($data_config['id'] == undefined || $data_config['id'] == null || $data_config['id'] == '' || $data_config['id'] == "") {
                $id_img = '';
            }

            /** Check For $data_config['class'] : */
            if ($data_config['class'] != undefined || $data_config['class'] != null || $data_config['class'] != '' || $data_config['class'] != "") {
                $class_img = $data_config['class'];
            }
            if ($data_config['class'] == undefined || $data_config['class'] == null || $data_config['class'] == '' || $data_config['class'] == "") {
                $class_img = '';
            }

            /** Check For $data_config['attr'] : */
            if ($data_config['attr'] != undefined || $data_config['attr'] != null || $data_config['attr'] != '' || $data_config['attr'] != "") {
                $attr_img = $data_config['attr'];
            }
            if ($data_config['attr'] == undefined || $data_config['attr'] == null || $data_config['attr'] == '' || $data_config['attr'] == "") {
                $attr_img = '';
            }

            /** Check For $data_config['style'] : */
            if ($data_config['style'] != undefined || $data_config['style'] != null || $data_config['style'] != '' || $data_config['style'] != "") {
                $style_img = ' style="'+$data_config['style']+'" ';
            }
            if ($data_config['style'] == undefined || $data_config['style'] == null || $data_config['style'] == '' || $data_config['style'] == "") {
                $style_img = '';
            }

            /** Check For $data_config['url-akses'] : */
            if ($data_config['url'] != undefined || $data_config['url'] != null || $data_config['url'] != '' || $data_config['url'] != "") {
                $url_img = $data_config['url'];
            }
            if ($data_config['url'] == undefined || $data_config['url'] == null || $data_config['url'] == '' || $data_config['url'] == "") {
                $url_img = '';
            }

            /** Create Item Image : */
            $item_img += '<a id="'+$id_tag_a+'-atag" data-href="'+$url_img+'" target="blank" class="fancybox-button" data-rel="fancybox-button">';
            $item_img += '<img '+$id_img+'class="img-responsive '+$class_img+'" src="'+$url_img+'" '+$attr_img+' alt="" '+$style_img+'>';
            $item_img += '</a>';

            /** Check IF $selector is defined : */
            if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {
                $($selector).html($item_img);
                $result_creator = 1;
            } /** End of Check IF $selector is defined. */

            /** Check IF $selector is undefined : */
            if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {
                $result_creator = $item_img;
            } /** End of Check IF $selector is undefined. */

        } /** End of Check IF $config is defined. */

        /** Check IF $config is defined : */
        if ($config == undefined || $config == null || $config == '' || $config == "") {
            console.error('Data Config is undefiend');
            $result_creator = 0;
        } /** End of Check IF $config is defined. */

        /** Return result : */
        return $result_creator;
    },
    /** End of For Create Image Fancy Box.
     * ===================================================================================================== */

    /** For Create Button Table :
     * -----------------------------------------------------------
     *
     * Format $data_button :
     * -------------------------------------
     * object [
     *      {
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *          'title' : '',
     *          'icon' : '',
     *          'href' : '',
     *      }
     * ]
     *
     * @param $data_button {object} Variable yang berisi data config untuk membuat button.
     * @param $selector {string} Variable yang berisi
     */
    NKTI_Table_addon_button: function ($data_button, $selector) {

        /** Define Variable will be used in this function : */
        var $config_button, $target_place, $result_button = '', $result;

        /** Check IF $data_button is defined : */
        if ($data_button != undefined || $data_button != null || $data_button != '' || $data_button != "") {

            /** Define Config Button : */
            $config_button = $data_button;

            /** Define variable for placing attribute HTML TAG : */
            var $id_button, $class_button, $attr_button, $style_button, $title_button, $icon_button, $href_button;

            /** Prepare while loop to Create Button : */
            var $i = 0;
            var $until_loop = $config_button.length;

            /** While loop to Create Button : */
            while ($i < $until_loop) {

                /** Check FOR $config_button[$i]['id'] : */
                if ($config_button[$i]['id'] != undefined || $config_button[$i]['id'] != null || $config_button[$i]['id'] != '' || $config_button[$i]['id'] != "") {
                    $id_button = ' id="'+$config_button[$i]['id']+'" ';
                }
                if ($config_button[$i]['id'] == undefined || $config_button[$i]['id'] == null || $config_button[$i]['id'] == '' || $config_button[$i]['id'] == "") {
                    $id_button = '';
                }

                /** Check FOR $config_button[$i]['class'] : */
                if ($config_button[$i]['class'] != undefined || $config_button[$i]['class'] != null || $config_button[$i]['class'] != '' || $config_button[$i]['class'] != "") {
                    $class_button = ' class="'+$config_button[$i]['class']+'" ';
                }
                if ($config_button[$i]['class'] == undefined || $config_button[$i]['class'] == null || $config_button[$i]['class'] == '' || $config_button[$i]['class'] == "") {
                    $class_button = '';
                }

                /** Check FOR $config_button[$i]['attr'] : */
                if ($config_button[$i]['attr'] != undefined || $config_button[$i]['attr'] != null || $config_button[$i]['attr'] != '' || $config_button[$i]['attr'] != "") {
                    $attr_button = ' '+$config_button[$i]['attr']+' ';
                }
                if ($config_button[$i]['attr'] == undefined || $config_button[$i]['attr'] == null || $config_button[$i]['attr'] == '' || $config_button[$i]['attr'] == "") {
                    $attr_button = '';
                }

                /** Check FOR $config_button[$i]['style'] : */
                if ($config_button[$i]['style'] != undefined || $config_button[$i]['style'] != null || $config_button[$i]['style'] != '' || $config_button[$i]['style'] != "") {
                    $style_button = ' style="'+$config_button[$i]['style']+'"';
                }
                if ($config_button[$i]['style'] == undefined || $config_button[$i]['style'] == null || $config_button[$i]['style'] == '' || $config_button[$i]['style'] == "") {
                    $style_button = '';
                }

                /** Check FOR $config_button[$i]['title'] : */
                if ($config_button[$i]['title'] != undefined || $config_button[$i]['title'] != null || $config_button[$i]['title'] != '' || $config_button[$i]['title'] != "") {
                    $title_button = $config_button[$i]['title'];
                }
                if ($config_button[$i]['title'] == undefined || $config_button[$i]['title'] == null || $config_button[$i]['title'] == '' || $config_button[$i]['title'] == "") {
                    $title_button = 'Undefined Title';
                }

                /** Check FOR $config_button[$i]['icon'] : */
                if ($config_button[$i]['icon'] != undefined || $config_button[$i]['icon'] != null || $config_button[$i]['icon'] != '' || $config_button[$i]['icon'] != "") {
                    $icon_button = $config_button[$i]['icon'];
                }
                if ($config_button[$i]['icon'] == undefined || $config_button[$i]['icon'] == null || $config_button[$i]['icon'] == '' || $config_button[$i]['icon'] == "") {
                    $icon_button = '';
                }


                /** Check FOR $config_button[$i]['href'] : */
                if ($config_button[$i]['href'] != undefined || $config_button[$i]['href'] != null || $config_button[$i]['href'] != '' || $config_button[$i]['href'] != "") {
                    $href_button = 'href="'+$config_button[$i]['href']+'" ';
                }
                if ($config_button[$i]['href'] == undefined || $config_button[$i]['href'] == null || $config_button[$i]['href'] == '' || $config_button[$i]['href'] == "") {
                    $href_button = '';
                }

                /** Create Item Button : */
                $result_button += '<button '+$href_button+$id_button+$class_button+$attr_button+$style_button+'>'+$icon_button+' '+$title_button+'</button>';

                /** Auto Increment : */
                $i++;
            }
            /** End of while loop to Create Button. */

            /** Check IF $selector is defined : */
            if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                /** Define Selector : */
                $target_place = $($selector);

                /** Placing result into inner $target_place : */
                $target_place.html($result_button);

                /** Return Result : */
                $result = 1;

            } /** End of Check IF $selector is defined. */

            /** Check IF $selector is undefined : */
            if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {

                /** Define Return Result : */
                $result = $result_button;

            } /** End of Check IF $selector is undefined. */

        } /** End of Check IF $data_button is defined. */

        /** Check IF $data_button is undefined : */
        if ($data_button == undefined || $data_button == null || $data_button == '' || $data_button == "") {

            /** Define Return Result : */
            $result = 0;

            /** Create Error Log : */
            console.error('Data config Button tidak didefinisikan');
        } /** End of Check IF $data_button is undefined. */

        /** Return Result : */
        return $result;
    },
    /** End of For Create Button Table.
     * ===================================================================================================== */

    /** For Create Select Bootstrap :
     * -----------------------------------------------------------
     *
     * Format Object Data Select :
     * -------------------------------------
     * object [
     *          {
     *              'config' : {
     *                  'id' : '',
     *                  'class' : '',
     *                  'attr' : '',
     *                  'style' : '',
     *                  'name' : '',
     *              },
     *              'option' : [
     *                  {
     *                      'id' : '',
     *                      'class' : '',
     *                      'attr' : '',
     *                      'style' : '',
     *                      'name' : '',
     *                      'value' : '',
     *                  }
     *              ]
     *          }
     * ]
     *
     * @param $data_select {object} Variable yang berisi data config untuk membuat form SELECT.
     * @param $selector {string} Variable yang berisi target penempatan hasil pembuatan form SELECT.
     */
    NKTI_Table_addon_select_bootstrap: function($data_select, $selector) {

        /** Define variable will be used in this function : */
        var $config_select, $target_place, $result_select = '', $result;

        /** Check if $data_select is defined : */
        if ($data_select != undefined || $data_select != null || $data_select != '' || $data_select != "") {

            /** Define config $select : */
            $config_select = $data_select;

            /** For Debug :*/
            //console.log($config_select);

            /** Prepare while loop to Create Select FORM : */
            var $i = 0;
            var $until_loop = $config_select.length;

            /** While loop to Create Select FORM : */
            while ($i < $until_loop) {

                /** Check IF $config_select[$i]['config'] is defined : */
                if ($config_select[$i]['config'] != undefined || $config_select[$i]['config'] != null || $config_select[$i]['config'] != '' || $config_select[$i]['config'] != "") {

                    /** Check IF $config_select[$i]['option'] is defined : */
                    if ($config_select[$i]['option'] != undefined || $config_select[$i]['option'] != null || $config_select[$i]['option'] != '' || $config_select[$i]['option'] != "") {

                        /** Define variable for config select FORM : */
                        var $select_config = $config_select[$i]['config'];

                        /** Define variable for Attribute Select FORM : */
                        var $id_select, $class_select, $attr_select, $style_select, $name_select;

                        /** Check FOR $select_config['id'] : */
                        if ($select_config['id'] != undefined || $select_config['id'] != null || $select_config['id'] != '' || $select_config['id'] != "") {
                            $id_select = ' id="' + $select_config['id'] + '"';
                        }
                        if ($select_config['id'] == undefined || $select_config['id'] == null || $select_config['id'] == '' || $select_config['id'] == "") {
                            $id_select = '';
                        }

                        /** Check FOR $select_config['class'] : */
                        if ($select_config['class'] != undefined || $select_config['class'] != null || $select_config['class'] != '' || $select_config['class'] != "") {
                            $class_select = $select_config['class'] + ' ';
                        }
                        if ($select_config['class'] == undefined || $select_config['class'] == null || $select_config['class'] == '' || $select_config['class'] == "") {
                            $class_select = '';
                        }

                        /** Check FOR $select_config['attr'] : */
                        if ($select_config['attr'] != undefined || $select_config['attr'] != null || $select_config['attr'] != '' || $select_config['attr'] != "") {
                            $attr_select = ' ' + $select_config['attr'] + '';
                        }
                        if ($select_config['attr'] == undefined || $select_config['attr'] == null || $select_config['attr'] == '' || $select_config['attr'] == "") {
                            $attr_select = '';
                        }

                        /** Check FOR $select_config['style'] : */
                        if ($select_config['style'] != undefined || $select_config['style'] != null || $select_config['style'] != '' || $select_config['style'] != "") {
                            $style_select = ' style="' + $select_config['style'] + '"';
                        }
                        if ($select_config['style'] == undefined || $select_config['style'] == null || $select_config['style'] == '' || $select_config['style'] == "") {
                            $style_select = '';
                        }

                        /** Check FOR $select_config['name'] : */
                        if ($select_config['name'] != undefined || $select_config['name'] != null || $select_config['name'] != '' || $select_config['name'] != "") {
                            $name_select = ' name="' + $select_config['name'] + '" ';
                        }
                        if ($select_config['name'] == undefined || $select_config['name'] == null || $select_config['name'] == '' || $select_config['name'] == "") {
                            $name_select = '';
                        }

                        /** Begin FORM SELECT : */
                        $result_select += '<select '+$id_select+'class="bs-select form-control'+$class_select+'" '+$name_select+$attr_select+$style_select+'>';

                        /** Create Option Select : */
                        $result_select += $.NKTI_Table_addon_option_select($config_select[$i]['option']);

                        /** Ending FORM Select : */
                        $result_select += '</select>';

                    } /** End of Check IF $config_select[$i]['option'] is defined. */

                    /** Check IF $config_select[$i]['option'] is undefined : */
                    if ($config_select[$i]['option'] == undefined || $config_select[$i]['option'] == null || $config_select[$i]['option'] == '' || $config_select[$i]['option'] == "") {
                        console.error('Data config Option FORM Select is undefined');
                        $result_select = 0;
                        break;
                    } /** End of Check IF $config_select[$i]['option'] is undefined. */

                } /** End of Check IF $config_select[$i]['config'] is defined. */

                /** Check IF $config_select[$i]['config'] is undefined : */
                if ($config_select[$i]['config'] == undefined || $config_select[$i]['config'] == null || $config_select[$i]['config'] == '' || $config_select[$i]['config'] == "") {
                    console.error('Config FORM Select is undefined');
                    $result_select = 0;
                    break;
                } /** End of Check IF $config_select[$i]['config'] is undefined. */

                /** Auto Increment : */
                $i++;
            } /** End of while loop to Create Select FORM. */

            /** Check IF $result_select != 0 : */
            if ($result_select != 0) {

                /** Check IF $result_select is defined : */
                if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                    /** Define variable for Target Place result option select : */
                    $target_place = $($selector);

                    /** Placing result : */
                    $target_place.html($result_select);

                } /** End of Check IF $result_select is defined. */

                /** Check IF $result_select is defined : */
                if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                    /** Define result : */
                    $result = $result_select;

                } /** End of Check IF $result_select is defined. */
                
            } /** End of Check IF $result_select != 0 : */

            /** Check IF $result_select == 0 : */
            if ($result_select == 0) {
                $result = 0;
            } /** End of Check IF $result_select == 0 : */

        } /** End of Check if $data_select is defined. */

        /** Check IF $data_select is undefined : */
        if ($data_select == undefined || $data_select == null || $data_select == '' || $data_select == "") {
            console.error('Data Config Select is undefined');
            $result = 0;
        } /** End of Check IF $data_select is undefined. */

        /** Return Result : */
        return $result;
    },
    /** End of For Create Select Bootstrap.
     * ===================================================================================================== */

    /** For Create Option Select Bootstrap :
     * -----------------------------------------------------------
     *
     * Format $data_option :
     * -------------------------------------
     * object [
     *      {
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *          'value' : '',
     *          'name' : '',
     *      }
     * ]
     *
     * ---
     *
     * @param $data_option {object} Variable yang berisi data config option.
     * @param $selector {string} Variable yang berisi nama selector untuk menyimpan hasil pembuatan option select.
     */
    NKTI_Table_addon_option_select: function($data_option, $selector) {

        /** Define variable will be used in this function : */
        var $config_option = '', $target_place, $result_option = '', $result;

        /** Check IF $data_option is defined : */
        if ($data_option != undefined || $data_option != null || $data_option != '' || $data_option != "") {

            /** Define data config option select : */
            $config_option = $data_option;

            /** Prepare while loop to Create Option Select : */
            var $i = 0;
            var $until_loop = $config_option.length;

            /** While loop to Create Option Select : */
            while ($i < $until_loop) {

                /** Define variable for data config option select : */
                var $id_option, $class_option, $attr_option, $style_option, $value_option, $name_option;

                /** Check FOR $config_option[$i]['id'] : */
                if ($config_option[$i]['id'] != undefined || $config_option[$i]['id'] != null || $config_option[$i]['id'] != '' || $config_option[$i]['id'] != "") {
                    $id_option = 'id="'+$config_option[$i]['id']+'" ';
                }
                if ($config_option[$i]['id'] == undefined || $config_option[$i]['id'] == null || $config_option[$i]['id'] == '' || $config_option[$i]['id'] == "") {
                    $id_option = '';
                }

                /** Check FOR $config_option[$i]['class'] : */
                if ($config_option[$i]['class'] != undefined || $config_option[$i]['class'] != null || $config_option[$i]['class'] != '' || $config_option[$i]['class'] != "") {
                    $class_option = $config_option[$i]['class'];
                }
                if ($config_option[$i]['class'] == undefined || $config_option[$i]['class'] == null || $config_option[$i]['class'] == '' || $config_option[$i]['class'] == "") {
                    $class_option = '';
                }

                /** Check FOR $config_option[$i]['attr'] : */
                if ($config_option[$i]['attr'] != undefined || $config_option[$i]['attr'] != null || $config_option[$i]['attr'] != '' || $config_option[$i]['attr'] != "") {
                    $attr_option = ' '+$config_option[$i]['attr']+' ';
                }
                if ($config_option[$i]['attr'] == undefined || $config_option[$i]['attr'] == null || $config_option[$i]['attr'] == '' || $config_option[$i]['attr'] == "") {
                    $attr_option = '';
                }

                /** Check FOR $config_option[$i]['style'] : */
                if ($config_option[$i]['style'] != undefined || $config_option[$i]['style'] != null || $config_option[$i]['style'] != '' || $config_option[$i]['style'] != "") {
                    $style_option = ' style="'+$config_option[$i]['style']+'" ';
                }
                if ($config_option[$i]['style'] == undefined || $config_option[$i]['style'] == null || $config_option[$i]['style'] == '' || $config_option[$i]['style'] == "") {
                    $style_option = '';
                }

                /** Check FOR $config_option[$i]['value'] : */
                if ($config_option[$i]['value'] != undefined || $config_option[$i]['value'] != null || $config_option[$i]['value'] != '' || $config_option[$i]['value'] != "") {
                    $value_option = $config_option[$i]['value'];
                }
                if ($config_option[$i]['value'] == undefined || $config_option[$i]['value'] == null || $config_option[$i]['value'] == '' || $config_option[$i]['value'] == "") {
                    $value_option = '';
                }

                /** Check FOR $config_option[$i]['value'] : */
                if ($config_option[$i]['name'] != undefined || $config_option[$i]['name'] != null || $config_option[$i]['name'] != '' || $config_option[$i]['name'] != "") {
                    $name_option = $config_option[$i]['name'];
                }
                if ($config_option[$i]['name'] == undefined || $config_option[$i]['name'] == null || $config_option[$i]['name'] == '' || $config_option[$i]['name'] == "") {
                    $name_option = '';
                }

                /** Create Option Select : */
                $result_option += '<option '+$id_option+'class="bs-select form-control '+$class_option+'"'+$attr_option+$style_option+'value="'+$value_option+'">'+$name_option+'</option>';
                
                /** Auto Increment : */
                $i++;
            }
            /** End of while loop to Create Option Select. */

        } /** End of Check IF $data_option is defined. */

        /** Check IF $selector is defined : */
        if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

            /** Define Variable for selector : */
            $target_place = $selector;

            /** Placing result option into target selector : */
            $($target_place).html($result_option);

            /** Define result : */
            $result = 1;

        } /** End of Check IF $selector is defined. */

        /** Check IF $selector is undefined : */
        if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {

            /** Define result : */
            $result = $result_option;

        } /** End of Check IF $selector is undefined. */

        /** Check IF $data_option is undefined : */
        if ($data_option == undefined || $data_option == null || $data_option == '' || $data_option == "") {

            /** Define Log Error : */
            console.error('Data config option is undefined');

            /** Define result : */
            $result = 0;
        } /** End of Check IF $data_option is undefined. */

        /** Return Result : */
        return $result;
    }
    /** End of For Create Option Select Bootstrap.
     * ===================================================================================================== */

});
/** End of Function Application for Table.
 * ===================================================================================================== */


/** Begin Function Application for NKTI AJAX :
 * -----------------------------------------------------------
 */
jQuery.extend({

    /** For Action AJAX Send :
     * -----------------------------------------------------------
     */
    NKTI_Ajax_send: function($url_request, $data_post, $callback) {

        // Define XMLHttpRequest :
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            $xhr = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            $xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        $xhr.onreadystatechange = function () {
            if ($xhr.readyState === 4 && $xhr.status === 200) {
                if (typeof $callback === "function") {
                    // apply() sets the meaning of "this" in the callback
                    $callback.apply($xhr);
                }
            }
        };

        // POST to URL Request :
        $xhr.open("POST", $url_request, true);

        // Set Header Request :
        // $xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        // Send Request :
        $xhr.send($data_post);
        return false;
    },

    /** For Action AJAX Send With Progress Upload :
     * -----------------------------------------------------------
     */
    NKTI_Ajax_send_with_progres_upload: function($url_request, $data_post, $function_progress, $callback) {

        // Define XMLHttpRequest :
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            $xhr = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            $xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        $xhr.onreadystatechange = function () {
            if ($xhr.readyState == 4 && $xhr.status == 200) {
                if (typeof $callback == "function") {
                    // apply() sets the meaning of "this" in the callback
                    $callback.apply($xhr);
                }
            }
        };

        // Event Progress Upload :
        $xhr.upload.addEventListener('progress', $function_progress, false);

        // POST to URL Request :
        $xhr.open("POST", $url_request, true);

        // Set Header Request :
        $xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        // Send Request :
        $xhr.send($data_post);
        return false;
    },

    /** For Action Progress : */
    NKTI_Ajax_progress : function (event, $your_callback) {

        //console.log(event.loaded + ' / ' + event.total);
        var percent = (event.loaded / event.total) * 100;
        //console.log('Progress Upload : ' + Math.round(percent));

        // Define Text Progress Bar :
        jQuery('#text-progress-upload').text(Math.round(percent) + '%');

        // Define Class for progress bar :
        var progress_bar = document.getElementById('proses_upload');
        progress_bar.style.width = Math.round(percent) + '%';

        console.log(percent);

        if (typeof $your_callback == "function") {
            // apply() sets the meaning of "this" in the callback
            $your_callback.apply(this, event);
        }
    },

    /** For Load File Javascript :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk memuat tag javascript baru.
     * Selector url yang akan diload harus berdiri sendiri.
     *
     * @param   $selector       {string}        Berisi Lokasi url file Javascript.
     *                                          Ex: "div#log_url_file_js"
     * ----------------------------------------------------------- */
    NKTI_load_js_file: function ($selector) {

        /** Check IF $selector is exists : */
        if ($($selector).length != 0) {

            /** Define variable will be used in this function : */
            var $loc_script = $($selector);
            var $data_src = $loc_script.attr('data-src');
            var $script = document.createElement('script');
            $script.src = $data_src;
            $script.type = 'text/javascript';
            var $place_script = document.getElementsByTagName("body")[0];

            /** Place new javascript file : */
            $place_script.appendChild($script);

            /** Remove This Loc data src javascript file : */
            $($selector).remove();
        }
    }
    /** End of For Load File Javascript.
     * ===================================================================================================== */


});
/** End of Begin Function Application for NKTI AJAX.,
 * ===================================================================================================== */

/** Begin Function Appliaction for NKTI Global jQuery Extend :
 * -----------------------------------------------------------
 */
jQuery.extend({

    /** For Create Budges in input FORM :
     * -----------------------------------------------------------
     *
     * @param $selector {string} your selector to placing badges.
     * @param $location {string} your location budges. Ex : before | after
     * @param $budges_name {string} berisi string nama budges. Ex : konsep.
     * @param $id_budges {string} berisi string ID Budges.
     * @param $class_budges {string} berisi string Class Budges.
     * @param $style_budges {string} berisi string custom style budges.
     * @param $attr_budges {string} berisi string custom Attribute budges.
     * @param $color_budges {string} berisi string custom color budges.
     * @param $tag_after_input {string} berisi ID | class Tag HTML untuk identifikasi
     *                                  apakah ada tag HTML setelah input FORM.
     * @param $status_double {integer} berisi nilai 1 | 0, apakah ingin double ditampilkan atau tidak.
     */
    NKTI_budges_inputForm : function($selector, $location, $budges_name, $id_budges, $class_budges,
                                     $style_budges, $attr_budges, $color_budges, $tag_after_input, $status_double) {

        /** Define variable will be used in this function : */
        var $selector_pemicu,
            $loc_budges,
            $nama_budges,
            $custom_id, $custom_class, $custom_style, $custom_attr, $custom_color,
            $after_inputForm, $for_select_id_budges, $double_status,
            $item_budges;
        var $size_position = 0;

        /** Check IF $selector tidak kosong : */
        if ($selector != undefined || $selector != null || $selector != '' || $selector != "" &&
            $location != undefiend || $location != null || $location != '' || $location != "") {
            $selector_pemicu = $selector;

            /** Check IF $location tidak kosong : */
            if ($location != undefined || $location != null || $location != '' || $location != "") {
                $loc_budges = $location;
            } else if ($location == undefined || $location == null || $location == '' || $location == "") {
                $loc_budges = 'none';
            }

            /** Check IF $name_budges tidak kosong : */
            if ($budges_name != undefined || $budges_name != null || $budges_name != '' || $budges_name != "") {
                $nama_budges = $budges_name;
            } if ($budges_name == undefined || $budges_name == null || $budges_name == '' || $budges_name == "") {
                $nama_budges = 'Undefined Name';
                console.log('Nama Budges tidak didefinisikan !!!');
            }

            /** For Budges Attributes : */
            if ($id_budges != undefined || $id_budges != null || $id_budges != '' || $id_budges != "") {
                $custom_id = 'id="' + $id_budges + '" ';
                $for_select_id_budges = '#'+$id_budges;
            }
            if ($id_budges == undefined || $id_budges == null || $id_budges == '' || $id_budges == "") {
                var $name_budges = $($selector_pemicu).attr('name');
                var $for_selector_id = 'budges_' + $name_budges;
                $custom_id = 'id="'+$for_selector_id+'" ';
                $for_select_id_budges = '#'+$for_selector_id;
            }
            if ($class_budges != undefined || $class_budges != null || $class_budges != '' || $class_budges != "") {
                $custom_class = ' class="' + $class_budges + '" ';
            } if ($class_budges == undefined || $class_budges == null || $class_budges == '' || $class_budges == ""){
                $custom_class = '';
            }
            if ($style_budges != undefined || $style_budges != null || $style_budges != '' || $style_budges != "") {
                $custom_style = $style_budges;
            } if ($style_budges == undefined || $style_budges == null || $style_budges == '' || $style_budges == "") {
                $custom_style = '';
            }
            if ($attr_budges != undefined || $attr_budges != null || $attr_budges != '' || $attr_budges != "") {
                $custom_attr = $attr_budges;
            } if ($attr_budges != undefined || $attr_budges != null || $attr_budges != '' || $attr_budges != "") {
                $custom_attr = '';
            }
            if ($color_budges != undefined || $color_budges != null || $color_budges != '' || $color_budges != "") {
                $custom_color = $color_budges;
            } if ($color_budges == undefined || $color_budges == null || $color_budges == '' || $color_budges == "") {
                $custom_color = '';
            }
            if ($tag_after_input != undefined || $tag_after_input != null || $tag_after_input != '' || $tag_after_input != "") {
                $after_inputForm = $tag_after_input;
            } if ($tag_after_input == undefined || $tag_after_input == null || $tag_after_input == '' || $tag_after_input == "") {
                $after_inputForm = '';
            }
            if ($status_double != undefined || $status_double != null || $status_double != '' || $status_double != "") {
                $double_status = $status_double;
            } if ($status_double == undefined || $status_double == null || $status_double == '' || $status_double == "")  {
                $double_status = 0;
            }

            /** Check Custom Color : */
            if ($custom_class == '' && $custom_color != '') {
                $custom_class = 'class="' + $custom_color + '"';
            } else {
                $custom_class = '';
            }
            /** Check Custom Class : */
            if ($custom_class != '' && $custom_color != '') {
                $custom_class = 'class="' + $custom_class + ' ' + $custom_color + '"';
            }

            /** Create function for Add Budges : */
            var $add_budges = function($selector_pemicu, $loc_budges, $after_inputForm, $for_select_id_budges, $item_budges) {
                /** Create Budges : */
                $($selector_pemicu).append($item_budges).each(function () {

                    /** Switch for conditions $loc_budges : */
                    switch ($loc_budges) {
                    /** Case for $loc_budges == 'after' : */
                        case 'after' :

                            /** Check IF $tag_after_input : */
                            if ($after_inputForm != '') {
                                var $size_afterInput_form = $($after_inputForm).outerWidth();
                                $($for_select_id_budges).css({
                                    'position': 'absolute',
                                    'z-index': '9999',
                                    'padding': '7.5px',
                                    'background': '#2B3643',
                                    'right': $size_afterInput_form,
                                    'color': '#FFF',
                                    'font-size': '14px'
                                });
                                /** Relocation Input Form And Resize input Form : */
                                $($for_select_id_budges).insertAfter($selector_pemicu).each(function () {
                                    var $width_inputForm = $($selector_pemicu).outerWidth();
                                    var $width_budges = $($for_select_id_budges).outerWidth();
                                    var $new_width_inputForm = ($width_inputForm - $width_budges);
                                    $($selector_pemicu).css({'width': $new_width_inputForm + 'px'});
                                });
                            }
                            /** End of check IF $tag_after_input.*/

                            /** Check IF $after_inputForm == '' : */
                            if ($after_inputForm == '') {
                                $($for_select_id_budges).css({
                                    'position': 'absolute',
                                    'z-index': '9999',
                                    'padding': '7.5px',
                                    'background': '#2B3643',
                                    'right': $size_position,
                                    'color': '#FFF',
                                    'font-size': '14px'
                                });
                                /** Relocation Input Form And Resize input Form : */
                                $($for_select_id_budges).insertAfter($selector_pemicu).each(function () {
                                    var $width_inputForm1 = $($selector_pemicu).outerWidth();
                                    var $width_budges1 = $($for_select_id_budges).outerWidth();
                                    var $new_width_inputForm1 = ($width_inputForm1 - $width_budges1);
                                    $($selector_pemicu).css({'width': $new_width_inputForm1 + 'px'});
                                });
                            }
                            /** End of check IF $after_inputForm == ''.*/
                            break;

                    /** Case for $loc_budges == 'before' : */
                        case 'before' :
                            $($for_select_id_budges).css({
                                'position': 'absolute',
                                'z-index': '9999',
                                'padding': '7.5px',
                                'background': '#2B3643',
                                'left': $size_position,
                                'color': '#FFF',
                                'font-size': '14px'
                            });
                            /** Relocation Input Form And Resize input Form : */
                            $($for_select_id_budges).insertBefore($selector_pemicu).each(function () {
                                var $width_inputForm2 = $($selector_pemicu).outerWidth();
                                var $new_width_inputForm2 = ($width_inputForm2 - $($for_select_id_budges).outerWidth());
                                $($selector_pemicu).css({'width': $new_width_inputForm2 + 'px'});
                                $($selector_pemicu).css({'margin-left': $($for_select_id_budges).outerWidth() + 'px'});
                            });
                            break;
                    }
                    /** End of switch for conditions $loc_budges. */

                });
                /** End of create budges : */
            };

            /** For Check Exists Budges : */
            var $budges_count = $($for_select_id_budges).length;

            /** Check Status Double Add Budges : */
            if ($double_status == 0 && $budges_count == 0) {

                /** Create Item Budges : */
                $item_budges = '<span ' + $custom_id + ' ' + $custom_class + ' ' + $custom_attr + ' ' + $custom_style + '>' + $nama_budges + '</span>';
                $add_budges($selector_pemicu, $loc_budges, $after_inputForm, $for_select_id_budges, $item_budges);
            }

            if ($double_status == 1) {
                var $new_id_budges = $for_select_id_budges + "-0";
                var $id_busges = $new_id_budges.replace(/#/, '');
                var $new_custom_id = 'id="'+$id_busges+'"';

                /** Create Item Budges : */
                $item_budges = '<span ' + $new_custom_id + ' ' + $custom_class + ' ' + $custom_attr + ' ' + $custom_style + '>' + $nama_budges + '</span>';
                $add_budges($selector_pemicu, $loc_budges, $after_inputForm, $new_id_budges, $item_budges);
            }
        } else {
            alert('Budget not valid')
        } /** End of check Selector. */
    },
    /** End of Create Budges in input FORM.
     * ========================================================================================================== */

    /** For Start Loading Animate :
     * -----------------------------------------------------------
     */
    NKTI_loading_animate_start: function ($target_loading_animate) {

        /** Run Loading Animate : */
        App.blockUI({
            target: $target_loading_animate
        });

    },
    /** End of For Start Loading Animate.
     * ===================================================================================================== */

    /** For Stop Loading Animate :
     * -----------------------------------------------------------
     */
    NKTI_loading_animate_end: function ($target_loading_animate) {

        /** Stop Loading Animate : */
        window.setTimeout(function() {
            App.unblockUI($target_loading_animate);
        }, 2000);
    },
    /** End of For Stop Loading Animate.
     * ===================================================================================================== */

    /** For Start Loading Animate :#2D3E29
     * -----------------------------------------------------------
     */
    NKTI_plugin_loading_animate_start: function ($target_loading_animate, $color) {

        /** Run Loading Animate : */
        NKTI_loading.blockUI({
            target: $target_loading_animate,
            overlayColor: $color ? $color : false,
            animate: true
        });

    },
    /** End of For Start Loading Animate.
     * ===================================================================================================== */

    /** For Stop Loading Animate :
     * -----------------------------------------------------------
     */
    NKTI_plugin_loading_animate_end: function ($target_loading_animate) {

        /** Stop Loading Animate : */
        window.setTimeout(function() {
            NKTI_loading.unblockUI($target_loading_animate);
        }, 1000);
    },
    /** End of For Stop Loading Animate.
     * ===================================================================================================== */

    /** For Active iCheck Plugin :
     * -----------------------------------------------------------
     *
     * @param $your_selector {string} Variable yang berisi name selector icheck. Ex : name="yourname_icheck".
     */
    NKTI_iCheck_active: function($your_selector) {

        /** Active iCheck Plugin : */
        $('input['+$your_selector+']').iCheck({
            checkboxClass: 'icheckbox_square-orange'
        });

    },
    /** End of For Active iCheck Plugin.
     * ===================================================================================================== */

    /** For Run Toastr Notification :
     * -----------------------------------------------------------
     */
    NKTI_toastr_run: function ($code, $title, $msg, $timeout) {

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": $timeout,
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        toastr[$code]($msg, $title);

    },
    /** End of For Run Toastr Notification.
     * ===================================================================================================== */

    /** For Run Toastr Notification :
     * -----------------------------------------------------------
     */
    NKTI_toastr_run_sticky: function ($code, $title, $msg, $timeout, $extd_timeout) {

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": $timeout,
            "extendedTimeOut": $extd_timeout,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        toastr[$code]($msg, $title);

    },
    /** End of For Run Toastr Notification.
     * ===================================================================================================== */

    /** For Get money Input :
     * -----------------------------------------------------------
     */
    NKTI_get_money_input: function($selector) {

        var data  = $selector.val();
        var data1 = data.replace(/([\,])(\d+)/g, '');
        var new_data1 = data1.replace(/\.+/g, '');

        return new_data1;
    },
    /** End of For Get money Input.
     * ===================================================================================================== */

    /** For Add Menu Tabs :
     * -----------------------------------------------------------
     *
     * Format $data_tab :
     * -------------------------------------
     * object [
     *          {
     *              'name_tab' : '',
     *              'id_target' : '',
     *              'id_menu' : '',
     *              'class_menu' : '',
     *              'attr_menu' : '',
     *              'style_menu' : '',
     *
     *              'class_content' : '',
     *              'attr_content' : '',
     *              'style_content' : '',
     *              'content_tabs' : '',
     *          }
     * ]
     *
     * @param $data_tabs {object} Variable yang berisi object untuk konfigurasi pembuatan item tabs baru.
     * @param $selector_menu {string} Variable yang berisi selector menu.
     * @param $selector_content {string} Variable yang berisi selector content.
     */
    NKTI_Tabs_add_item_tabs: function ($data_tabs, $selector_menu, $selector_content) {

        /** Define variable will be used in this function : */
        var $config_tabs = $data_tabs;

        /** Define varible for result : */
        var $result_create_tabs = '';
        var $for_menu_tabs, $for_content_tabs, $result_tabs, $result;

        /** Prepare while loop to Create Menu Tab : */
        var $i = 0;
        var $until_loop_im = $config_tabs.length;

        /** While loop to Create Menu Tab : */
        while ($i < $until_loop_im) {

            /** Define variable for Placing Property Config Tabs : */
            var $name_tabs, $id_target, $id_menu, $class_menu, $attr_menu, $style_menu;
            var $class_content, $attr_content, $style_content, $content_tabs;

            /** Check IF $config_tabs[$i]['name_tab'] is defined : */
            if ($config_tabs[$i]['name_tab'] != undefined || $config_tabs[$i]['name_tab'] != null ||
                $config_tabs[$i]['name_tab'] != '' || $config_tabs[$i]['name_tab'] != "") {

                /** Define Name Menu Tabs : */
                $name_tabs = $config_tabs[$i]['name_tab'];

                /** Check IF $config_tabs[$i]['id_target'] is Defined : */
                if ($config_tabs[$i]['id_target'] != undefined || $config_tabs[$i]['id_target'] != null ||
                    $config_tabs[$i]['id_target'] != '' || $config_tabs[$i]['id_target'] != "") {

                    /** Define ID Target Tabs : */
                    $id_target = $config_tabs[$i]['id_target'];

                    // FOR Menu Tabs :
                    // ==================================================================================================

                    /** Check FOR $config_tabs[$i]['id_menu'] : */
                    if ($config_tabs[$i]['id_menu'] != undefined || $config_tabs[$i]['id_menu'] != null ||
                        $config_tabs[$i]['id_menu'] != '' || $config_tabs[$i]['id_menu'] != "") {
                        $id_menu = 'id="' + $config_tabs['id_menu'] + '" ';
                    }
                    if ($config_tabs[$i]['id_menu'] == undefined || $config_tabs[$i]['id_menu'] == null ||
                        $config_tabs[$i]['id_menu'] == '' || $config_tabs[$i]['id_menu'] == "") {
                        $id_menu = '';
                    }

                    /** Check FOR $config_tabs[$i]['class_menu'] : */
                    if ($config_tabs[$i]['class_menu'] != undefined || $config_tabs[$i]['class_menu'] != null ||
                        $config_tabs[$i]['class_menu'] != '' || $config_tabs[$i]['class_menu'] != "") {
                        $class_menu = $config_tabs['class_menu'];
                    }
                    if ($config_tabs[$i]['class_menu'] == undefined || $config_tabs[$i]['class_menu'] == null ||
                        $config_tabs[$i]['class_menu'] == '' || $config_tabs[$i]['class_menu'] == "") {
                        $class_menu = '';
                    }

                    /** Check FOR $config_tabs[$i]['attr_menu'] : */
                    if ($config_tabs[$i]['attr_menu'] != undefined || $config_tabs[$i]['attr_menu'] != null ||
                        $config_tabs[$i]['attr_menu'] != '' || $config_tabs[$i]['attr_menu'] != "") {
                        $attr_menu = ' ' + $config_tabs['attr_menu'] + ' ';
                    }
                    if ($config_tabs[$i]['attr_menu'] == undefined || $config_tabs[$i]['attr_menu'] == null ||
                        $config_tabs[$i]['attr_menu'] == '' || $config_tabs[$i]['attr_menu'] == "") {
                        $attr_menu = '';
                    }

                    /** Check FOR $config_tabs[$i]['style_menu'] : */
                    if ($config_tabs[$i]['style_menu'] != undefined || $config_tabs[$i]['style_menu'] != null ||
                        $config_tabs[$i]['style_menu'] != '' || $config_tabs[$i]['style_menu'] != "") {
                        $style_menu = $config_tabs['style_menu'];
                    }
                    if ($config_tabs[$i]['style_menu'] == undefined || $config_tabs[$i]['style_menu'] == null ||
                        $config_tabs[$i]['style_menu'] == '' || $config_tabs[$i]['style_menu'] == "") {
                        $style_menu = '';
                    }

                    /** Check FOR $config_tabs[$i]['style_menu'] : */
                    if ($config_tabs[$i]['style_menu'] != undefined || $config_tabs[$i]['style_menu'] != null ||
                        $config_tabs[$i]['style_menu'] != '' || $config_tabs[$i]['style_menu'] != "") {
                        $style_menu = $config_tabs['style_menu'];
                    }
                    if ($config_tabs[$i]['style_menu'] == undefined || $config_tabs[$i]['style_menu'] == null ||
                        $config_tabs[$i]['style_menu'] == '' || $config_tabs[$i]['style_menu'] == "") {
                        $style_menu = '';
                    }

                    /** Create Menu Tabs : */
                    $for_menu_tabs += '<li ' + $id_menu + $attr_menu + 'class="' + $class_menu + '">' +
                        '<a href="#' + $id_target + '" data-toggle="tab" aria-expanded="true"> Image Produk </a></li>';

                    // FOR Content TABS :
                    // ==================================================================================================

                    /** Check FOR $config_tabs[$i]['class_content'] : */
                    if ($config_tabs[$i]['class_content'] != undefined || $config_tabs[$i]['class_content'] != null ||
                        $config_tabs[$i]['class_content'] != '' || $config_tabs[$i]['class_content'] != "") {
                        $class_content = ' '+$config_tabs['class_content']+' ';
                    }
                    if ($config_tabs[$i]['class_content'] == undefined || $config_tabs[$i]['class_content'] == null ||
                        $config_tabs[$i]['class_content'] == '' || $config_tabs[$i]['class_content'] == "") {
                        $class_content = '';
                    }

                    /** Check FOR $config_tabs[$i]['attr_content'] : */
                    if ($config_tabs[$i]['attr_content'] != undefined || $config_tabs[$i]['attr_content'] != null ||
                        $config_tabs[$i]['attr_content'] != '' || $config_tabs[$i]['attr_content'] != "") {
                        $attr_content = ' '+$config_tabs['attr_content']+' ';
                    }
                    if ($config_tabs[$i]['attr_content'] == undefined || $config_tabs[$i]['attr_content'] == null ||
                        $config_tabs[$i]['attr_content'] == '' || $config_tabs[$i]['attr_content'] == "") {
                        $attr_content = '';
                    }

                    /** Check FOR $config_tabs[$i]['style_content'] : */
                    if ($config_tabs[$i]['style_content'] != undefined || $config_tabs[$i]['style_content'] != null ||
                        $config_tabs[$i]['style_content'] != '' || $config_tabs[$i]['style_content'] != "") {
                        $style_content = ' style="'+$config_tabs['style_content']+'"';
                    }
                    if ($config_tabs[$i]['style_content'] == undefined || $config_tabs[$i]['style_content'] == null ||
                        $config_tabs[$i]['style_content'] == '' || $config_tabs[$i]['style_content'] == "") {
                        $style_content = '';
                    }

                    /** Check FOR $config_tabs[$i]['content_tabs'] : */
                    if ($config_tabs[$i]['content_tabs'] != undefined || $config_tabs[$i]['content_tabs'] != null ||
                        $config_tabs[$i]['content_tabs'] != '' || $config_tabs[$i]['content_tabs'] != "") {
                        $content_tabs = $config_tabs['content_tabs'];
                    }
                    if ($config_tabs[$i]['content_tabs'] == undefined || $config_tabs[$i]['content_tabs'] == null ||
                        $config_tabs[$i]['content_tabs'] == '' || $config_tabs[$i]['content_tabs'] == "") {
                        $content_tabs = '';
                    }

                    /** Create Content Tabs : */
                    $for_content_tabs += '<div id="'+$id_target+'" class="tab-pane fade'+$class_content+'"'+$attr_content+$style_content+'>'+$content_tabs+'</div>';

                    /** Define result create tabs : */
                    $result_tabs = 1;
                }
                /** End of Check IF $menu_tab[$i]['id_target'] is Defined. */

                /** Check IF $config_tabs[$i]['id_target'] is Undefined : */
                if ($config_tabs[$i]['id_target'] == undefined || $config_tabs[$i]['id_target'] == null || $config_tabs[$i]['id_target'] == '' || $config_tabs[$i]['id_target'] == "") {
                    console.error('ID Target Tabs is undefined !!!');
                    $result_tabs = 0;
                    break;
                } /** End of Check IF $config_tabs[$i]['id_target'] is Undefined. */

            } /** End of Check IF $config_tabs[$i]['name_tab'] is defined : */

            /** Check IF $config_tabs[$i]['name_tab'] is undefined : */
            if ($config_tabs[$i]['name_tab'] == undefined || $config_tabs[$i]['name_tab'] == null || $config_tabs[$i]['name_tab'] == '' || $config_tabs[$i]['name_tab'] == "") {
                console.error('Name Tabs is undefined');
                $result_tabs = 0;
                break
            } /** End of Check IF $config_tabs[$i]['name_tab'] is undefined. */

            /** Auto Increment : */
            $im++;
        } /** End of while loop to Create Menu Tab. */

        /** Check IF $result_tabs != 0 : */
        if ($result_tabs != 0) {

            /** Placing Menu Tabs Into Tabs : */
            $($selector_menu).append($for_menu_tabs);

            /** Placing Content Tabs into Tabs : */
            $($selector_content).append($for_content_tabs);

            /** Define Result : */
            $result = 1;

        } /** End of Check IF $result_tabs != 0 : */

        /** Check IF $request_tabs == 0 : */
        if ($result_tabs == 0) {

            /** Define Result : */
            $result = 0;
        } /** End of Check IF $result_tabs != 0 : */

        /** Return Result : */
        return $result;

    },
    /** End of For Add Menu Tabs.
     * ===================================================================================================== */

    /** For Filter Count Character String :
     * -----------------------------------------------------------------------------------------------------
     *
     * @param   $string         {string}        Variable yang berisi String.
     * @param   $limit_char     {integer}       Variable yang berisi Jumlah Limit Karakter.
     * */
    NKTI_filter_char_string: function ($string, $limit_char) {

        /** Define variable for return result : */
        var $return_result = 0, $limit_charakter;

        /** Check IF $string is exists : */
        if ($string != undefined && $string != null && $string != '' && $string != "") {

            /** Check IF $limit_char is exists : */
            if ($string != undefined || $string != null || $string != '' || $string != "") {
                $limit_charakter = $limit_char;
            }
            else if ($string == undefined || $string == null || $string == '' || $string == "") {
                $limit_charakter = 50;
            }

            /** Check IF $string.length < $limit_charakter : */
            if ($string.length < $limit_charakter) {
                $return_result = $string;
            }

            /** Check IF $string.length > $limit_charakter : */
            if ($string.length > $limit_charakter) {
                $return_result = $string.substr(0, $limit_charakter) + ' ...';
            }

        } /** End of Check IF $string is exists. */

        /** Check IF $string is not exists : */
        else {
            $return_result = $string;
        } /** End of Check IF $string is not exists. */

        /** Return Result : */
        return $return_result;
    }
    /** End of For Filter Count Character String.
     * ===================================================================================================== */
});
/** End of Function Appliaction for NKTI Global jQuery Extend.
 * ===================================================================================================== */