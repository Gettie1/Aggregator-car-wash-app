import { Building2, CalendarCheck, CarIcon, Home, Star, User, Wrench } from "lucide-react";
import { Role } from "@/types/auth";

export const checkRole = (userRole: Role) =>{
    switch (userRole) {
        case Role.ADMIN:
            return NavLinks.filter((group) => ['admin'].includes(group.label.toLowerCase()));
        case Role.VENDOR:
            return NavLinks.filter((group) => ['vendor'].includes(group.label.toLowerCase()));
        case Role.CUSTOMER:
            return NavLinks.filter((group) => ['customer'].includes(group.label.toLowerCase()));
        default:
            return []
    }
  
}


const NavLinks = [
    {
        label: "Admin",
        links: [
            { to: "/dashboard/dashboard", icon: Home, title: "Dashboard" },
            { to: "/dashboard/dashboard/AllBookings", icon: CalendarCheck, title: "Bookings" },
            { to: "/dashboard/dashboard/vendors", icon: Building2, title: "Vendors" },
            { to: "/dashboard/dashboard/customers", icon: User, title: "Customers" },
            { to: "/dashboard/dashboard/AllReviews", icon: Star, title: "Reviews" }
        ]


    },
    {
         label: "Vendor",
        links: [
            { to: "/dashboard/dashboard", icon: Home, title: "Dashboard" },
            { to: "/dashboard/dashboard/bookings", icon: CalendarCheck, title: "Bookings" },
            { to: "/dashboard/dashboard/services", icon: Wrench, title: "Services" },
            { to: "/dashboard/dashboard/customers", icon: User, title: "Customers" },
            { to: "/dashboard/dashboard/reviews", icon: Star, title: "Reviews" }
        ]   
    },
    {
        label: "Customer",
        links: [
            { to: "/dashboard/dashboard", icon: Home, title: "Dashboard" },
            { to: "/dashboard/dashboard/bookings", icon: CalendarCheck, title: "My Bookings" },
            { to: "/dashboard/dashboard/vehicles", icon: CarIcon, title: "Vehicles" },
            { to: "/dashboard/dashboard/reviews", icon: Star, title: "Reviews" },
            { to: "/dashboard/dashboard/services", icon: User, title: "View available services" }
        ]
    }

]