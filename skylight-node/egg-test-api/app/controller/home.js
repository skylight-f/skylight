'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = [
      ['地市/产品', '本日新增', '本年新增', '累计商户数', '累计有效商户数', '商户有效率', '任务指标数', '本日终端有效率', '完成进度'], // title line
      ['市场一部', '2', '64', '1,453', '1,249', '86.0%', '55%', '55.86%', '101.6%'],
      ['九江', '10', '481', '7,870', '6,411', '81.5%', '55%', '49.53%', '90.1%'],
      ['赣州', '18', '1,761', '57,626', '19,132', '33.2%', '55%', '49.97%', '90.9%'],
      ['上饶', '7', '1,572', '11,633', '8,985', '77.2%', '55%', '49.97%', '90.9%'],
      ['宜春', '6', '527', '11,235', '9,508', '84.6%', '55%', '51.87%', '94.3%'],
    ];
  }
}

module.exports = HomeController;
