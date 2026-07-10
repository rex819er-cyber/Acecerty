import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal, itemCount } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={closeCart}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col shadow-2xl transition-transform duration-300"
        style={{
          width: 420,
          maxWidth: '100vw',
          backgroundColor: '#fff',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b border-gray-100"
          style={{ backgroundColor: '#0B1D3A' }}
        >
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-white" />
            <span className="text-white font-semibold text-lg">
              Cart{' '}
              {itemCount > 0 && (
                <span
                  className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: '#00A2B6', color: '#fff' }}
                >
                  {itemCount}
                </span>
              )}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="h-9 w-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="relative flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <div
                className="h-20 w-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#F8FAFC' }}
              >
                <ShoppingBag className="h-9 w-9 text-gray-300" />
              </div>
              <p className="text-gray-900 font-semibold text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm">Browse courses and add them here.</p>
              <Link
                to="/courses"
                onClick={closeCart}
                className="mt-2 px-6 py-3 rounded-full font-semibold text-white text-sm"
                style={{ backgroundColor: '#00A2B6' }}
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-gray-100">
              {items.map(({ course, quantity }) => (
                <div key={course.id} className="flex gap-4 p-5">
                  {/* Thumbnail */}
                  <div
                    className="h-16 w-16 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center"
                    style={{ background: course.gradient || '#0B1D3A' }}
                  >
                    {course.image ? (
                      <ImageWithFallback
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-black text-sm">
                        {course.shortTitle.slice(0, 4)}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-semibold text-sm leading-snug truncate">
                      {course.title}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">{course.type === 'bootcamp' ? 'Bootcamp' : 'Online'} · {course.duration}</p>
                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(course.id, quantity - 1)}
                          className="h-6 w-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="h-3 w-3 text-gray-500" />
                        </button>
                        <span className="text-sm font-medium text-gray-700 w-5 text-center">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(course.id, quantity + 1)}
                          className="h-6 w-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="h-3 w-3 text-gray-500" />
                        </button>
                      </div>
                      {/* Price */}
                      <span className="font-bold text-gray-900 text-sm">
                        ₦{(course.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(course.id)}
                    className="flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 flex flex-col gap-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm font-medium">Subtotal</span>
              <span className="text-gray-900 font-bold text-xl">
                ₦{subtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-gray-400 text-xs">
              Taxes and fees calculated at checkout. Financing options available.
            </p>
            {/* Checkout CTA */}
            <Link
              to="/cart"
              onClick={closeCart}
              className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] shadow-lg"
              style={{ backgroundColor: '#00A2B6' }}
            >
              Proceed to Checkout <ArrowRight className="h-5 w-5" />
            </Link>
            <button
              onClick={closeCart}
              className="w-full py-3 rounded-xl font-semibold border-2 text-gray-600 hover:bg-gray-50 transition-colors"
              style={{ borderColor: '#e5e7eb' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
