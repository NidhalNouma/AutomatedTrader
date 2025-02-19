import React from "react";
import LivePerformanceChart from "./LivePerformanceChart";

export default function WebhookStatsSection() {
  return (
    <div className="py-20 relative overflow-hidden bg-bgt/30 border-y border-bgt/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-title mb-4">
            Real-Time Performance Tracking
          </h2>
          <p className="text-xl text-text max-w-3xl mx-auto">
            Monitor your trading performance with advanced analytics and
            real-time statistics
          </p>
        </div>

        <LivePerformanceChart />
      </div>
    </div>
  );
}
