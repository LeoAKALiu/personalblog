/**
 * Data for the "行业分享与受邀演讲" section.
 * Replace mock entries and stats with real data as needed.
 */

export interface SpeakingTalk {
  title: string;
  organizer: string;
  topic: string;
  type: string;
  date: string;
  description: string;
  url: string;
  image?: string;
}

export const speakingTalks: SpeakingTalk[] = [
  {
    title: "受邀分享｜上实城开技术交流",
    organizer: "上实城开",
    topic: "AI 在既有建筑运维中的应用",
    type: "技术讲座",
    date: "2024",
    description:
      "面向工程与管理团队，分享 AI 在城市体检、既有建筑诊断与数据闭环中的落地路径。",
    url: "http://sri-robot.com/news/845.html",
  },
  {
    title: "受邀分享｜城市体检与智能诊断技术研讨会",
    organizer: "某市住建局技术中心",
    topic: "城市体检数据采集与 AI 辅助诊断",
    type: "行业交流",
    date: "2024.06",
    description:
      "面向住建系统技术骨干，介绍无人机与三维重建在城市体检中的应用，以及小样本场景下的缺陷识别与报告生成实践。",
    url: "#",
  },
  {
    title: "受邀分享｜工程智能化企业内训",
    organizer: "某总承包企业技术部",
    topic: "施工安全与进度智能监控系统架构",
    type: "企业内训",
    date: "2024.03",
    description:
      "面向项目与信息化团队，讲解多源感知融合、边缘计算部署与图生文大模型在工地场景的落地思路与案例。",
    url: "#",
  },
  {
    title: "受邀分享｜智能建造课程分享",
    organizer: "高校联合 workshop",
    topic: "物理驱动 AI 与工程数据闭环",
    type: "课程分享",
    date: "2023",
    description:
      "面向师生与产学研合作方，分享物理机理与数据模型融合、工程知识库与可解释决策输出的研究与实践进展。",
    url: "#",
  },
];

/** Stats for the section header. Replace with real numbers when available. */
export const speakingStats = {
  /** 受邀分享场次 */
  invitedCount: 4,
  /** 企业培训次数 */
  trainingCount: 2,
  /** 覆盖单位数（可带 + 表示“以上”） */
  organizationsCount: "3+",
} as const;
