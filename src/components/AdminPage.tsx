import React, { useState } from 'react';
import { Star, Check, Trash2, LogOut, Lock, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Testimonial } from '../types';

interface AdminPageProps {
  testimonials: Testimonial[];
  onAddReview: (comment: string, author: string, rating: number, image?: string) => void;
  onDeleteReview: (id: string) => void;
  onBackToHome: () => void;
}

export default function AdminPage({ testimonials, onAddReview, onDeleteReview, onBackToHome }: AdminPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Form states
  const [author, setAuthor] = useState('');

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [imageUrl, setImageUrl] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'admin') {
      setIsLoggedIn(true);
      setPasscode('');
      setLoginError('');
    } else {
      setLoginError('Invalid passcode. Access Denied.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;
    if (!imageUrl.trim()) {
      alert('You must provide a valid Image URL.');
      return;
    }

    onAddReview(comment, author, rating, imageUrl);
    setSuccessMsg('Review added successfully!');
    
    // Reset form
    setAuthor('');

    setComment('');
    setRating(5);
    setImageUrl('');

    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background-warm pt-32 pb-24 px-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-primary/10 p-8 max-w-sm w-full text-left relative"
        >
          <button
            onClick={onBackToHome}
            className="absolute -top-12 left-0 flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest text-primary/60 hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Website
          </button>

          <div className="flex items-center gap-2 text-primary/40 mb-2">
            <Lock className="w-4 h-4" />
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.25em]">Portal Security</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-primary mb-4 tracking-tight">Admin Portal</h1>
          <p className="font-sans text-xs text-primary/60 mb-6 leading-relaxed">
            Please verify your admin credentials to access reviews management.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary/50 mb-1.5">
                Passcode (hint: "admin")
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full bg-background-warm rounded-xl px-4 py-2.5 text-xs text-primary outline-none focus:border-primary/50 border border-primary/10"
              />
              {loginError && (
                <p className="text-red-600 text-[10px] font-sans mt-1.5">{loginError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/95 transition-all border border-primary cursor-pointer"
            >
              Verify Passcode
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-warm pt-32 pb-24 px-6 md:px-12 xl:px-20 max-w-7xl mx-auto">
      {/* Admin Panel Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-primary/10 pb-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-secondary uppercase">
              Authenticated Session
            </span>
            <div className="h-[1px] w-12 bg-primary/20"></div>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-primary tracking-tight">
            Reviews Control Desk
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBackToHome}
            className="border border-primary/20 bg-white px-5 py-3 rounded-xl font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-primary hover:bg-primary/5 transition-colors cursor-pointer"
          >
            Exit Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-primary text-white px-5 py-3 rounded-xl font-sans text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-primary/95 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Review Submission Form (Required Image) */}
        <div className="lg:col-span-5 bg-white border border-primary/10 p-8 rounded-xl">
          <span className="font-sans text-[9px] font-bold text-primary/50 uppercase tracking-[0.3em]">Form 03 / SYSTEM INTAKE</span>
          <h3 className="font-serif text-xl font-bold text-primary mt-2 mb-2 tracking-tight">Add Verified Review</h3>
          <p className="font-sans text-xs text-primary/70 mb-6 leading-relaxed">
            Enter guest testimonials here. Submitting a high-quality review image is strictly required for database verification.
          </p>

          <form onSubmit={handleSubmitReview} className="space-y-4 text-left">
            <div>
              <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50 mb-2">
                Star Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-1 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        s <= rating ? 'text-secondary fill-secondary' : 'text-primary/15'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary/50 mb-1">
                Author Name
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Jane S."
                className="w-full bg-background-warm rounded-xl px-4 py-2.5 text-xs text-primary outline-none focus:border-primary/50 border border-primary/10"
              />
            </div>

            <div>
              <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary/50 mb-1">
                Review Image URL (Required)
              </label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="e.g. https://images.unsplash.com/photo-..."
                className="w-full bg-background-warm rounded-xl px-4 py-2.5 text-xs text-primary outline-none focus:border-primary/50 border border-primary/10"
              />
            </div>

            <div>
              <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary/50 mb-1">
                Thoughts & Feedback
              </label>
              <textarea
                required
                value={comment}
                rows={3}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Discuss the flavor profile, crispness of Manchurian, or transit care..."
                className="w-full bg-background-warm rounded-xl px-4 py-2.5 text-xs text-primary outline-none focus:border-primary/50 border border-primary/10 resize-none"
              />
            </div>

            {successMsg && (
              <div className="bg-green-50 border border-green-200 text-green-800 p-3 text-xs flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3.5 rounded-xl font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/95 transition-all border border-primary cursor-pointer"
            >
              Post Verified Review
            </button>
          </form>
        </div>

        {/* Right Side: Active Reviews Control List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-primary/5 pb-2">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/50">
              Database Catalog ({testimonials.length} reviews)
            </span>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin pr-2">
            <AnimatePresence>
              {testimonials.map((testi) => (
                <motion.div
                  key={testi.id}
                  layout
                  exit={{ opacity: 0, x: -15 }}
                  className="bg-white border border-primary/10 p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 text-left">
                    {testi.image ? (
                      <div className="w-14 h-14 bg-background-warm border border-primary/5 overflow-hidden flex-shrink-0">
                        <img src={testi.image} alt={testi.author} className="w-full h-full object-cover rounded-xl" />
                      </div>
                    ) : (
                      <div className="w-14 h-14 bg-background-warm border border-primary/5 flex items-center justify-center text-primary/45 flex-shrink-0">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-serif text-sm font-bold text-primary leading-snug">{testi.author}</h4>

                      <p className="font-sans text-xs text-primary/70 line-clamp-1 max-w-md">"{testi.comment}"</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteReview(testi.id)}
                    className="p-2.5 text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-colors cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
