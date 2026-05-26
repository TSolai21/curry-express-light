import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, Truck, MapPin, Sparkles, AlertCircle, RefreshCw, Star, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedPromo,
  onApplyPromo
}: CartDrawerProps) {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [orderStep, setOrderStep] = useState<'cart' | 'validating' | 'kitchen' | 'dispatch' | 'enjoy'>('cart');
  const [driverName, setDriverName] = useState('Rahul S.');

  // Math metrics
  const subtotal = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const taxRate = 0.085; // 8.5%
  const deliveryFee = deliveryType === 'delivery' ? 4.99 : 0;
  
  // discount
  const discountRate = appliedPromo.toUpperCase() === 'WELCOME10' ? 0.1 : 0;
  const discountAmount = subtotal * discountRate;
  
  const total = subtotal - discountAmount + (subtotal * taxRate) + deliveryFee;

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoInput.trim().toUpperCase() === 'WELCOME10') {
      onApplyPromo('WELCOME10');
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon code. Try WELCOME10.');
    }
  };

  const handlePlaceOrderSim = () => {
    if (cartItems.length === 0) return;

    // Start cooking progress tracker!
    setOrderStep('validating');

    // 1.5s -> Kitchen
    setTimeout(() => {
      setOrderStep('kitchen');
    }, 2000);

    // 2.5s -> dispatch
    setTimeout(() => {
      setOrderStep('dispatch');
      const drivers = ['Rohan M.', 'Wei L.', 'Sarah K.', 'Sanjay P.'];
      setDriverName(drivers[Math.floor(Math.random() * drivers.length)]);
    }, 4500);

    // 2s -> enjoy!
    setTimeout(() => {
      setOrderStep('enjoy');
    }, 7000);
  };

  const resetCartSimulation = () => {
    onClearCart();
    setOrderStep('cart');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={orderStep === 'cart' ? onClose : undefined}
            className="fixed inset-0 bg-primary/60 backdrop-blur-xs"
          />

          {/* Body Box */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-md h-full bg-background-warm shadow-xl flex flex-col z-10 border-l border-primary/10"
          >
            {/* Header section */}
            <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-primary" />
                <h3 className="font-serif text-lg font-bold text-primary tracking-tight">Your Feast Basket</h3>
              </div>
              {orderStep === 'cart' && (
                <button
                  onClick={onClose}
                  className="p-2 text-primary hover:bg-primary/5 rounded-xl border border-primary/10 transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Simulated order states */}
            {orderStep !== 'cart' ? (
              <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-white space-y-6">
                
                {/* 1. Validating State */}
                {orderStep === 'validating' && (
                  <div className="space-y-4 border border-primary/10 p-6 bg-background-warm rounded-xl w-full max-w-xs">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                      className="text-primary w-12 h-12 mx-auto flex items-center justify-center"
                    >
                      <RefreshCw className="w-8 h-8" />
                    </motion.div>
                    <h4 className="font-serif text-base font-bold text-primary">Verifying Payment</h4>
                    <p className="font-sans text-xs text-primary/60 max-w-xs leading-relaxed">
                      Securing transaction and reserving ingredients with Chef Sanjay Mehta...
                    </p>
                  </div>
                )}

                {/* 2. Kitchen / Cook stage */}
                {orderStep === 'kitchen' && (
                  <div className="space-y-4 border border-primary/10 p-6 bg-background-warm rounded-xl w-full max-w-xs">
                    <div className="relative w-16 h-16 mx-auto bg-primary/5 border border-primary/10 flex items-center justify-center text-xl font-serif">
                      🍳
                    </div>
                    <h4 className="font-serif text-base font-bold text-primary">Kitchen Brewing</h4>
                    <p className="font-sans text-xs text-primary/60 max-w-xs leading-relaxed">
                      Sautéing and infusing custom spice levels over induction woks. The organic aromas have begun to bloom!
                    </p>
                  </div>
                )}

                {/* 3. Dispatch Delivery */}
                {orderStep === 'dispatch' && (
                  <div className="space-y-4 border border-[#DAC49C]/20 p-6 bg-background-warm rounded-xl w-full max-w-xs">
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="text-primary w-10 h-10 mx-auto flex items-center justify-center"
                    >
                      <Truck className="w-8 h-8 stroke-[1.5]" />
                    </motion.div>
                    <h4 className="font-serif text-base font-bold text-primary">Insulated Dispatch</h4>
                    <p className="font-sans text-xs text-primary/60 max-w-xs leading-relaxed">
                      Your meal is locked in our triple-layered thermal transit package. Courier <strong className="text-secondary">{driverName}</strong> is en route.
                    </p>
                  </div>
                )}

                {/* 4. Arrived / Feast */}
                {orderStep === 'enjoy' && (
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-6 w-full max-w-xs"
                  >
                    <div className="bg-primary text-secondary border border-[#DAC49C] w-12 h-12 rounded-xl mx-auto flex items-center justify-center text-lg">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-bold text-primary">Feast Has Arrived</h4>
                      <p className="font-sans text-xs text-primary/60 max-w-xs leading-relaxed mt-2">
                        Delivered fresh to 123 Culinary Way. Packaging vapor-partition seals may be carefully pulled back. Enjoy Curry Express!
                      </p>
                    </div>

                    <div className="p-4 bg-background-warm rounded-xl border border-primary/10 text-left space-y-2 select-none">
                      <span className="block text-[8px] uppercase font-bold tracking-[0.2em] text-primary/60">Unlocked Reward Code</span>
                      <div className="flex justify-between items-center bg-white border border-primary/15 p-2.5 rounded-xl">
                        <code className="font-mono text-sm font-semibold text-secondary">CURRYLOVE20</code>
                        <span className="text-[9px] text-primary/50 font-sans tracking-wide">Save 20% on next!</span>
                      </div>
                    </div>

                    <button
                      onClick={resetCartSimulation}
                      className="w-full bg-primary text-white py-3.5 rounded-xl font-sans text-[10px] uppercase font-bold tracking-[0.2em] border border-primary hover:bg-primary/95 cursor-pointer"
                    >
                      Awesome, Thank You!
                    </button>
                  </motion.div>
                )}

              </div>
            ) : (
              /* Regular Cart Screen rendering */
              <>
                {cartItems.length === 0 ? (
                  <div className="flex-grow flex flex-col items-center justify-center p-8 text-center text-primary/60 font-sans space-y-4">
                    <ShoppingBag className="w-10 h-10 text-primary/20" />
                    <p className="text-xs">Your feast box is currently empty.</p>
                    <button
                      onClick={onClose}
                      className="border border-primary text-primary px-5 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/5 cursor-pointer"
                    >
                      Browse Menu Dishes
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Item Deck */}
                    <div className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-thin select-none">
                      {cartItems.map((item, idx) => (
                        <div
                          key={`${item.id}-${idx}`}
                          className="bg-white rounded-xl p-3 border border-primary/10 flex gap-3 relative"
                        >
                          <img
                            alt={item.menuItem.name}
                            className="w-16 h-16 object-cover rounded-xl flex-shrink-0 bg-background-warm border border-primary/5 p-0.5"
                            src={item.menuItem.image}
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-grow text-left flex flex-col justify-between">
                            <div>
                              <h4 className="font-sans text-xs font-bold text-primary tracking-tight pr-4">
                                {item.menuItem.name}
                              </h4>
                              {item.options?.spiceLevel !== undefined && (
                                <span className="text-[9px] text-secondary font-bold inline-flex items-center gap-0.5 mt-0.5 uppercase tracking-wider">
                                  🌶 Spice: {item.options.spiceLevel === 0 ? 'None' : 'Level ' + item.options.spiceLevel}
                                </span>
                              )}
                            </div>

                            <div className="flex justify-between items-center mt-2">
                              {/* Quantity Control */}
                              <div className="flex items-center gap-2 border border-primary/15 rounded-xl bg-background-warm px-1.5 py-0.5">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, -1)}
                                  className="p-1 hover:text-secondary text-primary transition-colors cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-sans text-xs font-semibold w-4 text-center text-primary">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, 1)}
                                  className="p-1 hover:text-secondary text-primary transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-sans text-xs font-bold text-primary">
                                ${(item.menuItem.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Trash button */}
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="absolute top-2 right-2 p-1 text-primary/40 hover:text-primary transition-all rounded-xl cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Operational Summary */}
                    <div className="p-6 bg-white border-t border-primary/10 space-y-4">
                      
                      {/* Delivery/Pickup toggle */}
                      <div className="grid grid-cols-2 p-1 bg-background-warm rounded-xl border border-primary/10">
                        <button
                          onClick={() => setDeliveryType('delivery')}
                          className={`py-1.5 rounded-xl text-[8px] font-bold uppercase tracking-[0.2em] font-sans cursor-pointer transition-colors ${
                            deliveryType === 'delivery'
                              ? 'bg-primary text-white border border-primary shadow-xs'
                              : 'text-primary/60 hover:text-primary'
                          }`}
                        >
                          Delivery ($4.99)
                        </button>
                        <button
                          onClick={() => setDeliveryType('pickup')}
                          className={`py-1.5 rounded-xl text-[8px] font-bold uppercase tracking-[0.2em] font-sans cursor-pointer transition-colors ${
                            deliveryType === 'pickup'
                              ? 'bg-primary text-white border border-primary shadow-xs'
                              : 'text-primary/60 hover:text-primary'
                          }`}
                        >
                          Store Pickup
                        </button>
                      </div>

                      {/* Coupon input */}
                      <form onSubmit={handleApplyPromoCode} className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Promo code"
                          className="flex-grow bg-white border border-primary/15 rounded-xl px-3 py-2 text-xs text-primary outline-none focus:border-primary font-sans uppercase"
                        />
                        <button
                          type="submit"
                          className="bg-primary text-white px-4 py-2 rounded-xl font-sans text-[10px] uppercase font-bold tracking-wider hover:bg-primary/95 transition-all cursor-pointer whitespace-nowrap"
                        >
                          Apply
                        </button>
                      </form>
                      {promoError && <p className="text-primary text-[10px] font-bold font-sans text-left uppercase tracking-wider">{promoError}</p>}
                      {appliedPromo && (
                        <div className="flex items-center justify-between bg-secondary/10 border border-secondary/20 text-primary p-2 rounded-xl text-[10px] font-sans font-bold uppercase tracking-wider">
                          <span>✓ Promo Code Added: <strong>{appliedPromo.toUpperCase()}</strong></span>
                          <span>-10%</span>
                        </div>
                      )}

                      {/* Receipt calculations */}
                      <div className="space-y-1.5 pt-2 text-xs font-sans text-primary/60 border-t border-primary/5 text-left">
                        <div className="flex justify-between">
                          <span>Cart Subtotal</span>
                          <span className="font-semibold text-primary">${subtotal.toFixed(2)}</span>
                        </div>
                        {appliedPromo && (
                          <div className="flex justify-between text-secondary">
                            <span>Promo Discount</span>
                            <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Sales Tax (8.5%)</span>
                          <span className="font-semibold text-primary">${(subtotal * taxRate).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Delivery Fee</span>
                          <span className="font-semibold text-primary">
                            {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-primary font-bold pt-2.5 border-t border-primary/10 uppercase tracking-wider">
                          <span>Feast Total</span>
                          <span className="text-primary font-bold">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Checkout Action Button */}
                      <button
                        onClick={handlePlaceOrderSim}
                        className="w-full bg-[#DAC49C] text-primary border border-secondary py-3.5 rounded-xl font-sans text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-primary hover:text-white transition-all cursor-pointer mt-2"
                      >
                        Place Order (${total.toFixed(2)})
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
