/**
 * Created by AchmadYusri on 27/06/2016.
 */

/** Begin For Cookies Management :
 * -----------------------------------------------------------
 */
jQuery.extend({

    /** For Set Cookies :
     * -----------------------------------------------------------
     * Function for Set New Cookies.
     *
     * @param   $name       {string}    Berisi Nama Cookies.
     * @param   $value      {string}    Berisi Value Cookies.
     * @param   $expire_day {integer}   Berisi Waktu Expire Cookies.
     */
    NKTI_cookies_set: function ($name, $value, $expire_day) {

        /** Define variable will be used in thsi funciton :
         * ----------------------------------------------------------- */
        var date_define = new Date();

        /** Action Set Cookies : */
        date_define.setTime(date_define.getTime() + ($expire_day*24*60*60*1000));
        var $date_tostring = date_define.toUTCString();
        var expires = "expires=" + $date_tostring;
        document.cookie = $name + "=" + $value + "; " + expires;
    },
    /** End of For Set Cookies.
     * ===================================================================================================== */

    /** For Get data Cookies :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk mengambil data cookies.
     *
     * @param   $name       {string}        Berisi nama cookies yang akan diambil.
     */
    NKTI_cookies_get: function ($name) {

        /** Define variable will be used in this function :
         * ----------------------------------------------------------- */
        var $cookies_name = $name + "=";

        /** Action Get Cookies : */
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf($cookies_name) == 0) {
                return c.substring($cookies_name.length,c.length);
            }
        }
        return "";
    },
    /** End of For Get data Cookies.
     * ===================================================================================================== */

    /** For Delete Data Cookies :
     * -----------------------------------------------------------
     * Function yang berfungsi untuk menghapus item cookies.
     */
    NKTI_cookies_delete: function ($name) {

        /** Define variable will be used in this function : */
        var $name_cookies = $.NKTI_cookies_get($name);

        /** Check Exists Cookies : */
        if ($name_cookies != "") {
            document.cookie = $name+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        }

    }
    /** End of For Delete Data Cookies.
     * ===================================================================================================== */

});
/** End of For Cookies Management.
 * ===================================================================================================== */
