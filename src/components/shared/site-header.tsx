"use client";

import {
  BookOpen,
  Briefcase,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  PenLine,
  Shield,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#services", label: "Services", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/#about", label: "About", icon: Info },
  { href: "/#contact", label: "Contact", icon: MessageCircle },
];

export default function SiteHeader() {
  const { signOut, useSession } = authClient;
  const { data: session, isPending } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on click outside
  useEffect(() => {
    if (!mobileOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 pt-4 pointer-events-none">
      <nav
        ref={mobileMenuRef}
        className={`pointer-events-auto w-full max-w-5xl transition-all duration-500 rounded-2xl animate-nav-enter ${scrolled || mobileOpen
          ? "bg-background/60 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/5"
          : "bg-background/30 backdrop-blur-md border border-transparent"
          }`}
      >
        {/* Main bar */}
        <div className="flex h-14 items-center justify-between px-5">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-lg transition-transform group-hover:scale-105">
              F
            </div>
            <span className="font-heading font-semibold text-xl tracking-tight">
              Feben
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="hidden md:flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
              </div>
            ) : !session ? (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="rounded-full px-5">
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/dashboard/write">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <PenLine className="h-4 w-4" />
                    Write
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full"
                    >
                      <Avatar className="h-9 w-9 border-2 border-primary/20">
                        <AvatarImage
                          src={session.user.image || ""}
                          alt={session.user.name || ""}
                        />
                        <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                          {session.user.name?.charAt(0)?.toUpperCase() ||
                            session.user.email?.charAt(0)?.toUpperCase() ||
                            "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user.name || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user.email
                            ? session.user.email.replace(/^[^@]+/, "***")
                            : ""}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/write" className="cursor-pointer">
                        <PenLine className="mr-2 h-4 w-4" />
                        Write Post
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Mobile hamburger / close */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`absolute transition-all duration-300 ${mobileOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
                  }`}
              >
                <X className="h-5 w-5" />
              </span>
              <span
                className={`absolute transition-all duration-300 ${mobileOpen ? "-rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
              >
                <Menu className="h-5 w-5" />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu panel — slides open inside the navbar card */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="px-5 pb-5 pt-1">
            <div className="h-px bg-border/60 mb-4" />

            {/* Nav links */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 text-[15px] font-medium"
                  style={{
                    transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms",
                    transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
                    opacity: mobileOpen ? 1 : 0,
                  }}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="h-px bg-border/60 my-3" />

            {/* Auth section */}
            {isPending ? (
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                <div className="h-4 w-24 rounded bg-muted animate-pulse" />
              </div>
            ) : !session ? (
              <div className="flex flex-col gap-2">
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full rounded-xl">Get Started</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {/* User info */}
                <div className="flex items-center gap-3 px-3 py-2 mb-1">
                  <Avatar className="h-8 w-8 border-2 border-primary/20">
                    <AvatarImage
                      src={session.user.image || ""}
                      alt={session.user.name || ""}
                    />
                    <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                      {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{session.user.name || "User"}</span>
                    <span className="text-xs text-muted-foreground">
                      {session.user.email ? session.user.email.replace(/^[^@]+/, "***") : ""}
                    </span>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-[15px] font-medium"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/write"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-[15px] font-medium"
                >
                  <PenLine className="h-4 w-4" />
                  Write Post
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-[15px] font-medium"
                  >
                    <Shield className="h-4 w-4" />
                    Admin Panel
                  </Link>
                )}

                <div className="h-px bg-border/60 my-2" />

                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-destructive hover:bg-destructive/10 transition-colors text-[15px] font-medium w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Backdrop overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 pointer-events-auto animate-fade-in md:hidden"
          onClick={() => setMobileOpen(false)}
          onKeyDown={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
}
