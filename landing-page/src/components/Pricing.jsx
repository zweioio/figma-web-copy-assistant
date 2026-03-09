import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: "开发者版",
    price: "¥0",
    period: "/月",
    description: "适合个人开发者和小型项目",
    features: [
      "每月 10,000 次请求",
      "连接 3 个数据源",
      "基础社区支持",
      "单用户",
      "API 访问"
    ],
    notIncluded: [
      "SSO 单点登录",
      "SLA 保障",
      "私有化部署"
    ],
    cta: "免费开始",
    popular: false
  },
  {
    name: "专业版",
    price: "¥199",
    period: "/月",
    description: "适合快速增长的初创团队",
    features: [
      "每月 100,000 次请求",
      "无限数据源连接",
      "优先邮件支持",
      "5 个团队成员",
      "API 访问",
      "高级分析面板"
    ],
    notIncluded: [
      "SSO 单点登录",
      "SLA 保障",
      "私有化部署"
    ],
    cta: "开始试用",
    popular: true
  },
  {
    name: "企业版",
    price: "定制",
    period: "",
    description: "为大型组织提供安全、合规的解决方案",
    features: [
      "无限请求",
      "无限数据源连接",
      "24/7 专属支持",
      "无限团队成员",
      "API 访问",
      "高级分析面板",
      "SSO 单点登录",
      "99.9% SLA 保障",
      "支持私有化部署"
    ],
    notIncluded: [],
    cta: "联系销售",
    popular: false
  }
];

const Pricing = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-super-text">
            灵活的 <span className="gradient-text">价格方案</span>
          </h2>
          <p className="text-super-text-secondary text-lg">
            无论您是独立开发者还是大型企业，我们都有适合您的方案
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 bg-white border ${plan.popular ? 'border-blue-500 shadow-xl scale-105 z-10' : 'border-slate-200 shadow-sm'} flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  最受欢迎
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-super-text mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-super-text">{plan.price}</span>
                  <span className="text-super-text-secondary ml-1">{plan.period}</span>
                </div>
                <p className="text-sm text-super-text-secondary">{plan.description}</p>
              </div>

              <div className="flex-grow mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-super-text">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-400">
                      <X className="w-4 h-4 text-gray-300 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                plan.popular 
                  ? 'bg-super-primary text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30' 
                  : 'bg-slate-100 text-super-text hover:bg-slate-200'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
