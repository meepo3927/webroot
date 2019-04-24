<template>
    <input type="text" :value="value" readonly />
</template>

<script>
import 'lib/bootstrap-datetimepicker.min.js';
import 'lib/locales/bootstrap-datetimepicker.zh-CN.js';
let methods = {};
let computed = {};
let watch = {};
const created = function () {};
const mounted = function () {
    $(this.$el).datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd hh:ii:00',
        zIndex: '3'
    }).on('changeDate', (ev) => {
        let val = (ev.target.value);
        this.$emit('input', val);
    });
};
const beforeDestroy = function () {
    $(this.$el).datetimepicker('remove');
};
const dataFunc = function () {
    let o = {};
    return o;
};
export default {
    data: dataFunc,
    created,
    methods,
    computed,
    watch,
    props: ['value'],
    mounted,
    mixins: [],
    beforeDestroy,
    components: {}
};
</script>

<style lang="less">
// Datepicker .less buildfile.  Includes select mixins/variables from bootstrap
// and imports the included datepicker.less to output a minimal datepicker.css
//
// Usage:
//     lessc build.less datepicker.css
//
// Variables and mixins copied from bootstrap 2.0.2

// Variables
@grayLight:             #999;
@grayLighter:           #eee;
@white:                 #fff;
@linkColor:             #08c;
@btnPrimaryBackground:  @linkColor;
@orange:                #f89406;

// Mixins

// Border Radius
.border-radius(@radius: 5px) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}

// Button backgrounds
.buttonBackground(@startColor, @endColor) {
  .gradientBar(@startColor, @endColor);
  .reset-filter();
  &:hover, &:active, &.active, &.disabled, &[disabled] {
    background-color: @endColor;
  }
  &:active,
  &.active {
    background-color: darken(@endColor, 10%) e("\9");
  }
}

// Reset filters for IE
.reset-filter() {
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
}

// Gradient Bar Colors for buttons and alerts
.gradientBar(@primaryColor, @secondaryColor) {
  #gradient > .vertical(@primaryColor, @secondaryColor);
  border-color: @secondaryColor @secondaryColor darken(@secondaryColor, 15%);
  border-color: rgba(0,0,0,.1) rgba(0,0,0,.1) fadein(rgba(0,0,0,.1), 15%);
}

// Gradients
#gradient {
  .vertical(@startColor: #555, @endColor: #333) {
    background-color: mix(@startColor, @endColor, 60%);
    background-image: -moz-linear-gradient(top, @startColor, @endColor); // FF 3.6+
    background-image: -ms-linear-gradient(top, @startColor, @endColor); // IE10
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(@startColor), to(@endColor)); // Safari 4+, Chrome 2+
    background-image: -webkit-linear-gradient(top, @startColor, @endColor); // Safari 5.1+, Chrome 10+
    background-image: -o-linear-gradient(top, @startColor, @endColor); // Opera 11.10
    background-image: linear-gradient(top, @startColor, @endColor); // The standard
    background-repeat: repeat-x;
    filter: e(%("progid:DXImageTransform.Microsoft.gradient(startColorstr='%d', endColorstr='%d', GradientType=0)",@startColor,@endColor)); // IE9 and down
  }
}

/*!
 * Datetimepicker for Bootstrap
 *
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Improvements by Sébastien Malot
 * Licensed under the Apache License v2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */

.datetimepicker {
    padding: 4px;
    margin-top: 1px;
    white-space: normal;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    direction: ltr;
    &.datetimepicker-rtl {
        direction: rtl;
        table {
            tr {
                td {
                    span {
                        float: right;
                    }
                }
            }
        }
    }
    & > div {
        display: none;
    }
    &.minutes {
        div {
            &.datetimepicker-minutes {
                display: block;
            }
        }
    }
    &.hours {
        div {
            &.datetimepicker-hours {
                display: block;
            }
        }
    }
    &.days {
        div {
            &.datetimepicker-days {
                display: block;
            }
        }
    }
    &.months {
        div {
            &.datetimepicker-months {
                display: block;
            }
        }
    }
    &.years {
        div {
            &.datetimepicker-years {
                display: block;
            }
        }
    }
    table {
        margin: 0;
        tr {
            td {
                &.minute {
                    &:hover {
                        background: #eeeeee;
                        cursor: pointer;
                    }
                }
                &.hour {
                    &:hover {
                        background: #eeeeee;
                        cursor: pointer;
                    }
                }
                &.day {
                    &:hover {
                        background: #eeeeee;
                        cursor: pointer;
                    }
                }
                span {
                    display: block;
                    width: 23%;
                    height: 54px;
                    line-height: 54px;
                    float: left;
                    margin: 1%;
                    cursor: pointer;
                    -webkit-border-radius: 4px;
                    -moz-border-radius: 4px;
                    border-radius: 4px;
                    &:hover {
                        background: #eeeeee;
                    }
                    &.old {
                        color: #999999;
                    }
                }
            }
        }
    }
    .datetimepicker-hours {
        span {
            height: 26px;
            line-height: 26px;
        }
    }
    .datetimepicker-minutes {
        span {
            height: 26px;
            line-height: 26px;
        }
    }
    th {
        &.switch {
            width: 145px;
        }
    }
}
.datetimepicker-inline {
    width: 220px;
}
.datetimepicker-dropdown, .datetimepicker-dropdown-left {
    top: 0;
    left: 0;
}
[class*="datetimepicker-dropdown"]:before {
    content: '';
    display: inline-block;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #ccc;
    border-bottom-color: rgba(0, 0, 0, 0.2);
    position: absolute;
}
[class*="datetimepicker-dropdown"]:after {
    content: '';
    display: inline-block;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #ffffff;
    position: absolute;
}
[class*="datetimepicker-dropdown-top"]:before {
    content: '';
    display: inline-block;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid #ccc;
    border-top-color: rgba(0, 0, 0, 0.2);
    border-bottom: 0;
}
[class*="datetimepicker-dropdown-top"]:after {
    content: '';
    display: inline-block;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #ffffff;
    border-bottom: 0;
}
.datetimepicker-dropdown-bottom-left {
    &:before {
        top: -7px;
        right: 6px;
    }
    &:after {
        top: -6px;
        right: 7px;
    }
}
.datetimepicker-dropdown-bottom-right {
    &:before {
        top: -7px;
        left: 6px;
    }
    &:after {
        top: -6px;
        left: 7px;
    }
}
.datetimepicker-dropdown-top-left {
    &:before {
        bottom: -7px;
        right: 6px;
    }
    &:after {
        bottom: -6px;
        right: 7px;
    }
}
.datetimepicker-dropdown-top-right {
    &:before {
        bottom: -7px;
        left: 6px;
    }
    &:after {
        bottom: -6px;
        left: 7px;
    }
}
.datetimepicker  td,
.datetimepicker th {
    text-align: center;
    width: 20px;
    height: 20px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    border: none;
}
.table-striped .datetimepicker table tr td,
.table-striped .datetimepicker table tr th {
    background-color: transparent;
}
.datetimepicker table tr td.old,
.datetimepicker table tr td.new {
    color: #999999;
}
.datetimepicker table tr td.disabled,
.datetimepicker table tr td.disabled:hover {
    background: none;
    color: #999999;
    cursor: default;
}
.datetimepicker table tr td.today,
.datetimepicker table tr td.today:hover,
.datetimepicker table tr td.today.disabled,
.datetimepicker table tr td.today.disabled:hover {
    background-color: #fde19a;
    background-image: -moz-linear-gradient(top, #fdd49a, #fdf59a);
    background-image: -ms-linear-gradient(top, #fdd49a, #fdf59a);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#fdd49a), to(#fdf59a));
    background-image: -webkit-linear-gradient(top, #fdd49a, #fdf59a);
    background-image: -o-linear-gradient(top, #fdd49a, #fdf59a);
    background-image: linear-gradient(to bottom, #fdd49a, #fdf59a);
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fdd49a', endColorstr='#fdf59a', GradientType=0);
    border-color: #fdf59a #fdf59a #fbed50;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
}
.datetimepicker table tr td.today:hover,
.datetimepicker table tr td.today:hover:hover,
.datetimepicker table tr td.today.disabled:hover,
.datetimepicker table tr td.today.disabled:hover:hover,
.datetimepicker table tr td.today:active,
.datetimepicker table tr td.today:hover:active,
.datetimepicker table tr td.today.disabled:active,
.datetimepicker table tr td.today.disabled:hover:active,
.datetimepicker table tr td.today.active,
.datetimepicker table tr td.today:hover.active,
.datetimepicker table tr td.today.disabled.active,
.datetimepicker table tr td.today.disabled:hover.active,
.datetimepicker table tr td.today.disabled,
.datetimepicker table tr td.today:hover.disabled,
.datetimepicker table tr td.today.disabled.disabled,
.datetimepicker table tr td.today.disabled:hover.disabled,
.datetimepicker table tr td.today[disabled],
.datetimepicker table tr td.today:hover[disabled],
.datetimepicker table tr td.today.disabled[disabled],
.datetimepicker table tr td.today.disabled:hover[disabled] {
    background-color: #fdf59a;
}
.datetimepicker table tr td.today:active,
.datetimepicker table tr td.today:hover:active,
.datetimepicker table tr td.today.disabled:active,
.datetimepicker table tr td.today.disabled:hover:active,
.datetimepicker table tr td.today.active,
.datetimepicker table tr td.today:hover.active,
.datetimepicker table tr td.today.disabled.active,
.datetimepicker table tr td.today.disabled:hover.active {
    background-color: #fbf069 \9;
}
.datetimepicker table tr td.active,
.datetimepicker table tr td.active:hover,
.datetimepicker table tr td.active.disabled,
.datetimepicker table tr td.active.disabled:hover {
    background-color: #006dcc;
    background-image: -moz-linear-gradient(top, #0088cc, #0044cc);
    background-image: -ms-linear-gradient(top, #0088cc, #0044cc);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#0088cc), to(#0044cc));
    background-image: -webkit-linear-gradient(top, #0088cc, #0044cc);
    background-image: -o-linear-gradient(top, #0088cc, #0044cc);
    background-image: linear-gradient(to bottom, #0088cc, #0044cc);
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#0088cc', endColorstr='#0044cc', GradientType=0);
    border-color: #0044cc #0044cc #002a80;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
}
.datetimepicker table tr td.active:hover,
.datetimepicker table tr td.active:hover:hover,
.datetimepicker table tr td.active.disabled:hover,
.datetimepicker table tr td.active.disabled:hover:hover,
.datetimepicker table tr td.active:active,
.datetimepicker table tr td.active:hover:active,
.datetimepicker table tr td.active.disabled:active,
.datetimepicker table tr td.active.disabled:hover:active,
.datetimepicker table tr td.active.active,
.datetimepicker table tr td.active:hover.active,
.datetimepicker table tr td.active.disabled.active,
.datetimepicker table tr td.active.disabled:hover.active,
.datetimepicker table tr td.active.disabled,
.datetimepicker table tr td.active:hover.disabled,
.datetimepicker table tr td.active.disabled.disabled,
.datetimepicker table tr td.active.disabled:hover.disabled,
.datetimepicker table tr td.active[disabled],
.datetimepicker table tr td.active:hover[disabled],
.datetimepicker table tr td.active.disabled[disabled],
.datetimepicker table tr td.active.disabled:hover[disabled] {
    background-color: #0044cc;
}
.datetimepicker table tr td.active:active,
.datetimepicker table tr td.active:hover:active,
.datetimepicker table tr td.active.disabled:active,
.datetimepicker table tr td.active.disabled:hover:active,
.datetimepicker table tr td.active.active,
.datetimepicker table tr td.active:hover.active,
.datetimepicker table tr td.active.disabled.active,
.datetimepicker table tr td.active.disabled:hover.active {
    background-color: #003399 \9;
}
.datetimepicker .datetimepicker-hours table tr td span.hour_am,
.datetimepicker .datetimepicker-hours table tr td span.hour_pm {
    width: 14.6%;
}
.datetimepicker .datetimepicker-hours fieldset legend,
.datetimepicker .datetimepicker-minutes fieldset legend {
    margin-bottom: inherit;
    line-height: 30px;
}
.datetimepicker table tr td span.disabled,
.datetimepicker table tr td span.disabled:hover {
    background: none;
    color: #999999;
    cursor: default;
}
.datetimepicker table tr td span.active,
.datetimepicker table tr td span.active:hover,
.datetimepicker table tr td span.active.disabled,
.datetimepicker table tr td span.active.disabled:hover {
    background-color: #006dcc;
    background-image: -moz-linear-gradient(top, #0088cc, #0044cc);
    background-image: -ms-linear-gradient(top, #0088cc, #0044cc);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#0088cc), to(#0044cc));
    background-image: -webkit-linear-gradient(top, #0088cc, #0044cc);
    background-image: -o-linear-gradient(top, #0088cc, #0044cc);
    background-image: linear-gradient(to bottom, #0088cc, #0044cc);
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#0088cc', endColorstr='#0044cc', GradientType=0);
    border-color: #0044cc #0044cc #002a80;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
    color: #fff;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
}
.datetimepicker table tr td span.active:hover,
.datetimepicker table tr td span.active:hover:hover,
.datetimepicker table tr td span.active.disabled:hover,
.datetimepicker table tr td span.active.disabled:hover:hover,
.datetimepicker table tr td span.active:active,
.datetimepicker table tr td span.active:hover:active,
.datetimepicker table tr td span.active.disabled:active,
.datetimepicker table tr td span.active.disabled:hover:active,
.datetimepicker table tr td span.active.active,
.datetimepicker table tr td span.active:hover.active,
.datetimepicker table tr td span.active.disabled.active,
.datetimepicker table tr td span.active.disabled:hover.active,
.datetimepicker table tr td span.active.disabled,
.datetimepicker table tr td span.active:hover.disabled,
.datetimepicker table tr td span.active.disabled.disabled,
.datetimepicker table tr td span.active.disabled:hover.disabled,
.datetimepicker table tr td span.active[disabled],
.datetimepicker table tr td span.active:hover[disabled],
.datetimepicker table tr td span.active.disabled[disabled],
.datetimepicker table tr td span.active.disabled:hover[disabled] {
    background-color: #0044cc;
}
.datetimepicker table tr td span.active:active,
.datetimepicker table tr td span.active:hover:active,
.datetimepicker table tr td span.active.disabled:active,
.datetimepicker table tr td span.active.disabled:hover:active,
.datetimepicker table tr td span.active.active,
.datetimepicker table tr td span.active:hover.active,
.datetimepicker table tr td span.active.disabled.active,
.datetimepicker table tr td span.active.disabled:hover.active {
    background-color: #003399 \9;
}
.datetimepicker thead tr:first-child th,
.datetimepicker tfoot tr:first-child th {
    cursor: pointer;
}
.datetimepicker thead tr:first-child th:hover,
.datetimepicker tfoot tr:first-child th:hover {
    background: #eeeeee;
}

.input-append.date .add-on i,
.input-prepend.date .add-on i,
.input-group.date .input-group-addon span {
    cursor: pointer;
    width: 14px;
    height: 14px;
}
// Datepicker standalone .less buildfile.  Includes all necessary mixins/variables/rules from bootstrap
// and imports the included datepicker.less to output a minimal standalone datepicker.css
//
// Usage:
//     lessc build_standalone.less datepicker.css
//
// Variables, mixins, and rules copied from bootstrap 2.0.2

// Dropdown css

@zindexDropdown:                1000;
@grayDark:                      #333;
@baseLineHeight:                18px;
@tableBackground:               transparent; // overall background-color
@dropdownBackground:            @white;
@dropdownBorder:                rgba(0,0,0,.2);
@dropdownLinkColor:             @grayDark;
@dropdownLinkColorHover:        @white;
@dropdownLinkBackgroundHover:   @linkColor;

// Drop shadows
.box-shadow(@shadow) {
  -webkit-box-shadow: @shadow;
     -moz-box-shadow: @shadow;
          box-shadow: @shadow;
}

// The dropdown menu (ul)
// ----------------------
.datetimepicker.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: @zindexDropdown;
  float: left;
  display: none; // none by default, but block on "open" of the menu
  min-width: 160px;
  list-style: none;
  background-color: @dropdownBackground;
  border: 1px solid #ccc;
  border: 1px solid rgba(0,0,0,.2);
  .border-radius(5px);
  .box-shadow(0 5px 10px rgba(0,0,0,.2));
  -webkit-background-clip: padding-box;
     -moz-background-clip: padding;
          background-clip: padding-box;
  *border-right-width: 2px;
  *border-bottom-width: 2px;

  // Normally inherited from bootstrap's `body`
  color: #333333;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size:13px;
  line-height: @baseLineHeight;

  th, td {
    padding: 4px 5px;
  }
}

// Alternative arrows
// May require `charset="UTF-8"` in your `<link>` tag
.datetimepicker {
  .prev, .next {font-style:normal;}
  .prev:after {content:"«";}
  .next:after {content:"»";}
}



</style>
