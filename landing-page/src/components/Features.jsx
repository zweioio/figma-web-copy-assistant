import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Shield, Cpu, Cloud, Code, RefreshCw, Puzzle, Building2 } from 'lucide-react';

const features = [
  {
    icon: <Layers className="w-6 h-6" />,
    title: "标准协议",
    description: "统一的上下文交互标准，让您的数据在不同 AI 模型间无缝流转。"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "安全上下文",
    description: "内置细粒度的权限控制，确保 AI 只能访问被授权的敏感数据。"
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "多模型支持",
    description: "兼容 GPT-4, Claude 3, Llama 3 等主流大模型，一次接入，处处可用。"
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: "本地与云端",
    description: "支持本地部署运行，也支持云端托管，灵活适应各种架构需求。"
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "开发者友好",
    description: "提供 TypeScript, Python, Go 等多种 SDK，几行代码即可完成集成。"
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "实时同步",
    description: "数据变更实时推送到 AI 上下文，确保模型回答永远基于最新信息。"
  },
  {
    icon: <Puzzle className="w-6 h-6" />,
    title: "插件系统",
    description: "丰富的社区插件生态，快速扩展连接数据库、API 和 SaaS 服务。"
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "企业级",
    description: "专为企业设计，支持 SSO、审计日志和高可用部署方案。"
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-super-text">
            为什么选择 <span className="gradient-text">SuperMCP</span>
          </h2>
          <p className="text-super-text-secondary text-lg">
            构建下一代 AI 应用的基础设施，连接智能与数据的桥梁
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg hover:border-blue-100 hover:bg-white transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-super-primary mb-4 group-hover:scale-110 group-hover:border-blue-200 group-hover:shadow-md transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-super-text">{feature.title}</h3>
              <p className="text-sm text-super-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
