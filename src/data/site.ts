import content from './content.json';

export const site = {
  name: '江西财经大学计算机协会',
  shortName: '江财计协',
  email: '3585957631@qq.com',
  qq: '1124074128',
  founded: 1996,
  teacher: '陈强',
  address: '江西财经大学麦庐园校区计算机与人工智能学院',
  github: 'https://github.com/Lan66666659/jxufe-cs.',
};
export const departmentMeta = [
  {
    id: 'software',
    en: 'SOFTWARE',
    subtitle: '编程教学与网站开发',
    tags: ['Python', 'Web 开发', 'C / C++', 'Java'],
    color: 'blue',
  },
  {
    id: 'hardware',
    en: 'HARDWARE',
    subtitle: '电脑维护与技术咨询',
    tags: ['硬件维护', '系统优化', '装机实践'],
    color: 'green',
  },
  {
    id: 'quant',
    en: 'QUANTITATIVE',
    subtitle: '量化研究与数据分析',
    tags: ['量化研究', '数据回测', '研报复现'],
    color: 'purple',
  },
  {
    id: 'creative',
    en: 'CREATIVE',
    subtitle: '活动宣传与视觉设计',
    tags: ['视觉设计', '内容创作', '活动宣传'],
    color: 'orange',
  },
  {
    id: 'office',
    en: 'OPERATIONS',
    subtitle: '活动策划与社团运营',
    tags: ['组织策划', '团队协作', '社团运营'],
    color: 'pink',
  },
];
export const departments = content.departments.map((dept, index) => ({
  ...dept,
  ...departmentMeta[index],
}));
export default content;
