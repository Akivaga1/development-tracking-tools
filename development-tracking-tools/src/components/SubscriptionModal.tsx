import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Check,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Sparkles,
  Building,
  Vote,
  User,
  TrendingUp,
  Lock,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTier?: 'Basic' | 'Pro' | 'Enterprise' | 'Civic';
}

export function SubscriptionModal({ open, onOpenChange, defaultTier = 'Pro' }: SubscriptionModalProps) {
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState<'Basic' | 'Pro' | 'Enterprise' | 'Civic'>(defaultTier);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'mpesa'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form states
  const [mpesaPhone, setMpesaPhone] = useState('254712345678');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');

  const plans = [
    {
      id: 'Basic' as const,
      name: 'Basic Plan',
      tagline: 'Personal Growth Foundation',
      priceMonthly: 0,
      priceYearly: 0,
      badge: 'Free Forever',
      icon: User,
      gradient: 'from-sky-500 to-blue-600',
      description: 'Personal development tracker with journal, goals, and budget tools.',
      features: [
        'PDT Personal Journal with daily reflections',
        'Emoji & Voice emotional check-in',
        'SMART Goal setting & habit tracker',
        'Personal budget & expense log',
        'Weekly wellness & progress insights',
        'Offline local storage capability',
      ],
      isPopular: false,
    },
    {
      id: 'Pro' as const,
      name: 'Pro Plan',
      tagline: 'Professional & Innovation Acceleration',
      priceMonthly: 19,
      priceYearly: 190,
      badge: 'Most Popular',
      icon: TrendingUp,
      gradient: 'from-blue-600 to-cyan-500',
      description: 'Adds career tracker for skill development, innovation pipelines, and career goals.',
      features: [
        'All Basic plan features included',
        'Career Development & Milestone Roadmaps',
        'Skill Matrix & Proficiency Level tracking',
        'Innovation Pipeline & Idea Lab with voting',
        'Professional Journal prompts & PDF achievement exports',
        'AI-driven Career and Sentiment Recommendations',
      ],
      isPopular: true,
    },
    {
      id: 'Enterprise' as const,
      name: 'Enterprise Plan',
      tagline: 'Complete Organizational Powerhouse',
      priceMonthly: 99,
      priceYearly: 990,
      badge: 'Team & HR Choice',
      icon: Building,
      gradient: 'from-blue-700 to-indigo-700',
      description: 'Includes organization tools like DTT Remote, team dashboards, management, KPI/sales/burnout trackers.',
      features: [
        'All Pro & Basic features included',
        'DTT Remote team management & timesheet approvals',
        'Team Dashboards with OKR planning & culture heatmaps',
        'Integrated Project Manager (10 PMBOK key areas)',
        'Business Management: CRM, sales forecasting, inventory',
        'Burnout & Employee Wellness monitoring',
        'Bulk licensing & multi-seat engagement tracking',
        'Nested Football Management Club workspace',
      ],
      isPopular: false,
    },
    {
      id: 'Civic' as const,
      name: 'Civic Plan',
      tagline: 'Leadership & Public Governance',
      priceMonthly: 49,
      priceYearly: 490,
      badge: 'Strategic & Governance',
      icon: Vote,
      gradient: 'from-sky-700 to-blue-900',
      description: 'Features elective leadership, political strategy, campaign tracking, and executive management (board governance, parastatal management, strategic planning, reporting).',
      features: [
        'All Basic features included',
        'Elective Leadership Suite & campaign strategy',
        'Voter & political contact influence heatmaps',
        'Campaign activities, budgets & voter reach logs',
        'Executive Class: Board governance & agenda tools',
        'Parastatal & public sector management oversight',
        'Strategic Planning with Scenario "Decision Deck"',
        'Executive leadership reporting dashboards',
      ],
      isPopular: false,
    },
  ];

  const currentPlan = plans.find((p) => p.id === selectedTier) || plans[1];
  const price = billingCycle === 'monthly' ? currentPlan.priceMonthly : currentPlan.priceYearly;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPlan.priceMonthly === 0) {
      toast({
        title: 'Plan Updated',
        description: 'You are now enrolled in the Basic (Free) tier.',
      });
      onOpenChange(false);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      toast({
        title: paymentMethod === 'stripe' ? 'Payment Successful!' : 'M-Pesa STK Push Sent!',
        description:
          paymentMethod === 'stripe'
            ? `Successfully subscribed to ${currentPlan.name} via Stripe.`
            : `Prompt sent to ${mpesaPhone}. Enter your M-Pesa PIN on your phone to complete activation.`,
      });
      setTimeout(() => {
        setIsSuccess(false);
        onOpenChange(false);
      }, 2000);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-6 md:p-8 bg-card border-border/70 shadow-strong rounded-2xl">
        <DialogHeader className="text-center pb-4 border-b border-border/50">
          <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-2 shadow-soft">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl md:text-3xl font-bold font-heading text-foreground">
            Choose Your Development Plan
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm max-w-xl mx-auto">
            Scale seamlessly across personal, professional, team, civic, and enterprise development with real-time syncing and AI insights.
          </DialogDescription>

          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary/20 p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-primary transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs py-0">
                Save 20%
              </Badge>
            </span>
          </div>
        </DialogHeader>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
          {plans.map((plan) => {
            const isSelected = selectedTier === plan.id;
            const PlanIcon = plan.icon;
            const planPrice = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedTier(plan.id)}
                className={`relative cursor-pointer rounded-xl border p-4 transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/30 bg-primary/[0.03] shadow-medium scale-[1.02]'
                    : 'border-border/60 hover:border-primary/40 bg-card hover:shadow-soft'
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white shadow-soft`}>
                      <PlanIcon className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-foreground font-heading">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{plan.tagline}</p>

                  <div className="mb-4">
                    <span className="text-2xl font-extrabold text-foreground">
                      ${planPrice}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {planPrice === 0 ? '' : billingCycle === 'monthly' ? '/mo' : '/yr'}
                    </span>
                  </div>

                  <p className="text-xs text-foreground/80 leading-relaxed mb-4 pb-3 border-b border-border/40">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {plan.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span className="leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Payment Checkout Box */}
        {currentPlan.priceMonthly > 0 ? (
          <div className="border border-border/70 rounded-xl p-5 bg-secondary/30 mt-2">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
              <div>
                <h4 className="text-base font-bold text-foreground font-heading">
                  Checkout: {currentPlan.name} ({billingCycle})
                </h4>
                <p className="text-xs text-muted-foreground">
                  Secured with 256-bit encryption. Cancel anytime.
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-primary font-heading">
                  ${price}
                </span>
                <span className="text-xs text-muted-foreground block">
                  {billingCycle === 'monthly' ? 'Billed monthly' : 'Billed annually'}
                </span>
              </div>
            </div>

            {/* Payment Options: Stripe vs M-Pesa */}
            <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'stripe' | 'mpesa')} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="stripe" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  Stripe (Cards / Global)
                </TabsTrigger>
                <TabsTrigger value="mpesa" className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  M-Pesa (Mobile Money)
                </TabsTrigger>
              </TabsList>

              {/* Stripe Credit Card Form */}
              <TabsContent value="stripe" className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2 space-y-1.5">
                    <Label className="text-xs">Card Number</Label>
                    <div className="relative">
                      <Input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="font-mono text-sm pl-9"
                      />
                      <CreditCard className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Expiry</Label>
                      <Input
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">CVC</Label>
                      <Input
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* M-Pesa Mobile Form */}
              <TabsContent value="mpesa" className="space-y-3">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Direct STK Push: Enter your registered Safaricom M-Pesa phone number. You will receive an instant prompt on your phone to authorize the transaction.
                  </span>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">M-Pesa Phone Number</Label>
                  <div className="relative">
                    <Input
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      placeholder="2547XXXXXXXX"
                      className="font-mono text-sm pl-9"
                    />
                    <span className="text-xs font-semibold text-muted-foreground absolute left-3 top-2.5">
                      🇰🇪
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Approx. KES {(price * 130).toLocaleString()} at prevailing exchange rates.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>GDPR Compliant • Multi-Device Real-Time Sync • Encrypted</span>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isProcessing || isSuccess}
                className="w-full sm:w-auto bg-primary hover:bg-primary-glow text-white shadow-medium px-6"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Activated!
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    {paymentMethod === 'stripe' ? `Pay $${price} & Upgrade` : `Send M-Pesa STK Push`}
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="border border-border/70 rounded-xl p-5 bg-secondary/30 mt-2 flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-foreground">Basic Plan (Free Tier)</h4>
              <p className="text-xs text-muted-foreground">Includes Personal Development Tracker with journal, goals, and budget tools.</p>
            </div>
            <Button onClick={handleCheckout} variant="outline">
              Continue with Free
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
