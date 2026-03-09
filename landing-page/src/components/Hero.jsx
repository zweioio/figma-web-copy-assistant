import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Database, Cpu } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-hero min-h-[90vh] flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/80 border border-blue-200 text-blue-600 text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
              ✨ 下一代 AI 上下文协议
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-super-text">
              <span className="gradient-text">SuperMCP</span>
            </h1>
            <p className="text-xl text-super-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
              连接您的 AI 模型与数据。SuperMCP 为大语言模型提供标准化的上下文交互协议，让 AI 更懂您的业务。
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 bg-super-primary text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center gap-2 w-full sm:w-auto justify-center">
                立即开始 <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-white text-super-text border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center">
                查看文档 <Terminal className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Glass Cards Visualization */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-5xl mx-auto mt-12"
        >
          <div className="glass-card p-2 md:p-4">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-800">
              <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="ml-4 text-xs text-gray-400 font-mono flex items-center">
                  <Terminal className="w-3 h-3 mr-2" />
                  super-mcp-server --port 3000
                </div>
              </div>
              <div className="p-6 font-mono text-sm md:text-base overflow-x-auto custom-scrollbar">
                <div className="text-green-400 mb-2">$ mcp connect postgres://db.local</div>
                <div className="text-gray-300 mb-4">
                  <span className="text-blue-400">ℹ</span> Connected to PostgreSQL database<br/>
                  <span className="text-blue-400">ℹ</span> Schema introspection complete<br/>
                  <span className="text-green-400">✔</span> Ready to serve context to LLM
                </div>
                <div className="text-green-400 mb-2">$ mcp query "Show recent users"</div>
                <div className="text-gray-300">
                  <span className="text-purple-400">{`{`}</span><br/>
                  &nbsp;&nbsp;<span className="text-yellow-300">"type"</span>: <span className="text-green-300">"table_context"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-yellow-300">"data"</span>: [<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;{`{ "id": 1, "name": "Alice", "role": "admin" },`}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;{`{ "id": 2, "name": "Bob", "role": "user" }`}<br/>
                  &nbsp;&nbsp;]<br/>
                  <span className="text-purple-400">{`}`}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 md:right-10 glass-card p-4 flex items-center gap-3 hidden md:flex"
          >
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-500">已连接数据源</div>
              <div className="font-bold text-super-text">PostgreSQL</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-5 -left-5 md:left-10 glass-card p-4 flex items-center gap-3 hidden md:flex"
          >
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-500">模型兼容</div>
              <div className="font-bold text-super-text">GPT-4 / Claude 3</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
