/*!
 * Filename: cellbis.web.min.js
 * Achmad Yusri Afandi (yusrideb@cpan.org) on 11 Apr 2017.
 * Last Revision on 18 Des 2017.
 */

/** Create Prototype For Remove index of array : */
Array.prototype.hapus = function ($indexArr) {
  
  /** Define variable will be used in this funtion prototype array : */
  var $for_check_index, $arg = arguments;
  
  /** Prepare while loop to Remove Index of array : */
  var i = 0;
  
  /** While loop to Remove Index of array : */
  while (i < this.length) {
    
    /** While loop to check index of array : */
    while (($for_check_index = this.indexOf($indexArr)) !== -1) {
      this.splice($for_check_index, 1);
    }
    
    /** Auto Increment : */
    i++;
  }
  /** End of while loop to Remove Index of array. */
  
  /** Return Result : */
  return this;
};
/** End of Create Prototype For Remove index of array. */

/** Create Prototype for Determine value array : */
Array.prototype.contains_choice_ans = function () {
  var i = this.length;
  while (i--) {
    if (this[i] !== 0 || this[i] !== 2 || this[i] !== 3) {
      return true;
    }
  }
  return false;
};
/** End of Create Prototype for Determine value array. */

/** For Remove Duplicate between Array :
 * --------------------------------------------------------------
 * For Example :
 * var array0 = [
 *  '05', '06', '07', '08', '09', '10', '11', '12',
 *  '06', '07', '07', '09',
 *  '12', '05', '13', '18'
 *  ]
 * var array1 = ['05', '06', '07', '08', '09', '10', '11', '12'];
 * var array2 = ['06', '07', '07', '09'];
 * var array3 = ['12', '05', '13', '18'];
 *
 * var my_array1 = array0.remove_duplicates();
 * var my_array2 = array1.remove_duplicates(array2);
 * var my_array3 = array1.concat(array2).remove_duplicates();
 * var my_array4 = array1.concat(array2).remove_duplicates(array3);
 */
Array.prototype.remove_duplicates = function (arr) {
  var a = arr !== undefined ? this.concat(arr) : this;
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
};

/** For Exclude element array2 if element in array1 is exists.
 * ---------------------------------------------------------------
 * Source From :
 * --------------------------------------
 * https://stackoverflow.com/questions/19957348/javascript-arrays-remove-all-elements-contained-in-another-array/37024351#37024351
 *
 * @param list
 * @return {*[]}
 */
Array.prototype.exclude = function (list) {
  return this.filter(function (el) {
    return list.indexOf(el) < 0;
  })
};

(function () {
  "use strict";
  
  window.CellBIS_enkripsi = {
    Encoder: function ($plain_text, $plankey) {
      // Get NumLoop :
      var $num1 = $plankey['num1'];
      var $num11 = $num1 * 2;
      var $num2 = $plankey['num2'];
      var $num21 = $num2 * 2;
      var $key_enc = $plankey[2] + 3;
      
      // Convert string to array :
      var $r_pltxt = this.random($plain_text, $num1, $num2);
      var $arr_str = $r_pltxt.split("");
      
      // While loop to encoder temp1 :
      var $i = 0;
      var $until = $arr_str.length;
      var temp1 = [];
      var pre1;
      while ($i < $until) {
        pre1 = $arr_str[$i].charCodeAt();
        pre1 = pre1 + $key_enc;
        
        temp1[$i] = pre1.toString(16);
        // Auto Increment :
        $i++;
      }
      
      // While loop to encoder temp2 :
      var $e1 = ['J', 'i', 'o', 'R', 'p', 'I', 'W', 'q', 'M', 'x'];
      var $e2 = {a: "h", b: "j", c: "k", d: "v", e: "t", f: "n"};
      var $i2 = 0;
      var $until2 = temp1.length;
      var temp2 = '', temp21 = [], pre2, pre21;
      while ($i2 < $until2) {
        pre2 = temp1[$i2].match(/\d/);
        pre2 = temp1[$i2].replace(/\d/, $e1[pre2]);
        
        pre2 = pre2.replace(/a/, $e2["a"]);
        pre2 = pre2.replace(/b/, $e2["b"]);
        pre2 = pre2.replace(/c/, $e2["c"]);
        pre2 = pre2.replace(/d/, $e2["d"]);
        pre2 = pre2.replace(/e/, $e2["e"]);
        pre2 = pre2.replace(/f/, $e2["f"]);
        pre21 = pre2.match(/\d/);
        pre2 = pre2.replace(/\d/, $e1[pre21]);
        temp21[$i2] = pre2;
        temp2 += pre2;
        
        $i2++;
      }
      
      // Return :
      // return $data;
      return this.random(temp2, $num11, $num21);
    },
    Decoder: function ($chiper_txt, $plankey) {
      // Get NumLoop :
      var $num1 = $plankey['num1'];
      var $num11 = $num1 * 2;
      var $num2 = $plankey['num2'];
      var $num21 = $num2 * 2;
      var $key_enc = $plankey[2] + 3;
      
      // Extract Final Random :
      var $chiper0 = this.extract_random($chiper_txt, $num11, $num21);
      
      // While loop to decoder temp0 :
      var $d1 = {J: "0", i: "1", o: "2", R: "3", p: "4", I: "5", W: "6", q: "7", M: "8", x: "9"};
      var $pre_chiper = $chiper0.split("");
      var $i1 = 0;
      var $until1 = $pre_chiper.length;
      var temp0 = [], match_d1, pre1_chiper, temp01 = '';
      while ($i1 < $until1) {
        pre1_chiper = $pre_chiper[$i1];
        match_d1 = pre1_chiper.replace($pre_chiper[$i1], $d1[$pre_chiper[$i1]]);
        if (match_d1 !== undefined && match_d1 !== "undefined") {
          temp0[$i1] = match_d1;
          temp01 += match_d1;
        } else {
          temp0[$i1] = $pre_chiper[$i1];
          temp01 += pre1_chiper[$i1];
        }
        $i1++;
      }
      
      // While loop to decoder temp1 :
      var $d2 = {h: "a", j: "b", k: "c", v: "d", t: "e", n: "f"};
      var $i2 = 0;
      var $until2 = temp0.length;
      var temp1 = [], match_dl1, pre2_chiper, temp11 = '';
      while ($i2 < $until2) {
        pre2_chiper = temp0[$i2];
        match_dl1 = pre2_chiper.replace(temp0[$i2], $d2[temp0[$i2]]);
        if (match_dl1 !== undefined && match_dl1 !== "undefined") {
          temp1[$i2] = match_dl1;
          temp11 += match_dl1;
        } else {
          temp1[$i2] = temp0[$i2];
          temp11 += temp0[$i2];
        }
        $i2++;
      }
      //
      var $pre_split = new RegExp('.{1,' + 2 + '}', 'g');
      var $arr_chiper = temp11.match($pre_split);
      
      // While loop to decoder temp2 :
      var $i3 = 0;
      var $until3 = $arr_chiper.length;
      var temp2 = "", temp21 = [], pre2, pre3;
      while ($i3 < $until3) {
        pre2 = parseInt($arr_chiper[$i3], 16);
        pre2 = pre2 - $key_enc;
        pre3 = String.fromCharCode(pre2);
        temp21[$i3] = pre3;
        temp2 += pre3;
        $i3++;
      }
      
      // Extra Loop :
      // Return :
      // document.writeln(temp21);
      return this.extract_random(temp2, $num1, $num2);
    },
    random: function ($plain_text, $cOdd2even, $cEven2odd) {
      // Define scalar for place result :
      var $data;
      
      // Get length $plain_text :
      var $len_str = $plain_text.length;
      
      // Check length, for odd :
      var $str;
      if (($len_str % 2) === 0) {
        $str = $plain_text;
      }
      // Check length, for Even :
      else {
        $str = $plain_text + '|';
      }
      
      // Action Random String :
      $data = this.loop_odoe2eood($str, $cOdd2even, $cEven2odd);
      
      // Return :
      return $data;
    },
    extract_random: function ($chiper, $cOdd2even, $cEven2odd) {
      // Define scalar for place result :
      var $data;
      
      // Action Extract Random String :
      var $random = this.extractLoop_odoe2eood($chiper, $cOdd2even, $cEven2odd);
      
      // Check Match Character :
      var $match_char = $random.match(/\|$/);
      if ($match_char !== undefined && $match_char !== 'undefined') {
        $data = $random.replace(/\|$/, '');
      } else {
        $data = $random;
      }
      
      // Return :
      return $data;
    },
    getKey_enc: function ($plan_text) {
      // Define scalar to prepare :
      var $data = [];
      var $arrStr = $plan_text.split("");
      
      // While loop to get key enc :
      var $i = 0;
      var $len_arr = $arrStr.length;
      var $temp1 = 0;
      while ($i < $len_arr) {
        $temp1 += $arrStr[$i].charCodeAt();
        $i++;
      }
      
      // Get pass number :
      var $ip = 1;
      var $temp2 = $temp1;
      while ($temp1) {
        $temp2 = $temp2 / 2;
        if ($temp2 > 10 && $temp2 < 50) {
          $temp2 = $temp2 + '';
          break;
        }
        // console.log('Jumlah Loop : '+$ip);
        $ip++;
      }
      var $final;
      $final = $temp2.replace(/[.]\d+/g, '');
      $final = $final.replace(/1/, 3);
      
      // Place to array :
      var $split = $final.split("");
      $data['num1'] = $split[0];
      $data['num2'] = $split[1];
      $data['key_enc'] = $final;
      // Return result :
      return $data;
    },
    odd_index: function ($string) {
      // Define scalar for place result :
      var $data;
      $data = '';
      // Convert Sting to Array :
      var $arrStr = $string.split("");
      var $i = 0;
      var $until = $arrStr.length;
      while ($i < $until) {
        // Check IF $i % 2 === 1 :
        var $dataOdd = ($i % 2);
        if ($dataOdd === 1) {
          $data += $arrStr[$i];
        }
        // Ato Increment :
        $i++;
      }
      // console.log('in "odd_index" function : '+$data);
      // Return :
      return $data;
    },
    even_index: function ($string) {
      // Define scalar for place result :
      var $data = '';
      // Convert string to array :
      var $arrStr = $string.split('');
      var $i = 0;
      var $until = $arrStr.length;
      while ($i < $until) {
        // Check IF $i & 2 === 0 :
        var $dataEven = ($i % 2);
        if ($dataEven === 0) {
          $data += $arrStr[$i];
        }
        // Auto Increment :
        $i++;
      }
      
      // console.log('in "even_index" function : '+$data);
      // Return :
      return $data;
    },
    odd2even: function ($string) {
      // Define scalar for get ood and even index :
      var $odd_index = this.odd_index($string);
      var $even_index = this.even_index($string);
      var r_combine = $odd_index + $even_index;
      
      // console.log('in "odd2even" func : '+r_combine);
      // Return result :
      return $odd_index + $even_index;
    },
    even2odd: function ($string) {
      // Define scalar for get even and odd index :
      var $even_index = this.even_index($string);
      var $odd_index = this.odd_index($string);
      
      // console.log('in "odd2even" func : '+r_combine);
      // Return result :
      return $even_index + $odd_index;
    },
    action_loop_odoe2eood: function ($count_loop, $str, $type_rand) {
      // Define scalar will be used in this function :
      var $data = $str;
      var $i = 0;
      // Check $type_rand === 'even2odd' :
      if ($type_rand === 'even2odd') {
        while ($i < $count_loop) {
          $data = this.even2odd($data);
          $i++;
        }
      }
      // Check $type_rand !== 'odd2even' :
      else if ($type_rand === 'odd2even') {
        while ($i < $count_loop) {
          $data = this.odd2even($data);
          $i++;
        }
      }
      // Return :
      return $data;
    },
    loop_odoe2eood: function ($str, $count_odd2even, $count_even2odd) {
      // Define scalar for use this function :
      var $data;
      var $result = $str;
      // Check $count_odd2even and $count_even2odd :
      if ($count_odd2even !== 0 && $count_even2odd !== 0) {
        var $i_1 = 0;
        while ($i_1 < $count_odd2even) {
          $result = this.odd2even($result);
          $result = this.action_loop_odoe2eood($count_even2odd, $result, 'even2odd');
          $i_1++;
        }
        // console.log('true 2');
      } else if ($count_odd2even !== 0 && $count_even2odd === 0) {
        var $i_2 = 0;
        while ($i_2 < $count_odd2even) {
          $result = this.odd2even($result);
          $i_2++;
        }
        // console.log('true 01');
      } else if ($count_odd2even === 0 && $count_even2odd !== 0) {
        var $i_3 = 0;
        while ($i_3 < $count_even2odd) {
          $result = this.even2odd($result);
          $i_3++;
        }
        // console.log('true 10');
      }
      // Return :
      return $result;
    },
    extract_odd2even: function ($str) {
      // Define scalar for place result :
      var $data = '';
      
      // Prepare Extract :
      var $odd_index = this.odd_index($str);
      var $even_index = this.even_index($str);
      var $len_odd = $odd_index.length;
      var $len_even = $even_index.length;
      var $forArr_odd = $str.substr(0, $len_odd);
      var $forArr_even = $str.substr($len_odd, $len_even);
      var $arr_odd = $forArr_odd.split("");
      var $arr_even = $forArr_even.split("");
      
      // Check IF length Odd < length Even :
      if ($len_odd < $len_even) {
        
        // While loop to Extract Odd 2 Even :
        var $i = 0;
        var $string_odd;
        while ($i < $len_odd) {
          
          // Check IF $i !== $len_even :
          if ($i !== $len_even) {
            if ($len_odd[$i] !== undefined && $len_odd[$i] !== 'undefined') {
              $string_odd = $arr_odd[$i];
            }
            $data += $arr_even[$i];
            $data += $string_odd;
          }
          
          // Check IF $i === $len_even :
          else if ($i === $len_even) {
            $data += $arr_even[$i];
          }
          // Auto Increment :
          $i++;
        }
        // console.log('in function "extract_odd2even" condis = $len_odd < $len_even : '+$data);
      }
      else if ($len_even === $len_odd) {
        // While loop to Extrac odd2even :
        var $i_oe = 0;
        while ($i_oe < $len_even) {
          $data += $arr_even[$i_oe] + $arr_odd[$i_oe];
          // Auto Increment :
          $i_oe++;
        }
        // console.log('in function "extract_odd2even" condis = $len_odd === $len_even : '+$data);
      }
      // Return :
      return $data;
    },
    extract_even2odd: function ($str) {
      // Define scalar for place result :
      var $data = "";
      
      // Prepare Extract :
      var $odd_index = this.odd_index($str);
      var $even_index = this.even_index($str);
      var $len_odd = $odd_index.length;
      var $len_even = $even_index.length;
      var $forArr_even = $str.substr(0, $len_even);
      var $forArr_odd = $str.substr($len_even, $len_odd);
      var $arr_even = $forArr_even.split("");
      var $arr_odd = $forArr_odd.split("");
      
      // Check IF length Odd < length Even :
      if ($len_odd < $len_even) {
        // While loop to Extract Even 2 odd :
        var $i = 0;
        var $str_odd;
        var $str_even;
        while ($i < $len_even) {
          // Check IF $arr_odd[$i] is exist :
          if ($arr_odd[$i] !== undefined && $arr_odd[$i] !== 'undefined') {
            $str_odd = $arr_odd[$i];
          }
          if ($arr_even[$i] !== undefined && $arr_even[$i] !== 'undefined') {
            $str_even = $arr_even[$i];
          }
          
          // Place result :
          $data += $str_even;
          $data += $str_odd;
          
          // Auto Increment :
          $i++;
        }
        // console.log('in function "extract_even2odd" condis = $len_odd < $len_even : '+$data);
      }
      // Check IF length Odd === length Even :
      else if ($len_odd === $len_even) {
        // While loop to Extract Odd 2 Even :
        var $i_oe = 0;
        while ($i_oe < $len_even) {
          
          // Place result :
          $data += $arr_even[$i_oe] + $arr_odd[$i_oe];
          
          // Auto Increment :
          $i_oe++;
        }
        // console.log('in function "extract_even2odd" condis = $len_odd === $len_even : '+$data);
      }
      // Return :
      return $data;
    },
    loopExtract_eood2odoe: function ($count_loop, $str, $type_rand) {
      // Define scalar to use in this function :
      var $result = $str;
      // For $type_rand === 'even2odd' :
      if ($type_rand === 'even2odd') {
        // While loop to extract random loop even2odd :
        var $i_1 = 0;
        while ($i_1 < $count_loop) {
          $result = this.extract_even2odd($result);
          $i_1++;
        }
        // console.log('in "loopExtract_eood2odoe" func = "even2odd" : '+$result);
      }
      // For $type_rand === 'odd2even' :
      else if ($type_rand === 'odd2even') {
        // While loop to extract random odd2even :
        var $i_2 = 0;
        while ($i_2 < $count_loop) {
          $result = this.extract_odd2even($result);
          $i_2++;
        }
        // console.log('in "loopExtract_eood2odoe" func = "odd2even" : '+$result);
      }
      // Return :
      return $result;
    },
    extractLoop_odoe2eood: function ($str, $count_odd2even, $count_even2odd) {
      // Define scalar to use in this function :
      var $result;
      var $i = 0;
      
      // Check IF $count_odd2even !== 0 AND $count_even2odd !== 0 :
      if ($count_odd2even !== 0 && $count_even2odd !== 0) {
        // While loop to extract random str odd2even and even2odd :
        $result = $str;
        var $i_1 = 0;
        while ($i_1 < $count_odd2even) {
          $result = this.loopExtract_eood2odoe($count_even2odd, $result, 'even2odd');
          $result = this.extract_odd2even($result);
          $i_1++;
        }
        // console.log('true 2 extract');
        // Return :
        return $result;
      }
      
      // Check IF $count_odd2even !== 0 && $count_even2 === 0 :
      else if ($count_odd2even !== 0 && $count_even2odd === 0) {
        // While loop to extract random str odd2even :
        $result = $str;
        var $i_2 = 0;
        while ($i_2 < $count_odd2even) {
          $result = this.extract_odd2even($result);
          if ($i_2 === ($count_odd2even - 1)) {
            break;
          }
          $i_2++;
        }
        // console.log('true 10 extract');
        // Return :
        return $result;
      }
      
      // Check IF $count_odd2even === 0 && $count_even2 !== 0 :
      else if ($count_odd2even === 0 && $count_even2odd !== 0) {
        // While loop to extract random str even2odd :
        $result = $str;
        var $i_3 = 0;
        while ($i_3 < $count_even2odd) {
          $result = this.extract_even2odd($result);
          if ($i_3 === ($count_even2odd - 1)) {
            break;
          }
          $i_3++;
        }
        // console.log('true 01 extract');
        // Return :
        return $result;
      }
    }
  };
})();

(function () {
  "use strict";
  window.CellBIS_datetime = {
    /**
     * Function untuk konversi bulan dan nama hari.
     * ---------------------------------------------------------
     *
     * Format type :
     * ---------------------------------
     * d : Nama Hari Lengkap
     * D : Nama Hari singkat
     * m : Nama bulan lengkap
     * M : Nama bulan singkat
     *
     * @param type
     * @param num_date
     */
    language: function (type, num_date) {
      var $result = '';
      
      // num_date = num_date.replace(/^(0)/, '');
      
      var month_list = {
        1: 'Januari',
        2: 'Februari',
        3: 'Maret',
        4: 'April',
        5: 'Mei',
        6: 'Juni',
        7: 'Juli',
        8: 'Agustus',
        9: 'September',
        10: 'Oktober',
        11: 'November',
        12: 'Desember',
      };
      var month_list_short = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'Mei',
        6: 'Jun',
        7: 'Jul',
        8: 'Agt',
        9: 'Sep',
        10: 'Okt',
        11: 'Nov',
        12: 'Des',
      };
      var day_list = {
        1: 'Minggu',
        2: 'Senin',
        3: 'Selasa',
        4: 'Rabu',
        5: 'Kamis',
        6: 'Jum\'at',
        7: 'Sabtu'
      };
      
      switch (type) {
        case 'month' :
          if (month_list[num_date] !== undefined) {
            $result = month_list[num_date];
          }
          break;
        case 'mont-short' :
          if (month_list_short[num_date] !== undefined) {
            $result = month_list_short[num_date];
          }
          break;
        case 'day' :
          if (day_list[num_date] !== undefined) {
            $result = day_list[num_date];
          }
          break;
      }
      return $result;
    },
    lastday_ofmonth: function (date_string) {
    
    }
  };
  window.CellBIS_jsUtils = {
    
    /** For Initialization Method  :
     * -----------------------------------------------------------
     */
    init: function () {
      return this
    },
    /** For Check data
     * -----------------------------------------------------
     * Function for check value of data is empty
     *
     * @param data
     * @returns {number}
     */
    check_is_not_defined: function (data) {
      
      if (data === undefined && (data === '' || data === "")) {
        return 1;
      } else {
        return 0;
      }
    },
    /** For Check data
     * -----------------------------------------------------
     * Function for check value of data is not empty
     *
     * @param data
     * @returns {number}
     */
    check_is_defined: function (data) {
      
      if (data !== undefined && (data !== '' || data !== "")) {
        return 1;
      } else {
        return 0;
      }
    },
    /** For Check data
     * -----------------------------------------------------
     * Function for check value of data is empty
     *
     * @param {object} data
     * @param {string} prop
     * @returns {number}
     */
    check_is_not_defined_obj: function (data, prop) {
      
      if (data[prop] === undefined && (data[prop] === '' || data[prop] === "")) {
        return 1;
      } else {
        return 0;
      }
    },
    /** For Check data
     * -----------------------------------------------------
     * Function for check value of data is not empty
     *
     * @param {object} data
     * @param {string} prop
     * @returns {number}
     */
    check_is_defined_obj: function (data, prop) {
      
      if (data[prop] !== undefined && (data[prop] !== '' || data[prop] !== "")) {
        return 1;
      } else {
        return 0;
      }
    },
    
    /** For Check data
     * -----------------------------------------------------
     * Function for check value of data is not defined.
     *
     * @param type
     * @param data_check
     * @param for_match
     * @returns {number}
     */
    enumerate: function (type, data_check, for_match) {
      if (this.check_is_defined(data_check)) {
        
        if (typeof for_match === 'object') {
          if (Array.isArray(for_match)) {
            
            var $i = 0;
            var $until = for_match.length;
            var $true = [];
            var $false = [];
            
            if (type === 'true') {
              if (for_match.includes(data_check)) {
                return 1;
              } else {
                return 0;
              }
            }
            
            if (type === 'false') {
              if (!for_match.includes(data_check)) {
                return 1;
              } else {
                return 0;
              }
            }
            
          } else {
            console.error('CellBIS_jsUtils.enumerate -> param "for_match" is not object array !!!');
            return 0;
          }
          
        } else {
          console.error('CellBIS_jsUtils.enumerate -> param "for_match" is not object !!!');
          return 0;
        }
      } else {
        console.error('CellBIS_jsUtils.enumerate -> param "data_check" is not object !!!');
        return 0;
      }
    },
    /** For convert param string to forrmat FormData() :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk mengkonversi data param form
     * dari hasil function "element.serializeArray()"
     * ke format "FormData()".
     *
     * @param {array} $data_param
     */
    serializeArray_to_FormData: function ($data_param) {
      
      /** Define variabel : */
      var data_request = new FormData();
      
      var i;
      var $until = $data_param.length;
      for (i = 0; i < $until; i++) {
        var $name = $data_param[i]['name'];
        var $value = $data_param[i]['value'];
        data_request.append($name, $value);
        // console.log("name : "+$name);
        // console.log("value : "+$value);
      }
      return data_request;
    },
    /** For change data 'name' "serializeArray()" :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk mengubah name form
     * di hasil "serializeArray()".
     *
     * Format Object $data_param :
     * -----------------------------------------------------
     * object [
     *  { ... data form format from serializeArray() ... }
     * ]
     *
     * Format Object $data_change :
     * -----------------------------------------------------
     * object {
     *    'original' => '', (name to change)
     *    'replace' => '', (replacement name),
     *    'value' => '', (value if added)
     * }
     *
     * @param {Array} $data_param    Data orginal from serializeArray().
     * @param {object} $data_change  Object to change data.
     * @param {string} $type         Type data result form serializeArray() : (string || array)
     */
    serializeArray_change_name: function ($data_param, $data_change, $type) {
      
      /** Define variable will be used in this function : */
      var result = [];
      
      // console.log('serializeArray_change_name | START');
      // console.log($data_param);
      // console.log($data_change);
      // console.log('serializeArray_change_name | END');
      
      if ($type && $type === 'array') {
        var until = $data_param.length;
        var $value = '';
        for (var i = 0; i < until; i++) {
          if ($data_param[i]['name'] === $data_change['original']) {
            if ($data_change['value']) {
              $value = $data_change['value'];
            } else {
              $value = $data_param[i]['value'];
            }
            
            result.push({
              name: $data_change['replace'],
              value: $value
            });
          } else {
            result.push($data_param[i])
          }
        }
      }
      return result;
    },
    serializeArray_to_object: function ($data_source) {
      
      var $i = 0;
      var $until = $data_source.length;
      var $name = '';
      var $value = '';
      var $data_obj = {};
      while ($i < $until) {
        $name = $data_source[$i]['name'];
        $value = $data_source[$i]['value'];
        $data_obj[$name] = $value;
        $i++;
      }
      return $data_obj;
    },
    /** For Enter keypress detection :
     * -----------------------------------------------------------
     */
    Enter_keypress_detect: function (element, callback) {
      
      /** Define variable will be used in this function : */
      $(element).on('keypress', function (e) {
        var event = e || window.event;
        var charCode = event.which || event.keyCode;
        // console.log('Key Press : '+charCode)
        if (charCode === 13) {
          // console.log('Enter : '+charCode);
          callback.apply();
        }
      });
    },
    /** For Action "Insert_data_tag" :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk melakukan action dari
     * function "Insert_data_tag"
     *
     * @param selector_data
     * @param value_data
     * @param type_data
     * @param method_place
     * @returns {number}
     */
    Action_Insert_data_tag: function (selector_data, value_data, type_data, method_place) {
      
      // console.log('Action Insert tag');
      
      var $selector = '';
      
      switch (type_data) {
        case 'tag' :
          if (method_place === 'html') {
            if ($(selector_data).length) {
              $(selector_data).html(value_data);
            }
          }
          if (method_place === 'text') {
            if ($(selector_data).length) {
              $(selector_data).text(value_data);
            }
          }
          break;
        case 'input' :
          $(selector_data).val(value_data);
          // console.log('input '+selector_data);
          break;
        case 'select' :
          $selector = selector_data + ' option[value="' + value_data + '"]';
          if ($($selector).length) {
            $(selector_data).val(value_data);
          }
          // console.log('select '+selector_data);
          break;
        case 'textarea' :
          if (method_place === 'html') {
            if ($(selector_data).length) {
              $(selector_data).html(value_data);
            }
          }
          if (method_place === 'text') {
            if ($(selector_data).length) {
              $(selector_data).text(value_data);
            }
          }
          // console.log('textarea '+selector_data);
          break;
      }
      return 1;
    },
    /** For insert data text or html in tag :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk add data text atau html
     * dalam tag html.
     *
     * Format object data_arr :
     * --------------------------------------------------
     * object [
     *    {
     *      'selector' : '',
     *      'value' : '',
     *      'method' : '', ( Method of place data : text | html)
     *      'type' : '', ( type : tag || tag_single || input || select || textarea )
     *    },
     * ]
     *
     * Format type :
     * ---------------------------------------------------
     * tag = div, span, and similar
     * tag_single =
     * input = place data in attribute "value"
     * select place data with way activated option select.
     * textarea place data in inner html
     *
     * @param {object} data_arr
     * @returns {number} result
     *
     */
    Insert_data_tag: function (data_arr) {
      
      /** Define variable will be used in this function : */
      var result = 0;
      
      if (typeof data_arr !== "object") {
        console.error('data Parameter is undefined');
      }
      
      else {
        
        var value_data = '', selector_data, type_data, method_place = 'text';
        var $i = 0;
        var $until = data_arr.length;
        while ($i < $until) {
          if (this.check_is_not_defined(data_arr[$i]['type'])) {
            console.error('data type is not defined');
            break;
          }
          if (this.check_is_not_defined(data_arr[$i]['selector'])) {
            console.error('selector is not defined');
            break;
          }
          
          if (this.check_is_defined(data_arr[$i]['value'])) {
            value_data = data_arr[$i]['value'];
          }
          
          if (this.check_is_defined(data_arr[$i]['method'])) {
            method_place = data_arr[$i]['method'];
          }
          
          selector_data = data_arr[$i]['selector'];
          type_data = data_arr[$i]['type'];
          
          this.Action_Insert_data_tag(selector_data, value_data, type_data, method_place);
          
          $i++;
        }
        result = 1;
      }
      return result;
    },
    /**
     * Function yang berfungsi untuk membandingkan isi data form
     * untuk menetukan apakah data yang di input sama atau tidak.
     *
     * @param {Array} $source   # [ { name:'', value:'' }, { name:'', value:'' } ] source from xhr
     * @param {Array} $target   # [ { name:'', value:'' }, { name:'', value:'' } ] target from serializeArray()
     *
     * @returns {Array}         # [ { name:'', value:'' }, { name:'', value:'' } ]
     */
    compare_data_form_toVal: function ($source, $target) {
      
      var $data_result = [];
      
      // For check parameter :
      if (!$source) {
        console.error('parameter $source is undefined')
      }
      if (!$target) {
        console.error('parameter $target is undefined')
      }
      if ($source && typeof $source !== "object") {
        console.error('parameter $source is not object')
      }
      if ($target && typeof $target !== "object") {
        console.error('parameter $target is not object')
      }
      if ($source.length !== $target.length) {
        console.error('Value of array on data $source dan data $target must same');
      }
      
      var i, until = $source.length;
      for (i = 0; i < until; i++) {
        if ($source[i]['value'] != $target[i]['value']) {
          $data_result.push($target[i]);
          // console.log('value tidak sama - '+$source[i]['value']+' != '+$target[i]['value']);
        } else {
          // console.log('value sama - '+$source[i]['value']+' === '+$target[i]['value']);
        }
      }
      return $data_result;
    },
  
    /**
     * Function for check data in array :
     * -----------------------------------------------------
     * This object function from jQuery source.
     *
     * @param elem        To check data in Array
     * @param arrObj      Object Array for checking
     * @param prop        Property or Key Array
     * @returns {number}
     */
    inArray: function (elem, arrObj, prop) {
      var _arr = [];
      var indexOf = _arr.indexOf;
      return arrObj == null ? -1 : indexOf.call(arrObj, elem, prop);
    },
    
    Check_ISP_script: function () {
      var get_script_inDoc = document.scripts;
      var len_script = get_script_inDoc.length;
      var $i = 0;
      var $html = '';
      var result;
      while ($i < len_script) {
        $html = $(get_script_inDoc[$i]).html();
        if ($html.match(/\.uzone\.id.*/g)) {
          result = $(get_script_inDoc[$i]);
          break;
        }
        $i++;
      }
      return result;
    },
    Block_ISP_Inject: function () {
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      // Define time :
      var d = new Date();
      var time_stamp = d.getTime();
      
      if (location.protocol == "http:") {
        var $result = '';
        while (1) {
          if (js_utils.check_is_defined(this.Check_ISP_script())) {
            $result = this.Check_ISP_script();
            $result.remove();
            console.log('inject script ISP is removed !!!');
            break;
          }
          var getNow_Date = new Date();
          var curr_time = getNow_Date.getTime();
          if (time_stamp + (15 * 1000) >= curr_time) {
            break;
          }
        }
      }
    }
  };
  window.CellBIS_js = {
    AJAX_get: function ($url_request, $data_post, $x_reqs, $callback) {
      
      var $xhr;
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
      $xhr.open("GET", $url_request, true);
      
      // Set Header Request :
      var $x_request_with;
      if ($x_reqs !== '' || $x_reqs !== undefined || $x_reqs !== null) {
        $x_request_with = $x_reqs;
      } else {
        $x_request_with = 'normal';
      }
      // $xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      $xhr.setRequestHeader('X-Requested-With', $x_request_with);
      
      // Send Request :
      $xhr.send($data_post);
      //return false;
    },
    AJAX_post: function ($url_request, $data_post, $x_reqs, $callback) {
      
      var $xhr;
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
      var $x_request_with;
      if ($x_reqs !== '' || $x_reqs !== undefined || $x_reqs !== null) {
        $x_request_with = $x_reqs;
      } else {
        $x_request_with = 'normal';
      }
      // $xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      $xhr.setRequestHeader('X-Requested-With', $x_request_with);
      
      // Send Request :
      $xhr.send($data_post);
      //return false;
    },
    AJAX_post_with_false_callback: function ($url_request, $data_post, $x_reqs, $callback, $cb_false) {
      
      var $xhr;
      // Define XMLHttpRequest :
      if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        $xhr = new XMLHttpRequest();
      } else {
        // code for IE6, IE5
        $xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      
      $xhr.onreadystatechange = function () {
        // console.log($xhr.readyState);
        // console.log($xhr.status);
        if ($xhr.readyState === 4 && $xhr.status === 200) {
          if (typeof $callback === "function") {
            // apply() sets the meaning of "this" in the callback
            $callback.apply($xhr);
          }
        }
        else if ($xhr.readyState === 4 && $xhr.status === 404) {
          $cb_false.apply($xhr);
        }
      };
      
      // POST to URL Request :
      $xhr.open("POST", $url_request, true);
      
      // Set Header Request :
      var $x_request_with;
      if ($x_reqs !== '' || $x_reqs !== undefined || $x_reqs !== null) {
        $x_request_with = $x_reqs;
      } else {
        $x_request_with = 'normal';
      }
      // $xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      $xhr.setRequestHeader('X-Requested-With', $x_request_with);
      
      // Send Request :
      $xhr.send($data_post);
      //return false;
    },
    /**
     * @return {boolean}
     */
    AJAX_post_upload: function ($url_request, $data_post, $x_reqs, $function_progress, $callback) {
      
      var $xhr;
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
      
      // Event Progress Upload :
      $xhr.upload.addEventListener('progress', $function_progress, false);
      
      // POST to URL Request :
      $xhr.open("POST", $url_request, true);
      
      // Set Header Request :
      var $x_request_with;
      if ($x_reqs !== '' || $x_reqs !== undefined || $x_reqs !== null) {
        $x_request_with = $x_reqs;
      } else {
        $x_request_with = 'normal';
      }
      // $xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      $xhr.setRequestHeader('X-Requested-With', $x_request_with);
      // $xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      
      // Send Request :
      $xhr.send($data_post);
      return false;
    },
    Toastr: function ($code, $msg, $title, $timeout) {
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
    
    /** For Form Validation :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk melakukan validasi form.
     */
    Form_val: function (config) {
      
      /** Default config : */
      
      
    }
    /** End of For Form Validation.
     * ===================================================================================================== */
    
  };
  window.CellBIS_BrowserStorage = {
    /** For Return Cache :
     * -----------------------------------------------------------
     */
    init: function () {
      
      this.local_data = localStorage;
      
      return this;
      
    },
    /**
     * For add data localstorage :
     * @param key
     * @param value
     */
    add: function (key, value) {
      if (this.local_data) {
        this.local_data.setItem(key, value);
      }
    },
    /**
     * For get data localStorage
     * @param key
     * @returns {string | null | *}
     */
    get: function (key) {
      
      if (this.local_data) {
        /** get data local storage : */
        this.data_store = this.local_data.getItem(key);
        return this.data_store;
      }
    },
    /**
     * For get all data in localStorage.
     * @param key
     * @returns {string | null | *}
     */
    getAll: function (key) {
      if (this.local_data) {
        
        /** get all data local storage : */
        return this.data_store;
      }
    },
    /**
     * For remove data localStorage
     * @param key
     * @returns {CellBIS_BrowserStorage}
     */
    delete: function (key) {
      
      if (this.local_data) {
        /** remove data local storage : */
        this.local_data.removeItem(key);
      }
      return this;
    },
    clear_data: function () {
      if (localStorage) {
        /** Clear all data storage */
        localStorage.clear();
      }
      return this;
    },
    clear_with_value: function (size_data) {
      if (CellBIS_jsUtils.check_is_defined(size_data)) {
        var allStrings = '';
        for (var key in window.localStorage) {
          if (window.localStorage.hasOwnProperty(key)) {
            allStrings += window.localStorage[key];
          }
        }
        var r_cache = allStrings ? 3 + ((allStrings.length * 16) / (8 * 1024)) : 0;
        
        if (r_cache >= size_data) {
          /** Clear all data storage */
          localStorage.clear();
        }
      }
    }
  };
  window.CellBIS_adm = {
    /**
     * param $type  string
     * param $icon  string
     * param $msg   string
     * param $place string  -> harus berisi ID
     * */
    Dashboard_notifi: function ($type, $icon, $msg, $place, $timeout) {
      var $data, $_icon;
      switch ($icon) {
        case 'loading' :
          $_icon = '<i class="fa fa-spinner fa-spin fa-lg"></i>';
          break;
        case 'ok' :
          $_icon = '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
          break;
        case 'info' :
          $_icon = '<i class="fa fa-info-circle" aria-hidden="true"></i>';
          break;
        default :
          $_icon = '<i class="fa fa-info-circle" aria-hidden="true"></i>';
          break;
      }
      switch ($type) {
        case 'success' :
          $data = '<div id="apps-alert" class="alert alert-success">' + $_icon + ' ' + $msg + ' </div>';
          break;
        case 'danger' :
          $data = '<div id="apps-alert" class="alert alert-danger">' + $_icon + ' ' + $msg + ' </div>';
          break;
        case 'warning' :
          $data = '<div id="apps-alert" class="alert alert-warning">' + $_icon + ' ' + $msg + ' </div>';
          break;
        case 'info' :
          $data = '<div id="apps-alert" class="alert alert-info">' + $_icon + ' ' + $msg + ' </div>';
          break;
        default :
          $data = '<div id="apps-alert" class="alert alert-info">' + $_icon + ' ' + $msg + ' </div>';
          break;
      }
      
      document.getElementById($place).innerHTML = $data;
      setTimeout(function () {
        document.getElementById($place).innerHTML = '';
      }, $timeout);
    },
    Dashboard_notifi_sticky: function ($type, $icon, $msg, $place) {
      var $data, $_icon;
      switch ($icon) {
        case 'loading' :
          $_icon = '<i class="fa fa-spinner fa-spin fa-lg"></i>';
          break;
        case 'ok' :
          $_icon = '<i class="fa fa-check-square-o" aria-hidden="true"></i>';
          break;
        case 'info' :
          $_icon = '<i class="fa fa-info-circle" aria-hidden="true"></i>';
          break;
        default :
          $_icon = '<i class="fa fa-info-circle" aria-hidden="true"></i>';
          break;
      }
      switch ($type) {
        case 'success' :
          $data = '<div id="apps-alert" class="alert alert-success">' + $_icon + ' ' + $msg + ' </div>';
          break;
        case 'danger' :
          $data = '<div id="apps-alert" class="alert alert-danger">' + $_icon + ' ' + $msg + ' </div>';
          break;
        case 'warning' :
          $data = '<div id="apps-alert" class="alert alert-warning">' + $_icon + ' ' + $msg + ' </div>';
          break;
        case 'info' :
          $data = '<div id="apps-alert" class="alert alert-info">' + $_icon + ' ' + $msg + ' </div>';
          break;
        default :
          $data = '<div id="apps-alert" class="alert alert-info">' + $_icon + ' ' + $msg + ' </div>';
          break;
      }
      
      document.getElementById($place).innerHTML = $data;
    }
  };
  window.CellBIS_html = {
    
    // call_jsUtils: CellBIS_jsUtils.init(),
    
    /** For Create Table data :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat table.
     *
     * Format object $data_config_wrap :
     * ------------------------------------------
     * object {
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
     *                      'style' : '',check_is_defined
     *                  }
     *                  'min-count' : '',
     *                  'max-count' : '',
     *              }
     *          }
     *      },
     * }
     *
     * Format object $data_config :
     * ------------------------------------------
     * object {
     *    'table' : {},
     *    'header' : {},
     *    'content' : {},
     *    'footer' : {},
     * }
     *
     * Format Object $target :
     * ------------------------------------------
     * object {
     *    'selector' : {},
     *    'type' : {},
     * }
     *
     * @param {object}          $data_config_wrap     Berisi data object config wrap table
     * @param {object}          $data_config          Berisi data object table
     * @param {string|object}   $target               Berisi data object string location
     *                                                untuk menempatkan hasil pembuatan table
     */
    Table_data: function ($data_config_wrap, $data_config, $target) {
      
      /** Define variable will be used in this function : */
      var $config_wrap_table, $config_table_data, $result_table = '', $result;
      
      /** Initialization "CellBIS_jsUtils" */
      var js_utils = CellBIS_jsUtils.init();
      
      /** Check IF $data_config_wrap is defined : */
      if (js_utils.check_is_defined($data_config_wrap)) {
        
        /** Define variable for Config Wrapper Table */
        $config_wrap_table = $data_config_wrap;
        
        /** Check IF $data_config is defined : */
        if (js_utils.check_is_defined($data_config)) {
          
          /** Define variable for attribute wrapper table */
          var $id_wrap = '', $class_wrap = '', $attr_wrap = '', $style_wrap = '';
          var $filter;
          var $config_wrapper = $config_wrap_table['wrap'];
          
          // FOR Wrapper Table :
          // ==================================================================================================
          
          var $prop_wrap = Object.keys($config_wrapper);
          var $iw;
          var $until = $prop_wrap.length;
          for ($iw = 0; $iw < $until; $iw++) {
            
            if (js_utils.check_is_defined_obj($config_wrapper, $prop_wrap[$iw])) {
              switch ($prop_wrap[$iw]) {
                case 'id' :
                  $id_wrap = 'id="' + $config_wrapper[$prop_wrap[$iw]] + '" ';
                  break;
                case 'class' :
                  $class_wrap = 'class="' + $config_wrapper[$prop_wrap[$iw]] + '" ';
                  break;
                case 'attr' :
                  $attr_wrap = $config_wrapper[$prop_wrap[$iw]] + ' ';
                  break;
                case 'style' :
                  $style_wrap = 'style="' + $config_wrapper[$prop_wrap[$iw]] + '" ';
                  break;
              }
            }
          }
          
          /** Begin wrapper table : */
          $result_table += '<div ' + $id_wrap + $class_wrap + $attr_wrap + $style_wrap + '>';
          
          // FOR Filter Table :
          // ==================================================================================================
          
          /** CHeck IF $config_wrap_table['filter'] is defined : */
          if ($config_wrap_table['filter'] !== undefined && (typeof $config_wrap_table['filter'] === "object") && ($config_wrap_table['filter'] !== '' || $config_wrap_table['filter'] !== "")) {
            
            /** Define variable for config wrapper filter table : */
            var $data_wrap_config_filter = $config_wrap_table['filter'];
            var $config_wrap_filter = $data_wrap_config_filter['config'];
            var $id_wrapFilter = ' id="filter_table" ', $class_wrapFilter = '', $attr_wrapFilter = '',
              $style_wrapFilter = '';
            
            /** Check FOR $config_wrap_filter['id'] : */
            if (js_utils.check_is_defined_obj($config_wrap_filter, 'id')) {
              $id_wrapFilter = ' id="filter_table-' + $config_wrap_filter['id'] + '" ';
            }
            
            /** Check FOR $config_wrap_filter['class'] : */
            if (js_utils.check_is_defined_obj($config_wrap_filter, 'class')) {
              $class_wrapFilter = ' class="' + $config_wrap_filter['class'] + '" ';
            }
            
            /** Check FOR $config_wrap_filter['attr'] : */
            if (js_utils.check_is_defined_obj($config_wrap_filter, 'attr')) {
              $attr_wrapFilter = ' ' + $config_wrap_filter['attr'] + ' ';
            }
            
            /** Check FOR $config_wrap_filter['style'] : */
            if (js_utils.check_is_defined_obj($config_wrap_filter, 'style')) {
              $style_wrapFilter = ' style="' + $config_wrap_filter['style'] + '"';
            }
            
            /** Begin wrapper filter table : */
            $result_table += '<div' + $id_wrapFilter + $class_wrapFilter + $attr_wrapFilter + $style_wrapFilter + '>';
            
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
                /** Case for $key_filter[$ft] === 'count' : */
                case 'count' :
                  $result_table += this.Table_addon_control_count_list_item($filter['count']['min-count'], $filter['count']['max-count'], $filter['count']['config']);
                  //console.log($result_table);
                  break;
                /** Case for $key_filter[$ft] === 'select' : */
                case 'select' :
                  var $wrap_table = $filter['select']['wrap'];
                  $result_table += '<div id="' + $wrap_table['id'] + '" class="' + $wrap_table['class'] + '">';
                  $result_table += this.Table_addon_select_bootstrap($filter['select']['data'], '');
                  $result_table += '</div>';
                  //console.log($result_table);
                  break;
              }
              /** End of switch for conditions $key_filter[$ft]. */
              
              /** Auto Increment : */
              $ft++;
            }
            /** End of while loop to Create Filter Table. */
            
            /** Ending Wrapper filter table : */
            $result_table += '</div>';
            
          }
          /** End of CHeck IF $config_wrap_table['filter'] is defined. */
          
          /** Define variable for data config table : */
          $config_table_data = $data_config;
          
          /** Define variable for Data Config Table : */
          var $table_config = $config_table_data['table'];
          var $header_table = $config_table_data['header'];
          var $content_table = $config_table_data['content'];
          
          if (js_utils.check_is_defined_obj($config_table_data, 'footer')) {
            
            /** Create Table Data : */
            $result_table += this.Table_advanced_create($table_config, $header_table, $content_table, $config_table_data['footer'], '');
          } else {
            
            /** Create Table Data : */
            $result_table += this.Table_advanced_create($table_config, $header_table, $content_table, '', '');
          }
          
          /** Ending wrapper table : */
          $result_table += '</div>';
          
          /** Define variable for result : */
          $result = 1;
          
          // To Place result :
          
          
          /** Check IF $target is defined : */
          if (js_utils.check_is_defined($target)) {
            
            /** Placing result into tab page : */
              // var $target_data = $($target);
              // console.log($target);
              // $target_data.html($result_table);
            var $target_data = document.querySelector($target);
            $target_data.innerHTML = $result_table;
            
          } else {
            $result = $result_table;
          }
          /** End of Check IF $target is undefined. */
          
        } else {
          console.error('data config table is undefined');
          $result = 0;
        }
        /** End of Check IF $data_config is undefined. */
        
      } else {
        console.error('Data Wrapper table is undefined');
        $result = 0;
      }
      /** End of Check IF $data_table is undefined. */
      
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
     *        { "nama" : "", "id" : "", "class" : "", "attr" : "", "style" : "" },
     *        { "nama" : "", "id" : "", "class" : "", "attr" : "", "style" : "" }
     *      ]
     * }
     *
     * Format Data Table :
     * -------------------------------------
     * Object [
     *    {
     *      "baris" : { "id" : [ID Produk], "class" : [custom class css], "attr" : [custom attr], "style" : [custom style] },
     *      "kolom" : [
     *                  {
     *                    "type" : [text | html | input | radio | checkbox | img ],
     *                    "value" : [value column rows],
     *                    "id" : [ID <td> Table],
     *                    "class" : [Class <td> Table],
     *                    "attr" : [ Attr <td> Table],
     *                    "style" : [ Style <td> Table],
     *                  },
     *      ]
     *    },
     * ]
     *
     *
     * @param $header {object} Berisi key header table.
     * @param $data {object} Berisi data table.
     * @param $target {string} Berisi selector untuk menyimpan hasil pembuatan table.
     */
    Table_create: function ($header, $data, $target) {
      
      /** Define variable will be used in this function : */
      var $table_header, $table_data;
      
      /** Initialization "CellBIS_jsUtils" */
      var js_utils = CellBIS_jsUtils.init();
      
      /** Check IF $header table is Defined : */
      // if ($header !== undefined || $header !== null || $header !== '' || $header !== "") {
      if (js_utils.check_is_defined($header)) {
        
        /** Define Header Table : */
        $table_header = $header;
        
        /** Check IF $table_header is object : */
        if (typeof $table_header === 'object') {
          
          // /** Check IF $data is Defined : */
          // if ($data !== undefined || $data !== null || $data !== '' || $data !== "") {
          if (js_utils.check_is_defined($data)) {
            
            /** Define Data Table : */
            $table_data = $data;
            var $config_header = $table_header['config'];
            var $id_table = '';
            var $class_table = '';
            var $attr_table = '';
            var $style_table = '';
            var $data_header_tbl = '';
            
            /** Check FOR $table_header['config']['id'] : */
            if (js_utils.check_is_defined_obj($config_header, 'id')) {
              $id_table = 'id="' + $config_header['id'] + '" ';
            } else {
              $id_table = '';
            }
            
            /** Check FOR $table_header['config']['class'] : */
            if (js_utils.check_is_defined_obj($config_header, 'class')) {
              $class_table = ' ' + $config_header['class'];
            } else {
              $class_table = '';
            }
            
            /** Check FOR $table_header['config']['attr'] : */
            if (js_utils.check_is_defined_obj($config_header, 'attr')) {
              $attr_table = $config_header['attr'];
            } else {
              $attr_table = '';
            }
            
            /** Check FOR $table_header['config']['style'] : */
            if (js_utils.check_is_defined_obj($config_header, 'style')) {
              $style_table = ' style="' + $config_header['style'] + '" ';
            } else {
              $style_table = '';
            }
            
            /** Check FOR $table_header['data'] is Defined : */
            if (js_utils.check_is_defined_obj($table_header, 'data')) {
              
              /** Define data header table : */
              $data_header_tbl = $table_header['data'];
              var $tag_header_tbl = '', $tag_rows_tbl = '', $tag_rows_column_tbl = '', $result_create_table = '';
              
              /** Wrapper Table : */
              var $begin_wrap_table = '<table ' + $id_table + 'class="table table-bordered table-hover' + $class_table + '" ' + $attr_table + ' ' + $style_table + '>';
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
              var $data_table_header = '';
              
              /** While loop to Create Header Table : */
              while ($th < $until_loop_header) {
                
                /** Define variable for data head table : */
                var $id_th = '', $class_th = '', $attr_th = '', $style_th = '', $name_th = '';
                $data_table_header = $data_header_tbl[$th];
                
                /** Check IF $data_header_tbl[$th]['id'] is defined : */
                if (js_utils.check_is_defined_obj($data_table_header, 'id')) {
                  $id_th = ' id="' + $data_table_header['id'] + '"';
                } else {
                  $id_th = '';
                }
                
                /** Check IF $data_header_tbl[$th]['class'] is defined : */
                if (js_utils.check_is_defined_obj($data_table_header, 'class')) {
                  $class_th = ' class="' + $data_table_header['class'] + '" ';
                } else {
                  $class_th = '';
                }
                
                /** Check IF $data_header_tbl[$th]['attr'] is defined : */
                if (js_utils.check_is_defined_obj($data_table_header, 'attr')) {
                  $attr_th = ' ' + $data_table_header['attr'] + ' ';
                } else {
                  $attr_th = '';
                }
                
                /** Check IF $data_header_tbl[$th]['style'] is defined : */
                if (js_utils.check_is_defined_obj($data_table_header, 'style')) {
                  $style_th = ' style="' + $data_table_header['style'] + '" ';
                } else {
                  $style_th = '';
                }
                
                /** Check IF $data_header_tbl[$th]['name'] is defined : */
                if (js_utils.check_is_defined_obj($data_table_header, 'name')) {
                  $name_th = $data_table_header['name'];
                } else {
                  $name_th = '';
                }
                
                /** Create Header Table : */
                $tag_header_tbl += '<th ' + $id_th + $class_th + $attr_th + $style_th + '>' + $name_th + '</th>';
                
                /** Auto Increment : */
                $th++;
              }
              /** End of while loop to Create Header Table. */
              
              /** Prepare while loop to Craete Data Table : */
              var $i = 0;
              var $until_loop_tr = $table_data.length;
              var $data_table_baris = '';
              
              /** While loop to Craete Data Table : */
              while ($i < $until_loop_tr) {
                
                /** Define variable for Data Table : */
                var $id_tr = '', $class_tr = '', $attr_tr = '', $style_tr = '';
                $data_table_baris = $table_data[$i]['baris'];
                
                /** Check IF $table_data[$i]['baris']['id'] is defined : */
                if (js_utils.check_is_defined_obj($data_table_baris, 'id')) {
                  $id_tr = 'id="' + $data_table_baris['id'] + '"';
                } else {
                  $id_tr = '';
                }
                
                /** Check IF $table_data[$i]['baris']['class'] is defined : */
                if (js_utils.check_is_defined_obj($data_table_baris, 'class')) {
                  $class_tr = ' class="' + $data_table_baris['class'] + '" ';
                } else {
                  $class_tr = '';
                }
                
                /** Check IF $table_data[$i]['baris']['attr'] is defined : */
                if (js_utils.check_is_defined_obj($data_table_baris, 'attr')) {
                  $attr_tr = $data_table_baris['attr'];
                } else {
                  $attr_tr = '';
                }
                
                /** Check IF $table_data[$i]['baris']['style'] is defined : */
                if (js_utils.check_is_defined_obj($data_table_baris, 'style')) {
                  $style_tr = ' style="' + $data_table_baris['style'] + '"';
                } else {
                  $style_tr = '';
                }
                
                /** Begin Wrapper Baris : */
                $tag_rows_tbl += '<tr ' + $id_tr + $class_tr + ' ' + $attr_tr + $style_tr + '>';
                
                /** Create Baris Table : */
                $tag_rows_tbl += this.Table_create_isi_kolom($table_data[$i]['kolom']);
                
                /** Create Data Table : */
                $tag_rows_tbl += $tag_rows_column_tbl;
                //console.log('Baris : '+$tag_rows_column_tbl);
                
                /** Ending Wrapper baris : */
                $tag_rows_tbl += '</tr>';
                
                /** Auto Increment : */
                $i++;
                
              }
              /** End of while loop to Craete Data Table. */
              
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
              
              /** Check IF $target is defined : */
              if (typeof $target === "object") {
                // $($target).html($result_create_table);
                var r_selector = document.querySelector($target);
                r_selector.innerHTML = $result_create_table;
              } else {
                console.error('Selector is undefined');
              }
              
            } else {
              console.error('Data Header Table is undefined');
            } // End of Check FOR $table_header['data'] is Undefined.
            
          } else {
            console.error('Data table is undefined');
          } // End of Check IF $data is undefined.
          
        } else {
          console.error('Header Table is not object');
        } // End of check IF $table_header is not object.
        
      } else if (js_utils.check_is_not_defined($header)) {
        console.error('Header Table is undefined');
      } // End of Check IF $header table is undefined.
      
    },
    /** End of For Create Table.
     * ===================================================================================================== */
    
    /** For Create Advanced Table :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat table.
     *
     * Format object $table :
     * ----------------------------------------------
     * object {
     *    'type' : [table-responsive | table-scrollable | table-scrollable table-scrollable-borderless ],
     *    'wrap' : {
     *      'id' : '',
     *      'class' : '',
     *      'attr' : '',
     *      'style' : '',
     *    },
     *    'table' : {
     *      'id' : '',
     *      'class' : '',
     *      'attr' : '',
     *      'style' : ''
     *    }
     * }
     *
     * Format object $header :
     * ----------------------------------------------
     * Array [
     *    {
     *      'baris' : {
     *        'id' : '', 'class' : '', 'attr' : '', 'style' : ''
     *      },
     *      'kolom' : [
     *        {
     *          'type' : '[ checkbox | radio | input | img | custom-html | html | text ]',
     *          'value' : [ Value Object | string],
     *          'id' : '',
     *          'class' : '',
     *          'attr' : [ colspan | rowspan ],
     *          'style' : '',
     *        },
     *      ]
     *    },
     *    {
     *      'baris' : {
     *        'id' : '', 'class' : '', 'attr' : '', 'style' : ''
     *      },
     *      'kolom' : [
     *        {
     *          'type' : '[ checkbox | radio | input | img | custom-html | html | text ]',
     *          'value' : [ Value Object | string],
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *        },
     *      ]
     *    },
     * ]
     *
     * Format object $data :
     * ----------------------------------------------
     * Array [
     *    {
     *      "baris" : { "id" : (ID Produk), "class" : (custom class css), "attr" : (custom attr), "style" : (custom style) },
     *      "kolom" : [
     *                  {
     *                    "type" : [ checkbox | radio | input | img | custom-html | html | text ],
     *                    "value" : [value column rows],
     *                    "id" : [ID <td> Table],
     *                    "class" : [Class <td> Table],
     *                    "attr" : [ Attr <td> Table],
     *                    "style" : [ Style <td> Table],
     *                  },
     *      ]
     *    },
     * ]
     *
     * Format object $target :
     * ----------------------------------------------
     * object {
     *    'selector' : '<selector id or class>',
     *    'type' : 'append || replace'
     * }
     *
     * @param {object}          $table     Berisi data object "table"
     * @param {object}          $header    Berisi data object baris "header"
     * @param {object}          $data      Berisi data object baris "data table"
     * @param {object}          $footer    Berisi data object baris "footer"
     * @param {string|string}   $target    Berisi data object selector
     * @returns {*}
     * @constructor
     */
    Table_advanced_create: function ($table, $header, $data, $footer, $target) {
      
      /** Define variable will be used in this function : */
      var $config_table, $table_result = '', $result;
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Check IF $table is defined : */
      if (js_utils.check_is_defined($table)) {
        
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
        if (typeof $config_table === "object") {
          
          /** Define variable for Attribute Table : */
          var $type_wrap_table = 'table-responsive', $id_wrap_table = '', $class_wrap_table = '',
            $attr_wrap_table = '', $style_wrap_table = '';
          var $id_table, $class_table, $attr_table, $style_table;
          var $cfg_table_wrap = $config_table['wrap'];
          var $cfg_table = $config_table['table'];
          
          // FOR Wrapper Table :
          // ==================================================================================================
          
          /** CHeck FOR $config_table['type'] : */
          if (js_utils.check_is_defined_obj($config_table, 'type')) {
            $type_wrap_table = $config_table['type'];
          }
          
          /** CHeck FOR $config_table['wrap']['id'] : */
          if (js_utils.check_is_defined_obj($cfg_table_wrap, 'id')) {
            $id_wrap_table = ' id="' + $cfg_table_wrap['id'] + '" ';
          }
          /** CHeck FOR $cfg_table_wrap['class'] : */
          if (js_utils.check_is_defined_obj($cfg_table_wrap, 'class')) {
            $class_wrap_table = 'class="' + $type_wrap_table + ' ' + $cfg_table_wrap['class'] + '" ';
          }
          
          /** CHeck FOR $cfg_table_wrap['attr'] : */
          if (js_utils.check_is_defined_obj($cfg_table_wrap, 'attr')) {
            $attr_wrap_table = $cfg_table_wrap['attr'] + ' ';
          }
          
          /** CHeck FOR $cfg_table_wrap['style'] : */
          if (js_utils.check_is_defined_obj($cfg_table_wrap, 'style')) {
            $style_wrap_table = ' style="' + $cfg_table_wrap['style'] + '" ';
          }
          
          /** Begin Wrap table : */
          $table_result += '<div ' + $id_wrap_table + $class_wrap_table + $attr_wrap_table + $style_wrap_table + '>';
          
          // FOR Tables :
          // ==================================================================================================
          
          /** Check FOR $cfg_table['attr'] : */
          if (js_utils.check_is_defined_obj($cfg_table, 'id')) {
            $id_table = ' id="' + $cfg_table['id'] + '" ';
          } else {
            $id_table = ' ';
          }
          
          /** Check FOR $cfg_table['class'] : */
          if (js_utils.check_is_defined_obj($cfg_table, 'class')) {
            $class_table = ' ' + $cfg_table['class'];
          } else {
            $class_table = '';
          }
          
          /** Check FOR $cfg_table['attr'] : */
          if (js_utils.check_is_defined_obj($cfg_table, 'attr')) {
            $attr_table = ' ' + $cfg_table['attr'] + ' ';
          } else {
            $attr_table = '';
          }
          
          /** Check FOR $cfg_table['style'] : */
          if (js_utils.check_is_defined_obj($cfg_table, 'style')) {
            $style_table = ' style="' + $cfg_table['style'] + '" ';
          } else {
            $style_table = '';
          }
          
          /** Begin Table : */
          $table_result += '<table' + $id_table + 'class="table' + $class_table + '"' + $attr_table + $style_table + '>';
          
          /** Create Header Table : */
          if (js_utils.check_is_defined($header) && typeof $header === "object" && Object.keys($header).length >= 1) {
            $table_result += '<thead>';
            $table_result += this.Table_create_header_advanced($header);
            $table_result += '</thead>';
          }
          
          /** Create Data table : */
          if (js_utils.check_is_defined($data) && typeof $header === "object" && Object.keys($data).length >= 1) {
            $table_result += '<tbody>';
            $table_result += this.Table_create_baris($data);
            $table_result += '</tbody>';
          }
          
          /** Create Footer table : */
          if (js_utils.check_is_defined($footer) && typeof $footer === "object" && Object.keys($footer).length >= 1) {
            $table_result += '<tfoot>';
            $table_result += this.Table_create_baris($footer);
            $table_result += '</tfoot>';
          }
          
          /** Ending Table : */
          $table_result += '</table>';
          
          /** Endig Wraper Table : */
          $table_result += '</div>';
          
          // For Place config :
          if (js_utils.check_is_defined($target)) {
            var r_selector;
            if (typeof $target === "object") {
              var $selector_place = $target['selector'];
              var $type_place = $target['type'];
              r_selector = document.querySelector($selector_place);
              switch ($type_place) {
                case 'append' :
                  // $($selector_place).append($table_result);
                  r_selector.innerHTML += $table_result;
                  break;
                
                case 'replace' :
                  // $($selector_place).html($table_result);
                  r_selector.innerHTML = $table_result;
                  break;
              }
              $result = 1;
              
            } else {
              // $($target).html($table_result);
              r_selector = document.querySelector($selector_place);
              r_selector.innerHTML = $table_result;
              
              $result = 1;
            }
          } else {
            $result = $table_result;
          } // End of Check IF $selector is undefined.
          
        }
        else {
          console.error('Data config table is not object');
          $result = 0;
        }
        /** End of Check IF $config_table is not object. */
        
      }
      else {
        console.error('Data config table is undefined');
        $result = 0;
      }
      /** End of Check IF $table is undefined. */
      
      /** Return $result : */
      return $result;
    },
    /** End of For Create Advanced Table.
     * ===================================================================================================== */
    
    /** For Create control list item view :
     * -----------------------------------------------------------
     *
     */
    Table_addon_control_count_list_item: function ($min_count_item, $max_count_item, $wrap_count_item) {
      
      /** Define variable will be used in this function : */
      var $min_count, $max_count_item_list, $config_control = [], $result_count_list = '', $result;
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Check FOR $min_count_item : */
      if (js_utils.check_is_defined($min_count_item)) {
        $min_count = $min_count_item;
      } else {
        $min_count = 20;
      }
      
      /** End of Check IF $min_count_item is defined. */
      
      /** Check IF $max_count_item is defined : */
      if (js_utils.check_is_defined($max_count_item)) {
        
        /** Define variable for Max Count Item in List : */
        $max_count_item_list = $max_count_item;
        
        /** Define data Option : */
        var $data_option = [];
        
        /** Prepare while loop to Create data option : */
        var $i = 1;
        var $until_loop = 6;
        var $item_option;
        
        /** While loop to Create data option : */
        while ($i < $until_loop) {
          
          /** Create Item option : */
          $data_option.push({
            'value': ($min_count * $i),
            'name': ($min_count * $i)
          });
          
          /** Auto Increment : */
          $i++;
        }
        /** End of while loop to Create data option. */
        
        /** Create Config for Count control item list : */
        $config_control.push({
          'config': {
            'id': 'count-item-control',
            'attr': 'data-item-control="' + $max_count_item_list + '"',
            'name': 'filter-count-list-item'
          },
          'option': $data_option
        });
        
        /** Check IF $wrap_count_item is defined : */
        if (js_utils.check_is_defined($wrap_count_item)) {
          
          /** Define variable will be used in this function : */
          var $id_wrap = '', $class_wrap = '', $attr_wrap = '', $style_wrap = '';
          
          /** Check FOR $wrap_count_item['id'] : */
          if (js_utils.check_is_defined_obj($wrap_count_item, 'id')) {
            $id_wrap = ' id="' + $wrap_count_item['id'] + '" ';
          }
          
          /** Check FOR $wrap_count_item['class'] : */
          if (js_utils.check_is_defined_obj($wrap_count_item, 'class')) {
            $class_wrap = ' class="' + $wrap_count_item['class'] + '" ';
          }
          
          /** Check FOR $wrap_count_item['attr'] : */
          if (js_utils.check_is_defined_obj($wrap_count_item, 'attr')) {
            $attr_wrap = ' ' + $wrap_count_item['attr'] + ' ';
          }
          
          /** Check FOR $wrap_count_item['style'] : */
          if (js_utils.check_is_defined_obj($wrap_count_item, 'style')) {
            $style_wrap = ' style="' + $wrap_count_item['style'] + '"';
          }
          
          /** Begin wrapper count list item : */
          $result_count_list += '<div' + $id_wrap + $class_wrap + $attr_wrap + $style_wrap + '>';
          
          /** Create FORM Select : */
          $result_count_list += this.Table_addon_select_bootstrap($config_control);
          
          /** Ending Wrapper count list item : */
          $result_count_list += '</div>';
          
          /** Define result : */
          $result = $result_count_list;
          
        } else {
          
          /** Create FORM Select : */
          $result = this.Table_addon_select_bootstrap($config_control);
          
        }
        /** End of Check IF $wrap_count_item is undefined. */
        
      } else {
        
        console.error('data Max Count Item is undefined');
        $result = 0;
        
      }
      /** End of Check IF $max_count_item is undefined. */
      
      /** Return Result : */
      return $result;
      
    },
    /** End of For Create control list item view.
     * ===================================================================================================== */
    
    /**
     * Function yang berfungsi untuk membuat data baris header table.
     *
     * Format Header Table (data_header) :
     * -------------------------------------
     * object
     * [
     *    {
     *      'baris' : {
     *        'id' : '', 'class' : '', 'attr' : '', 'style' : ''
     *      },
     *      'kolom' : [
     *        {
     *          'type' : '[ checkbox | radio | input | img | html | text ]',
     *          'value' : [ Value Object | string],
     *          'id' : '',
     *          'class' : '',
     *          'attr' : [ colspan | rowspan ],
     *          'style' : '',
     *        },
     *      ]
     *    },
     *    {
     *      'baris' : {
     *        'id' : '', 'class' : '', 'attr' : '', 'style' : ''
     *      },
     *      'kolom' : [
     *        {
     *          'type' : '[ checkbox | radio | input | img | html | text ]',
     *          'value' : [ Value Object | string],
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *        },
     *      ]
     *    },
     * ]
     *
     * @param   {object}    data_header
     * @returns {string|*}
     * @constructor
     */
    Table_header_advanced: function (data_header) {
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Define variable will be used in this function : */
      var $result;
      
      /** Define variable for Attribute : */
      var $id_baris = '', $class_baris = '', $attr_baris = '', $style_baris = '';
      var $data_cfg_header = data_header['baris'];
      
      /** Check FOR $data_cfg_header['id'] : */
      if (js_utils.check_is_defined_obj($data_cfg_header, 'id')) {
        $id_baris = ' id="' + $data_cfg_header['id'] + '" ';
      }
      
      /** Check FOR $data_cfg_header['class'] : */
      if (js_utils.check_is_defined_obj($data_cfg_header, 'class')) {
        $class_baris = ' class="' + $data_cfg_header['class'] + '" ';
      }
      
      /** Check FOR $data_cfg_header['attr'] : */
      if (js_utils.check_is_defined_obj($data_cfg_header, 'attr')) {
        $attr_baris = ' ' + $data_cfg_header['attr'] + ' ';
      }
      
      /** Check FOR $data_cfg_header['style'] : */
      if (js_utils.check_is_defined_obj($data_cfg_header, 'style')) {
        $style_baris = ' style="' + $data_cfg_header['style'] + '" ';
      }
      
      /** Prepare while loop to Create Kolom baris Header Table : : */
      var $th = 0;
      var $until_loop_th = data_header['kolom'].length;
      var $tr_result = '';
      var $kolom_baris = data_header['kolom'];
      var $th_result = '', $data_kolom_baris = '';
      
      /** While loop to Create Kolom baris Header Table : : */
      while ($th < $until_loop_th) {
        
        /** Define variable for Attribute Kolom baris : */
        var $id_th = '', $class_th = '', $attr_th = '', $style_th = '', $type_th = '', $value_th = '';
        var $value_th_modif = '';
        $data_kolom_baris = $kolom_baris[$th];
        
        // Check IF Data kolom baris bukan object :
        if (typeof $data_kolom_baris === "object") {
          
          /** Check FOR $data_kolom_baris['id'] : */
          if (js_utils.check_is_defined_obj($data_kolom_baris, 'id')) {
            $id_th = 'id="' + $data_kolom_baris['id'] + '" ';
          }
          
          /** Check FOR $data_kolom_baris['class'] : */
          if (js_utils.check_is_defined_obj($data_kolom_baris, 'class')) {
            $class_th = ' class="' + $data_kolom_baris['class'] + '" ';
          }
          
          /** Check FOR $data_kolom_baris['attr'] : */
          if (js_utils.check_is_defined_obj($data_kolom_baris, 'attr')) {
            $attr_th = $data_kolom_baris['attr'] + ' ';
          }
          
          /** Check FOR $data_kolom_baris['style'] : */
          if (js_utils.check_is_defined_obj($data_kolom_baris, 'style')) {
            $style_th = ' style="' + $data_kolom_baris['style'] + '" ';
          }
          
          /** Check FOR $data_kolom_baris['type'] : */
          if (js_utils.check_is_defined_obj($data_kolom_baris, 'type')) {
            $type_th = $data_kolom_baris['type'];
          }
          
          /** Check FOR $data_kolom_baris['value'] : */
          if (js_utils.check_is_defined_obj($data_kolom_baris, 'value')) {
            $value_th = $data_kolom_baris['value'];
          }
          
          /** Switch for conditions $type_th : */
          switch ($type_th) {
            /** Case for $type_th === 'input' : */
            case 'input' :
              $value_th_modif = this.Table_addon_input($value_th);
              break;
            
            /** Case for $type_th === 'radio' : */
            case 'radio' :
              $value_th_modif = this.Table_addon_radio($value_th);
              break;
            
            /** Case for $type_th === 'checkbox' : */
            case 'checkbox' :
              $value_th_modif = this.Table_addon_checkbox($value_th);
              break;
            
            /** Case for $type_th === 'select' : */
            case 'select' :
              $value_th_modif = this.Table_addon_select_bootstrap($value_th);
              break;
            
            /** Case for $type_th === 'img' : */
            case 'img' :
              $value_th_modif = this.Table_addon_img_fancybox($value_th);
              break;
            
            /** Case for $type_th === 'button' : */
            case 'button' :
              $value_th_modif = this.Table_addon_button($value_th);
              break;
            
            /** Case for $type_th === 'custom-html' : */
            case 'custom-html' :
              $value_th_modif = this.Table_addon_custom_html_tag($value_th);
              break;
            
            /** Case for $type_th === 'text' : */
            case 'text' :
              $value_th_modif = $value_th;
              break;
            
            /** Case for $type_th === 'html' : */
            case 'html' :
              $value_th_modif = $value_th;
              break;
          }
          /** End of switch for conditions $type_th. */
          
          /** Place Kolom Baris : */
          $tr_result += '<th ' + $id_th + $class_th + $attr_th + $style_th + '>' + $value_th_modif + '</th>';
        } else {
          
          /** Place Kolom Baris : */
          $tr_result += '<th ' + $id_th + $class_th + $attr_th + $style_th + '>' + $kolom_baris[$th] + '</th>';
        }
        
        /** Auto Increment : */
        $th++;
      }
      /** End of while loop to Create Kolom baris Header Table :. */
      
      // console.log($tr_result);
      
      /** Begin Baris Header : */
      $result = '<tr ' + $id_baris + $class_baris + $attr_baris + $style_baris + '>' + $tr_result + '</tr>';
      
      return $result;
    },
    
    /**
     * Function yang berfungsi untuk membuat data baris header table.
     *
     *
     * @param   {Array}     data_header
     * @returns {string|*}
     * @constructor
     */
    Table_header_simple: function (data_header) {
      
      var $result;
      var data_th = '';
      var $i = 0;
      while ($i < data_header.length) {
        data_th += '<th>' + data_header[$i] + '</th>';
      }
      $result = '<tr>' + data_th + '</tr>';
      
      return $result;
    },
    /** For Create Header Advanced Table :
     * -----------------------------------------------------------
     *
     * Format Header Table :
     * -------------------------------------
     * object
     * [
     *    'Name Header',
     *    {
     *      'baris' : {
     *        'id' : '', 'class' : '', 'attr' : '', 'style' : ''
     *      },
     *      'kolom' : [
     *        {
     *          'type' : '[ checkbox | radio | input | img | html | text ]',
     *          'value' : [ Value Object | string],
     *          'id' : '',
     *          'class' : '',
     *          'attr' : [ colspan | rowspan ],
     *          'style' : '',
     *        },
     *      ]
     *    },
     *    {
     *      'baris' : {
     *        'id' : '', 'class' : '', 'attr' : '', 'style' : ''
     *      },
     *      'kolom' : [
     *        {
     *          'type' : '[ checkbox | radio | input | img | html | text ]',
     *          'value' : [ Value Object | string],
     *          'id' : '',
     *          'class' : '',
     *          'attr' : '',
     *          'style' : '',
     *        },
     *      ]
     *    },
     * ]
     *
     * Format object $target :
     * -------------------------------------
     * object {
     *    'selector' : '<selector id or class>',
     *    'type' : 'append || replace'
     * }
     *
     *
     * @param {object}          $data_header    Berisi object data header table
     * @param {string|object}   $target         Berisi lokasi hasil pembuatan header table
     *                                          ditempatkan
     */
    Table_create_header_advanced: function ($data_header, $target) {
      
      /** Define variable will be used in this function : */
      var $tr_th_result = '', $result;
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Check IF $data_header is defined : */
      if (js_utils.check_is_defined($data_header)) {
        
        /** Prepare while loop to Create Header Table : */
        var $i = 0;
        var $until_loop = $data_header.length;
        var $data_cfg_header = '';
        
        /** While loop to Create Header Table : */
        while ($i < $until_loop) {
          
          if (typeof $data_header[$i] === "object") {
            if (Array.isArray($data_header[$i])) {
              $tr_th_result += this.Table_header_simple($data_header[$i]);
            } else {
              $tr_th_result += this.Table_header_advanced($data_header[$i]);
            }
          } else {
            break;
          }
          
          /** Auto Increment : */
          $i++;
        }
        /** End of while loop to Create Header Table. */
        
        // For Place config :
        if (js_utils.check_is_defined($target)) {
          var r_selector;
          if (typeof $target === "object") {
            var $selector_place = $target['selector'];
            var $type_place = $target['type'];
            r_selector = document.querySelector($selector_place);
            switch ($type_place) {
              case 'append' :
                // $($selector_place).append($tr_th_result);
                r_selector.innerHTML += $tr_th_result;
                break;
              case 'replace' :
                // $($selector_place).html($tr_th_result);
                r_selector.innerHTML = $tr_th_result;
                break;
            }
            $result = 1;
            
          } else {
            
            // $($target).html($tr_th_result);
            r_selector = document.querySelector($target);
            r_selector.innerHTML += $tr_th_result;
            
            $result = 1;
          }
        } else {
          $result = $tr_th_result;
        } // End of Check IF $selector is undefined.
        
      } else {
        
        /** Create Log Error : */
        console.error('Data config header table is undefined');
        
        /** Define result : */
        $result = 0;
        
      }
      /** End of Check IF $data_header is undefined. */
      
      /** Return Result : */
      return $result;
    },
    /** End of For Create Header Advanced Table.
     * ===================================================================================================== */
    
    /**
     * Function for create column of rows table
     *
     * @param   {Array}     data_col
     * @return  {string|*}
     * @constructor
     */
    Table_create_isi_kolom_simpe: function (data_col) {
      var result = '';
      
      var $result;
      var data_td = '';
      var $i = 0;
      while ($i < data_col.length) {
        data_td += '<td>' + data_col[$i] + '</td>';
      }
      $result = '<tr>' + data_td + '</tr>';
      
      return $result;
    },
    /** For Create Kolom Baris Table :
     * -----------------------------------------------------------
     *
     * Format Kolom Baris :
     * -------------------------------------
     * object array : [
     *    {
     *      "type" : [text | html | input | radio | checkbox | img ],
     *      "value" : [value column rows],
     *      "id" : [ID <td> Table],
     *      "class" : [Class <td> Table],
     *      "attr" : [ Attr <td> Table],
     *      "style" : [ Style <td> Table],
     *    },
     *  ]
     *
     *
     * @param $table_tr_td {object} berisi data object untuk membuat kolom baris table.
     * @return {string}
     *
     */
    Table_create_isi_kolom: function ($table_tr_td) {
      
      /** Define variable will be used in this function : */
      var $td_result = '';
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Prepare while loop to Create Kolom Baris : */
      var $td = 0;
      var $until_loop_td = $table_tr_td.length;
      
      /** While loop to Create Kolom Baris : */
      while ($td < $until_loop_td) {
        
        /** Define variable for Data Table : */
        var $id_td = '', $class_td = '', $attr_td = '', $style_td = '', $value_td = '', $type_td = '';
        var $isi_baris = $table_tr_td[$td];
        
        if (typeof $table_tr_td[$td] === "object") {
          
          /** Check IF $isi_baris['type'] is defined : */
          if (js_utils.check_is_defined_obj($isi_baris, 'type')) {
            
            /** Define type kolom baris : */
            $type_td = $isi_baris['type'];
            
            /** Check IF $isi_baris['id'] is Defined : */
            if (js_utils.check_is_defined_obj($isi_baris, 'id')) {
              $id_td = 'id="' + $isi_baris['id'] + '" ';
            }
            
            /** Check IF $isi_baris['class'] is Defined : */
            if (js_utils.check_is_defined_obj($isi_baris, 'class')) {
              $class_td = 'class="' + $isi_baris['class'] + '" ';
            }
            
            /** Check IF $isi_baris['attr'] is Defined : */
            if (js_utils.check_is_defined_obj($isi_baris, 'attr')) {
              $attr_td = $isi_baris['attr'] + ' ';
            }
            
            /** Check IF $isi_baris['style'] is Defined : */
            if (js_utils.check_is_defined_obj($isi_baris, 'style')) {
              $style_td = 'style="' + $isi_baris['style'] + '"';
            }
            
            /** Check IF $isi_baris['value'] is Defined : */
            if (js_utils.check_is_defined_obj($isi_baris, 'value')) {
              
              /** Switch for conditions $type_td : */
              switch ($type_td) {
                /** Case for $type_td === 'img' : */
                case 'img' :
                  $value_td = this.Table_addon_img_fancybox($isi_baris['value'], '');
                  break;
                
                /** Case for $type_td === 'input' : */
                case 'input' :
                  $value_td = this.Table_addon_input($isi_baris['value'], '');
                  break;
                
                /** Case for $type_td === 'radio' : */
                case 'radio' :
                  $value_td = this.Table_addon_radio($isi_baris['value'], '');
                  break;
                
                /** Case for $type_td === 'select' : */
                case 'select' :
                  $value_td = this.Table_addon_select_bootstrap($isi_baris['value']);
                  break;
                
                /** Case for $type_td === 'checkbox' : */
                case 'checkbox' :
                  $value_td = this.Table_addon_checkbox($isi_baris['value']);
                  break;
                
                /** Case for $type_td === 'button' : */
                case 'button' :
                  $value_td = this.Table_addon_button($isi_baris['value']);
                  break;
                
                /** Case for $type_td === 'custom-html' : */
                case 'custom-html' :
                  $value_td = this.Table_addon_custom_html_tag($isi_baris['value']);
                  break;
                
                /** Case for $type_td === 'html' : */
                case 'html' :
                  $value_td = $isi_baris['value'];
                  break;
                
                /** Case for $type_td === 'text' : */
                case 'text' :
                  $value_td = $isi_baris['value'];
                  break;
                
                default :
                  $value_td = $isi_baris['value'];
                  break;
              }
            }
            else {
              $value_td = '';
            }
            
            /** Create Kolom Baris : */
            $td_result += '<td ' + $id_td + $class_td + $attr_td + $style_td + '>' + $value_td + '</td>';
            //console.log('Kolom Baris : <td' + $id_td + $class_td + $attr_td + $style_td + '>' + $value_td + '</td>');
            
          }
          else {
            /** Create Kolom Baris for Undefined : */
            $td_result += '<td>Undefined</td>';
          }
          /** End of Check IF $isi_baris['type'] is undefined : */
          
        }
        else {
          
          /** Create Kolom Baris : */
          $td_result += '<td ' + $id_td + $class_td + $attr_td + $style_td + '>' + $table_tr_td[$td] + '</td>';
        }
        
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
     *        "baris" : { "id" : [ID Produk], "class" : [custom class css], "attr" : [custom attr], "style" : [custom style] },
     *        "kolom" : [
     *                    {
     *                      "type" : [text | html | input | radio | checkbox | img ],
     *                      "value" : [value column rows],
     *                      "id" : [ID <td> Table],
     *                      "class" : [Class <td> Table],
     *                      "attr" : [ Attr <td> Table],
     *                      "style" : [ Style <td> Table],
     *                    },
     *        ]
     *      },
     * ]
     *
     * @param {object}          $data_baris     Berisi data object "baris Table"
     * @param {string|object}   $target         Berisi Object | DOM Location untuk menempatkan
     *                                          hasil pembuatan Baris Table,
     * @return {string}
     */
    Table_create_baris: function ($data_baris, $target) {
      
      /** Define variable will be used in this function : */
      var $config_baris, $place, $tr_result = '', $tr_td_result = '', $result;
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Chec IF $data_baris is Defined : */
      if (js_utils.check_is_defined($data_baris)) {
        
        /** Check IF $data_baris is Object : */
        if (typeof $data_baris === "object") {
          
          /** Define Config Baris Table : */
          $config_baris = $data_baris;
          
          //console.log('data baris table');
          //console.log($config_baris);
          
          /** Prepare while loop to Create Baris Table : */
          var $i = 0;
          var $until_loop = $config_baris.length;
          var $cfg_baris = '';
          var $baris_table;
          
          /** While loop to Create Baris Table : */
          while ($i < $until_loop) {
            
            $cfg_baris = $config_baris[$i];
            
            /** Check IF $cfg_baris['baris'] is defined : */
            if (js_utils.check_is_defined_obj($cfg_baris, 'baris')) {
              
              /** Define Baris Table : */
              $baris_table = $cfg_baris['baris'];
              
              /** Define variable will be used in this function : */
              var $id_baris = '', $class_baris = '', $attr_baris = '', $style_baris = '';
              
              /** Check FOR $baris_table['id'] : */
              if (js_utils.check_is_defined_obj($cfg_baris, 'id')) {
                $id_baris = ' id="' + $baris_table['id'] + '" '
              }
              
              /** Check FOR $baris_table['class'] : */
              if (js_utils.check_is_defined_obj($cfg_baris, 'class')) {
                $class_baris = ' class="' + $baris_table['class'] + '" '
              }
              
              /** Check FOR $baris_table['attr'] : */
              if (js_utils.check_is_defined_obj($cfg_baris, 'attr')) {
                $attr_baris = ' ' + $baris_table['attr'] + ' '
              }
              
              /** Check FOR $baris_table['style'] : */
              if (js_utils.check_is_defined_obj($cfg_baris, 'style')) {
                $style_baris = ' style="' + $baris_table['style'] + '" '
              }
              
              /** Create Baris Table : */
              $tr_result += '<tr ' + $id_baris + $class_baris + $attr_baris + $style_baris + '>';
              $tr_result += this.Table_create_isi_kolom($config_baris[$i]['kolom']);
              $tr_result += '</tr>';
              
            } else {
              $result = 0;
              console.error('Baris table tidak didefinisikan');
              break;
            }
            /** End of Check IF $cfg_baris['baris'] is undefined. */
            
            /** Auto Increment : */
            $i++;
          }
          /** End of while loop to Create Baris Table. */
          
          /** Define result baris table : */
          $tr_td_result += $tr_result;
          
          // Check Target Place :
          if (js_utils.check_is_defined($target)) {
            var r_selector;
            if (typeof $target === "object") {
              var $selector_place = $target['selector'];
              var $type_place = $target['type'];
              r_selector = document.querySelector($selector_place);
              switch ($type_place) {
                case 'append' :
                  // $($selector_place).append($tr_td_result);
                  r_selector.innerHTML += $tr_td_result;
                  break;
                case 'replace' :
                  // $($selector_place).html($tr_td_result);
                  r_selector.innerHTML = $tr_td_result;
                  break;
              }
              $result = 1;
              
            } else {
              
              // $($target).html($tr_td_result);
              r_selector = document.querySelector($target);
              r_selector.innerHTML = $tr_td_result;
              
              $result = 1;
            }
          } else {
            $result = $tr_td_result;
          } // End of Check IF $selector is undefined.
          
        } else {
          $result = 0;
          console.error('Data config baris bukan object');
        }
        /** End of Check IF $data_baris is not Object. */
        
      } else {
        $result = 0;
        console.error('Data config Baris table tidak didefinisikan');
      }
      /** End of Chec IF $data_baris is Undefined. */
      
      // console.log('check baris table ');
      // console.log($data_baris);
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
    Table_addon_custom_html_tag: function ($data_html, $selector) {
      
      /** Define variable will be used in this function : */
      var $config_html, $target_place, $tag_result = '', $result;
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Check IF $data_html is defined : */
      if ($data_html !== undefined || $data_html !== null || $data_html !== '' || $data_html !== "") {
        
        /** Define variable for config Custom html : */
        $config_html = $data_html;
        
        /** Check IF $config_html['tag'] is defined : */
        if (js_utils.check_is_defined_obj($config_html, 'tag')) {
          
          /** Define variable for name HTML Tag : */
          var $html_tag = $config_html['tag'];
          
          /** Define variable for attribute HTML Tag : */
          var $id_tag = '', $class_tag = '', $attr_tag = '', $style_tag = '', $text_html = '';
          
          /** Check FOR $config_html['id'] : */
          if (js_utils.check_is_defined_obj($config_html, 'id')) {
            $id_tag = ' id="' + $config_html['id'] + '" ';
          }
          
          /** Check FOR $config_html['class'] : */
          if (js_utils.check_is_defined_obj($config_html, 'class')) {
            $class_tag = ' class="' + $config_html['class'] + '" ';
          }
          
          /** Check FOR $config_html['attr'] : */
          if (js_utils.check_is_defined_obj($config_html, 'attr')) {
            $attr_tag = ' ' + $config_html['attr'] + ' ';
          }
          
          /** Check FOR $config_html['style'] : */
          if (js_utils.check_is_defined_obj($config_html, 'style')) {
            $style_tag = ' style="' + $config_html['style'] + '"';
          }
          
          /** Check FOR $config_html['text'] : */
          if (js_utils.check_is_defined_obj($config_html, 'text')) {
            $text_html = '' + $config_html['text'] + '';
          }
          
          /** Create Item Custom HTML : */
          $tag_result += '<' + $html_tag + $id_tag + $class_tag + $attr_tag + $style_tag + '>' + $text_html + '</' + $html_tag + '>';
          
          /** Check IF $selector is defined : */
          if (js_utils.check_is_defined($selector)) {
            
            /** Define Target Place : */
            $target_place = $($selector);
            
            /** Placing result create header table : */
            $target_place.html($tag_result);
            
            /** Define variable for return result : */
            $result = 1;
            
          } else {
            
            /** Placing result into variable $result : */
            $result = $tag_result;
            
          }
          /** End of Check IF $selector is undefined. */
          
        } else {
          
          /** Create Error Log */
          console.error('Data name tag html is undefined');
          
          /** Define result : */
          $result = 0;
          
        }
        /** End of Check IF $config_html['tag'] is undefined. */
        
      } else {
        
        /** Create Error Log : */
        console.error('Data config custom html is undefined');
        
        /** Define result : */
        $result = 0;
        
      }
      /** End of Check IF $data_html is undefined. */
      
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
    Table_addon_input: function ($data_input, $selector) {
      
      /** Define variable will be used in this function : */
      var $data_form;
      var $input_form = '';
      var $result_action = 0;
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Check IF $data_input is defined : */
      if (js_utils.check_is_defined($data_input)) {
        
        /** Define Data config Input FORM : */
        $data_form = $data_input;
        var $type_input = 'text', $name_input = '', $value_input = '', $id_input = '',
          $class_input = '', $attr_input = '', $style_input = '', $placeholder_input = '';
        
        /** Check IF $data_form['name'] : */
        if (js_utils.check_is_defined_obj($data_form, 'name')) {
          
          /** Define name input form : */
          $name_input = $data_form['name'];
          
          /** Check For $data_form['type'] : */
          if (js_utils.check_is_defined_obj($data_form, 'type')) {
            $type_input = $data_form['type'];
          }
          
          /** Check For $data_form['value'] : */
          if (js_utils.check_is_defined_obj($data_form, 'value')) {
            $value_input = ' value="' + $data_form['value'] + '"';
          }
          
          /** Check For $data_form['id'] : */
          if (js_utils.check_is_defined_obj($data_form, 'id')) {
            $id_input = ' id="' + $data_form['id'] + '" ';
          }
          
          /** Check For $data_form['class'] : */
          if (js_utils.check_is_defined_obj($data_form, 'class')) {
            $class_input = ' class="' + $data_form['class'] + '" ';
          }
          
          /** Check For $data_form['attr'] : */
          if (js_utils.check_is_defined_obj($data_form, 'attr')) {
            $attr_input = ' ' + $data_form['attr'] + ' ';
          }
          
          /** Check For $data_form['style'] : */
          if (js_utils.check_is_defined_obj($data_form, 'style')) {
            $style_input = ' style="' + $data_form['style'] + '" ';
          }
          
          /** Check For $data_form['placeholder'] : */
          if (js_utils.check_is_defined_obj($data_form, 'placeholder')) {
            $placeholder_input = ' placeholder="' + $data_form['placeholder'] + '" ';
          }
          
          /** Switch for conditions $type_input : */
          switch ($type_input) {
            /** Case for $type_input === 'text' : */
            case 'text' :
              $input_form = '<div class="form-group">';
              $input_form += '<div class="col-md-12">';
              $input_form += '<input type="text" name="' + $name_input + '"' + $id_input + $class_input + $attr_input + $style_input + $value_input + $placeholder_input + '>';
              $input_form += '</div>';
              $input_form += '</div>';
              break;
            
            /** Case for $type_input === 'radio' : */
            case 'radio' :
              $input_form = '<div class="form-group">';
              $input_form += '<div class="col-md-12">';
              $input_form += '<input type="radio" name="' + $name_input + '"' + $id_input + $class_input + $attr_input + $style_input + $value_input + $placeholder_input + '>';
              $input_form += '</div>';
              $input_form += '</div>';
              break;
            
            /** Case for $type_input === 'checkbox' : */
            case 'checkbox' :
              $input_form = '<div class="form-group">';
              $input_form += '<div class="col-md-12">';
              $input_form += '<input type="checkbox" name="' + $name_input + '"' + $id_input + $class_input + $attr_input + $style_input + $value_input + $placeholder_input + '>';
              $input_form += '</div>';
              $input_form += '</div>';
              break;
            
            /** Default Case : */
            default :
              $input_form = '<div class="form-group">';
              $input_form += '<div class="col-md-12">';
              $input_form += '<input type="text" name="' + $name_input + '"' + $id_input + $class_input + $attr_input + $style_input + $value_input + $placeholder_input + '>';
              $input_form += '</div>';
              $input_form += '</div>';
              break;
          }
          /** End of switch for conditions $type_input. */
          
          /** Check IF $selector is defined : */
          if (js_utils.check_is_defined($selector)) {
            $($selector).html($input_form);
            $result_action = 1;
          } else {
            $result_action = $input_form;
          }
          /** End of Check IF $selector is Undefined : */
          
        } else {
          console.error('Name Input is Undefined');
          $result_action = 0;
        }
        /** End of Check IF $data_form['name'] is undefined : */
        
      }
      /** End of Check IF $data_input is defined : */
      
      /** Check IF $data_input is undefined : */
      if ($data_input === undefined || $data_input === null || $data_input === '' || $data_input === "") {
        console.error('Data Input FORM is Undefined !!!');
        $result_action = 0;
      }
      /** End of Check IF $data_input is undefined. */
      
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
    Table_addon_radio: function ($data_input, $selector) {
      
      /** Define variable will be used in this function : */
      var $data_config, $place, $return_data;
      
      /** Check IF $data_input is defined : */
      if ($data_input !== undefined || $data_input !== null || $data_input !== '' || $data_input !== "") {
        
        /** Check IF $data_input is object : */
        if (typeof $data_input === "object") {
          
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
            var $id_radio = '', $attr_radio = '', $name_radio = '', $class_radio = '', $value_radio = '',
              $title_radio = '';
            
            /** Check FOR $data_config['id']: */
            if ($data_config[$i]['id'] !== undefined || $data_config[$i]['id'] !== null || $data_config[$i]['id'] !== '' || $data_config[$i]['id'] !== "") {
              $id_radio = ' id="' + $data_config[$i]['id'] + '" ';
            }
            
            /** Check FOR $data_config[$i]['class']: */
            if ($data_config[$i]['class'] !== undefined || $data_config[$i]['class'] !== null || $data_config[$i]['class'] !== '' || $data_config[$i]['class'] !== "") {
              $class_radio = ' class="' + $data_config[$i]['class'] + '" ';
            }
            
            /** Check FOR $data_config[$i]['attr]: */
            if ($data_config[$i]['attr'] !== undefined || $data_config[$i]['attr'] !== null || $data_config[$i]['attr'] !== '' || $data_config[$i]['attr'] !== "") {
              $attr_radio = ' ' + $data_config[$i]['attr'] + ' ';
            }
            
            /** Check FOR $data_config[$i]['name']: */
            if ($data_config[$i]['name'] !== undefined || $data_config[$i]['name'] !== null || $data_config[$i]['name'] !== '' || $data_config[$i]['name'] !== "") {
              $name_radio = $data_config[$i]['name'];
            }
            /** Check FOR $data_config[$i]['value']: */
            if ($data_config[$i]['value'] !== undefined || $data_config[$i]['value'] !== null || $data_config[$i]['value'] !== '' || $data_config[$i]['value'] !== "") {
              $value_radio = ' value="' + $data_config[$i]['value'] + '" ';
            }
            
            /** Check FOR $data_config[$i]['title']: */
            if ($data_config[$i]['title'] !== undefined || $data_config[$i]['title'] !== null || $data_config[$i]['title'] !== '' || $data_config[$i]['title'] !== "") {
              $title_radio = $data_config[$i]['title'];
            }
            
            /** Create Item FORM input : */
            $result_radio += '<div class="radio-check-img-list-edit">';
            /** Begin Wrapper Radio FORM. */
            $result_radio += '<div class="malltronik-radio-label">';
            /** Begin Wrapper Label Radio FORM. */
            $result_radio += $title_radio;
            /** Title Radio FORM. */
            $result_radio += '</div>';
            /** Ending Wrapper Label Radio FORM. */
            $result_radio += '<div class="malltronik-radio">';
            /** Begin Wrapper Item Radio FORM. */
            $result_radio += '<input type="radio" ' + $id_radio + $class_radio + $attr_radio + $value_radio + ' name="' + $name_radio + '"/>';
            $result_radio += '</div>';
            /** Ending Wrapper Item Radio FORM. */
            $result_radio += '</div>';
            /** Ending Wrapper Radio FORM. */
            
            /** Auto Increment : */
            $i++;
            
          }
          /** End of while loop to Create Item Radio FORM. */
          
          /** Ending Wrapper Radio FORM : */
          $result_radio += '</div>';
          
          /** Check IF $selector is defined : */
          if ($selector !== undefined || $selector !== null || $selector !== '' || $selector !== "") {
            
            /** Define variable for placing result : */
            $place = $selector;
            
            /** Placing result into selector : */
            $($place).html($result_radio);
            
            /** Return $result : */
            $return_data = 1;
            
          } else {
            
            /** Return $result : */
            $return_data = $result_radio;
            
          }
          /** End of Check IF $selector is defined : */
          
        }
        /** End of Check IF $data_input is object. */
        
        /** Check IF $data_input is not object : */
        if (typeof $data_input !== "object") {
          console.error('Data config not valid.');
          $return_data = 0;
        }
        /** End of Check IF $data_input is not object. */
        
      } else {
        console.error('Data Config Radio Input Form is undefined !!');
        $return_data = 0;
      }
      /** End of Check IF $data_input is undefined. */
      
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
    Table_addon_checkbox: function ($data_checkbox, $selector) {
      
      /** Define variable will be used in this function : */
      var $config_checkbox,
        $target_place,
        $wrap_checkbox = '',
        $inner_checkbox = '',
        $checkbox = '',
        $result_checkbox = '', $result;
      
      /** Check IF $data_checkbox is defined : */
      if ($data_checkbox !== undefined && ($data_checkbox !== '' || $data_checkbox !== "")) {
        
        /** Define variable for data config checkbox : */
        $config_checkbox = $data_checkbox;
        // console.log($config_checkbox);
        
        /** Define variable for data config checkbox : */
        var $id_wrap_checkbox = '', $class_wrap_checkbox = '', $attr_wrap_checkbox = '', $style_wrap_checkbox = '';
        var $id_inner_checkbox = '', $class_inner_checkbox = '', $attr_inner_checkbox = '', $style_inner_checkbox = '';
        var $id_checkbox = '', $class_checkbox = '', $attr_checkbox = '', $style_checkbox = '', $value_checkbox = '',
          $name_checkbox = '';
        
        // For Wrapper Checkbox :
        // ==================================================================================================
        
        /** Check IF $config_checkbox['wrap'] is defined : : */
        if ($config_checkbox['wrap'] !== undefined || $config_checkbox['wrap'] !== null || $config_checkbox['wrap'] !== '' || $config_checkbox['wrap'] !== "") {
          
          /** Check FOR $config_checkbox['wrap']['id'] : */
          if ($config_checkbox['wrap']['id'] !== undefined || $config_checkbox['wrap']['id'] !== null || $config_checkbox['wrap']['id'] !== '' || $config_checkbox['wrap']['id'] !== "") {
            $id_wrap_checkbox = ' id="' + $config_checkbox['wrap']['id'] + '" ';
          }
          
          /** Check FOR $config_checkbox['wrap']['class'] : */
          if ($config_checkbox['wrap']['class'] !== undefined || $config_checkbox['wrap']['class'] !== null || $config_checkbox['wrap']['class'] !== '' || $config_checkbox['wrap']['class'] !== "") {
            $class_wrap_checkbox = ' ' + $config_checkbox['wrap']['class'];
          }
          
          /** Check FOR $config_checkbox['wrap']['attr'] : */
          if ($config_checkbox['wrap']['attr'] !== undefined || $config_checkbox['wrap']['attr'] !== null || $config_checkbox['wrap']['attr'] !== '' || $config_checkbox['wrap']['attr'] !== "") {
            $attr_wrap_checkbox = ' ' + $config_checkbox['wrap']['attr'] + ' ';
          }
          
          /** Check FOR $config_checkbox['wrap']['style'] : */
          if ($config_checkbox['wrap']['style'] !== undefined || $config_checkbox['wrap']['style'] !== null || $config_checkbox['wrap']['style'] !== '' || $config_checkbox['wrap']['style'] !== "") {
            $style_wrap_checkbox = ' style="' + $config_checkbox['wrap']['style'] + '"';
          }
          
          /** Begin Wrapper Wrapper Checkbox : */
          $result_checkbox += '<div ' + $id_wrap_checkbox + 'class="' + $class_wrap_checkbox + '"' + $attr_wrap_checkbox + $style_wrap_checkbox + '>';
          
        }
        /** End of Check IF $config_checkbox['wrap'] is defined :. */
        
        // FOR Inner Checkbox :
        // ==================================================================================================
        
        /** Check IF $config_checkbox['inner'] is defined : */
        if ($config_checkbox['inner'] !== undefined || $config_checkbox['inner'] !== null || $config_checkbox['inner'] !== '' || $config_checkbox['inner'] !== "") {
          
          /** Check FOR $config_checkbox['inner']['id'] : */
          if ($config_checkbox['inner']['id'] !== undefined || $config_checkbox['inner']['id'] !== null || $config_checkbox['inner']['id'] !== '' || $config_checkbox['inner']['id'] !== "") {
            $id_inner_checkbox = 'id="' + $config_checkbox['inner']['id'] + '" ';
          }
          
          /** Check FOR $config_checkbox['inner']['class'] : */
          if ($config_checkbox['inner']['class'] !== undefined || $config_checkbox['inner']['class'] !== null || $config_checkbox['inner']['class'] !== '' || $config_checkbox['inner']['class'] !== "") {
            $class_inner_checkbox = 'class="' + $config_checkbox['inner']['class'] + '" ';
          }
          
          /** Check FOR $config_checkbox['inner']['attr'] : */
          if ($config_checkbox['inner']['attr'] !== undefined || $config_checkbox['inner']['attr'] !== null || $config_checkbox['inner']['attr'] !== '' || $config_checkbox['inner']['attr'] !== "") {
            $attr_inner_checkbox = $config_checkbox['inner']['attr'] + ' ';
          }
          
          /** Check FOR $config_checkbox['inner']['style'] : */
          if ($config_checkbox['inner']['style'] !== undefined || $config_checkbox['inner']['style'] !== null || $config_checkbox['inner']['style'] !== '' || $config_checkbox['inner']['style'] !== "") {
            $style_inner_checkbox = 'style="' + $config_checkbox['inner']['style'] + '" ';
          }
          
          /** Begin Inner Wrapper Checkbox : */
          $result_checkbox += '<span ' + $id_inner_checkbox + $class_inner_checkbox + $attr_inner_checkbox + $style_inner_checkbox + '>';
          
        }
        /** End of Check IF $config_checkbox['inner'] is defined. */
        
        // FOR Checkbox :
        // ==================================================================================================
        
        /** Check FOR $config_checkbox['checkbox']['id'] : */
        if ($config_checkbox['checkbox']['id'] !== undefined || $config_checkbox['checkbox']['id'] !== null || $config_checkbox['checkbox']['id'] !== '' || $config_checkbox['checkbox']['id'] !== "") {
          $id_checkbox = ' id="' + $config_checkbox + '" ';
        }
        
        /** Check FOR $config_checkbox['checkbox']['class'] : */
        if ($config_checkbox['checkbox']['class'] !== undefined || $config_checkbox['checkbox']['class'] !== null || $config_checkbox['checkbox']['class'] !== '' || $config_checkbox['checkbox']['class'] !== "") {
          $class_checkbox = ' class="' + $config_checkbox + '" ';
        }
        
        /** Check FOR $config_checkbox['checkbox']['attr'] : */
        if ($config_checkbox['checkbox']['attr'] !== undefined || $config_checkbox['checkbox']['attr'] !== null || $config_checkbox['checkbox']['attr'] !== '' || $config_checkbox['checkbox']['attr'] !== "") {
          $attr_checkbox = ' ' + $config_checkbox + ' ';
        }
        
        /** Check FOR $config_checkbox['checkbox']['style'] : */
        if ($config_checkbox['checkbox']['style'] !== undefined || $config_checkbox['checkbox']['style'] !== null || $config_checkbox['checkbox']['style'] !== '' || $config_checkbox['checkbox']['style'] !== "") {
          $style_checkbox = ' style="' + $config_checkbox + '" ';
        }
        
        /** Check FOR $config_checkbox['checkbox']['name'] : */
        if ($config_checkbox['checkbox']['name'] !== undefined || $config_checkbox['checkbox']['name'] !== null || $config_checkbox['checkbox']['name'] !== '' || $config_checkbox['checkbox']['name'] !== "") {
          $name_checkbox = ' name="' + $config_checkbox['checkbox']['name'] + '" ';
        }
        
        /** Check FOR $config_checkbox['checkbox']['value'] : */
        if ($config_checkbox['checkbox']['value'] !== undefined || $config_checkbox['checkbox']['value'] !== null || $config_checkbox['checkbox']['value'] !== '' || $config_checkbox['checkbox']['value'] !== "") {
          $value_checkbox = ' value="' + $config_checkbox['checkbox']['value'] + '" ';
        }
        
        /** Create Item Checkbox : */
        $result_checkbox += '<input type="checkbox"' + $class_checkbox + $name_checkbox + $value_checkbox + $style_checkbox + '>';
        
        /** Check IF $config_checkbox['inner'] is defined : */
        if ($config_checkbox['inner'] !== undefined || $config_checkbox['inner'] !== null || $config_checkbox['inner'] !== '' || $config_checkbox['inner'] !== "") {
          
          /** Begin Inner Wrapper Checkbox : */
          $result_checkbox += '</span>';
          
        }
        /** End of Check IF $config_checkbox['inner'] is defined. */
        
        /** Check IF $config_checkbox['wrap'] is defined. */
        if ($config_checkbox['wrap'] !== undefined || $config_checkbox['wrap'] !== null || $config_checkbox['wrap'] !== '' || $config_checkbox['wrap'] !== "") {
          
          /** Ending Wrapper Checkbox : */
          $result_checkbox += '</div>';
        }
        /** End of Check IF $config_checkbox['wrap'] is defined. */
        
        /** Check IF $selector is defined : */
        if ($selector !== undefined || $selector !== null || $selector !== '' || $selector !== "") {
          
          /** Define Target Place result : */
          $target_place = $($selector);
          
          /** Placing Result CHeckbox into target place : */
          $target_place.html($result_checkbox);
          
          /** Define result : */
          $result = 1;
          
        }
        /** End of Check IF $selector is defined. */
        
        /** Check IF $selector is undefined : */
        if ($selector === undefined || $selector === null || $selector === '' || $selector === "") {
          
          /** Placing Result Checkbox : */
          $result = $result_checkbox;
          
        }
        /** End of Check IF $selector is undefined. */
        
      }
      /** End of Check IF $data_checkbox is defined. */
      
      /** Check IF $data_checkbox is undefined : */
      if ($data_checkbox === undefined || $data_checkbox === null || $data_checkbox === '' || $data_checkbox === "") {
        console.error('Data config checkbox is undefined');
        $result = 0;
      }
      /** End of Check IF $data_checkbox is undefined. */
      
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
    Table_addon_img_fancybox: function ($config, $selector) {
      
      /** Define variable will be used in this function : */
      var $data_config, $item_img = '', $result_creator = null;
      
      /** Check IF $config is defined : */
      if ($config !== undefined || $config !== null || $config !== '' || $config !== "") {
        
        /** Define data config : */
        $data_config = $config;
        
        /** Define variable for data config image fancybox : */
        var $id_img = '', $id_tag_a = '', $class_img = '', $attr_img = '', $style_img = '', $url_img = '';
        
        /** Check For $data_config['id'] : */
        if ($data_config['id'] !== undefined || $data_config['id'] !== null || $data_config['id'] !== '' || $data_config['id'] !== "") {
          $id_img = ' id="' + $data_config['id'] + '" ';
          $id_tag_a = $data_config['id'];
        }
        
        /** Check For $data_config['class'] : */
        if ($data_config['class'] !== undefined || $data_config['class'] !== null || $data_config['class'] !== '' || $data_config['class'] !== "") {
          $class_img = $data_config['class'];
        }
        
        /** Check For $data_config['attr'] : */
        if ($data_config['attr'] !== undefined || $data_config['attr'] !== null || $data_config['attr'] !== '' || $data_config['attr'] !== "") {
          $attr_img = $data_config['attr'];
        }
        
        /** Check For $data_config['style'] : */
        if ($data_config['style'] !== undefined || $data_config['style'] !== null || $data_config['style'] !== '' || $data_config['style'] !== "") {
          $style_img = ' style="' + $data_config['style'] + '" ';
        }
        
        /** Check For $data_config['url-akses'] : */
        if ($data_config['url'] !== undefined || $data_config['url'] !== null || $data_config['url'] !== '' || $data_config['url'] !== "") {
          $url_img = $data_config['url'];
        }
        
        /** Create Item Image : */
        $item_img += '<a id="' + $id_tag_a + '-atag" data-href="' + $url_img + '" target="blank" class="fancybox-button" data-rel="fancybox-button">';
        $item_img += '<img ' + $id_img + 'class="img-responsive ' + $class_img + '" src="' + $url_img + '" ' + $attr_img + ' alt="" ' + $style_img + '>';
        $item_img += '</a>';
        
        /** Check IF $selector is defined : */
        if ($selector !== undefined && ($selector !== '' || $selector !== "")) {
          // $($selector).html($item_img);
          
          var $target_selector = document.querySelector($selector);
          $target_selector.innerHTML = $item_img;
          
          $result_creator = 1;
        } else {
          $result_creator = $item_img;
        }
        /** End of Check IF $selector is undefined. */
        
      } else {
        console.error('Data Config is undefiend');
        $result_creator = 0;
      }
      /** End of Check IF $config is defined. */
      
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
     *        'id' : '',
     *        'class' : '',
     *        'attr' : '',
     *        'style' : '',
     *        'title' : '',
     *        'icon' : '',
     *        'href' : '',
     *      }
     * ]
     *
     * @param $data_button {object} Variable yang berisi data config untuk membuat button.
     * @param $selector {string} Variable yang berisi
     */
    Table_addon_button: function ($data_button, $selector) {
      
      /** Define Variable will be used in this function : */
      var $config_button, $target_place, $result_button = '', $result;
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Check IF $data_button is defined : */
      if (js_utils.check_is_defined($data_button)) {
        
        /** Define Config Button : */
        $config_button = $data_button;
        
        /** Define variable for placing attribute HTML TAG : */
        var $id_button = '', $class_button = '', $attr_button = '', $style_button = '',
          $title_button = 'Undefined Title', $icon_button = '', $href_button = '';
        
        /** Prepare while loop to Create Button : */
        var $i = 0;
        var $until_loop = $config_button.length;
        var $data_cfg_button;
        
        /** While loop to Create Button : */
        while ($i < $until_loop) {
          $data_cfg_button = $config_button[$i];
          
          /** Check FOR $config_button[$i]['id'] : */
          if (js_utils.check_is_defined_obj($data_cfg_button, 'id')) {
            $id_button = ' id="' + $data_cfg_button['id'] + '" ';
          }
          
          /** Check FOR $data_cfg_button['class'] : */
          if (js_utils.check_is_defined_obj($data_cfg_button, 'class')) {
            $class_button = ' class="' + $data_cfg_button['class'] + '" ';
          }
          
          /** Check FOR $data_cfg_button['attr'] : */
          if (js_utils.check_is_defined_obj($data_cfg_button, 'attr')) {
            $attr_button = ' ' + $data_cfg_button['attr'] + ' ';
          }
          
          /** Check FOR $data_cfg_button['style'] : */
          if (js_utils.check_is_defined_obj($data_cfg_button, 'style')) {
            $style_button = ' style="' + $data_cfg_button['style'] + '"';
          }
          
          /** Check FOR $data_cfg_button['title'] : */
          if (js_utils.check_is_defined_obj($data_cfg_button, 'title')) {
            $title_button = $data_cfg_button['title'];
          }
          
          /** Check FOR $data_cfg_button['icon'] : */
          if (js_utils.check_is_defined_obj($data_cfg_button, 'icon')) {
            $icon_button = $data_cfg_button['icon'];
          }
          
          /** Check FOR $data_cfg_button['href'] : */
          if (js_utils.check_is_defined_obj($data_cfg_button, 'href')) {
            $href_button = 'href="' + $data_cfg_button['href'] + '" ';
          } else {
            $href_button = '';
          }
          
          /** Create Item Button : */
          $result_button += '<button ' + $href_button + $id_button + $class_button + $attr_button + $style_button + '>' + $icon_button + ' ' + $title_button + '</button>';
          
          /** Auto Increment : */
          $i++;
        }
        /** End of while loop to Create Button. */
        
        /** Check IF $selector is defined : */
        if (js_utils.check_is_defined($selector)) {
          
          /** Define Selector : */
          // $target_place = $($selector);
          
          /** Placing result into inner $target_place : */
            // $target_place.html($result_button);
          var r_selector = document.querySelector($selector);
          r_selector.innerHTML = $result_button;
          
          /** Return Result : */
          $result = 1;
          
        } else {
          
          /** Define Return Result : */
          $result = $result_button;
          
        }
        /** End of Check IF $selector is undefined. */
        
      } else {
        
        /** Define Return Result : */
        $result = 0;
        
        /** Create Error Log : */
        console.error('Data config Button tidak didefinisikan');
      }
      /** End of Check IF $data_button is undefined. */
      
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
     *            'config' : {
     *              'id' : '',
     *              'class' : '',
     *              'attr' : '',
     *              'style' : '',
     *              'name' : '',
     *            },
     *            'option' : [
     *                {
     *                  'id' : '',
     *                  'class' : '',
     *                  'attr' : '',
     *                  'style' : '',
     *                  'name' : '',
     *                  'value' : '',
     *                }
     *            ]
     *          }
     * ]
     *
     * @param $data_select {object} Variable yang berisi data config untuk membuat form SELECT.
     * @param $selector {string} Variable yang berisi target penempatan hasil pembuatan form SELECT.
     */
    Table_addon_select_bootstrap: function ($data_select, $selector) {
      
      /** Define variable will be used in this function : */
      var $config_select, $target_place, $result_select = '', $result;
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Check if $data_select is defined : */
      if (js_utils.check_is_defined($data_select)) {
        
        /** Define config $select : */
        $config_select = $data_select;
        
        /** For Debug :*/
        //console.log($config_select);
        
        /** Prepare while loop to Create Select FORM : */
        var $i = 0;
        var $until_loop = $config_select.length;
        var $data_cfg_select;
        
        /** While loop to Create Select FORM : */
        while ($i < $until_loop) {
          $data_cfg_select = $config_select[$i];
          
          /** Check IF $config_select[$i]['config'] is defined : */
          if (js_utils.check_is_defined_obj($data_cfg_select, 'config')) {
            
            /** Check IF $data_cfg_select['option'] is defined : */
            if (js_utils.check_is_defined_obj($data_cfg_select, 'option')) {
              
              /** Define variable for config select FORM : */
              var $select_config = $data_cfg_select['config'];
              
              /** Define variable for Attribute Select FORM : */
              var $id_select = '', $class_select = 'class="bs-select form-control" ',
                $attr_select = '', $style_select = '', $name_select = '';
              
              /** Check FOR $select_config['id'] : */
              if (js_utils.check_is_defined_obj($select_config, 'id')) {
                $id_select = 'id="' + $select_config['id'] + '"';
              }
              
              /** Check FOR $select_config['class'] : */
              if (js_utils.check_is_defined_obj($select_config, 'class')) {
                $class_select = 'class="bs-select form-control ' + $select_config['class'] + '" ';
              }
              
              /** Check FOR $select_config['attr'] : */
              if (js_utils.check_is_defined_obj($select_config, 'attr')) {
                $attr_select = $select_config['attr'] + '';
              }
              
              /** Check FOR $select_config['style'] : */
              if (js_utils.check_is_defined_obj($select_config, 'style')) {
                $style_select = 'style="' + $select_config['style'] + '"';
              }
              
              /** Check FOR $select_config['name'] : */
              if (js_utils.check_is_defined_obj($select_config, 'name')) {
                $name_select = 'name="' + $select_config['name'] + '" ';
              }
              
              /** Begin FORM SELECT : */
              $result_select += '<select ' + $id_select + $class_select + $name_select +
                $attr_select + $style_select + '>';
              
              /** Create Option Select : */
              $result_select += this.Table_addon_option_select($data_cfg_select['option']);
              
              /** Ending FORM Select : */
              $result_select += '</select>';
              
            } else {
              console.error('Data config Option FORM Select is undefined');
              $result_select = 0;
              break;
            }
            /** End of Check IF $data_cfg_select['option'] is undefined. */
            
          } else {
            console.error('Config FORM Select is undefined');
            $result_select = 0;
            break;
          }
          /** End of Check IF $config_select[$i]['config'] is undefined. */
          
          /** Auto Increment : */
          $i++;
        }
        /** End of while loop to Create Select FORM. */
        
        /** Check IF $result_select !== 0 : */
        if ($result_select !== 0) {
          
          /** Check IF $selector is defined : */
          if (js_utils.check_is_defined($selector)) {
            
            /** Define variable for Target Place result option select : */
            // $target_place = $($selector);
            $target_place = document.querySelector($selector);
            
            /** Placing result : */
            // $target_place.html($result_select);
            $target_place.innerHTML = $result_select;
            
          } else {
            
            /** Define result : */
            $result = $result_select;
            
          }
          /** End of Check IF $selector is defined. */
          
        } else {
          $result = 0;
        }
        /** End of Check IF $result_select === 0 : */
        
      } else {
        console.error('Data Config Select is undefined');
        $result = 0;
      }
      /** End of Check IF $data_select is undefined. */
      
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
     *        'id' : '',
     *        'class' : '',
     *        'attr' : '',
     *        'style' : '',
     *        'value' : '',
     *        'name' : '',
     *      }
     * ]
     *
     * ---
     *
     * @param $data_option {object} Variable yang berisi data config option.
     * @param $selector {string} Variable yang berisi nama selector untuk menyimpan hasil pembuatan option select.
     */
    Table_addon_option_select: function ($data_option, $selector) {
      
      /** Define variable will be used in this function : */
      var $config_option = '', $target_place, $result_option = '', $result;
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Check IF $data_option is defined : */
      if (js_utils.check_is_defined($data_option)) {
        
        /** Define data config option select : */
        $config_option = $data_option;
        
        /** Prepare while loop to Create Option Select : */
        var $i = 0;
        var $until_loop = $config_option.length;
        
        /** While loop to Create Option Select : */
        while ($i < $until_loop) {
          
          /** Define variable for data config option select : */
          var $id_option = '', $class_option = 'class="bs-select form-control"', $attr_option = '',
            $style_option = '', $value_option = 'value="undef"', $name_option = '';
          
          /** Check FOR $config_option[$i]['id'] : */
          if (js_utils.check_is_defined_obj($config_option[$i], 'id')) {
            $id_option = 'id="' + $config_option[$i]['id'] + '" ';
          }
          
          /** Check FOR $config_option[$i]['class'] : */
          if (js_utils.check_is_defined_obj($config_option[$i], 'class')) {
            $class_option = 'class="bs-select form-control ' + $config_option[$i]['class'] + '" ';
          }
          
          /** Check FOR $config_option[$i]['attr'] : */
          if (js_utils.check_is_defined_obj($config_option[$i], 'attr')) {
            $attr_option = $config_option[$i]['attr'] + ' ';
          }
          
          /** Check FOR $config_option[$i]['style'] : */
          if (js_utils.check_is_defined_obj($config_option[$i], 'style')) {
            $style_option = ' style="' + $config_option[$i]['style'] + '" ';
          }
          
          /** Check FOR $config_option[$i]['value'] : */
          if (js_utils.check_is_defined_obj($config_option[$i], 'value')) {
            $value_option = 'value="' + $config_option[$i]['value'] + '" ';
          }
          
          /** Check FOR $config_option[$i]['value'] : */
          if (js_utils.check_is_defined_obj($config_option[$i], 'name')) {
            $name_option = $config_option[$i]['name'];
          }
          
          /** Create Option Select : */
          $result_option += '<option ' + $id_option + $class_option + $attr_option + $style_option + $value_option + '>' + $name_option + '</option>';
          
          /** Auto Increment : */
          $i++;
        }
        /** End of while loop to Create Option Select. */
        
        /** Check IF $selector is defined : */
        if (js_utils.check_is_defined($selector)) {
          
          /** Define Variable for selector : */
          // $target_place = $selector;
          $target_place = document.querySelector($selector);
          
          /** Placing result option into target selector : */
          // $($target_place).html($result_option);
          $target_place.innerHTML = $result_option;
          
          
          /** Define result : */
          $result = 1;
          
        } else {
          
          /** Define result : */
          $result = $result_option;
          
        }
        /** End of Check IF $selector is undefined. */
        
      } else {
        
        /** Define Log Error : */
        console.error('Data config option is undefined');
        
        /** Define result : */
        $result = 0;
      }
      /** End of Check IF $data_option is undefined. */
      
      /** Return Result : */
      return $result;
    },
    /** End of For Create Option Select Bootstrap.
     * ===================================================================================================== */
    
    /** For create HTML Tag :
     * -----------------------------------------------------------
     */
    Tag: function (tag, config, content, place) {
      
      /** Define variable will be used in this function : */
      var $result, $data = '';
      
      var js_utils = CellBIS_jsUtils.init();
      
      if (js_utils.check_is_defined(tag)) {
        
        if (typeof config === 'object') {
          
          var $new_data = '';
          var $objK = Object.keys(config);
          var $i = 0;
          var $until = $objK.length;
          while ($i < $until) {
            if (js_utils.check_is_defined_obj(config, $objK[$i])) {
              if ($objK[$i] !== 'attr') {
                $new_data += $objK[$i] + '="' + config[$objK[$i]] + '" ';
              } else {
                $new_data += config[$objK[$i]] + ' ';
              }
            }
            $i++;
          }
          
          $data = '<' + tag + ' ' + $new_data;
          $data = $data.replace(/([\s]+)$/, "");
          $data += '>';
          $data += content;
          $data += '</' + tag + '>';
          
          /** For Check Place : */
          if (typeof place === "object") {
            if (js_utils.check_is_defined_obj(place, 'selector') && js_utils.check_is_defined_obj(place, 'type')) {
              var $selector_place = place['selector'];
              var $type_place = place['type'];
              switch ($type_place) {
                case 'append' :
                  $($selector_place).append($data);
                  break;
                case 'replace' :
                  $($selector_place).html($data);
                  break;
              }
              $result = 1;
            } else {
              $result = $data;
            }
          } else {
            $result = $data;
          }
          
        } else {
          console.error('CellBIS_html.Tag -> param "config" is not object');
        }
        
      } else {
        console.error('CellBIS_html.Tag -> param "tag" is not valid');
      }
      
      /** Return Result : */
      return $result;
    }
    /** End of For create HTML Tag.
     * ===================================================================================================== */
  };
  window.CellBIS_html_utils = {
    form_required: function (color) {
      var $data_color = '';
      var $color_required = {
        'red': '#ff0000',
        'white': '#FAFAFA',
      };
      if (color && $color_required[color]) {
        $data_color = $color_required[color];
      }
      else if (color && !$color_required[color]) {
        $data_color = color;
      }
      else if (!color) {
        $data_color = $color_required['red'];
      }
      return '<span id="form-required" style="color:' + $data_color + '">*</span>';
    }
  };
  window.CellBIS_Bootstrap = {
    
    /** For Create Bootstrap Alert :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat alert bootstrap.
     */
    Alert: function (config) {
      
      /** Define variable will be use in this function : */
      var $title, $type_alert, $message;
      var result;
      var $data = '';
      
      var defaults = {
        type: 'info',
        title: 'Info',
        msg: '',
        place: ''
      };
      
      var settings = $.extend({}, defaults, config);
      
      if (settings.type) {
        $type_alert = settings.type;
        if (settings.type === 'error') {
          $type_alert = 'danger';
        }
        $data += '<div class="alert alert-' + $type_alert + '" role="alert">';
      } else {
        $data += '<div class="alert alert-info" role="alert">';
      }
      
      if (settings.title) {
        $data += '<h4 class="alert-heading">' + settings.title + '</h4>';
      }
      
      if (settings.msg) {
        $data += settings.msg;
      }
      $data += '</div>';
      
      if (settings.place && typeof settings.place === "object") {
        var $selector_place = settings.place['selector'];
        var $type_place = settings.place['type'];
        switch ($type_place) {
          case 'append' :
            $($selector_place).append($data);
            break;
          case 'replace' :
            $($selector_place).html($data);
            break;
        }
        result = 1;
      } else {
        result = $data;
      }
      return result;
    },
    /** End of For Create Bootstrap Alert.
     * ===================================================================================================== */
    
    /** For Create Button Footer Modal :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat Button Modal Footer.
     *
     * Format Object Button :
     * -------------------------------------
     * object [
     *      {
     *        'id' => '',
     *        'class' => '',
     *        'attr' => '',
     *        'title' => '',
     *        'type' => [ 'close' || 'default' ],
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
    modal_footer_button: function ($config, $place) {
      
      /** Define variable will be used in this function : */
      var $result, $data = '';
      var $id_button = '', $class_button = '', $attr_button = '',
        $title_button = '', $button_type = 'button', $button_attr = '';
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Check IF $config is defined : */
      if (js_utils.check_is_defined($config)) {
        
        /** Prepare while loop to Create Button Footer Modal : */
        var $i = 0;
        var $until_loop = $config.length;
        var $data_button;
        
        /** While loop to Create Button Footer Modal : */
        while ($i < $until_loop) {
          $data_button = $config[$i];
          
          /** Check ID Button : */
          if (js_utils.check_is_defined_obj($data_button, 'id')) {
            $id_button = 'id="' + $data_button['id'] + '" ';
          }
          
          /** Check Class Button : */
          if (js_utils.check_is_defined_obj($data_button, 'class')) {
            $class_button = $data_button['class'];
          }
          
          /** Check IF $data_button['type'] is defined : */
          if (js_utils.check_is_defined_obj($data_button, 'type')) {
            
            /** Check IF $data_button['type'] === 'close' */
            if ($data_button['type'] === 'close') {
              $button_attr = 'data-dismiss="modal" ';
            }
            
            /** Check Attr Button : */
            if (js_utils.check_is_defined_obj($data_button, 'attr')) {
              $attr_button = ' ' + $button_attr + ' ' + $data_button['attr'];
            }
          }
          
          /** For Check Title Button : */
          if (js_utils.check_is_defined_obj($data_button, 'title')) {
            $title_button = $data_button['title'];
          }
          
          /** Button Type */
          if (js_utils.check_is_defined_obj($data_button, 'type')) {
            if ($data_button['type'] === 'submit') {
              $button_type = 'submit';
            }
          }
          
          /** Create Button : */
          $data += '<button ' + $id_button + 'type="' + $button_type + '" ' + $button_attr + 'class="btn ' + $class_button + '" ' + $attr_button + '>' + $title_button + '</button>';
          
          /** Check Title Button : */
          
          /** Auto Increment : */
          $i++;
        }
        /** End of while loop to Create Button Footer Modal. */
        
        /** For Check Place : */
        if (js_utils.check_is_defined($place)) {
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
        } else {
          $result = $data;
        }
        
      } else {
        console.error('$config Parameter is undefined');
        $result = 0;
      }
      /** End of Check IF $config is undefined. */
      
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
    modal: function ($config, $content, $button, $place, $place_button) {
      
      /** Define variable will be used in this function : */
      var $result, $content_modal = '', $button_modal = '', $place_modal = '';
      var $data = '';
      var $id_modal = '', $title_modal = '', $attr_modal = '';
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Jika $config is exist : */
      if (js_utils.check_is_defined($config)) {
        
        /** For Content Modal : */
        if (js_utils.check_is_defined($content)) {
          $content_modal = $content;
        }
        
        /** For Button Modal : */
        if (js_utils.check_is_defined($button)) {
          $button_modal = this.modal_footer_button($button, $place_button);
        }
        
        /** For ID Modal : */
        if (js_utils.check_is_defined_obj($config, 'id')) {
          $id_modal = 'id="' + $config['id'] + '" ';
        }
        
        /** For Title Modal : */
        if (js_utils.check_is_defined_obj($config, 'title')) {
          $title_modal = $config['title']
        }
        
        /** For attribute Modal : */
        if (js_utils.check_is_defined_obj($config, 'attr')) {
          $attr_modal = $config['attr'] + ' ';
        }
        
        /** Header Modal : */
        $data += '<div class="modal fade" ' + $id_modal + $attr_modal + 'data-backdrop="static" data-keyboard="false" tabindex="-1" role="basic" aria-hidden="true">';
        $data += '<div class="modal-dialog">';
        $data += '<div class="modal-content">';
        $data += '<div class="modal-header">';
        $data += '<h4 class="modal-title">' + $title_modal + '</h4>';
        $data += '<button type="button" class="close fa fa-times" data-dismiss="modal" aria-hidden="true"></button>';
        $data += '</div>';
        $data += '<div class="modal-body">';
        
        /** Place Content Modal : */
        $data += $content_modal;
        
        /** Footer Modal : */
        $data += '</div>';
        $data += '<div class="modal-footer">';
        $data += $button_modal;
        $data += '</div>';
        $data += '</div>'; // .modal-content
        $data += '</div>'; // .modal-dialog
        $data += '</div>';
        
        /** Check IF $place is not null and object : */
        if (js_utils.check_is_defined($place)) {
          /** Check IF $place is object : */
          if (typeof $place === 'object') {
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
          } else {
            $result = $data;
          }
          /** End of Check IF $place is object. */
          
        } else {
          $result = $data;
        }
        /** End of Check IF $place is null and object. */
        
      } else {
        console.error('Parameter $config is undefined.');
        $result = 0;
      }
      /** End of Jika $config is not exist. */
      
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
     *      'modal' => {
     *      'header' => {
     *        }
     *      }
     * }
     *
     * Format Object Button :
     * -------------------------------------
     * object [
     *      {
     *        'id' => '',
     *        'class' => '',
     *        'attr' => '',
     *        'title' => '',
     *        'type' => [ 'close' || 'default' ],
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
     * @param $config       {object}    Berisi data config Modal.
     * @param $content      {object}    Berisi Content Data Modal.
     * @param $button       {object}    Berisi Data Config Modal Modal.
     * @param $place        {object}    Berisi Data Config Place Modal.
     * @param $place_button {object}    Berisi Data Config Place BUtton Modal.
     *
     */
    modal_large: function ($config, $content, $button, $place, $place_button) {
      
      /** Define variable will be used in this function : */
      var $result, $content_modal = '', $button_modal = '', $place_modal;
      var $data = '';
      var $id_modal = '', $title_modal = '', $attr_modal = '';
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Jika $config is exist : */
      if (js_utils.check_is_defined($config)) {
        
        /** For Content Modal : */
        if (js_utils.check_is_defined($content)) {
          $content_modal = $content;
        }
        
        /** For Button Modal : */
        if (js_utils.check_is_defined($button)) {
          $button_modal = this.modal_footer_button($button, $place_button);
        }
        
        /** For ID Modal : */
        if (js_utils.check_is_defined_obj($config, 'id')) {
          $id_modal = 'id="' + $config['id'] + '" ';
        }
        
        /** For Title Modal : */
        if (js_utils.check_is_defined_obj($config, 'title')) {
          $title_modal = $config['title']
        }
        
        /** For attribute Modal : */
        if (js_utils.check_is_defined_obj($config, 'attr')) {
          $attr_modal = $config['attr'] + ' ';
        }
        
        /** Header Modal : */
        $data += '<div class="modal fade bs-modal-lg" ' + $id_modal + $attr_modal + 'data-backdrop="static" data-keyboard="false" tabindex="-1" role="basic" aria-hidden="true">';
        $data += '<div class="modal-dialog modal-lg">';
        $data += '<div class="modal-content">';
        $data += '<div class="modal-header">';
        $data += '<h4 class="modal-title">' + $title_modal + '</h4>';
        $data += '<button type="button" class="close fa fa-times" data-dismiss="modal" aria-hidden="true"></button>';
        $data += '</div>';
        $data += '<div class="modal-body">';
        
        /** Place Content Modal : */
        $data += $content_modal;
        
        /** Footer Modal : */
        $data += '</div>';
        $data += '<div class="modal-footer">';
        $data += $button_modal;
        $data += '</div>';
        $data += '</div>'; // .modal-content
        $data += '</div>'; // .modal-dialog
        $data += '</div>';
        
        /** Check IF $place is not null and object : */
        if (js_utils.check_is_defined($place)) {
          /** Check IF $place is object : */
          if (typeof $place === 'object') {
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
          } else {
            $result = $data;
          }
          /** End of Check IF $place is object. */
          
        } else {
          $result = $data;
        }
        /** End of Check IF $place is null and object. */
        
      } else {
        
        console.error('Parameter $config is undefined.');
        $result = 0;
      }
      /** End of Jika $config is not exist. */
      
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
     *          'style' => '',
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
    button: function ($type_tag, $config, $place) {
      
      /** Define variable will be used in this function : */
      var $result, $data = '', $type_tag_button;
      var $id_button = '', $class_button = 'class="btn" ', $attr_button = '',
        $title_button = '', $type_button = 'button', $style_button = '';
      
      // Initialization CellBIS_jsUtils :
      var js_utils = CellBIS_jsUtils.init();
      
      /** Check Type Tag : */
      if (js_utils.check_is_defined($type_tag)) {
        if ($type_tag === 'button') {
          $type_tag_button = 'button';
        } else if ($type_tag === 'a') {
          $type_tag_button = 'a';
        }
      }
      
      /** Check IF $config is defined : */
      if (js_utils.check_is_defined($config)) {
        
        /** Prepare while loop to Create Button Footer Modal : */
        var $i = 0;
        var $ib = 0;
        var $until_b = 0;
        var $until_loop = $config.length;
        var $object_cfg_btn;
        var $data_cfg_button;
        
        /** While loop to Create Button Footer Modal : */
        if ($until_loop > 1) {
          while ($i < $until_loop) {
            $data_cfg_button = $config[$i];
            $object_cfg_btn = Object.keys($data_cfg_button);
            
            $ib = 0;
            $until_b = $object_cfg_btn.length;
            for ($ib = 0; $ib < $until_b; $ib++) {
              if (js_utils.check_is_defined_obj($data_cfg_button, $object_cfg_btn[$ib])) {
                switch ($object_cfg_btn[$ib]) {
                  case 'id' :
                    $id_button = 'id="' + $data_cfg_button[$object_cfg_btn[$ib]] + '" ';
                    break;
                  case 'class' :
                    $class_button = 'class="btn' + $data_cfg_button[$object_cfg_btn[$ib]] + '" ';
                    break;
                  case 'attr' :
                    $attr_button = $data_cfg_button[$object_cfg_btn[$ib]] + ' ';
                    break;
                  case 'type' :
                    if ($data_cfg_button[$object_cfg_btn[$ib]] === 'submit') {
                      $type_button = 'submit';
                    }
                    break;
                  case 'title' :
                    $title_button = $data_cfg_button[$object_cfg_btn[$ib]];
                    break;
                  case 'style' :
                    $style_button = 'style="' + $data_cfg_button[$object_cfg_btn[$ib]] + '"';
                    break;
                }
              }
            }
            
            /** Create Button : */
            $data += '<' + $type_tag_button + ' ' + $id_button + 'type="' + $type_button + '" ' + $class_button + $attr_button + $style_button + '>' + $title_button + '</' + $type_tag_button + '>';
            
            $i++;
          }
          /** End of while loop to Create Button Footer Modal. */
        } else {
          
          $data_cfg_button = $config[0];
          $object_cfg_btn = Object.keys($data_cfg_button);
          var $i1;
          for ($i1 = 0; $i1 < $object_cfg_btn.length; $i1++) {
            if (js_utils.check_is_defined_obj($data_cfg_button, $object_cfg_btn[$i1])) {
              switch ($object_cfg_btn[$i1]) {
                case 'id' :
                  $id_button = 'id="' + $data_cfg_button[$object_cfg_btn[$i1]] + '" ';
                  break;
                case 'class' :
                  $class_button = 'class="' + $data_cfg_button[$object_cfg_btn[$i1]] + '" ';
                  break;
                case 'attr' :
                  $attr_button = $data_cfg_button[$object_cfg_btn[$i1]] + ' ';
                  break;
                case 'type' :
                  if ($data_cfg_button[$object_cfg_btn[$i1]] === 'submit') {
                    $type_button = 'submit';
                  }
                  break;
                case 'title' :
                  $title_button = $data_cfg_button[$object_cfg_btn[$i1]];
                  break;
                case 'style' :
                  $style_button = 'style="' + $data_cfg_button[$object_cfg_btn[$i1]] + '"';
                  break;
              }
            }
          }
          
          /** Create Button : */
          $data += '<' + $type_tag_button + ' ' + $id_button + 'type="' + $type_button + '" ' + $class_button + $attr_button + $style_button + '>' + $title_button + '</' + $type_tag_button + '>';
        }
        
        /** For Check Place : */
        if (js_utils.check_is_defined($place) && typeof $place === "object") {
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
        } else {
          $result = $data;
        }
      } /** End of Check IF $config is defined. */
      
      /** Check IF $config is undefined : */
      else {
        console.error('$config Parameter is undefined');
        $result = 0;
      }
      /** End of Check IF $config is undefined. */
      
      /** Return Result : */
      return $result;
    },
    /** label Tag :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat label bootstrap
     *
     * Format Object Input :
     * -----------------------------------------------------------
     * object {
     *    'id' : '',
     *    'class' : '',
     *    'style' : '',
     *    'attr' : '',
     *    'for' : '',
     * }
     *
     * Format Object Place :
     * -----------------------------------------------------------
     * object {
     *    'selector' : '<selector id or class>',
     *    'type' : 'append || replace'
     * }
     *
     * Format Object Place :
     * -----------------------------------------------------------
     * object {
     *    'selector' => '<selector id or class>',
     *    'type' => 'append || replace'
     * }
     *
     * @param name
     * @param config
     * @param place
     *
     */
    label: function (name, config, place) {
      
      /** Define variable will be used in this function : */
      var $result, $data;
      var $id = '', $class = '', $style = '', $attr = '', $for = '';
      
      /** Check IF config is undefined : */
      if (typeof config !== 'object') {
        console.error('$config Parameter is undefined');
        $result = 0;
      }
      /** End of Check IF $config is undefined. */
      
      /** Check If config is defined and is equals object **/
      else {
        
        /** For tag attributes **/
        var $new_data = '';
        var $objK = Object.keys(config);
        var $i = 0;
        var $until = $objK.length;
        while ($i < $until) {
          if (CellBIS_jsUtils.check_is_defined(config[$objK[$i]])) {
            if ($objK[$i] !== 'attr') {
              $new_data += $objK[$i] + '="' + config[$objK[$i]] + '" ';
            } else {
              $new_data += config[$objK[$i]];
            }
          }
          $i++;
        }
        
        /** Place result */
        $data = '<label ' + $new_data;
        $data = $data.replace(/([\s]+)$/, "");
        $data += '>';
        $data += name;
        $data += '</label>';
        
        /** For Check Place : */
        if (place !== undefined || place !== null || place !== '' || place !== "") {
          var $selector_place = place['selector'];
          var $type_place = place['type'];
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
        if (place === undefined || place === null || place === '' || place === "") {
          $result = $data;
        }
      }
      /** Check If config is defined and is equals object **/
      
      /** Return Result : */
      return $result;
      
    },
    /** Input Tag :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat input bootstrap
     *
     * Format Object Input :
     * -----------------------------------------------------------
     * object {
     *    'id' : '',
     *    'class' : '',
     *    'style' : '',
     *    'attr' : '',
     *    'type' : '',
     *    'name' : '',
     *    'value' : '',
     *    'placeholder' : '',
     * }
     *
     * Format Object Place :
     * -----------------------------------------------------------
     * object {
     *    'selector' : '<selector id or class>',
     *    'type' : 'append || replace'
     * }
     *
     * Format Object Place :
     * -----------------------------------------------------------
     * object
     *
     * @param config
     * @param place
     *
     */
    input: function (config, place) {
      
      /** Define variable will be used in this function : */
      var $result, $data, $type_input = 'type="text"';
      
      /** Check IF config is undefined : */
      if (typeof config !== 'object') {
        console.error('$config Parameter is undefined');
        $result = 0;
      }
      /** End of Check IF $config is undefined. */
      
      /** Check If config is defined and is equals object **/
      else {
        
        var $new_data = '';
        var $objK = Object.keys(config);
        var $i = 0;
        var $until = $objK.length;
        while ($i < $until) {
          if (CellBIS_jsUtils.check_is_defined(config[$objK[$i]])) {
            if ($objK[$i] !== 'attr') {
              $new_data += $objK[$i] + '="' + config[$objK[$i]] + '" ';
            } else {
              $new_data += config[$objK[$i]] + ' ';
            }
          }
          $i++;
        }
        
        if (!config['type']) {
          $new_data += $type_input;
        }
        
        $data = '<input ' + $new_data;
        $data = $data.replace(/([\s]+)$/, "");
        $data += '>';
        
        /** For Check Place : */
        if (CellBIS_jsUtils.check_is_defined(place)) {
          var $selector_place = place['selector'];
          var $type_place = place['type'];
          switch ($type_place) {
            case 'append' :
              $($selector_place).append($data);
              break;
            case 'replace' :
              $($selector_place).html($data);
              break;
          }
          $result = 1;
        } else {
          $result = $data;
        }
      }
      /** Check If config is defined and is equals object **/
      
      /** Return Result : */
      return $result;
    },
    /** For Tag Option Form Select :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk membuat "option"
     * form select.
     *
     *
     * Format Object Option :
     * -----------------------------------------------------------
     * object {
     *    'id' : '',
     *    'class' : '',
     *    'style' : '',
     *    'attr' : '',
     *    'name' : '',
     *    'value' : '',
     *    'content' : '',
     * }
     *
     * Format Object Place :
     * -----------------------------------------------------------
     * object
     *
     * @param config
     */
    option_select: function (config) {
      
      /** Define variable will be used in this function : */
      var $result, $data = '';
      var $for_optionSelect = '';
      var $content_option = '';
      
      /** Check IF config is undefined : */
      if (typeof config !== 'object') {
        console.error('$config Parameter is undefined');
      }
      /** End of Check IF $config is undefined. */
      
      /** Check If config is defined and is equals object **/
      else {
        var $objK = Object.keys(config);
        var $i = 0;
        var $until = $objK.length;
        while ($i < $until) {
          if (CellBIS_jsUtils.check_is_defined(config[$objK[$i]])) {
            if ($objK[$i] !== 'content') {
              if ($objK[$i] !== 'attr') {
                $for_optionSelect += $objK[$i] + '="' + config[$objK[$i]] + '" ';
              } else {
                $for_optionSelect += config[$objK[$i]] + ' ';
              }
            }
          }
          $i++;
        }
        
        if (CellBIS_jsUtils.check_is_defined(config['content'])) {
          $content_option = config['content'];
        } else {
          $content_option = 'undefined';
        }
        
        $data = '<option ' + $for_optionSelect;
        $data = $data.replace(/([\s]+)$/, "");
        $data += '>';
        $data += $content_option;
        $data += '</option>';
        
        return $data;
      }
    },
    /** For Tag Form Select :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk form select
     *
     * Format Object Input :
     * -----------------------------------------------------------
     * object {
     *    'id' : '',
     *    'class' : '',
     *    'style' : '',
     *    'attr' : '',
     *    'name' : '',
     *    'option' : [
     *      {
     *        'id' : '',
     *        'class' : '',
     *        'style' : '',
     *        'attr' : '',
     *        'name' : '',
     *        'value' : '',
     *        'content' : '',
     *      },
     *    ]
     * }
     *
     * Format Object Place :
     * -----------------------------------------------------------
     * object {
     *    'selector' : '<selector id or class>',
     *    'type' : 'append || replace'
     * }
     *
     * Format Object Place :
     * -----------------------------------------------------------
     * object
     *
     * @param config
     * @param place
     */
    select: function (config, place) {
      
      /** Define variable will be used in this function : */
      var $result, $data;
      var $for_selectForm = '', $for_optionSelect = '';
      
      /** Check IF config is undefined : */
      if (typeof config !== 'object') {
        console.error('$config Parameter is undefined');
        $result = 0;
      }
      /** End of Check IF $config is undefined. */
      
      /** Check If config is defined and is equals object **/
      else {
        
        var $objK = Object.keys(config);
        var $i = 0;
        var $until = $objK.length;
        while ($i < $until) {
          if (CellBIS_jsUtils.check_is_defined(config[$objK[$i]])) {
            if ($objK[$i] !== 'option') {
              if ($objK[$i] !== 'attr') {
                $for_selectForm += $objK[$i] + '="' + config[$objK[$i]] + '" ';
              } else {
                $for_selectForm += config[$objK[$i]] + ' ';
              }
            }
          }
          $i++;
        }
        
        if (typeof config['option'] === "object") {
          
          var $data_option = config['option'];
          var $i_o = 0;
          var $until_o = $data_option.length;
          var $r_option = '';
          while ($i_o < $until_o) {
            $r_option = this.option_select($data_option[$i_o]);
            $for_optionSelect += $r_option;
            $i_o++;
          }
        }
        
        $data = '<select ' + $for_selectForm;
        $data = $data.replace(/([\s]+)$/, "");
        $data += '>';
        
        $data += $for_optionSelect;
        
        $data += '</select>';
        
        /** For Check Place : */
        if (CellBIS_jsUtils.check_is_defined(place)) {
          var $selector_place = place['selector'];
          var $type_place = place['type'];
          switch ($type_place) {
            case 'append' :
              $($selector_place).append($data);
              break;
            case 'replace' :
              $($selector_place).html($data);
              break;
          }
          $result = 1;
        } else {
          $result = $data;
        }
      }
      
      /** Return Result : */
      return $result;
    },
    /**
     *
     * @return {string}
     */
    button_dropdown: function () {
      var result = '';
      
      /** Check IF config is undefined : */
      if (typeof config !== 'object') {
        console.error('$config Parameter is undefined');
        result = 0;
      } else {
      
      }
      
      /** Return Result : */
      return result;
    }
  };
  window.CellBIS_Bootstrap_tab = {
    
    /** For menu and content tab : */
    tab_menu_config: 0,
    tab_menu_active: {},
    tab_content_config: 0,
    data_menu_tab: '',
    data_content_tab: '',
    
    /** Initialize wrapper table bootstrap :
     * ----------------------------------------------
     * This method only for configuration wrapper of
     * menu and content "tab"
     *
     * Format object data_config :
     * ------------------------------------
     * object {
     *    menu : {
     *      id: '',
     *      class: '',
     *      style: '',
     *      attr: ''
     *    },
     *    content: {
     *      id: '',
     *      class: '',
     *      style: '',
     *      attr: ''
     *    }
     * }
     *
     * @param {object} data_config
     */
    init: function (data_config) {
      
      /** Check IF data_config is undefined : */
      if (typeof data_config !== "object") {
        console.error('parameter "data_config" is not object');
      }
      /** End of Check IF data_config is undefined. */
      
      /** Check If data_config is defined and is equals object **/
      else {
        
        var js_utils = CellBIS_jsUtils.init();
        
        // For Wrapper Menu Tab
        if (js_utils.check_is_defined_obj(data_config, 'menu')) {
          this.set_menu_config(data_config['menu']);
        }
        
        // For wrapper content tab :
        if (js_utils.check_is_defined_obj(data_config, 'content')) {
          this.set_content_config(data_config['content']);
        }
      }
      return this;
    },
    /** Function yang berfungsi untuk membuat "menu" tab :
     * ------------------------------------------------------------------
     *
     * Format object data_config :
     * -------------------------------------
     * object {
     *    id: '',
     *    class: '',
     *    style: '',
     *    attr: ''
     * }
     *
     * @param {object} data_config
     * @returns {CellBIS_Bootstrap_tab}
     */
    set_menu_config: function (data_config) {
      
      // Check if data_config is not object :
      if (typeof data_config !== "object") {
        // console.error('parameter "data_config" is not object');
        this.tab_menu_config = 0;
        return this;
      }
      
      // Check if data_config is object :
      else {
        var $id = '', $class = 'class="nav nav-tabs"', $style = '', $attr = '';
        
        var js_utils = CellBIS_jsUtils.init();
        
        if (js_utils.check_is_defined_obj(data_config, 'id')) {
          $id = 'id="' + data_config['id'] + '" ';
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'class')) {
          $class = 'class="nav nav-tabs ' + data_config['class'] + '" ';
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'style')) {
          $style = 'style="' + data_config['style'] + '" ';
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'attr')) {
          $attr = data_config['attr'] + ' ';
        }
        
        this.tab_menu_config = $id + $class + $style + $attr + ' role="tablist"';
        return this;
      }
    },
    /** Function yang berfungsi untuk membut "content" tab
     * ------------------------------------------------------------------------
     *
     * Format object data_config :
     * -------------------------------------
     * object {
     *    id: '',
     *    class: '',
     *    style: '',
     *    attr: ''
     * }
     *
     * @param data_config
     * @returns {CellBIS_Bootstrap_tab}
     */
    set_content_config: function (data_config) {
      
      // Check if data_config is not object :
      if (typeof data_config !== "object") {
        console.error('parameter "data_config" is not object');
        this.tab_content_config = 0;
        return this;
      }
      
      // Check if data_config is object :
      else {
        var $id = '', $class = '', $style = '', $attr = '';
        
        var js_utils = CellBIS_jsUtils.init();
        
        if (js_utils.check_is_defined(data_config['id'])) {
          $id = 'id="' + data_config['id'] + '" ';
        } else {
          $id = '';
        }
        
        if (js_utils.check_is_defined(data_config['class'])) {
          $class = 'class="tab-content ' + data_config['class'] + '" ';
        } else {
          $class = 'class="tab-content" ';
        }
        
        if (js_utils.check_is_defined(data_config['style'])) {
          $style = 'style="' + data_config['style'] + '" ';
        } else {
          $style = '';
        }
        
        if (js_utils.check_is_defined(data_config['attr'])) {
          $attr = data_config['attr'] + ' ';
        } else {
          $attr = '';
        }
        
        this.tab_content_config = $id + $class + $style + $attr;
        return this;
      }
    },
    /**
     * Method for create menu tab
     * -----------------------------------------------
     * This method will be called from method "render"
     *
     * Format object data_config :
     * ----------------------------------
     * object {
     *   wrap: {
     *     id: '',
     *     class: '',
     *     style: '',
     *     attr: '',
     *   },
     *   id: '',
     *   class: '',
     *   style: '',
     *   attr: '',
     *   href: '',
     *   name: '',
     *   for: '',
     *   active: 0
     * }
     *
     * Format object place :
     * ----------------------------------
     * object {
     *    selector : '',
     *    type : '', [ replace || append ]
     * }
     *
     * @param {object} data_config
     * @param {object} place
     * @returns {string|*}
     */
    set_menu_tab: function (data_config, place) {
      
      // Check if data_config is not object :
      if (typeof data_config !== "object") {
        console.error('parameter "data_config" is not object');
      }
      
      // Check if data_config is object :
      else {
        var $result = '';
        var $wrap = '', $wrap_cfg = '', $data = '';
        var $wrap_id = '', $wrap_class = '', $wrap_style = '', $wrap_attr = '';
        var $id = '', $class = '', $style = '', $attr = '', $href = 'href="#"', $name = 'undefined', $active = 0;
        var $for = '';
        var js_utils = CellBIS_jsUtils.init();
        
        if (js_utils.check_is_defined_obj(data_config, 'for')) {
          $for = data_config['for'];
          
          if (js_utils.check_is_defined_obj(data_config, 'active') &&
            (data_config['active'] === 1 || data_config['active'] === '1' || data_config['active'] === "1")) {
            $active = 1;
            this.tab_menu_active[$for] = 1;
          }
        } else {
          console.error('property "for" on config "menu" tab is not found');
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'id')) {
          $id = 'id="' + data_config['id'] + '" ';
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'class')) {
          if ($active === 1) {
            $class = 'class="nav-link ' + data_config['class'] + ' active" ';
          } else {
            $class = 'class="nav-link ' + data_config['class'] + '" ';
          }
        } else {
          if ($active === 1) {
            $class = 'class="nav-link active"';
          } else {
            $class = 'class="nav-link"';
          }
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'style')) {
          $style = 'style="' + data_config['style'] + '" ';
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'attr')) {
          $attr = data_config['attr'] + ' ';
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'href')) {
          $href = 'href="' + data_config['href'] + '" ';
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'name')) {
          $name = data_config['name'];
        }
        
        $data = '<a ' + $href + $id + $class + $style + $attr + 'data-toggle="tab" aria-expanded="true">' + $name + '</a>';
        
        if (js_utils.check_is_defined_obj(data_config, 'wrap')) {
          $wrap_cfg = data_config['wrap'];
          
          if (js_utils.check_is_defined_obj($wrap_cfg, 'id')) {
            $wrap_id = 'id="' + $wrap_cfg['id'] + '" ';
          }
          
          if (js_utils.check_is_defined_obj($wrap_cfg, 'class')) {
            $wrap_class = 'class="nav_item ' + $wrap_cfg['class'] + '" ';
          }
          
          if (js_utils.check_is_defined_obj($wrap_cfg, 'style')) {
            $wrap_style = 'style="' + $wrap_cfg['style'] + '" ';
          }
          
          if (js_utils.check_is_defined_obj($wrap_cfg, 'attr')) {
            $wrap_attr = $wrap_cfg['attr'] + ' ';
          }
          $wrap = '<li' + $wrap_id + $wrap_class + $wrap_style + $wrap_attr + '>';
          
          $result = $wrap;
          $result += $data;
          
        } else {
          $result = '<li class="nav_item">';
          $result += $data;
        }
        $result += '</li>';
        this.data_menu_tab = $result;
      }
      
      if (typeof place === "object") {
        if (js_utils.check_is_defined_obj(place, 'selector') && js_utils.check_is_defined_obj(place, 'type')) {
          var $selector_place = place['selector'];
          var $type_place = place['type'];
          switch ($type_place) {
            case 'append' :
              $($selector_place).append($result);
              break;
            case 'replace' :
              $($selector_place).html($result);
              break;
          }
          this.data_menu_tab = 1;
        } else {
          this.data_menu_tab = $result;
        }
      } else {
        this.data_menu_tab = $result;
      }
      return this.data_menu_tab;
    },
    /** Function for create content tab
     * -------------------------------------------------
     * This method will be called from method "render"
     *
     * Format object data_config :
     * ----------------------------------
     * object {
     *   id: '',
     *   class: '',
     *   style: '',
     *   attr: '',
     *   for: '',
     *   content: '',
     * }
     *
     * Format object place :
     * ----------------------------------
     * object {
     *    selector : '',
     *    type : '', [ replace || append ]
     * }
     *
     * @param {object} data_config
     * @param {object} place
     * @returns {string}
     */
    set_content_tab: function (data_config, place) {
      
      // Check if data_config is not object :
      if (typeof data_config !== "object") {
        console.error('parameter "data_config" is not object');
      }
      
      // Check if data_config is object :
      else {
        var $result = '';
        var $id = '', $class = '', $style = '', $attr = '', $content = '', $active = 0;
        var $for = '';
        var js_utils = CellBIS_jsUtils.init();
        
        if (js_utils.check_is_defined_obj(data_config, 'for')) {
          $for = data_config['for'];
          if (js_utils.check_is_defined_obj(this.tab_menu_active, $for)) {
            $active = 1;
          } else {
            if (js_utils.check_is_defined_obj(data_config, 'active')) {
              $active = 1;
            }
          }
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'id')) {
          $id = 'id="' + data_config['id'] + '" ';
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'class')) {
          if ($active === 1) {
            $class = 'class="tab-pane fade in active ' + data_config['class'] + '" ';
          } else {
            $class = 'class="tab-pane fade ' + data_config['class'] + '" ';
          }
        } else {
          if ($active === 1) {
            $class = 'class="tab-pane fade in active show" aria-expanded="true"';
          } else {
            $class = 'class="tab-pane fade in"';
          }
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'style')) {
          $style = 'style="' + data_config['style'] + '" ';
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'attr')) {
          $attr = data_config['attr'] + ' ';
        }
        
        if (js_utils.check_is_defined_obj(data_config, 'content')) {
          $content = data_config['content'] + ' ';
        }
        
        $result = '<div ' + $id + $class + $style + $attr + 'role="tabpanel">';
        $result += $content;
        $result += '</div>';
      }
      
      if (typeof place === "object") {
        if (js_utils.check_is_defined_obj(place, 'selector') && js_utils.check_is_defined_obj(place, 'type')) {
          var $selector_place = place['selector'];
          var $type_place = place['type'];
          switch ($type_place) {
            case 'append' :
              $($selector_place).append($result);
              break;
            case 'replace' :
              $($selector_place).html($result);
              break;
          }
          this.data_content_tab = 1;
        } else {
          this.data_content_tab = $result;
        }
      } else {
        this.data_content_tab = $result;
      }
      return this.data_content_tab;
    },
    /**
     * Function yang berfungsi untuk render tabs.
     * -------------------------------------------------------------
     *
     * Format object data_config :
     * -------------------------------------
     * object {
     *    menu: [
     *      {
     *        wrap: {
     *          id: '',
     *          class: '',
     *          style: '',
     *          attr: '',
     *        },
     *        id: '',
     *        class: '',
     *        style: '',
     *        attr: '',
     *        href: '',
     *        name: '',
     *        for: '',
     *        active: 0, [ 0 == not-active | 1 == active ]
     *      },
     *    ],
     *    content: [
     *      {
     *        id: '',
     *        class: '',
     *        style: '',
     *        attr: '',
     *        for: '',
     *        content: '',
     *      }
     *    ]
     * }
     *
     * @param {object} data_config,
     * @param {object} place
     * @returns {string}
     */
    render: function (data_config, place) {
      var $result = '';
      var $i = 0, $until = 0;
      
      // Check if data_config is not object :
      if (typeof data_config !== "object") {
        console.error('parameter "data_config" is not object');
      }
      
      // Check if data_config is object :
      else {
        var $menu = '', $content = '';
        var js_utils = CellBIS_jsUtils.init();
        
        /** for Menu Tab : */
        if (this.tab_menu_config !== 0) {
          $menu = '<ul ' + this.tab_menu_config + '>'; // Start: Wrapper Menu Tab.
          
          if (js_utils.check_is_defined_obj(data_config, 'menu') && data_config['menu'].length !== 0) {
            var $data_menu = data_config['menu'];
            $until = $data_menu.length;
            $i = 0;
            while ($i < $until) {
              $menu += this.set_menu_tab($data_menu[$i], '');
              $i++;
            }
          }
          
          $menu += '</ul>'; // End: Wrapper Menu Tab.
        }
        
        /** for Content Tab : */
        if (this.tab_content_config !== 0) {
          $content = '<div ' + this.tab_content_config + '>'; // Start: Wrapper Content Tab.
          
          if (js_utils.check_is_defined_obj(data_config, 'content') && data_config['content'].length !== 0) {
            var $data_content = data_config['content'];
            $until = $data_content.length;
            $i = 0;
            while ($i < $until) {
              $content += this.set_content_tab($data_content[$i], '');
              $i++;
            }
          }
          
          $content += '</div>'; // Start: Wrapper Content Tab.
        } else {
          $content = '<div class="tab-content">';
          $content += '<div class="tab-pane active" id="m_tabs1" role="tabpanel"></div>';
          $content += '</div>';
        }
        // Result of Menu and Content Tab :
        var data_tab = $menu + $content;
        
        if (typeof place === "object") {
          if (js_utils.check_is_defined_obj(place, 'selector') && js_utils.check_is_defined_obj(place, 'type')) {
            var $selector_place = place['selector'];
            var $type_place = place['type'];
            switch ($type_place) {
              case 'append' :
                $($selector_place).append(data_tab);
                break;
              case 'replace' :
                $($selector_place).html(data_tab);
                break;
            }
            $result = 1;
          } else {
            $result = data_tab;
          }
        } else {
          $result = data_tab;
        }
      }
      return $result;
    }
  };
})();

(function () {
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
    init: function (data_json, target) {
      
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
    set_target: function (target) {
      
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
    set: function (data_json) {
      
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
    array_type: function (data_json) {
      
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
    generate: function (data_json) {
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
              data_attr += tag_attr + '="' + data_json[prop[i]] + '" ';
            }
            if (tag_attr === 'attr') {
              data_attr += data_json[prop[i]]
            }
          }
          i++;
        }
        
        if (js_utils.inArray(tag_name, this.tag_singleton) !== -1) {
          result = '<' + tag_name + ' ' + data_attr + '/>'
        } else {
          result = '<' + tag_name + ' ' + data_attr + '>' + '';
          
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
          
          result += '</' + tag_name + '>';
        }
      } else {
        console.log('property "tag" is undefined')
      }
      
      return result;
    },
    render: function () {
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