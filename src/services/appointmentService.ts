import { supabase, Appointment, Service, Motorcycle } from '@/lib/supabase'

export class AppointmentService {
  // Get all appointments for a customer
  static async getCustomerAppointments(customerId: string) {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        services (name, description, base_price),
        motorcycles (brand, model, plate),
        profiles!appointments_mechanic_id_fkey (full_name)
      `)
      .eq('customer_id', customerId)
      .order('scheduled_date', { ascending: false })

    if (error) throw error
    return data
  }

  // Create new appointment
  static async createAppointment(appointmentData: Omit<Appointment, 'id' | 'created_at'>) {
    // First check availability
    const isAvailable = await this.checkAvailability(
      appointmentData.scheduled_date,
      appointmentData.service_id
    )

    if (!isAvailable) {
      throw new Error('Time slot is not available')
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select()
      .single()

    if (error) throw error

    // Send notification (we'll implement this later)
    // await NotificationService.sendAppointmentConfirmation(data.id)

    return data
  }

  // Check availability for a time slot
  static async checkAvailability(scheduledDate: string, serviceId: string) {
    const { data: service } = await supabase
      .from('services')
      .select('duration_minutes')
      .eq('id', serviceId)
      .single()

    if (!service) return false

    const startTime = new Date(scheduledDate)
    const endTime = new Date(startTime.getTime() + service.duration_minutes * 60000)

    const { data: conflictingAppointments } = await supabase
      .from('appointments')
      .select('id')
      .neq('status', 'cancelled')
      .gte('scheduled_date', startTime.toISOString())
      .lt('scheduled_date', endTime.toISOString())

    return !conflictingAppointments || conflictingAppointments.length === 0
  }

  // Update appointment status
  static async updateAppointmentStatus(appointmentId: string, status: Appointment['status']) {
    const { data, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', appointmentId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Cancel appointment
  static async cancelAppointment(appointmentId: string) {
    return this.updateAppointmentStatus(appointmentId, 'cancelled')
  }

  // Get available time slots for a date
  static async getAvailableTimeSlots(date: string, serviceId: string) {
    const workingHours = [
      '08:00', '09:00', '10:00', '11:00', 
      '14:00', '15:00', '16:00', '17:00'
    ]

    const { data: service } = await supabase
      .from('services')
      .select('duration_minutes')
      .eq('id', serviceId)
      .single()

    if (!service) return []

    const availableSlots = []
    
    for (const hour of workingHours) {
      const slotDateTime = `${date}T${hour}:00`
      const isAvailable = await this.checkAvailability(slotDateTime, serviceId)
      
      if (isAvailable) {
        availableSlots.push({
          time: hour,
          datetime: slotDateTime,
          available: true
        })
      }
    }

    return availableSlots
  }
}