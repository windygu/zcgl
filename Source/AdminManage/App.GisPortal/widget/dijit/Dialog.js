﻿/**
 * @author Administrator
 */
define(['dojo/_base/declare',
    'dojo/_base/fx',
    'dojo/_base/lang', 'dojo/topic', 'dojo/parser', 'dijit/_WidgetBase',
    'dijit/_TemplatedMixin', 'dojo/on', 'dojo/dom', 'dojo/dom-construct', 'dojo/dom-class',
'dojo/dom-style',
'dojo/text!./template/Dialog.html'],
function (declare, baseFx, lang, topic, parser, _WidgetBase, _TemplatedMixin, on, dom, domConstruct,
    domClass,
    domStyle, template) {
    var instance = null;
    var clazz = declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        baseClass: "jz-notify-dialog",
        mixin: false,
        callback: null,
        startup: function (cbk, title, notify, type) {
            this.callback = cbk;
            this.titleNode.innerHTML = title;
            this.jzNotifyNote.innerHTML = notify;
            this.inherited(arguments);
            if (!this.mixin) {
                domConstruct.place(this.domNode, document.body);
                this.showDelay();
                this.mixin = true;
            } else {
                this.onOpen();
            }
            
            if (type === 0) {
                //警告对话框
                if (domClass.contains(this.jzNotifyIcon, "jz-notify-info")) {
                    domClass.remove(this.jzNotifyIcon, "jz-notify-info");
                }
                if (!domClass.contains(this.jzNotifyIcon, "jz-notify-warn")) {
                    domClass.add(this.jzNotifyIcon, "jz-notify-warn");
                }
                if (domClass.contains(this.jzNotifyIcon, "jz-notify-err")) {
                    domClass.remove(this.jzNotifyIcon, "jz-notify-err");
                }
                domStyle.set(this.jzNotifyConfirm, "display", "");
                domStyle.set(this.jzNotifyOther, "display", "none");
            }else if (type === 1) {
                //确认对话框
                if (!domClass.contains(this.jzNotifyIcon, "jz-notify-info")) {
                    domClass.add(this.jzNotifyIcon, "jz-notify-info");
                }
                if (domClass.contains(this.jzNotifyIcon, "jz-notify-warn")) {
                    domClass.remove(this.jzNotifyIcon, "jz-notify-warn");
                }
                if (domClass.contains(this.jzNotifyIcon, "jz-notify-err")) {
                    domClass.remove(this.jzNotifyIcon, "jz-notify-err");
                }
                domStyle.set(this.jzNotifyConfirm, "display", "none");
                domStyle.set(this.jzNotifyOther, "display", "");
            } else if (type === 2) {
                //错误对话框
                if (domClass.contains(this.jzNotifyIcon, "jz-notify-info")) {
                    domClass.remove(this.jzNotifyIcon, "jz-notify-info");
                }
                if (domClass.contains(this.jzNotifyIcon, "jz-notify-warn")) {
                    domClass.remove(this.jzNotifyIcon, "jz-notify-warn");
                }
                if (!domClass.contains(this.jzNotifyIcon, "jz-notify-err")) {
                    domClass.add(this.jzNotifyIcon, "jz-notify-err");
                }
                domStyle.set(this.jzNotifyConfirm, "display", "none");
                domStyle.set(this.jzNotifyOther, "display", "");
            }
        },
        showDelay: function () {
            var that = this;
            baseFx.animateProperty({
                duration: 100,
                node: that.jzNotifyDialogPane,
                properties: {
                    opacity: { start: 0, end: 1 }
                }
            }).play();
        },
        hideDelay: function () {
            var that = this;
            baseFx.animateProperty({
                duration: 100,
                node: that.jzNotifyDialogPane,
                properties: {
                    opacity: { start: 1, end: 0 }
                },
                onEnd: function () {
                    domStyle.set(that.domNode, "display", "none");
                }
            }).play();
        },
        //确定按钮
        onBtnOK: function () {
            this.hideDelay();
            if (this.callback) {
                this.callback();
            }
        },
        //取消按钮
        onBtnCancel: function () {
            this.hideDelay();
        },
        onBtnCancelNow: function () {
            this.hideDelay();
            if (this.callback) {
                this.callback();
            }
        },
        onOpen: function () {
            if (domStyle.get(this.domNode, "display") !== "none") {
                return;
            } else {
                domStyle.set(this.domNode, "display", "inline");
                this.showDelay();
            }
        },
        onCancel: function () {
            this.hideDelay();
        }
    });

    clazz.getInstance = function (map, gs) {
        if (instance === null) {
            instance = new clazz();
        }
        return instance;
    };

    return clazz;
});
