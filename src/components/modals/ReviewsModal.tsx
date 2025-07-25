import { toast } from "sonner";
import { useState } from "react";
import { useStore } from "@tanstack/react-form";
import { useCreateReview } from "@/hooks/reviews";
import { authStore } from "@/store/authStore";

export interface ReviewsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function ReviewsModal({ isOpen, onClose }: ReviewsModalProps) {
    const { user } = useStore(authStore);
    const createReviewMutation = useCreateReview();
    const [formdata, setFormData] = useState({
        customer_id: user.customerId,
        vendor_id: 0,
        booking_id: 0,
        vehicle_id: 0,
        service_id: 0,
        rating: 0,
        comment: "",
    });

    const handleCreateReview = async () => {
        try {
            await createReviewMutation.mutateAsync(formdata);
            toast.success("Review created successfully!");
            onClose();
        } catch (error) {
            toast.error("Failed to create review");
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "rating" || name === "vendor_id" || name === "booking_id" || name === "vehicle_id" || name === "service_id" 
                ? Number(value) || 0 
                : value,
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="relative bg-white/80 rounded-2xl shadow-2xl w-full max-w-lg p-10 animate-fadeIn border border-gray-200 max-h-[90vh] flex flex-col">
            <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition"
                onClick={onClose}
                aria-label="Close"
            >
                &times;
            </button>
            <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 drop-shadow">
                Create Review
            </h2>
            <form
                onSubmit={(e) => {
                e.preventDefault();
                handleCreateReview();
                }}
                className="flex-1 overflow-y-auto"
                style={{ minHeight: 0, maxHeight: "60vh" }}
            >
                <div className="space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Vendor ID
                    </label>
                    <input
                    type="number"
                    name="vendor_id"
                    value={formdata.vendor_id}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="Enter vendor ID"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Booking ID
                    </label>
                    <input
                    type="number"
                    name="booking_id"
                    value={formdata.booking_id}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="Enter booking ID"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Vehicle ID
                    </label>
                    <input
                    type="number"
                    name="vehicle_id"
                    value={formdata.vehicle_id}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="Enter vehicle ID"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Service ID
                    </label>
                    <input
                    type="number"
                    name="service_id"
                    value={formdata.service_id}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="Enter service ID"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Rating
                    </label>
                    <input
                    type="number"
                    name="rating"
                    value={formdata.rating}
                    onChange={handleChange}
                    min={0}
                    max={5}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="0-5"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Comment
                    </label>
                    <textarea
                    name="comment"
                    value={formdata.comment}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none transition"
                    rows={3}
                    placeholder="Write your review..."
                    />
                </div>
                </div>
                <div className="flex gap-4 mt-10">
                <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 shadow transition"
                >
                    Submit Review
                </button>
                <button
                    type="button"
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-300 shadow transition"
                    onClick={onClose}
                >
                    Cancel
                </button>
                </div>
            </form>
            </div>
            <style>
            {`
                @keyframes fadeIn {
                from { opacity: 0; transform: translateY(40px);}
                to { opacity: 1; transform: translateY(0);}
                }
                .animate-fadeIn {
                animation: fadeIn 0.3s cubic-bezier(0.4,0,0.2,1);
                }
            `}
            </style>
        </div>
    );
}

export default ReviewsModal;