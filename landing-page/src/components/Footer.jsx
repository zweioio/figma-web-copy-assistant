import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="text-2xl font-bold mb-6">SuperMCP</div>
            <p className="text-slate-400 mb-6 max-w-sm">
              构建下一代 AI 应用的基础设施，让智能更懂数据。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-super-primary hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">产品</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">功能特性</a></li>
              <li><a href="#" className="hover:text-white transition-colors">集成</a></li>
              <li><a href="#" className="hover:text-white transition-colors">定价</a></li>
              <li><a href="#" className="hover:text-white transition-colors">更新日志</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">资源</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">文档</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API 参考</a></li>
              <li><a href="#" className="hover:text-white transition-colors">社区指南</a></li>
              <li><a href="#" className="hover:text-white transition-colors">博客</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">公司</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">关于我们</a></li>
              <li><a href="#" className="hover:text-white transition-colors">职业机会</a></li>
              <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
              <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© 2024 SuperMCP. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">条款</a>
            <a href="#" className="hover:text-white transition-colors">隐私</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
