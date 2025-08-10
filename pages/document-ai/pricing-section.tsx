"use client"

import { useState } from "react"
import { pricingPlans } from "@/config/page"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-in fade-in duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your needs. All plans include our core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`font-medium ${!isYearly ? "text-primary" : "text-slate-600"}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? "translate-x-6 bg-primary" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`font-medium ${isYearly ? "text-primary" : "text-slate-600"}`}>
              Yearly
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                Save 20%
              </Badge>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative group hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-in slide-in-from-bottom duration-1000 ${
                plan.popular ? "border-2 border-primary shadow-xl scale-105" : "border hover:border-primary"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="text-slate-600 ml-2">/{isYearly ? "year" : "month"}</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <Button
                  className={`w-full mb-6 group-hover:scale-105 transition-transform ${
                    plan.popular ? "text-white bg-primary hover:bg-blue-700" : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3 animate-in slide-in-from-left duration-500"
                      style={{ animationDelay: `${index * 200 + featureIndex * 50}ms` }}
                    >
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
