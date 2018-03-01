/**
 * Created by AchmadYusri on 20/06/2016.
 */

/** Begin Bootstrap Creator :
 * -----------------------------------------------------------
 */
jQuery.extend({

    /** For Create Button Footer Modal :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Button Modal Footer.
     *
     * Format Object Button :
     * -------------------------------------
     * object [
     *      {
     *          'id' => '',
     *          'class' => '',
     *          'attr' => '',
     *          'title' => '',
     *          'type' => [ 'close' || 'default' ],
     *      },
     * ]
     *
     * Format Object Place :
     * -------------------------------------
     * object {
     *      'selector' => [],
     *      'type' => [],
     * }
     *
     * @param   $config     {object}        Berisi config to create Button Footer.
     * @param   $place      {object}        Berisi config to condition place button footer.
     */
    NKTI_Bootstrap_modal_footer_button: function ($config, $place) {

        /** Define variable will be used in this function : */
        var $result, $data = '';
        var $id_button, $class_button, $attr_button, $title_button;

        /** Check IF $config is defined : */
        if ($config != undefined || $config != null || $config != '' || $config != "") {

            /** Prepare while loop to Create Button Footer Modal : */
            var $i = 0;
            var $until_loop = $config.length;

            /** While loop to Create Button Footer Modal : */
            while ($i < $until_loop) {

                /** Check ID Button : */
                if ($config[$i]['id'] != undefined || $config[$i]['id'] != null || $config[$i]['id'] != '' || $config[$i]['id'] != "") {
                    $id_button = 'id="' + $config[$i]['id'] + '" ';
                }
                if ($config[$i]['id'] == undefined || $config[$i]['id'] == null || $config[$i]['id'] == '' || $config[$i]['id'] == "") {
                    $id_button = '';
                }

                /** Check Class Button : */
                if ($config[$i]['class'] != undefined || $config[$i]['class'] != null || $config[$i]['class'] != '' || $config[$i]['class'] != "") {
                    $class_button = ' '+$config[$i]['class'];
                }
                if ($config[$i]['class'] == undefined || $config[$i]['class'] == null || $config[$i]['class'] == '' || $config[$i]['class'] == "") {
                    $class_button = '';
                }

                /** Check IF $config[$i]['type'] is defined : */
                if ($config[$i]['type'] != undefined || $config[$i]['type'] != null || $config[$i]['type'] != '' || $config[$i]['type'] != "") {

                    /** Check IF $config[$i]['type'] == 'close' */
                    var $button_attr = '';
                    if ($config[$i]['type'] == 'close') {
                        $button_attr = 'data-dismiss="modal" ';
                    } else if ($config[$i]['type'] == 'default' || $config[$i]['type'] == '' || $config[$i]['type'] == "") {
                        $button_attr = '';
                    }

                    /** Check Attr Button : */
                    if ($config[$i]['attr'] != undefined || $config[$i]['attr'] != null || $config[$i]['attr'] != '' || $config[$i]['attr'] != "") {
                        $attr_button = ' '+$button_attr+' '+$config[$i]['attr'];
                    }
                    if ($config[$i]['attr'] == undefined || $config[$i]['attr'] == null || $config[$i]['attr'] == '' || $config[$i]['attr'] == "") {
                        $attr_button = '';
                    }

                } /** End of Check IF $config[$i]['type'] is defined. */

                /** Check IF $config[$i]['type'] is undefined : */
                if ($config[$i]['type'] == undefined || $config[$i]['type'] == null || $config[$i]['type'] == '' || $config[$i]['type'] == "") {
                    $attr_button = '';
                } /** End of Check IF $config[$i]['type'] is undefined. */

                /** For Check Title BUtton : */
                if ($config[$i]['title'] != undefined || $config[$i]['title'] != null || $config[$i]['title'] != '' || $config[$i]['title'] != "") {
                    $title_button = $config[$i]['title'];
                }
                if ($config[$i]['title'] == undefined || $config[$i]['title'] == null || $config[$i]['title'] == '' || $config[$i]['title'] == "") {
                    $title_button = '';
                }

                /** For Check Style : */
                if ($config[$i]['style'] != undefined) {
                    $style_button = $config[$i]['style'];
                }
                else {
                    if ($config[$i]['style'] == null || $config[$i]['style'] == '' || $config[$i]['style'] == "") {
                        $title_button = '';
                    } else {
                        $title_button = '';
                    }
                }

                /** Create Button : */
                $data += '<button '+$id_button+'type="button" '+$button_attr+'class="btn '+$class_button+'">'+$title_button+'</button>';

                /** Check Title Button : */

                /** Auto Increment : */
                $i++;
            }
            /** End of while loop to Create Button Footer Modal. */

            /** For Check Place : */
            if ($place != undefined || $place != null || $place != '' || $place != "") {
                var $selector_place = $place['selector'];
                var $type_place = $place['type'];
                switch ($type_place) {
                    case 'append' :
                        $($selector_place).append($data);
                        break;
                    case 'replace' :
                        $($selector_place).html($data);
                        break;
                }
                $result = 1;
            }
            if ($place == undefined || $place == null || $place == '' || $place == "") {
                $result = $data;
            }

        } /** End of Check IF $config is defined. */

        /** Check IF $config is undefined : */
        if ($config == undefined || $config == null || $config == '' || $config == "") {
            console.error('$config Parameter is undefined');
            $result = 0;
        } /** End of Check IF $config is undefined. */

        /** Return Result : */
        return $result;
    },
    /** End of For Create Button Footer Modal.
     * ===================================================================================================== */

    /** For Create Modal :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Modal.
     *
     * Format object Config :
     * -------------------------------------
     * object {
     *      'id' => '',
     *      'title' => '',
     *      'attr' => '',
     * }
     *
     * Format Object Button :
     * -------------------------------------
     * object [
     *      {
     *          'id' => '',
     *          'class' => '',
     *          'attr' => '',
     *          'title' => '',
     *          'type' => [ 'close' || 'default' ],
     *      },
     * ]
     *
     * Format Object Place Modal :
     * -------------------------------------
     * object {
     *      'selector' => [],
     *      'type' => [],
     * }
     *
     * Format Object Place Button :
     * -------------------------------------
     * object {
     *      'selector' => [],
     *      'type' => [],
     * }
     *
     *
     * @param $config       {object}    Berisi data config Modal.
     * @param $content      {object}    Berisi Content Data Modal.
     * @param $button       {object}    Berisi Data Config Modal Modal.
     * @param $place        {object}    Berisi Data Config Place Modal.
     * @param $place_button {object}    Berisi Data Config Place BUtton Modal.
     *
     */
    NKTI_Bootstrap_modal: function ($config, $content, $button, $place, $place_button) {

        /** Define variable will be used in this function : */
        var $result, $content_modal, $button_modal, $place_modal;
        var $data = '';
        var $id_modal, $title_modal, $attr_modal;

        /** Jika $config is exist : */
        if ($config != undefined || $config != null || $config != '' || $config != "") {

            /** For Content Modal : */
            if ($content != '' || $content != "") {
                $content_modal = $content;
            }
            if ($content == '' || $content == "") {
                $content_modal = '';
            }

            /** For Button Modal : */
            if ($button != '' || $button != "") {
                $button_modal = $.NKTI_Bootstrap_modal_footer_button($button, $place_button);
            }
            if ($button == '' || $button == "") {
                $button_modal = '';
            }

            /** For Place Modal : */
            if ($place != '' || $place != "") {
                $place_modal = $place;
            }
            if ($place == '' || $place == "") {
                $place_modal = '';
            }

            /** For ID Modal : */
            if ($config['id'] != undefined || $config['id'] != null || $config['id'] != '' || $config['id'] != "") {
                $id_modal = 'id="' + $config['id'] + '" ';
            }
            if ($config['id'] == undefined || $config['id'] == null || $config['id'] == '' || $config['id'] == "") {
                $id_modal = '';
            }

            /** For Title Modal : */
            if ($config['title'] != undefined || $config['title'] != null || $config['title'] != '' || $config['title'] != "") {
                $title_modal = $config['title']
            }
            if ($config['title'] == undefined || $config['title'] == null || $config['title'] == '' || $config['title'] == "") {
                $title_modal = '';
            }

            /** For attribute Modal : */
            if ($config['attr'] != undefined || $config['attr'] != null || $config['attr'] != '' || $config['attr'] != "") {
                $attr_modal = $config['attr']+' ';
            }
            if ($config['attr'] == undefined || $config['attr'] == null || $config['attr'] == '' || $config['attr'] == "") {
                $attr_modal = '';
            }

            /** Header Modal : */
            $data += '<div class="modal fade" '+$id_modal+$attr_modal+'data-backdrop="static" data-keyboard="false" tabindex="-1" role="basic" aria-hidden="true">';
            $data += '<div class="modal-dialog">';
            $data += '<div class="modal-content">';
            $data += '<div class="modal-header">';
            $data += '<button type="button" class="close fa fa-times" data-dismiss="modal" aria-hidden="true"></button>';
            $data += '<h4 class="modal-title">'+$title_modal+'</h4>';
            $data += '</div>';
            $data += '<div class="modal-body">';

            /** Place Content Modal : */
            $data += $content_modal;

            /** Footer Modal : */
            $data += '</div>';
            $data += '<div class="modal-footer">';
            $data += $button_modal;
            $data += '</div>';
            $data += '</div> <!-- /.modal-content -->';
            $data += '</div> <!-- /.modal-dialog -->';
            $data += '</div>';

            /** Check IF $place is not null and object : */
            if ($place != undefined || $place != null || $place != '' || $place != "")
            {
                /** Check IF $place is object : */
                if (typeof $place == 'object') {
                    var $selector_modal = $place['selector'];
                    var $type_place = $place['type'];
                    switch ($type_place) {
                        case 'append' :
                            $($selector_modal).append($data);
                            break;
                        case 'replace' :
                            $($selector_modal).html($data);
                            break;
                    }
                    $result = 0;
                } /** End of Check IF $place is object. */

                /** Check IF $place is not object : */
                if (typeof $place != 'object') {
                    $result = $data;
                } /** End of Check IF $place is object. */

            } /** End of Check IF $place is not null and object. */

            /** Check IF $place is null and object : */
            if ($place != undefined || $place != null || $place != '' || $place != "") {
                $result = $data;
            } /** End of Check IF $place is null and object. */

        } /** End of Jika $config is exist. */

        /** Jika $config is not exist : */
        if ($config == undefined || $config == null || $config == '' || $config == "") {
            console.error('Parameter $config is undefined.');
            $result = 0;
        } /** End of Jika $config is not exist. */

        /** Return Result : */
        return $result;
    },
    /** End of For Create Modal.
     * ===================================================================================================== */

    /** For Create Modal Large :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Modal.
     *
     * Format object Config :
     * -------------------------------------
     * object {
     *      'id' => '',
     *      'title' => '',
     *      'attr' => '',
     * }
     *
     * Format Object Button :
     * -------------------------------------
     * object [
     *      {
     *          'id' => '',
     *          'class' => '',
     *          'attr' => '',
     *          'title' => '',
     *          'type' => [ 'close' || 'default' ],
     *      },
     * ]
     *
     * Format Object Place Modal :
     * -------------------------------------
     * object {
     *      'selector' => [],
     *      'type' => [],
     * }
     *
     * Format Object Place Button :
     * -------------------------------------
     * object {
     *      'selector' => [],
     *      'type' => [],
     * }
     *
     *
     * @param $config       {object}    Berisi data config Modal.
     * @param $content      {object}    Berisi Content Data Modal.
     * @param $button       {object}    Berisi Data Config Modal Modal.
     * @param $place        {object}    Berisi Data Config Place Modal.
     * @param $place_button {object}    Berisi Data Config Place BUtton Modal.
     *
     */
    NKTI_Bootstrap_modal_large: function ($config, $content, $button, $place, $place_button) {

        /** Define variable will be used in this function : */
        var $result, $content_modal, $button_modal, $place_modal;
        var $data = '';
        var $id_modal, $title_modal, $attr_modal;

        /** Jika $config is exist : */
        if ($config != undefined || $config != null || $config != '' || $config != "") {

            /** For Content Modal : */
            if ($content != '' || $content != "") {
                $content_modal = $content;
            }
            if ($content == '' || $content == "") {
                $content_modal = '';
            }

            /** For Button Modal : */
            if ($button != '' || $button != "") {
                $button_modal = $.NKTI_Bootstrap_modal_footer_button($button, $place_button);
            }
            if ($button == '' || $button == "") {
                $button_modal = '';
            }

            /** For Place Modal : */
            if ($place != '' || $place != "") {
                $place_modal = $place;
            }
            if ($place == '' || $place == "") {
                $place_modal = '';
            }

            /** For ID Modal : */
            if ($config['id'] != undefined || $config['id'] != null || $config['id'] != '' || $config['id'] != "") {
                $id_modal = 'id="' + $config['id'] + '" ';
            }
            if ($config['id'] == undefined || $config['id'] == null || $config['id'] == '' || $config['id'] == "") {
                $id_modal = '';
            }

            /** For Title Modal : */
            if ($config['title'] != undefined || $config['title'] != null || $config['title'] != '' || $config['title'] != "") {
                $title_modal = $config['title']
            }
            if ($config['title'] == undefined || $config['title'] == null || $config['title'] == '' || $config['title'] == "") {
                $title_modal = '';
            }

            /** For attribute Modal : */
            if ($config['attr'] != undefined || $config['attr'] != null || $config['attr'] != '' || $config['attr'] != "") {
                $attr_modal = $config['attr']+' ';
            }
            if ($config['attr'] == undefined || $config['attr'] == null || $config['attr'] == '' || $config['attr'] == "") {
                $attr_modal = '';
            }

            /** Header Modal : */
            $data += '<div class="modal fade bs-modal-lg" '+$id_modal+$attr_modal+'data-backdrop="static" data-keyboard="false" tabindex="-1" role="basic" aria-hidden="true">';
            $data += '<div class="modal-dialog modal-lg">';
            $data += '<div class="modal-content">';
            $data += '<div class="modal-header">';
            $data += '<button type="button" class="close fa fa-times" data-dismiss="modal" aria-hidden="true"></button>';
            $data += '<h4 class="modal-title">'+$title_modal+'</h4>';
            $data += '</div>';
            $data += '<div class="modal-body">';

            /** Place Content Modal : */
            $data += $content_modal;

            /** Footer Modal : */
            $data += '</div>';
            $data += '<div class="modal-footer">';
            $data += $button_modal;
            $data += '</div>';
            $data += '</div> <!-- /.modal-content -->';
            $data += '</div> <!-- /.modal-dialog -->';
            $data += '</div>';

            /** Check IF $place is not null and object : */
            if ($place != undefined || $place != null || $place != '' || $place != "")
            {
                /** Check IF $place is object : */
                if (typeof $place == 'object') {
                    var $selector_modal = $place['selector'];
                    var $type_place = $place['type'];
                    switch ($type_place) {
                        case 'append' :
                            $($selector_modal).append($data);
                            break;
                        case 'replace' :
                            $($selector_modal).html($data);
                            break;
                    }
                    $result = 0;
                } /** End of Check IF $place is object. */

                /** Check IF $place is not object : */
                if (typeof $place != 'object') {
                    $result = $data;
                } /** End of Check IF $place is object. */

            } /** End of Check IF $place is not null and object. */

            /** Check IF $place is null and object : */
            if ($place != undefined || $place != null || $place != '' || $place != "") {
                $result = $data;
            } /** End of Check IF $place is null and object. */

        } /** End of Jika $config is exist. */

        /** Jika $config is not exist : */
        if ($config == undefined || $config == null || $config == '' || $config == "") {
            console.error('Parameter $config is undefined.');
            $result = 0;
        } /** End of Jika $config is not exist. */

        /** Return Result : */
        return $result;
    },
    /** End of For Create Modal Large.
     * ===================================================================================================== */

    /** For Create Button Bootstrap :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Button Bootstrap.
     *
     * Format Object Button :
     * -------------------------------------
     * object [
     *      {
     *          'id' => '',
     *          'class' => '',
     *          'attr' => '',
     *          'title' => '',
     *          'type' => [ 'submit' || 'button' ],
     *      },
     * ]
     *
     * Format Object Place :
     * -------------------------------------
     * object {
     *      'selector' => [],
     *      'type' => [],
     * }
     *
     * @param   $type_tag   {string}        Berisi type button. Ex : "button" || "a"
     * @param   $config     {object}        Berisi config to create Button Footer.
     * @param   $place      {object}        Berisi config to condition place button footer.
     */
    NKTI_Bootstrap_button: function ($type_tag, $config, $place) {

        /** Define variable will be used in this function : */
        var $result, $data, $type_tag_button;
        var $id_button, $class_button, $attr_button, $title_button, $type_button;

        /** Check Type Tag : */
        if ($type_tag != undefined || $type_tag != null || $type_tag != '' || $type_tag != "") {
            if ($type_tag == 'button') {
                $type_tag_button = 'button';
            } else if ($type_tag == 'a') {
                $type_tag_button = 'a';
            }
        }
        if ($type_tag == undefined || $type_tag == null || $type_tag == '' || $type_tag == "") {
            $type_tag_button = 'button';
        }

        /** Check IF $config is defined : */
        if ($config != undefined || $config != null || $config != '' || $config != "") {

            /** Prepare while loop to Create Button Footer Modal : */
            var $i = 0;
            var $until_loop = $config.length;

            /** While loop to Create Button Footer Modal : */
            while ($i < $until_loop) {

                /** Check ID Button : */
                if ($config[$i]['id'] != undefined || $config[$i]['id'] != null || $config[$i]['id'] != '' || $config[$i]['id'] != "") {
                    $id_button = 'id="' + $config[$i]['id'] + '" ';
                }
                if ($config[$i]['id'] == undefined || $config[$i]['id'] == null || $config[$i]['id'] == '' || $config[$i]['id'] == "") {
                    $id_button = '';
                }

                /** Check Class Button : */
                if ($config[$i]['class'] != undefined || $config[$i]['class'] != null || $config[$i]['class'] != '' || $config[$i]['class'] != "") {
                    $class_button = ' '+$config[$i]['class'];
                }
                if ($config[$i]['class'] == undefined || $config[$i]['class'] == null || $config[$i]['class'] == '' || $config[$i]['class'] == "") {
                    $class_button = '';
                }

                /** Check Attr Button : */
                if ($config[$i]['attr'] != undefined || $config[$i]['attr'] != null || $config[$i]['attr'] != '' || $config[$i]['attr'] != "") {
                    $attr_button = ' '+$config[$i]['attr'];
                }
                if ($config[$i]['attr'] == undefined || $config[$i]['attr'] == null || $config[$i]['attr'] == '' || $config[$i]['attr'] == "") {
                    $attr_button = '';
                }

                /** Check Type Button : */
                if ($config[$i]['type'] != undefined || $config[$i]['type'] != null || $config[$i]['type'] != '' || $config[$i]['type'] != "") {
                    if ($config[$i]['type'] == 'submit') {
                        $type_button = 'submit';
                    } else if ($config[$i]['type'] == 'button') {
                        $type_button = 'button';
                    }
                }
                if ($config[$i]['type'] == undefined || $config[$i]['type'] == null || $config[$i]['type'] == '' || $config[$i]['type'] == "") {
                    $type_button = 'button';
                } /** End of Check IF $config[$i]['type'] is undefined. */

                /** For Check Title BUtton : */
                if ($config[$i]['title'] != undefined || $config[$i]['title'] != null || $config[$i]['title'] != '' || $config[$i]['title'] != "") {
                    $title_button = $config[$i]['title'];
                }
                if ($config[$i]['title'] == undefined || $config[$i]['title'] == null || $config[$i]['title'] == '' || $config[$i]['title'] == "") {
                    $title_button = '';
                }

                /** Create Button : */
                $data += '<'+$type_tag_button+' '+$id_button+'type="'+$type_button+'" class="btn '+$class_button+'"'+$attr_button+'>'+$title_button+'</'+$type_tag_button+'>';

                /** Auto Increment : */
                $i++;
            }
            /** End of while loop to Create Button Footer Modal. */

            /** For Check Place : */
            if ($place != undefined || $place != null || $place != '' || $place != "") {
                var $selector_place = $place['selector'];
                var $type_place = $place['type'];
                switch ($type_place) {
                    case 'append' :
                        $($selector_place).append($data);
                        break;
                    case 'replace' :
                        $($selector_place).html($data);
                        break;
                }
                $result = 1;
            }
            if ($place == undefined || $place == null || $place == '' || $place == "") {
                $result = $data;
            }

        } /** End of Check IF $config is defined. */

        /** Check IF $config is undefined : */
        if ($config == undefined || $config == null || $config == '' || $config == "") {
            console.error('$config Parameter is undefined');
            $result = 0;
        } /** End of Check IF $config is undefined. */

        /** Return Result : */
        return $result;
    },
    /** End of For Create Button Bootstrap.
     * ===================================================================================================== */

    /** For Create Wrapper Modal :
     * -----------------------------------------------------------
     * Function yang brefungsi untuk Membuat Membuat Wrapper Modal.
     *
     * @param   $config     {object}        Berisi Data Config Object.
     * @param   $data       {string}        Berisi data Inner Object
     */
    NKTI_Bootstrap_modal_custom_wrapper: function ($config, $data) {
		
		/** Define variable for result : */
		var $result_func = 0, $data_wrapper = '';

        /** Check IF $config is object : */
		if (typeof $config == "object" && $config != null) {
			
			/** Check if property "wrap" is exist in object $config param : */
			if ($config['wrap'] != undefined) {

			    /** Check IF property "wrap" is object : */
			    if (typeof $config['wrap'] == "object" && $config['wrap'] != null) {

			        /** Define variable for data wrap : */
			        var $id_wrap, $class_wrap, $attr_wrap, $style_wrap;

			        /** For Check property "id" in object $config['wrap'] : */
			        if ($config['wrap']['id'] != undefined) {
			            if ($config['wrap']['id'] != '' || $config['wrap']['id'] != "") {
			                $id_wrap = ' id="'+$config['wrap']['id']+'"';
                        } else {
                            $id_wrap = '';
                        }
                    } else {
                        $id_wrap = '';
                    }

                    /** For Check property "class" in object $config['wrap'] : */
                    if ($config['wrap']['class'] != undefined) {
                        if ($config['wrap']['class'] != '' || $config['wrap']['class'] != "") {
                            $class_wrap = ' class="modal fade '+$config['wrap']['class']+'"';
                        } else {
                            $class_wrap = ' class="modal fade"';
                        }
                    } else {
                        $class_wrap = ' class="modal fade"';
                    }

                    /** For Check Property "attr" in object $config['wrap'] : */
                    if ($config['wrap']['attr'] != undefined) {
                        if ($config['wrap']['attr'] != '' || $config['wrap']['attr'] != "") {
                            $attr_wrap = ' role="dialog" '+$config['wrap']['attr']+'';
                        } else {
                            $attr_wrap = ' role="dialog"';
                        }
                    } else {
                        $attr_wrap = ' role="dialog"';
                    }

                    /** For Check Property "style" in object $config['wrap'] : */
                    if ($config['wrap']['style'] != undefined) {
                        if ($config['wrap']['style'] != '' || $config['wrap']['style'] != "") {
                            $style_wrap = ' style="'+$config['wrap']['style']+'"';
                        } else {
                            $style_wrap = '';
                        }
                    } else {
                        $style_wrap = '';
                    }

                    /** Begin Wrapper : */
                    $data_wrapper += '<div '+$id_wrap+$class_wrap+$attr_wrap+$style_wrap+'>';
                }
			    /** End of Check IF property "wrap" is object. */

			    /** Check IF property "wrap" is not object : */
			    else {
                    /** Debug : */
                    console.log('Parameter object "wrap" in $config param is not object');
                    /** Begin wrapper : */
                    $data_wrapper += '<div id="newModal" class="modal fade" role="dialog">';
                }
			    /** End of Check IF property "wrap" is not object. */
			}
			/** End of Check if property "wrap" is exist in $config param. */
			
			/** Check IF property "wrap" is not exist in $config param : */
			else {
			    /** Debug : */
				console.log('Parameter object "wrap" in $config param is not exist');
                /** Begin wrapper : */
                $data_wrapper += '<div id="newModal" class="modal fade" role="dialog">';
			}
			/** End of Check IF property "wrap" is not exist in $config param.*/

			/** ------------------------------------------------------------------------------ */
			/** ------------------------------------------------------------------------------ */

			/** Check IF property "inner" in object $config is exists : */
			if ($config['inner'] != undefined) {

			    /** Check IF property "inner" is object : */
			    if (typeof $config['inner'] == "object" && $config['inner'] != null) {

			        /** Define variable for data Inner : */
			        var $id_inner, $class_inner, $attr_inner, $style_inner;

                    /** For Check properyt "id" in object $config['inner'] : */
                    if ($config['inner']['id'] != undefined) {
                        if ($config['inner']['id'] != '' || $config['inner']['id'] != "") {
                            $id_inner = ' id="'+$config['inner']['id']+'"';
                        } else {
                            $id_inner = '';
                        }
                    } else {
                        $id_inner = '';
                    }

                    /** For Check Property "class" in object $config['inner'] : */
                    if ($config['inner']['class'] != undefined) {
                        if ($config['inner']['class'] != '' || $config['inner']['class'] != "") {
                            $class_inner = ' class="modal-dialog '+$config['inner']['class']+'"';
                        } else {
                            $class_inner = ' class="modal-dialog"';
                        }
                    } else {
                        $class_inner = ' class="modal-dialog"';
                    }

                    /** For Check property "attr" in object $config['inner'] : */
                    if ($config['inner']['attr'] != undefined) {
                        if ($config['inner']['attr'] != '' || $config['inner']['attr'] != "") {
                            $attr_inner = ' '+$config['inner']['attr'];
                        } else {
                            $attr_inner = '';
                        }
                    } else {
                        $attr_inner = '';
                    }

                    /** Check Property "style" in object $config['inner'] : */
                    if ($config['inner']['attr'] != undefined) {
                        if ($config['inner']['attr'] != '' || $config['inner']['attr'] != "") {
                            $style_inner = ' style="'+$config['inner']['attr']+'"';
                        } else {
                            $style_inner = '';
                        }
                    } else {
                        $style_inner = '';
                    }

                    /** Define variable for get data : */
                    $data_wrapper += '<div'+$id_inner+$class_inner+$attr_inner+$style_inner+'>';
                }
			    /** End of Check IF property "inner" is object. */

			    /** Check IF property "inner" is not object : */
			    else {

                    /** Debug : */
                    console.log('Parameter object "inner" in $config param is not object');

                    /** Begin wrapper : */
                    $data_wrapper += '<div class="modal-dialog" >';
                }
			    /** End of Check IF property "inner" is not object. */
            }
			/** End of Check IF property "inner" in object $config is exists. */

			/** Check IF property "inner" in object $config is not exists : */
			else {

                /** Debug : */
                console.log('Parameter object "inner" in $config param is not exist');

                /** Begin wrapper : */
                $data_wrapper += '<div class="modal-dialog" >';
            }
			/** End of Check IF property "inner" in object $config is not exists. */

			/** Check Parameter $data : */
			if (typeof $data == "string") {
			    $data_wrapper += $data;
                // console.log('Data Wrapper : String');
            } else {
                $data_wrapper += '';
                // console.log('Data Wrapper : Not String');
            }

			/** Ending Inner : */
			$data_wrapper += '</div>';

			/** Ending Wrapper : */
			$data_wrapper += '</div>';

            /** Place result : */
            $result_func = $data_wrapper;
		}
		/** End of Check IF $config is object */
		
		/** Check IF $config is not object : */
		else {

		    /** Debug : */
			console.log('Wrapper Modal : Parameter $config is not object');

            /** Create Wrapper Modal : */
            $wrapper_modal += '<div id="myModal" class="modal fade" role="dialog">';
            $wrapper_modal += '<div class="modal-dialog">';
            $wrapper_modal += $data;
            $wrapper_modal += '</div>';
            $wrapper_modal += '</div>';

            /** Place result  */
			$result_func = $wrapper_modal;
		}
		/** End of Check IF $config is not object. */
		
		/** Return Result : */
		return $result_func;
    },
    /** End of For Create Wrapper Modal.
     * ===================================================================================================== */

    /** For Create Content Modal :
     * -----------------------------------------------------------------------------------------------------
     * Function yang berfungsi untuk membuat Content Modal.
	 * 
	 * @param	$config			{object}		Berisi Data config Content Modal.
	 * @param	$data			{string}		Berisi Data Content Modal.
     */
	 NKTI_Bootstrap_modal_custom_content: function($config, $data) {
		
		/** Define variable for result result : */
		var $result_func = 0;
		 
		/** Check IF $config is object : */
		if (typeof $config == "object") {
			
			/** Define variable for data content Modal : */
			var $id_content, $class_content, $attr_content, $style_content;
			
			/** For Check property $config['id'] : */
			if ($config['id'] != undefined) {
				if ($config['id'] != '' || $config['id'] != "") {
					$id_content = 'id="'+$config['id']+'"';
				} else {
					$id_content = '';
				}
			} else {
				$id_content = '';
			}
			
			/** For Check Property $config['class'] : */
			if ($config['class'] != undefined) {
				if ($config['class'] != '' || $config['class'] != "") {
					$class_content = 'class="modal-content '+$config['class']+'"';
				} else {
					$class_content = 'class="modal-content"';
				}
			} else {
				$class_content = 'class="modal-content"';
			}
			
			/** For Check Property $config['attr'] */
			if ($config['attr'] != undefined) {
				if ($config['attr'] != '' || $config['attr'] != "") {
					$attr_content = ' '+$config['attr']+' ';
				} else {
					$attr_content = '';
				}
			} else {
				$attr_content = '';
			}
			
			/** For Check Property $config['style'] : */
			if ($config['style'] != undefined) {
				if ($config['style'] != '' || $config['style'] != "") {
					$style_content = ' style="'+$config['style']+'" ';
				} else {
					$style_content = '';
				}
			} else {
				$style_content = '';
			}
			
			/** Create content Modal : */
			var $modal_content = '<div '+$id_content+$class_content+$attr_content+$style_content+'>';
			$modal_content += $data;
			$modal_content += '</div>';

            /** Place result : */
            $result_func = $modal_content;
		}
		/** End of Check IF $config is object : */
		
		/** Check IF $config is not object : */
		else {

		    /** Debug : */
			console.log('Parameter $config is not object');

            /** Create Content Modal : */
            var $content_modal = '<div class="modal-content">';
            $content_modal += $data;
            $content_modal += '</div>';

            /** Place result : */
			$result_func = $content_modal;
		}
		/** End of Check IF $config is not object : */
		
		/** Return Result : */
		return $result_func;
	 },
    /** End of For Create Content Modal.
     * ===================================================================================================== */

    /** For Create Header Content Modal :
     * -----------------------------------------------------------------------------------------------------
     * Function yang berfungsi untuk Membuat Header Modal Content.
	 * 
	 * @param	$config			{object}		Berisi Data Config Header Content Modal.
     */
	 NKTI_Bootstrap_modal_custom_content_header: function($config) {
		
		/** Define variable for result result : */
		var $result_func = 0;
		
		/** Check IF $config is object : */
		if (typeof $config == "object") {
			
			/** Check IF property "wrap" in object $config is exists : */
			if ($config['wrap'] != undefined) {
				
				/** Check IF property "inner" in object $config is exists : */
				if ($config['inner'] != undefined) {
					
					/** Define variable for data wrapper : */
					var $id_wrap, $class_wrap, $attr_wrap, $style_wrap;
					var $type_inner, $data_inner;
					
					/** ---------------------------------------------------------------------- */
					/** START WRAP HEADER : */
					/** ---------------------------------------------------------------------- */
					
					/** For check property "id" in object $config['wrap'] : */
					if ($config['wrap']['id'] != undefined) {
						if ($config['wrap']['id'] != '' || $config['wrap']['id'] != "") {
							$id_wrap = 'id="'+$config['wrap']['id']+'" ';
						} else {
							$id_wrap = '';
						}
					} else {
						$id_wrap = '';
					}
					
					/** For Check Property "class" in object $config['wrap'] : */
					if ($config['wrap']['class'] != undefined) {
						if ($config['wrap']['class'] != '' || $config['wrap']['class'] != "") {
							$class_wrap = 'class="modal-header '+$config['wrap']['class']+'"';
						} else {
							$class_wrap = 'class="modal-header"';
						}
					} else {
						$class_wrap = 'class="modal-header"';
					}
					
					/** For Check Property "attr" in object $config['wrap'] : */
					if ($config['wrap']['attr'] != undefined) {
						if ($config['wrap']['attr'] != '' || $cconfig['wrap']['attr'] != "") {
							$attr_wrap = ' '+$config['wrap']['attr']+' ';
						} else {
							$attr_wrap = '';
						}
					} else {
						$attr_wrap = '';
					}
					
					/** For Check Property "style" in object $config['wrap'] : */
					if ($config['wrap']['style'] != undefined) {
						if ($config['wrap']['style'] != '' || $config['wrap']['style'] != "") {
							$style_wrap = ' style="'+$config['wrap']['style']+'" ';
						} else {
							$style_wrap = '';
						}
					} else {
						$style_wrap = '';
					}
					
					/** ---------------------------------------------------------------------- */
					/** START INNERT HEADER : */
					/** ---------------------------------------------------------------------- */
					
					/** Check IF Property "type" in object $config['innert']['type'] is exists : */
					if ($config['inner']['type'] != undefined) {
						
						/** Define variable for data Header : */
						var $data_header;

                        /** Define variable for data post : */
                        var $title_header, $id_header, $class_header, $attr_header, $style_header;
						
						/** Switch case for check $config['inner']['type'] : */
						switch ($config['inner']['type']) 
						{
							/** Case for propert 'type' == '' OR 'type' == 0 AND 
							 * Default Case for conditon $config['inner']['type'] : */
							case '' :
							case 0 :
							default :
								
								/** Check IF property "data" in object $config['inner'] is exists : */
								if ($config['inner']['data'] != undefined) {

                                    /** For Check property "title" in object $config['inner']['data'] : */
                                    if ($config['inner']['data']['title'] != undefined) {
                                        if ($config['inner']['data']['title'] != '' || $config['inner']['data']['title'] != "") {
                                            $title_header = $config['inner']['data']['title'];
                                        } else {
                                            $title_header = 'New Modal';
                                        }
                                    } else {
                                        $title_header = 'New Modal';
                                    }

                                    /** For Check property "id" in object $config['inner']['data'] : */
                                    if ($config['inner']['data']['id'] != undefined) {
                                        if ($config['inner']['data']['id'] != '' || $config['inner']['data']['id'] != "") {
                                            $id_header = 'id="' + $config['inner']['data']['id'] + '" ';
                                        } else {
                                            $id_header = '';
                                        }
                                    } else {
                                        $id_header = '';
                                    }

                                    /** For Check Property "class" in object $config['inner']['data'] : */
                                    if ($config['inner']['data']['class'] != undefined) {
                                        if ($config['inner']['data']['class'] != '' || $config['inner']['data']['class'] != "") {
                                            $class_header = 'class="modal-titile ' + $config['inner']['data']['class'] + '" '
                                        } else {
                                            $class_header = 'class="modal-titile" '
                                        }
                                    } else {
                                        $class_header = 'class="modal-titile" '
                                    }

                                    /** For Check Property "attr" in object $config['inner']['data'] : */
                                    if ($config['inner']['data']['attr'] != undefined) {
                                        if ($config['inner']['data']['attr'] != '' || $config['inner']['data']['attr'] != "") {
                                            $attr_header = $config['inner']['data']['attr'] + '" '
                                        } else {
                                            $attr_header = ''
                                        }
                                    } else {
                                        $attr_header = ''
                                    }

                                    /** For Check Property "style" in object $config['inner']['data'] : */
                                    if ($config['inner']['data']['style'] != undefined) {
                                        if ($config['inner']['data']['style'] != '' || $config['inner']['data']['style'] != "") {
                                            $style_header = 'style="' + $config['inner']['data']['style'] + '" '
                                        } else {
                                            $style_header = ''
                                        }
                                    } else {
                                        $style_header = ''
                                    }

                                    /** Create Data Header : */
                                    $data_header = '<button type="button" class="close" data-dismiss="modal">&times;</button>';
                                    $data_header += '<h4 ' + $id_header + $class_header + $attr_header + $style_header + '>'+$title_header+'</h4>';
                                }
								/** End of Check IF property "data" in object $config['inner'] is exists : */
								
								/** Check IF property "data" in object $config['inner'] is not exists : */
								else {
									
									/** Create Data Header : */
									$data_header = '<button type="button" class="close" data-dismiss="modal">&times;</button>';
									$data_header += '<h4 class="modal-title">Modal Header</h4>';
								}
								/** End of Check IF property "data" in object $config['inner'] is not exists : */
								break;
								
							/** Case for property 'type' == 1 */
							case 1 :
								
								/** Check IF property "data" in object $config['inner'] is exists : */
								if ($config['inner']['data'] != undefined) {
									
									/** For Check property "title" in object $config['inner']['data'] : */
									if ($config['inner']['data']['title'] != undefined) {
										if ($config['inner']['data']['title'] != '' || $config['inner']['data']['title'] != "") {
                                            $title_header = $config['inner']['data']['title'];
										} else {
											$title_header = 'New Modal';
										}
									} else {
										$title_header = 'New Modal';
									}
									
									/** For Check property "id" in object $config['inner']['data'] : */
									if ($config['inner']['data']['id'] != undefined) {
										if ($config['inner']['data']['id'] != '' || $config['inner']['data']['id'] != "") {
											$id_header = 'id="'+$config['inner']['data']['id']+'" ';
										} else {
											$id_header = '';
										}
									} else {
										$id_header = '';
									}
									
									/** For Check Property "class" in object $config['inner']['data'] : */
									if ($config['inner']['data']['class'] != undefined) {
										if ($config['inner']['data']['class'] != '' || $config['inner']['data']['class'] != "") {
											$class_header = 'class="modal-titile '+$config['inner']['data']['class']+'" '
										} else {
											$class_header = 'class="modal-titile" '
										}
									} else {
										$class_header = 'class="modal-titile" '
									}
									
									/** For Check Property "attr" in object $config['inner']['data'] : */
									if ($config['inner']['data']['attr'] != undefined) {
										if ($config['inner']['data']['attr'] != '' || $config['inner']['data']['attr'] != "") {
											$attr_header = $config['inner']['data']['attr']+'" '
										} else {
											$attr_header = ''
										}
									} else {
										$attr_header = ''
									}
									
									/** For Check Property "style" in object $config['inner']['data'] : */
									if ($config['inner']['data']['style'] != undefined) {
										if ($config['inner']['data']['style'] != '' || $config['inner']['data']['style'] != "") {
											$style_header = 'style="'+$config['inner']['data']['style']+'" '
										} else {
											$style_header = ''
										}
									} else {
										$style_header = ''
									}
									
									/** Create Data Header : */
									$data_header = '<button type="button" class="close" data-dismiss="modal">&times;</button>';
									$data_header += '<h4 '+$id_header+$class_header+attr_header+style_header+'>'+$title_header+'</h4>';
									$data_header += $config['inner']['data']['data'];
								}
								/** End of Check IF property "data" in object $config['inner'] is exists : */
								
								/** Check IF property "data" in object $config['inner'] is not exists : */
								else {
									
									/** Create Data Header : */
									$data_header = '<button type="button" class="close" data-dismiss="modal">&times;</button>';
									$data_header += '<h4 class="modal-title">Modal Header</h4>';
								}
								/** End of Check IF property "data" in object $config['inner'] is not exists : */
								break;
								
							/** Case for property 'type' == 2 */
							case 2 :
								
								/** Create Data Header : */
								$data_header = $config['inner']['data'];
								break;
								
							/** Case for property 'type' == 3 */
							case 3 :
								
								/** Check IF property "data" in object $config['inner'] is exists : */
								if ($config['inner']['data'] != undefined) {
									
									/** For Check property "title" in object $config['inner']['data'] : */
									if ($config['inner']['data']['title'] != undefined) {
										if ($config['inner']['data']['title'] != '' || $config['inner']['data']['title'] != "") {
                                            $title_header = $config['inner']['data']['title'];
										} else {
											$title_header = 'New Modal';
										}
									} else {
										$title_header = 'New Modal';
									}
									
									/** For Check property "id" in object $config['inner']['data'] : */
									if ($config['inner']['data']['id'] != undefined) {
										if ($config['inner']['data']['id'] != '' || $config['inner']['data']['id'] != "") {
											$id_header = 'id="'+$config['inner']['data']['id']+'" ';
										} else {
											$id_header = '';
										}
									} else {
										$id_header = '';
									}
									
									/** For Check Property "class" in object $config['inner']['data'] : */
									if ($config['inner']['data']['class'] != undefined) {
										if ($config['inner']['data']['class'] != '' || $config['inner']['data']['class'] != "") {
											$class_header = 'class="modal-title '+$config['inner']['data']['class']+'" '
										} else {
											$class_header = 'class="modal-title" '
										}
									} else {
										$class_header = 'class="modal-title" '
									}
									
									/** For Check Property "attr" in object $config['inner']['data'] : */
									if ($config['inner']['data']['attr'] != undefined) {
										if ($config['inner']['data']['attr'] != '' || $config['inner']['data']['attr'] != "") {
											$attr_header = $config['inner']['data']['attr']+'" '
										} else {
											$attr_header = ''
										}
									} else {
										$attr_header = ''
									}
									
									/** For Check Property "style" in object $config['inner']['data'] : */
									if ($config['inner']['data']['style'] != undefined) {
										if ($config['inner']['data']['style'] != '' || $config['inner']['data']['style'] != "") {
											$style_header = 'style="'+$config['inner']['data']['style']+'" '
										} else {
											$style_header = ''
										}
									} else {
										$style_header = ''
									}
									
									/** Create Data Header : */
									$data_header += '<h4 '+$id_header+$class_header+attr_header+style_header+'>'+$title_header+'</h4>';
								}
								/** End of Check IF property "data" in object $config['inner'] is exists : */
								
								/** Check IF property "data" in object $config['inner'] is not exists : */
								else {
									
									/** Create Data Header : */
									$data_header += '<h4 class="modal-title">Modal Header</h4>';
								}
								/** End of Check IF property "data" in object $config['inner'] is not exists : */
								break;
						}
						/** End of Switch case for check $config['inner']['type']. */
						
						/** Create Modal Header : */
						var $modal_header = '<div '+$id_wrap+$class_wrap+$attr_wrap+$style_wrap+'>';
						$modal_header += $data_header;
						$modal_header += '</div>';
						
						/** Return Result : */
						$result_func = $modal_header;
					}
					/** End of Check IF Property "type" in object $config['innert']['type'] is not exists : */
					
					/** Check IF Property "type" in object $config['innert']['type'] is not exists. */
					else {
						console.error('Property "type" in object $config[\'inner\'] is not exists');
						$result_func = 0;
					}
					/** End of Check IF Property "type" in object $config['innert']['type'] is not exists. */
				}
				/** End of Check IF property "inner" in object $config is exists. */
				
				/** Check IF property "inner" in object $config is not exists : */
				else {
					console.error('Property "inner" in object $config is not exists');
					$result_func = 0;
				}
				/** End of Check IF property "inner" in object $config is not exists. */
			}
			/** End of Check IF property "wrap" in object $config is exists. */
			
			/** Check IF property "wrap" in object $config is not exists : */
			else {
				console.error('Property "wrap" in object $config is not exists');
				$result_func = 0;
			}
			/** End of Check IF property "wrap" in object $config is not exists. */
		}
		/** End of Check IF $config is object : */
		
		/** Check IF $config is not object : */
		else {

		    /** Debug : */
			console.log('Parameter $config is not object');

            /** Create Data Header : */
            var $data_header_err = '<div class="modal-header">';
            $data_header_err += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
            $data_header_err += '<h4 class="modal-title">Modal Header</h4>';
            $data_header_err += '</div>';

            /** Place result : */
			$result_func = $data_header_err;
		}
		/** End of Check IF $config is not object : */
		
		/** Return Result : */
		return $result_func;
	 },
    /** End of For Create Header Content Modal.
     * ===================================================================================================== */

    /** For Create Body Modal :
     * -----------------------------------------------------------------------------------------------------
     * Function yang berfungsi untuk membuat body modal.
	 * 
	 * @param	$config			{object}		Berisi data config Modal Body.
	 * @param	$data			{string}		Berisi Data Content body Modal.
     */
	NKTI_Bootstrap_modal_custom_content_body: function($config, $data) {
		
		/** Define variable for result result : */
		var $result_func = 0;
		
		/** Check IF param $config is object : */
		if (typeof $config == "object") {
			
			/** Define variable for data $config : */
			var $id_body, $class_body, $attr_body, $style_body;
			
			/** For Check property "id" in object $config : */
			if ($config['id'] != undefined) {
				if ($config['id'] != '' || $config['id'] != "") {
					$id_body = 'id="'+$config['id']+'" ';
				} else {
					$id_body = '';
				}
			} else {
				$id_body = '';
			}
			
			/** For Check Property "class" in object $config : */
			if ($config['class'] != undefined) {
				if ($config['class'] != '' || $config['class'] != "") {
					$class_body = 'class="modal-body '+$config['class']+'" ';
				} else {
					$class_body = 'class="modal-body '+$config['class']+'" ';
				}
			} else {
				$class_body = 'class="modal-body"';
			}
			
			/** For Check Property "attr" in object $config : */
			if ($config['attr'] != undefined) {
				if ($config['attr'] != '' || $config['attr'] != "") {
					$attr_body = $config['attr']+' ';
				} else {
					$attr_body = '';
				}
			} else {
				$attr_body = '';
			}
			
			/** For Check Property "style" in object $config : */
			if ($config['style'] != undefined) {
				if ($config['style'] != '' || $config['style'] != "") {
					$style_body = 'style="'+$config['style']+'" ';
				} else {
					$style_body = '';
				}
			} else {
				$style_body = '';
			}
			
			/** Create Body Modal : */
			var $modal_body = '<div '+$id_body+$class_body+$attr_body+$style_body+'>';
			$modal_body += $data;
			$modal_body += '</div>';
			
			/** Create Modal body : */
			$result_func = $modal_body;
		}
		/** End of Check IF param $config is object. */
		
		/** Check IF param $config is not object : */
		else {
			console.error('Parameter $config is not object');
			$result_func = 0;
		}
		/** End of Check IF param $config is not object. */
		
		/** Return Result : */
		return $result_func;
	},
    /** End of For Create Body Modal.
     * ===================================================================================================== */
	
    /** For Create Footer Button Modal :
     * -----------------------------------------------------------------------------------------------------
     * Function yang brefungsi untuk Membuat Button Footer Modal.
     *
     * Format Object Button :
     * -------------------------------------
     * object [
     *      {
     *          'id' => '',
     *          'class' => '',
     *          'attr' => '',
     *          'title' => '',
     *          'type' => [ 'close' || 'default' ],
     *      },
     * ]
     *
     * Format Object Place :
     * -------------------------------------
     * object {
     *      'selector' => [],
     *      'type' => [],
     * }
     */
	NKTI_Bootstrap_modal_custom_footer_button: function($config, $place) {
		
		/** Define variable will be used in this function : */
		var $result_func = 0;
		
		/** Check IF parameter $config is "object" : */
		if (typeof $config == "object" && $config != null) {
			
			/** Define variable for data item button : */
			var $id_button, $class_button, $attr_button, $style_button, $title_button, $type_button;
			var $button_modal = '';
			
			/** Prepare while loop to create button : */
			var $data_loop = Object.keys($config),
				$i = 0,
				$until_loop = $data_loop.length;
				
			/** While loop to create button : */
			while ($i < $until_loop) {
				
				/** For Check property "id" in object $config[$i] : */
				if ($config[$i]['id'] != undefined) {
					if ($config[$i]['id'] != '' || $config[$i]['id'] != "") {
						$id_button = 'id="'+$config[$i]['id']+'" ';
					} else {
						$id_button = '';
					}
				} else {
					$id_button = '';
				}
				
				/** For Check property "class" in object $config[$i] : */
				if ($config[$i]['class'] != undefined) {
					if ($config[$i]['class'] != '' || $config[$i]['class'] != "") {
						$class_button = 'class="btn '+$config[$i]['class']+'" ';
					} else {
						$class_button = 'class="btn btn-default" ';
					}
				} else {
					$class_button = 'class="btn btn-default" ';
				}
				
				/** For Check property "attr" in object $config[$i] : */
				if ($config[$i]['attr'] != undefined) {
					if ($config[$i]['attr'] != '' || $config[$i]['attr'] != "") {
						$attr_button = $config[$i]['attr']+' ';
					} else {
						$attr_button = '';
					}
				} else {
					$attr_button = '';
				}
				
				/** For Check property "style" in object $config[$i] : */
				if ($config[$i]['style'] != undefined) {
					if ($config[$i]['style'] != '' || $config[$i]['style'] != "") {
						$style_button = 'style="'+$config[$i]['style']+'" ';
					} else {
						$style_button = '';
					}
				} else {
					$style_button = '';
				}
				
				/** Switch for property "type" in object $config[$i] : */
				switch ($config[$i]['type']) {
					
					/** Case for $config[$i]['type'] == '' OR 'default' : */
					case '' :
					case 'default' :
						
						/** For Check property "title" in object $config[$i] : */
						if ($config[$i]['title'] != undefined) {
							if ($config[$i]['title'] != '' || $config[$i]['title'] != "") {
								$title_button = $config[$i]['title'];
							} else {
								$title_button = 'Close';
							}
						} else {
							$title_button = 'Close';
						}
						
						/** Create BUtton Footer Modal : */
						$button_modal += '<button type="button" '+$id_button+$class_button+$attr_button+$style_button+'>'+$title_button+'</button>';
						break;
						
					/** Case for $config[$i]['type'] == 'close' : */
					case 'close' :
					default :
						
						/** For Check property "title" in object $config[$i] : */
						if ($config[$i]['title'] != undefined) {
							if ($config[$i]['title'] != '' || $config[$i]['title'] != "") {
								$title_button = $config[$i]['title'];
							} else {
								$title_button = 'Close';
							}
						} else {
							$title_button = 'Close';
						}
						
						/** Create BUtton Footer Modal : */
						$button_modal += '<button type="button" '+$id_button+$class_button+$attr_button+$style_button+' data-dismiss="modal">'+$title_button+'</button>';
						break;
				}
				/** End of Switch for property "type" in object $config[$i]. */
				
				/** Auto Increment : */
				$i++;
			}
			/** End of While loop to create button. */
			
			/** Check IF parameter $place is object : */
			if (typeof $place == "object") {
				
				/** Switch for $place['type'] : */
				switch ($place['type']) {
					
					/** Case for $place['type'] == 'replace' : */
					case 'replace' :
					default :
						
						/** Place result : */
						$($place['selector']).html($button_modal);
						$result_func = 1;
						break;
						
					/** Case for $place['type'] == 'append' : */
					case 'append' :
						
						/** Place result : */
						$($place['selector']).append($button_modal);
						$result_func = 1;
						break;
				}
				/** End of Switch for $place['type']. */
			}
			/** End of Check IF parameter $place is object. */
			
			/** Check IF parameter $place is not object : */
			else {
				$result_func = $button_modal;
			}
			/** End of Check IF parameter $place is not object. */
		}
		/** End of Check IF parameter $config is "object". */
		
		/** Check IF parameter $config is not "object" : */
		else {
			console.log('Footer Button : Parameter $config is not object.');
			$result_func= 0;
		}
		/** End of Check IF parameter $config is not "object". */
		
		/** Return Result : */
		return $result_func;		
	},
    /** End of For Create Footer Button Modal.
     * ===================================================================================================== */
	
    /** For Create Footer Modal :
     * -----------------------------------------------------------------------------------------------------
     * Function yang brefungsi untuk Membuat Footer Modal.
     *
     * @param   $config     {object}            Berisi Config modal footer.
     */
	NKTI_Bootstrap_modal_custom_content_footer: function($config) {
		
		/** Define variable will be used in this function : */
		var $result_func = 0, $wrap_footer, $dataInner_footer, $modal_footer = '';
		
		/** Check IF parameter $config is "object" : */
		if (typeof $config == "object") {
			
			/** Check IF property "wrap" in object $config is exists : */
            if ($config['wrap'] != undefined) {
				
				/** Define variable for data wrap : */
				var $id_footer, $class_footer, $attr_footer, $style_footer;
				
				/** For Check property "id" in object $config['wrap'] : */
				if ($config['wrap']['id'] != undefined) {
					if ($config['wrap']['id'] != '' || $config['wrap']['id'] != "") {
						$id_footer = 'id="'+$config['wrap']['id']+'" ';
					} else {
						$id_footer = '';
					}
				} else {
					$id_footer = '';
				}
				
				/** For Check property "class" in object $conifg['wrap'] : */
				if ($config['wrap']['class'] != undefined) {
					if ($config['wrap']['class'] != '' || $config['wrap']['class'] != "") {
						$class_footer = 'class="modal-footer '+$config['wrap']['class']+'" ';
					} else {
						$class_footer = 'class="modal-footer" ';
					}
				} else {
					$class_footer = 'class="modal-footer" ';
				}
				
				/** For Check Property "attr" in object $config['wrap'] : */
				if ($config['wrap']['attr'] != undefined) {
					if ($config['wrap']['attr'] != '' || $config['wrap']['attr'] != "") {
						$attr_footer = $config['wrap']['attr']+' ';
					} else {
						$attr_footer = '';
					}
				} else {
					$attr_footer = '';
				}
				
				/** For Check Property "style" in object $config['wrap'] : */
				if ($config['wrap']['style'] != undefined) {
					if ($config['wrap']['style'] != '' || $config['wrap']['style'] != "") {
						$style_footer = 'style="'+config['wrap']['style']+'" ';
					} else {
						$style_footer = '';
					}
				} else {
					$style_footer = '';
				}
				
				/** Create Begin Modal Footer : */
				$modal_footer += '<div '+$id_footer+$class_footer+$attr_footer+$style_footer+'>';
			}
			/** End of Check IF property "wrap" in object $config is exists. */
			
			/** Check IF property "wrap" in object $config is not exists : */
			else {
				
				/** Create Begin Modal Footer : */
				$modal_footer += '<div class="modal-footer">';
			}
			/** End of Check IF property "wrap" in object $config is not exists. */
			
			/** Check IF property "inner" in object $config is exists : */
			if ($config['inner'] != undefined) {
				
				/** Define variable for object "inner" : */
				var $type_inner = $config['inner']['type'];
				
				/** Check IF property "type" in object $config['inner'] is exists : */
				if ($config['inner']['type'] != undefined) {
					
					/** Check IF property "data" in object $config['inner'] is exists : */
					if ($config['inner']['data'] != undefined) {
						
						/** Define variable for Inner Footer : */
						$dataInner_footer = $config['inner']['data'];
						
						/** Check IF property "data" in object $config['inner'] is object : */
						if (typeof $dataInner_footer == "object") {

						    /** Define variable will be used in this condition : */
						    var $footer_button;
							
							/** Switch for check data property "type" in object $config['inner']['type'] : */
							switch ($config['inner']['type']) {
								
								/** Case for $dataInner_footer == '' OR == 0 : */
								case '' :
								case "" :
								case 0 :
								default :
									
									/** Create Footer Button : */
									$footer_button = $.NKTI_Bootstrap_modal_custom_footer_button($config['inner']['data'], '');
									
									/** Create Footer Modal : */
									$modal_footer += $footer_button;
									break;
									
								/** Case for $dataInner_footer == 1 : */
								case 1 :
									
									/** Check IF property "config" in object $dataInner_footer is exists : */
									if ($dataInner_footer['config'] != undefined) {

                                        /** Check IF $dataInner_footer['config'] is object : */
                                        if (typeof $dataInner_footer['config'] == "object") {

                                            /** Define variable will be used in this function : */
                                            var $data_button, $data_html, $wrap_html, $wrap_button;
                                            var $config_InnerFooter = $dataInner_footer['config'];
                                            var $data_position = {
                                                'html' : 0,
                                                'button' : 0
                                            };

                                            /** Check IF property "html-wrap" in object $config_InnerFooter is exists : */
                                            if ($config_InnerFooter['html-wrap'] != undefined) {

                                                /** Place property "html-wrap" : */
                                                $wrap_html = $config_InnerFooter['html-wrap'];

                                                /** For Check property "html-wrap" is object : */
                                                if (typeof $wrap_html == "object" && $wrap_html != null) {

                                                    /** Define variable will be used in this condition : */
                                                    var $sizeof_wrap_html, $id_wrap_html, $class_wrap_html, $attr_wrap_html, $style_wrap_html;

                                                    /** For Check property "size" in object $wrap_html */
                                                    if ($wrap_html['size'] != undefined) {
                                                        if (typeof $wrap_html['size'] == "number") {
                                                            $sizeof_wrap_html = 'col-md-' + $wrap_html['size'];
                                                        } else {
                                                            $sizeof_wrap_html = 'col-md-6';
                                                        }
                                                    } else {
                                                        $sizeof_wrap_html = 'col-md-6';
                                                    }

                                                    /** For Check property "id" in object $config_InnerFooter['html-wrap'] : */
                                                    if ($wrap_html['id'] != undefined) {
                                                        if ($wrap_html['id'] != '' || $wrap_html['id'] != "") {
                                                            $id_wrap_html = 'id="'+$wrap_html['id']+'" ';
                                                        } else {
                                                            $id_wrap_html = '';
                                                        }
                                                    } else {
                                                        $id_wrap_html = '';
                                                    }

                                                    /** For Check property "class" in object $config_InnerFooter['html-wrap'] : */
                                                    if ($wrap_html['class'] != undefined) {
                                                        if ($wrap_html['class'] != '' || $wrap_html['class'] != "") {
                                                            $class_wrap_html = 'class="'+$wrap_html['class']+'" ';
                                                        } else {
                                                            $class_wrap_html = 'class="'+$sizeof_wrap_html+'" ';
                                                        }
                                                    } else {
                                                        $class_wrap_html = 'class="'+$sizeof_wrap_html+'" ';
                                                    }

                                                    /** For Check property "attr" in object $config_InnerFooter['html-wrap'] : */
                                                    if ($wrap_html['attr'] != undefined) {
                                                        if ($wrap_html['attr'] != '' || $wrap_html['attr'] != "") {
                                                            $attr_wrap_html = $wrap_html['attr']+' ';
                                                        } else {
                                                            $attr_wrap_html = '';
                                                        }
                                                    } else {
                                                        $attr_wrap_html = '';
                                                    }

                                                    /** For Check property "style" in object $config_InnerFooter['html-wrap'] : */
                                                    if ($wrap_html['style'] != undefined) {
                                                        if ($wrap_html['style'] != '' || $wrap_html['style'] != "") {
                                                            $style_wrap_html = 'style="'+$wrap_html['style']+'" ';
                                                        } else {
                                                            $style_wrap_html = '';
                                                        }
                                                    } else {
                                                        $style_wrap_html = '';
                                                    }

                                                    /** For Check IF property "html" in object $dataInner_footer is exists : */
                                                    if ($dataInner_footer['html'] != undefined) {
                                                        if ($dataInner_footer['html'] != '' || $dataInner_footer != "") {
                                                            $data_html = '<div '+$id_wrap_html+$class_wrap_html+$attr_wrap_html+$style_wrap_html+'>';
                                                            $data_html = $dataInner_footer['html'];
                                                            $data_html = '</div>';
                                                        } else {
                                                            $data_html = '<div '+$id_wrap_html+$class_wrap_html+$attr_wrap_html+$style_wrap_html+'>';
                                                            $data_html = '';
                                                            $data_html = '</div>';
                                                        }
                                                    } else {
                                                        console.log('Property $config[\'inner\'][\'data\'][\'html\'] is undefined');
                                                        $data_html = '<div '+$id_wrap_html+$class_wrap_html+$attr_wrap_html+$style_wrap_html+'>';
                                                        $data_html = '';
                                                        $data_html = '</div>';
                                                    }

                                                } /** End of For Check property "html-wrap" is object : */

                                                /** For Check property "html-wrap" is not object : */
                                                else {
                                                    $data_html = '';
                                                } /** End of For Check property "html-wrap" is not object : */
                                            }
                                            /** End of Check IF property "html-wrap" in object $config_InnerFooter is exists. */

                                            /** Check IF property "html-wrap" in object $config_InnerFooter is not exists : */
                                            else {
                                                console.log('Object $config[\'inner\'][\'data\'][\'config\'][\'html-wrap\'] is not object');
                                                $data_html = '';
                                            }
                                            /** End of Check IF property "html-wrap" in object $config_InnerFooter is not exists. */

                                            /** -------------------------------------------------------------------------------------- */
                                            /** -------------------------------------------------------------------------------------- */
                                            /** -------------------------------------------------------------------------------------- */

                                            /** Check IF property "button-wrap" in object $config_InnerFooter is exists : */
                                            if ($config_InnerFooter['button-wrap'] != undefined) {

                                                /** Place property "button-wrap" : */
                                                $wrap_button = $config_InnerFooter['button-wrap'];

                                                /** Check IF $wrap_button is object : */
                                                if (typeof $wrap_button == "object" && $wrap_button != null) {

                                                    /** Define variable will be used in this condition : */
                                                    var $sizeof_wrap_button, $id_wrap_button, $class_wrap_button, $attr_wrap_button, $style_wrap_button;

                                                    /** For Check property "size" in object $wrap_button */
                                                    if ($wrap_button['size'] != undefined) {
                                                        if (typeof $wrap_button['size'] == "number") {
                                                            $sizeof_wrap_button = 'col-md-' + $wrap_button['size'];
                                                        } else {
                                                            $sizeof_wrap_button = 'col-md-6';
                                                        }
                                                    } else {
                                                        $sizeof_wrap_button = 'col-md-6';
                                                    }

                                                    /** For Check property "id" in object $wrap_button */
                                                    if ($wrap_button['id'] != undefined) {
                                                        if ($wrap_button['id'] != '' || $wrap_button['id'] != "") {
                                                            $id_wrap_button = 'id="'+$wrap_button['id']+'" ';
                                                        } else {
                                                            $id_wrap_button = '';
                                                        }
                                                    } else {
                                                        $id_wrap_button = '';
                                                    }

                                                    /** For Check property "class" in object $wrap_button */
                                                    if ($wrap_button['class'] != undefined) {
                                                        if ($wrap_button['class'] != '' || $wrap_button['class'] != "") {
                                                            $class_wrap_button = 'class="'+$wrap_button['class']+'" ';
                                                        } else {
                                                            $class_wrap_button = 'class="'+$sizeof_wrap_button+'" ';
                                                        }
                                                    } else {
                                                        $class_wrap_button = 'class="'+$sizeof_wrap_button+'" ';
                                                    }

                                                    /** For Check property "attr" in object $wrap_button */
                                                    if ($wrap_button['attr'] != undefined) {
                                                        if ($wrap_button['attr'] != '' || $wrap_button['attr'] != "") {
                                                            $attr_wrap_button = $wrap_button['attr']+' ';
                                                        } else {
                                                            $attr_wrap_button = '';
                                                        }
                                                    } else {
                                                        $attr_wrap_button = '';
                                                    }

                                                    /** For Check property "style" in object $wrap_button */
                                                    if ($wrap_button['style'] != undefined) {
                                                        if ($wrap_button['style'] != '' || $wrap_button['style'] != "") {
                                                            $style_wrap_button = 'style="'+$wrap_button['style']+'" ';
                                                        } else {
                                                            $style_wrap_button = '';
                                                        }
                                                    } else {
                                                        $style_wrap_button = '';
                                                    }

                                                    /** For Check property "button" in object $dataInner_footer : */
                                                    if ($dataInner_footer['button'] != undefined) {
                                                        $data_button = '<div '+$id_wrap_button+$class_wrap_button+$attr_wrap_button+$style_wrap_button+'>';
                                                        $data_button += $.NKTI_Bootstrap_modal_custom_footer_button($dataInner_footer['button'], '');
                                                        $data_button += '</div>';
                                                    } else {
                                                        console.log('Property $config[\'inner\'][\'data\'][\'button\'] is undefined');
                                                        $data_button = '<div '+$id_wrap_button+$class_wrap_button+$attr_wrap_button+$style_wrap_button+'>';
                                                        $data_button += '';
                                                        $data_button += '</div>';
                                                    }
                                                }
                                                /** End of Check IF $wrap_button is object. */

                                                /** Check IF $wrap_button is not object : */
                                                else {
                                                    console.log('Object $config[\'inner\'][\'data\'][\'config\'][\'button-wrap\'] is not object');
                                                    $data_button = '';
                                                }
                                                /** End of Check IF $wrap_button is not object. */
                                            }
                                            /** End of Check IF property "button-wrap" in object $config_InnerFooter is exists. */

                                            /** Check IF property "button-wrap" in object $config_InnerFooter is not exists : */
                                            else {
                                                console.log('IF: Object $config[\'inner\'][\'data\'][\'config\'][\'button-wrap\'] is not object');
                                                $data_button = '';
                                            }
                                            /** End of Check IF property "button-wrap" in object $config_InnerFooter is not exists. */

                                            /** For Check property "html-position" in object $config_InnerFooter : */
                                            if ($config_InnerFooter['html-position'] != undefined) {
                                                if ($config_InnerFooter['html-position'] != '' || $config['html-position'] != "") {
                                                    if ($config_InnerFooter['html-position'] == "left") {
                                                        $data_position['html'] = 0;
                                                    } else if ($config_InnerFooter['html-position'] == "right") {
                                                        $data_position['html'] = 1;
                                                    } else {
                                                        $data_position['html'] = 0;
                                                    }
                                                } else {
                                                    $data_position['html'] = 0;
                                                }
                                            } else {
                                                $data_position['html'] = 0;
                                            }

                                            /** For Check Property "button-position" in object $config_InnerFooter : */
                                            if ($config_InnerFooter['button-position'] != undefined) {
                                                if ($config_InnerFooter['button-position'] != '' || $config_InnerFooter['button-position'] != "") {
                                                    if ($config_InnerFooter['button-position'] == "left") {
                                                        $data_position['button'] = 0;
                                                    } else if ($config_InnerFooter['button-position'] == "right") {
                                                        $data_position['button'] = 1;
                                                    } else {
                                                        $data_position['button'] = 0;
                                                    }
                                                } else {
                                                    $data_position['button'] = 0;
                                                }
                                            } else {
                                                $data_position['button'] = 0;
                                            }

                                            /** For $data_position['html'] AND $data_position['button'] = 0 */
                                            if ($data_position['html'] == 0 && $data_position['button'] == 0) {
                                                $modal_footer += '<div class="row">';
                                                $modal_footer += $data_html;
                                                $modal_footer += $data_button;
                                                $modal_footer += '</div>';
                                            }

                                            /** For $data_position['html'] AND $data_position['button'] = 1 : */
                                            if ($data_position['html'] == 1 && $data_position['button'] == 1) {
                                                $modal_footer += '<div class="row">';
                                                $modal_footer += $data_html;
                                                $modal_footer += $data_button;
                                                $modal_footer += '</div>';
                                            }

                                            /** For $data_position['html'] == 1 AND $data_position['button'] == 0 : */
                                            if ($data_position['html'] == 1 && $data_position['button'] == 0) {
                                                $modal_footer += '<div class="row">';
                                                $modal_footer += $data_button;
                                                $modal_footer += $data_html;
                                                $modal_footer += '</div>';
                                            }

                                            /** For $data_position['button'] == 1 AND $data_position['html'] == 0 : */
                                            if ($data_position['button'] == 1 && $data_position['html'] == 0) {
                                                $modal_footer += '<div class="row">';
                                                $modal_footer += $data_html;
                                                $modal_footer += $data_button;
                                                $modal_footer += '</div>';
                                            }
                                        }
                                        /** End of Check IF $dataInner_footer['config'] is object. */

                                        /** Check IF $dataInner_footer['config'] is not object : */
                                        else {

                                            /** Debug : */
                                            console.log('Object $config[\'inner\'][\'data\'][\'config\'] is not object');

                                            /** Check IF property "html" in object $dataInner_footer is exists : */
                                            if ($dataInner_footer['html'] != undefined) {

                                                /** Create Footer Button : */
                                                $footer_button = $.NKTI_Bootstrap_modal_custom_footer_button($dataInner_footer, '');

                                                /** Create Footer Modal : */
                                                $modal_footer += '<div class="row">';
                                                $modal_footer += '<div id="html-footer_modal" class="col-md-6">';
                                                $modal_footer += $dataInner_footer['html'];
                                                $modal_footer += '</div>';
                                                $modal_footer += '<div id="button-footer_modal" class="col-md-6">';
                                                $modal_footer += $footer_button;
                                                $modal_footer += '</div>';
                                                $modal_footer += '</div>';
                                            }
                                            /** End of Check IF property "html" in object $dataInner_footer is exists. */

                                            /** Check IF property "html" in object $dataInner_footer is not exists : */
                                            else {

                                                /** Debug : */
                                                console.log('ELSE : Object $config[\'inner\'][\'data\'][\'html\'] is not exists');

                                                /** Create button modal : */
                                                $modal_footer += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
                                            }
                                            /** End of Check IF property "html" in object $dataInner_footer is not exists. */
                                        }
                                        /** End of Check IF $dataInner_footer['config'] is not object. */
									}
									/** End of Check IF property "config" in object $dataInner_footer is exists. */
									
									/** Check IF property "config" in object $dataInner_footer is not exists : */
									else {

									    /** Debug : */
                                        console.log('Property $config[\'inner\'][\'data\'][\'config\'] is not exists');
										
										/** Check IF property "button" in object $dataInner_footer is exists : */
										if ($dataInner_footer['button'] != undefined) {

										    /** Check IF property "html" in object $dataInner_footer is exists : */
										    if ($dataInner_footer['html'] != undefined) {

                                                /** Create Footer Button : */
                                                $footer_button = $.NKTI_Bootstrap_modal_custom_footer_button($dataInner_footer, '');

                                                /** Create Footer Modal : */
                                                $modal_footer += '<div class="row">';
                                                $modal_footer += '<div id="html-footer_modal" class="col-md-6">';
                                                $modal_footer += $dataInner_footer['html'];
                                                $modal_footer += '</div>';
                                                $modal_footer += '<div id="button-footer_modal" class="col-md-6">';
                                                $modal_footer += $footer_button;
                                                $modal_footer += '</div>';
                                                $modal_footer += '</div>';
                                            }
										    /** End of Check IF property "html" in object $dataInner_footer is exists. */

										    /** Check IF property "html" in object $dataInner_footer is not exists : */
										    else {

                                                /** Debug : */
                                                console.log('Property $config[\'inner\'][\'data\'][\'html\'] is not exists');

										        /** Create button modal : */
                                                $modal_footer += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
                                            }
										    /** End of Check IF property "html" in object $dataInner_footer is not exists. */
										}
										/** End of Check IF property "button" in object $dataInner_footer is exists. */
										
										/** Check IF property "button" in object $dataInner_footer is not exists : */
										else {

                                            /** Debug : */
                                            console.log('Property $config[\'inner\'][\'data\'][\'button\'] is not exists');
											
											/** For property "html" in object $dataInner_footer is exists : */
											if ($dataInner_footer['html'] != undefined) {
												$modal_footer += $dataInner_footer['html'];
											} else {
                                                console.log('Property $config[\'inner\'][\'data\'][\'html\'] is not exists');
												$modal_footer += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
											}
										}
										/** End of Check IF property "button" in object $dataInner_footer is not exists. */
									}
									/** End of Check IF property "config" in object $dataInner_footer is not exists. */
									break;
									
								/** Case for $dataInner_footer == 2 : */
								case 2 :
								    $modal_footer += $dataInner_footer['html'];
									break;
									
								/** Case for $dataInner_footer == 3 : */
								case 3 :
                                    $modal_footer += '';
									break;
							}
							/** End of Switch for check data property "type" in object $config['inner']['type']. */
						}
						/** End of Check IF property "data" in object $config['inner'] is object. */
						
						/** Check IF property "data" in object $config['inner'] is not object : */
						else {
							
							/** Create Footer Modal : */
							$modal_footer += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
						}
						/** End of Check IF property "data" in object $config['inner'] is not object. */
					}
					/** End of Check IF property "data" in object $config['inner'] is exists. */
					
					/** Check IF property "data" in object $config['inner'] is not exists : */
					else {
						
						/** Create Footer Modal : */
						$modal_footer += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
						
					}
					/** End of Check IF property "data" in object $config['inner'] is not exists. */
				}
				/** End of Check IF property "type" in object $config['inner'] is exists. */
				
				/** Check IF property "type" in object $config['inner'] is not exists : */
				else {
					
					/** Create Footer Modal : */
					$modal_footer += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
				}
				/** End of Check IF property "type" in object $config['inner'] is not exists. */
			}
			/** End of Check IF property "inner" in object $config is exists. */
			
			/** Check IF property "inner" in object $config is not exists : */
			else {
				
				/** Create Footer Modal : */
				$modal_footer += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
			}
			/** End of Check IF property "inner" in object $config is not exists. */
			
			/** Create Ending Modal Footer : */
			$modal_footer += '</div>';

            /** Place result : */
            $result_func = $modal_footer;
		}
		/** End of Check IF parameter $config is not "object". */
		
		/** Check IF parameter $config is not "object" : */
		else {
			console.error('Parameter $config is not object.');
			$result_func = 0;
		}
		/** End of Check IF parameter $config is not "object". */
		
		/** Return Result : */
		return $result_func;
	},
    /** End of For Create Footer Modal.
     * ===================================================================================================== */
	
    /** For Create modal with custom :
     * -----------------------------------------------------------------------------------------------------
     * Function yang berfungsi untuk Membuat Modal dengan Model Custom.
     *
     * Format Object Place :
     * -------------------------------------
     * object {
     *      'selector' => [],
     *      'type' => [],
     * }
     *
     * @param   $config         {object}            Berisi Object config Bootstrap modal.
     * @param   $data           {string}            Berisi data object.
     * @param   $place          {object|string}     Berisi string place.
     */
    NKTI_Bootstrap_modal_custom: function ($config, $data, $place) {

        /** Define variable will be used in this function : */
        var $config_wrap, $config_content, $config_header, $config_body, $config_footer;
        var $data_wrap, $data_content, $data_header, $data_body, $data_footer, $content_modal = '';
        var $data_modal = '', $result_func;

        /** Check IF parameter $config is object : */
        if (typeof $config == "object" && $config != null) {

            /** Check IF property "footer" in object $config is exist : */
            if ($config['footer'] != undefined) {

                /** Check IF property "footer" in object $config is exist : */
                if (typeof $config['footer'] == "object") {
                    // console.log('Footer Modal is object');

                    /** Create Data Footer : */
                    $data_footer = $.NKTI_Bootstrap_modal_custom_content_footer($config['footer'], '');
                }
                /** End of Check IF property "footer" in object $config is exist. */

                /** Check IF property "footer" in object $config is not exist : */
                else {

                    /** Create Config "Footer" : */
                    $config_footer = {
                        'inner' : {
                            'type' : 0,
                            'data' : [
                                {
                                    'type' : 'close'
                                }
                            ]
                        }
                    };

                    /** Create Data Footer : */
                    $data_footer = $.NKTI_Bootstrap_modal_custom_content_footer($config_footer, '');

                } /** End of Check IF property "footer" in object $config is not exist. */

            } /** End of Check IF property "footer" in object $config is exist. */

            /** Check IF property "footer" in object $config is not exist : */
            else {

                /** Create Config "Footer" : */
                $config_footer = {
                    'inner' : {
                        'type' : 0,
                        'data' : [
                            {
                                'type' : 'close'
                            }
                        ]
                    }
                };

                /** Create Data Footer : */
                $data_footer = $.NKTI_Bootstrap_modal_custom_content_footer($config_footer, '');
            }
            /** End of Check IF property "footer" in object $config is not exist. */

            /** -------------------------------------------------------------------------------------- */
            /** -------------------------------------------------------------------------------------- */

            /** Check IF property "body" in object $config is exist : */
            if ($config['body'] != undefined) {

                /** Check IF property "body" in object $config is exists : */
                if (typeof $config['body'] == "object") {

                    /** Create data body Modal : */
                    $data_body = $.NKTI_Bootstrap_modal_custom_content_body($config['body'], $data);
                }
                /** End of Check IF property "body" in object $config is exists. */

                /** Check IF property "body" in object $config is not exists : */
                else {

                    /** Config Body Modal : */
                    $config_body = {
                        'id' : '',
                        'class' : '',
                        'attr' : '',
                        'style' : ''
                    };

                    /** Create data body Modal : */
                    $data_body = $.NKTI_Bootstrap_modal_custom_content_body($config_body, $data);
                } /** End of Check IF property "body" in object $config is not exists. */
            } /** End of Check IF property "body" in object $config is exist. */

            /** Check IF property "body" in object $config is not exist : */
            else {

                /** Config Body Modal : */
                $config_body = {
                    'id' : '',
                    'class' : '',
                    'attr' : '',
                    'style' : ''
                };

                /** Create data body Modal : */
                $data_body = $.NKTI_Bootstrap_modal_custom_content_body($config_body, $data);
            }
            /** End of Check IF property "body" in object $config is not exist. */

            /** -------------------------------------------------------------------------------------- */
            /** -------------------------------------------------------------------------------------- */

            /** Check IF Property "header" in object $config is exist : */
            if ($config['header'] != undefined) {

                /** Check IF property "header" is object : */
                if (typeof $config['header'] == "object" && $config['header'] != null) {

                    /** Create data header : */
                    $data_header = $.NKTI_Bootstrap_modal_custom_content_header($config['header']);
                }
                /** End of Check IF property "header" is object. */

                /** Check IF property "header" is not object : */
                else {

                    /** Create data header : */
                    $data_header = $.NKTI_Bootstrap_modal_custom_content_header('');
                } /** End of Check IF property "header" is not object. */

            } /** End of Check IF Property "header" in object $config is exist. */

            /** Check IF Property "header" in object $config is not exist : */
            else {

                /** Create data header : */
                $data_header = $.NKTI_Bootstrap_modal_custom_content_header('');
            }
            /** End of Check IF Property "header" in object $config is not exist. */

            /** -------------------------------------------------------------------------------------- */
            /** -------------------------------------------------------------------------------------- */

            /** Create data content modal : */
            $content_modal += $data_header;
            $content_modal += $data_body;
            $content_modal += $data_footer;

            /** Check IF property "content" in object $config is exist : */
            if ($config['content'] != undefined) {

                /** Check IF property "content" in object $config is object : */
                if (typeof $config['content'] == "object" && $config['content'] != null) {

                    /** Debug : */
                    // console.log('Content : Object');

                    /** Create Content : */
                    $data_content = $.NKTI_Bootstrap_modal_custom_content($config['content'], $content_modal);
                }
                /** End of Check IF property "content" in object $config is object. */

                /** Check IF property "content" in object $config is not object : */
                else {

                    /** Debug : */
                    console.log('Content : Not object');

                    /** Create Content : */
                    $data_content = $.NKTI_Bootstrap_modal_custom_content('', $content_modal);
                }
                /** End of Check IF property "content" in object $config is not object. */
            }
            /** End of Check IF property "content" in object $config is exist. */

            /** Check IF property "content" in object $config is not exist : */
            else {

                /** Debug : */
                console.log('Content : Not Exists');

                /** Create Content : */
                $data_content = $.NKTI_Bootstrap_modal_custom_content('', $content_modal);
            }
            /** End of Check IF property "content" in object $config is not exist. */

            /** -------------------------------------------------------------------------------------- */
            /** -------------------------------------------------------------------------------------- */

            // console.log($data_content);

            /** Check IF property "wrap" in object $config is exist : */
            if ($config['wrap'] != undefined) {

                /** Check IF property "wrap" in object $config is object : */
                if (typeof $config['wrap'] == "object" && $config['wrap'] != null) {

                    /** Create Data Wrapper : */
                    $data_wrap = $.NKTI_Bootstrap_modal_custom_wrapper($config['wrap'], $data_content);
                }
                /** End of Check IF property "wrap" in object $config is object. */

                /** Check IF property "wrap" in object $config is not object : */
                else {

                    /** Create Data Wrapper : */
                    $data_wrap = $.NKTI_Bootstrap_modal_custom_wrapper('', $data_content);
                }
                /** End of Check IF property "wrap" in object $config is not object. */
            }
            /** End of Check IF property "wrap" in object $config is exist. */

            /** Check IF property "wrap" in object $config is not exist : */
            else {

                /** Create Data Wrapper : */
                $data_wrap = $.NKTI_Bootstrap_modal_custom_wrapper('', $data_content);
            }
            /** End of Check IF property "wrap" in object $config is not exist. */

            /** Check parameter $place : */
            if (typeof $place == "object" && $place != null) {
                switch ($place['type']) {
                    case 'replace' :
                    default :
                        $($place['selector']).html($data_wrap);
                        break;
                    case 'append' :
                        $($place['selector']).append($data_wrap + 'admin');
                        break;
                }
                $result_func = 1;
            } else {
                $result_func = $data_wrap;
            }
        }
        /** End of Check IF parameter $config is object. */

        /** Check IF parameter $config is object : */
        else {
            /** Debug */
            console.error('Parameter $config is not object');
            /** Place result : */
            $result_func = 0;
        }
        /** End of Check IF parameter $config is object. */

        /** Return result : */
        return $result_func;
    },
    /** End of For Create modal with custom.
     * ===================================================================================================== */

    /** Create Bootstrap Tabs Content :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Content.
     *
     * Format Object $menu :
     * -----------------------------------------------
     * object [
     *      {
     *          'active' : [ Berisi Status Active Content ],
     *          'id' : [ Berisi ID Content ],
     *          'class' : [ Berisi Class Content ],
     *          'style' : [ Berisi Style Content ],
     *          'attr' : [ Berisi Attr Content ],
     *          'data' : [ Berisi Data Content ],
     *      },
     * ]
     */
    NKTI_Bootstrap_tabs_content: function ($config) {

        /** Define variable will be used in this function : */
        var $result_func, $data_menu = '',
            $active_c, $id_c, $class_c, $style_c, $attr_c, $data_c;

        /** Check IF $config is object : */
        if (typeof $config == "object") {

            /** While for create content : */
            var $i = 0;
            var $until_loop = Object.keys($config);
            while ($i < $until_loop) {

                /** For data Config : */
                if ($config[$i]['active'] != undefiend || $config[$i]['active'] != null || $config[$i]['active'] != '' || $config[$i]['active'] != "") {
                    $active_c = $config[$i]['active'];
                } else {
                    $active_c = 0;
                }
                if ($config[$i]['id'] != undefined || $config[$i]['id'] != null || $config[$i]['id'] != '' || $config[$i]['id'] != "") {
                    $id_c = 'id="'+$config[$i]['id']+'" ';
                } else {
                    $id_c = '';
                }
                if ($config[$i]['class'] != undefined || $config[$i]['class'] != null || $config[$i]['class'] != '' || $config[$i]['class'] != "") {
                    if ($active_c == 1) {
                        $class_c = 'class="tab-pane fade in active '+$config[$i]['class']+'" ';
                    } else {
                        $class_c = 'class="tab-pane fade" ';
                    }
                } else {
                    if ($active_c == 1) {
                        $class_c = 'class="tab-pane fade '+$config[$i]['class']+'" ';
                    } else {
                        $class_c = 'class="tab-pane fade" ';
                    }
                }
                if ($config[$i]['style'] != undefined || $config[$i]['style'] != null || $config[$i]['style'] != '' || $config[$i]['style'] != "") {
                    $style_c = 'style="'+$config[$i]['style']+'" ';
                } else {
                    $style_c = '';
                }
                if ($config[$i]['attr'] != undefined || $config[$i]['attr'] != null || $config[$i]['attr'] != '' || $config[$i]['attr'] != "") {
                    $attr_c = $config[$i]['attr'];
                } else {
                    $attr_c = '';
                }
                if ($config[$i]['data'] != undefined || $config[$i]['data'] != null || $config[$i]['data'] != '' || $config[$i]['data'] != "") {
                    $data_c = $config[$i]['data'];
                } else {
                    $data_c = '';
                }

                /** Create data menu : */
                $data_menu += '<div '+$id_c+$class_c+$style_c+$attr_c+'>'+$data_c+'</div>';

                /** Auto Increment : */
                $i++;
            }

            /** Place result : */
            $result_func = $data_menu;
        }
        /** Check IF $config is not object : */
        else {
            /** Debug */
            console.error('Parameter $config is not object');
            /** Place result : */
            $result_func = 0;
        }

        /** Return result : */
        return $result_func;
    },
    /** End of Create Bootstrap Tabs Content.
     * ===================================================================================================== */

    /** Create Bootstrap Tabs Submenu :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat submenu menu tabs.
     *
     * Format Object $submenu :
     * -----------------------------------------------
     * object [
     *          {
     *              'active' : [ Berisi Status Active Tabs ],
     *              'id' : [ Berisi ID Menu ],
     *              'class' : [ Berisi Class Menu ],
     *              'style' : [ Berisi Style Menu ],
     *              'attr' : [ Berisi Attr Menu ],
     *              'title' : [ Berisi Title of Menu ],
     *              'anchor' : {
     *                  'id' : [ Berisi ID Anchor Tag ],
     *                  'class' : [ Berisi Class Anchor Tag ],
     *                  'style' : [ Berisi Style Anchor Tag ],
     *                  'attr' : [ Berisi Attr Anchor Tag ],
     *                  'href' : [ Berisi Href Anchor Tag ],
     *              },
     *          },
     * ]
     */
    NKTI_Bootstrap_tabs_submenu: function ($submenu) {

        /** Define variable will be used in this function : */
        var $result_func, $sbmenu = '',
            $active_sbm, $id_sbm, $class_sbm, $style_sbm, $attr_sbm, $title_sbm, $anchor_tag, $anchor_menu,
            $id_a, $class_a, $style_a, $attr_a;

        /** Check IF $submenu is an object : */
        if (typeof $submenu == "object") {

            /** While loop to create submenu : */
            var $i = 0;
            var $until_loop = Object.keys($submenu);
            while ($i < $until_loop) {

                /** For Wrap Submenu : */
                if ($submenu['active'] != undefined || $submenu['active'] != null || $submenu['active'] != '' || $submenu['active'] != "") {
                    $active_sbm = $submenu['active'];
                } else {
                    $active_sbm = 0;
                }
                if ($submenu['id'] != undefined || $submenu['id'] != null || $submenu['id'] != '' || $submenu['id'] != "") {
                    $id_sbm = 'id="'+$submenu['id']+'" ';
                } else {
                    $id_sbm = '';
                }
                if ($submenu['class'] != undefined || $submenu['class'] != null || $submenu['class'] != '' || $submenu['class'] != "") {
                    $class_sbm = 'class="'+$submenu['class']+'" ';
                } else {
                    $class_sbm = '';
                }
                if ($submenu['style'] != undefined || $submenu['style'] != null || $submenu['style'] != '' || $submenu['style'] != "") {
                    $style_sbm = 'style="'+$submenu['style']+'" ';
                } else {
                    $style_sbm = '';
                }
                if ($submenu['attr'] != undefined || $submenu['attr'] != null || $submenu['attr'] != '' || $submenu['attr'] != "") {
                    $attr_sbm = $submenu['attr'];
                } else {
                    $attr_sbm = '';
                }
                if ($submenu['title'] != undefined || $submenu['title'] != null || $submenu['title'] != '' || $submenu['title'] != "") {
                    $title_sbm = $submenu['title'];
                } else {
                    $title_sbm = 'Submenu-'+$i;
                }

                /** For submenu : */
                if ($submenu['anchor'] != undefined || $submenu['anchor'] != null || $submenu['anchor'] != '' || $submenu['anchor'] != "") {
                    $anchor_tag = $submenu['anchor'];
                    if ($anchor_tag['id'] != undefined || $anchor_tag['id'] != null || $anchor_tag['id'] != '' || $anchor_tag['id'] != "") {
                        $id_a = 'id="'+$anchor_tag+'" ';
                    } else {
                        $id_a = '';
                    }
                    if ($anchor_tag['class'] != undefiend || $anchor_tag['class'] != null || $anchor_tag['class'] != '' || $anchor_tag['class'] != "") {
                        $class_a = 'class="'+$anchor_tag['class']+'"';
                    } else {
                        $class_a = '';
                    }
                    if ($anchor_tag['style'] != undefined || $anchor_tag['style'] != null || $anchor_tag['style'] != '' || $anchor_tag['style'] != "") {
                        $style_a = 'style="'+$anchor_tag['style']+'" ';
                    } else {
                        $style_a = '';
                    }
                    if ($anchor_tag['attr'] != undefined || $anchor_tag['attr'] != null || $anchor_tag['attr'] != '' || $anchor_tag['attr'] != "") {
                        $attr_a = $anchor_tag['attr'];
                    } else {
                        $attr_a = '';
                    }
                    if ($anchor_tag['href'] != undefined || $anchor_tag['href'] != null || $anchor_tag['href'] != '' || $anchor_tag['href'] != "") {
                        $href_a = 'href="'+$anchor_tag['href'];
                    } else {
                        $href_a = '#';
                    }
                    $anchor_menu = '<a '+$id_a+$class_a+$style_a+$attr_a+$href_a+'></a>';
                } else {
                    $anchor_menu = '<a href="#">'+$title_sbm+'</a>';
                }

                /** Create Submenu : */
                $sbmenu += '<li '+$id_sbm+$class_sbm+$style_sbm+$attr_sbm+'>'+$anchor_menu+'</li>';
                $i++;
            }

            /** Place result : */
            $result_func = $sbmenu;
        }
        /** Check IF $submenu is not an object : */
        else {
            /** Debug */
            console.error('Parameter $submenu is not object');
            /** Place result : */
            $result_func = 0;
        }

        /** Return result : */
        return $result_func;
    },
    /** End of Create Bootstrap Tabs Submenu.
     * ===================================================================================================== */

    /** Create Bootstrap Tabs Menu :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat menu tabs.
     *
     * Format object $menu :
     * -----------------------------------------------
     * object [
     *      {
     *          'active' : [ Berisi Status Active Tabs ],
     *          'id' : [ Berisi ID Menu ],
     *          'class' : [ Berisi Class Menu ],
     *          'style' : [ Berisi Style Menu ],
     *          'attr' : [ Berisi Attr Menu ],
     *          'title' : [ Berisi Title of Menu ],
     *          'anchor' : {
     *              'id' : [ Berisi ID Anchor Tag ],
     *              'class' : [ Berisi Class Anchor Tag ],
     *              'style' : [ Berisi Style Anchor Tag ],
     *              'attr' : [ Berisi Attr Anchor Tag ],
     *          },
     *          'child' : [ # IF 'child' == 0 equals Not Submenu.
     *              {
     *                  'active' : [ Berisi Status Active Tabs ],
     *                  'id' : [ Berisi ID Menu ],
     *                  'class' : [ Berisi Class Menu ],
     *                  'style' : [ Berisi Style Menu ],
     *                  'attr' : [ Berisi Attr Menu ],
     *                  'title' : [ Berisi Title of Menu ],
     *                  'anchor' : {
     *                      'id' : [ Berisi ID Anchor Tag ],
     *                      'class' : [ Berisi Class Anchor Tag ],
     *                      'style' : [ Berisi Style Anchor Tag ],
     *                      'attr' : [ Berisi Attr Anchor Tag ],
     *                  },
     *              }
     *          ]
     *      }
     * ]
     *
     */
    NKTI_Bootstrap_tabs_menu: function ($type, $menu) {

        /** Define variable will be used in this function : */
        var $result_func, $data_menu = '', $type_tabs, $attr_menuTabs,
            $id_menu, $class_menu, $style_menu, $attr_menu, $active_menu,
            $anchor_tag, $anchor_menu, $child_menu, $title_menu;
        var $id_a, $class_a, $style_a, $attr_a;

        /** For Check Type : */
        if ($type == 'tabs') {$type_tabs = 'tabs'; $attr_menuTabs = 'data-toggle="tab"';}
        else {$type_tabs = 'pill'; $attr_menuTabs = 'data-toggle="pill"';}

        /** Create Menu Tabs : */
        var $i = 0,
            $until_loop = Object.keys($menu),
            $prop, $value;
        while ($i < $until_loop) {

            /** For Wrap Parent Menu : */
            if ($menu[$i]['active'] != undefined || $menu[$i]['active'] != null || $menu[$i]['active'] != '' || $menu[$i]['active'] != "") {
                $active_menu = $menu[$i]['active'];
            } else {
                $active_menu = 0;
            }
            if ($menu[$i]['id'] != undefined || $menu[$i]['id'] != null || $menu[$i]['id'] != '' || $menu[$i]['id'] != "") {
                $id_menu = 'id="' + $menu[$i]['id'] + '" ';
            } else {
                $id_menu = '';
            }
            if ($menu[$i]['class'] != undefined || $menu[$i]['class'] != null || $menu[$i]['class'] != '' || $menu[$i]['class'] != "") {
                if ($menu[$i]['active'] == 1) {
                    $class_menu = 'class="active ' + $menu[$i]['class'] + '" ';
                } else {
                    $class_menu = 'class="' + $menu[$i]['class'] + '" ';
                }
            } else {
                if ($menu[$i]['active'] == 1) {
                    $class_menu = 'class="active" ';
                } else {
                    $class_menu = '';
                }
            }
            if ($menu[$i]['style'] != undefined || $menu[$i]['style'] != null || $menu[$i]['style'] != '' || $menu[$i]['style'] != "") {
                $style_menu = 'style="' + $menu[$i]['style'] + '" ';
            } else {
                $style_menu = '';
            }
            if ($menu[$i]['attr'] != undefined || $menu[$i]['attr'] != null || $menu[$i]['attr'] != '' || $menu[$i]['attr'] != "") {
                $attr_menu = $menu[$i]['attr'];
            } else {
                $attr_menu = '';
            }
            if ($menu[$i]['title'] != undefined || $menu[$i]['title'] != null || $menu[$i]['title'] != '' || $menu[$i]['title'] != "") {
                $title_menu = $menu[$i]['title'];
            } else {
                $title_menu = 'menu '+$i;
            }

            /** For parent menu : */
            if ($menu[$i]['anchor'] != undefined || $menu[$i]['anchor'] != null || $menu[$i]['anchor'] != '' || $menu[$i]['anchor'] != "") {
                $anchor_tag = $menu[$i]['anchor'];
                if ($anchor_tag['id'] != undefined || $anchor_tag['id'] != null || $anchor_tag['id'] != '' || $anchor_tag['id'] != "") {
                    $id_a = 'id="'+$anchor_tag['id']+'" ';
                } else {
                    $id_a = '';
                }
                if ($anchor_tag['class'] != undefined || $anchor_tag['class'] != null || $anchor_tag['class'] != '' || $anchor_tag['class'] != "") {
                    $class_a = 'class="'+$anchor_tag['class']+'" ';
                } else {
                    $class_a = '';
                }
                if ($anchor_tag['style'] != undefined || $anchor_tag['style'] != null || $anchor_tag['style'] != '' || $anchor_tag['style'] != "") {
                    $style_a = 'style="'+$anchor_tag['style']+'" ';
                } else {
                    $style_a = '';
                }
                if ($anchor_tag['attr'] != undefined || $anchor_tag['attr'] != null || $anchor_tag['attr'] != '' || $anchor_tag['attr'] != "") {
                    $attr_a = $anchor_tag['attr'];
                } else {
                    $attr_a = '';
                }
                $anchor_menu = '<a '+$id_a+$class_a+$style_a+$attr_a+' '+$attr_menuTabs+'>'+$title_menu+'</a>';
            } else {
                $anchor_menu = '<a '+$attr_menuTabs+' href="#menu1">'+$title_menu+'</a>';
                console.error('Anchor Tag for Menu Tabs '+$i+' is undefined');
            }

            /** For Submenu : */
            if ($menu[$i]['child'] != undefined || $menu[$i]['child'] != null || $config[$i]['child'] != '' || $config[$i]['child'] != "") {
                $child_menu = $.NKTI_Bootstrap_tabs_submenu($menu[$i]['child']);
                $data_menu += '<li '+$id_menu+$class_menu+$style_menu+$attr_menu+'><a'+$id_a+$class_a+$style_a+$attr_a+'>'+$title_menu+'</a>';
                $data_menu += $child_menu;
                $data_menu += '</li>';
            } else {
                $child_menu = '';
            }


            $i++;
        }
    },
    /** End of Create Bootstrap Tabs Menu.
     * ===================================================================================================== */

    /** For Create Bootstrap Tabs/Pills :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Bootstrap Tabs.
     *
     * Format Object $config :
     * -----------------------------------------------
     * object {
     *      'menu' : {
     *          'id' : [ Berisi ID Wrap Menu Tabs ],
     *          'class' : [ Berisi Class Wrap Menu Tabs ],
     *          'style' : [ Berisi Style Wrap Menu tabs ],
     *          'attr' : [ Berisi Style Wrap Menu Tabs ],
     *      },
     *      'content' : {
     *          'id' : [ Berisi ID Wrap Content Tabs ],
     *          'class' : [ Berisi Class Wrap Content Tabs ],
     *          'style' : [ Berisi Style Wrap Content Tabs ],
     *          'attr' : [ Berisi Attr Wrap Content Tabs ],
     *      }
     * }
     *
     * Format Object $menu :
     * -----------------------------------------------
     * object [
     *      {
     *          'id' : [ Berisi ID Menu ],
     *          'class' : [ Berisi Class Menu ],
     *          'style' : [ Berisi Style Menu ],
     *          'attr' : [ Berisi Attr Menu ],
     *          'active' : [ Berisi Status Active Tabs ],
     *          'anchor' : {
     *              'id' : [ Berisi ID Anchor Tag ],
     *              'class' : [ Berisi Class Anchor Tag ],
     *              'style' : [ Berisi Style Anchor Tag ],
     *              'attr' : [ Berisi Attr Anchor Tag ],
     *          },
     *          'child' : [ # IF 'child' == 0 equals Not Submenu.
     *              {
     *                  'id' : [ Berisi ID Sub Menu
     *                  'class' : [ Berisi ID Sub Menu
     *                  'style' : [ Berisi ID Sub Menu
     *                  'attr' : [ Berisi ID Sub Menu
     *              },
     *          ]
     *      }
     * ]
     *
     * Format object $content :
     * -----------------------------------------------
     * object [
     *      {
     *          'id' : [ Berisi ID Tag Content ],
     *          'class' : [ Berisi Class Tag Content ],
     *          'style' : [ Berisi Style Tag Content ],
     *          'attr' : [ Berisi Attr Tag Content ],
     *          'active' : [ Berisi Status Active Content ],
     *          'data' : [ Berisi Data Content ]
     *      }
     * ]
     *
     * Format Object $place :
     * -------------------------------------
     * object {
     *      'selector' => [],
     *      'type' => [],
     * }
     *
     * @param   $type       {string}        Berisi type tabs bootstrap.
     * @param   $wrap       {object}        Berisi object wrap tabs bootstrap.
     * @param   $menu       {object}        Berisi Object menu tabs bootstrap.
     * @param   $content    {object}        Berisi Object Content Tabs Bootstrap.
     * @param   $place      {object}        Berisi config place method.
     *
     */
    NKTI_Bootstrap_tabs: function ($type, $wrap, $menu, $content, $place) {

        /** Define variable will be used in this function : */
        var $type_tabs, $data_toggle, $data_menu,
            $id_wmenu, $class_wmenu, $style_wmenu, $attr_wmenu,
            $id_wcont, $class_wcont, $style_wcont, $attr_wcont;
        var $result_func, $wrap_content, $wrap_menu = '';

        /** For Type Tabs : */
        if ($type != 'tab') {
            $type_tabs = 'nav nav-pills';
            $data_toggle = 'data-toggle="tab"';
        } else {
            $type_tabs = 'nav nav-tabs';
            $data_toggle = 'data-toggle="pill"';
        }

        /** Object Wrap Menu and Wrap Content : */
        var $wrap_menuOb = {
            'id' : '',
            'class' : $type_tabs,
            'style' : '',
            'attr' : ''
        };
        $id_wmenu = $wrap_menuOb['id'];
        $class_wmenu = 'class="'+$wrap_menuOb['class']+'" ';
        $style_wmenu = $wrap_menuOb['style'];
        $attr_wmenu = $wrap_menuOb['attr'];
        var $wrap_contentOb = {
            'id' : '',
            'class' : 'tab-content',
            'style' : '',
            'attr' : ''
        };
        $id_wcont = $wrap_contentOb['id'];
        $class_wcont = 'class="'+$wrap_contentOb['class']+'" ';
        $style_wcont = $wrap_contentOb['style'];
        $attr_wcont = $wrap_contentOb['attr'];

        /** For Wrap Menu : */
        if ($wrap['menu'] != undefined || $wrap['menu'] != null || $wrap['menu'] != '' || $wrap['menu'] != "") {

            /** For Wrap */
            $wrap_menu = $wrap['menu'];
            $wrap_content = $wrap['content'];

            /** For Wrap Menu */
            if ($wrap_menu['id'] != undefined || $wrap_menu['id'] != null ||
                $wrap_menu['id'] != '' || $wrap_menu['id'] != "") {
                $wrap_menuOb['id'] = $wrap_menu['id'];
                $id_wmenu = 'id="'+$wrap_menuOb['id']+'" ';
            }
            if ($wrap_menu['class'] != undefined || $wrap_menu['class'] != null ||
                $wrap_menu['class'] != '' || $wrap_menu['class'] != "") {
                $wrap_menuOb['class'] = $wrap_menu['class'];
                $class_wmenu = 'class="'+$wrap_menuOb['class']+'" ';
            }
            if ($wrap_menu['style'] != undefined || $wrap_menu['style'] != null ||
                $wrap_menu['style'] != '' || $wrap_menu['style'] != "") {
                $wrap_menuOb['style'] = $wrap_menu['style'];
                $style_wmenu = 'style="'+$wrap_menuOb['style']+'" ';
            }
            if ($wrap_menu['attr'] != undefined || $wrap_menu['attr'] != null ||
                $wrap_menuOb['attr'] != '' || $wrap_menu['attr'] != "") {
                $wrap_menuOb['attr'] = $wrap_menu['attr'];
                $attr_wmenu = $wrap_menuOb['attr'];
            }
            $wrap_menu = '<ul '+$id_wmenu+$class_wmenu+$attr_wmenu+$style_wmenu+'>';

            /** For Wrap Content : */
            if ($wrap['content'] != undefined || $wrap['content'] != null || $wrap['content'] != '' || $wrap['content'] != "") {

                /** For Wrap Content : */
                if ($wrap_content['id'] != undefined || $wrap_content['id'] != null ||
                    $wrap_content['id'] != '' || $wrap_content['id'] != "") {
                    $wrap_contentOb['id'] = $wrap_content['id'];
                    $id_wcont = 'id="'+$wrap_contentOb['id']+'" ';
                }
                if ($wrap_content['class'] != undefined || $wrap_content['class'] != null ||
                    $wrap_content['class'] != '' || $wrap_content['class'] != "") {
                    $wrap_contentOb['class'] = $wrap_content['class'];
                    $class_wcont = 'class="'+$wrap_contentOb['class']+'" ';
                }
                if ($wrap_content['style'] != undefined || $wrap_content['style'] != null ||
                    $wrap_content['style'] != '' || $wrap_content['style'] != "") {
                    $wrap_contentOb['style'] = $wrap_content['style'];
                    $style_wcont = 'style="'+$wrap_contentOb['style']+'" ';
                }
                if ($wrap_content['attr'] != undefined || $wrap_content['attr'] != null ||
                    $wrap_content['attr'] != '' || $wrap_content['attr'] != "") {
                    $wrap_contentOb['attr'] = $wrap_content['attr'];
                    $attr_wcont = $wrap_contentOb['attr'];
                }
                $wrap_content = '<div '+$id_wcont+$class_wcont+$style_wcont+$attr_wcont+'>';
            } else {
                $wrap_content = '<div class="'+$type_tabs+'">';
            }

            /** Create Tabs : */
            $wrap_menu += $.NKTI_Bootstrap_tabs_menu($type, $menu);
            $wrap_menu += '</ul>';
            $wrap_content += $.NKTI_Bootstrap_tabs_content($content);
            $wrap_content += '</div>';
            $data_menu = $wrap_menu+$wrap_content;

            /** Check parameter $place : */
            if (typeof $place == "object" && $place != null) {
                switch ($place['type']) {
                    case 'replace' :
                    default :
                        $($place['selector']).html($data_menu);
                        break;
                    case 'append' :
                        $($place['selector']).append($data_menu);
                        break;
                }
                $result_func = 1;
            } else {
                $result_func = $data_menu;
            }

        } else {
            /** Debug */
            console.error('Parameter $config is not object');
            /** Place result : */
            $result_func = 0;
        }

        /** Return result : */
        return $result_func;
    },
    /** End of For Create Bootstrap Tabs/Pills.
     * ===================================================================================================== */

    /** Create Bootstrap Progress Bar :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Progress bar.
     *
     * Format object $config :
     * -----------------------------------------------
     * object {
     *      'wrap' : {
     *          'id' : [ Berisi ID Wrap config ],
     *          'class' : [ Berisi Class Wrap Config ],
     *          'style' : [ Berisi Style Wrap Config ],
     *          'attr' : [ Berisi Attr Wrap Config ],
     *      },
     *      'inner' : {
     *          'id' : [ Berisi ID Inner Config ],
     *          'class' : [ Berisi Class Inner Config ],
     *          'style' : [ Berisi Style Inner Config ],
     *          'attr' : [ Berisi Attr Inner Config ],
     *      },
     * }
     *
     * @param   $type           {string}    Berisi type progress Bar.
     *                                      Ex: 'basic', 'label', 'color', 'strip', 'animate'
     * @param   $status         {string}    Berisi Status ProgressBar. Ex: "success", "info", "warning", "danger".
     * @param   $config         {object}    Berisi Object config Progress Bar.
     * @param   $min            {integer}   Berisi minimal value of Percent.
     * @param   $max            {integer}   Berisi Maximal value of Percent.
     * @param   $current        {integer}   Berisi Current value of Percent.
     * @param   $place          {object}    Berisi Object for place progress bar
     */
    NKTI_Bootstrap_progressBar: function ($type, $status, $config, $min, $max, $current, $place) {

        /** Define variable will be used in this function : */
        var $result_func, $type_fitur, $data_Pb,
            $wrap_tag, $inner_tag, $wrapper,
            $id_wrap, $class_wrap, $style_wrap, $attr_wrap,
            $id_inner, $class_inner, $style_inner, $attr_inner,
            $min_perc, $max_perc, $curr_value;
        var $status_bar, $text_status;
        var $class_finner, $attr_finner, $content;

        /** Check IF $config is object : */
        if (typeof $config == "object") {

            /** For check Type : */
            if ($type != undefined || $type != null || $type != '' || $type != "" && typeof $type == "string") {
                $type_fitur = $type;
            } else {
                $type_fitur = 'basic';
            }

            /** For Check Status : */
            switch ($status) {
                default :
                case 'success' :
                    $status_bar = 'progress-bar-success';
                    $text_status = 'Complete (Success)';
                    break;
                case 'info' :
                    $status_bar = 'progress-bar-info';
                    $text_status = 'Complete (Info)';
                    break;
                case 'warning' :
                    $status_bar = 'progress-bar-warning';
                    $text_status = 'Complete (Warning)';
                    break;
                case 'danger' :
                    $status_bar = 'progress-bar-danger';
                    $text_status = 'Complete (Danger)';
                    break;
            }

            /** For Min and Max Percent : */
            if (typeof $min == "number") {
                $min_perc = $min;
            } else {
                $min_perc = 0;
            }
            if (typeof $max == "number") {
                $max_perc = $max;
            } else {
                $max_perc = 100;
            }

            /** Check Current value : */
            if ($current != '' && typeof $current == "number") {
                if ($current > $max) {
                    $curr_value = 100;
                } else {
                    $curr_value = $current;
                }
            } else {
                $curr_value = 0;
            }

            /** Switch for type Feature Progress Bar : */
            switch ($type_fitur) {
                default :
                case 'basic':
                    $class_finner = 'progress-bar';
                    $attr_finner = 'role="progressbar"';
                    $content = '<span class="sr-only">'+$curr_value+'% Complete</span>';
                    break;
                case 'label' :
                    $class_finner = 'progress-bar';
                    $attr_finner = 'role="progressbar"';
                    $content = $curr_value+'%';
                    break;
                case 'color' :
                    $class_finner = 'progress-bar '+$status_bar;
                    $attr_finner = 'role="progressbar"';
                    $content = $curr_value+'% '+$text_status;
                    break;
                case 'strip' :
                    $class_finner = 'progress-bar '+$status_bar+' progress-bar-striped';
                    $attr_finner = 'role="progressbar"';
                    $content = $curr_value+'%';
                    break;
                case 'animate' :
                    $class_finner = 'progress-bar '+$status_bar+' progress-bar-striped active';
                    $attr_finner = 'role="progressbar"';
                    $content = $curr_value+'% '+$text_status;
                    break;
            }

            /** For $config['wrap'] : */
            if ($config['wrap'] != undefined || $config['wrap'] != null && ($config['wrap'] != '' || $config['wrap'] != "")) {
                $wrap_tag = $config['wrap'];
                if ($wrap_tag['id'] != undefined || $wrap_tag['id'] != null && ($wrap_tag['id'] != '' || $wrap_tag['id'] != "")) {
                    $id_wrap = 'id="'+$wrap_tag['id']+'" ';
                } else {
                    $id_wrap = '';
                }
                if ($wrap_tag['class'] != undefined || $wrap_tag['class'] != null && ($wrap_tag['class'] != '' || $wrap_tag['class'] != "")) {
                    $class_wrap = 'class="progress '+$wrap_tag['class']+'" ';
                } else {
                    $class_wrap = 'class="progress" ';
                }
                if ($wrap_tag['style'] != undefined || $wrap_tag['style'] != null && ($wrap_tag['style'] != '' || $wrap_tag['style'] != "")) {
                    $style_wrap = 'style="'+$wrap_tag['style']+'" ';
                } else {
                    $style_wrap = '';
                }
                if ($wrap_tag['attr'] != undefined || $wrap_tag['attr'] != null && ($wrap_tag['attr'] != '' || $wrap_tag['attr'] != "")) {
                    $attr_wrap = $wrap_tag['attr'];
                } else {
                    $attr_wrap = '';
                }
                $wrapper = '<div '+$id_wrap+$class_wrap+$style_wrap+$attr_wrap+'>';
            } else {
                $wrapper = '<div class="progress">';
            }

            /** For $config['inner'] : */
            if ($config['inner'] != undefined || $config['inner'] != null && ($config['inner'] != '' || $config['inner'] != "")) {
                $inner_tag = $config['inner'];
                if ($inner_tag['id'] != undefined || $inner_tag['id'] != null && ($inner_tag['id'] != '' || $inner_tag['id'] != "")) {
                    $id_inner = 'id="'+$inner_tag['id']+'" ';
                } else {
                    $id_inner = '';
                }
                if ($inner_tag['class'] != undefined || $inner_tag['class'] != null && ($inner_tag['class'] != '' || $inner_tag['class'] != "")) {
                    $class_inner = 'class="'+$class_finner+' '+$inner_tag['class']+'" ';
                } else {
                    $class_inner = 'class="'+$class_finner+'" ';
                }
                if ($inner_tag['style'] != undefined || $inner_tag['style'] != null && ($inner_tag['style'] != '' || $inner_tag['style'] != "")) {
                    $style_inner = 'style="'+$inner_tag['style']+'" ';
                } else {
                    $style_inner = '';
                }
                if ($inner_tag['attr'] != undefined || $inner_tag['attr'] != null && ($inner_tag['attr'] != '' || $inner_tag['attr'] != "")) {
                    $attr_inner = $inner_tag['attr'];
                } else {
                    $attr_inner = '';
                }
                $inner_tag = '<div '+$id_inner+$class_inner+$style_inner+$attr_inner+' >';
            } else {
                $inner_tag = '<div class="'+$class_finner+'" '+$attr_finner+' aria-valuenow="'+$curr_value+'" aria-valuemin="'+$min_perc+'" aria-valuemax="'+$max_perc+'">';
            }

            /** Create Tag : */
            $data_Pb = $wrapper;
            $data_Pb += $inner_tag;
            $data_Pb += $content;
            $data_Pb += '</div>';
            $data_Pb += '</div>';

            /** Check parameter $place : */
            if (typeof $place == "object" && $place != null) {
                switch ($place['type']) {
                    case 'replace' :
                    default :
                        $($place['selector']).html($data_Pb);
                        break;
                    case 'append' :
                        $($place['selector']).append($data_Pb);
                        break;
                }
                $result_func = 1;
            } else {
                $result_func = $data_Pb;
            }
        }
        /** Check IF $config is not object : */
        else {
            /** Debug */
            console.error('Parameter $config is not object');
            /** Place result : */
            $result_func = 0;
        }

        /** Return result : */
        return $result_func;
    },
    /** End of Create Bootstrap Progress Bar.
     * ===================================================================================================== */

    /** For update Bootstrap Progress Bar :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk mengupdate progressBar.
     *
     * @param   $id                 {string}        Berisi ID Progress Bar. Ex: "id_progress_Bar".
     * @param   $curr_percent       {number}        Berisi Nilai Percent Progress Bar.
     * @return  true
     */
    NKTI_Bootstrap_progressBar_update: function ($id, $curr_percent) {

        /** Define variable will be used in this function : */
        var $result_func;

        /** Update Attribute : */
        document.getElementById($id).setAttribute('aria-valuenow', '70');
        /** Update Style : */
        document.getElementById($id).style.width = $curr_percent+'%';
        /** Update Content : */
        var $content = document.getElementById($id);
        $content.innerHTML = $content.innerHTML.replace(/\d+/g, $curr_percent);

        /** Return result : */
        return(1);
    },
    /** End of For update Bootstrap Progress Bar.
     * ===================================================================================================== */

    /** For Create Input Form :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat input form.
     *
     * Format Object $config :
     * ----------------------------------------
     * objec {
     *      'type' : [ Berisi Type FORM Input, Ex: "text", "password" ],
     *      'id' : [ Berisi ID Input FORM ],
     *      'class' : [ Berisi Class Input FORM ],
     *      'attr' : [ berisi Attr Input FORM ],
     *      'style' : [ Berisi Style Input FORM ],
     *      'name' : [ Berisi Name Input FORM ],
     *      'value' : [ Berisi Value Input FORM ],
     * }
     */
    NKTI_Bootstrap_input_form: function ($config) {

        /** Define variable will be used in this function : */
        var $result_func, $type_input, $id_input, $class_input, $attr_input, $style_input;
        var $name_input, $value_input;

        /** Check IF $config is object : */
        if (typeof $config == "object") {

            /** Check property "type" : */
            if ($config['type'] != undefined || $config['type'] != null && ($config['type'] != '' || $config['type'] != "")) {
                $type_input = 'type="'+$config['type']+'" ';
            } else {
                $type_input = '';
            }
            /** Check property "id" : */
            if ($config['id'] != undefined || $config['id'] != null && ($config['id'] != '' || $config['id'] != "")) {
                $id_input = 'id="'+$config['id']+'" ';
            } else {
                $id_input = '';
            }
            /** Check property "class" : */
            if ($config['class'] != undefined || $config['class'] != null && ($config['class'] != '' || $config['class'] != "")) {
                $class_input = 'class="'+$config['class']+'" ';
            } else {
                $class_input = '';
            }
            /** Check property "attr" : */
            if ($config['attr'] != undefined || $config['attr'] != null && ($config['attr'] != '' || $config['attr'] != "")) {
                $attr_input = $config['attr']+'';
            } else {
                $attr_input = '';
            }
            /** Check property "style" : */
            if ($config['style'] != undefined || $config['style'] != null && ($config['style'] != '' || $config['style'] != "")) {
                $style_input = 'style="'+$config['style']+'" ';
            } else {
                $style_input = '';
            }
            /** Check Propery 'name' : */
            if ($config['name'] != undefined || $config['name'] != null && ($config['name'] != '' || $config['name'] != "")) {
                $name_input = 'name="'+$config['name']+'" ';
            } else {
                $name_input = '';
            }
            /** Check Propery 'value' : */
            if ($config['value'] != undefined || $config['value'] != null && ($config['value'] != '' || $config['value'] != "")) {
                $value_input = 'value="'+$config['value']+'" ';
            } else {
                $value_input = '';
            }

            /** Create INPUT FORM : */
            $result_func = '<input '+$type_input+$id_input+$class_input+$attr_input+$style_input+$name_input+$value_input+'>';
        }
        /** Check IF $config is not object : */
        else {
            /** Debug */
            console.error('Parameter $config is not object');
            /** Place result : */
            $result_func = 0;
        }

        /** Return Result : */
        return $result_func;
    },
    /** End of For Create Input Form.
     * ===================================================================================================== */

    /** For Label FORM Input :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Label FORM INPUT.
     *
     * Format Object Config :
     * ------------------------------------
     * object {
     *      'type' : [ ("default" || "") || "union" ],
     *      'id' : [ Berisi ID Label ],
     *      'class' : [ Berisi Class Label ],
     *      'attr' : [ Berisi Attr Label ],
     *      'style' : [ Berisi Style Label ],
     * }
     *
     * @param       $type       {string}        Berisi type label. Ex: ("default" || "") || "union".
     * @param       $name       {string}        Berisi Nama Label.
     * @param       $config     {object}        Berisi Config untuk pembuatan label.
     */
    NKTI_Bootstrap_input_label: function ($type, $name, $config) {

        /** Define variable will be used in this function : */
        var $data, $result_func, $id_label, $class_label, $attr_label, $style_label;

        /** Check IF $config is object and is not null : */
        if (typeof $config == "object" && $config != null) {
            /** For ID Label : */
            if ($config['id'] != undefined || $config['id'] != null || $config['id'] != '' || $config['id'] != "") {
                $id_label = 'id="'+$config['id']+'" ';
            } else {
                $id_label = '';
            }
            /** For Class Label : */
            if ($config['class'] != undefined || $config['class'] || $config['class'] != '' || $config['class'] != "") {
                $class_label = 'class="'+$config['class']+'" ';
            } else {
                $class_label = '';
            }
            /** For Attr Label : */
            if ($config['attr'] != undefined || $config['attr'] || $config['attr'] != '' || $config['attr'] != "") {
                $attr_label = $config['attr']+' ';
            } else {
                $attr_label = '';
            }
            /** For Style Label : */
            if ($config['style'] != undefined || $config['style'] || $config['style'] != '' || $config['style'] != "") {
                $style_label = 'style="'+$config['style']+'" ';
            } else {
                $style_label = '';
            }

            /** For Type Label : */
            switch ($type) {
                default :
                case 'default' :
                    $result_func = '<label '+$id_label+$class_label+$attr_label+$style_label+'>'+$name+'</label>';
                    break;
                case 'union' :
                    $result_func = '<span class="input-group-addon '+$class_label+'" '+$id_label+$style_label+$attr_label+'>'+$name+'</span>';
                    break;
            }
        }
        /** Check IF $config is not object OR is null : */
        else {
            /** Debug */
            console.error('Parameter $config is not object');
            /** Place result : */
            $result_func = 0;
        }

        /** Return result : */
        return $result_func;
    },
    /** End of For Label FORM Input.
     * ===================================================================================================== */

    /** For Create Input Form Bootstrap :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat form input bootstrap
     *
     * Format Object $config :
     * --------------------------------
     * object {
     *      'wrap' : {
     *          'id' : [ Berisi ID Wrap ],
     *          'class' : [ Berisi Class Wrap ],
     *          'attr' : [ Berisi Attr Wrap ],
     *          'style' : [ Berisi Style Wrap ],
     *      },
     *      'label' : {
     *          'name' : [Label Name],
     *          'pos' : [position. Ex: "top", "left", "right"],
     *          'type' : [type label. Ex: ("default" || ""), "union". 'custom' ],
     *          'config' : { -> [if 'type' == 'custom' this property == 'html string'.
     *              'id' : [ Berisi ID Label ],
     *              'class' : [ Berisi Class Label ],
     *              'attr' : [ Berisi Attr Label ],
     *              'style' : [ Berisi Style Label ],
     *          },
     *      },
     *      'input' : {
     *          'type' : [ Berisi Type FORM Input, Ex: "text", "password" ],
     *          'id' : [ Berisi ID Input FORM ],
     *          'class' : [ Berisi Class Input FORM ],
     *          'attr' : [ berisi Attr Input FORM ],
     *          'style' : [ Berisi Style Input FORM ],
     *          'name' : [ Berisi Name Input FORM ],
     *          'value' : [ Berisi Value Input FORM ],
     *      }
     * }
     *
     * Format Object $place :
     * -------------------------------------
     * object {
     *      'selector' => [],
     *      'type' => [],
     * }
     *
     * @param   $config         {object}        Berisi Object untuk membuat FORM Input Bootstrap.
     * @param   $place          {object}        Berisi Object untuk lokasi penempatan FORM Input.
     *
     */
    NKTI_Bootstrap_input: function ($config, $place) {

        /** Define varialbe will be used in this function : */
        var $data = '', $result_func, $config_wrap, $config_input;
        var $wrap = '', $id_wrap, $class_wrap, $attr_wrap, $style_wrap;
        var $label, $label_pos, $label_name, $label_type, $label_config, $label_position, $status_label;

        /** Check IF $config is not null : */
        if (typeof $config == "object" && $config != null)
        {
            /** Debug : */
            // console.log(Object.keys($config['label']).length);
            /** For check Label Input FORM : */
            if (Object.keys($config['label']).length == 4) {
                // console.log('true 4 input');
                $label_name = $config['label']['name'];
                $label_pos = $config['label']['pos'];
                $label_type = $config['label']['type'];
                $label_config = $config['label']['config'];
                $status_label = 1;
                switch ($label_type) {
                    default :
                    case 'default' :
                        switch ($label_pos) {
                            case 'top' :
                                $label = $.NKTI_Bootstrap_input_label($label_type, $label_name, $label_config);
                                $label_position = 0;
                                break;
                            case 'left' :
                                $label = $.NKTI_Bootstrap_input_label($label_type, $label_name, $label_config);
                                $label_position = 1;
                                break;
                            case 'right' :
                                $label = $.NKTI_Bootstrap_input_label($label_type, $label_name, $label_config);
                                $label_position = 2;
                                break;
                        }
                        break;
                    case 'union' :
                        switch ($label_pos) {
                            case 'top' :
                                $label = $.NKTI_Bootstrap_input_label($label_type, $label_name, $label_config);
                                $label_position = 1;
                                break;
                            case 'left' :
                                $label = $.NKTI_Bootstrap_input_label($label_type, $label_name, $label_config);
                                $label_position = 1;
                                break;
                            case 'right' :
                                $label = $.NKTI_Bootstrap_input_label($label_type, $label_name, $label_config);
                                $label_position = 2;
                                break;
                        }
                        break;
                    case 'custom' :
                        switch ($label_pos) {
                            case 'top':
                                $label = $label_config;
                                $label_position = 0;
                                break;
                            case 'left':
                                $label = $label_config;
                                $label_position = 1;
                                break;
                            case 'right':
                                $label = $label_config;
                                $label_position = 2;
                                break;
                        }
                        break;
                }
            } else {
                console.log('false 4 input');
                $label = '';
                $status_label = 0;
                $label_position = 0;
            }

            /** Check IF $config['wrap'] is object : */
            if (typeof $config['wrap'] == "object") {
                /** For check propery ID $config['wrap'] : */
                if ($config['wrap']['id'] != undefined && $config['wrap']['id'] != null && $config['wrap']['id'] != '' && $config['wrap']['id'] != "") {
                    $id_wrap = 'id="'+$config['wrap']['id']+'" ';
                } else {
                    $id_wrap = '';
                }
                /** For check propery Class $config['wrap'] : */
                if ($config['wrap']['class'] != undefined || $config['wrap']['class'] != null || $config['wrap']['class'] != '' || $config['wrap']['class'] != "") {
                    $class_wrap = 'class="form-group '+$config['wrap']['class']+'" ';
                } else {
                    $class_wrap = '';
                }
                /** For check propery Attr $config['wrap'] : */
                if ($config['wrap']['attr'] != undefined || $config['wrap']['attr'] != null || $config['wrap']['attr'] != '' || $config['wrap']['attr'] != "") {
                    $attr_wrap = $config['wrap']['attr']+' ';
                } else {
                    $attr_wrap = '';
                }
                /** For check propery Style $config['wrap'] : */
                if ($config['wrap']['style'] != undefined || $config['wrap']['style'] != null || $config['wrap']['style'] != '' || $config['wrap']['style'] != "") {
                    $style_wrap = 'style="'+$config['wrap']['style']+'" ';
                } else {
                    $style_wrap = '';
                }

                /** Check IF $config['input'] is object : */
                if (typeof $config['input'] == "object") {
                    /** Check IF $status_label == 1 : */
                    if ($status_label == 1) {
                        /** Create Wrap FORM INPUT : */
                        switch ($label_position) {
                            case 0 :
                                $wrap += $label;
                                $wrap += '<div '+$id_wrap+$class_wrap+$attr_wrap+$style_wrap+'>';
                                $wrap += $.NKTI_Bootstrap_input_form($config['input']);
                                $wrap += '</div>';
                                break;
                            case 1 :
                                $wrap += '<div '+$id_wrap+$class_wrap+$attr_wrap+$style_wrap+'>';
                                $wrap += $label;
                                $wrap += $.NKTI_Bootstrap_input_form($config['input']);
                                $wrap += '</div>';
                                break;
                            case 2 :
                                $wrap += '<div '+$id_wrap+$class_wrap+$attr_wrap+$style_wrap+'>';
                                $wrap += $.NKTI_Bootstrap_input_form($config['input']);
                                $wrap += $label;
                                $wrap += '</div>';
                                break;
                        }
                    }
                    /** IF $status_label == 0 : */
                    else {
                        $wrap += '<div '+$id_wrap+$class_wrap+$attr_wrap+$style_wrap+'>';
                        $wrap += $.NKTI_Bootstrap_input_form($config['input']);
                        $wrap += '</div>';
                    }

                    /** Check parameter $place : */
                    if (typeof $place == "object" && $place != null) {
                        switch ($place['type']) {
                            case 'replace' :
                            default :
                                $($place['selector']).html($wrap);
                                break;
                            case 'append' :
                                $($place['selector']).append($wrap);
                                break;
                        }
                        $result_func = 1;
                    } else {
                        $result_func = $wrap;
                    }
                }
                /** Check IF $config['input'] != "object" : */
                else {
                    /** Debug */
                    console.error('Parameter $config[\'input\'] is not object');
                    /** Place result : */
                    $result_func = 0;
                }
            }
            /** Check IF $config['wrap'] is not object : */
            else {
                /** Debug */
                console.error('Parameter $config[\'wrap\'] is not object');
                /** Place result : */
                $result_func = 0;
            }
        }
        /** Check IF $config is null : */
        else {
            /** Debug */
            console.error('Parameter $config is not object');
            /** Place result : */
            $result_func = 0;
        }
        /** Return result : */
        return $result_func;
    },
    /** End of For Create Input Form Bootstrap.
     * ===================================================================================================== */

    /** Create Input FORM Textarea Bootstrap :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat FORM Textarea Bootstrap.
     *
     * Format Object $config :
     * -------------------------------------
     * object {
     *      'type' : [ Berisi Type FORM Input, Ex: "text", "password" ],
     *      'id' : [ Berisi ID Input FORM ],
     *      'class' : [ Berisi Class Input FORM ],
     *      'attr' : [ berisi Attr Input FORM ],
     *      'style' : [ Berisi Style Input FORM ],
     * }
     *
     *
     */
    NKTI_Bootstrap_textarea_form: function ($config) {

        /** Define variable will be used in this function : */
        var $result_func, $id, $class, $attr, $style;

        /** Check IF $config is object : */
        if (typeof $config == "object") {
            /** For check $config['id'] : */
            if ($config['id'] != undefined || $config['id'] != null || $confi['id'] != '' || $config['id'] != "") {
                $id = 'id="'+$config['id']+'" ';
            } else {
                $id = '';
            }
            /** For check $config['class'] : */
            if ($config['class'] != undefined || $config['class'] != null || $config['class'] != '' || $config['class'] != "") {
                $class = 'class="form-control '+$config['class']+'" ';
            } else {
                $class = '';
            }
            /** For check $config['attr'] : */
            if ($config['attr'] != undefined || $config['attr'] != null || $config['attr'] != '' || $config['attr'] != "") {
                $attr = $config['attr']+' ';
            } else {
                $attr = '';
            }
            /** For check $config['style'] : */
            if ($config['style'] != undefined || $config['style'] != null || $config['style'] != '' || $config['style'] != "") {
                $style = 'style="'+$config['style']+'" ';
            } else {
                $style = '';
            }

            /** Place result : */
            $result_func = '<textarea '+$id+$class+$attr+$style+'></textarea>';
        }
        /** Check IF $config is not object : */
        else {
            /** Debug */
            console.error('Parameter $config is not object');
            /** Place result : */
            $result_func = 0;
        }

        /** Return result : */
        return $result_func;
    },
    /** End of Create Input FORM Textarea Bootstrap.
     * ===================================================================================================== */

    /** Create Label FORM Textarea Bootstrap :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat label FORM Textarea.
     *
     * Format Object $config :
     * -------------------------------------
     * object {
     *      'id' : [ Berisi ID Label ],
     *      'class' : [ Berisi Class Label ],
     *      'attr' : [ Berisi Attr Label ],
     *      'style' : [ Berisi Style Label ],
     * }
     *
     * @param       $config     {object}        Berisi data config untuk membuat Label.
     * @param       $name       {string}        Berisi name of label.
     */
    NKTI_Bootstrap_textarea_label: function ($config, $name) {

        /** Define variable will be used in this function : */
        var $result_func, $label;
        var $id_label, $class_label, $attr_label, $style_label;

        /** Check IF $config is object : */
        if (typeof $config == "object") {
            /** For check $config['id'] : */
            if ($config['id'] != undefined || $config['id'] != null || $config['id'] != '' || $config['id'] != "") {
                $id_label = 'id="'+$config['id']+'" ';
            } else {
                $id_label = '';
            }
            /** For check $config['class'] : */
            if ($config['class'] != undefined || $config['class'] != null || $config['class'] != '' || $config['id'] != "") {
                $class_label = 'class="'+$config['class']+'" ';
            } else {
                $class_label = '';
            }
            /** For check $config['attr'] : */
            if ($config['attr'] != undefined || $config['attr'] != null || $config['attr'] != '' || $config['attr'] != "") {
                $attr_label = $config['attr']+' ';
            } else {
                $attr_label = '';
            }
            /** For check $config['style'] : */
            if ($config['style'] != undefined || $config['style'] != null || $config['style'] != '' || $config['style'] != "") {
                $style_label = 'style="'+$config['style']+'" ';
            } else {
                $style_label = '';
            }

            /** Create label : */
            $result_func = '<label '+$id_label+$class_label+$attr_label+$style_label+'>'+$name+'</label>';
        }
        /** Check IF $config is not object : */
        else {
            /** Debug */
            console.error('Parameter $config is not object');
            /** Place result : */
            $result_func = 0;
        }

        /** Return result : */
        return $result_func;
    },
    /** End of Create Label FORM Textarea Bootstrap.
     * ===================================================================================================== */
    
    /** For Create Input Text Area FORM Bootstrap :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat form input bootstrap.
     *
     * Format Object $config :
     * -------------------------------
     * object {
     *      'wrap' : {
     *          'id' : [ Berisi ID Wrapper ],
     *          'class' : [ Berisi Class Wrapper ],
     *          'attr' : [ Berisi Attr Wrapper ],
     *          'style' : [ Berisi Style Wrapper ],
     *      },
     *      'label' : [
     *          'name' : [Label Name],
     *          'pos' : [position. Ex: "top", "left", "right"],
     *          'type' : "default" || "custom"
     *          'config' : { -> [if 'type' == 'custom' this property == 'html string'.
     *              'id' : [ Berisi ID Label ],
     *              'class' : [ Berisi Class Label ],
     *              'attr' : [ Berisi Attr Label ],
     *              'style' : [ Berisi Style Label ],
     *          },
     *      ],
     *      'input' : {
     *          'type' : [ Berisi Type FORM Input, Ex: "text", "password" ],
     *          'id' : [ Berisi ID Input FORM ],
     *          'class' : [ Berisi Class Input FORM ],
     *          'attr' : [ berisi Attr Input FORM ],
     *          'style' : [ Berisi Style Input FORM ],
     *      }
     * }
     *
     * Format Object $place :
     * -------------------------------------
     * object {
     *      'selector' => [],
     *      'type' => [],
     * }
     *
     * @param   $config         {object}        Berisi Object untuk membuat FORM textarea Bootstrap.
     * @param   $place          {object}        Berisi Object untuk lokasi penempatan FORM textarea.
     *
     */
    NKTI_Bootstrap_textarea: function ($config, $place) {

        /** Define variable will be used in this function : */
        var $result_func;
        var $wrap = '', $id_wrap, $class_wrap, $attr_wrap, $style_wrap;
        var $label = '', $label_pos, $label_name, $label_type, $label_config, $label_position, $status_label;

        /** Check IF $config is object : */
        if (typeof $config == "object") {

            /** Check IF $config['label'] is object : */
            if (typeof $config['label'] == "object") {
                $label_name = $config['label']['name'];
                $label_pos = $config['label']['pos'];
                $label_type = $config['label']['type'];
                $label_config = $config['label']['config'];
                $status_label = 1;
                switch ($label_type) {
                    default :
                    case 'default' :
                        $label = $.NKTI_Bootstrap_textarea_label($label_config, $label_name);
                        break;
                    case 'custom' :
                        $label = $label_config;
                        break;
                }
            }
            /** Check IF $config['label'] is not object : */
            else {
                $label = '';
                $status_label = 0;
            }

            /** Check IF $config['wrap'] is object : */
            if (typeof $config['wrap'] == "object") {
                /** For Check $config['id'] : */
                if ($config['wrap']['id'] != undefined || $config['wrap']['id'] != null || $config['wrap']['id'] != '' || $config['wrap']['id'] != "") {
                    $id_wrap = 'id="'+$config['id']+'" '
                } else {
                    $id_wrap = '';
                }
                /** For Check $config['class'] : */
                if ($config['wrap']['class'] != undefined || $config['wrap']['class'] != null || $config['wrap']['class'] != '' || $config['wrap']['class'] != "") {
                    $class_wrap = 'class="form-group '+$config['wrap']['class']+'" ';
                } else {
                    $class_wrap = 'class="form-group"';
                }
                /** For Check $config['attr'] : */
                if ($config['wrap']['attr'] != undefined || $config['wrap']['attr'] != null || $config['wrap']['attr'] != '' || $config['wrap']['attr'] != "") {
                    $attr_wrap = $config['wrap']['attr']+' ';
                } else {
                    $attr_wrap = '';
                }
                /** For Check $config['style'] : */
                if ($config['wrap']['style'] != undefined || $config['wrap']['style'] != null || $config['wrap']['style'] != '' || $config['wrap']['style'] != "") {
                    $style_wrap = 'style="'+$config['wrap']['style']+'" ';
                } else {
                    $style_wrap = '';
                }

                /** Check IF $config['input'] is object : */
                if (typeof $config['input'] == "object")
                {
                    /** Check IF $status_label == 1 : */
                    if ($status_label == 1) {
                        /** Place result : */
                        $wrap += '<div '+$id_wrap+$class_wrap+$attr_wrap+$style_wrap+'>';
                        $wrap += $label;
                        $wrap += $.NKTI_Bootstrap_textarea_form($config['input']);
                        $wrap += '</div>';
                    }
                    /** Check IF $status_label == 0 : */
                    else {
                        /** Place result : */
                        $wrap += '<div '+$id_wrap+$class_wrap+$attr_wrap+$style_wrap+'>';
                        $wrap += $.NKTI_Bootstrap_textarea_form($config['input']);
                        $wrap += '</div>';
                    }

                    /** Check parameter $place : */
                    if (typeof $place == "object" && $place != null) {
                        switch ($place['type']) {
                            case 'replace' :
                            default :
                                $($place['selector']).html($wrap);
                                break;
                            case 'append' :
                                $($place['selector']).append($wrap);
                                break;
                        }
                        $result_func = 1;
                    } else {
                        $result_func = $wrap;
                    }
                }
                /** Check IF $config['input'] is not object : */
                else {
                    /** Debug */
                    console.error('Property "input" parameter $config is not object');
                    /** Place result : */
                    $result_func = 0;
                }
            }
            /** Check IF $config['wrap'] is not object : */
            else {
                /** Debug */
                console.error('Parameter $config is not object');
                /** Place result : */
                $result_func = 0;
            }
        }
        /** However IF $config is not object : */
        else {
            /** Debug */
            console.error('Parameter $config is not object');
            /** Place result : */
            $result_func = 0;
        }

        /** Return result : */
        return $result_func;
    },
    /** End of For Create Input Text Area FORM Bootstrap.
     * ===================================================================================================== */

    /** Create Input Radio OR Checkbox Bootstrap :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat input checkbox Bootstrap
     *
     * Format object $config :
     * -----------------------------------------------
     * object {
     *      'wrap' : {
     *          'id' : [ Berisi ID Wrap Checkbox or Radio ],
     *          'class' : [ Berisi Class Wrap Checkbox or Radio ],
     *          'style' : [ Berisi Style Wrap Checkbox or Radio ],
     *          'attr' : [ Berisi Attr Wrap Checkbox or Radio ],
     *      },
     *      'input' : {
     *          'id' : [ Berisi ID Checkbox or Radio ],
     *          'class' : [ Berisi Class Checkbox or Radio ],
     *          'style' : [ Berisi Style Checkbox or Radio ],
     *          'attr' : [ Berisi Attr Checkbox or Radio ],
     *          'name' : [ Berisi Nama Checkbox or Radio },
     *          'value' : [ berisi Attr Checkbox or Radio ],
     *          'active' : [ Berisi status active Checkbox or Radio ],
     *          'title' : [ Berisi TItle Checkbox or Radio ]
     *      }
     * }
     *
     * Format Object $place :
     * -------------------------------------
     * object {
     *      'selector' => [],
     *      'type' => [],
     * }
     *
     * @param   $type       {string}        Berisi Type Radio.
     * @param   $config     {object}        Berisi data config untuk membuat input FORM.
     * @param   $place      {object}        Berisi data config Place input form.
     */
    NKTI_Bootstrap_input_cbradio: function ($type, $config, $place) {

        /** Define variable will be used in this function : */
        var $result_func,
            $wrap_input, $checkbox_input,
            $data_wrap, $data_checkbox, $type_input,
            $id_wrap, $class_wrap, $style_wrap, $attr_wrap,
            $id_input, $class_input, $style_input, $attr_input, $name_input, $value_input, $active_input, $title_input;

        /** Check $type : */
        if ($type == 'radio') {
            $type_input = 'radio';
        } else {
            $type_input = 'checkbox';
        }

        /** Check parameter $config is object : */
        if (typeof $config == "object") {

            /** Check Wrap : */
            if ($config['wrap'] != undefined || $config['wrap'] != null && ($config['wrap'] != '' || $config['wrap'] != "")) {
                $wrap_input = $config['wrap'];
                if ($wrap_input['id'] != undefined || $wrap_input['id'] != null && ($wrap_input['id'] != '' || $wrap_input['id'] != "")) {
                    $id_wrap = 'id="'+$wrap_input['id']+'" ';
                } else {
                    $id_wrap = '';
                }
                if ($wrap_input['class'] != undefined || $wrap_input['class'] != null && ($wrap_input['class'] != '' || $wrap_input['class'] != "")) {
                    $class_wrap = 'class="'+$type_input+' '+$wrap_input['class']+'" ';
                } else {
                    $class_wrap = 'class="'+$type_input+'" ';
                }
                if ($wrap_input['style'] != undefined || $wrap_input['style'] != null && ($wrap_input['style'] != '' || $wrap_input['class'] != "")) {
                    $style_wrap = 'style="'+$wrap_input['style']+'" ';
                } else {
                    $style_wrap = '';
                }
                if ($wrap_input['attr'] != undefined || $wrap_input['attr'] != null && ($wrap_input['attr'] != '' || $wrap_input['attr'] != "")) {
                    $attr_wrap = $wrap_input['attr'];
                } else {
                    $attr_wrap = '';
                }
                $data_wrap = '<div '+$id_wrap+$class_wrap+$style_wrap+$attr_wrap+'>';
            } else {
                $data_wrap = '<div class="'+$type_input+'">';
            }

            /** Check Input : */
            if ($config['input'] != undefined || $config['input'] != null && ($config['input'] != '' || $config['input'] != "")) {

                /** Check Config "input" : */
                $checkbox_input = $config['input'];
                if ($checkbox_input['id'] != undefined || $checkbox_input['id'] != null && ($checkbox_input['id'] != '' || $checkbox_input['id'] != "")) {
                    $id_input = 'id="'+$checkbox_input['id']+'" ';
                } else {
                    $id_input = '';
                }
                if ($checkbox_input['class'] != undefined || $checkbox_input['class'] != null && ($checkbox_input['class'] != '' || $checkbox_input['class'] != "")) {
                    $class_input = 'class="'+$checkbox_input['class']+'" ';
                } else {
                    $class_input = 'class="" ';
                }
                if ($checkbox_input['style'] != undefined || $checkbox_input['style'] != null && ($checkbox_input['style'] != '' || $checkbox_input['style'] != "")) {
                    $style_input = 'style="'+$checkbox_input['style']+'" ';
                } else {
                    $style_input = '';
                }
                if ($checkbox_input['attr'] != undefined || $checkbox_input['attr'] != null && ($checkbox_input['attr'] != '' || $checkbox_input['attr'] != "")) {
                    $attr_input = $checkbox_input['attr'];
                } else {
                    $attr_input = '';
                }
                if ($checkbox_input['name'] != undefined || $checkbox_input['name'] != null && ($checkbox_input['name'] != '' || $checkbox_input['name'] != "")) {
                    $name_input = 'name="'+$checkbox_input['name']+'" ';
                } else {
                    console.error('"name" Attribute for input '+$type_input+' is undefined');
                    $name_input = 'name="no-name" ';
                }
                if ($checkbox_input['value'] != undefined || $checkbox_input['value'] != null && ($checkbox_input['value'] != '' || $checkbox_input['value'] != "")) {
                    $value_input = 'value="'+$checkbox_input['value']+'" ';
                } else {
                    $value_input = '';
                }
                if ($checkbox_input['active'] != undefined || $checkbox_input['active'] != null && ($checkbox_input['active'] != '' || $checkbox_input['active'] != "")) {
                    if ($checkbox_input == 0) {
                        $active_input = 'disabled';
                    } else {
                        $active_input = '';
                    }
                } else {
                    $active_input = '';
                }
                if ($checkbox_input['title'] != undefined || $checkbox_input['title'] != null && ($checkbox_input['title'] != '' || $checkbox_input['title'] != "")) {
                    $title_input = $checkbox_input['title'];
                } else {
                    $title_input = '';
                }

                /** Create input checkbox : */
                $data_checkbox = $data_wrap;
                $data_checkbox += '<label><input type="'+$type_input+'" '+$id_input+$class_input+$style_input+$attr_input+$name_input+$value_input+$active_input+'>'+$title_input+'</label>';
                $data_checkbox += '</div>';

                /** Check parameter $place : */
                if (typeof $place == "object" && $place != null) {
                    switch ($place['type']) {
                        case 'replace' :
                        default :
                            $($place['selector']).html($data_checkbox);
                            break;
                        case 'append' :
                            $($place['selector']).append($data_checkbox);
                            break;
                    }
                    $result_func = 1;
                } else {
                    $result_func = $wrap;
                }
            } else {
                /** Debug */
                console.error('Proporty "input" in Parameter $config is undefined');
                /** Place result : */
                $result_func = 0;
            }
        }

        /** Check parameter $config is not object : */
        else {
            /** Debug */
            console.error('Parameter $config is not object');
            /** Place result : */
            $result_func = 0;
        }

        /** Return result : */
        return $result_func;
    },
    /** End of Create Input Radio OR Checkbox Bootstrap.
     * ===================================================================================================== */

    /** Create Label Form Select Bootstrap :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat label form bootstrap.
     *
     */
    NKTI_Bootstrap_select_label: function ($config) {

        /** Define variable will be used in this funciton : */
        var $result_func,
            $id_label, $class_label, $style_label, $attr_label;

        /**  */
    },
    /** End of Create Label Form Select Bootstrap.
     * ===================================================================================================== */

    /** Create FORM Select List :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Form Select List.
     *
     * Format Object $config :
     * -----------------------------------------------
     * object {
     *      'wrap' : {
     *          'id' : [ Berisi ID Wrap ],
     *          'class' : [ Berisi Class Wrap ],
     *          'style' : [ Berisi Style Wrap ],
     *          'attr' : [ Berisi Attr Wrap ],
     *      },
     *      'label' : {
     *          'name' : [Label Name],
     *          'pos' : [position. Ex: "top", "left", "right"],
     *          'type' : [type label. Ex: ("default" || ""), "union". 'custom' ],
     *          'config' : { -> [if 'type' == 'custom' this property == 'html string'.
     *              'id' : [ Berisi ID Label ],
     *              'class' : [ Berisi Class Label ],
     *              'attr' : [ Berisi Attr Label ],
     *              'style' : [ Berisi Style Label ],
     *          },
     *      }
     *      'form' : {
     *          'id' : [ Berisi ID Form Select ],
     *          'class' : [ Berisi Class Form Select },
     *          'style' : [ Berisi Style Form Select },
     *          'attr' : [ Berisi Attr Form Select },
     *      },
     *      'option' : [
     *          {
     *              'id' : [ Berisi ID Option ],
     *              'class' : [ Berisi Class Option ],
     *              'style' : [ Berisi Style Option ],
     *              'attr' : [ Berisi Attr Option ],
     *              'title' : [ Berisi Title Option ],
     *              'value' : [ Berisi Value Option ],
     *          },
     *      ],
     * }
     *
     * @param   $config         {object}        Berisi object untuk membuat FORM Select.
     */
    NKTI_Bootstrap_select: function ($config) {

        /** Define variable will be used in this function : */
        var $result_func,
            $data_select, $data_option,
            $label, $label_pos, $label_name, $label_type, $label_config, $label_position, $status_label,
            $id_wrap, $class_wrap, $style_wrap, $attr_wrap,
            $wrap_select;

        /** Check IF $config is object : */
        if (typeof $config == "object") {

            /** For check Label Input FORM : */
            if (Object.keys($config['label']).length == 4) {
                // console.log('true 4 input');
                $label_name = $config['label']['name'];
                $label_pos = $config['label']['pos'];
                $label_type = $config['label']['type'];
                $label_config = $config['label']['config'];
                $status_label = 1;
                $label = $.NKTI_Bootstrap_input_label($label_type, $label_name, $label_config);
            } else {
                $label = '';
                $status_label = 0;
                $label_position = 0;
            }

            /** Check IF property 'wrap' */
            if ($config['wrap'] != undefined || $config['wrap'] != null && typeof $config['wrap'] == "object"
                && ($config['wrap'] != '' || $config['wrap'] != "")) {
                $wrap_select = $config['wrap'];
                if ($wrap_select['id'] != undefined || $wrap_select['id'] != null && ($wrap_select['id'] != '' || $wrap_select['id'] != "")) {
                    $id_wrap = 'id="'+$wrap_select['id']+'" ';
                } else {
                    $id_wrap = '';
                }
                if ($wrap_select['class'] != undefined || $wrap_select['class'] != null && ($wrap_select['class'] != '' || $wrap_select['class'] != "")) {
                    $class_wrap = 'class="'+$wrap_select['class']+'" ';
                } else {
                    $class_wrap = '';
                }
                if ($wrap_select['style'] != undefined || $wrap_select['style'] != null && ($wrap_select['style'] != '' || $wrap_select['style'] != "")) {
                    $style_wrap = 'style="'+$wrap_select['style']+'" ';
                } else {
                    $style_wrap = '';
                }
                if ($wrap_select['attr'] != undefined || $wrap_select['attr'] != null && ($wrap_select['attr'] != '' || $wrap_select['attr'] != "")) {
                    $attr_wrap = $wrap_select['attr'];
                } else {
                    $attr_wrap = '';
                }
            } else {
                /** Debug */
                console.error('Property "wrap" in Parameter $config is not object');
                /** Place result : */
                $result_func = 0;
            }
        }

        /** Check IF $config is not object : */
        else {
            /** Debug */
            console.error('Parameter $config is not object');
            /** Place result : */
            $result_func = 0;
        }
    }
    /** End of Create FORM Select List.
     * ===================================================================================================== */
});
/** End of Bootstrap Creator.
 * ===================================================================================================== */