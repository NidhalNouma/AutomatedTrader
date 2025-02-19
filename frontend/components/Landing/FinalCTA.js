import React from "react";
import { ArrowRight } from "lucide-react";

const socialProof = {
  tradingVolume: "$2.8B+",
  activeUsers: "50K+",
  successRate: "92.3%",
  uptime: "99.9%",
};

export default function FinalCTA() {
  return (
    <div className="py-20 relative overflow-hidden bg-gradient-to-b from-dark-100/30 to-dark">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-title mb-4">
          Ready to Transform Your Trading?
        </h2>
        <p className="text-xl text-text mb-8 max-w-2xl mx-auto">
          Join thousands of traders already using AutomatedTrader to achieve
          consistent profits
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="btn-primary rounded-md px-8 py-4 text-lg flex items-center">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button
            className="px-8 py-4 text-lg border border-accent/30 text-accent rounded-lg
                         hover:bg-accent/10 transition-all duration-300"
          >
            Schedule Demo
          </button>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-title">
              {socialProof.tradingVolume}
            </div>
            <div className="text-text">Trading Volume</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-title">
              {socialProof.activeUsers}
            </div>
            <div className="text-text">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-title">
              {socialProof.successRate}
            </div>
            <div className="text-text">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-title">
              {socialProof.uptime}
            </div>
            <div className="text-text">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
}
