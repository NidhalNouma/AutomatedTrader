import React from "react";

export default function LiveProfitsSection({ stats }) {
  return (
    <div className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-title mb-4">
            Live Profits Happening Now
          </h2>
          <p className="text-xl text-text">
            Watch real-time profits from our top traders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="glass-panel rounded-xl p-6 animate-float-medium"
            >
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={stat.avatar}
                  alt={stat.trader}
                  className="w-10 h-10 rounded-full border-2 border-accent/20"
                />
                <div>
                  <h3 className="text-title font-medium">{stat.trader}</h3>
                  <p className="text-text text-sm">{stat.time}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-text">{stat.symbol}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      stat.type === "buy"
                        ? "bg-emerald-500/20 text-long"
                        : "bg-red-500/20 text-short"
                    }`}
                  >
                    {stat.type.toUpperCase()}
                  </span>
                </div>
                <div className="text-profit font-medium">
                  +${stat.profit.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
