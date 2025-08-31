import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  limitations: string[];
  popular?: boolean;
  icon: React.ReactNode;
  buttonText: string;
  buttonVariant: 'default' | 'outline' | 'secondary';
}

const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Explorer',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started with anti-tutorial hell learning',
    features: [
      '5 coding challenges per month',
      'Basic hint system',
      'Progress tracking',
      'Community forum access',
      'Email support'
    ],
    limitations: [
      'Limited to beginner challenges',
      'No advanced learning paths',
      'No priority support'
    ],
    icon: <Star className="w-6 h-6" />,
    buttonText: 'Start Free',
    buttonVariant: 'outline'
  },
  {
    id: 'pro',
    name: 'Developer',
    price: 19,
    period: 'month',
    description: 'For serious developers ready to escape tutorial hell',
    features: [
      'Unlimited coding challenges',
      'Advanced AI hint system',
      'All learning paths unlocked',
      'Progress analytics',
      'Priority email support',
      'Code review feedback',
      'Custom challenge difficulty',
      'Leaderboard access',
      'Download certificates'
    ],
    limitations: [],
    popular: true,
    icon: <Zap className="w-6 h-6" />,
    buttonText: 'Upgrade to Pro',
    buttonVariant: 'default'
  },
  {
    id: 'enterprise',
    name: 'Team Leader',
    price: 49,
    period: 'month',
    description: 'For teams and organizations training multiple developers',
    features: [
      'Everything in Developer',
      'Team management dashboard',
      'Custom learning paths',
      'Advanced analytics & reporting',
      'White-label options',
      'Dedicated account manager',
      'Phone & video support',
      'Custom integrations',
      'Bulk user management',
      'Team progress tracking'
    ],
    limitations: [],
    icon: <Crown className="w-6 h-6" />,
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary'
  }
];

interface PricingProps {
  onSelectPlan?: (planId: string) => void;
}

export function PricingSection({ onSelectPlan }: PricingProps) {
  const handleSelectPlan = (planId: string) => {
    onSelectPlan?.(planId);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Escape Plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stop following tutorials. Start solving real problems. Choose the plan that fits your learning journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${tier.popular ? 'md:-mt-4' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full ${tier.popular ? 'border-2 border-blue-500 shadow-xl' : 'border border-gray-200'}`}>
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${tier.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                      {tier.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {tier.description}
                  </CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">${tier.price}</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-1">/{tier.period}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center">
                      <Check className="w-4 h-4 mr-2" />
                      What&apos;s Included
                    </h4>
                    <ul className="space-y-2">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {tier.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-500 mb-3 flex items-center">
                        <X className="w-4 h-4 mr-2" />
                        Limitations
                      </h4>
                      <ul className="space-y-2">
                        {tier.limitations.map((limitation, limitationIndex) => (
                          <li key={limitationIndex} className="flex items-start">
                            <X className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-500">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    className={`w-full ${tier.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}
                    variant={tier.buttonVariant}
                    onClick={() => handleSelectPlan(tier.id)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All plans include our core anti-tutorial hell philosophy and methodology
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>✓ No hand-holding tutorials</span>
            <span>✓ Real-world challenges</span>
            <span>✓ Independent learning</span>
            <span>✓ Struggle-first approach</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}