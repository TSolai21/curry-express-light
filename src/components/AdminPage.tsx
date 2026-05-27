import React, { useState, useEffect } from 'react';
import { Star, Check, Trash2, LogOut, Lock, ArrowLeft, Image as ImageIcon, Tag, Mail, AlertCircle, Edit2, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { Testimonial, SpecialOffer } from '../types';
import Cropper from 'react-easy-crop';

interface AdminPageProps {
  onBackToHome: () => void;
}

export default function AdminPage({ onBackToHome }: AdminPageProps) {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'reviews' | 'offers'>('reviews');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data states
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const paginatedReviews = reviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const paginatedOffers = offers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil((activeTab === 'reviews' ? reviews.length : offers.length) / itemsPerPage);

  // Form states - Review
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewImageUrl, setReviewImageUrl] = useState('');

  // Form states - Offer
  const [offerTitle, setOfferTitle] = useState('');
  const [offerDescription, setOfferDescription] = useState('');
  const [offerPriceText, setOfferPriceText] = useState('');
  const [offerTag, setOfferTag] = useState('');
  const [offerImageUrl, setOfferImageUrl] = useState('');

  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchData();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchData();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async () => {
    setIsLoadingData(true);
    try {
      const [reviewsRes, offersRes] = await Promise.all([
        supabase.from('reviews').select('*').order('created_at', { ascending: false }),
        supabase.from('offers').select('*').order('created_at', { ascending: false })
      ]);
      if (reviewsRes.data) setReviews(reviewsRes.data);
      if (offersRes.data) setOffers(offersRes.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsSubmitting(false);
    if (error) {
      setLoginError(error.message);
    } else {
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const [isUploading, setIsUploading] = useState(false);
  const [imageSettings, setImageSettings] = useState<{ x: number; y: number; zoom: number }>({ x: 0, y: 0, zoom: 1 });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setUrl: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    setUrl(data.publicUrl);
    setImageSettings({ x: 0, y: 0, zoom: 1 });
    setIsUploading(false);
    showSuccess('Image uploaded successfully!');
  };

  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    if (editingReviewId) {
      setConfirmDialog({
        isOpen: true,
        title: 'Confirm Update',
        message: 'Are you sure you want to update this review with the new details?',
        onConfirm: () => {
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
          processSubmitReview();
        }
      });
    } else {
      processSubmitReview();
    }
  };

  const processSubmitReview = async () => {
    setIsSubmitting(true);
    let data, error;

    if (editingReviewId) {
      const res = await supabase.from('reviews').update({ author, comment, rating, image: reviewImageUrl || null, image_settings: imageSettings }).eq('id', editingReviewId).select();
      data = res.data; error = res.error;
    } else {
      const res = await supabase.from('reviews').insert([{ author, comment, rating, image: reviewImageUrl || null, image_settings: imageSettings }]).select();
      data = res.data; error = res.error;
    }

    setIsSubmitting(false);

    if (error) {
      alert(`Error ${editingReviewId ? 'updating' : 'adding'} review: ` + error.message);
      return;
    }

    if (data && data[0]) {
      if (editingReviewId) {
        setReviews(reviews.map(r => r.id === editingReviewId ? data[0] : r));
      } else {
        setReviews([data[0], ...reviews]);
      }
    }
    showSuccess(`Review ${editingReviewId ? 'updated' : 'added'} successfully!`);
    handleCancelReviewEdit();
  };

  const handleCancelReviewEdit = () => {
    setEditingReviewId(null);
    setAuthor('');
    setComment('');
    setRating(5);
    setReviewImageUrl('');
    setIsModalOpen(false);
  };

  const handleSubmitOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerTitle || !offerDescription || !offerPriceText || !offerTag || !offerImageUrl) return;

    if (editingOfferId) {
      setConfirmDialog({
        isOpen: true,
        title: 'Confirm Update',
        message: 'Are you sure you want to update this offer with the new details?',
        onConfirm: () => {
          setConfirmDialog(prev => ({ ...prev, isOpen: false }));
          processSubmitOffer();
        }
      });
    } else {
      processSubmitOffer();
    }
  };

  const processSubmitOffer = async () => {
    setIsSubmitting(true);
    let data, error;

    const payload = {
      title: offerTitle,
      description: offerDescription,
      price_text: offerPriceText,
      tag: offerTag,
      image: offerImageUrl,
      image_settings: imageSettings
    };

    if (editingOfferId) {
      const res = await supabase.from('offers').update(payload).eq('id', editingOfferId).select();
      data = res.data; error = res.error;
    } else {
      const res = await supabase.from('offers').insert([payload]).select();
      data = res.data; error = res.error;
    }

    setIsSubmitting(false);

    if (error) {
      alert(`Error ${editingOfferId ? 'updating' : 'adding'} offer: ` + error.message);
      return;
    }

    if (data && data[0]) {
      if (editingOfferId) {
        setOffers(offers.map(o => o.id === editingOfferId ? data[0] : o));
      } else {
        setOffers([data[0], ...offers]);
      }
    }
    showSuccess(`Offer ${editingOfferId ? 'updated' : 'added'} successfully!`);
    handleCancelOfferEdit();
  };

  const handleCancelOfferEdit = () => {
    setEditingOfferId(null);
    setOfferTitle('');
    setOfferDescription('');
    setOfferPriceText('');
    setOfferTag('');
    setOfferImageUrl('');
    setIsModalOpen(false);
  };

  const handleOpenAdd = () => {
    if (activeTab === 'reviews') {
      setEditingReviewId(null);
      setAuthor('');
      setComment('');
      setRating(5);
      setReviewImageUrl('');
    } else {
      setEditingOfferId(null);
      setOfferTitle('');
      setOfferDescription('');
      setOfferPriceText('');
      setOfferTag('');
      setOfferImageUrl('');
    }
    setImageSettings({ x: 0, y: 0, zoom: 1 });
    setIsModalOpen(true);
  };

  const handleEditReview = (testi: Testimonial) => {
    setEditingReviewId(testi.id);
    setAuthor(testi.author);
    setComment(testi.comment);
    setRating(testi.rating);
    setReviewImageUrl(testi.image || '');
    let settings = { x: 0, y: 0, zoom: 1 };
    if (testi.image_settings) {
      try {
        const parsed = typeof testi.image_settings === 'string' ? JSON.parse(testi.image_settings) : testi.image_settings;
        settings = { ...settings, ...parsed };
      } catch (e) {}
    }
    setImageSettings(settings);
    setActiveTab('reviews');
    setIsModalOpen(true);
  };

  const handleEditOffer = (offer: SpecialOffer) => {
    setEditingOfferId(offer.id);
    setOfferTitle(offer.title);
    setOfferDescription(offer.description);
    setOfferPriceText(offer.price_text);
    setOfferTag(offer.tag);
    setOfferImageUrl(offer.image);
    let settings = { x: 0, y: 0, zoom: 1 };
    if (offer.image_settings) {
      try {
        const parsed = typeof offer.image_settings === 'string' ? JSON.parse(offer.image_settings) : offer.image_settings;
        settings = { ...settings, ...parsed };
      } catch (e) {}
    }
    setImageSettings(settings);
    setActiveTab('offers');
    setIsModalOpen(true);
  };

  const handleDeleteReview = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Review',
      message: 'Are you sure you want to delete this review? This action cannot be undone.',
      onConfirm: async () => {
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        const { error } = await supabase.from('reviews').delete().eq('id', id);
        if (!error) {
          setReviews(reviews.filter(r => r.id !== id));
          showSuccess('Review deleted successfully!');
        } else {
          alert('Error deleting review: ' + error.message);
        }
      }
    });
  };

  const handleDeleteOffer = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Offer',
      message: 'Are you sure you want to delete this offer? This action cannot be undone.',
      onConfirm: async () => {
        setConfirmDialog(prev => ({ ...prev, isOpen: false }));
        const { error } = await supabase.from('offers').delete().eq('id', id);
        if (!error) {
          setOffers(offers.filter(o => o.id !== id));
          showSuccess('Offer deleted successfully!');
        } else {
          alert('Error deleting offer: ' + error.message);
        }
      }
    });
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-background-warm pt-32 pb-24 px-6 flex flex-col items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-primary/10 p-8 max-w-sm w-full text-left relative z-10 shadow-xl"
        >


          <div className="flex items-center gap-2 text-primary/40 mb-2">
            <Lock className="w-4 h-4" />
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.25em]">Portal Security</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-primary mb-4 tracking-tight">Admin Portal</h1>
          <p className="font-sans text-xs text-primary/60 mb-6 leading-relaxed">
            Please authenticate using your admin email and password.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary/50 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@curryexpress.com"
                  className="w-full bg-background-warm rounded-xl pl-9 pr-4 py-2.5 text-xs text-primary outline-none focus:border-primary/50 border border-primary/10"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary/50 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background-warm rounded-xl pl-9 pr-4 py-2.5 text-xs text-primary outline-none focus:border-primary/50 border border-primary/10"
                />
              </div>
              {loginError && (
                <div className="flex items-start gap-1.5 mt-2 text-red-600">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <p className="text-[10px] font-sans leading-tight">{loginError}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-3 rounded-xl font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/95 transition-all border border-primary cursor-pointer disabled:opacity-70 mt-2"
            >
              {isSubmitting ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-warm pt-32 pb-24 px-6 md:px-12 xl:px-20 max-w-7xl mx-auto">
      {/* Admin Panel Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 border-b border-primary/10 pb-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-sans text-[10px] tracking-[0.3em] font-bold text-secondary uppercase">
              Authenticated Session
            </span>
            <div className="h-[1px] w-12 bg-primary/20"></div>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-primary tracking-tight">
            Control Desk
          </h1>
        </div>

        <div className="flex flex-row gap-2 sm:gap-3 w-full md:w-auto">
          <button
            onClick={handleLogout}
            className="flex-1 sm:flex-none justify-center bg-primary text-white px-3 sm:px-5 py-3 rounded-xl font-sans text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.15em] sm:tracking-[0.2em] hover:bg-primary/95 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out
          </button>
        </div>
      </div>

      {/* Tabs and Actions */}
      <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 mb-8">
        <div className="flex flex-row gap-2 sm:gap-4 flex-1 sm:flex-none">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 sm:flex-none px-2 sm:px-6 py-3 rounded-xl font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-colors cursor-pointer text-center ${activeTab === 'reviews' ? 'bg-primary text-white' : 'bg-white text-primary border border-primary/10 hover:border-primary/30'
              }`}
          >
            <span className="hidden sm:inline">Manage </span>Reviews
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`flex-1 sm:flex-none px-2 sm:px-6 py-3 rounded-xl font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-colors cursor-pointer text-center ${activeTab === 'offers' ? 'bg-primary text-white' : 'bg-white text-primary border border-primary/10 hover:border-primary/30'
              }`}
          >
            <span className="hidden sm:inline">Manage </span>Offers
          </button>
        </div>
        
        <button
          onClick={handleOpenAdd}
          className="flex-shrink-0 bg-primary text-white w-11 h-11 sm:w-auto sm:h-auto sm:px-6 sm:py-3 rounded-xl font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/95 transition-all shadow-md cursor-pointer border border-primary flex items-center justify-center"
          title={activeTab === 'reviews' ? 'Add Review' : 'Add Offer'}
        >
          <span className="hidden sm:inline">{activeTab === 'reviews' ? '+ Add Review' : '+ Add Offer'}</span>
          <Plus className="w-5 h-5 sm:hidden" />
        </button>
      </div>

      {successMsg && (
        <div className="mb-8 bg-green-50 border border-green-200 text-green-800 p-3 text-xs flex items-center gap-1.5 rounded-xl">
          <Check className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Data Display */}
      <div className="bg-white rounded-xl border border-primary/10 overflow-hidden shadow-sm">
        
        {/* Mobile Cards (Hidden on md+) */}
        <div className="md:hidden p-4 space-y-4 bg-background-warm/30">
          {isLoadingData ? (
            <p className="p-4 text-center text-primary/50 text-xs italic">Loading data...</p>
          ) : activeTab === 'reviews' ? (
            paginatedReviews.length === 0 ? (
              <p className="p-4 text-center text-primary/50 text-xs">No reviews found in the database.</p>
            ) : (
              paginatedReviews.map((testi) => (
                <div key={testi.id} className="bg-white border border-primary/10 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {testi.image ? (
                        <img src={testi.image} alt={testi.author} className="w-10 h-10 rounded-lg object-cover border border-primary/10" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-background-warm flex items-center justify-center text-primary/30 border border-primary/10">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <h4 className="font-serif text-sm font-bold text-primary">{testi.author}</h4>
                        <div className="flex gap-0.5 mt-0.5">
                          {Array(testi.rating).fill(0).map((_, i) => <Star key={i} className="w-2.5 h-2.5 text-secondary fill-secondary" />)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 border border-primary/10 rounded-lg p-0.5 bg-background-warm/50 flex-shrink-0">
                      <button onClick={() => handleEditReview(testi)} className="p-2 text-primary hover:bg-white rounded-md transition-colors" title="Edit">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteReview(testi.id)} className="p-2 text-red-500 hover:bg-white rounded-md transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-primary/70 italic line-clamp-2">"{testi.comment}"</p>
                </div>
              ))
            )
          ) : (
            paginatedOffers.length === 0 ? (
              <p className="p-4 text-center text-primary/50 text-xs">No offers found in the database.</p>
            ) : (
              paginatedOffers.map((offer) => (
                <div key={offer.id} className="bg-white border border-primary/10 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      {offer.image ? (
                        <img src={offer.image} alt={offer.title} className="w-12 h-12 rounded-lg object-cover border border-primary/10" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-background-warm flex items-center justify-center text-primary/30 border border-primary/10">
                          <Tag className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-serif text-sm font-bold text-primary leading-tight">{offer.title}</h4>
                        </div>
                        <span className="bg-background-warm px-1.5 py-0.5 text-[8px] uppercase tracking-wider border border-primary/10 text-primary/70 rounded">
                          {offer.tag}
                        </span>
                        <div className="text-[10px] text-primary/80 font-bold uppercase tracking-wider mt-1.5">{offer.price_text}</div>
                      </div>
                    </div>
                    <div className="flex gap-1 border border-primary/10 rounded-lg p-0.5 bg-background-warm/50 flex-shrink-0">
                      <button onClick={() => handleEditOffer(offer)} className="p-2 text-primary hover:bg-white rounded-md transition-colors" title="Edit">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteOffer(offer.id)} className="p-2 text-red-500 hover:bg-white rounded-md transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-primary/70 line-clamp-2">{offer.description}</p>
                </div>
              ))
            )
          )}
        </div>

        {/* Desktop Table (Hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background-warm border-b border-primary/10 text-primary/50 font-sans text-[10px] uppercase tracking-widest font-bold">
                <th className="p-4 pl-6 w-24">Image</th>
                <th className="p-4">{activeTab === 'reviews' ? 'Author' : 'Title'}</th>
                <th className="p-4">{activeTab === 'reviews' ? 'Rating' : 'Tag'}</th>
                <th className="p-4 w-1/3">{activeTab === 'reviews' ? 'Feedback' : 'Description'}</th>
                <th className="p-4 pr-6 text-right w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoadingData ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-primary/50 text-xs italic">Loading data...</td>
                </tr>
              ) : activeTab === 'reviews' ? (
                paginatedReviews.length === 0 ? (
                  <tr><td colSpan={5} className="p-12 text-center text-primary/50 text-xs">No reviews found in the database.</td></tr>
                ) : (
                  paginatedReviews.map((testi) => {
                    if (!testi) return null;
                    return (
                      <tr key={testi.id} className="border-b border-primary/5 hover:bg-background-warm/30 transition-colors">
                        <td className="p-4 pl-6">
                          {testi.image ? (
                            <img src={testi.image} alt={testi.author} className="w-12 h-12 rounded-lg object-cover border border-primary/10" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-background-warm flex items-center justify-center text-primary/30 border border-primary/10">
                              <ImageIcon className="w-4 h-4" />
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="font-serif text-sm font-bold text-primary">{testi.author}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-0.5">
                            {Array(testi.rating).fill(0).map((_, i) => <Star key={i} className="w-3 h-3 text-secondary fill-secondary" />)}
                          </div>
                        </td>
                        <td className="p-4 text-xs text-primary/70 truncate max-w-xs" title={testi.comment}>
                          "{testi.comment}"
                        </td>
                        <td className="p-4 pr-6">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleEditReview(testi)} className="p-2 bg-primary/5 text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteReview(testi.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )
              ) : (
                paginatedOffers.length === 0 ? (
                  <tr><td colSpan={5} className="p-12 text-center text-primary/50 text-xs">No offers found in the database.</td></tr>
                ) : (
                  paginatedOffers.map((offer) => {
                    if (!offer) return null;
                    return (
                      <tr key={offer.id} className="border-b border-primary/5 hover:bg-background-warm/30 transition-colors">
                        <td className="p-4 pl-6">
                          {offer.image ? (
                            <img src={offer.image} alt={offer.title} className="w-12 h-12 rounded-lg object-cover border border-primary/10" />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-background-warm flex items-center justify-center text-primary/30 border border-primary/10">
                              <Tag className="w-4 h-4" />
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="font-serif text-sm font-bold text-primary">{offer.title}</div>
                          <div className="text-[10px] text-primary/60 font-bold uppercase tracking-wider">{offer.price_text}</div>
                        </td>
                        <td className="p-4">
                          <span className="bg-background-warm px-2 py-1 text-[9px] uppercase tracking-wider border border-primary/10 text-primary/70 rounded-md">
                            {offer.tag}
                          </span>
                        </td>
                        <td className="p-4 text-xs text-primary/70 truncate max-w-xs" title={offer.description}>
                          {offer.description}
                        </td>
                        <td className="p-4 pr-6">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleEditOffer(offer)} className="p-2 bg-primary/5 text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteOffer(offer.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center p-4 md:p-6 border-t border-primary/10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-4 py-2 text-xs font-bold text-primary border border-primary/10 rounded-lg hover:bg-background-warm disabled:opacity-30 transition-colors cursor-pointer"
            >
              Previous
            </button>
            <span className="text-xs text-primary/70 font-sans tracking-wider uppercase font-bold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-4 py-2 text-xs font-bold text-primary border border-primary/10 rounded-lg hover:bg-background-warm disabled:opacity-30 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden border border-primary/10 my-4 lg:my-8 max-h-[95vh] lg:max-h-[90vh] relative"
            >
              {/* Global Close Button */}
              <button 
                onClick={() => activeTab === 'reviews' ? handleCancelReviewEdit() : handleCancelOfferEdit()}
                className="absolute top-4 right-4 z-50 p-2 bg-white/50 hover:bg-white text-primary/40 hover:text-primary rounded-full transition-colors cursor-pointer backdrop-blur-sm border border-primary/5 hover:border-primary/20 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Form Side */}
              <div className="w-full lg:w-1/2 p-6 md:p-8 lg:overflow-y-auto bg-white flex-shrink-0">
                <div className="mb-6 pr-8">
                  <span className="font-sans text-[9px] font-bold text-primary/50 uppercase tracking-[0.3em]">
                    Form 03 / SYSTEM INTAKE
                  </span>
                  <h3 className="font-serif text-xl font-bold text-primary mt-1 tracking-tight">
                    {activeTab === 'reviews'
                      ? (editingReviewId ? 'Edit Review' : 'Add Verified Review')
                      : (editingOfferId ? 'Edit Special Offer' : 'Add Special Offer')
                    }
                  </h3>
                </div>

                {activeTab === 'reviews' ? (
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
                              className={`w-5 h-5 ${s <= rating ? 'text-secondary fill-secondary' : 'text-primary/15'
                                }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
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
                        Review Image (Optional)
                      </label>
                      <div className="flex flex-col gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, setReviewImageUrl)}
                          disabled={isUploading}
                          className="w-full text-xs text-primary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-[0.1em] file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                        />
                        {reviewImageUrl && (
                          <div className="text-[10px] text-primary/70 italic flex items-center gap-1 mt-1">
                            <Check className="w-3 h-3 text-green-500" /> Image uploaded
                          </div>
                        )}
                      </div>
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
                        placeholder="Discuss the flavor profile..."
                        className="w-full bg-background-warm rounded-xl px-4 py-2.5 text-xs text-primary outline-none focus:border-primary/50 border border-primary/10 resize-none"
                      />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-primary text-white py-3.5 rounded-xl font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/95 transition-all border border-primary cursor-pointer disabled:opacity-70"
                      >
                        {isSubmitting ? (editingReviewId ? 'Updating...' : 'Posting...') : (editingReviewId ? 'Update Review' : 'Post Verified Review')}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelReviewEdit}
                        disabled={isSubmitting}
                        className="px-6 bg-white text-primary py-3.5 rounded-xl font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/5 transition-all border border-primary/20 cursor-pointer disabled:opacity-70"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSubmitOffer} className="space-y-4 text-left">
                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary/50 mb-1">
                        Offer Title
                      </label>
                      <input
                        type="text"
                        required
                        value={offerTitle}
                        onChange={(e) => setOfferTitle(e.target.value)}
                        placeholder="e.g. Family Feast Combo"
                        className="w-full bg-background-warm rounded-xl px-4 py-2.5 text-xs text-primary outline-none focus:border-primary/50 border border-primary/10"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary/50 mb-1">
                        Description
                      </label>
                      <textarea
                        required
                        value={offerDescription}
                        rows={2}
                        onChange={(e) => setOfferDescription(e.target.value)}
                        placeholder="Feeds 4-6 guests. Includes..."
                        className="w-full bg-background-warm rounded-xl px-4 py-2.5 text-xs text-primary outline-none focus:border-primary/50 border border-primary/10 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary/50 mb-1">
                          Price Text
                        </label>
                        <input
                          type="text"
                          required
                          value={offerPriceText}
                          onChange={(e) => setOfferPriceText(e.target.value)}
                          placeholder="e.g. Starting at $54.99"
                          className="w-full bg-background-warm rounded-xl px-4 py-2.5 text-xs text-primary outline-none focus:border-primary/50 border border-primary/10"
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary/50 mb-1">
                          Badge / Tag
                        </label>
                        <input
                          type="text"
                          required
                          value={offerTag}
                          onChange={(e) => setOfferTag(e.target.value)}
                          placeholder="e.g. Family Value"
                          className="w-full bg-background-warm rounded-xl px-4 py-2.5 text-xs text-primary outline-none focus:border-primary/50 border border-primary/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary/50 mb-1">
                        Image (Upload - Required)
                      </label>
                      <div className="flex flex-col gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, setOfferImageUrl)}
                          disabled={isUploading}
                          className="w-full text-xs text-primary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-[0.1em] file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                        />
                        {offerImageUrl && (
                          <div className="text-[10px] text-primary/70 italic flex items-center gap-1 mt-1">
                            <Check className="w-3 h-3 text-green-500" /> Image uploaded
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-primary text-white py-3.5 rounded-xl font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/95 transition-all border border-primary cursor-pointer disabled:opacity-70"
                      >
                        {isSubmitting ? (editingOfferId ? 'Updating...' : 'Posting...') : (editingOfferId ? 'Update Offer' : 'Post Special Offer')}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelOfferEdit}
                        disabled={isSubmitting}
                        className="px-6 bg-white text-primary py-3.5 rounded-xl font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/5 transition-all border border-primary/20 cursor-pointer disabled:opacity-70"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Preview Side */}
              <div className="w-full lg:w-1/2 bg-background-warm p-6 md:p-8 flex flex-col justify-center items-center border-t lg:border-t-0 lg:border-l border-primary/10 bg-dotted lg:overflow-y-auto flex-shrink-0">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/50 mb-6 block">
                  Live Preview
                </span>
                
                {activeTab === 'reviews' ? (
                  <div className="w-full max-w-[380px] p-8 bg-white rounded-xl space-y-5 border border-primary/10 flex flex-col justify-between text-left shadow-lg scale-90 md:scale-100 origin-center">
                    <div className="space-y-4">
                      {reviewImageUrl && (
                        <div className="h-44 w-full overflow-hidden border border-primary/5 bg-background-warm mb-4 rounded-xl relative">
                          <Cropper
                            image={reviewImageUrl}
                            crop={{ x: imageSettings?.x || 0, y: imageSettings?.y || 0 }}
                            zoom={imageSettings?.zoom || 1}
                            aspect={1}
                            onCropChange={(crop) => setImageSettings(s => ({ ...s, x: crop.x, y: crop.y }))}
                            onZoomChange={(zoom) => setImageSettings(s => ({ ...s, zoom }))}
                            showGrid={false}
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        {Array(rating).fill(0).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-secondary fill-secondary" />
                        ))}
                        {Array(5 - rating).fill(0).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-primary/15" />
                        ))}
                      </div>
                      <p className="font-serif text-sm sm:text-base text-primary/80 italic leading-relaxed">
                        "{comment || 'Discuss the flavor profile...'}"
                      </p>
                    </div>
                    <div className="font-sans text-[10px] font-bold tracking-widest text-primary/60 pt-4 border-t border-primary/10 uppercase">
                      — {author || 'Guest Name'}
                    </div>
                  </div>
                ) : (
                  <div className="w-full bg-white rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-primary/10 shadow-lg scale-90 md:scale-100 origin-center">
                    <div className="w-full md:w-3/5 space-y-4 text-left">
                      {offerTag && (
                        <div className="inline-block bg-white border border-primary/20 text-primary px-3 py-1 rounded-xl font-sans text-[8px] font-bold uppercase tracking-[0.2em]">
                          {offerTag}
                        </div>
                      )}
                      <h4 className="font-serif text-3xl font-bold text-primary tracking-tight">
                        {offerTitle || 'Offer Title'}
                      </h4>
                      <p className="text-primary/70 text-sm leading-relaxed">
                        {offerDescription || 'Describe the delicious details of this offer...'}
                      </p>
                      <div className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-primary pt-2">
                        {offerPriceText || 'Price Details'}
                      </div>
                      <button className="border border-primary/25 text-primary px-5 py-2.5 rounded-xl font-sans text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-primary/5 transition-colors cursor-pointer mt-2" disabled>
                        Order on DoorDash
                      </button>
                    </div>
                    {offerImageUrl && (
                      <div className="w-full md:w-2/5 aspect-[4/3] rounded-xl overflow-hidden border border-primary/5 bg-background-warm relative">
                          <Cropper
                            image={offerImageUrl}
                            crop={{ x: imageSettings?.x || 0, y: imageSettings?.y || 0 }}
                            zoom={imageSettings?.zoom || 1}
                            aspect={4 / 3}
                            onCropChange={(crop) => setImageSettings(s => ({ ...s, x: crop.x, y: crop.y }))}
                            onZoomChange={(zoom) => setImageSettings(s => ({ ...s, zoom }))}
                            showGrid={false}
                          />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmDialog.isOpen && (
          <div className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center border border-primary/10 relative"
            >
              <AlertCircle className="w-12 h-12 text-primary/50 mx-auto mb-4" />
              <h3 className="font-serif text-xl font-bold text-primary mb-2">
                {confirmDialog.title}
              </h3>
              <p className="text-sm text-primary/70 mb-8 leading-relaxed">
                {confirmDialog.message}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                  className="flex-1 px-4 py-3 bg-white border border-primary/20 text-primary font-sans text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-background-warm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDialog.onConfirm}
                  className={`flex-1 px-4 py-3 text-white font-sans text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-colors shadow-md cursor-pointer ${
                    confirmDialog.title.includes('Delete') ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/95'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
