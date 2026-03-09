import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "什么是 SuperMCP？",
    answer: "SuperMCP 是一个基于 Model Context Protocol (MCP) 的增强实现，旨在解决大语言模型（LLM）与私有数据交互的标准化问题。它提供了一套统一的接口，让开发者能够轻松地将数据库、API 和文件系统连接到 AI 应用中。"
  },
  {
    question: "SuperMCP 如何保障数据安全？",
    answer: "我们采用企业级的安全架构。所有数据传输均经过加密，且 SuperMCP 仅在本地或您的私有云环境中运行，您的敏感数据永远不会离开您的控制范围。此外，内置的权限管理系统允许您精确控制 AI 可以访问哪些数据字段。"
  },
  {
    question: "支持哪些大语言模型？",
    answer: "SuperMCP 兼容所有支持 OpenAI 接口格式的模型，包括 GPT-4, GPT-3.5, Claude 3, 以及通过 Ollama 运行的本地模型（如 Llama 3, Mistral 等）。"
  },
  {
    question: "对于非技术人员，SuperMCP 易于使用吗？",
    answer: "是的！虽然 SuperMCP 提供了强大的开发者工具，但我们也提供了可视化的管理控制台。非技术用户可以通过简单的点击配置数据源，并直接在聊天界面中测试连接效果。"
  },
  {
    question: "我可以免费使用吗？",
    answer: "当然。SuperMCP 的核心功能是开源且免费的，非常适合个人开发者和小型项目。对于需要高级协作、审计和 SLA 支持的企业用户，我们提供付费的企业版方案。"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-slate-50">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-super-text">
            常见 <span className="gradient-text">问题</span>
          </h2>
          <p className="text-super-text-secondary text-lg">
            关于 SuperMCP 的一切疑问，这里都有解答
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-super-text">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-super-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-super-text-secondary leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
