/* eslint-disable @next/next/no-img-element */
"use client";
import {
  ArrowRight,
  Award,
  Baby,
  BadgeCheck,
  Bone,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  Heart,
  HeartPulse,
  MapPin,
  Phone,
  Star,
  Stethoscope,
  User,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

import AppNavbar from "@/components/app-navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// ── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "50K+", label: "Patients Served", icon: User },
  { value: "1,200+", label: "Verified Doctors", icon: Stethoscope },
  { value: "98%", label: "Satisfaction Rate", icon: Star },
  { value: "24/7", label: "Support Available", icon: Clock },
];

const DOCTORS = [
  {
    name: "Dr. Ananya Bose",
    specialty: "Cardiologist",
    experience: "14 yrs",
    rating: 4.9,
    reviews: 312,
    available: true,
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Dr. Rohan Mehta",
    specialty: "Neurologist",
    experience: "10 yrs",
    rating: 4.8,
    reviews: 198,
    available: true,
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Dr. Sunita Rao",
    specialty: "Pediatrician",
    experience: "12 yrs",
    rating: 4.9,
    reviews: 276,
    available: false,
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Dr. Arjun Singh",
    specialty: "Orthopedist",
    experience: "9 yrs",
    rating: 4.7,
    reviews: 143,
    available: true,
    img: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Dr. Meera Nair",
    specialty: "Ophthalmologist",
    experience: "11 yrs",
    rating: 4.8,
    reviews: 221,
    available: true,
    img: "https://randomuser.me/api/portraits/women/90.jpg",
  },
];

const SPECIALTIES = [
  {
    icon: Heart,
    name: "Cardiology",
    count: "142 Doctors",
    color: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
  },
  {
    icon: Brain,
    name: "Neurology",
    count: "87 Doctors",
    color:
      "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  },
  {
    icon: Eye,
    name: "Ophthalmology",
    count: "96 Doctors",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    icon: Bone,
    name: "Orthopedics",
    count: "115 Doctors",
    color: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  },
  {
    icon: Baby,
    name: "Pediatrics",
    count: "203 Doctors",
    color: "bg-pink-50 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
  },
  {
    icon: Stethoscope,
    name: "General Practice",
    count: "310 Doctors",
    color:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Search & Filter",
    desc: "Find doctors by specialty, location, language, or availability.",
    icon: MapPin,
  },
  {
    step: "02",
    title: "Book Instantly",
    desc: "Pick a time slot and confirm your appointment in under 60 seconds.",
    icon: Calendar,
  },
  {
    step: "03",
    title: "Get Care",
    desc: "Attend in-person or join a video consultation from home.",
    icon: CheckCircle2,
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    avatar: "PS",
    rating: 5,
    text: "Booked an appointment with a cardiologist within hours. The whole process was seamless and the doctor was excellent.",
  },
  {
    name: "Rahul Mehta",
    avatar: "RM",
    rating: 5,
    text: "MediCare+ saved me so much time. I found a pediatrician for my son and got an appointment the very next morning.",
  },
  {
    name: "Anjali Verma",
    avatar: "AV",
    rating: 5,
    text: "The video consultation feature is a game-changer. I spoke to a neurologist without leaving my home.",
  },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <AppNavbar variant="public" />

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-blue-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          {/* Text block — centered */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
              <Award className="size-3.5" />
              India&apos;s Most Trusted Healthcare Platform
            </span>
            <h2 className="mb-6 text-5xl font-black leading-tight tracking-tight lg:text-6xl">
              Your Health, <span className="text-blue-600">Our Priority</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Connect with 1,200+ verified doctors across 50+ specialties. Book
              in-person or video appointments instantly — no waiting, no hassle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 dark:shadow-blue-900"
              >
                Book Appointment <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/doctors"
                className="flex items-center gap-2 rounded-2xl border-2 border-slate-200 px-7 py-3.5 text-base font-bold transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:hover:border-blue-600"
              >
                Browse Doctors
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              {["Free to join", "Instant confirmation", "Secure & private"].map(
                (t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-emerald-500" /> {t}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Doctor Carousel */}
          <div className="relative px-10">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {DOCTORS.map((doc) => (
                  <CarouselItem
                    key={doc.name}
                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
                      {/* Avatar + availability */}
                      <div className="mb-4 flex items-center gap-3">
                        <img
                          src={doc.img}
                          alt={doc.name}
                          className="size-14 rounded-2xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-bold text-sm">
                            {doc.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {doc.specialty} · {doc.experience}
                          </p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="mb-3 flex items-center gap-1.5">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`size-3.5 ${i < Math.round(doc.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-semibold">
                          {doc.rating}
                        </span>
                        <span className="text-xs text-slate-400">
                          ({doc.reviews})
                        </span>
                      </div>

                      {/* Badges */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                          <BadgeCheck className="size-3" /> Verified
                        </span>
                        {doc.available ? (
                          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                            <span className="size-1.5 rounded-full bg-emerald-500" />{" "}
                            Available Today
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800">
                            Next: Tomorrow
                          </span>
                        )}
                      </div>

                      <Link
                        href="/doctors"
                        className="block w-full rounded-xl bg-blue-600 py-2 text-center text-sm font-bold text-white transition hover:bg-blue-700"
                      >
                        Book Now
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 rounded-2xl bg-blue-50 p-3 dark:bg-blue-950">
                  <Icon className="size-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-4xl font-black text-blue-600">
                  {value}
                </span>
                <span className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIALTIES ────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-black">Browse by Specialty</h2>
            <p className="mx-auto max-w-xl text-slate-500 dark:text-slate-400">
              From general health to complex conditions — find the right expert
              for every need.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SPECIALTIES.map(({ icon: Icon, name, count, color }) => (
              <Link
                key={name}
                href={`/doctors?specialty=${name.toLowerCase()}`}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-700"
              >
                <div className={`rounded-2xl p-3 ${color}`}>
                  <Icon className="size-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">{name}</p>
                  <p className="text-sm text-slate-400">{count}</p>
                </div>
                <ChevronRight className="size-4 text-slate-300 transition group-hover:text-blue-500 dark:text-slate-600" />
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/specialties"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              View all 50+ specialties <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
      <section className="bg-white py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-black">How It Works</h2>
            <p className="mx-auto max-w-xl text-slate-500 dark:text-slate-400">
              Getting the care you need is three easy steps away.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon }) => (
              <div
                key={step}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-5xl font-black text-blue-100 dark:text-blue-900">
                    {step}
                  </span>
                  <div className="rounded-2xl bg-blue-600 p-3 text-white">
                    <Icon className="size-5" />
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-black">{title}</h3>
                <p className="leading-relaxed text-slate-500 dark:text-slate-400">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-black">What Patients Say</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Trusted by thousands across the country.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map(({ name, avatar, rating, text }) => (
              <div
                key={name}
                className="rounded-3xl border border-slate-200 bg-white p-7 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="mb-4 flex">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
                  {text}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    {avatar}
                  </div>
                  <p className="font-bold">{name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="bg-blue-600 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-5 text-4xl font-black text-white lg:text-5xl">
            Ready to take charge of your health?
          </h2>
          <p className="mb-10 text-lg text-blue-100">
            Join 50,000+ patients who trust MediCare+ for their healthcare
            needs. It&apos;s free to get started.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-blue-600 transition hover:bg-blue-50"
            >
              <UserPlus className="size-5" /> Create Free Account
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-2xl border-2 border-white/30 px-8 py-4 text-base font-bold text-white transition hover:bg-white/10"
            >
              <Phone className="size-5" /> Talk to Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-2xl bg-blue-600 p-2.5 text-white">
                <HeartPulse className="size-5" />
              </div>
              <span className="text-lg font-black">MediCare+</span>
            </Link>
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} MediCare+. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-blue-600">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-blue-600">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
