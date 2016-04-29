﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由T4模板自动生成
//	   生成时间 2013-04-23 16:52:15 by App
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.ComponentModel.DataAnnotations;

using System.Collections.Generic;
namespace App.Models.MIS
{

    public class MIS_Article_CategoryModel
    {
        [Display(Name = "ID")]
        public string Id { get; set; }

        [Required(ErrorMessage = "{0}必须是一个数字")]
        [Display(Name = "ID")]
        public int ChannelId { get; set; }

        [MaxWordsExpression(100)]
        [NotNullExpression]//不能为空
        [Display(Name = "标题")]
        public string Name { get; set; }

        [MaxWordsExpression(100)]
        [Display(Name = "上级ID")]
        public string ParentId { get; set; }

        [IsNumberExpression]//如果填写判断是否是数字
        [Display(Name = "排序号")]
        public int? Sort { get; set; }

        [MaxWordsExpression(255)]
        [Display(Name = "图片")]
        public string ImgUrl { get; set; }

        [MaxWordsExpression(8000)]
        [Display(Name = "内容")]
        public string BodyContent { get; set; }

        [DateExpression]//如果填写判断是否是日期
        [Display(Name = "创建时间")]
        public DateTime? CreateTime { get; set; }

        public List<MIS_Article_CategoryModel> clildren { get; set; }

        public string state { get; set; }


        [Display(Name = "状态")]
        public bool Enable { get; set; }

    }
}
