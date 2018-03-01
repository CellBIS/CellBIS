/**
 * Created by AchmadYusri on 10/01/2016.
 */

/** Begin Form Pattern :
 * -----------------------------------------------------------
 */
jQuery.extend({

    /** For FORM Input Text :
     * -----------------------------------------------------------
     *
     * Format Object $config :
     * -------------------------------------
     * object {
     *      'input' : {
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *          'name' : '',
     *          'value' : '',
     *      }
     * }
     *
     * Format Object $selector :
     * -------------------------------------
     * object {
     *      'selector' : [name selector. Ex : div#your_id_tag | div.your_class_tag | etc.],
     *      'place' : [append | replace];
     * }
     *
     * @param $config {object} Variable yang berisi config input text.
     * @param $selector {object} Variable yang berisi selector untuk menyimpan hasil pembuatan FORM Input.
     */
    NKTI_FORM_input_text: function ($config, $selector) {

        /** Define variable will be used in this function : */
        var $config_input, $result_input = '', $result;

        // For Check Wrapper Input Text :
        // ==================================================================================================

        /** Check IF $config is defined : */
        if ($config != undefined || $config != null || $config != '' || $config != "") {

            /** Define Config Form Input Text : */
            $config_input = $config;

            /** Define variable for attribute FORM Input : */
            var $id_input, $class_input, $attr_input, $style_input, $name_input, $value_input;

            /** Check FOR $config_input['id'] : */
            if ($config_input['id'] != undefined || $config_input['id'] != null || $config_input['id'] != '' || $config_input['id'] != "") {
                $id_input = ' id="' + $config_input['id'] + '" ';
            }
            if ($config_input['id'] == undefined || $config_input['id'] == null || $config_input['id'] == '' || $config_input['id'] == "") {
                $id_input = ' ';
            }

            /** Check FOR $config_input['class'] : */
            if ($config_input['class'] != undefined || $config_input['class'] != null || $config_input['class'] != '' || $config_input['class'] != "") {
                $class_input = ' class="' + $config_input['class'] + '" ';
            }
            if ($config_input['class'] == undefined || $config_input['class'] == null || $config_input['class'] == '' || $config_input['class'] == "") {
                $class_input = '';
            }

            /** Check FOR $config_input['attr'] : */
            if ($config_input['attr'] != undefined || $config_input['attr'] != null || $config_input['attr'] != '' || $config_input['attr'] != "") {
                $attr_input = ' ' + $config_input['attr'] + ' ';
            }
            if ($config_input['attr'] == undefined || $config_input['attr'] == null || $config_input['attr'] == '' || $config_input['attr'] == "") {
                $attr_input = '';
            }

            /** Check FOR $config_input['style'] : */
            if ($config_input['style'] != undefined || $config_input['style'] != null || $config_input['style'] != '' || $config_input['style'] != "") {
                $style_input = ' style="' + $config_input['style'] + '" ';
            }
            if ($config_input['style'] == undefined || $config_input['style'] == null || $config_input['style'] == '' || $config_input['style'] == "") {
                $style_input = '';
            }

            /** Check FOR $config_input['name'] : */
            if ($config_input['name'] != undefined || $config_input['name'] != null || $config_input['name'] != '' || $config_input['name'] != "") {
                $name_input = $config_input['name'];
            }
            if ($config_input['name'] == undefined || $config_input['name'] == null || $config_input['name'] == '' || $config_input['name'] == "") {
                $name_input = 'undefined';
                console.error('Name for input is undefined');
            }

            /** Check FOR $config_input['value'] : */
            if ($config_input['value'] != undefined || $config_input['value'] != null || $config_input['value'] != '' || $config_input['value'] != "") {
                $value_input = ' value="' + $config_input['value'] + '"';
            }
            if ($config_input['value'] == undefined || $config_input['value'] == null || $config_input['value'] == '' || $config_input['value'] == "") {
                $value_input = '';
            }

            /** Create FORM Input : */
            $result_input += '<input '+$id_input+$class_input+$attr_input+$style_input+'name="'+$name_input+'"'+$value_input+' />';

            /** Check IF $selector is defined : */
            if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                /** Switch for conditions $selector['place'] : */
                switch ($selector['place'])
                {
                    /** Case for $selector['place'] == 'append' : */
                    case 'append' :
                        $($selector['place']).append($result_input);
                        break;

                    /** Case for $selector['place'] == 'replace' : */
                    case 'replace' :
                        $($selector['place']).html($result_input);
                        break;
                }
                /** End of switch for conditions $selector['place']. */

                /** Return Result : */
                $result = 1;

            } /** End of Check IF $selector is defined. */

            /** Check IF $selector is undefined : */
            if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {

                /** Placing result create input into variable $result : */
                $result = $result_input;

            } /** End of Check IF $selector is undefined. */

        } /** End of Check IF $config is defined. */

        /** Check IF $config is undefined : */
        if ($config == undefined || $config == null || $config == '' || $config == "") {
            console.error('Config Form Input text is undefined');
            $result = 0
        } /** End of Check IF $config is undefined. */

        /** Return Result : */
        return $result;
    },
    /** End of For FORM Input Text.
     * ===================================================================================================== */

    /** For FORM Select :
     * -----------------------------------------------------------
     *
     * Format Object $config :
     * -------------------------------------
     * object {
     *      'item' : {
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *          'name' : '',
     *      },
     *      'option' : {
     *          {
     *              'id' : '',
     *              'class' : '',
     *              'attr' : '',
     *              'style' : '',
     *              'value' : '',
     *              'title' : '',
     *          },
     *      }
     * }
     *
     * Format Object $selector :
     * -------------------------------------
     * object {
     *      'selector' : [ Name Selector ],
     *      'place' : [ append | replace ]
     * }
     *
     * @param $config {object} Variable yang berisi object config FORM Select untuk proses pembuatan.
     * @param $selector {object} Variabel yang berisi object untuk selector.
     */
    NKTI_FORM_select: function ($config, $selector) {

        /** Define variale will be used in this function : */
        var $config_select, $result_select = '', $result;

        /** Check IF $config is defined : */
        if ($config != undefined || $config != null || $config != '' || $config != "") {

            /** Define Config Select : */
            $config_select = $config;

            // Begin FORM Select :
            // ==================================================================================================

            /** Define variable for attribute $config_select : */
            var $id_select, $class_select, $attr_select, $style_select, $name_select, $option_select;

            /** Check FOR $config_select['id'] : */
            if ($config_select['item']['id'] != undefined || $config_select['item']['id'] != null || $config_select['item']['id'] != '' || $config_select['item']['id'] != "") {
                $id_select = ' id="' + $config_select['item']['id'] + '" ';
            }
            if ($config_select['item']['id'] == undefined || $config_select['item']['id'] == null || $config_select['item']['id'] == '' || $config_select['item']['id'] == "") {
                $id_select = '';
            }

            /** Check FOR $config_select['item']['class'] : */
            if ($config_select['item']['class'] != undefined || $config_select['item']['class'] != null || $config_select['item']['class'] != '' || $config_select['item']['class'] != "") {
                $class_select = ' class="' + $config_select['item']['class'] + '" ';
            }
            if ($config_select['item']['class'] == undefined || $config_select['item']['class'] == null || $config_select['item']['class'] == '' || $config_select['item']['class'] == "") {
                $class_select = '';
            }

            /** Check FOR $config_select['item']['attr'] : */
            if ($config_select['item']['attr'] != undefined || $config_select['item']['attr'] != null || $config_select['item']['attr'] != '' || $config_select['item']['attr'] != "") {
                $attr_select = ' ' + $config_select['item']['attr'] + ' ';
            }
            if ($config_select['item']['attr'] == undefined || $config_select['item']['attr'] == null || $config_select['item']['attr'] == '' || $config_select['item']['attr'] == "") {
                $attr_select = '';
            }

            /** Check FOR $config_select['item']['style'] : */
            if ($config_select['item']['style'] != undefined || $config_select['item']['style'] != null || $config_select['item']['style'] != '' || $config_select['item']['style'] != "") {
                $style_select = ' style="' + $config_select['item']['style'] + '" ';
            }
            if ($config_select['item']['style'] == undefined || $config_select['item']['style'] == null || $config_select['item']['style'] == '' || $config_select['item']['style'] == "") {
                $style_select = '';
            }

            /** Check FOR $config_select['item']['name'] : */
            if ($config_select['item']['name'] != undefined || $config_select['item']['name'] != null || $config_select['item']['name'] != '' || $config_select['item']['name'] != "") {
                $name_select = ' name="' + $config_select['item']['name'] + '" ';
            }
            if ($config_select['item']['name'] == undefined || $config_select['item']['name'] == null || $config_select['item']['name'] == '' || $config_select['item']['name'] == "") {
                $name_select = '';
            }

            /** Begin FORM Select : */
            $result_select += '<select'+$id_select+$class_select+$attr_select+$style_select+$name_select+'>';

            // Begin Option FORM Select :
            // ==================================================================================================

            /** Check IF $config_select['option'] is define : */
            if ($config_select['option'] != undefined || $config_select['option'] != null || $config_select['option'] != '' || $config_select['option'] != "") {

                /** Define variable $option_select for option FORM Select : */
                $option_select = $config_select['option'];

                /** Prepare while loop to Create Option Select : */
                var $i_opt = 0;
                var $until_loop_opt = $option_select.length;

                /** While loop to Create Option Select : */
                while ($i_opt < $until_loop_opt)
                {
                    /** Define variable for attribute option : */
                    var $id_option, $class_option, $attr_option, $style_option, $value_option, $title_option;

                    /** Check IF $option_select[$i]['id'] is defined : */
                    if ($option_select[$i]['id'] != undefined || $option_select[$i]['id'] != null || $option_select[$i]['id'] != '' || $option_select[$i]['id'] != "") {
                        $id_option = ' id="' + $id_option + '" ';
                    }
                    if ($option_select[$i]['id'] == undefined || $option_select[$i]['id'] == null || $option_select[$i]['id'] == '' || $option_select[$i]['id'] == "") {
                        $id_option = '';
                    }

                    /** Check IF $option_select[$i]['class'] is defined : */
                    if ($option_select[$i]['class'] != undefined || $option_select[$i]['class'] != null || $option_select[$i]['class'] != '' || $option_select[$i]['class'] != "") {
                        $class_option = ' class="' + $class_option + '" ';
                    }
                    if ($option_select[$i]['class'] == undefined || $option_select[$i]['class'] == null || $option_select[$i]['class'] == '' || $option_select[$i]['class'] == "") {
                        $class_option = '';
                    }

                    /** Check IF $option_select[$i]['attr'] is defined : */
                    if ($option_select[$i]['attr'] != undefined || $option_select[$i]['attr'] != null || $option_select[$i]['attr'] != '' || $option_select[$i]['attr'] != "") {
                        $attr_option = ' ' + $attr_option + ' ';
                    }
                    if ($option_select[$i]['attr'] == undefined || $option_select[$i]['attr'] == null || $option_select[$i]['attr'] == '' || $option_select[$i]['attr'] == "") {
                        $attr_option = '';
                    }

                    /** Check IF $option_select[$i]['style'] is defined : */
                    if ($option_select[$i]['style'] != undefined || $option_select[$i]['style'] != null || $option_select[$i]['style'] != '' || $option_select[$i]['style'] != "") {
                        $style_option = ' style="' + $style_option + '" ';
                    }
                    if ($option_select[$i]['style'] == undefined || $option_select[$i]['style'] == null || $option_select[$i]['style'] == '' || $option_select[$i]['style'] == "") {
                        $style_option = '';
                    }

                    /** Check IF $option_select[$i]['value'] is defined : */
                    if ($option_select[$i]['value'] != undefined || $option_select[$i]['value'] != null || $option_select[$i]['value'] != '' || $option_select[$i]['value'] != "") {
                        $value_option = ' value="' + $value_option + '"';
                    }
                    if ($option_select[$i]['value'] == undefined || $option_select[$i]['value'] == null || $option_select[$i]['value'] == '' || $option_select[$i]['value'] == "") {
                        $value_option = '';
                    }

                    /** Check IF $option_select[$i]['title'] is defined : */
                    if ($option_select[$i]['title'] != undefined || $option_select[$i]['title'] != null || $option_select[$i]['title'] != '' || $option_select[$i]['title'] != "") {
                        $title_option = $option_select[$i]['title'];
                    }
                    if ($option_select[$i]['title'] == undefined || $option_select[$i]['title'] == null || $option_select[$i]['title'] == '' || $option_select[$i]['title'] == "") {
                        $title_option = 'undefined';
                    }

                    /** Create Option Select : */
                    $result_select += '<option'+$id_option+$class_option+$attr_option+$style_option+$value_option+'>'+$name_select+'</option>';

                    /** Auto Increment : */
                    $i_opt++;
                } /** End of while loop to Create Option Select. */

            } /** End of Check IF $config_select['option'] is define. */

            /** Check IF $config_select['option'] is undefined : */
            if ($config_select['option'] == undefined || $config_select['option'] == null || $config_select['option'] == '' || $config_select['option'] == "") {
                console.error('Index option select is undefined');
                $result = 0;
            } /** End of Check IF $config_select['option'] is undefined. */

            /** Ending FORM Select : */
            $result_select += '</select>';

            /** Check IF $selector is defined : */
            if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                /** Switch for conditions $selector['place : */
                switch ($selector['place']) {
                /** Case for $selector['place == 'append' : */
                    case 'append' :
                        $($selector['place']).append($result_select);
                        break;

                /** Case for $selector['place == 'replace' : */
                    case 'replace' :
                        $($selector['place']).html($result_select);
                        break;
                }
                /** End of switch for conditions $selector['place. */

                /** Placing result condition into variable $result : */
                $result = 1;

            } /** End of Check IF $selector is defined. */

            /** Check IF $selector is undefined : */
            if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {

                /** Placing result form select into variable $result : */
                $result = $result_select;

            } /** End of Check IF $selector is undefined. */

        } /** End of Check IF $config is defined. */

        /** Check IF $config is undefined : */
        if ($config == undefined || $config == null || $config == '' || $config == "") {
            console.error('Config FORM Select is undefined');
        } /** End of Check IF $config is undefined. */

        /** Return Result : */
        return $result;
    },
    /** End of For FORM Select.
     * ===================================================================================================== */

    /** For option FORM Select :
     * -----------------------------------------------------------
     *
     * Format Object $config :
     * -------------------------------------
     * Object {
     *      {
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *          'value' : '',
     *          'title' : '',
     *      },
     * }
     *
     * Format Object $selector :
     * -------------------------------------
     * Object {
     *      'selector' : '',
     *      'place' : '',
     * }
     *
     * @param $config {object} Variable yang berisi object config untuk membuat Option SELECT.
     * @param $selector {object} Variable yang berisi object config untuk menempatkan hasil pembuatan Option SELECT.
     * @param $callback {function} Variable yang function callback;
     */
    NKTI_FORM_option_select: function ($config, $selector, $callback) {

        /** Define variable will be used in this function : */
        var $config_option, $result_option = '', $result;

        /** Check IF $config is defined : */
        if ($config != undefined || $config != null || $config != '' || $config != "") {

            /** Define variable for Config Option FORM Select : */
            $config_option = $config;

            /** Define variable for attribute option FORM Select : */
            var $id_option, $class_option, $attr_option, $style_option, $value_option, $title_option;

            /** Prepare while loop to Create Option FORM Select : */
            var $i = 0;
            var $until_loop = $config_option.length;

            /** While loop to Create Option FORM Select : */
            while ($i < $until_loop)
            {
                /** Check FOR $config_option[$i]['id'] is defined : */
                if ($config_option[$i]['id'] != undefined || $config_option[$i]['id'] != null || $config_option[$i]['id'] != '' || $config_option[$i]['id'] != "") {
                    $id_option = ' id="' + $config_option[$i]['id'] + '" ';
                }
                if ($config_option[$i]['id'] == undefined || $config_option[$i]['id'] == null || $config_option[$i]['id'] == '' || $config_option[$i]['id'] == "") {
                    $id_option = '';
                }

                /** Check FOR $config_option[$i]['class'] is defined : */
                if ($config_option[$i]['class'] != undefined || $config_option[$i]['class'] != null || $config_option[$i]['class'] != '' || $config_option[$i]['class'] != "") {
                    $class_option = ' class="' + $config_option[$i]['class'] + '" ';
                }
                if ($config_option[$i]['class'] == undefined || $config_option[$i]['class'] == null || $config_option[$i]['class'] == '' || $config_option[$i]['class'] == "") {
                    $class_option = '';
                }

                /** Check FOR $config_option[$i]['attr'] is defined : */
                if ($config_option[$i]['attr'] != undefined || $config_option[$i]['attr'] != null || $config_option[$i]['attr'] != '' || $config_option[$i]['attr'] != "") {
                    $attr_option = ' ' + $config_option[$i]['attr'] + ' ';
                }
                if ($config_option[$i]['attr'] == undefined || $config_option[$i]['attr'] == null || $config_option[$i]['attr'] == '' || $config_option[$i]['attr'] == "") {
                    $attr_option = '';
                }

                /** Check FOR $config_option[$i]['style'] is defined : */
                if ($config_option[$i]['style'] != undefined || $config_option[$i]['style'] != null || $config_option[$i]['style'] != '' || $config_option[$i]['style'] != "") {
                    $style_option = ' style="' + $config_option[$i]['style'] + '" ';
                }
                if ($config_option[$i]['style'] == undefined || $config_option[$i]['style'] == null || $config_option[$i]['style'] == '' || $config_option[$i]['style'] == "") {
                    $style_option = '';
                }

                /** Check FOR $config_option[$i]['value'] is defined : */
                if ($config_option[$i]['value'] != undefined || $config_option[$i]['value'] != null || $config_option[$i]['value'] != '' || $config_option[$i]['value'] != "") {
                    $value_option = ' value="' + $config_option[$i]['value'] + '" ';
                }
                if ($config_option[$i]['value'] == undefined || $config_option[$i]['value'] == null || $config_option[$i]['value'] == '' || $config_option[$i]['value'] == "") {
                    $value_option = '';
                }

                /** Check FOR $config_option[$i]['title'] is defined : */
                if ($config_option[$i]['title'] != undefined || $config_option[$i]['title'] != null || $config_option[$i]['title'] != '' || $config_option[$i]['title'] != "") {
                    $title_option = $config_option[$i]['title'];
                }
                if ($config_option[$i]['title'] == undefined || $config_option[$i]['title'] == null || $config_option[$i]['title'] == '' || $config_option[$i]['title'] == "") {
                    $title_option = 'undefined';
                    console.error('Title Option FORM Select is undefined');
                }

                /** Create option FORM Select : */
                $result_option += '<option'+$id_option+$class_option+$attr_option+$style_option+$value_option+'>'+$title_option+'</option>';

                /** Auto Increment : */
                $i++;

            } /** End of while loop to Create Option FORM Select. */

            /** Check IF $selector is defined : */
            if ($selector != undefined || $selector != null || $selector != '' || $selector != "") {

                /** Switch for conditions $selector['place'] : */
                switch ($selector['place']) {

                    /** Case for $selector['place'] == 'append' : */
                    case 'append' :
                        $($selector['selector']).append($result_option).each(function() {
                            if (typeof $callback == "function") {
                                // apply() sets the meaning of "this" in the callback
                                $callback.apply();
                            }
                        });
                        break;

                    /** Case for $selector['place'] == 'replace' : */
                    case 'replace' :
                        $($selector['selector']).html($result_option).each(function() {
                            if (typeof $callback == "function") {
                                // apply() sets the meaning of "this" in the callback
                                $callback.apply();
                            }
                        });
                        break;

                } /** End of switch for conditions $selector['place']. */

                /** Define result this condition : */
                $result = 1;

            } /** End of Check IF $selector is defined. */

            /** Check IF $selector is undefined : */
            if ($selector == undefined || $selector == null || $selector == '' || $selector == "") {

                /** Placing result create option FORM Select into variable $result : */
                $result = $result_option;

            } /** End of Check IF $selector is undefined. */

        } /** End of Che+ck IF $config is defined. */

        /** Check IF $config is undefined : */
        if ($config == undefined || $config == null || $config == '' || $config == "") {
            console.error('Config Option FORM Select is undefined');
            $result = 0;
        } /** End of Check IF $config is undefined. */

        /** Return Result : */
        return $result;
    },
    /** End of For option FORM Select.
     * ===================================================================================================== */

    /** For FORM Input Radio :
     * -----------------------------------------------------------
     *
     * Format Object $config :
     * -------------------------------------
     * object {
     *      {
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *          'name' : '',
     *          'value' : '',
     *          'title' : '',
     *          'wrap' : {
     *              'start' : '',
     *              'end' : ''
     *          },
     *      }
     * }
     *
     * @param $config {object} Variable yang berisi object config untuk membuat FORM Input radio.
     * @param $selector {object} Variable yang berisi object config untuk menempatkan hasil pembuatan
     *                           FORM Input Radio.
     */
    NKTI_FORM_input_radio: function ($config, $selector) {

        /** Define variable will be used in this function : */
        var $config_radio, $result_radio, $result;

        /**  */

    }
    /** End of For FORM Input Radio.
     * ===================================================================================================== */

});
/** End of Form Pattern.
 * ===================================================================================================== */