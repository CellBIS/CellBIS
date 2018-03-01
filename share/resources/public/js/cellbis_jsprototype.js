/**
 * Created by Achmad Yusri Afandi [yusrideb@cpan] on 01/01/2016.
 * Revision by Action Yusri Afandi [yusrideb@cpan] on 02/11/2017.
 */



/** Create Prototype For Remove index of array : */
Array.prototype.hapus = function ($indexArr) {

  /** Define variable will be used in this function prototype array : */
  var $for_check_index, $arg = arguments;

  /** Prepare while loop to Remove Index of array : */
  $i = 0;
  $until_loop = this.length;

  /** While loop to Remove Index of array : */
  while ($i < $until_loop) {

    /** While loop to check index of array : */
    while (($for_check_index = this.indexOf($indexArr)) !== -1) {
      this.splice($for_check_index, 1);
    }

    /** Auto Increment : */
    $i++;
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

/** For Union more than one Array :
 * --------------------------------------------------------------
 * Function for remove duplicate data array.
 * For Example :
 * var $array3 = array1.concat(array2).union_arr();
 * -------------------------------------------------------------- */
Array.prototype.union_arr = function() {
  var a = this.concat();
  for(var i=0; i<a.length; i++) {
    for(var j=i+1; j<a.length; j++) {
      if(a[i] === a[j])
        a.splice(j--, 1);
    }
  }

  return a;
};