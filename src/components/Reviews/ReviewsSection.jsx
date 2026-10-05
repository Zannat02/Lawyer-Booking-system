import React, { useEffect, useMemo, useState } from 'react';
import { collection, query, where, onSnapshot, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { FaStar, FaRegStar } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router';
import { db } from '../../firebase/firebase.config';
import useAuth from '../../hooks/useAuth';

const StarRating = ({ value, onChange, size = 22, readOnly = false }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const filled = star <= (hover || value);
                return (
                    <button
                        key={star}
                        type="button"
                        disabled={readOnly}
                        onMouseEnter={() => !readOnly && setHover(star)}
                        onMouseLeave={() => !readOnly && setHover(0)}
                        onClick={() => !readOnly && onChange(star)}
                        className={readOnly ? 'cursor-default' : 'cursor-pointer'}
                    >
                        {filled ? (
                            <FaStar size={size} className="text-amber-400" />
                        ) : (
                            <FaRegStar size={size} className="text-amber-400" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

const ReviewsSection = ({ lawyerId, lawyerName }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [myRating, setMyRating] = useState(0);
    const [myComment, setMyComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const q = query(
            collection(db, 'reviews'),
            where('lawyerId', '==', lawyerId)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
            setReviews(list);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [lawyerId]);

    const average = useMemo(() => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return (sum / reviews.length).toFixed(1);
    }, [reviews]);

    const hasReviewed = user && reviews.some(r => r.userId === user.uid);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.warning("Please login to leave a review!");
            navigate('/login', { state: { from: location } });
            return;
        }

        if (myRating === 0) {
            toast.warning("Please select a star rating!");
            return;
        }

        setSubmitting(true);
        try {
            await setDoc(doc(db, 'reviews', `${lawyerId}_${user.uid}`), {
                lawyerId,
                lawyerName,
                userId: user.uid,
                userName: user.displayName || user.email,
                rating: myRating,
                comment: myComment.trim(),
                createdAt: serverTimestamp(),
            });
            toast.success(hasReviewed ? "Review updated!" : "Review submitted, thank you!");
            setMyRating(0);
            setMyComment('');
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-8 border border-gray-300 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">Reviews</h1>
                {reviews.length > 0 && (
                    <div className="flex items-center gap-2">
                        <StarRating value={Math.round(average)} onChange={() => { }} size={18} readOnly />
                        <span className="font-semibold text-sm">{average}</span>
                        <span className="text-gray-400 text-xs">({reviews.length} review{reviews.length > 1 ? 's' : ''})</span>
                    </div>
                )}
            </div>

            {/* Review form */}
            <form onSubmit={handleSubmit} className="mt-5 bg-gray-50 rounded-xl p-4 space-y-3">
                <p className="text-sm font-semibold text-gray-700">
                    {hasReviewed ? "Update your review" : "Leave a review"}
                </p>
                <StarRating value={myRating} onChange={setMyRating} />
                <textarea
                    value={myComment}
                    onChange={(e) => setMyComment(e.target.value)}
                    placeholder="Share your experience with this lawyer..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-700 resize-none"
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-green-700 hover:bg-green-800 text-white rounded-xl px-5 py-2 text-sm font-semibold transition disabled:opacity-60"
                >
                    {submitting ? 'Submitting...' : hasReviewed ? 'Update Review' : 'Submit Review'}
                </button>
            </form>

            {/* Review list */}
            <div className="mt-6 space-y-4">
                {loading ? (
                    <p className="text-gray-400 text-sm text-center">Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map((r) => (
                        <div key={r.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                            <div className="flex items-center justify-between flex-wrap gap-1">
                                <p className="font-semibold text-sm">{r.userName}</p>
                                <StarRating value={r.rating} onChange={() => { }} size={14} readOnly />
                            </div>
                            {r.comment && <p className="text-gray-600 text-sm mt-1">{r.comment}</p>}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewsSection;