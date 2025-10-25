'use client'

import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {
    MessageSquare,
    ArrowRight,
    UserCheck,
    Zap,
    Shield,
    Sparkles,
} from 'lucide-react'
import PhoneInput,{ isValidPhoneNumber } from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import './phone.css'
import axios from "axios";
import {UAParser} from "ua-parser-js";
import FAQItem from "@/app/components/FAQItem";

export default function Page() {
    const [activeFeature, setActiveFeature] = useState(0)
    const [phone, setPhone] = useState('')
    const [sending, setSending] = useState(false)
    const [status, setStatus] = useState(null)
    const [scrolled, setScrolled] = useState(false)

    const features = [
        {
            title: 'Post Your Task',
            description:
                'Need something done? Whether it’s delivery, shopping, or home repairs, you can post your task on Breeko in less than a minute.',
            icon: Sparkles,
            preview: 'Describe your task → Set your budget → Publish instantly',
        },
        {
            title: 'Get Matched Instantly',
            description:
                'Breeko connects you with reliable helpers nearby who are ready to get started. You’ll receive offers and chat directly in the app.',
            icon: UserCheck,
            preview: 'Helpers get notified instantly → Transparent pricing → Verified users',
        },
        {
            title: 'Secure Payments',
            description:
                'Payments are handled safely through our platform. Funds are held securely until you confirm the task is completed.',
            icon: Shield,
            preview: 'Card pre-authorization → 48-hour hold for disputes → Zero cash risk',
        },
        {
            title: 'Earn Money Anywhere',
            description:
                'If you’re a helper, you can complete tasks around your city and get paid directly into your wallet — fast, secure, and flexible.',
            icon: Zap,
            preview: 'Complete tasks → Withdraw earnings → No hidden fees',
        },
    ]

    const faqs = [
        {q: 'How quickly can I get help?', a: 'Most tasks are matched within minutes with verified local helpers.'},
        {
            q: 'Is Breeko safe?',
            a: 'Yes! Payments are held securely until you confirm task completion, and all helpers are verified.'
        },
        {
            q: 'Can I earn money with Breeko?',
            a: 'Absolutely! Helpers can complete tasks nearby and withdraw earnings instantly.'
        },
        {
            q: 'Which cities are supported?',
            a: 'Breeko is available across major Moroccan cities and expanding every month.'
        },
    ]

    useEffect(() => {
        const it = setInterval(() => setActiveFeature((p) => (p + 1) % features.length), 4000)
        return () => clearInterval(it)
    }, [])

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    function normalizePhone(input) {
        const trimmed = (input || '').trim()
        if (/^0[5-9]\d{8}$/.test(trimmed)) return '+212' + trimmed.slice(1)
        if (/^\+?212\d{9}$/.test(trimmed.replace(/\s|-/g, ''))) return trimmed.replace(/\s|-/g, '')
        return trimmed
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus(null);

        if (!phone || !isValidPhoneNumber(phone)) {
            setStatus("error");
            return;
        }

        setSending(true);

        try {
            const infoRes = await axios.get("/api/getClientInfo");
            const { browser, os, device, country } = infoRes.data;

            const date = new Date().toLocaleString();

            const payload = {
                text: `*New Breeko Waitlist Signup*\nPhone: ${phone}\nTime: ${date}\nCountry: ${country}\nDevice: ${device}\nOS: ${os}\nBrowser: ${browser}`,
            };

            await axios.post("/api/sendSlack", payload);
            setStatus("success");
            setPhone("");
        } catch (err) {
            console.error(err);
            setStatus("error");
        } finally {
            setSending(false);
        }
    }

    return (
        <>
            <Head>
                <title>Breeko – Get Help Fast, Earn Money Faster in Morocco</title>
                <meta
                    name="description"
                    content="Breeko is Morocco’s trusted task marketplace. Post errands, get instant help, or earn money by completing local tasks. Join our waitlist today."
                />
                <meta
                    name="keywords"
                    content="Breeko, Morocco tasks, task marketplace, earn money Morocco, delivery, shopping, repairs"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>

            <div className="min-h-screen bg-background text-foreground antialiased">

                {/* NAVBAR */}
                <nav
                    className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                        scrolled ? 'backdrop-blur-md bg-background/70 border-b border-foreground/10 shadow-sm' : 'bg-transparent'
                    }`}
                >
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
                        <Link href="/" className="text-2xl font-semibold tracking-tight text-primary">
                            Breeko
                        </Link>
                        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                            <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
                            <a href="#why" className="hover:text-primary transition-colors">Why Breeko</a>
                            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
                            <a href="#waitlist"
                               className="bg-primary text-black px-4 py-2 rounded-xl hover:bg-primary/90 transition-all duration-200 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4"/> Join Early Access
                            </a>
                        </div>
                    </div>
                </nav>

                {/* HERO */}
                <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
                    <div
                        className="absolute inset-0 opacity-7 bg-gradient-to-br from-emerald-50 via-transparent to-transparent"></div>
                    <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
                            Get help fast.
                            <br/>
                            <span className="font-normal text-primary">Earn money faster.</span>
                        </h1>
                        <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed font-light mb-8">
                            Breeko connects Moroccans for everyday help, delivery, shopping, repairs, and more. Fast,
                            secure, and available across Moroccan cities.
                        </p>
                        <a
                            href="#waitlist"
                            className="group bg-primary hover:bg-primary/90 text-black px-8 py-4 rounded-2xl font-medium inline-flex items-center gap-3 mb-10"
                        >
                            <MessageSquare className="w-5 h-5"/> Join Early Access <ArrowRight className="w-4 h-4"/>
                        </a>
                    </div>
                </header>

                {/* HOW IT WORKS */}
                <section className="py-20 lg:py-28" id="how-it-works">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-light mb-4 tracking-tight">How It Works</h2>
                            <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light">Simple, fast, and
                                safe for everyone in Morocco.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div className="space-y-6">
                                {features.map((f, idx) => {
                                    const Icon = f.icon
                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => setActiveFeature(idx)}
                                            className={`cursor-pointer transition-all duration-300 ${
                                                activeFeature === idx ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                                            }`}
                                        >
                                            <div
                                                className="flex items-start gap-6 p-6 rounded-2xl hover:bg-foreground/5 transition-all duration-300">
                                                <div
                                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                                        activeFeature === idx ? 'bg-primary text-black' : 'bg-foreground/10 text-foreground/60'
                                                    }`}
                                                >
                                                    <Icon className="w-6 h-6"/>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-medium mb-2">{f.title}</h3>
                                                    <p className="text-foreground/60 leading-relaxed font-light">{f.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="relative">
                                <div
                                    className="bg-foreground/5 backdrop-blur-sm rounded-3xl p-8 border border-foreground/10 min-h-[260px] flex items-center justify-center">
                                    <div className="text-center">
                                        <div
                                            className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            {React.createElement(features[activeFeature].icon, {className: 'w-10 h-10 text-primary'})}
                                        </div>
                                        <h4 className="text-lg font-medium mb-3">{features[activeFeature].title}</h4>
                                        <div
                                            className="bg-background/50 rounded-xl p-4 border border-foreground/10 text-sm text-foreground/80 font-mono">
                                            {features[activeFeature].preview}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE BREEKO */}
                <section id="why" className="py-16 lg:py-24 bg-foreground/2">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                        <h2 className="text-3xl lg:text-4xl font-light mb-8 tracking-tight">Why Choose Breeko?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: Sparkles,
                                    title: 'Fast',
                                    desc: 'Post a task in under 1 minute and get instant help.'
                                },
                                {
                                    icon: UserCheck,
                                    title: 'Trusted Helpers',
                                    desc: 'All helpers are verified and rated by real users.'
                                },
                                {
                                    icon: Shield,
                                    title: 'Safe Payments',
                                    desc: 'Your funds are held securely until tasks are completed.'
                                },
                                {
                                    icon: Zap,
                                    title: 'Flexible Earnings',
                                    desc: 'Helpers earn money instantly and withdraw anytime.'
                                },
                            ].map((i, idx) => (
                                <div key={idx} className="p-6 bg-background/80 rounded-2xl shadow-sm">
                                    <i.icon className="w-8 h-8 mb-4 mx-auto text-primary"/>
                                    <h3 className="font-medium mb-2">{i.title}</h3>
                                    <p className="text-sm text-foreground/60">{i.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section id="faq" className="py-16 lg:py-24 bg-foreground/2">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        <h2 className="text-3xl lg:text-4xl font-light mb-12 text-center tracking-tight">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((f, i) => (
                                <FAQItem key={i} question={f.q} answer={f.a} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* WAITLIST */}
                <section id="waitlist" className="py-20 lg:py-28">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                        <h2 className="text-3xl lg:text-5xl font-light mb-4 tracking-tight">
                            Join the Early Access List
                        </h2>
                        <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                            Enter your phone number to be notified when Breeko launches in your city.
                            Be the first to experience Morocco’s trusted local marketplace.
                        </p>

                        {/* 👇 new phone input */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
                        >
                            <div className="w-full sm:w-[320px]">
                                <PhoneInput
                                    international
                                    defaultCountry="MA"
                                    value={phone}
                                    onChange={setPhone}
                                    className="breeko-phone"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={sending}
                                className="bg-primary hover:bg-primary/90 text-black px-6 py-3 rounded-2xl font-medium transition-all duration-200 shadow-md"
                            >
                                {sending ? 'Sending...' : 'Notify Me'}
                            </button>
                        </form>

                        <div className="mt-4">
                            {status === 'success' && (
                                <div className="text-green-600">Thanks, You’re on the waitlist!</div>
                            )}
                            {status === 'error' && (
                                <div className="text-red-600">
                                    There was a problem. Please try again later.
                                </div>
                            )}
                        </div>
                    </div>
                </section>


                <footer className="py-8 text-center text-sm text-foreground/60">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8">
                        © {new Date().getFullYear()} Breeko Made for Morocco • Terms • Privacy
                    </div>
                </footer>
            </div>
        </>
    )
}
