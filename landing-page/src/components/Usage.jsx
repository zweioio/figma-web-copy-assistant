import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, MessageSquare } from 'lucide-react';

const steps = [
  {
    icon: <Terminal className="w-6 h-6 text-white" />,
    title: "1. 安装命令行工具",
    description: "使用 npm 或 pip 安装 SuperMCP CLI 工具，快速初始化您的项目。",
    code: "npm install -g super-mcp-cli\nsuper-mcp init my-project"
  },
  {
    icon: <Database className="w-6 h-6 text-white" />,
    title: "2. 连接您的数据源",
    description: "通过简单的配置文件或命令，连接 PostgreSQL, MySQL 或任何 API。",
    code: "super-mcp connect postgres://user:pass@localhost:5432/db\n# 自动生成 schema 映射"
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-white" />,
    title: "3. 在 LLM 中使用",
    description: "启动服务后，即可在 ChatGPT 或 Claude 中直接调用您的数据上下文。",
    code: "const response = await mcp.chat(\n  \"查询上个月的销售额并生成报表\"\n);"
  }
];

const Usage = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-super-text">
            快速 <span className="gradient-text">上手</span>
          </h2>
          <p className="text-super-text-secondary text-lg">
            只需三步，即可将您的私有数据赋予 AI 智能
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden lg:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col h-full"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6 relative z-10">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-super-text mb-3">{step.title}</h3>
                <p className="text-super-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>

              <div className="flex-grow mt-4">
                <div className="bg-gray-900 rounded-xl p-4 shadow-lg border border-gray-800 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <pre className="font-mono text-xs md:text-sm text-gray-300 overflow-x-auto custom-scrollbar">
                    <code>{step.code}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Usage;
