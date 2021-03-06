﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using App.Common;
using App.Models.Sys;
using Microsoft.Practices.Unity;
 
using App.Models;


namespace App.Admin.Controllers
{
    public class SysRightGetRoleRightController : BaseController
    {


        [SupportFilter]
        public ActionResult Index()
        {
            return View();
        }

        //获取角色列表
        [SupportFilter(ActionName="Index")]
        public JsonResult GetRoleList(GridPager pager, string queryStr)
        {
            List<SysRoleModel> list = sysRoleBLL.GetList(ref pager, queryStr);
            var json = new
            {
                total = pager.totalRows,
                rows = (from r in list
                        select new SysRoleModel()
                        {

                            Id = r.Id,
                            Name = r.Name,
                            Description = r.Description
                        }).ToArray()

            };

            return Json(json);

      
        }


        [HttpPost]
        [SupportFilter(ActionName = "Index")]
        public JsonResult GetRoleRight(GridPager pager, string roleId)
        {

            if (roleId == null)
                return Json(0);

            var userRightList = sysRightGetRoleRightBLL.GetList(roleId);
            List<P_Sys_GetRightByRole_Result> list = userRightList.Skip((pager.page - 1) * pager.rows).Take(pager.rows).ToList();
            int totalRecords = userRightList.Count();
            var json = new
            {
                total = totalRecords,
                rows = (from r in list
                        select new SysRightUserRight()
                        {

                            ModuleId = r.moduleId,
                            ModuleName = r.moduleName,
                            KeyCode = r.keyCode,


                        }).ToArray()

            };
            return Json(json);
        }
    }
}
