import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Users, Truck, CheckCircle2 } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Activity,
      value: "17+",
      label: "Therapeutic Formulations",
      subtext: "Across Diabetes, Cardiac & Gastro segments",
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      icon: ShieldCheck,
      value: "99.8%",
      label: "Active Assay Purity",
      subtext: "Strict IP / USPNF reference standards",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      icon: Users,
      value: "15,000+",
      label: "Healthcare Providers",
      subtext: "Trusted by physicians across India",
      color: "text-sky-600 bg-sky-50 border-sky-200",
    },
    {
      icon: Truck,
      value: "Pan-India",
      label: "CFA & Stockist Network",
      subtext: "Rapid temperature-controlled logistics",
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
  ];

  return (
    <section id="quality" className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            Quality Assurance Standard
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Engineered with Clinical Rigor, Delivered with Care
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Every batch undergoes stringent multi-stage chromatographic assays, dissolution testing,
            and stability testing under accelerated climatic conditions.
          </p>
        </div>

        {/* Stats Grid with Staggered Fade-in */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-1">
                  {item.value}
                </div>
                <div className="text-sm font-bold text-slate-800 mb-1">
                  {item.label}
                </div>
                <div className="text-xs text-slate-500">
                  {item.subtext}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

