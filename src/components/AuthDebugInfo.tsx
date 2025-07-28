// import { authStore } from "@/store/authStore"

// export function AuthDebugInfo() {
//   const handleCheckAuth = () => {
//     console.log('=== AUTH DEBUG INFO ===')
//     console.log('Current auth store state:', authStore.state)
//     console.log('Current user:', authStore.state.user)
//     console.log('User ID:', authStore.state.user.id)
//     console.log('User Role:', authStore.state.user.role)
//     console.log('Customer ID:', authStore.state.user.customerId)
//     console.log('Vendor ID:', authStore.state.user.vendorId)
//     console.log('Is Verified:', authStore.state.isVerified)
//     console.log('Access Token (first 20 chars):', authStore.state.accessToken.substring(0, 20) + '...')
    
//     const localStorageData = localStorage.getItem('auth')
//     console.log('LocalStorage raw data:', localStorageData)
    
//     if (localStorageData) {
//       try {
//         const parsed = JSON.parse(localStorageData)
//         console.log('Parsed localStorage data:', parsed)
//         console.log('Parsed user:', parsed.user)
//         console.log('Parsed customer ID:', parsed.user?.customerId)
//         console.log('Parsed vendor ID:', parsed.user?.vendorId)
//       } catch (error) {
//         console.error('Error parsing localStorage data:', error)
//       }
//     }
//     console.log('=====================')
//   }

//   const handleClearAuth = () => {
//     localStorage.removeItem('auth')
//     authStore.setState({
//       isVerified: false,
//       user: {
//         id: '',
//         role: 'customer',
//         email: '',
//         firstname: '',
//         lastname: '',
//         customerId: '',
//         vendorId: '',
//       },
//       accessToken: '',
//       refreshToken: '',
//     })
//     console.log('Auth cleared')
//   }

//   return (
//     <div className="fixed bottom-4 right-4 bg-white p-4 border rounded shadow-lg z-50">
//       <h3 className="text-sm font-bold mb-2">Auth Debug</h3>
//       <div className="space-y-2">
//         <button
//           onClick={handleCheckAuth}
//           className="block w-full text-xs bg-blue-500 text-white px-2 py-1 rounded"
//         >
//           Check Auth State
//         </button>
//         <button
//           onClick={handleClearAuth}
//           className="block w-full text-xs bg-red-500 text-white px-2 py-1 rounded"
//         >
//           Clear Auth
//         </button>
//         <div className="text-xs text-gray-600">
//           <div>User: {authStore.state.user.firstname}</div>
//           <div>Role: {authStore.state.user.role}</div>
//           <div>Customer ID: {authStore.state.user.customerId || 'N/A'}</div>
//           <div>Vendor ID: {authStore.state.user.vendorId || 'N/A'}</div>
//         </div>
//       </div>
//     </div>
//   )
// }
