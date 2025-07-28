import { useState } from 'react'
import { toast } from 'sonner';
import { useStore } from '@tanstack/react-form'
import { authStore } from '@/store/authStore'
import { uploadFile } from '@/hooks/upload' // adjust import if needed
import { useCreateVehicle } from '@/hooks/vehicle'

export interface VehiclesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function VehiclesModal({ isOpen, onClose }: VehiclesModalProps) {
    const { user } = useStore(authStore)
    // const customerId = user.customerId
    const [vehicleData, setVehicleData] = useState({
        license_plate: '',
        model: '',
        make: '',
        color: '',
        year: '',
        image: '',  // Changed to string for URL input
        customer_id: user.customerId
    })
    const createVehicleMutation = useCreateVehicle()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setVehicleData({ ...vehicleData, [e.target.name]: e.target.value })
    }

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  try {
    const imageUrl = await uploadFile(file)
    console.log('Image uploaded successfully:', imageUrl)
    setVehicleData((prev) => ({ ...prev, image: imageUrl }))
    console.log('First image URL:', imageUrl)
    toast.success('Image uploaded successfully!')
  } catch (error) {
    console.error('Image upload failed', error)
    toast.error('Image upload failed.')
  }
}


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        // Convert year to integer and validate
        const yearAsNumber = parseInt(vehicleData.year)
        
        // Validate year range
        if (isNaN(yearAsNumber) || yearAsNumber < 1900 || yearAsNumber > 2026) {
            alert('Please enter a valid year between 1900 and 2026')
            return
        }
        
        // Prepare data with year as integer
        const vehicleDataToSubmit = {
            ...vehicleData, 
            year: yearAsNumber  // Convert to integer
        }
        
        console.log('📝 Submitting vehicle data:', vehicleDataToSubmit)
        toast.success('Vehicle added successfully!')
        createVehicleMutation.mutate(vehicleDataToSubmit)
        setVehicleData({
            license_plate: '',
            model: '',
            make: '',
            color: '',
            year: '',
            image: '',  // Reset image to null
            customer_id: user.customerId
        })
        onClose()
    }

    if (!isOpen) return null

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button style={styles.closeButton} onClick={onClose} aria-label="Close">&times;</button>
                <h2 style={styles.title}>Add Vehicle</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label htmlFor="license_plate" style={styles.label}>License Plate</label>
                    <input
                        type="text"
                        id="license_plate"
                        name="license_plate"
                        value={vehicleData.license_plate}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <label htmlFor="model" style={styles.label}>Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={vehicleData.model}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <label htmlFor="make" style={styles.label}>Make</label>
                    <input
                        type="text"
                        id="make"
                        name="make"
                        value={vehicleData.make}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <label htmlFor="color" style={styles.label}>Color</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={vehicleData.color}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                    <label htmlFor="year" style={styles.label}>Year</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={vehicleData.year}
                        onChange={handleChange}
                        min="1900"
                        max="2026"
                        required
                        style={styles.input}
                        placeholder="e.g., 2020"
                    />
                    {/* add vehicle image */}
                    <label htmlFor="image" style={styles.label}>Vehicle Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={styles.input}
                    /> 
                    <button type="submit" style={styles.submitButton}>Add Vehicle</button>
                </form>
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        background: '#fff',
        borderRadius: 8,
        padding: '2rem',
        minWidth: 320,
        maxWidth: 400,
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
        position: 'relative'
    },
    closeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        background: 'transparent',
        border: 'none',
        fontSize: 24,
        cursor: 'pointer'
    },
    title: {
        margin: 0,
        marginBottom: 24,
        textAlign: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
    },
    label: {
        fontWeight: 500,
        marginBottom: 4
    },
    input: {
        padding: '8px 12px',
        borderRadius: 4,
        border: '1px solid #ccc',
        fontSize: 16
    },
    submitButton: {
        marginTop: 16,
        padding: '10px 0',
        borderRadius: 4,
        border: 'none',
        background: '#0078d4',
        color: '#fff',
        fontWeight: 600,
        fontSize: 16,
        cursor: 'pointer'
    }
}

export default VehiclesModal