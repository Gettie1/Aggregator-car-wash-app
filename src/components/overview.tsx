// import { Link } from "@tanstack/react-router";
// import StatCard from "@/components/statCard";
import AdminDashboardOverview from "@/components/dashboard/adminDashboard";

function UserDashboardOverview() {
  return (
//     <div className="space-y-8">
//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
//         <StatCard icon="🚗" title="Vehicles Linked" value="2" />
//         <StatCard icon="📅" title="Upcoming Booking" value="July 1, 10:00 AM" />
//         <StatCard icon="✅" title="Last Booking" value="Completed" />
//         <StatCard icon="⭐" title="Reviews Submitted" value="4" />
//       </div>

//       {/* Upcoming Booking */}
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-lg font-semibold mb-2">Your Next Booking</h2>
//         <ul className="text-gray-700 space-y-1">
//           <li><strong>Service:</strong> Full Body Wash</li>
//           <li><strong>Vehicle:</strong> KDN 345T (Toyota Premio)</li>
//           <li><strong>Date & Time:</strong> July 1, 10:00 AM</li>
//           <li><strong>Vendor:</strong> Wash Pro Limited</li>
//           <li><strong>Location:</strong> Kilimani, Nairobi</li>
//         </ul>
//       </div>

//       {/* Booking History */}
//       <div>
//         <h2 className="text-lg font-semibold mb-2">Recent Bookings</h2>
//         <ul className="divide-y border rounded shadow">
//           <li className="p-4 flex justify-between">
//             <div>
//               <div className="font-medium">June 24 - KCU 223D</div>
//               <div className="text-sm text-gray-500">Interior & Exterior</div>
//             </div>
//             <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded">Completed</span>
//           </li>
//           <li className="p-4 flex justify-between">
//             <div>
//               <div className="font-medium">June 10 - KDK 121A</div>
//               <div className="text-sm text-gray-500">Exterior Only</div>
//             </div>
//             <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded">Cancelled</span>
//           </li>
//         </ul>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-4">
//         <Link
//           to="/dashboard/dashboard/bookings"
//           className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700"
//         >
//           Book a Wash
//         </Link>
//         <Link
//           to="/dashboard/dashboard"
//           className="px-6 py-3 border border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50"
//         >
//           Add Vehicle
//         </Link>
//       </div>
//     </div>
//   );
// }
// export default UserDashboardOverview;

<div>
  <AdminDashboardOverview/>
</div>
  )
}
export default UserDashboardOverview;