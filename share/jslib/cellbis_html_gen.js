/*!
 * Filename : cellbis_html_gen.min.js
 * Author: Achmad Yusri Afandi (yusrideb@cpan.org)
 * Date Create : 12/22/17 4:02 PM
 */

(function() {
  "use strict";
  
  window.CellBIS_html_gen = {
    
    /** Attribute : */
    tag_singleton: [
      'input',
      'img',
      'area',
      'base',
      'br',
      'command',
      'hr',
      'keygen',
      'link',
      'meta',
      'param',
      'source',
      'track',
      'wbr',
      'br'
    ],
    data_tag: '',
    type_target: 'string',
    target_tag: {},
    data_html: '',
    
    /**
     * Main object function for generate XML Tag :
     *
     * Format Object data_json :
     * ----------------------------------
     * object {}
     *
     * Format Array data_json :
     * ----------------------------------
     * Array []
     *
     * @param {object}          data_json
     * @param {string|object}   target
     * @returns {string}
     * @constructor
     */
    init: function(data_json, target) {
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      // For Target Tag :
      if (js_utils.check_is_defined(target)) {
        if (typeof target === "object") {
          this.type_target = 'object';
          this.target_tag = target;
        } else {
          this.type_target = 'string';
          this.target_tag = target;
        }
      } else {
        this.type_target = '';
        this.target_tag = '';
      }
      
      if (js_utils.check_is_defined(data_json) && typeof data_json === "object") {
        if (Array.isArray(data_json)) {
          this.data_html = this.array_type(data_json);
        } else {
          this.data_html = this.generate(data_json);
        }
      }
      return this;
    },
    
    /**
     * Function for set target place, result of HTML generator
     *
     * @param   {string|object}   target
     * @returns {*}
     */
    set_target: function(target) {
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      // For Target Tag :
      if (js_utils.check_is_defined(target)) {
        if (typeof target === "object") {
          this.type_target = 'object';
          this.target_tag = target;
        } else {
          this.type_target = 'string';
          this.target_tag = target;
        }
      } else {
        this.type_target = '';
        this.target_tag = '';
      }
      return this;
    },
    
    /**
     * Function for set data json to generate HTML
     *
     * @param   {object}            data_json
     * @returns {*}
     */
    set: function(data_json) {
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      if (js_utils.check_is_defined(data_json) && typeof data_json === "object") {
        if (Array.isArray(data_json)) {
          this.data_html = this.array_type(data_json);
        } else {
          this.data_html = this.generate(data_json);
        }
      }
      return this;
    },
    
    /**
     * Function for generate html for object array :
     *
     * Format Array data_json :
     * ----------------------------------
     * Array [
     *    {
     *      'tag' : '', # Tag name,
     *      'content' : '', # Content of tag html,
     *      'child' : [
     *          {
     *            'tag' : '', # Tag name,
     *            'content' : '', # Content of tag html,
     *            'child' : [], # same this object, recursive
     *          }
     *      ], # child xml tag,
     *    }
     * ]
     *
     * @param data_json
     * @returns {string}
     */
    array_type: function(data_json) {
      
      var data_tag = '';
      
      if (data_json.length > 1) {
        var i = 0;
        var until = data_json.length;
        while (i < until) {
          data_tag += this.generate(data_json[i]);
          i++;
        }
      } else {
        if (data_json.length !== 0) {
          data_tag = this.generate(data_json[0]);
        }
      }
      
      return data_tag;
    },
    
    /**
     * Function for generate single HTML tag.
     *
     * Format Object data_json :
     * ----------------------------------------
     * object {
     *      'tag' : '', # Tag name,
     *      'contents' : '', # Content of tag html,
     *      'child' : [], # call function 'this.array_type'
     * }
     *
     * Format Object data_json for 'input' :
     * ----------------------------------------
     * object {
     *    'id' : '',
     *    'class' : '',
     *    'style' : '',
     *    'name' : '',
     *    'value' : '',
     * }
     *
     * @param data_json
     * @returns {string}
     */
    generate: function(data_json) {
      var result = '';
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      if (js_utils.check_is_defined_obj(data_json, 'tag')) {
        
        // Declare variable :
        var prop = Object.keys(data_json);
        var i = 0, len = prop.length;
        var tag_attr;
        var data_attr = '';
        
        // To Check if tag is "Singleton"
        var tag_name = data_json['tag'];
        while (i < len) {
          if (js_utils.check_is_defined_obj(data_json, prop[i])) {
            tag_attr = prop[i];
            if (tag_attr !== 'attr' && tag_attr !== 'contents' && tag_attr !== 'tag' && tag_attr !== 'child' && tag_attr !== '') {
              data_attr += tag_attr+'="'+data_json[prop[i]]+'" ';
            }
            if (tag_attr === 'attr') {
              data_attr += data_json[prop[i]]
            }
          }
          i++;
        }
        
        if (js_utils.inArray(tag_name, this.tag_singleton) !== -1) {
          result = '<'+tag_name+' '+data_attr+'/>'
        } else {
          result = '<'+tag_name+' '+data_attr+'>'+'';
          
          if (js_utils.check_is_defined_obj(data_json, 'contents')) {
            if (js_utils.check_is_defined_obj(data_json, 'child')) {
              if (Array.isArray(data_json['child'])) {
                result += data_json['contents'];
                result += this.array_type(data_json['child']);
              }
            } else {
              result += data_json['contents'];
            }
          } else {
            if (js_utils.check_is_defined_obj(data_json, 'child')) {
              if (Array.isArray(data_json['child'])) {
                result += this.array_type(data_json['child']);
              }
            }
          }
          
          result += '</'+tag_name+'>';
        }
      } else {
        console.log('property "tag" is undefined')
      }
      
      return result;
    },
    render: function() {
      var result;
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      if (this.type_target === 'object') {
        var target = this.target_tag;
        if (js_utils.check_is_defined_obj(target, 'selector') && js_utils.check_is_defined_obj(target, 'type')) {
          var $target_selector;
          var selector = target['selector'];
          var type = target['type'];
          $target_selector = document.querySelector(selector);
          if (type === 'append') {
            $target_selector.insertAdjacentHTML('beforeend', this.data_html);
            // $(selector).append(this.data_html);
            // $target_selector.appendChild(this.data_html);
          }
          if (type === 'replace') {
            $target_selector.innerHTML = this.data_html;
          }
          result = 1;
        } else {
          result = this.data_html;
        }
      } else {
        if (js_utils.check_is_defined(this.type_target)) {
          // var target1 = this.target_tag;
          var $target_selector1 = document.querySelector(this.target_tag);
          $target_selector1.innerHTML = this.data_html;
          result = 1;
        } else {
          result = this.data_html;
        }
      }
      
      return result;
    }
  }
})();