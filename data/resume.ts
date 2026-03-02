/** Structured publication data for CardList component */
export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  metrics: string;
  /** PDF URL (e.g. OSS) for 查看全文 */
  link?: string;
}

/** Patent type for tag display */
export type PatentType = "发明专利" | "实用新型专利";

/** Structured patent data for CardList component */
export interface Patent {
  title: string;
  inventors: string;
  number: string;
  year: string;
  patentType: PatentType;
  /** PDF URL (e.g. OSS) for 查看全文 */
  link?: string;
}

export const resumeData = {
  personalInfo: {
    name: "Liu Bo (刘博)",
    title: "工程数字化与智能建造专家",
    tagline: "解决工程感知—诊断—决策的落地断层",
    subTagline: "面向存量时代的工程体检与智能运维。将物理机理与 AI 模型融合，服务总承包与城市资产管理。",
    email: "liubo@sdjzu.edu.cn",
    phone: "18560007887",
    location: "中国上海",
    bio: "致力于填补学术研究与工业应用之间的鸿沟。我专注于将最前沿的计算机视觉与深度学习技术，转化为建筑行业真正可落地、更安全、更高效的解决方案。",
    avatarUrl: "/assets/images/avatar.jpg",
  },
  /** Three industry pain points — problem-driven narrative */
  painPoints: [
    {
      title: "传统检测的盲区",
      body: "人工巡检周期长、数据离散，无法支撑系统性工程决策。现场情况难以量化，问题往往在扩大后才被发现。",
    },
    {
      title: "数据无法转化为决策",
      body: "传感器与采集工具产生大量原始数据，但缺乏从数据到工程判断的转化机制，最终形成数据孤岛。",
    },
    {
      title: "AI 模型缺乏物理约束",
      body: "通用深度学习模型在小样本工程场景中可靠性不足，需要将物理机理与数据模型深度融合才能落地。",
    },
  ],
  /** Three-layer capability structure */
  capabilities3Layer: [
    {
      title: "工程场景 AI 系统架构",
      modules: [
        "多源感知闭环架构设计",
        "边缘端到云端部署方案",
        "工程级系统集成与交付",
        "硬件选型与现场联调",
      ],
      techStack: [
        "Python / PyTorch",
        "NVIDIA Jetson 边缘计算",
        "BLE / IoT 硬件集成",
        "Docker / Next.js",
      ],
    },
    {
      title: "城市体检与存量资产智能诊断",
      modules: [
        "小样本场景可解释诊断模型",
        "三维空间缺陷定位与证据链构建",
        "自动生成合规工程报告",
        "无人机影像结构化处理",
      ],
      techStack: [
        "DJI Terra / Mesh 三维重建",
        "目标检测与语义分割",
        "空间数据库 + 版本审计",
      ],
    },
    {
      title: "物理驱动的大模型决策系统",
      modules: [
        "物理约束下的 AI 模型设计",
        "工程知识库与推理引擎构建",
        "全流程可追溯决策输出",
        "标准化方案与报价自动生成",
      ],
      techStack: [
        "RAG / 工程垂直大模型",
        "PINN 物理约束网络",
        "结构化数据闭环输出",
      ],
    },
  ],
  /** Four cooperation modes */
  cooperationModes: [
    {
      title: "技术顾问与架构设计",
      desc: "针对具体工程问题，提供系统设计、技术选型与可行性评估，不绑定实施合同。",
    },
    {
      title: "课题联合申报",
      desc: "与企业或高校联合申报国家/省级科技课题，负责技术方案设计与研究执行。",
    },
    {
      title: "产品联合研发",
      desc: "共同研发可落地的工程 AI 产品，从原型验证到商业化部署全程参与。",
    },
    {
      title: "数字化系统定制",
      desc: "针对特定工程场景，端到端开发并交付可运行的数据采集、分析与决策系统。",
    },
  ],
  trustedBy: [
    { name: "同济大学", logo: "同济大学" },
    { name: "中建八局", logo: "中建八局" },
    { name: "住建部", logo: "住建部" },
    { name: "上海建工", logo: "上海建工" },
    { name: "山东高速", logo: "山东高速" },
  ],
  valueProposition: [
    {
      pain: "现场巡检效率低下",
      solution: "AI 视觉自动化监控",
      roi: "节省 70% 人力成本",
      details: "全天候自动视觉分析替代人工巡逻，实现降本增效。"
    },
    {
      pain: "安全隐患与事故频发",
      solution: "实时安全预警系统",
      roi: "误报率降低 60%",
      details: "毫秒级隐患识别，将事故扼杀在发生之前。"
    },
    {
      pain: "数据孤岛与价值流失",
      solution: "工程大模型与大数据分析",
      roi: "决策速度提升 5 倍",
      details: "激活历史工程数据价值，为管理层提供预测性洞察。"
    }
  ],
  clientResults: [
    {
      client: "中国建筑 (CSCEC)",
      logo: "中建八局",
      stat: "3:1 投资回报率",
      description: "在试点智慧工地项目中实现了 300% 的投资回报。"
    },
    {
      client: "上海建工 (SCG)",
      logo: "上海建工",
      stat: "效率提升 35%",
      description: "施工进度追踪效率显著提升，管理颗粒度更精细。"
    },
    {
      client: "住建部试点项目",
      logo: "住建部",
      stat: "国家级示范",
      description: "入选住房和城乡建设部智能建造典型案例。"
    },
    {
      client: "同济大学",
      logo: "同济大学",
      stat: "产学研转化",
      description: "成功将 3 项核心研究专利转化为商业化产品。"
    }
  ],
  services: [
    {
      title: "数字化转型咨询",
      desc: "建筑企业顶层设计、国家级课题（自科/重点研发）申报策略及技术路线图规划。",
      icon: "Lightbulb",
    },
    {
      title: "MVP 原型开发与验证",
      desc: "AI 算法在真实工程场景中的快速验证。提供从硬件选型到边缘端部署的全栈服务。",
      icon: "Terminal",
    },
    {
      title: "系统架构设计",
      desc: "设计高可用、可扩展的智慧工地系统架构，深度集成 5G、IoT 与计算机视觉技术。",
      icon: "Brain",
    },
  ],
  servicePackages: [
    {
      title: "高管战略汇报",
      price: "¥50,000 / 次",
      features: [
        "1 小时深度战略拆解",
        "企业数字化转型路线图",
        "AI 技术可行性评估",
        "高管问答与决策支持"
      ],
      target: "面向企业 C-Level 高管"
    },
    {
      title: "技术架构设计",
      price: "¥100,000 / 项目",
      features: [
        "完整的技术架构方案",
        "软硬件选型建议",
        "系统集成实施路径",
        "技术风险评估报告"
      ],
      target: "面向 CTO 与技术负责人"
    },
    {
      title: "技术原型 (MVP) 交付",
      price: "¥200,000 / 套",
      features: [
        "2 周极速交付",
        "定制化算法调优",
        "边缘端部署调试",
        "现场试点验证"
      ],
      target: "面向创新业务团队"
    }
  ],
  capabilitiesMatrix: [
    {
      scene: "安全监控",
      tech: "计算机视觉 + 边缘计算",
      value: "风险降低 70%",
      icon: "Shield"
    },
    {
      scene: "进度追踪",
      tech: "SLAM + 三维重建",
      value: "效率提升 40%",
      icon: "Activity"
    },
    {
      scene: "质量检测",
      tech: "大模型 (LLM) + 视觉语言模型",
      value: "检测成本降低 50%",
      icon: "CheckCircle"
    }
  ],
  resources: [
    {
      title: "2026 智能建造发展趋势白皮书",
      type: "PDF",
      url: "/assets/docs/2026-trends.pdf",
      icon: "FileText"
    },
    {
      title: "工程边缘计算应用实战",
      type: "Video",
      url: "/assets/videos/edge-computing-demo.mp4",
      icon: "Video"
    },
    {
      title: "数字化转型 ROI 计算器",
      type: "Tool",
      url: "/assets/tools/roi-calculator.xlsx",
      icon: "Calculator"
    }
  ],
  education: [
    {
      school: "同济大学",
      degree: "土木工程（智能建造方向） 博士",
      dates: "2019.9 - 2025.3",
      details: "导师：卢昱杰教授。研究方向：工程计算机视觉。",
    },
    {
      school: "山东建筑大学",
      degree: "桥梁与隧道工程 硕士",
      dates: "2011.9 - 2014.6",
      details: "导师：范伟副教授。",
    },
    {
      school: "山东建筑大学",
      degree: "土木工程 学士",
      dates: "2007.9 - 2011.6",
    },
  ],
  experience: [
    {
      company: "创乐（上海）信息技术有限公司",
      role: "CIO (首席信息官)",
      dates: "2020.7 - 2024.7",
      description: [
        "主导 'InView' 施工视频结构化分析产品线从 0 到 1 的研发与落地。",
        "负责 '施工全方位安全系统' 和 '作业面进度识别系统' 的实施。",
        "负责智能建造战略规划与业务调整。",
        "参与并完成天使轮及 Pre-A 轮融资。",
        "管理知识产权组合并负责高新技术企业申报。",
      ],
    },
    {
      company: "上海浩桦科技有限公司",
      role: "算法工程师 / 实施工程师",
      dates: "2018.3 - 2019.8",
      description: [
        "开发并优化用于 CT 管道区域分割的深度学习算法。",
        "制定生产环境软硬件解决方案并负责优化与运维。",
        "协助撰写 AI 医疗影像产品需求与文档。",
      ],
    },
    {
      company: "山东省建筑科学研究院",
      role: "基桩检测主管",
      dates: "2014.7 - 2017.4",
      description: [
        "负责临沂、济宁、菏泽地区的基桩检测与鉴定服务。",
      ],
    },
  ],
  projects: [
    {
      title: "市政机械哨兵监控系统",
      category: "Demo",
      thumbnailUrl: "/assets/images/thumb-sentinel.jpg",
      challenge: "市政施工场地出入口'黑车'混入难题：未备案工程车辆（挖掘机、运输车）擅自进场，带来安全生产隐患；传统人工登记效率低、无法全天候覆盖，管理漏洞大。",
      solution: "研发'市政机械哨兵'一体化终端：双目摄像头识别车辆类型与距离，BLE蓝牙网关读取备案车辆'电子身份证'信标，视觉-射频智能融合，秒级判定'已备案/未备案'并自动抓图存证。搭载NVIDIA Jetson边缘计算主机，全程本地推理，无需云端。",
      impact: "为济南城建集团研发，实现施工场地出入口7×24小时无人值守智能核验；未备案工程车实时告警，事件图文留档，大幅降低人工巡查成本与安全管理漏洞。",
      description: "基于双目视觉与BLE信标融合的工程车辆智能准入报警系统原型，部署于市政施工场地出入口，自动识别并预警未备案'黑车'进场，兼具社会车辆车牌识别功能。",
      tags: ["基础设施韧性诊断", "多源感知融合"],
      demoUrl: "http://123.249.9.250:8501/?date=2026-02-02",
      type: "iframe",
    },
    {
      title: "街景 to BIM——建筑立面反演系统",
      category: "Demo",
      thumbnailUrl: "/assets/images/thumb-street2bim.jpg",
      challenge: "既有建筑立面数字化成本高昂：人工测绘与CAD建模耗时长、依赖专业设备，制约了城市数字孪生与存量建筑改造的规模化推进。",
      solution: "以普通街景照片为唯一输入，自动化完成立面特征提取、深度估计与参数化建筑结构反演，输出可直接用于设计的CAD/BIM图纸，全程无需激光扫描仪等专业硬件。",
      impact: "从一组街景照片到可交付建筑立面CAD图纸，端到端流程大幅缩短，降低既有建筑数字化门槛，为城市更新与建筑改造提供低成本数字底座。",
      description: "基于街景图像的建筑立面结构自动反演系统（NewDemoFacade），输入普通街道照片，输出参数化建筑立面CAD/BIM模型，服务于城市数字孪生与存量建筑改造场景。",
      tags: ["既有建筑运维", "多源感知融合"],
      demoUrl: "http://47.98.176.41:8000/",
      type: "iframe",
    },
    {
      title: "UrbanHealth.OS——建筑外墙智能巡检平台",
      category: "Demo",
      thumbnailUrl: "/assets/images/thumb-urbanhealth.jpg",
      challenge: "既有建筑外墙修缮依赖人工肉眼巡检：缺陷记录离散、空间定位不准、整改过程无从追溯，无法支撑规模化精细化修缮管理。",
      solution: "无人机航拍 + DJI Terra 三维重建为底座，AI 自动识别外墙缺陷（裂缝/空鼓/渗水），缺陷三维空间锚定与多图证据聚合，工程师可在 Web 端修正空间位置，全程版本化审计追溯，最终输出标准化缺陷数据包（JSON/Excel）。",
      impact: "实现'从无人机采集到结构化缺陷报告'的可追溯闭环；每个缺陷具备唯一 ID、完整证据链与修改版本记录，可直接对接报价规则引擎与履约管控系统。",
      description: "建筑外墙智能巡检与修缮诊断平台（MVP），覆盖数据采集→三维建模→AI缺陷识别→空间索引→结构化输出全流程，为标准化修缮方案与报价提供数字底座。",
      tags: ["城市体检", "既有建筑运维", "物理驱动AI"],
      demoUrl: "http://123.249.9.250:5173/urbanhealth/",
      type: "iframe",
    },
    {
      title: "InView 施工安全监控系统",
      category: "产品",
      thumbnailUrl: "",
      challenge: "传统人工监控滞后严重（24小时+），且因人员疲劳导致 80% 的安全隐患被遗漏。",
      solution: "部署边缘计算单元 + 轻量化 CV 模型，实现毫秒级违规行为检测。",
      impact: "误报率降低 60%，每个工地每天节省 2 名安全巡检员。试点阶段实现零事故。",
      description: "一套基于视频的施工现场综合安全监控系统，利用 AI 实时检测不安全行为与结构异常。",
      tags: ["总承包数字化赋能", "多源感知融合"],
      demoUrl: "",
      type: "iframe", 
    },
  ],
  publications: [
    "Lu Yujie, Liu Bo, and Li Yongkui. 'Collaboration networks and bidding competitiveness in megaprojects.' Journal of Management in Engineering 37, no. 6 (2021): 04021064. (SCI, JCR Q1, IF=6.415)",
    "Liu Bo, Lu Yujie, Wang Rui, and Wei Wei. 'A Novel Face Super-Resolution-Based Framework for Identity Recognition of Unsafe Behavior Workers.' In 2020 Chinese Automation Congress (CAC), pp. 7279-7282. IEEE, 2020. (EI)",
    "Yujie Lu; Bo Liu; Wei Wei; Bo Xiao; Zhangding Liu; Wensheng Li. 'Generating Synthetic Images for Construction Machinery Data Augmentation Utilizing Context-Aware Object Placement'. Developments in the Built Environment (2025): 100610.. (SCI, JCR Q1, IF=6.5)",
    "Wei Wei, Yujie Lu, Tao Zhong, Peixian Li, and Liu Bo. 'Integrated vision-based automated progress monitoring of indoor construction using mask region-based convolutional neural networks and BIM.' Automation in Construction 140 (2022): 104327. (SCI, JCR Q1, IF=10.517)",
    "Li Peixian, Pengfei Dai, Daqian Cao, Liu Bo, and Yujie Lu. 'Non-intrusive comfort sensing: Detecting age and gender from infrared images for personal thermal comfort.' Building and Environment (2022): 109256. (SCI, JCR Q1, IF=7.093)",
    "Song, G., Lu, Y., Liu, B., Duan, H., Feng, H., & Liu, G. (2023). Photovoltaic panel waste assessment and embodied material flows in China, 2000–2050. Journal of Environmental Management, 338, 117675. (SCI, JCR Q1, IF=8.7)",
  ],
  patents: [
    "刘博,刘金杉,卢昱杰,魏伟,林奇泓,赵轩. 一种工程机械图像数据集生成方法与电子设备[P]. 上海市: CN115294307A,2022-11-04.",
    "刘博,卢昱杰,张自然,韩进. 一种基于姿态识别的机械单体施工作业效率检测方法和系统[P]. 上海市: CN114418310A,2022-04-29.",
    "刘博,卢昱杰,张自然,范森森,李东永,李易航. 一种用于施工安全管理的可移动边缘计算摄像头系统和装置[P]. 上海市: CN114422750A,2022-04-29.",
    "刘金杉,卢昱杰,王瑞,刘博,张自然. 基于计算机视觉的工作效率评价方法、系统、设备及介质[P]. 上海市: CN112819306A,2021-05-18.",
    "卢昱杰,王龙,秦韬,刘博,赵宪忠. 一种爬壁机器人跌落保护装置及其控制方法[P]. 上海市: CN113427521B,2022-09-16.",
  ],
  honors: [
    "2024 年山东省博士（后）创新创业大赛（银奖）",
    "第 42 批同济创业基金会“雏鹰计划”（立项资助）",
    "同济科技园第五期创新孵化种子项目（立项资助）",
    "第七届济南新动能创新创业大赛高端装备与智能制造组（优胜奖）",
    "第一届住房城乡建设部智能建造大赛（一等奖）",
    "广联达智能建造奖学金（前 1%, 2021 年）",
    "山东省省级优秀毕业生（2011 年）",
  ],
  /** Structured publications for CardList component */
  structuredPublications: [
    {
      title: "Collaboration networks and bidding competitiveness in megaprojects",
      authors: "Lu Yujie, Liu Bo, Li Yongkui",
      venue: "Journal of Management in Engineering",
      year: "2021",
      metrics: "SCI, JCR Q1, IF=6.415",
      link: "https://liubopersonalblog.oss-cn-beijing.aliyuncs.com/Collaboration%20networks%20and%20bidding%20competitiveness%20in%20megaprojects.pdf",
    },
    {
      title: "A Novel Face Super-Resolution-Based Framework for Identity Recognition of Unsafe Behavior Workers",
      authors: "Liu Bo, Lu Yujie, Wang Rui, Wei Wei",
      venue: "2020 Chinese Automation Congress (CAC), IEEE",
      year: "2020",
      metrics: "EI",
      link: "https://liubopersonalblog.oss-cn-beijing.aliyuncs.com/A_Novel_Face_Super-Resolution-Based_Framework_for_Identity_Recognition_of_Unsafe_Behavior_Workers.pdf",
    },
    {
      title: "Generating Synthetic Images for Construction Machinery Data Augmentation Utilizing Context-Aware Object Placement",
      authors: "Yujie Lu, Bo Liu, Wei Wei, Bo Xiao, Zhangding Liu, Wensheng Li",
      venue: "Developments in the Built Environment",
      year: "2025",
      metrics: "SCI, JCR Q1, IF=6.5",
      link: "https://liubopersonalblog.oss-cn-beijing.aliyuncs.com/1-s2.0-S2666165925000109-main.pdf",
    },
    {
      title: "Integrated vision-based automated progress monitoring of indoor construction using Mask R-CNN and BIM",
      authors: "Wei Wei, Yujie Lu, Tao Zhong, Peixian Li, Liu Bo",
      venue: "Automation in Construction",
      year: "2022",
      metrics: "SCI, JCR Q1, IF=10.517",
      link: "https://liubopersonalblog.oss-cn-beijing.aliyuncs.com/1-s2.0-S092658052200200X-main.pdf",
    },
    {
      title: "Non-intrusive comfort sensing: Detecting age and gender from infrared images for personal thermal comfort",
      authors: "Li Peixian, Pengfei Dai, Daqian Cao, Liu Bo, Yujie Lu",
      venue: "Building and Environment",
      year: "2022",
      metrics: "SCI, JCR Q1, IF=7.093",
      link: "https://liubopersonalblog.oss-cn-beijing.aliyuncs.com/1-s2.0-S0360132322004917-main.pdf",
    },
    {
      title: "Photovoltaic panel waste assessment and embodied material flows in China, 2000-2050",
      authors: "Song G., Lu Y., Liu B., Duan H., Feng H., Liu G.",
      venue: "Journal of Environmental Management",
      year: "2023",
      metrics: "SCI, JCR Q1, IF=8.7",
      link: "https://liubopersonalblog.oss-cn-beijing.aliyuncs.com/1-s2.0-S0301479723004632-main.pdf",
    },
  ] as Publication[],
  /** Structured patents for CardList component */
  structuredPatents: [
    {
      title: "一种工程机械图像数据集生成方法与电子设备",
      inventors: "刘博, 刘金杉, 卢昱杰, 魏伟, 林奇泓, 赵轩",
      number: "CN115294307A",
      year: "2022",
      patentType: "发明专利",
    },
    {
      title: "一种基于姿态识别的机械单体施工作业效率检测方法和系统",
      inventors: "刘博, 卢昱杰, 张自然, 韩进",
      number: "CN114418310A",
      year: "2022",
      patentType: "发明专利",
    },
    {
      title: "一种用于施工安全管理的可移动边缘计算摄像头系统和装置",
      inventors: "刘博, 卢昱杰, 张自然, 范森森, 李东永, 李易航",
      number: "CN114422750A",
      year: "2022",
      patentType: "发明专利",
    },
    {
      title: "基于计算机视觉的工作效率评价方法、系统、设备及介质",
      inventors: "刘金杉, 卢昱杰, 王瑞, 刘博, 张自然",
      number: "CN112819306A",
      year: "2021",
      patentType: "发明专利",
    },
    {
      title: "一种爬壁机器人跌落保护装置及其控制方法",
      inventors: "卢昱杰, 王龙, 秦韬, 刘博, 赵宪忠",
      number: "CN113427521B",
      year: "2022",
      patentType: "实用新型专利",
    },
  ] as Patent[],
};
