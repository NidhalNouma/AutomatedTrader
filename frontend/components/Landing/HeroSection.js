import React from "react";
import {
  Award,
  ArrowRight,
  Star,
  Shield,
  Users,
  Clock,
  Bot,
  DollarSign,
  Zap,
} from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bgt/95 via-bgt/80 to-bgt"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,122,255,0.1),transparent_50%)] "
          style={{
            backgroundImage:
              "radial-gradient(circle at bottom right,rgba(0,122,255,.1),transparent 50%)",
          }}
        ></div>
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle at bottom left,rgba(124,58,237,.1),transparent 50%)",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.1),transparent_50%)] "
        ></div>
      </div>

      <div className="relative z-10 pt-20 pb-32 text-center px-4">
        <div className="animate-fade-in-up max-w-5xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 text-accent mb-8 border border-accent/20 backdrop-blur-sm">
            <Award className="h-4 w-4 mr-2" />
            <span>Powering $2.8B+ in Trading Volume</span>
          </div>

          <h1 className="text-6xl sm:text-7xl font-bold text-title mb-6 tracking-tight leading-tight">
            Trade Smarter with
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              AI-Powered Automation
            </span>
          </h1>
          <p className="text-xl text-text mb-8 max-w-2xl mx-auto">
            Connect TradingView to automated execution in 5 minutes. Join
            50,000+ traders achieving{" "}
            <span className="text-emerald-400 font-semibold">
              312% higher returns
            </span>{" "}
            with our advanced platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button
              className="btn-primary rounded-lg w-full sm:w-auto px-8 py-4 text-lg flex items-center justify-center
                             transform hover:scale-105 transition-all"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              className="w-full sm:w-auto px-8 py-4 text-lg border border-accent/30 text-accent rounded-lg
                             hover:bg-accent/10 transition-all duration-300 transform hover:scale-105
                             backdrop-blur-sm"
            >
              Watch Demo
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Bot className="h-5 w-5 text-accent" />
                <span className="text-2xl font-bold text-title">0.04s</span>
              </div>
              <p className="text-sm text-text">Execution Speed</p>
            </div>
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                <span className="text-2xl font-bold text-title">312%</span>
              </div>
              <p className="text-sm text-text">Higher Returns</p>
            </div>
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-purple-400" />
                <span className="text-2xl font-bold text-title">50K+</span>
              </div>
              <p className="text-sm text-text">Active Traders</p>
            </div>
            <div className="glass-panel rounded-xl p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="text-2xl font-bold text-title">24/7</span>
              </div>
              <p className="text-sm text-text">Automated Trading</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-text/80">4.9/5 Rating (10K+ Reviews)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-emerald-400" />
              <span className="text-text/80">Bank-Grade Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-accent" />
              <span className="text-text/80">5-Min Setup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
