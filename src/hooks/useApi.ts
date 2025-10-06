import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AppointmentService } from '@/services/appointmentService'
import { ProductService } from '@/services/productService'
import { ServiceService } from '@/services/serviceService'
import { toast } from 'sonner'

// Appointment hooks
export const useCustomerAppointments = (customerId: string) => {
  return useQuery({
    queryKey: ['appointments', customerId],
    queryFn: () => AppointmentService.getCustomerAppointments(customerId),
    enabled: !!customerId,
  })
}

export const useCreateAppointment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: AppointmentService.createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      toast.success('Cita agendada exitosamente')
    },
    onError: (error) => {
      toast.error(`Error al agendar cita: ${error.message}`)
    },
  })
}

export const useCancelAppointment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: AppointmentService.cancelAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      toast.success('Cita cancelada exitosamente')
    },
    onError: (error) => {
      toast.error(`Error al cancelar cita: ${error.message}`)
    },
  })
}

export const useAvailableTimeSlots = (date: string, serviceId: string) => {
  return useQuery({
    queryKey: ['timeSlots', date, serviceId],
    queryFn: () => AppointmentService.getAvailableTimeSlots(date, serviceId),
    enabled: !!date && !!serviceId,
  })
}

// Product hooks
export const useProducts = (filters?: Parameters<typeof ProductService.getProducts>[0]) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => ProductService.getProducts(filters),
  })
}

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => ProductService.getProductById(productId),
    enabled: !!productId,
  })
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: ProductService.getCategories,
  })
}

export const useSearchProducts = (searchTerm: string) => {
  return useQuery({
    queryKey: ['searchProducts', searchTerm],
    queryFn: () => ProductService.searchProducts(searchTerm),
    enabled: searchTerm.length > 2,
  })
}

// Service hooks
export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: ServiceService.getServices,
  })
}

export const useService = (serviceId: string) => {
  return useQuery({
    queryKey: ['service', serviceId],
    queryFn: () => ServiceService.getServiceById(serviceId),
    enabled: !!serviceId,
  })
}

export const useServicesByCategory = (category: string) => {
  return useQuery({
    queryKey: ['services', 'category', category],
    queryFn: () => ServiceService.getServicesByCategory(category),
    enabled: !!category,
  })
}