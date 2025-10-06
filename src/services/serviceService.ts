import { supabase, Service } from '@/lib/supabase'

export class ServiceService {
  // Get all active services
  static async getServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)
      .order('name')

    if (error) throw error
    return data
  }

  // Get service by ID
  static async getServiceById(serviceId: string) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', serviceId)
      .single()

    if (error) throw error
    return data
  }

  // Get services by category
  static async getServicesByCategory(category: string) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('category', category)
      .eq('active', true)
      .order('name')

    if (error) throw error
    return data
  }

  // Calculate service price (could include dynamic pricing logic)
  static async calculateServicePrice(serviceId: string, motorcycleData?: any) {
    const { data: service, error } = await supabase
      .from('services')
      .select('base_price')
      .eq('id', serviceId)
      .single()

    if (error) throw error

    // Basic pricing logic - could be enhanced based on motorcycle specs
    let finalPrice = service.base_price

    // Example: Add surcharge for older motorcycles
    if (motorcycleData?.year && motorcycleData.year < 2010) {
      finalPrice *= 1.1 // 10% surcharge for older bikes
    }

    return Math.round(finalPrice)
  }
}